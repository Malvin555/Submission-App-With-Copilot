/**
 * Service: Backstory & Chronicle Lore
 * Interfaces with the server-side Gemini text generation endpoint with rich editorial fallbacks.
 */
import { Character } from '../types/character';

export interface BackstoryResult {
  backstory: string;
  source?: string;
}

export async function generateBackstory(character: Character): Promise<BackstoryResult> {
  const response = await fetch('/api/generate-backstory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: character.name,
      characterClass: character.characterClass,
      race: character.race,
      specialization: character.specialization,
      title: character.title,
      equipment: character.equipment,
      portraitContext: character.portraitPrompt || `Portrait shows an illustrated ${character.race} ${character.characterClass}`,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to inscribe origin backstory.');
  }

  return {
    backstory: data.backstory,
    source: data.source,
  };
}
