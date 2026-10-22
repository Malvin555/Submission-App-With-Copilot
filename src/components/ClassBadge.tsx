/**
 * Component: ClassBadge
 * Displays the character class with an authentic manuscript rubric style and clean typography.
 */
import React from 'react';
import { CharacterClass } from '../types/character';
import { CLASS_DETAILS } from '../data/characterData';
import {
  Wand2,
  Crosshair,
  Shield,
  Compass,
  Sun,
  Skull,
  TreePine,
  Sparkles,
} from 'lucide-react';

interface ClassBadgeProps {
  characterClass: CharacterClass;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function getClassIcon(characterClass: CharacterClass, className = 'w-4 h-4') {
  switch (characterClass) {
    case 'Mage':
      return <Wand2 className={className} aria-hidden="true" />;
    case 'Rogue':
      return <Crosshair className={className} aria-hidden="true" />;
    case 'Warrior':
      return <Shield className={className} aria-hidden="true" />;
    case 'Ranger':
      return <Compass className={className} aria-hidden="true" />;
    case 'Paladin':
      return <Sun className={className} aria-hidden="true" />;
    case 'Necromancer':
      return <Skull className={className} aria-hidden="true" />;
    case 'Druid':
      return <TreePine className={className} aria-hidden="true" />;
    default:
      return <Sparkles className={className} aria-hidden="true" />;
  }
}

export const ClassBadge: React.FC<ClassBadgeProps> = ({
  characterClass,
  size = 'md',
  showTagline = false,
}) => {
  const detail = CLASS_DETAILS[characterClass];

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2',
    lg: 'text-sm px-4 py-1.5 gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div className="inline-flex flex-col">
      <div
        className={`inline-flex items-center rounded border border-[#6b583e]/50 bg-[#161a20] text-[#e3bd68] ${sizeClasses[size]}`}
      >
        <span className="text-[#c49d48]">
          {getClassIcon(characterClass, iconSizes[size])}
        </span>
        <span className="font-display font-semibold tracking-widest uppercase">
          {detail.name}
        </span>
      </div>

      {showTagline && (
        <span className="text-xs text-[#b5a589] mt-1 font-editorial italic">
          {detail.tagline}
        </span>
      )}
    </div>
  );
};
