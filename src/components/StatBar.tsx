/**
 * Component: StatBar
 * Displays secondary attributes (STR, DEX, CON, INT, WIS, CHA) in an editorial ledger format.
 * Features accessible tabular numerals, score modifiers, and subtle meter lines.
 */
import React from 'react';
import { CharacterStats, CharacterClass } from '../types/character';
import { CLASS_DETAILS } from '../data/characterData';
import { Shield, Zap, Heart, Brain, Eye, Sparkles } from 'lucide-react';

interface StatBarProps {
  stats: CharacterStats;
  characterClass: CharacterClass;
}

interface StatItemConfig {
  key: keyof CharacterStats;
  label: string;
  abbrev: string;
  icon: React.ReactNode;
}

const STAT_CONFIG: StatItemConfig[] = [
  { key: 'strength', label: 'Strength', abbrev: 'STR', icon: <Shield className="w-3.5 h-3.5 text-[#c49d48]" aria-hidden="true" /> },
  { key: 'dexterity', label: 'Dexterity', abbrev: 'DEX', icon: <Zap className="w-3.5 h-3.5 text-[#8fb89c]" aria-hidden="true" /> },
  { key: 'constitution', label: 'Constitution', abbrev: 'CON', icon: <Heart className="w-3.5 h-3.5 text-[#c96866]" aria-hidden="true" /> },
  { key: 'intelligence', label: 'Intelligence', abbrev: 'INT', icon: <Brain className="w-3.5 h-3.5 text-[#9585ba]" aria-hidden="true" /> },
  { key: 'wisdom', label: 'Wisdom', abbrev: 'WIS', icon: <Eye className="w-3.5 h-3.5 text-[#819ba8]" aria-hidden="true" /> },
  { key: 'charisma', label: 'Charisma', abbrev: 'CHA', icon: <Sparkles className="w-3.5 h-3.5 text-[#d9b15b]" aria-hidden="true" /> },
];

function getModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export const StatBar: React.FC<StatBarProps> = ({ stats, characterClass }) => {
  const detail = CLASS_DETAILS[characterClass];
  const primaryStat = detail.primaryStat;
  const secondaryStat = detail.secondaryStat;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {STAT_CONFIG.map(({ key, abbrev, icon }) => {
        const score = stats[key];
        const modifier = getModifier(score);
        const isPrimary = key === primaryStat;
        const isSecondary = key === secondaryStat;
        const percentage = Math.min(100, Math.max(10, (score / 20) * 100));

        return (
          <div
            key={key}
            className={`p-2.5 rounded border transition-colors flex flex-col justify-between ${
              isPrimary
                ? 'bg-[#1e1b15] border-[#7d643d]'
                : isSecondary
                ? 'bg-[#15191f] border-[#404c5e]'
                : 'bg-[#101317] border-[#2b241a]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="flex items-center gap-1.5 text-xs text-[#a39480] font-display">
                {icon}
                <span className="font-semibold tracking-wider">{abbrev}</span>
              </span>
              <span className="text-xs font-mono text-[#8c7355] tabular-nums">
                {modifier}
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-lg font-bold font-mono tabular-nums text-[#f5f0e6]">
                {score}
              </span>
              {isPrimary && (
                <span className="text-[9px] uppercase font-display font-semibold text-[#e3bd68] tracking-widest">
                  Primary
                </span>
              )}
            </div>

            {/* Restrained rule meter */}
            <div className="w-full bg-[#0d0f12] h-1 overflow-hidden rounded-full">
              <div
                className={`h-full transition-all duration-300 ${
                  isPrimary
                    ? 'bg-[#c49d48]'
                    : isSecondary
                    ? 'bg-[#8c7355]'
                    : 'bg-[#473a2b]'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
