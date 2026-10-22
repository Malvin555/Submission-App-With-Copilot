/**
 * Data: Character Data & Generators
 * Inscriptions for fantasy names, class archetypes, weapons, and integer stat calculations.
 */
import {
  Character,
  CharacterClass,
  CharacterRace,
  Alignment,
  ClassDetail,
  CharacterStats,
} from '../types/character';

export const CLASSES: CharacterClass[] = [
  'Mage',
  'Rogue',
  'Warrior',
  'Ranger',
  'Paladin',
  'Necromancer',
  'Druid',
];

export const RACES: CharacterRace[] = [
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Human',
  'Tiefling',
  'Dragonborn',
  'Half-Orc',
  'Halfling',
  'Aasimar',
  'Gnome',
];

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
];

export const FIRST_NAMES: Record<CharacterClass | 'Universal', string[]> = {
  Universal: [
    'Aeloria', 'Caelen', 'Theron', 'Vanya', 'Corvus', 'Sylas', 'Astrid',
    'Balthazar', 'Rowan', 'Kaelen', 'Lyra', 'Cassian', 'Draven', 'Elowen',
    'Garrick', 'Morrigan', 'Thorin', 'Valeria', 'Zephyr', 'Aurelia', 'Faris',
    'Boran', 'Eldrin', 'Seraphina', 'Malakor', 'Lilith', 'Kestrel', 'Althea',
  ],
  Mage: [
    'Ignis', 'Vespera', 'Solas', 'Caelum', 'Aurelius', 'Zephyr', 'Archimedes',
    'Morvath', 'Eldrin', 'Aeloria', 'Thaedron', 'Illiana', 'Cyprian', 'Nesta',
    'Kaelen', 'Astrophel', 'Elidor', 'Myrddin', 'Arcadia', 'Vael',
  ],
  Rogue: [
    'Silas', 'Nyx', 'Riven', 'Dante', 'Jocelyn', 'Mara', 'Talon', 'Bram',
    'Kira', 'Vanya', 'Corvus', 'Slick', 'Fennick', 'Valen', 'Rook', 'Vesper',
    'Zephyr', 'Corin', 'Kaelan', 'Shade',
  ],
  Warrior: [
    'Brunhild', 'Ragnar', 'Kragor', 'Sigrid', 'Torvald', 'Haldor', 'Valeria',
    'Thorin', 'Balthazar', 'Garrick', 'Draven', 'Brogan', 'Karn', 'Astrid',
    'Vorn', 'Gromm', 'Althea', 'Thorgar', 'Brant', 'Viggo',
  ],
  Ranger: [
    'Briar', 'Fenris', 'Aelar', 'Talia', 'Robin', 'Branwen', 'Lorian', 'Ashford',
    'Kestrel', 'Fionn', 'Sylas', 'Hawke', 'Talon', 'Rowan', 'Arden', 'Orin',
    'Kaelin', 'Silvanus', 'Breeze', 'Talon',
  ],
  Paladin: [
    'Galahad', 'Tirion', 'Cassiel', 'Lothar', 'Brienne', 'Justiciar', 'Eldrid',
    'Theron', 'Gideon', 'Valerius', 'Aurelia', 'Seraphina', 'Elowen', 'Uther',
    'Caelum', 'Alphonse', 'Bartholomew', 'Celeste', 'Godfrey', 'Leoric',
  ],
  Necromancer: [
    'Malakor', 'Mortis', 'Nerida', 'Xavier', 'Ravenna', 'Morvath', 'Grimm',
    'Thanatos', 'Sybil', 'Azrael', 'Lilith', 'Morgath', 'Vespera', 'Nekros',
    'Baphomet', 'Osiris', 'Kaelis', 'Bane', 'Vasilis', 'Nyctos',
  ],
  Druid: [
    'Sylvan', 'Bryony', 'Cedar', 'Willow', 'Oakhaven', 'Taranis', 'Branwen',
    'Flora', 'Alder', 'Yvaine', 'Kaelin', 'Orin', 'Rowan', 'Faelan', 'Gorse',
    'Fern', 'Bram', 'Moss', 'Sylvestra', 'Cormac',
  ],
};

