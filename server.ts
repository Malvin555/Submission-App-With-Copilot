import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));

// Class archetype portraits mapping (Classic & Heroine Variants)
const CLASS_PORTRAIT_PRESETS: Record<string, string> = {
  Mage: "/src/assets/images/portrait_mage_1792309417919.jpg",
  Rogue: "/src/assets/images/portrait_rogue_1792309434877.jpg",
  Warrior: "/src/assets/images/portrait_warrior_1792309434030.jpg",
  Paladin: "/src/assets/images/portrait_paladin_1792309434884.jpg",
  Necromancer: "/src/assets/images/portrait_necromancer_1792309453052.jpg",
  Druid: "/src/assets/images/portrait_druid_1792309453428.jpg",
  Ranger: "/src/assets/images/portrait_ranger_1792309453111.jpg",
};

const FEMALE_PORTRAIT_PRESETS: Record<string, string> = {
  Mage: "/src/assets/images/portrait_female_mage_1792311141856.jpg",
  Rogue: "/src/assets/images/portrait_female_rogue_1792311141264.jpg",
  Warrior: "/src/assets/images/portrait_female_warrior_1792311141804.jpg",
  Paladin: "/src/assets/images/portrait_female_paladin_1792311155660.jpg",
  Necromancer:
    "/src/assets/images/portrait_female_necromancer_1792311156632.jpg",
  Druid: "/src/assets/images/portrait_female_druid_1792311170238.jpg",
  Ranger: "/src/assets/images/portrait_female_ranger_1792311156796.jpg",
};

app.get(["/favicon.ico", "/favicon.svg", "/api/icon"], (_req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.sendFile(path.resolve("public/favicon.svg"));
});

app.get("/logo.svg", (_req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.sendFile(path.resolve("public/logo.svg"));
});

app.post(
  "/api/generate-portrait",
  async (req: Request, res: Response): Promise<void> => {
    const {
      name,
      characterClass,
      race,
      specialization,
      variationSeed,
      gender,
    } = req.body;

    if (!characterClass) {
      res
        .status(400)
        .json({ success: false, error: "Character class is required." });
      return;
    }

    const isFemale = gender === "Female" || (!gender && Math.random() > 0.5);

    const prompt = isFemale
      ? `Striking, charismatic, fierce athletic and alluring fantasy female heroine ${name || "Heroine"}, a powerful ${race || "Fantasy"} ${characterClass} specializing in ${specialization || "Combat"}. Sculpted strength, captivating gaze, ornate gold and bronze armor filigree, glowing runic energy, alchemical workshop background with warm magical embers, digital RPG game concept art avatar, vibrant cinematic lighting.${variationSeed ? ` Variation: ${variationSeed}` : ""}`
      : `Stylized vibrant cartoon video-game portrait of ${name || "Hero"}, a ${race || "Fantasy"} ${characterClass} specializing in ${specialization || "Combat"}. High-fantasy digital RPG concept art, character bust portrait, alchemical laboratory workshop atmosphere with glowing vials and magical runes, bold crisp outlines, expressive face, vibrant lighting, centered square avatar.${variationSeed ? ` Variation angle: ${variationSeed}` : ""}`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        let generatedBase64: string | null = null;
        const candidates = response.candidates;
        if (
          candidates &&
          candidates.length > 0 &&
          candidates[0].content?.parts
        ) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              generatedBase64 = part.inlineData.data;
              break;
            }
          }
        }

        if (generatedBase64) {
          res.json({
            success: true,
            imageUrl: `data:image/png;base64,${generatedBase64}`,
            prompt,
            source: "gemini-live",
          });
          return;
        }
      } catch (err: unknown) {
        console.warn(
          "Gemini live generation encountered an issue, using alchemical vault portrait:",
          err,
        );
      }
    }

    const presetMap = isFemale
      ? FEMALE_PORTRAIT_PRESETS
      : CLASS_PORTRAIT_PRESETS;
    const presetImage =
      presetMap[characterClass] ||
      (isFemale
        ? FEMALE_PORTRAIT_PRESETS.Warrior
        : CLASS_PORTRAIT_PRESETS.Warrior);
    res.json({
      success: true,
      imageUrl: presetImage,
      prompt,
      source: "vault-asset",
      note: apiKey
        ? "Rendered from Alchemist Vault"
        : "Alchemical Vault Portrait (API Key not detected)",
    });
  },
);

