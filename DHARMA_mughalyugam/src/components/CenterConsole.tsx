import React from 'react';
import { motion } from 'motion/react';

interface CenterConsoleProps {
  deckCount: number;
  onDrawCard: () => void;
  canPlayCard: boolean;
  selectedCardName?: string | null;
  activePlayerName: string;
  isMyTurn: boolean;
  onPlaySelectedCard: () => void;
  onOpenRules: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CenterConsole: React.FC<CenterConsoleProps> = ({
  deckCount,
  onDrawCard,
  canPlayCard,
  selectedCardName,
  activePlayerName,
  isMyTurn,
  onPlaySelectedCard,
  onOpenRules,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <div
      id="center-battle-console"
      className="w-full shrink-0 bg-gradient-to-r from-[#10291D]/95 via-[#163828]/95 to-[#10291D]/95 border-2 border-[#D4AF37]/45 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 relative select-none"
    >
      {/* Left: Quick Utility & Rules */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          id="btn-view-chronicle-rules"
          onClick={onOpenRules}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A382A] border border-[#D4AF37]/40 text-xs font-bold text-amber-200 hover:bg-[#D4AF37] hover:text-[#0A1A12] transition cursor-pointer shadow"
        >
          <span>📜</span>
          <span className="font-kate">Imperial Codex</span>
        </button>

        <button
          id="btn-toggle-sound"
          onClick={onToggleSound}
          className="p-1.5 px-2.5 rounded-full bg-[#1A382A] border border-[#D4AF37]/40 text-xs text-amber-200 hover:border-[#D4AF37] transition cursor-pointer shadow"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Center: Action Play Button & Contextual Guidance */}
      <div className="flex flex-col items-center gap-1.5 flex-1 max-w-lg text-center">
        <div className="flex items-center gap-3">
          {/* Main Play / Commit Button */}
          <motion.button
            id="btn-play-card-action"
            whileHover={{ scale: canPlayCard ? 1.04 : 1 }}
            whileTap={{ scale: canPlayCard ? 0.96 : 1 }}
            disabled={!canPlayCard}
            onClick={onPlaySelectedCard}
            className={`px-6 sm:px-8 py-2 rounded-full font-kate text-xs sm:text-sm font-black tracking-widest uppercase shadow-xl transition cursor-pointer flex items-center gap-2 border ${
              canPlayCard
                ? 'bg-gradient-to-r from-[#E07A5F] via-[#D45D3B] to-[#C0392B] text-white hover:brightness-110 border-white/60 animate-pulse ring-2 ring-[#E07A5F]/60'
                : 'bg-[#122A1E] text-amber-200/40 border-[#D4AF37]/20 cursor-not-allowed'
            }`}
          >
            <span>⚔</span>
            <span>
              {canPlayCard
                ? 'Commit Card To Table'
                : selectedCardName
                ? 'Select Target Slot In Chain'
                : 'Select Card To Play'}
            </span>
          </motion.button>

          {/* Quick Draw Button */}
          <button
            id="btn-draw-card-action"
            disabled={!isMyTurn}
            onClick={onDrawCard}
            className={`px-4 py-2 rounded-full font-centrion text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 shadow ${
              isMyTurn
                ? 'bg-[#1A382A] border-[#D4AF37]/50 text-amber-200 hover:bg-[#D4AF37] hover:text-[#0A1A12]'
                : 'bg-[#122A1E] border-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>🂠</span>
            <span>Draw (-1 pt)</span>
          </button>
        </div>

        {/* Turn Guidance Text */}
        <div className="text-[10px] sm:text-[11px] text-amber-200/80 font-medium tracking-wide">
          {selectedCardName ? (
            <span className="text-[#F4D03F] font-bold">
              ✓ Ready to play <span className="underline">{selectedCardName}</span>! Click a highlighted chain slot or Commit.
            </span>
          ) : (
            <span>
              ⚔ <strong className="text-[#F4D03F]">{activePlayerName}&apos;s Turn</strong>: Select a card from your hand, then link it to the central chain!
            </span>
          )}
        </div>
      </div>

      {/* Right: The 3D Authentic Stacked Royal Deck Centerpiece */}
      <div className="flex items-center gap-2.5 shrink-0">
        <motion.div
          id="central-draw-deck-anchor"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDrawCard}
          className="relative w-12 h-16 sm:w-14 sm:h-18 rounded-lg bg-gradient-to-b from-[#1E4331] to-[#0D2218] border-2 border-[#D4AF37] shadow-xl flex flex-col items-center justify-between p-1 cursor-pointer group"
          title="Click to Draw Card (-1 Point penalty)"
        >
          {/* 3D Stack depth layers */}
          <div className="absolute -top-1 -right-1 w-full h-full rounded-lg bg-[#143224] border border-[#D4AF37]/40 -z-10" />
          <div className="absolute -top-2 -right-2 w-full h-full rounded-lg bg-[#0A1D14] border border-[#D4AF37]/20 -z-20" />

          <div className="w-full flex justify-between items-center text-[#D4AF37] px-0.5">
            <span className="text-[7px] font-bold">🂠</span>
            <span className="text-[7px] font-bold">DECK</span>
          </div>

          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-black/40 group-hover:scale-110 transition-transform shadow-inner">
            <span className="font-supremacy text-xs sm:text-sm font-black text-[#F4D03F] leading-none">
              {deckCount}
            </span>
          </div>

          <div className="w-full text-center z-10">
            <span className="text-[6.5px] text-[#F4D03F] tracking-wider font-extrabold uppercase bg-[#10291D]/90 px-1 py-0.2 rounded-full border border-[#D4AF37]/50 block">
              DRAW (-1)
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col text-left">
          <span className="font-kate text-[#FDFBF7] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Deck ({deckCount})
          </span>
          <span className="text-[9px] text-[#E07A5F] font-bold">
            -1 Pt Penalty
          </span>
        </div>
      </div>
    </div>
  );
};
