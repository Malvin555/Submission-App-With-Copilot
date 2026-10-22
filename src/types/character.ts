/**
 * Types: Character & System Schema
 * Core definitions for fantasy character entities, attributes, battle triads, and class archetypes.
 */
export type CharacterClass =
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Ranger'
  | 'Paladin'
  | 'Necromancer'
  | 'Druid';

export type CharacterRace =
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Human'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Half-Orc'
  | 'Halfling'
  | 'Aasimar'
  | 'Gnome';

export type Alignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterAbility {
  name: string;
  type: 'Active' | 'Passive' | 'Ultimate';
  description: string;
  costOrCooldown: string;
}

export interface CharacterEquipment {
  mainHand: string;
  armor: string;
  accessory: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  race: CharacterRace;
  alignment: Alignment;
  specialization: string;
  level: number;
  health: number;
  mana: number;
  strength: number;
  manaOrEnergy: number;
  stats: CharacterStats;
  signatureAbility: CharacterAbility;
  equipment: CharacterEquipment;
  backstory: string;
  quote: string;
  gender?: 'Female' | 'Male';
  createdAt: number;
  isFavorite?: boolean;
  portraitUrl?: string;
  portraitPrompt?: string;
}

export interface ClassDetail {
  id: CharacterClass;
  name: string;
  tagline: string;
  primaryStat: keyof CharacterStats;
  secondaryStat: keyof CharacterStats;
  resourceName: 'Mana' | 'Stamina' | 'Energy' | 'Holy Power' | 'Soul Shards' | 'Nature Fury';
  baseColor: string;
  accentColor: string;
  themeGradient: string;
  borderClass: string;
  iconName: string;
  specializations: string[];
  abilities: CharacterAbility[];
  weapons: string[];
  armors: string[];
  accessories: string[];
}