function generateFallbackBackstory(
  name: string,
  characterClass: string,
  race: string,
  specialization: string,
  title: string,
): string {
  const origins = [
    `Forged in the hidden alchemical undercrofts beneath the Citadel of Glass, ${name} bound their soul to the ancient rites of ${specialization}.`,
    `After discovering a shattered celestial crucible in the ruins of an elder sanctuary, ${name} inherited the mantle of "${title}".`,
    `Trained among the secretive hermits of the Whispering Spires, ${name} mastered the volatile balance between lifeblood and raw arcane transmutations.`,
    `Marked at birth by the eclipse of the twin moons, ${name} was cast into the desolate badlands only to arise as an untouchable ${race} ${characterClass}.`,
    `Fleeing the burning archives of the Grand Magisterium with only an obsidian flask and a forbidden scroll, ${name} now plies the frontiers under the name "${title}".`,
    `Chosen by the living spirit of the ancient World-Furnace, ${name} wields the deadly precision of a true ${characterClass}.`,
  ];

  const continuations = [
    `Now wandering the shadowed trade routes, they seek the lost philosopher's catalyst before rival cabals can unmake the mortal plane.`,
    `Carrying the cursed embers of their fallen order, they swear to cleanse every corrupt tyrant whose greed poisons the earth.`,
    `Every blade and spell they cast hums with forbidden alchemical resonance, leaving foes to whisper of the legend that cannot be broken.`,
    `With each dawn, the runes etched upon their flesh pulse hotter, guiding their steps toward an apocalyptic reckoning written in ancient stars.`,
    `Armed with stolen relics and uncanny instinct, they protect the forgotten survivors of the realm's forgotten wars.`,
  ];

  const p1 = origins[Math.floor(Math.random() * origins.length)];
  const p2 = continuations[Math.floor(Math.random() * continuations.length)];
  return `${p1} ${p2}`;
}

app.post(
  "/api/generate-backstory",
  async (req: Request, res: Response): Promise<void> => {
    const {
      name,
      characterClass,
      race,
      specialization,
      title,
      equipment,
      portraitContext,
    } = req.body;

    if (!characterClass) {
      res
        .status(400)
        .json({ success: false, error: "Character class is required." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const prompt = `Write an imaginative, vivid 1 or 2 sentence fantasy character origin backstory for:
Name: ${name || "The Wanderer"}
Title: ${title || "The Bound"}
Class: ${characterClass} (${specialization || "Master"})
Race: ${race || "Mortal"}
Equipment: ${equipment ? `${equipment.mainHand}, ${equipment.armor}, ${equipment.accessory}` : "Enchanted relics"}
Visual atmosphere: Animated cartoon video-game portrait in an ancient alchemical laboratory with glowing vials, bubbling crucibles, and arcane runes. ${portraitContext ? `Context: ${portraitContext}` : ""}

Strict requirements:
- Must be strictly 1 or 2 sentences total.
- Highly evocative fantasy storytelling highlighting their origin, crucible catalyst, or quest.
- Do NOT output bullet points, numbering, or wrapping quotes around the entire story.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction:
              "You are an ancient alchemical chronicler and fantasy lore master. Inscribe concise, imaginative 1-2 sentence character origins for heroes on the transmutation bench.",
            temperature: 0.95,
          },
        });

        const text = response.text?.trim().replace(/^["']|["']$/g, "");
        if (text) {
          res.json({
            success: true,
            backstory: text,
            source: "gemini-flash",
          });
          return;
        }
      } catch (err: unknown) {
        console.warn(
          "Gemini backstory generation issue, using alchemical chronicle fallback:",
          err,
        );
      }
    }

    const fallback = generateFallbackBackstory(
      name || "The Wanderer",
      characterClass,
      race || "Unknown",
      specialization || "Discipline",
      title || "The Resolute",
    );

    res.json({
      success: true,
      backstory: fallback,
      source: "chronicle-vault",
    });
  },
);

async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(
      `Fantasy Character Creator server running on http://localhost:${PORT}`,
    );
  });
}

startServer();
