import { useMemo } from 'react';
import { CardData, CardNode } from '../../engine/types';
import { defaultEngine } from '../../engine/validator';

export function useValidation(chain: CardNode[], myHand: CardData[], selectedCardId: string | null) {
  // Map of cardId -> boolean (can be played on at least 1 legal target in chain)
  const validCardsInHand = useMemo(() => {
    const validMap: Record<string, boolean> = {};
    if (!chain || chain.length === 0) return validMap;

    for (const card of myHand) {
      const targets = defaultEngine.getLegalTargets(card, chain);
      validMap[card.id] = targets.length > 0;
    }
    return validMap;
  }, [chain, myHand]);

  // If a card in hand is selected, get all legal target nodes in chain
  const legalTargetNodeIds = useMemo(() => {
    if (!selectedCardId || !chain || chain.length === 0) return [];
    const card = myHand.find((c) => c.id === selectedCardId);
    if (!card) return [];
    const targets = defaultEngine.getLegalTargets(card, chain);
    return targets.map((t) => t.id);
  }, [selectedCardId, chain, myHand]);

  return {
    validCardsInHand,
    legalTargetNodeIds,
    validator: defaultEngine
  };
}
