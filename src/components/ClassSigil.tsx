/**
 * Component: ClassSigil
 * Renders an antique manuscript heraldic emblem and geometric sigil for each character discipline.
 */
import React from 'react';
import { CharacterClass } from '../types/character';
import { CLASS_DETAILS } from '../data/characterData';

interface ClassSigilProps {
  characterClass: CharacterClass;
  className?: string;
}

export const ClassSigil: React.FC<ClassSigilProps> = ({ characterClass, className = 'w-24 h-24' }) => {
  const detail = CLASS_DETAILS[characterClass];
  const color = detail.baseColor;
  const accent = detail.accentColor;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Heraldic Shield / Diamond Frame */}
        <polygon
          points="50,6 90,26 90,70 50,94 10,70 10,26"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.6"
          fill="#0c1017"
          fillOpacity="0.8"
        />
        <polygon
          points="50,12 84,29 84,66 50,88 16,66 16,29"
          stroke={accent}
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />

        {/* Outer Corner Accents */}
        <circle cx="50" cy="6" r="2.5" fill={accent} />
        <circle cx="50" cy="94" r="2.5" fill={accent} />
        <circle cx="10" cy="26" r="2" fill={accent} />
        <circle cx="90" cy="26" r="2" fill={accent} />

        {/* Class Specific Inner Graphic */}
        {characterClass === 'Mage' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Eye of Arcana / Starburst */}
            <circle cx="50" cy="50" r="16" stroke={accent} strokeWidth="3" />
            <circle cx="50" cy="50" r="6" fill={color} />
            <path d="M50,15 L50,85 M15,50 L85,50" stroke={accent} strokeWidth="3" strokeLinecap="round" />
            <path d="M26,26 L74,74 M26,74 L74,26" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
          </g>
        )}

        {characterClass === 'Rogue' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Crossed Daggers & Crescent */}
            <path d="M50,15 C30,30 30,70 50,85 C70,70 70,30 50,15 Z" stroke={accent} strokeWidth="2.5" />
            <path d="M30,70 L70,30" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <path d="M70,70 L30,30" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="50" r="5" fill="#f59e0b" />
          </g>
        )}

        {characterClass === 'Warrior' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Tower Bastion & Broadsword */}
            <path d="M50,12 L50,88" stroke={accent} strokeWidth="5" strokeLinecap="round" />
            <path d="M32,28 L68,28" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            <path d="M42,12 L58,12" stroke={color} strokeWidth="3" />
            <polygon points="30,42 70,42 64,78 50,86 36,78" stroke={color} strokeWidth="2" fill="none" />
          </g>
        )}

        {characterClass === 'Ranger' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Longbow & Arrow */}
            <path d="M30,20 C55,35 55,65 30,80" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M30,20 L30,80" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
            <path d="M20,50 L80,50" stroke={accent} strokeWidth="3" strokeLinecap="round" />
            <polygon points="80,50 70,44 70,56" fill={color} />
          </g>
        )}

        {characterClass === 'Paladin' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Solar Cross & Halo */}
            <circle cx="50" cy="50" r="22" stroke={accent} strokeWidth="2.5" strokeDasharray="6 3" />
            <path d="M50,16 L50,84" stroke={accent} strokeWidth="5" strokeLinecap="round" />
            <path d="M24,38 L76,38" stroke={accent} strokeWidth="5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="7" fill={color} />
          </g>
        )}

        {characterClass === 'Necromancer' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Stylized Skull & Soul Flame */}
            <path
              d="M32,38 C32,24 68,24 68,38 C68,52 60,60 60,66 L40,66 C40,60 32,52 32,38 Z"
              stroke={accent}
              strokeWidth="3"
              fill="none"
            />
            <circle cx="42" cy="42" r="4" fill={color} />
            <circle cx="58" cy="42" r="4" fill={color} />
            <path d="M44,56 L44,64 M50,56 L50,64 M56,56 L56,64" stroke={accent} strokeWidth="2" />
          </g>
        )}

        {characterClass === 'Druid' && (
          <g transform="translate(25, 25) scale(0.5)">
            {/* Triskele / Primal Oak Leaf */}
            <circle cx="50" cy="50" r="26" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
            <path
              d="M50,18 C65,30 65,55 50,82 C35,55 35,30 50,18 Z"
              stroke={color}
              strokeWidth="3.5"
              fill="none"
            />
            <path d="M50,22 L50,78" stroke={accent} strokeWidth="2" />
            <path d="M50,38 L62,48 M50,52 L60,62 M50,38 L38,48 M50,52 L40,62" stroke={accent} strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
};
