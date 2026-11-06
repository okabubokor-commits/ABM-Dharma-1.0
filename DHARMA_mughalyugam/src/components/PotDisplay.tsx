import React from 'react';
import { motion } from 'motion/react';

interface PotDisplayProps {
  pot: number;
  deckCount: number;
}

export const PotDisplay: React.FC<PotDisplayProps> = ({ pot, deckCount }) => {
  return (
    <div className="flex items-center gap-6">
      {/* The Pot Pill */}
      <motion.div
        id="pot-pill-display"
        whileHover={{ scale: 1.04 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.45), inset 0 0 10px rgba(255, 255, 255, 0.3)',
            '0 0 35px rgba(244, 208, 63, 0.75), inset 0 0 15px rgba(255, 255, 255, 0.5)',
            '0 0 20px rgba(212, 175, 55, 0.45), inset 0 0 10px rgba(255, 255, 255, 0.3)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative group cursor-pointer"
      >
        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] border-2 border-white/60 flex items-center gap-3 text-[#1A3326] shadow-lg">
          <span className="text-2xl filter drop-shadow">💰</span>
          <div className="flex flex-col text-left">
            <span className="text-[10px] tracking-widest uppercase font-extrabold text-[#1A3326]/70">
              Imperial Treasure
            </span>
            <span className="font-supremacy font-black text-xl tracking-wide leading-none text-[#1A3326]">
              POT: {pot} POINTS
            </span>
          </div>
          <div className="ml-2 bg-[#1A3326]/15 px-2 py-0.5 rounded-full text-[11px] font-bold text-[#1A3326] uppercase tracking-wider">
            Active Pot
          </div>
        </div>
      </motion.div>

      {/* Deck Counter Pill */}
      <div
        id="deck-counter-pill"
        className="flex items-center gap-2 bg-[#D4E4DC] border border-[#1A3326]/20 px-4 py-2 rounded-full shadow-sm text-[#1A3326] font-centrion font-semibold text-sm"
      >
        <span className="text-base">🂠</span>
        <span className="tracking-wide">
          DECK: <strong className="font-bold text-[#1A3326]">{deckCount}</strong>
        </span>
      </div>
    </div>
  );
};