export const SURNAMES = [
  'Blackwood', 'Stormcaller', 'Ironveil', 'Frostweaver', 'Sunstrider',
  'Shadowmourne', 'Duskfall', 'Silverthorn', 'Oakenshield', 'Bloodsworn',
  'Runebreaker', 'Nightshade', 'Emberflame', 'Starfall', 'Hollowgate',
  'Deeproot', 'Dawnbringer', 'Gloomspire', 'Winterfell', 'Thornwall',
  'Ashwalker', 'Gravewarden', 'Crestfall', 'Lightbinder', 'Moonwhisper',
  'Stoneshaper', 'Wyrmbane', 'Voidwalker', 'Ravencrest', 'Swiftfoot',
  'Ironhide', 'Brightblade', 'Spellweaver', 'Mistveil', 'Wildheart',
];

export const TITLES_BY_CLASS: Record<CharacterClass, string[]> = {
  Mage: [
    'Weaver of the Starfire',
    'Master of the High Spire',
    'The Arcane Scholar',
    'Bane of the Void Rifts',
    'Architect of Illusions',
    'Warden of the Forbidden Tomes',
  ],
  Rogue: [
    'The Shadow In The Mist',
    'Blade of the Gilded Alley',
    'The Whisper In The Dark',
    'Silent Sovereign of Lowtown',
    'Phantom of the High Vault',
    'The Unseen Cutpurse',
  ],
  Warrior: [
    'The Iron Sentinel',
    'Breaker of Warbands',
    'Champion of the Red Cliffs',
    'The Unyielding Bulwark',
    'Scourge of the Warlords',
    'Shield of the Frontier',
  ],
  Ranger: [
    'Wanderer of the Whispering Pines',
    'Eye of the Great Crags',
    'Tracker of the Shadow Beast',
    'Guardian of the High Canopy',
    'Strider of the Ash Plains',
    'Bow of the Northwind',
  ],
  Paladin: [
    'Shield of the Radiant Dawn',
    'The Dawnbound Justiciar',
    'Knight of the Silver Chalice',
    'Beacon Against the Darkness',
    'Sworn Vindicator',
    'Hand of the Sun God',
  ],
  Necromancer: [
    'Keeper of the Crypt Gate',
    'The Bone-Carver',
    'Harvester of Lost Souls',
    'Lord of the Pale Threshold',
    'Weaver of the Final Veil',
    'Ruler of the Charnel Spires',
  ],
  Druid: [
    'Voice of the Ancient Oak',
    'Guardian of the Primal Hearth',
    'Shaper of the Tempest Winds',
    'The Moss-Bound Seer',
    'Steward of the Bramble Thicket',
    'Keeper of the Moonlit Well',
  ],
};

