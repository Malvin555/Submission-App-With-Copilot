/**
 * Component: CharacterPortrait
 * Displays the character's illustrated portrait in an antique manuscript frame with
 * accessible controls to generate, regenerate, zoom, or export the likeness.
 */
import React, { useState } from "react";
import { Character } from "../types/character";
import { generatePortrait } from "../services/portraitService";
import {
  Sparkles,
  RefreshCw,
  AlertTriangle,
  ZoomIn,
  Download,
  X,
  Compass,
} from "lucide-react";

interface CharacterPortraitProps {
  character: Character;
  onUpdatePortrait: (imageUrl: string, prompt?: string) => void;
  className?: string;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  onUpdatePortrait,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleGenerateOrRegenerate = async (isRegeneration = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generatePortrait(character, isRegeneration);
      onUpdatePortrait(result.imageUrl, result.prompt);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Portrait illustration failed.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPortrait = () => {
    if (!character.portraitUrl) return;
    const link = document.createElement("a");
    link.href = character.portraitUrl;
    link.download = `${character.name.toLowerCase().replace(/\s+/g, "_")}_portrait.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Antique Manuscript Plate Frame */}
      <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[360px] p-2 bg-[#14171d] border-2 border-[#544431] rounded-md shadow-lg corner-flourish">
        {/* Inner Plate Mat */}
        <div className="relative w-full h-full bg-[#0d0f12] border border-[#2b241a] overflow-hidden flex items-center justify-center group rounded-sm">
          {character.portraitUrl ? (
            <>
              <img
                src={character.portraitUrl}
                alt={`Portrait of ${character.name}, ${character.characterClass}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />

              {/* Restrained Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end justify-between p-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d8cdb7] bg-[#14171d]/90 px-2 py-0.5 border border-[#473a2b] rounded-sm">
                  {character.gender === "Female" ? "Heroine" : "Hero"} ·{" "}
                  {character.characterClass}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    title="Examine Portrait"
                    aria-label="Examine Portrait"
                    className="p-1.5 bg-[#181d24] hover:bg-[#252b36] text-[#ebe2d0] border border-[#473a2b] rounded cursor-pointer transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadPortrait}
                    title="Save Illustration"
                    aria-label="Save Illustration"
                    className="p-1.5 bg-[#181d24] hover:bg-[#252b36] text-[#ebe2d0] border border-[#473a2b] rounded cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Unrendered Slate State */
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <Compass
                className="w-8 h-8 text-[#8c7355] mb-2 opacity-60"
                aria-hidden="true"
              />
              <p className="text-xs font-display text-[#d8cdb7] mb-1">
                Plate Awaiting Illustration
              </p>
              <button
                type="button"
                onClick={() => handleGenerateOrRegenerate(false)}
                disabled={isLoading}
                className="mt-3 px-3.5 py-1.5 text-xs font-display tracking-wider text-[#0d0f12] bg-[#c49d48] hover:bg-[#d9b15b] rounded cursor-pointer transition-colors"
              >
                Render Plate
              </button>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div
              className="absolute inset-0 bg-[#0d0f12]/92 backdrop-blur-none flex flex-col items-center justify-center p-4 text-center z-20"
              role="status"
              aria-live="polite"
            >
              <div className="w-8 h-8 border-2 border-[#544431] border-t-[#c49d48] rounded-full animate-spin mb-2.5" />
              <span className="font-display text-xs text-[#e3bd68] tracking-widest uppercase">
                Inscribing Portrait...
              </span>
              <span className="text-[11px] font-editorial italic text-[#b5a589] mt-1">
                Rendering pigments for {character.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          className="w-full max-w-[320px] mt-2 p-2.5 bg-[#261616] border border-[#7a3232] text-[#f5c6c6] text-xs flex items-start gap-2"
          role="alert"
        >
          <AlertTriangle
            className="w-4 h-4 text-[#e06c6c] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex-1">
            <p className="text-[11px] leading-tight mb-1">{error}</p>
            <button
              type="button"
              onClick={() => handleGenerateOrRegenerate(true)}
              className="text-[10px] font-mono text-[#f5d082] underline hover:text-[#fff]"
            >
              Retry Illustration
            </button>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-[#e06c6c] hover:text-[#fff] p-0.5"
            aria-label="Dismiss error"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Secondary Portrait Action Controls */}
      <div className="w-full max-w-[320px] mt-2.5 flex items-center justify-center">
        {character.portraitUrl ? (
          <button
            id="regenerate-portrait-button"
            type="button"
            onClick={() => handleGenerateOrRegenerate(true)}
            disabled={isLoading}
            className={`w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-display tracking-wider rounded border border-[#544431] bg-[#181d24] hover:bg-[#252b36] hover:border-[#8c7355] text-[#ebe2d0] transition-colors cursor-pointer ${
              isLoading ? "opacity-50 cursor-wait" : ""
            }`}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#c49d48] ${isLoading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            <span>Regenerate Portrait</span>
          </button>
        ) : (
          <button
            id="generate-portrait-button"
            type="button"
            onClick={() => handleGenerateOrRegenerate(false)}
            disabled={isLoading}
            className={`w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-display tracking-wider rounded border border-[#7d643d] bg-[#2b241a] hover:bg-[#382f22] text-[#e3bd68] transition-colors cursor-pointer ${
              isLoading ? "opacity-50 cursor-wait" : ""
            }`}
          >
            <Sparkles
              className="w-3.5 h-3.5 text-[#c49d48]"
              aria-hidden="true"
            />
            <span>Generate Portrait</span>
          </button>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && character.portraitUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${character.name}`}
          className="fixed inset-0 z-50 bg-[#0d0f12]/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#181d24] border-2 border-[#544431] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3d3326]">
              <span className="font-display font-semibold text-[#f5f0e6] text-sm tracking-wide">
                {character.name} — Plate Inscription
              </span>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-1 text-[#b5a589] hover:text-[#fff]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="border border-[#3d3326] bg-black mb-3">
              <img
                src={character.portraitUrl}
                alt={character.name}
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a39480] font-mono">
                {character.race} · {character.specialization}
              </span>
              <button
                type="button"
                onClick={handleDownloadPortrait}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2b241a] hover:bg-[#382f22] text-[#e3bd68] border border-[#7d643d] font-display text-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Save Plate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
