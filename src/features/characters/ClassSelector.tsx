/**
 * Component: ClassSelector
 * Antique manuscript segmented bar allowing users to filter by or focus on a specific class discipline.
 */
import React from 'react';
import { CharacterClass } from '../../types/character';
import { CLASSES } from '../../data/characterData';
import { getClassIcon } from '../../components/ClassBadge';

interface ClassSelectorProps {
  selectedClass: CharacterClass | 'All';
  onSelectClass: (cls: CharacterClass | 'All') => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  onSelectClass,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] font-display uppercase tracking-widest text-[#b09572]">
          Discipline Affinity
        </span>
        <span className="text-[11px] font-mono text-[#8c7355]">
          {selectedClass === 'All' ? 'Open Archetype' : `Attuned: ${selectedClass}`}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#13161b] border border-[#3d3326] rounded-md">
        <button
          type="button"
          onClick={() => onSelectClass('All')}
          className={`px-3 py-1.5 text-xs font-display tracking-wider rounded transition-colors cursor-pointer whitespace-nowrap ${
            selectedClass === 'All'
              ? 'bg-[#2b241a] text-[#e3bd68] border border-[#7d643d] font-semibold'
              : 'text-[#a39480] hover:text-[#f5f0e6] hover:bg-[#1a1f26] border border-transparent'
          }`}
        >
          Any Class
        </button>

        {CLASSES.map((cls) => {
          const isSelected = selectedClass === cls;
          return (
            <button
              key={cls}
              type="button"
              onClick={() => onSelectClass(cls)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display tracking-wider rounded transition-colors cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#2b241a] text-[#e3bd68] border border-[#7d643d] font-semibold'
                  : 'text-[#a39480] hover:text-[#f5f0e6] hover:bg-[#1a1f26] border border-transparent'
              }`}
            >
              {getClassIcon(cls, 'w-3.5 h-3.5')}
              <span>{cls}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