export const CLASS_DETAILS: Record<CharacterClass, ClassDetail> = {
  Mage: {
    id: 'Mage',
    name: 'Mage',
    tagline: 'Wielder of elemental fury, arcane geometry, and astral secrets.',
    primaryStat: 'intelligence',
    secondaryStat: 'wisdom',
    resourceName: 'Mana',
    baseColor: '#6366f1',
    accentColor: '#a5b4fc',
    themeGradient: 'from-indigo-950/60 via-slate-900/80 to-blue-950/70',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60 shadow-indigo-950/30',
    iconName: 'Wand2',
    specializations: ['Pyromancy', 'Arcane Chronometry', 'Frost Evocation'],
    abilities: [
      {
        name: 'Aetherial Cascade',
        type: 'Active',
        description: 'Channels shards of pure celestial energy, striking all enemies within 30 paces.',
        costOrCooldown: '45 Mana · 6s Cooldown',
      },
      {
        name: 'Temporal Stasis',
        type: 'Active',
        description: 'Halts time for a single adversary for 4 heartbeats, leaving them vulnerable to arcane rupture.',
        costOrCooldown: '60 Mana · 20s Cooldown',
      },
      {
        name: 'Arcane Ward',
        type: 'Passive',
        description: 'A shimmering glyph turns incoming physical trauma into pure mana restoration.',
        costOrCooldown: 'Passive Aura',
      },
    ],
    weapons: ['Starlight Oak Staff', 'Crystal Focus Wand', 'Rune-Carved Athame'],
    armors: ['Robes of the Astral Tide', 'Silken Void Vestment', 'Runed Velvet Cloak'],
    accessories: ['Chronometer Pendant', 'Ring of Prismatic Light', 'Orb of Memory'],
  },
  Rogue: {
    id: 'Rogue',
    name: 'Rogue',
    tagline: 'Master of lethal precision, acrobatic escapes, and venomous surprise.',
    primaryStat: 'dexterity',
    secondaryStat: 'charisma',
    resourceName: 'Energy',
    baseColor: '#10b981',
    accentColor: '#6ee7b7',
    themeGradient: 'from-emerald-950/60 via-slate-900/80 to-zinc-950/70',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-950/30',
    iconName: 'Crosshair',
    specializations: ['Shadow Assassin', 'Acrobatic Duelist', 'Venom Crafter'],
    abilities: [
      {
        name: 'Shadowstep Strike',
        type: 'Active',
        description: 'Melts into nearby shadows to instantly reappear behind an opponent with guaranteed critical leverage.',
        costOrCooldown: '30 Energy · 8s Cooldown',
      },
      {
        name: 'Black Lotus Coating',
        type: 'Passive',
        description: 'Blade edges drip with neuro-toxin, dealing ticking decay and crippling movement speed.',
        costOrCooldown: 'Passive Coating',
      },
      {
        name: 'Smoke Veil Retreat',
        type: 'Active',
        description: 'Detonates an alchemical flashbang that cleanses all status ailments and conceals presence.',
        costOrCooldown: '20 Energy · 15s Cooldown',
      },
    ],
    weapons: ['Pair of Serpentine Daggers', 'Recurve Hand Crossbow', 'Folded-Steel Rapier'],
    armors: ['Shadow-Dye Leather Cuirass', 'Gloves of the Lockbreaker', 'Night-Prowler Cowl'],
    accessories: ['Skeleton Key Trinket', 'Vial of Concentrated Arsenic', 'Smuggler Coin'],
  },
  Warrior: {
    id: 'Warrior',
    name: 'Warrior',
    tagline: 'Unbreakable paragon of battlefield grit, heavy steel, and unyielding rage.',
    primaryStat: 'strength',
    secondaryStat: 'constitution',
    resourceName: 'Stamina',
    baseColor: '#ef4444',
    accentColor: '#fca5a5',
    themeGradient: 'from-red-950/60 via-slate-900/80 to-stone-950/70',
    borderClass: 'border-red-500/30 hover:border-red-500/60 shadow-red-950/30',
    iconName: 'Shield',
    specializations: ['Juggernaut Vanguard', 'Berserker Gladiator', 'Battlemaster Commander'],
    abilities: [
      {
        name: 'Sundering Cleave',
        type: 'Active',
        description: 'Swings two-handed weapon in a devastating arc, shattering enemy armor plates and staving shields.',
        costOrCooldown: '25 Stamina · 4s Cooldown',
      },
      {
        name: 'Indomitable Stand',
        type: 'Ultimate',
        description: 'Braces against incoming obliteration, refusing to fall below 1 HP for 6 critical seconds.',
        costOrCooldown: '50 Stamina · 45s Cooldown',
      },
      {
        name: 'Iron Resilience',
        type: 'Passive',
        description: 'Natural scar tissue and discipline reduce all physical damage taken by 20%.',
        costOrCooldown: 'Passive Stance',
      },
    ],
    weapons: ['Tempered Greatsword', 'War-Hammer of the Citadel', 'Tower Shield & Broadsword'],
    armors: ['Black-Iron Plate Mail', 'Spiked Pauldrons', 'Heavy Greaves of Bastion'],
    accessories: ['War Horn of Valhall', 'Bloodstone Signet', 'Battle Banner Fragment'],
  },
  Ranger: {
    id: 'Ranger',
    name: 'Ranger',
    tagline: 'Deadeye tracker who communes with wild beasts and masters the borderland wilds.',
    primaryStat: 'dexterity',
    secondaryStat: 'wisdom',
    resourceName: 'Stamina',
    baseColor: '#14b8a6',
    accentColor: '#5eead4',
    themeGradient: 'from-teal-950/60 via-slate-900/80 to-stone-950/70',
    borderClass: 'border-teal-500/30 hover:border-teal-500/60 shadow-teal-950/30',
    iconName: 'Compass',
    specializations: ['Deadeye Sharpshooter', 'Beast Bond Master', 'Gloom Stalker'],
    abilities: [
      {
        name: 'Heartseeker Volley',
        type: 'Active',
        description: 'Looses three feather-fletched shafts in a heartbeat, pinpointing anatomical weak points.',
        costOrCooldown: '35 Stamina · 6s Cooldown',
      },
      {
        name: 'Beast Pack Howl',
        type: 'Active',
        description: 'Calls forth a spirit dire-wolf to harry foes and divert aggression from the vanguard.',
        costOrCooldown: '40 Stamina · 25s Cooldown',
      },
      {
        name: 'Wilderness Instinct',
        type: 'Passive',
        description: 'Detects hidden ambushes, tracks tracks in adverse mud, and dodges reflexively.',
        costOrCooldown: 'Passive Sense',
      },
    ],
    weapons: ['Yew Longbow of the Border', 'Twin Hunting Hatchets', 'Spike-Barbed Composite Bow'],
    armors: ['Supple Deerskin Jerkin', 'Camouflage Cloak of Thorns', 'Silent Padded Moccasins'],
    accessories: ['Falconer Gauntlet', 'Quiver of Silvered Arrows', 'Lodestone Compass'],
  },
  Paladin: {
    id: 'Paladin',
    name: 'Paladin',
    tagline: 'Holy crusader sworn by oaths of radiant truth, protection, and righteous vengeance.',
    primaryStat: 'strength',
    secondaryStat: 'charisma',
    resourceName: 'Holy Power',
    baseColor: '#eab308',
    accentColor: '#fef08a',
    themeGradient: 'from-amber-950/60 via-slate-900/80 to-yellow-950/50',
    borderClass: 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-950/30',
    iconName: 'Sun',
    specializations: ['Oath of the Dawn', 'Vindicator Inquisitor', 'Guardian of the Weak'],
    abilities: [
      {
        name: 'Radiant Smite',
        type: 'Active',
        description: 'Infuses weapon strikes with blinding solar fire, devastating fiends, undead, and unrighteous foes.',
        costOrCooldown: '2 Holy Power · 5s Cooldown',
      },
      {
        name: 'Aegis of the Martyr',
        type: 'Active',
        description: 'Erects an immovable dome of sacred light that absorbs spells and heals allies.',
        costOrCooldown: '3 Holy Power · 30s Cooldown',
      },
      {
        name: 'Aura of Devotion',
        type: 'Passive',
        description: 'Projecting calm spiritual resolve prevents allies within range from succumbing to fear or despair.',
        costOrCooldown: 'Continuous Aura',
      },
    ],
    weapons: ['Sun-Forged Flanged Mace', 'Gilded Bastard Sword', 'Luminous Kite Shield'],
    armors: ['Enamelled Gold-Trim Plate', 'Crested Greathelm', 'Tabard of the Silver Sun'],
    accessories: ['Reliquary of Saint Eleanor', 'Prayer Beads of Light', 'Vial of Holy Waters'],
  },
  Necromancer: {
    id: 'Necromancer',
    name: 'Necromancer',
    tagline: 'Dark scholar of mortality, spirit binding, bone manipulation, and entropic decay.',
    primaryStat: 'intelligence',
    secondaryStat: 'constitution',
    resourceName: 'Soul Shards',
    baseColor: '#a855f7',
    accentColor: '#d8b4fe',
    themeGradient: 'from-purple-950/60 via-slate-900/80 to-zinc-950/70',
    borderClass: 'border-purple-500/30 hover:border-purple-500/60 shadow-purple-950/30',
    iconName: 'Skull',
    specializations: ['Bone Sculptor', 'Soul Harvester', 'Blight Plaguebringer'],
    abilities: [
      {
        name: 'Raise Skeletal Legion',
        type: 'Active',
        description: 'Animates marrow and bone from fallen adversaries into mindless thralls sworn to your command.',
        costOrCooldown: '3 Soul Shards · 12s Cooldown',
      },
      {
        name: 'Siphon Life Essence',
        type: 'Active',
        description: 'Draws the vital ichor from a foe to heal your wounds and replenish decaying flesh.',
        costOrCooldown: '1 Soul Shard · 4s Cooldown',
      },
      {
        name: 'Miasma of the Grave',
        type: 'Passive',
        description: 'A chilling shroud of frost and rot saps adjacent enemies of their physical strength and courage.',
        costOrCooldown: 'Passive Hex',
      },
    ],
    weapons: ['Carved Ossuary Scythe', 'Staff of the Tormented Wight', 'Spine-Chamber Grimoire'],
    armors: ['Shroud of the Tombkeeper', 'Bone-Splinted Breastplate', 'Mask of the Charnel Maw'],
    accessories: ['Phial of Stygian Ichor', 'Ring of the Pale Sovereign', 'Preserved Raven Eye'],
  },
  Druid: {
    id: 'Druid',
    name: 'Druid',
    tagline: 'Preserver of the cycle, wild shape transformer, and speaker for roots and storms.',
    primaryStat: 'wisdom',
    secondaryStat: 'constitution',
    resourceName: 'Nature Fury',
    baseColor: '#84cc16',
    accentColor: '#bef264',
    themeGradient: 'from-lime-950/60 via-slate-900/80 to-emerald-950/60',
    borderClass: 'border-lime-500/30 hover:border-lime-500/60 shadow-lime-950/30',
    iconName: 'TreePine',
    specializations: ['Circle of the Moon (Shifter)', 'Circle of the Spores', 'Storm Warden'],
    abilities: [
      {
        name: 'Primal Metamorphosis',
        type: 'Active',
        description: 'Shapes flesh into a massive Ironwood Bear or Swift Shadowcat, adopting ferocious bestial combat prowess.',
        costOrCooldown: '40 Nature Fury · 10s Cooldown',
      },
      {
        name: 'Grasping Briar Tangle',
        type: 'Active',
        description: 'Commands thorny vines to burst from the earth, rooting foes and draining their vigor.',
        costOrCooldown: '25 Nature Fury · 8s Cooldown',
      },
      {
        name: 'Ecosystem Harmony',
        type: 'Passive',
        description: 'Natural flora subtly guides your footing, granting heightened regeneration whenever outdoors.',
        costOrCooldown: 'Passive Attunement',
      },
    ],
    weapons: ['Living Ashwood Quarterstaff', 'Sickle of the Harvest Moon', 'Petrified Oak Club'],
    armors: ['Barkskin Tunic', 'Mantle of Forest Feathers', 'Leaf-Weft Bracers'],
    accessories: ['Amber Totem of the Elk', 'Seed of the World Tree', 'Acorn of Remembrance'],
  },
};

