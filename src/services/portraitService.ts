/**
 * Service: Portrait Generation
 * Interfaces with the server-side Gemini image generation endpoint with graceful fallbacks.
 */
import { Character } from '../types/character';

export interface PortraitResult {
  imageUrl: string;
  prompt?: string;
  source?: string;
}

export async function generatePortrait(
  character: Character,
  isRegeneration = false
): Promise<PortraitResult> {
  const response = await fetch('/api/generate-portrait', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: character.name,
      characterClass: character.characterClass,
      race: character.race,
      specialization: character.specialization,
      gender: character.gender,
      variationSeed: isRegeneration ? `ink_${Date.now()}` : undefined,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to render portrait illustration.');
  }

  return {
    imageUrl: data.imageUrl,
    prompt: data.prompt,
    source: data.source,
  };
}
