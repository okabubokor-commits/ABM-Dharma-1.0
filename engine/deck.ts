import { CardData } from './types';
import { EraId } from '../src/types/era';
import { OFFICIAL_52_CARDS as MAHABHARAT_CARDS } from './cardsMahabharat';
import { OFFICIAL_52_CARDS as MUGHAL_CARDS } from './cardsMughal';
import { OFFICIAL_52_CARDS as SWARAJ_CARDS } from './cardsSwaraj';

export function getCardImageUrl(_card: CardData): string {
  return '';
}

export function buildComplete52Deck(era: EraId = 'mahabharat'): CardData[] {
  let sourceCards = MAHABHARAT_CARDS;
  if (era === 'mughal') sourceCards = MUGHAL_CARDS;
  if (era === 'swaraj') sourceCards = SWARAJ_CARDS;

  return sourceCards.map((card) => ({
    ...card,
    image: getCardImageUrl(card)
  }));
}

export function fisherYatesShuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