export const BACKSTORIES_BY_CLASS: Record<CharacterClass, string[]> = {
  Mage: [
    'Expelled from the Citadel of Arcane Truths for deciphering star-maps considered heretical by the High Council.',
    'Discovered an ancient celestial astrolabe buried deep within an abandoned glacier observatory, which etched arcane equations directly into their mind.',
    'Born beneath the harmonic alignment of three moons, giving them an involuntary affinity for ripping the fabric of elemental reality.',
    'Spent three decades as the royal archivist before setting out to seal a catastrophic planar tear they inadvertently uncovered.',
  ],
  Rogue: [
    'Grew up as a street urchin in the flooded gutters of the Lower Guilds, mastering locks before learning how to read.',
    'A former master infiltrator for an aristocratic spy ring who staged their own demise after discovering an assassination plot against the innocent.',
    'Stole a sentient coin from an extradimensional merchant and now wanders the realm evading contract bounty hunters while solving ancient heists.',
    'Operates under an ironclad personal honor code: steal only from tyrants, harm only when trapped, and never leave an accomplice behind.',
  ],
  Warrior: [
    'Sole survivor of the legendary Iron Guard garrison that defended the Frostfall Pass against an overwhelming demonic horde.',
    'A former tournament gladiator who bought freedom with blood and now wields steel in search of an honorable cause worthy of their blade.',
    'Exiled from their ancestral mountain clan until they can recover the lost runic war-banner stolen during the Siege of the Red Peaks.',
    'Forged their own armor from the scraps of fallen enemy siege engines, sworn to be the shield that stands between ruin and home.',
  ],
  Ranger: [
    'Raised by the border wardens along the edge of the Blighted Wood, learning to read the language of birds and wind.',
    'Formed a telepathic covenant with a wounded spirit beast after defending it from poachers in the Whispering Vale.',
    'Guides caravans and weary wanderers through lethal enchanted badlands where magnetic compasses spin uselessly.',
    'An exile from the elven court who found greater truth in the harsh, unspoken laws of the primal wilderness than in throne room politics.',
  ],
  Paladin: [
    'Took the unbreakable vow of the Silver Sun after miraculous golden light shielded their small village from a dragon raid.',
    'Carries the fractured sword of their fallen mentor, seeking redemption for a moment of youthful hesitation on the battlefield.',
    'Sworn to seek out corruption not merely with weapon in hand, but through rebuilding sanctuary cities for those displaced by endless war.',
    'A knight inquisitor who broke ranks upon realizing that church zealots were framing innocent hedge-witches for demonic blights.',
  ],
  Necromancer: [
    'Trained as a physician before realizing the boundary between death and life was merely an unsolved metaphysical equation.',
    'Communes peacefully with ancestral ghosts to record lost histories, despite ordinary townsfolk viewing their grim craft with dread.',
    'Survives carrying a cursed soul-urn bound to their ribcage, channeling the spirits within to protect the innocent from dark entities.',
    'Seeks to dismantle a cabal of tyrannical lich-lords by mastering and turning their very own forbidden necromantic rites against them.',
  ],
  Druid: [
    'Hermit tender of an ancient petrified grove that sleeps above a slumbering earth elemental.',
    'Can hear the heartbeat of the forest weeping as stone quarries advance, and acts as the swift reckoning of root and beast.',
    'Chosen by an ancient elder tree after surviving three winters alone in the frozen northern taiga.',
    'Wanders between druidic stone circles renewing the elemental ley-lines that keep natural disasters at bay.',
  ],
};

