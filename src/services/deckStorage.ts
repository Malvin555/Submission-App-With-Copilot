/**
 * Service: Deck Storage & Local Persistence
 * Encapsulates localStorage interactions, duplicate prevention, and export utilities.
 */
import { Character } from '../types/character';

const DECK_STORAGE_KEY = 'fantasy_editorial_deck_v2';

export function loadDeckFromStorage(): Character[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DECK_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Unable to load deck from local storage:', err);
  }
  return [];
}

export function saveDeckToStorage(deck: Character[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
  } catch (err) {
    console.warn('Unable to persist deck to local storage:', err);
  }
}

export function isCharacterInDeck(deck: Character[], characterId: string): boolean {
  return deck.some((char) => char.id === characterId);
}

export function exportDeckAsJson(deck: Character[], filename = 'fantasy_character_deck.json'): void {
  const jsonString = JSON.stringify(deck, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
