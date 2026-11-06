import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { useAudio } from '../hooks/useAudio';

const CHRONICLER_PRESETS = [
  { name: 'Mirza Raja Jai Singh', title: 'Amber Generalissimo', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Raja Birbal', title: 'Grand Vizier of Wit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Raja Todar Mal', title: 'Finance Chancellor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Princess Jahanara', title: 'Begum Sahib Imperial', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces' }
];

export const Dashboard: React.FC = () => {
  const {
    setCurrentPage,
    playerName,
    setPlayerName,
    player2Name,
    setPlayer2Name,
    rounds,
    setRounds,
    setShowRulesModal,
    startDualPlayerGame
  } = useGameStore();

  const { play } = useAudio();
  const [selectedP1, setSelectedP1] = useState(playerName || 'Mirza Raja Jai Singh');
  const [selectedP2, setSelectedP2] = useState(player2Name || 'Princess Jahanara');

  const handleStartMatch = () => {
    play('cardPlay');
    setPlayerName(selectedP1);
    setPlayer2Name(selectedP2);
    startDualPlayerGame(rounds);
  };

  return (
    <div
      id="dashboard-screen"
      className="min-h-screen w-full bg-[#E8F0EC] text-[#1A3326] flex flex-col justify-between p-6 md:p-10"
    >
      {/* Top Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-[#1A3326]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('landing')}
            className="w-9 h-9 rounded-full bg-[#D4E4DC] border border-[#1A3326]/20 flex items-center justify-center font-bold text-sm hover:bg-[#1A3326] hover:text-[#E8F0EC] transition cursor-pointer"
          >
            ←
          </button>
          <div>
            <h2 className="font-supremacy text-2xl font-black text-[#1A3326]">
              Diwan-i-Am Assembly
            </h2>
            <p className="text-xs text-[#1A3326]/70">Configure your 2-Player Dual Match</p>
          </div>
        </div>

        <button
          onClick={() => setShowRulesModal(true)}
          className="px-4 py-2 rounded-full border border-[#1A3326]/20 bg-[#D4E4DC] hover:bg-[#1A3326] hover:text-[#E8F0EC] text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
        >
          <span>📜</span>
          <span>Imperial Codex</span>
        </button>
      </header>

      {/* Main Form */}
      <main className="w-full max-w-4xl mx-auto py-6 my-auto space-y-6">
        {/* Dual Players Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player 1 */}
          <section className="bg-[#D4E4DC]/70 border border-[#1A3326]/15 rounded-3xl p-6 shadow-sm">
            <h3 className="font-kate text-sm font-bold uppercase tracking-wider text-[#1A3326] mb-3">
              Player 1 (Host Chronicler)
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {CHRONICLER_PRESETS.map((preset) => {
                const isSelected = selectedP1 === preset.name;
                return (
                  <div
                    key={`p1_${preset.name}`}
                    onClick={() => {
                      play('tanpuraPluck');
                      setSelectedP1(preset.name);
                    }}
                    className={`p-2.5 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center bg-white/80 ${
                      isSelected
                        ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/40 shadow-md'
                        : 'border-[#1A3326]/15 hover:border-[#1A3326]/40'
                    }`}
                  >
                    <img
                      src={preset.avatar}
                      alt={preset.name}
                      className="w-12 h-12 rounded-full object-cover mb-1 border border-[#1A3326]/20"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-centrion font-bold text-xs text-[#1A3326] leading-tight">
                      {preset.name}
                    </span>
                    <span className="text-[9px] text-[#1A3326]/60">{preset.title}</span>
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              value={selectedP1}
              onChange={(e) => setSelectedP1(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white border border-[#1A3326]/20 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              placeholder="Player 1 Name"
            />
          </section>

          {/* Player 2 */}
          <section className="bg-[#D4E4DC]/70 border border-[#1A3326]/15 rounded-3xl p-6 shadow-sm">
            <h3 className="font-kate text-sm font-bold uppercase tracking-wider text-[#1A3326] mb-3">
              Player 2 (Challenger)
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {CHRONICLER_PRESETS.map((preset) => {
                const isSelected = selectedP2 === preset.name;
                return (
                  <div
                    key={`p2_${preset.name}`}
                    onClick={() => {
                      play('tanpuraPluck');
                      setSelectedP2(preset.name);
                    }}
                    className={`p-2.5 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center bg-white/80 ${
                      isSelected
                        ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/40 shadow-md'
                        : 'border-[#1A3326]/15 hover:border-[#1A3326]/40'
                    }`}
                  >
                    <img
                      src={preset.avatar}
                      alt={preset.name}
                      className="w-12 h-12 rounded-full object-cover mb-1 border border-[#1A3326]/20"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-centrion font-bold text-xs text-[#1A3326] leading-tight">
                      {preset.name}
                    </span>
                    <span className="text-[9px] text-[#1A3326]/60">{preset.title}</span>
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              value={selectedP2}
              onChange={(e) => setSelectedP2(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white border border-[#1A3326]/20 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              placeholder="Player 2 Name"
            />
          </section>
        </div>

        {/* Round Duration */}
        <section className="bg-[#D4E4DC]/70 border border-[#1A3326]/15 rounded-3xl p-6 shadow-sm">
          <h3 className="font-kate text-sm font-bold uppercase tracking-wider text-[#1A3326] mb-3">
            Match Length (Total Rounds)
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {[5, 7, 9, 11, 15].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRounds(r)}
                className={`px-5 py-2.5 rounded-full font-kate text-xs font-black transition cursor-pointer border ${
                  rounds === r
                    ? 'bg-[#1A3326] text-[#E8F0EC] border-[#D4AF37] shadow'
                    : 'bg-white/80 text-[#1A3326] border-[#1A3326]/20 hover:bg-[#1A3326]/10'
                }`}
              >
                {r} Rounds {r === 7 ? '(Standard)' : ''}
              </button>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <div className="text-center pt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStartMatch}
            className="px-12 py-4 rounded-full bg-[#E07A5F] text-white font-kate text-base font-black tracking-widest uppercase shadow-2xl hover:bg-[#d46a4e] transition cursor-pointer ring-4 ring-[#E07A5F]/30"
          >
            Enter Battle Arena
          </motion.button>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-5xl mx-auto pt-4 border-t border-[#1A3326]/10 text-center text-xs text-[#1A3326]/60">
        Dual-Player Pass-and-Play · Fisher-Yates 52-Card Deck · Server-Authoritative CLeMaR Rules
      </footer>
    </div>
  );
};
