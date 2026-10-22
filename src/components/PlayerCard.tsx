/**
 * Component: PlayerCard
 * Authentic editorial fantasy player card modeled after antique bestiaries and illuminated field journals.
 * Encapsulates the character's identity, portrait, triad stats, secondary attributes, and AI origin lore.
 */
import React, { useState } from 'react';
import { Character } from '../types/character';
import { CLASS_DETAILS } from '../data/characterData';
import { ClassBadge } from './ClassBadge';
import { StatBar } from './StatBar';
import { CharacterPortrait } from './CharacterPortrait';
import { PlayerStatsTriad } from './PlayerStatsTriad';
import { generateBackstory } from '../services/backstoryService';
import {
  Copy,
  Check,
  Feather,
  AlertTriangle,
  Loader2,
  BookmarkPlus,
  BookmarkCheck,
  ScrollText,
} from 'lucide-react';

interface PlayerCardProps {
  character: Character;
  onUpdateCharacter: (updated: Character) => void;
  onSaveToDeck: (character: Character) => void;
  isSavedInDeck: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  character,
  onUpdateCharacter,
  onSaveToDeck,
  isSavedInDeck,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [backstoryError, setBackstoryError] = useState<string | null>(null);
  const detail = CLASS_DETAILS[character.characterClass];

