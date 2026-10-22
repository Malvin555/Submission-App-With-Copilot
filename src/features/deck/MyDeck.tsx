/**
 * Feature: MyDeck
 * Editorial catalog of saved player cards with search, filtering, card restoration, and removal.
 */
import React, { useState } from 'react';
import { Character } from '../../types/character';
import { exportDeckAsJson } from '../../services/deckStorage';
import { getClassIcon } from '../../components/ClassBadge';
import {
  Archive,
  Trash2,
  ExternalLink,
  Download,
  Search,
  Heart,
  Sparkles,
  Sword,
} from 'lucide-react';

interface MyDeckProps {
  deck: Character[];
  activeCharacterId: string;
  onSelectCharacter: (char: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>('All');

  const filteredDeck = deck.filter((char) => {
    if (filterClass !== 'All' && char.characterClass !== filterClass) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        char.name.toLowerCase().includes(q) ||
        char.characterClass.toLowerCase().includes(q) ||
        char.race.toLowerCase().includes(q) ||
        char.backstory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="my-deck-section" className="w-full bg-[#13161b] border border-[#3d3326] p-5 sm:p-6 rounded-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#3d3326]">
        <div className="flex items-center gap-2.5">
          <Archive className="w-5 h-5 text-[#c49d48]" aria-hidden="true" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-display font-bold text-[#f5f0e6] tracking-wider uppercase">
                My Deck
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#1e242d] text-[#e3bd68] border border-[#473a2b] rounded">
                {deck.length} {deck.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
            <p className="text-xs text-[#a39480] font-editorial italic">
              Archived folio entries stored in local journal memory
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {deck.length > 0 && (
            <button
              type="button"
              onClick={() => exportDeckAsJson(deck)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display text-[#d8cdb7] bg-[#1a1f26] hover:bg-[#252b36] border border-[#473a2b] rounded cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#c49d48]" aria-hidden="true" />
              <span>Export Folio</span>
            </button>
          )}

          {deck.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Purge all archived characters from your deck?')) {
                  onClearDeck();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display text-[#c96866] bg-[#221616] hover:bg-[#331c1c] border border-[#5c2e2e] rounded cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Purge Deck</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search */}
      {deck.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center gap-2.5 mb-4">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c7355]" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, class, origin, or lineage..."
              aria-label="Search saved characters"
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#0d0f12] border border-[#3d3326] rounded text-[#f5f0e6] placeholder-[#8c7355] focus:border-[#c49d48]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['All', 'Mage', 'Rogue', 'Warrior', 'Ranger', 'Paladin', 'Necromancer', 'Druid'].map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setFilterClass(cls)}
                className={`px-2.5 py-1 text-[11px] font-display rounded whitespace-nowrap transition-colors cursor-pointer ${
                  filterClass === cls
                    ? 'bg-[#2b241a] text-[#e3bd68] border border-[#7d643d]'
                    : 'text-[#8c7355] hover:text-[#d8cdb7]'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {deck.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-[#3d3326] rounded p-6">
          <p className="font-display text-sm text-[#d8cdb7] mb-1">
            Archival Folio Unpopulated
          </p>
          <p className="text-xs text-[#8c7355] font-editorial italic max-w-sm mx-auto">
            Generate a hero above and click "Save to Deck" to inscribe their card into this permanent grimoire.
          </p>
        </div>
      ) : filteredDeck.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#8c7355] font-editorial italic">
          No records match the queried criteria.
        </div>
      ) : (
        /* Folio Table/Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDeck.map((char) => {
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className={`group p-3 border rounded transition-colors cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#1e242d] border-[#c49d48]'
                    : 'bg-[#181d24] hover:bg-[#202630] border-[#3d3326]'
                }`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-14 h-14 bg-black border border-[#473a2b] shrink-0 overflow-hidden">
                    {char.portraitUrl ? (
                      <img
                        src={char.portraitUrl}
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8c7355]">
                        {getClassIcon(char.characterClass, 'w-5 h-5')}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#8c7355] font-mono mb-0.5">
                      <span className="text-[#c49d48] font-display font-semibold uppercase">
                        {char.characterClass}
                      </span>
                      <span>·</span>
                      <span className="truncate">{char.race}</span>
                    </div>

                    <h4 className="font-display font-bold text-xs text-[#f5f0e6] truncate group-hover:text-[#e3bd68] transition-colors">
                      {char.name}
                    </h4>

                    <p className="text-[10px] text-[#a39480] font-editorial italic truncate">
                      {char.title}
                    </p>
                  </div>
                </div>

                {/* Vitals summary */}
                <div className="grid grid-cols-3 gap-1 py-1 px-2 bg-[#101317] border border-[#2b241a] text-center mb-2 font-mono text-[11px] tabular-nums">
                  <span className="text-[#c96866] flex items-center justify-center gap-1">
                    <Heart className="w-2.5 h-2.5" aria-hidden="true" /> {char.health}
                  </span>
                  <span className="text-[#9585ba] flex items-center justify-center gap-1 border-x border-[#2b241a]">
                    <Sparkles className="w-2.5 h-2.5" aria-hidden="true" /> {char.mana}
                  </span>
                  <span className="text-[#c49d48] flex items-center justify-center gap-1">
                    <Sword className="w-2.5 h-2.5" aria-hidden="true" /> {char.strength}
                  </span>
                </div>

                {/* Origin Backstory Preview */}
                {char.backstory && (
                  <p className="text-[11px] leading-relaxed text-[#b5a589] font-editorial italic line-clamp-2 mb-2">
                    "{char.backstory}"
                  </p>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-[#2b241a] text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#c49d48] font-display">
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    <span>{isActive ? 'Active Dossier' : 'Load Dossier'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromDeck(char.id);
                    }}
                    title={`Remove ${char.name} from deck`}
                    aria-label={`Remove ${char.name} from deck`}
                    className="p-1 text-[#8c7355] hover:text-[#c96866] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
