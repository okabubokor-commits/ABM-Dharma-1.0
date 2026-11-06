import React, { useState } from 'react';
import { motion } from 'motion/react';
import cardsData from '../../data/cards.json';

interface ChronicleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chronicle: React.FC<ChronicleProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'rulers' | 'cards'>('rules');

  if (!isOpen) return null;

  return (
    <div
      id="chronicle-rules-modal"
      className="fixed inset-0 bg-[#1A3326]/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[85vh] bg-[#E8F0EC] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1A3326]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#1A3326]/15 bg-[#D4E4DC]">
          <div>
            <span className="text-[11px] font-kate uppercase tracking-[0.25em] text-[#D4AF37] font-black">
              Authoritative Codex
            </span>
            <h2 className="font-supremacy text-2xl font-black text-[#1A3326]">
              DHARMA: MUGHALYUGAM
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-[#1A3326]/10 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-[#1A3326] text-[#E8F0EC] shadow'
                  : 'text-[#1A3326] hover:bg-white/40'
              }`}
            >
              CLeMaR Rules & Scoring
            </button>
            <button
              onClick={() => setActiveTab('rulers')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeTab === 'rulers'
                  ? 'bg-[#1A3326] text-[#E8F0EC] shadow'
                  : 'text-[#1A3326] hover:bg-white/40'
              }`}
            >
              The 9 Imperial Rulers
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-[#1A3326] text-[#E8F0EC] shadow'
                  : 'text-[#1A3326] hover:bg-white/40'
              }`}
            >
              Special & Rival Cards
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-[#1A3326] hover:text-white transition flex items-center justify-center font-bold text-sm cursor-pointer shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === 'rules' && (
            <div className="space-y-6 text-sm">
              <div className="p-4 bg-white/70 rounded-2xl border border-[#1A3326]/10">
                <h3 className="font-kate font-bold text-lg text-[#1A3326] mb-2">
                  The CLeMaR Connection Architecture
                </h3>
                <p className="text-xs text-[#1A3326]/80 leading-relaxed mb-4">
                  Each turn, players connect a card to one of the <strong>last two cards</strong> played in the dynastic chain.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#1A3326] text-xs font-black flex items-center justify-center mb-1">
                      C
                    </span>
                    <h4 className="font-bold text-xs">Creator (Emperor)</h4>
                    <span className="text-[#E07A5F] font-bold text-xs block mt-1">+8 Points</span>
                    <p className="text-[10.5px] text-[#1A3326]/70 mt-1">
                      Immediate succession only: Must connect to immediate father or son!
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#8E44AD]/10 border border-[#8E44AD]/30">
                    <span className="w-6 h-6 rounded-full bg-[#8E44AD] text-white text-xs font-black flex items-center justify-center mb-1">
                      L
                    </span>
                    <h4 className="font-bold text-xs">Legislature (Law)</h4>
                    <span className="text-[#E07A5F] font-bold text-xs block mt-1">+6 Points</span>
                    <p className="text-[10.5px] text-[#1A3326]/70 mt-1">
                      Connects to any card belonging to the same Ruler Set.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#2980B9]/10 border border-[#2980B9]/30">
                    <span className="w-6 h-6 rounded-full bg-[#2980B9] text-white text-xs font-black flex items-center justify-center mb-1">
                      M
                    </span>
                    <h4 className="font-bold text-xs">Marvel (Architecture)</h4>
                    <span className="text-[#E07A5F] font-bold text-xs block mt-1">+4 Points</span>
                    <p className="text-[10.5px] text-[#1A3326]/70 mt-1">
                      Connects to any card belonging to the same Ruler Set.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#27AE60]/10 border border-[#27AE60]/30">
                    <span className="w-6 h-6 rounded-full bg-[#27AE60] text-white text-xs font-black flex items-center justify-center mb-1">
                      R
                    </span>
                    <h4 className="font-bold text-xs">Region (Subah)</h4>
                    <span className="text-[#E07A5F] font-bold text-xs block mt-1">+2 Points</span>
                    <p className="text-[10.5px] text-[#1A3326]/70 mt-1">
                      Connects to any card belonging to the same Ruler Set.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/70 rounded-2xl border border-[#1A3326]/10">
                  <h4 className="font-kate font-bold text-base text-[#1A3326] mb-2">
                    Scoring & The Imperial Pot
                  </h4>
                  <ul className="text-xs space-y-2 text-[#1A3326]/80 list-disc pl-4">
                    <li>
                      <strong>Card Points:</strong> Sum of all legal CLeMaR card points played into the chain.
                    </li>
                    <li>
                      <strong>The Pot:</strong> Every CLeMaR card adds its points directly to the center Pot.
                    </li>
                    <li>
                      <strong>Draw Penalties:</strong> Each drawn card from the draw pile inflicts a <strong>-1 point penalty</strong>.
                    </li>
                    <li>
                      <strong>Net Score Formula:</strong> <code>Card Points + Stolen Points - Draw Penalties</code>.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white/70 rounded-2xl border border-[#1A3326]/10">
                  <h4 className="font-kate font-bold text-base text-[#1A3326] mb-2">
                    Endgame & Authoritative Tie-Breakers
                  </h4>
                  <ul className="text-xs space-y-2 text-[#1A3326]/80 list-disc pl-4">
                    <li>
                      <strong>Winning Condition 1:</strong> A player empties their hand completely ("DHARMA!").
                    </li>
                    <li>
                      <strong>Winning Condition 2:</strong> Draw pile exhausted & reshuffled 3 times.
                    </li>
                    <li>
                      <strong>Tie-Breaker 1:</strong> Fewest cards remaining in hand.
                    </li>
                    <li>
                      <strong>Tie-Breaker 2:</strong> Most successful Rival steals.
                    </li>
                    <li>
                      <strong>Tie-Breaker 3:</strong> Highest single-card value in the final chain.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rulers' && (
            <div className="space-y-4">
              <p className="text-xs text-[#1A3326]/80">
                The 9 rulers spanning the Great Mughals and Later Mughals. Notice the direct succession father-son chain:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cardsData.rulers.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 bg-white/80 rounded-2xl border border-[#1A3326]/15 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-kate font-bold text-sm text-[#1A3326]">{r.name}</h4>
                      <span className="text-[10px] bg-[#D4AF37]/20 text-[#1A3326] font-extrabold px-2 py-0.5 rounded-full">
                        {(r as any).era || 'Imperial Era'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#1A3326]/70 leading-snug">
                      Father: <strong>{r.father || 'None (Founder)'}</strong> | Son: <strong>{r.son || 'None'}</strong>
                    </p>
                    <div className="mt-2 text-[10px] space-y-0.5 text-[#1A3326]/60 border-t border-[#1A3326]/10 pt-1.5">
                      <div>L: {r.cards.L.name}</div>
                      <div>M: {r.cards.M.name}</div>
                      <div>R: {r.cards.R.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="space-y-4">
              <p className="text-xs text-[#1A3326]/80">
                Special action cards and historic Wild Rivals that turn the tide of court diplomacy:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cardsData.specialCards.map((sc) => (
                  <div
                    key={sc.id}
                    className="p-3.5 bg-white/80 rounded-2xl border border-[#1A3326]/15 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-kate font-bold text-sm text-[#1A3326]">{sc.name}</h4>
                      <span className="text-[10px] bg-[#C0392B] text-white font-bold px-2 py-0.5 rounded-full">
                        {sc.category} ({sc.count} in deck)
                      </span>
                    </div>
                    <p className="text-xs text-[#E07A5F] font-bold">{sc.effect.replace(/_/g, ' ')}</p>
                    <p className="text-[11px] text-[#1A3326]/70 mt-1 leading-snug">
                      {sc.historicalContext}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
