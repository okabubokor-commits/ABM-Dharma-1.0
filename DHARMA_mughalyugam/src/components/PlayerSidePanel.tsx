import React from 'react';
import { motion } from 'motion/react';
import { CardData } from '../../engine/types';
import { Card } from './Card';

interface PlayerSidePanelProps {
  player?: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    score: number;
    stolenPoints: number;
    cardCount: number;
    genderLabel?: string;
  };
  isCurrentTurn: boolean;
  cards: CardData[];
  validCardsInHand: Record<string, boolean>;
  selectedCardId: string | null;
  shakingCardId?: string | null;
  side: 'left' | 'right';
  onSelectCard: (cardId: string, isThisPlayerTurn: boolean) => void;
  onDrawCard?: () => void;
}

export const PlayerSidePanel: React.FC<PlayerSidePanelProps> = ({
  player,
  isCurrentTurn,
  cards,
  validCardsInHand,
  selectedCardId,
  shakingCardId = null,
  side,
  onSelectCard
}) => {
  const legalCount = cards.filter((c) => validCardsInHand[c.id]).length;
  const pName = player?.name || (side === 'left' ? 'AD' : 'RS');
  const pRole = player?.title || (side === 'left' ? 'Crown Commander (AD)' : 'Imperial Sovereign (RS)');
  const genderTag = player?.genderLabel || (side === 'left' ? '(Boy)' : '(Girl)');

  return (
    <aside
      id={`player-${side}-section`}
      className="w-full md:w-[260px] lg:w-[280px] xl:w-[310px] shrink-0 flex flex-col gap-2.5 h-full min-h-0 select-none"
    >
      {/* 1. TOP: PLAYER PROFILE / SCORE PANEL */}
      <motion.div
        id={`player-${side}-profile-panel`}
        animate={{
          borderColor: isCurrentTurn ? '#E07A5F' : '#D4AF37',
          boxShadow: isCurrentTurn
            ? '0 0 24px rgba(224, 122, 95, 0.45), 0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 14px rgba(0,0,0,0.3)'
        }}
        className={`w-full rounded-2xl bg-[rgba(212,228,220,0.96)] border-2 p-3 flex items-center justify-between shadow-lg relative transition-all ${
          isCurrentTurn ? 'ring-2 ring-[#E07A5F]/60' : 'ring-1 ring-[#D4AF37]/30'
        }`}
      >
        {/* Active Turn / Status Badge */}
        <div
          className={`absolute -top-3 ${
            side === 'left' ? 'left-3' : 'right-3'
          } flex items-center gap-1.5 z-20`}
        >
          {isCurrentTurn ? (
            <span className="bg-[#E07A5F] text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 animate-pulse border border-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              ACTIVE TURN
            </span>
          ) : (
            <span className="bg-[#10291D] text-[#D4AF37] border border-[#D4AF37]/40 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow">
              AWAITING TURN
            </span>
          )}
        </div>

        {/* Player Avatar & Details */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div
              className={`w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] shadow-md overflow-hidden ${
                isCurrentTurn ? 'ring-2 ring-[#E07A5F]' : ''
              }`}
            >
              <img
                src={player?.avatar || (side === 'left'
                  ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&h=160&fit=crop&crop=faces'
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces'
                )}
                alt={pName}
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                isCurrentTurn ? 'bg-[#E07A5F] animate-pulse' : 'bg-emerald-500'
              }`}
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-centrion font-bold text-[#1A3326] text-sm leading-tight flex items-center gap-1 truncate">
              <span className="truncate">{pName}</span>
              <span className="text-[10px] text-amber-800 font-semibold shrink-0">
                {genderTag}
              </span>
            </h3>
            <span className="text-[10px] text-[#1A3326]/75 uppercase tracking-wider font-semibold block truncate">
              {pRole}
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[10.5px] bg-[#E8F0EC] border border-[#1A3326]/20 px-2 py-0.2 rounded font-bold text-[#1A3326]">
                {cards.length} Cards
              </span>
              <span className="text-[9px] text-[#163828] font-bold">
                {isCurrentTurn ? '⚔ Your Turn' : 'Waiting'}
              </span>
            </div>
          </div>
        </div>

        {/* Player Score Column */}
        <div className="text-right shrink-0 pl-2">
          <span className="text-[9px] text-[#1A3326]/60 font-bold uppercase tracking-wider block">
            Score
          </span>
          <div className="font-supremacy text-2xl lg:text-3xl font-black text-[#E07A5F] leading-none mt-0.5">
            {player?.score ?? 0}
          </div>
          <span className="text-[9.5px] text-emerald-700 font-bold block mt-0.5">
            +{player?.stolenPoints ?? 0} Stolen
          </span>
        </div>
      </motion.div>

      {/* 2. DIRECTLY BELOW: PLAYER'S CARDS CONTAINER */}
      <div
        id={`player-${side}-cards-container`}
        className={`flex-1 min-h-0 flex flex-col rounded-2xl bg-gradient-to-b from-[#10291D]/90 via-[#0A1D14]/90 to-[#05110B]/95 border p-2.5 shadow-2xl relative overflow-hidden transition-all duration-300 ${
          isCurrentTurn
            ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
            : 'border-[#D4AF37]/25 opacity-90'
        }`}
      >
        {/* Subtle Decorative Golden Filigree Accents */}
        <div className="absolute top-1.5 left-2 text-[9px] text-[#D4AF37]/25 pointer-events-none">⚜</div>
        <div className="absolute top-1.5 right-2 text-[9px] text-[#D4AF37]/25 pointer-events-none">⚜</div>

        {/* Cards Header Strip */}
        <div className="flex items-center justify-between px-1 pb-2 border-b border-[#D4AF37]/20 shrink-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isCurrentTurn ? 'bg-[#55EFC4] animate-pulse' : 'bg-amber-400/40'
              }`}
            />
            <span className="font-kate font-bold text-amber-200 text-xs uppercase tracking-wider truncate">
              {pName}&apos;S HAND ({cards.length})
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold bg-[#163828] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full text-amber-200">
            {legalCount} Legal Moves
          </span>
        </div>

        {/* Turn Prompt Banner */}
        <div className="py-1 px-1 text-center shrink-0">
          {isCurrentTurn ? (
            <span className="text-[10.5px] font-bold text-[#F4D03F] flex items-center justify-center gap-1">
              <span>⚔</span>
              <span>Click highlighted card to play</span>
            </span>
          ) : (
            <span className="text-[10.5px] text-amber-200/50 italic flex items-center justify-center gap-1">
              <span>⏳</span>
              <span>Awaiting opponent turn...</span>
            </span>
          )}
        </div>

        {/* Vertical Scrollable Cards Grid Rack */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-0.5 custom-hand-scrollbar py-1">
          {cards.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 text-amber-200/50">
              <span className="text-3xl mb-1">🂠</span>
              <span className="text-xs font-kate font-bold">Hand Empty</span>
              <span className="text-[10px] mt-1">All cards have been played to court</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 justify-items-center">
              {cards.map((card) => {
                const isValid = Boolean(validCardsInHand[card.id]);
                const isSelected = selectedCardId === card.id;
                const isShaking = shakingCardId === card.id;

                return (
                  <div key={card.id} className="relative group">
                    <Card
                      card={card}
                      compact={true}
                      isValid={isCurrentTurn && isValid}
                      isSelected={isSelected}
                      isShaking={isShaking}
                      onClick={() => onSelectCard(card.id, isCurrentTurn)}
                      className={`transition-all duration-150 ${
                        !isCurrentTurn
                          ? 'opacity-85 hover:opacity-100'
                          : isValid
                          ? 'cursor-pointer'
                          : 'opacity-70 hover:opacity-90'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
