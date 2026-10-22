/**
 * Component: PlayerStatsTriad
 * Displays the core triad: Health, Mana, and Strength with antique bestiary stat block typography.
 * Meets WCAG AA contrast standards and supports tabular numeric alignment.
 */
import React from 'react';
import { Heart, Sparkles, Sword } from 'lucide-react';

interface PlayerStatsTriadProps {
  health: number;
  mana: number;
  strength: number;
  gender?: 'Female' | 'Male';
}

export const PlayerStatsTriad: React.FC<PlayerStatsTriadProps> = ({
  health,
  mana,
  strength,
  gender,
}) => {
  const isHighStrength = strength >= 16;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] font-display uppercase tracking-widest text-[#b09572]">
          Vitals & Combat Prowess
        </span>
        <span className="text-[11px] font-mono text-[#8c7355]">
          {isHighStrength
            ? (gender === 'Female' ? '★ Formidable Heroine' : '★ Formidable Might')
            : 'Standard Vigor'}
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#3d3326] bg-[#14171d] border border-[#3d3326] rounded-md overflow-hidden">
        {/* Health */}
        <div
          className="p-3 text-center"
          aria-label={`Health: ${health} Hit Points`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#c96866] mb-1 font-display">
            <Heart className="w-3.5 h-3.5 fill-[#c96866]/20" aria-hidden="true" />
            <span className="tracking-wider">Health</span>
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#f5f0e6] tabular-nums">
            {health}
          </div>
          <span className="text-[10px] font-mono uppercase text-[#8c7355] tracking-widest">
            HP
          </span>
        </div>

        {/* Mana */}
        <div
          className="p-3 text-center"
          aria-label={`Mana: ${mana} Points`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#9585ba] mb-1 font-display">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="tracking-wider">Mana</span>
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#f5f0e6] tabular-nums">
            {mana}
          </div>
          <span className="text-[10px] font-mono uppercase text-[#8c7355] tracking-widest">
            MP
          </span>
        </div>

        {/* Strength */}
        <div
          className={`p-3 text-center transition-colors ${
            isHighStrength ? 'bg-[#211a12]' : ''
          }`}
          aria-label={`Strength: ${strength} Rating`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#c49d48] mb-1 font-display">
            <Sword className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="tracking-wider">Strength</span>
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#e3bd68] tabular-nums flex items-center justify-center gap-1">
            <span>{strength}</span>
            {isHighStrength && (
              <span className="text-[10px] text-[#e3bd68] bg-[#3d2e17] px-1 rounded font-normal font-sans" title="Peak Prowess">
                ★
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase text-[#8c7355] tracking-widest">
            STR
          </span>
        </div>
      </div>
    </div>
  );
};
