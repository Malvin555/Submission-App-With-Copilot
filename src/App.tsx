/**
 * Application Entry: App
 * Editorial Fantasy Character Generator & Player Card Folio.
 * Coordinates character generation, portrait illustration, backstory inscription, and deck persistence.
 */
import { useState, useEffect, useCallback, useMemo } from "react";
import { Character, CharacterClass } from "./types/character";
import {
  CLASSES,
  CLASS_DETAILS,
  generateRandomCharacter,
} from "./data/characterData";
import { PlayerCard } from "./components/PlayerCard";
import { ClassSelector } from "./features/characters/ClassSelector";
import { MyDeck } from "./features/deck/MyDeck";
import {
  loadDeckFromStorage,
  saveDeckToStorage,
  isCharacterInDeck,
  exportDeckAsJson,
} from "./services/deckStorage";
import { playRollSound, playChimeSound } from "./utils/soundEffects";
import {
  Dices,
  Volume2,
  VolumeX,
  BookOpen,
  X,
  CheckCircle2,
  Archive,
  Download,
  Trash2,
  Sparkles,
  Crown,
  Shield,
  Layers,
} from "lucide-react";
import { getClassIcon } from "./components/ClassBadge";

export default function App() {
  const [selectedClassFilter, setSelectedClassFilter] = useState<
    CharacterClass | "All"
  >("All");
  const [genderPreference, setGenderPreference] = useState<
    "Female" | "Male" | "Any"
  >("Female");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showClassGuide, setShowClassGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [currentCharacter, setCurrentCharacter] = useState<Character>(() =>
    generateRandomCharacter(undefined, "Female"),
  );

  const [deck, setDeck] = useState<Character[]>(() => {
    const saved = loadDeckFromStorage();
    if (saved.length > 0) return saved;
    return [generateRandomCharacter("Warrior", "Female")];
  });

  useEffect(() => {
    saveDeckToStorage(deck);
  }, [deck]);

  const handleGenerate = useCallback(
    (
      forcedClass?: CharacterClass | "All",
      forcedGender?: "Female" | "Male" | "Any",
    ) => {
      const targetFilter =
        forcedClass !== undefined ? forcedClass : selectedClassFilter;
      const targetGender =
        forcedGender !== undefined ? forcedGender : genderPreference;
      setIsGenerating(true);
      playRollSound(isAudioMuted);

      setTimeout(() => {
        const newChar = generateRandomCharacter(
          targetFilter === "All" ? undefined : targetFilter,
          targetGender,
        );
        setCurrentCharacter(newChar);
        setIsGenerating(false);
      }, 120);
    },
    [selectedClassFilter, genderPreference, isAudioMuted],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === "Space" || e.key.toLowerCase() === "g") {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate]);

  const handleUpdateCharacter = (updated: Character) => {
    setCurrentCharacter(updated);

    setDeck((prev) =>
      prev.map((card) => (card.id === updated.id ? updated : card)),
    );
  };

  const isCurrentSaved = isCharacterInDeck(deck, currentCharacter.id);

  const handleSaveToDeck = (charToSave: Character) => {
    if (isCharacterInDeck(deck, charToSave.id)) {
      setToastMessage(`"${charToSave.name}" is already archived in your deck.`);
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setDeck((prev) => [charToSave, ...prev]);
    playChimeSound(isAudioMuted);
    setToastMessage(`Folio: "${charToSave.name}" archived to My Deck.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRemoveFromDeck = (id: string) => {
    const target = deck.find((c) => c.id === id);
    setDeck((prev) => prev.filter((c) => c.id !== id));
    if (target) {
      setToastMessage(`Removed "${target.name}" from deck.`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleSelectFromDeck = (char: Character) => {
    setCurrentCharacter(char);
    const cardElement = document.getElementById("player-card-workspace");
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setToastMessage(`Viewing folio for "${char.name}".`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleClearDeck = () => {
    setDeck([]);
    setToastMessage("All folios purged from deck.");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const classDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    deck.forEach((c) => {
      counts[c.characterClass] = (counts[c.characterClass] || 0) + 1;
    });
    return counts;
  }, [deck]);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#ebe2d0] flex flex-col selection:bg-[#7d643d] selection:text-[#f5f0e6]">
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 animate-fade-in"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#181d24] border border-[#7d643d] text-[#f5f0e6] shadow-2xl text-xs font-display rounded">
            <CheckCircle2
              className="w-4 h-4 text-[#8fb89c] shrink-0"
              aria-hidden="true"
            />
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-[#8c7355] hover:text-white"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <header className="border-b border-[#2d251d] bg-[#111419]/95 backdrop-blur-sm px-4 sm:px-8 lg:px-12 py-2.5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a
            href="/"
            className="flex items-center gap-2.5 group whitespace-nowrap"
            title="Grimoire Folio: Fantasy Character Creator"
          >
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt="Grimoire Crest"
              className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-display font-bold text-sm tracking-widest text-[#f5f0e6] group-hover:text-[#e3bd68] transition-colors">
              Grimoire Folio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#8c7355] bg-[#0c0e12] px-3 py-1 rounded border border-[#231e17]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8fb89c] animate-pulse" />
            <span>
              Attuned:{" "}
              <strong className="text-[#d8cdb7] font-display font-semibold">
                {selectedClassFilter === "All"
                  ? "Open Archetype"
                  : selectedClassFilter}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#my-deck-section"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display tracking-wider text-[#d8cdb7] hover:text-[#f5f0e6] bg-[#181d24] hover:bg-[#222933] border border-[#3d3326] rounded transition-colors"
              title="Jump to My Deck collection"
            >
              <Archive
                className="w-3.5 h-3.5 text-[#c49d48]"
                aria-hidden="true"
              />
              <span>Deck</span>
              <span className="px-1.5 py-0.2 bg-[#2b241a] text-[#e3bd68] border border-[#7d643d] rounded text-[10px] font-mono">
                {deck.length}
              </span>
            </a>

            <button
              type="button"
              onClick={() => setShowClassGuide(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display text-[#a39480] hover:text-[#f5f0e6] hover:bg-[#1a1f26] border border-[#2d251d] rounded transition-colors cursor-pointer"
              title="Examine Seven Disciplines Lore"
            >
              <BookOpen
                className="w-3.5 h-3.5 text-[#c49d48]"
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Codex</span>
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              title={isAudioMuted ? "Unmute dice effects" : "Mute dice effects"}
              aria-label={
                isAudioMuted ? "Unmute dice audio" : "Mute dice audio"
              }
              className="p-1.5 text-[#a39480] hover:text-[#f5f0e6] hover:bg-[#1a1f26] border border-[#2d251d] rounded cursor-pointer transition-colors"
            >
              {isAudioMuted ? (
                <VolumeX
                  className="w-4 h-4 text-[#8c7355]"
                  aria-hidden="true"
                />
              ) : (
                <Volume2
                  className="w-4 h-4 text-[#c49d48]"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <section className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1f26] border border-[#3d3326] text-xs font-display text-[#c49d48] rounded">
            <span>Antique Bestiary & Manuscript Workspace</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#f5f0e6]">
            Fantasy Character Creator
          </h1>

          <p className="text-sm sm:text-base text-[#b5a589] font-editorial italic leading-relaxed max-w-xl mx-auto">
            Inscribe original champions onto illuminated field journal plates.
            Generate AI portraits, record origin lore, and preserve your deck.
          </p>

          <div className="inline-flex items-center p-1 bg-[#13161b] border border-[#3d3326] rounded-md text-xs font-display">
            <button
              type="button"
              onClick={() => {
                setGenderPreference("Female");
                handleGenerate(undefined, "Female");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                genderPreference === "Female"
                  ? "bg-[#2b241a] text-[#e3bd68] border border-[#7d643d] font-semibold"
                  : "text-[#8c7355] hover:text-[#d8cdb7]"
              }`}
            >
              <Crown
                className="w-3.5 h-3.5 text-[#c49d48]"
                aria-hidden="true"
              />
              <span>Fierce Heroine</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setGenderPreference("Male");
                handleGenerate(undefined, "Male");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                genderPreference === "Male"
                  ? "bg-[#2b241a] text-[#e3bd68] border border-[#7d643d] font-semibold"
                  : "text-[#8c7355] hover:text-[#d8cdb7]"
              }`}
            >
              <Shield
                className="w-3.5 h-3.5 text-[#c49d48]"
                aria-hidden="true"
              />
              <span>Mighty Champion</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setGenderPreference("Any");
                handleGenerate(undefined, "Any");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                genderPreference === "Any"
                  ? "bg-[#2b241a] text-[#e3bd68] border border-[#7d643d] font-semibold"
                  : "text-[#8c7355] hover:text-[#d8cdb7]"
              }`}
            >
              <Sparkles
                className="w-3.5 h-3.5 text-[#c49d48]"
                aria-hidden="true"
              />
              <span>Any Lineage</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              id="generate-button"
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className={`inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base font-display font-bold rounded text-[#0d0f12] bg-[#c49d48] hover:bg-[#d9b15b] border-2 border-[#e3bd68] shadow-md transition-all active:scale-[0.99] cursor-pointer ${
                isGenerating ? "opacity-75 cursor-wait" : ""
              }`}
            >
              <Dices
                className={`w-5 h-5 text-[#0d0f12] ${isGenerating ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              <span className="tracking-widest uppercase">
                Generate Character
              </span>
              <span className="hidden sm:inline-block ml-1 text-xs font-mono font-normal opacity-70 px-1.5 py-0.5 border border-[#0d0f12]/30 rounded">
                Space
              </span>
            </button>
          </div>

          {/* Class Affinity Selector */}
          <div className="pt-2">
            <ClassSelector
              selectedClass={selectedClassFilter}
              onSelectClass={(cls) => {
                setSelectedClassFilter(cls);
                handleGenerate(cls);
              }}
            />
          </div>
        </section>

        <section
          id="player-card-workspace"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Main Player Card */}
          <div className="lg:col-span-8 w-full">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#2d251d]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-display uppercase tracking-widest text-[#b09572]">
                  Active Folio Dossier
                </span>
                <span className="px-2 py-0.5 bg-[#181d24] border border-[#3d3326] text-[10px] font-mono text-[#c49d48] rounded">
                  {currentCharacter.gender === "Female"
                    ? "Heroine Variant"
                    : "Champion Variant"}
                </span>
              </div>
              <span className="text-xs font-mono text-[#8c7355]">
                {isCurrentSaved ? "Card Archived in Deck" : "Unsaved Record"}
              </span>
            </div>

            <PlayerCard
              character={currentCharacter}
              onUpdateCharacter={handleUpdateCharacter}
              onSaveToDeck={handleSaveToDeck}
              isSavedInDeck={isCurrentSaved}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 w-full space-y-6">
            <div className="bg-[#13161b] border border-[#3d3326] p-5 rounded-md shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#2d251d]">
                <div className="flex items-center gap-2">
                  <Archive
                    className="w-4 h-4 text-[#c49d48]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-display uppercase tracking-wider text-[#d8cdb7] font-semibold">
                    Archived Folio Summary
                  </span>
                </div>
                <span className="text-xs font-mono text-[#e3bd68] bg-[#221a12] px-2 py-0.5 border border-[#5c4222] rounded">
                  {deck.length} {deck.length === 1 ? "Card" : "Cards"}
                </span>
              </div>

              <p className="text-xs text-[#a39480] font-editorial italic leading-relaxed">
                Permanent records stored in browser memory. Each card retains
                its own triad stats, portrait likeness, and origin lore.
              </p>

              {deck.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#8c7355] block">
                    Discipline Distribution
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(classDistribution).map(([cls, count]) => (
                      <span
                        key={cls}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#181d24] border border-[#3d3326] text-[11px] font-mono text-[#d8cdb7] rounded"
                      >
                        {getClassIcon(
                          cls as CharacterClass,
                          "w-3 h-3 text-[#c49d48]",
                        )}
                        <span>{cls}:</span>
                        <strong className="text-[#e3bd68]">{count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Archive Actions */}
              <div className="pt-2 border-t border-[#231e17] space-y-2">
                <a
                  href="#my-deck-section"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-display text-[#d8cdb7] bg-[#1a1f26] hover:bg-[#252b36] border border-[#473a2b] rounded transition-colors"
                >
                  <Layers
                    className="w-3.5 h-3.5 text-[#c49d48]"
                    aria-hidden="true"
                  />
                  <span>Browse Deck Archives ({deck.length})</span>
                </a>

                {deck.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => exportDeckAsJson(deck)}
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-display text-[#d8cdb7] bg-[#14171d] hover:bg-[#1e242d] border border-[#3d3326] rounded transition-colors cursor-pointer"
                    >
                      <Download
                        className="w-3 h-3 text-[#c49d48]"
                        aria-hidden="true"
                      />
                      <span>Export JSON</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Purge all archived characters from your deck?",
                          )
                        ) {
                          handleClearDeck();
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-display text-[#c96866] bg-[#221616] hover:bg-[#331c1c] border border-[#5c2e2e] rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" aria-hidden="true" />
                      <span>Purge Deck</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#13161b] border border-[#3d3326] p-5 rounded-md shadow-lg space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#2d251d]">
                <div className="flex items-center gap-2">
                  <BookOpen
                    className="w-4 h-4 text-[#c49d48]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-display uppercase tracking-wider text-[#d8cdb7] font-semibold">
                    Discipline Index
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowClassGuide(true)}
                  className="text-xs text-[#c49d48] hover:text-[#e3bd68] font-display cursor-pointer"
                >
                  Codex Details
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {CLASSES.map((cls) => {
                  const detail = CLASS_DETAILS[cls];
                  const isActive = currentCharacter.characterClass === cls;

                  return (
                    <div
                      key={cls}
                      className={`flex items-center justify-between p-2 rounded transition-all ${
                        isActive
                          ? "bg-[#2b241a] text-[#e3bd68] border border-[#7d643d]"
                          : "hover:bg-[#1a1f26] text-[#a39480] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 bg-[#101317] border border-[#2b241a] rounded text-[#c49d48]">
                          {getClassIcon(cls, "w-3.5 h-3.5")}
                        </div>
                        <div>
                          <span className="font-display font-medium text-[#f5f0e6] block">
                            {cls}
                          </span>
                          <span className="text-[10px] text-[#8c7355] font-mono capitalize">
                            Affinity: {detail.primaryStat}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleGenerate(cls)}
                        className={`px-2.5 py-1 text-[11px] font-display rounded border transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#c49d48] text-[#0d0f12] font-semibold border-[#e3bd68]"
                            : "bg-[#181d24] text-[#d8cdb7] hover:text-[#fff] hover:bg-[#252b36] border-[#3d3326]"
                        }`}
                      >
                        {isActive ? "Active" : "Inscribe"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section: My Deck Folio Collection */}
        <section className="pt-6 border-t border-[#2d251d]">
          <MyDeck
            deck={deck}
            activeCharacterId={currentCharacter.id}
            onSelectCharacter={handleSelectFromDeck}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
          />
        </section>
      </main>

      {showClassGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Seven Classic Archetypes Codex"
          className="fixed inset-0 z-50 bg-[#0d0f12]/92 flex items-center justify-center p-4"
        >
          <div className="bg-[#14171d] border-2 border-[#544431] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl rounded">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2d251d] bg-[#101317]">
              <div className="flex items-center gap-2">
                <BookOpen
                  className="w-4 h-4 text-[#c49d48]"
                  aria-hidden="true"
                />
                <h3 className="font-display text-base font-bold text-[#f5f0e6] tracking-wide">
                  Seven Classic Disciplines Codex
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowClassGuide(false)}
                className="p-1 text-[#a39480] hover:text-[#fff]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              {CLASSES.map((cls) => {
                const detail = CLASS_DETAILS[cls];
                return (
                  <div
                    key={cls}
                    className="p-3.5 bg-[#101317] border border-[#2b241a] rounded flex flex-col sm:flex-row items-start gap-3.5"
                  >
                    <div className="p-2 bg-[#181d24] border border-[#3d3326] text-[#c49d48] rounded shrink-0">
                      {getClassIcon(cls, "w-5 h-5")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h4 className="font-display font-bold text-sm text-[#f5f0e6]">
                          {detail.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#8c7355] capitalize">
                          Primary: {detail.primaryStat}
                        </span>
                      </div>
                      <p className="text-xs text-[#b5a589] font-editorial italic mb-2 leading-relaxed">
                        {detail.tagline}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#a39480]">
                        <span className="font-display text-[#c49d48]">
                          Specializations:
                        </span>
                        <span>{detail.specializations.join(" · ")}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleGenerate(cls);
                        setShowClassGuide(false);
                      }}
                      className="shrink-0 self-end sm:self-center px-3 py-1.5 text-xs font-display text-[#e3bd68] bg-[#2b241a] hover:bg-[#382f22] border border-[#7d643d] rounded cursor-pointer transition-colors"
                    >
                      Inscribe {cls}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-[#2d251d] py-6 px-6 text-center text-xs text-[#8c7355] font-editorial italic">
        <p>Grimoire Folio · Inscribed with Github Copilot</p>
      </footer>
    </div>
  );
}