  const handleCopyRecord = async () => {
    const text = `=======================================
FOLIO RECORD: ${character.name.toUpperCase()}
=======================================
TITLE: ${character.title}
DISCIPLINE: ${character.characterClass} (${character.specialization})
LINEAGE: ${character.race} · ${character.alignment}
TIER: Level ${character.level}

BATTLE METRICS:
- Health: ${character.health} HP
- Mana: ${character.mana} MP
- Strength: ${character.strength} STR

ATTRIBUTES:
- DEX: ${character.stats.dexterity} | CON: ${character.stats.constitution}
- INT: ${character.stats.intelligence} | WIS: ${character.stats.wisdom} | CHA: ${character.stats.charisma}

ORIGIN CHRONICLE:
"${character.backstory}"

SIGNATURE FEAT:
${character.signatureAbility.name} [${character.signatureAbility.type}]
${character.signatureAbility.description}
Activation: ${character.signatureAbility.costOrCooldown}

EQUIPMENT:
- Armament: ${character.equipment.mainHand}
- Attire: ${character.equipment.armor}
- Relic: ${character.equipment.accessory}

INSCRIPTION:
${character.quote}
=======================================`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateBackstoryClick = async () => {
    setIsGeneratingBackstory(true);
    setBackstoryError(null);

    try {
      const result = await generateBackstory(character);
      // Keeps stats, portrait, name, and class stable!
      onUpdateCharacter({
        ...character,
        backstory: result.backstory,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error inscribing backstory.';
      setBackstoryError(message);
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  const handleUpdatePortrait = (imageUrl: string, prompt?: string) => {
    // Keeps stats, backstory, name, and class stable!
    onUpdateCharacter({
      ...character,
      portraitUrl: imageUrl,
      portraitPrompt: prompt,
    });
  };

  return (
    <article
      id="fantasy-player-card"
      aria-label={`Player Card for ${character.name}`}
      className="relative w-full rounded-md border-2 border-[#544431] bg-[#14171d] shadow-xl overflow-hidden manuscript-border corner-flourish"
    >
      {/* Antique Headband / Double Hairline Strip */}
      <div className="h-2 w-full bg-[#201912] border-b border-[#3d3326] flex items-center justify-between px-3">
        <span className="text-[7px] text-[#7d643d] font-mono tracking-widest uppercase">Folio № {character.id.slice(-6)}</span>
        <span className="text-[7px] text-[#7d643d] font-mono tracking-widest uppercase">Manuscript Archive</span>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Card Header: Identity & Primary Deck Action */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#2d251d]">
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Metadata Rubric */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <ClassBadge characterClass={character.characterClass} size="sm" />
              <span className="text-[#6e5840]">/</span>
              <span className="text-[#d8cdb7] font-medium font-sans">{character.race}</span>
              <span className="text-[#6e5840]">/</span>
              <span className="text-[#a39480] font-sans">{character.alignment}</span>
              <span className="text-[#6e5840]">/</span>
              <span className="text-[#c49d48] font-mono">Tier {character.level}</span>
            </div>

            {/* Character Name - Expressive Fantasy Display Serif */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[#f5f0e6] leading-tight">
              {character.name}
            </h1>

            {/* Epithet / Title */}
            <p className="text-sm font-editorial italic text-[#c49d48] tracking-wide">
              {character.title}
            </p>
          </div>

          {/* "Save to Deck" Button (Requirement 4 & 6) */}
          <div className="shrink-0 self-start sm:self-center">
            <button
              id="save-to-deck-button"
              type="button"
              onClick={() => onSaveToDeck(character)}
              disabled={isSavedInDeck}
              aria-label={isSavedInDeck ? `${character.name} is saved in deck` : `Save ${character.name} to deck`}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-display tracking-wider rounded border transition-colors cursor-pointer ${
                isSavedInDeck
                  ? 'bg-[#18261e] border-[#385e48] text-[#8fb89c] cursor-default'
                  : 'bg-[#2b241a] hover:bg-[#382f22] border-[#7d643d] text-[#e3bd68]'
              }`}
            >
              {isSavedInDeck ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#8fb89c]" aria-hidden="true" />
                  <span>Saved in Deck</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4 text-[#c49d48]" aria-hidden="true" />
                  <span>Save to Deck</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Asymmetric Core Showcase: Portrait alongside Vitals Triad & Traits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Portrait Column (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <CharacterPortrait
              character={character}
              onUpdatePortrait={handleUpdatePortrait}
              className="w-full"
            />
          </div>

          {/* Vitals & Identity Column (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            {/* The Three Core Stats: Health, Mana, Strength (Requirement 3) */}
            <PlayerStatsTriad
              health={character.health}
              mana={character.mana}
              strength={character.strength}
              gender={character.gender}
            />

            {/* Field Specialization & Resource Note */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#101317] border border-[#2b241a] rounded">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#8c7355] block">
                  Archetype Focus
                </span>
                <span className="font-display font-semibold text-[#f5f0e6] block mt-0.5 truncate">
                  {character.specialization}
                </span>
              </div>

              <div className="p-2.5 bg-[#101317] border border-[#2b241a] rounded">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#8c7355] block">
                  Energy Vessel
                </span>
                <span className="font-mono text-[#e3bd68] block mt-0.5">
                  {detail.resourceName}: {character.mana}
                </span>
              </div>
            </div>

            {/* Quick Actions (Copy & Export) */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#2d251d]">
              <button
                type="button"
                onClick={handleCopyRecord}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-[#d8cdb7] bg-[#1a1f26] hover:bg-[#252b36] border border-[#3d3326] rounded cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#8fb89c]" aria-hidden="true" />
                    <span className="text-[#8fb89c]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Card Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Attributes Stat Bar */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#b09572]">
              Secondary Attribute Roll
            </span>
            <span className="text-[10px] font-mono text-[#8c7355]">
              Standard 4d6 Drop Lowest
            </span>
          </div>
          <StatBar stats={character.stats} characterClass={character.characterClass} />
        </div>

        {/* Feats & Field Equipment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Signature Ability */}
          <div className="p-3.5 bg-[#101317] border border-[#2b241a] rounded flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-display uppercase tracking-widest text-[#c49d48]">
                  Signature Feat
                </span>
                <span className="text-[10px] font-mono text-[#a39480] bg-[#1a1f26] px-1.5 py-0.5 border border-[#3d3326] rounded">
                  {character.signatureAbility.type}
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#f5f0e6] mb-1">
                {character.signatureAbility.name}
              </h4>
              <p className="text-xs leading-relaxed text-[#b5a589] font-sans">
                {character.signatureAbility.description}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#231e17] text-[10px] font-mono text-[#8c7355]">
              Vigor Cost: {character.signatureAbility.costOrCooldown}
            </div>
          </div>

          {/* Equipment */}
          <div className="p-3.5 bg-[#101317] border border-[#2b241a] rounded">
            <span className="text-[10px] font-display uppercase tracking-widest text-[#c49d48] block mb-2">
              Field Equipment
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[#8c7355]">Armament</span>
                <span className="text-[#ebe2d0] text-right font-medium">{character.equipment.mainHand}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[#8c7355]">Attire</span>
                <span className="text-[#ebe2d0] text-right font-medium">{character.equipment.armor}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[#8c7355]">Relic</span>
                <span className="text-[#ebe2d0] text-right font-medium">{character.equipment.accessory}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Backstory & Origin Lore Section (Requirement 2 & Section 4) */}
        <div
          id="backstory-section"
          className="p-5 rounded border border-[#3d3326] bg-[#101317] relative"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#231e17]">
            <div className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#e3bd68]">
              <ScrollText className="w-4 h-4 text-[#c49d48]" aria-hidden="true" />
              <span>Origin Chronicle</span>
            </div>

            {/* "Generate Backstory" Button */}
            <button
              id="generate-backstory-button"
              type="button"
              onClick={handleGenerateBackstoryClick}
              disabled={isGeneratingBackstory}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display tracking-wider rounded border transition-colors cursor-pointer self-start sm:self-auto ${
                isGeneratingBackstory
                  ? 'bg-[#1e242d] border-[#473a2b] text-[#8c7355] cursor-wait'
                  : 'bg-[#2b241a] hover:bg-[#382f22] border-[#7d643d] text-[#e3bd68]'
              }`}
            >
              {isGeneratingBackstory ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#c49d48]" aria-hidden="true" />
                  <span>Inscribing Lore...</span>
                </>
              ) : (
                <>
                  <Feather className="w-3.5 h-3.5 text-[#c49d48]" aria-hidden="true" />
                  <span>{character.backstory ? 'Regenerate Backstory' : 'Generate Backstory'}</span>
                </>
              )}
            </button>
          </div>

          {/* Error Feedback */}
          {backstoryError && (
            <div
              className="mb-3 p-2.5 bg-[#261616] border border-[#7a3232] text-[#f5c6c6] text-xs flex items-center justify-between"
              role="alert"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#e06c6c]" aria-hidden="true" />
                <span>{backstoryError}</span>
              </div>
              <button
                type="button"
                onClick={handleGenerateBackstoryClick}
                className="text-xs underline text-[#f5d082] hover:text-[#fff]"
              >
                Retry
              </button>
            </div>
          )}

          {/* Backstory Body */}
          <div className="min-h-[48px] flex items-center">
            {isGeneratingBackstory ? (
              <p className="text-xs text-[#b5a589] font-editorial italic animate-pulse">
                Distilling origin history from ancient chronicle archives...
              </p>
            ) : (
              <p className="text-sm sm:text-base leading-relaxed text-[#f5f0e6] font-editorial italic">
                "{character.backstory}"
              </p>
            )}
          </div>

          {/* Manuscript Inscription Quote */}
          {character.quote && (
            <div className="mt-3 pt-2 border-t border-[#231e17] text-xs text-[#a39480] font-editorial italic">
              Inscription: {character.quote}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