export const CHARACTER_QUOTES: Record<CharacterClass, string[]> = {
  Mage: [
    '"Reality is not carved in stone—it is written in ink, and I hold the quill."',
    '"Ignorance burns slower than fire, but leaves far worse ashes."',
    '"Watch closely; the cosmos rarely explains itself twice."',
  ],
  Rogue: [
    '"The loudest weapon in the room is never the most dangerous."',
    '"Doors were invented by people with something to hide. Keys by people with something to take."',
    '"If you saw me coming, I wanted you to."',
  ],
  Warrior: [
    '"Steel does not lie. When the world breaks, stand in the gap."',
    '"Fear is just cold blood. Strike hard enough, and you will warm it."',
    '"My shield will hold until my last breath—and perhaps a moment longer."',
  ],
  Ranger: [
    '"The forest remembers every step you took, and every branch you broke."',
    '"Distance is an illusion. Every mark is already within range."',
    '"Walk softly. The prey always hears the hunter who rushes."',
  ],
  Paladin: [
    '"Darkness is not an enemy to be feared; it is merely the place where light is most needed."',
    '"My oath is my blood. While I draw breath, the innocent will not stand alone."',
    '"Evil flourishes when righteous hearts falter. I shall not falter."',
  ],
  Necromancer: [
    '"Death is not the opposite of life, but its patient custodian."',
    '"Flesh decays, memory fades, but bone endures forever."',
    '"Fear not the dead; they speak only when asked, and tell fewer lies than the living."',
  ],
  Druid: [
    '"Stone crumbles, kingdoms fall, yet roots will split mountains in the end."',
    '"We do not inherit this land from our ancestors; we borrow it from the earth."',
    '"Listen to the wind before you raise the axe."',
  ],
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollStat(isPrimary: boolean, isSecondary: boolean): number {
  // Heroic stat roll: 3d6 + modifier biased toward class archetype
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  // Drop lowest
  rolls.sort((a, b) => b - a);
  let base = rolls[0] + rolls[1] + rolls[2];

  if (isPrimary) {
    base = Math.max(15, Math.min(18, base + 2));
  } else if (isSecondary) {
    base = Math.max(13, Math.min(17, base + 1));
  } else {
    base = Math.max(8, Math.min(16, base));
  }
  return base;
}

export function generateCharacterStats(characterClass: CharacterClass): CharacterStats {
  const detail = CLASS_DETAILS[characterClass];
  const primary = detail.primaryStat;
  const secondary = detail.secondaryStat;

  return {
    strength: rollStat(primary === 'strength', secondary === 'strength'),
    dexterity: rollStat(primary === 'dexterity', secondary === 'dexterity'),
    constitution: rollStat(primary === 'constitution', secondary === 'constitution'),
    intelligence: rollStat(primary === 'intelligence', secondary === 'intelligence'),
    wisdom: rollStat(primary === 'wisdom', secondary === 'wisdom'),
    charisma: rollStat(primary === 'charisma', secondary === 'charisma'),
  };
}

export const FEMALE_FIRST_NAMES: Record<CharacterClass | 'Universal', string[]> = {
  Universal: [
    'Valeria', 'Aurelia', 'Seraphina', 'Elowen', 'Morrigan', 'Astrid', 'Lyra',
    'Freya', 'Kira', 'Althea', 'Nyx', 'Isolde', 'Maeve', 'Thora', 'Celestia',
  ],
  Mage: [
    'Vespera', 'Aurelia', 'Illiana', 'Arcadia', 'Seraphina', 'Elowen', 'Lyra',
    'Morvatha', 'Astrophelia', 'Cypriana', 'Aeloria', 'Solaria', 'Eldrina',
  ],
  Rogue: [
    'Nyx', 'Kira', 'Mara', 'Jocelyn', 'Vanya', 'Vesper', 'Sariel', 'Riven',
    'Shade', 'Fennica', 'Corva', 'Kaelina', 'Talon', 'Briar',
  ],
  Warrior: [
    'Valeria', 'Brunhild', 'Sigrid', 'Astrid', 'Freya', 'Thora', 'Hildur',
    'Kragora', 'Baltha', 'Garricka', 'Althea', 'Vorna', 'Torvilda',
  ],
  Ranger: [
    'Talia', 'Branwen', 'Briar', 'Kestrel', 'Rowan', 'Arden', 'Lyanna',
    'Fianna', 'Aelaria', 'Sylvana', 'Hawke', 'Orina', 'Bree',
  ],
  Paladin: [
    'Aurelia', 'Seraphina', 'Valeria', 'Althea', 'Gwyneira', 'Celestia',
    'Elora', 'Justina', 'Sunna', 'Luminara', 'Solana', 'Dawn',
  ],
  Necromancer: [
    'Morrigan', 'Lilith', 'Nyx', 'Morgana', 'Hecate', 'Isolde', 'Ravena',
    'Vespera', 'Gloomweaver', 'Morticia', 'Sariel', 'Malakora',
  ],
  Druid: [
    'Elowen', 'Faye', 'Elira', 'Sylvana', 'Maeve', 'Gwendolyn', 'Arwen',
    'Ivy', 'Willow', 'Brambla', 'Yvaine', 'Liora', 'Fern',
  ],
};

export function generateCharacterName(
  characterClass?: CharacterClass,
  gender?: 'Female' | 'Male' | 'Any'
): { name: string; title: string } {
  const chosenClass = characterClass || getRandomItem(CLASSES);
  const isFemale = gender === 'Female' || (gender !== 'Male' && Math.random() > 0.4);

  let firstName: string;
  if (isFemale) {
    const classFem = FEMALE_FIRST_NAMES[chosenClass] || [];
    const univFem = FEMALE_FIRST_NAMES.Universal;
    firstName = getRandomItem([...classFem, ...univFem]);
  } else {
    const classNames = FIRST_NAMES[chosenClass] || [];
    const universalNames = FIRST_NAMES.Universal;
    firstName = getRandomItem([...classNames, ...universalNames]);
  }

  const surname = getRandomItem(SURNAMES);
  const title = getRandomItem(TITLES_BY_CLASS[chosenClass]);

  return {
    name: `${firstName} ${surname}`,
    title,
  };
}

export const CLASS_DEFAULT_PORTRAITS: Record<CharacterClass, string> = {
  Mage: '/src/assets/images/portrait_mage_1792309417919.jpg',
  Rogue: '/src/assets/images/portrait_rogue_1792309434877.jpg',
  Warrior: '/src/assets/images/portrait_warrior_1792309434030.jpg',
  Paladin: '/src/assets/images/portrait_paladin_1792309434884.jpg',
  Necromancer: '/src/assets/images/portrait_necromancer_1792309453052.jpg',
  Druid: '/src/assets/images/portrait_druid_1792309453428.jpg',
  Ranger: '/src/assets/images/portrait_ranger_1792309453111.jpg',
};

export const FEMALE_DEFAULT_PORTRAITS: Record<CharacterClass, string> = {
  Mage: '/src/assets/images/portrait_female_mage_1792311141856.jpg',
  Rogue: '/src/assets/images/portrait_female_rogue_1792311141264.jpg',
  Warrior: '/src/assets/images/portrait_female_warrior_1792311141804.jpg',
  Paladin: '/src/assets/images/portrait_female_paladin_1792311155660.jpg',
  Necromancer: '/src/assets/images/portrait_female_necromancer_1792311156632.jpg',
  Druid: '/src/assets/images/portrait_female_druid_1792311170238.jpg',
  Ranger: '/src/assets/images/portrait_female_ranger_1792311156796.jpg',
};

export function generateRandomCharacter(
  preferredClass?: CharacterClass | 'All',
  genderPreference: 'Female' | 'Male' | 'Any' = 'Female'
): Character {
  const characterClass = preferredClass && preferredClass !== 'All'
    ? preferredClass
    : getRandomItem(CLASSES);

  const isFemale = genderPreference === 'Female' || (genderPreference === 'Any' && Math.random() > 0.4);
  const gender: 'Female' | 'Male' = isFemale ? 'Female' : 'Male';

  const detail = CLASS_DETAILS[characterClass];
  const nameData = generateCharacterName(characterClass, gender);
  const race = getRandomItem(RACES);
  const alignment = getRandomItem(ALIGNMENTS);
  const specialization = getRandomItem(detail.specializations);
  const stats = generateCharacterStats(characterClass);
  const signatureAbility = getRandomItem(detail.abilities);
  const backstory = getRandomItem(BACKSTORIES_BY_CLASS[characterClass]);
  const quote = getRandomItem(CHARACTER_QUOTES[characterClass]);

  // Sensible integer calculations for the primary triad: Health, Mana, Strength
  const healthBonus = (stats.constitution - 10) * 3;
  let baseHealth = 90;
  let baseMana = 70;
  let baseStrength = stats.strength;

  switch (characterClass) {
    case 'Warrior':
      baseHealth = 135 + Math.floor(Math.random() * 15);
      baseMana = 45 + Math.floor(Math.random() * 15);
      // High physical strength for warrior heroes and heroines
      baseStrength = Math.max(17, baseStrength + (isFemale ? 2 : 1));
      break;
    case 'Paladin':
      baseHealth = 125 + Math.floor(Math.random() * 15);
      baseMana = 90 + Math.floor(Math.random() * 15);
      baseStrength = Math.max(16, baseStrength + (isFemale ? 1 : 0));
      break;
    case 'Ranger':
      baseHealth = 108 + Math.floor(Math.random() * 15);
      baseMana = 70 + Math.floor(Math.random() * 15);
      baseStrength = Math.max(13, baseStrength);
      break;
    case 'Druid':
      baseHealth = 104 + Math.floor(Math.random() * 15);
      baseMana = 110 + Math.floor(Math.random() * 15);
      baseStrength = Math.max(12, baseStrength);
      break;
    case 'Rogue':
      baseHealth = 98 + Math.floor(Math.random() * 15);
      baseMana = 65 + Math.floor(Math.random() * 15);
      baseStrength = Math.max(12, baseStrength);
      break;
    case 'Necromancer':
      baseHealth = 90 + Math.floor(Math.random() * 15);
      baseMana = 125 + Math.floor(Math.random() * 15);
      baseStrength = Math.max(9, baseStrength);
      break;
    case 'Mage':
      baseHealth = 85 + Math.floor(Math.random() * 15);
      baseMana = 140 + Math.floor(Math.random() * 15);
      baseStrength = Math.max(8, baseStrength);
      break;
  }

  const finalHealth = Math.round(baseHealth + healthBonus);
  const finalMana = Math.round(baseMana + (stats.intelligence - 10) * 2);
  const finalStrength = Math.round(baseStrength);

  const equipment = {
    mainHand: getRandomItem(detail.weapons),
    armor: getRandomItem(detail.armors),
    accessory: getRandomItem(detail.accessories),
  };

  const portraitPreset = isFemale
    ? FEMALE_DEFAULT_PORTRAITS[characterClass]
    : CLASS_DEFAULT_PORTRAITS[characterClass];

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: nameData.name,
    title: nameData.title,
    characterClass,
    race,
    alignment,
    specialization,
    gender,
    level: Math.floor(Math.random() * 5) + 1, // Levels 1-5 for adventurer start
    health: finalHealth,
    mana: finalMana,
    strength: finalStrength,
    manaOrEnergy: finalMana,
    stats: {
      ...stats,
      strength: finalStrength,
    },
    signatureAbility,
    equipment,
    backstory,
    quote,
    portraitUrl: portraitPreset,
    createdAt: Date.now(),
  };
}
