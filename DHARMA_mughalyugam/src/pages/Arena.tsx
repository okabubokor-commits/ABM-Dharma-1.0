import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/gameStore';
import { useAudio } from '../hooks/useAudio';
import { useValidation } from '../hooks/useValidation';
import { Chain } from '../components/Chain';
import { PlayerSidePanel } from '../components/PlayerSidePanel';
import { CenterConsole } from '../components/CenterConsole';
import { PotDisplay } from '../components/PotDisplay';
import { BattleLog } from '../components/BattleLog';
import { Chronicle } from '../components/Chronicle';
import { DealAnimation } from '../components/DealAnimation';
import { AadeshModal } from '../components/AadeshModal';
import { WildCardCinematicOverlay } from '../components/WildCardCinematicOverlay';
import { isWildCard } from '../../engine/validator';

export const Arena: React.FC = () => {
  const {
    players,
    playerHands,
    isDealAnimationActive,
    setIsDealAnimationActive,
    baseCardData,
    chain,
    pot,
    deckCount,
    round,
    maxRounds,
    currentTurnPlayerId,
    currentTurnIndex,
    gameStatus,
    battleLog,
    lastPlayedCard,
    selectedCardId,
    selectedTargetNodeId,
    pendingAadeshCardId,
    setSelectedCard,
    setSelectedTargetNode,
    setPendingAadeshCardId,
    showRulesModal,
    setShowRulesModal,
    activeToast,
    showToast,
    settings,
    updateSettings,
    finalScores,
    winner,
    wildCinematicCard,
    isWildCinematicActive,
    isVibrationActive,
    isLightningActive,
    triggerWildCardEffect,
    setCurrentPage,
    resetGame,
    startDualPlayerGame,
    drawCardAction,
    playCardAction
  } = useGameStore();

  const { play } = useAudio();
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'scoreboard' | 'battlelog' | 'lore'>('scoreboard');
  const [shakingCardId, setShakingCardId] = useState<string | null>(null);

  // Auto-initialize Dual Player game if not started
  useEffect(() => {
    if (gameStatus === 'lobby' || chain.length === 0 || players.length === 0) {
      startDualPlayerGame(maxRounds || 7);
    }
  }, [gameStatus, chain.length, players.length, maxRounds, startDualPlayerGame]);

  const p1 = players[0];
  const p2 = players[1];
  const activePlayer = players[currentTurnIndex] || p1;

  // Real dual player hands
  const p1Cards = playerHands['p1'] || [];
  const p2Cards = playerHands['p2'] || [];

  // Validation computed independently for each player's hand
  const p1Validation = useValidation(
    chain,
    p1Cards,
    currentTurnPlayerId === 'p1' ? selectedCardId : null
  );

  const p2Validation = useValidation(
    chain,
    p2Cards,
    currentTurnPlayerId === 'p2' ? selectedCardId : null
  );

  const activeValidation = currentTurnPlayerId === 'p1' ? p1Validation : p2Validation;
  const activeLegalTargetNodeIds = activeValidation.legalTargetNodeIds;

  // Selected card data
  const currentActiveCards = currentTurnPlayerId === 'p1' ? p1Cards : p2Cards;
  const selectedCard = currentActiveCards.find((c) => c.id === selectedCardId);

  // Can play selected card
  const canPlaySelectedCard = Boolean(
    selectedCardId &&
      selectedTargetNodeId &&
      activeLegalTargetNodeIds.includes(selectedTargetNodeId)
  );

  // Execute Play Card to table
  const executePlayCard = (
    cardId: string,
    targetNodeId: string,
    playerId?: 'p1' | 'p2',
    declaredCategory?: 'C' | 'L' | 'M' | 'R'
  ) => {
    const pid = playerId || (currentTurnPlayerId as 'p1' | 'p2');
    const hand = playerHands[pid] || [];
    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    const isAadeshCard =
      card.type === 'aadesh' ||
      card.variant === 'aadesh' ||
      card.name.toLowerCase().includes('aadesh');

    // If card is Aadesh and no category declared yet, open modal
    if (isAadeshCard && !declaredCategory) {
      setSelectedCard(cardId);
      setSelectedTargetNode(targetNodeId);
      setPendingAadeshCardId(cardId);
      return;
    }

    const success = playCardAction(cardId, targetNodeId, declaredCategory);

    if (success) {
      // Trigger wild card cinematic sequence if played card is wild
      if (isWildCard(card)) {
        triggerWildCardEffect(card);
      }

      if (card.category === 'Rival' || card.type === 'rival') {
        play('rivalSteal');
      } else if (isAadeshCard) {
        play('aadeshCommand');
      } else if (card.effect === 'steal_last_card') {
        play('mahaKarmaStrike');
      } else if (card.effect === 'skip_next') {
        play('mounaSkip');
      } else if (card.effect === 'reverse_order') {
        play('chakravyuhaReverse');
      } else {
        play('cardPlay');
        play('potIncrease');
      }

      setSelectedCard(null);
      setSelectedTargetNode(null);
      setPendingAadeshCardId(null);
    }
  };

  // Handle Play Card via button or table commit
  const handlePlayCard = () => {
    if (!selectedCardId || !selectedTargetNodeId) return;
    executePlayCard(selectedCardId, selectedTargetNodeId, currentTurnPlayerId as 'p1' | 'p2');
  };

  // Handle category chosen for Aadesh card
  const handleAadeshCategorySelect = (category: 'C' | 'L' | 'M' | 'R') => {
    if (!pendingAadeshCardId) return;
    const targetNodeId =
      selectedTargetNodeId ||
      activeLegalTargetNodeIds[activeLegalTargetNodeIds.length - 1] ||
      chain[chain.length - 1]?.id ||
      'chain_node_0';

    executePlayCard(pendingAadeshCardId, targetNodeId, currentTurnPlayerId as 'p1' | 'p2', category);
  };

  // Handle Draw Card
  const handleDrawCard = () => {
    play('cardDraw');
    drawCardAction();
    setSelectedCard(null);
    setSelectedTargetNode(null);
    setPendingAadeshCardId(null);
  };

  // Handle Card Click from Player's Hand
  const handleSelectCard = (cardId: string, playerId: 'p1' | 'p2') => {
    // If player clicked card on the waiting player's side
    if (playerId !== currentTurnPlayerId) {
      const activeName = currentTurnPlayerId === 'p1' ? (p1?.name || 'AD') : (p2?.name || 'RS');
      showToast(`⚔ It is currently ${activeName}'s turn! Select a card from ${activeName}'s hand.`);
      return;
    }

    const hand = playerId === 'p1' ? p1Cards : p2Cards;
    const card = hand.find((c) => c.id === cardId);
    if (!card) return;

    const validation = playerId === 'p1' ? p1Validation : p2Validation;
    const isValid = Boolean(validation.validCardsInHand[cardId]);

    if (!isValid) {
      // Illegal move feedback: vibration + glowing red
      setShakingCardId(cardId);
      play('errorBuzz');

      const lastNode = chain[chain.length - 1];
      const targetCard = lastNode ? lastNode.card : null;
      const targetDesc = targetCard
        ? `${targetCard.name} (${targetCard.category || 'Special'})`
        : 'the Base Card';

      showToast(`⚠️ Illegal Move! ${card.name} (${card.category}) cannot link to ${targetDesc}. Match Category, Ruler, or Succession!`);

      setTimeout(() => {
        setShakingCardId((curr) => (curr === cardId ? null : curr));
      }, 650);
      return;
    }

    // Determine legal target node on the table
    const legalTargets = validation.legalTargetNodeIds;
    const targetNodeId =
      selectedTargetNodeId && legalTargets.includes(selectedTargetNodeId)
        ? selectedTargetNodeId
        : legalTargets[legalTargets.length - 1] || chain[chain.length - 1]?.id || 'chain_node_0';

    // 1. Select card: card gets up from player's section with animation
    setSelectedCard(cardId);
    setSelectedTargetNode(targetNodeId);
    play('cardHover');

    const isAadeshCard =
      card.type === 'aadesh' ||
      card.variant === 'aadesh' ||
      card.name.toLowerCase().includes('aadesh');

    if (isAadeshCard) {
      // Open Aadesh modal to declare category
      setPendingAadeshCardId(cardId);
      return;
    }

    // 2. Animate and transition the card onto the table
    setTimeout(() => {
      executePlayCard(cardId, targetNodeId, playerId);
    }, 280);
  };

  // Trigger celebratory fanfare and confetti on victory
  useEffect(() => {
    if (gameStatus === 'ended') {
      play('victoryFanfare');
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [gameStatus, play]);

  return (
    <div className="relative w-full h-screen bg-[#040C08] overflow-hidden">
      {/* Master Cinematic WILD CARD Overlay (Slow-motion card spotlight + electric lightning) */}
      <WildCardCinematicOverlay
        card={wildCinematicCard}
        isCinematicActive={isWildCinematicActive}
        isLightningActive={isLightningActive}
      />

      <div
        id="arena-battlefield"
        className={`relative w-full h-full bg-gradient-to-b from-[#0B1E14] via-[#07150E] to-[#040C08] text-[#F5EBE6] flex flex-col justify-between overflow-hidden select-none ${
          isWildCinematicActive ? 'cinematic-slow-motion' : ''
        } ${isVibrationActive ? 'cinematic-interface-vibration' : ''}`}
      >
        {/* 0. UNO-STYLE SHUFFLE & DEAL ANIMATION OVERLAY */}
      <AnimatePresence>
        {isDealAnimationActive && (
          <DealAnimation
            baseCard={baseCardData}
            p1Name={p1?.name || 'AD'}
            p2Name={p2?.name || 'RS'}
            p1Cards={playerHands['p1'] || []}
            p2Cards={playerHands['p2'] || []}
            onComplete={() => setIsDealAnimationActive(false)}
          />
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#163828] text-[#F5EBE6] px-6 py-2.5 rounded-full shadow-2xl border-2 border-[#D4AF37] text-xs font-bold flex items-center gap-2"
          >
            <span>📜</span>
            <span>{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP HEADER NAVIGATION (Preserved with royal aesthetic, pot, deck, round) */}
      <header
        id="arena-header"
        className="w-full px-4 sm:px-8 py-2.5 bg-[#10291D]/95 backdrop-blur-md border-b border-[#D4AF37]/30 flex items-center justify-between z-30 shrink-0"
      >
        {/* Left: Brand & Match info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              if (confirm('Return to court lobby? Current match will be reset.')) {
                resetGame();
                setCurrentPage('landing');
              }
            }}
            className="w-8 h-8 rounded-full bg-[#163828] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0A1A12] text-amber-200 transition flex items-center justify-center text-xs font-bold cursor-pointer shadow"
            title="Return to Main Menu"
          >
            ←
          </button>
          <div>
            <h1 className="font-supremacy text-base sm:text-lg font-black tracking-wider text-[#FDFBF7] leading-none">
              DHARMA: MUGHALYUGAM
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9.5px] sm:text-[10px] font-kate uppercase tracking-widest text-[#D4AF37]">
                2-PLAYER DUAL BATTLEFIELD
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono bg-black/40 border border-[#D4AF37]/25 px-2 py-0.2 rounded text-amber-200 font-bold">
                Pass &amp; Play Turn-Based
              </span>
            </div>
          </div>
        </div>

        {/* Center: Round & Active Turn Indicators */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#163828] text-[#F5EBE6] px-3.5 py-1 rounded-full font-kate text-xs font-black tracking-widest uppercase shadow flex items-center gap-1.5 border border-[#D4AF37]/50">
            <span>ROUND</span>
            <span className="text-[#F4D03F] text-sm">{round}</span>
            <span className="opacity-60">/ {maxRounds}</span>
          </div>

          <div className="bg-gradient-to-r from-[#E07A5F] to-[#D45D3B] text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 animate-pulse border border-white/30">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Active: {activePlayer ? activePlayer.name : 'AD'}</span>
          </div>
        </div>

        {/* Right: Pot & Utility Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <PotDisplay pot={pot} deckCount={deckCount} />

          <button
            onClick={() => setIsLogOpen(!isLogOpen)}
            className="px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#163828]/80 hover:bg-[#D4AF37] hover:text-[#0A1A12] text-xs font-kate font-bold text-amber-200 transition cursor-pointer flex items-center gap-1.5 shadow"
          >
            <span>📜</span>
            <span className="hidden sm:inline">Ledger &amp; Scores</span>
            <span className="sm:hidden">Ledger</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN BATTLEFIELD: NEW 3-COLUMN RESTRUCTURED LAYOUT
          LEFT: Player 1 Profile/Score → Player 1's Cards
          CENTER: Large Dynastic Chain Arena (Primary & Largest area)
          RIGHT: Player 2 Profile/Score → Player 2's Cards
      */}
      <main
        id="battlefield-main-grid"
        className="flex-1 w-full max-w-[1880px] mx-auto p-2.5 sm:p-3 lg:p-4 flex flex-col md:flex-row items-stretch justify-between gap-3 lg:gap-4 overflow-hidden relative z-10 min-h-0"
      >
        {/* LEFT COLUMN: Player 1 Profile/Score → Player 1's Cards */}
        <PlayerSidePanel
          player={p1 ? { ...p1, cardCount: p1Cards.length, genderLabel: '(Boy)' } : undefined}
          isCurrentTurn={currentTurnPlayerId === 'p1'}
          cards={p1Cards}
          validCardsInHand={p1Validation.validCardsInHand}
          selectedCardId={currentTurnPlayerId === 'p1' ? selectedCardId : null}
          shakingCardId={shakingCardId}
          side="left"
          onSelectCard={(cardId) => handleSelectCard(cardId, 'p1')}
          onDrawCard={handleDrawCard}
        />

        {/* CENTER COLUMN: Large Dynastic Chain Arena (Dominant Centerpiece) + Center Console */}
        <section
          id="center-dynastic-chain-arena"
          className="flex-1 min-w-0 h-full flex flex-col gap-2.5 justify-between overflow-hidden"
        >
          {/* Dominant Dynastic Chain Arena Board */}
          <Chain
            chain={chain}
            legalTargetNodeIds={activeLegalTargetNodeIds}
            selectedTargetNodeId={selectedTargetNodeId}
            selectedCardId={selectedCardId}
            onSelectTargetNode={(nodeId) => {
              setSelectedTargetNode(nodeId);
              if (selectedCardId && nodeId) {
                executePlayCard(selectedCardId, nodeId, currentTurnPlayerId as 'p1' | 'p2');
              }
            }}
            onCommitPlay={handlePlayCard}
          />

          {/* Integrated Center Console: 3D Stacked Royal Deck, Action Play Button, Rules & Guidance */}
          <CenterConsole
            deckCount={deckCount}
            onDrawCard={handleDrawCard}
            canPlayCard={canPlaySelectedCard}
            selectedCardName={selectedCard?.name}
            activePlayerName={activePlayer ? activePlayer.name : 'AD'}
            isMyTurn={true}
            onPlaySelectedCard={handlePlayCard}
            onOpenRules={() => setShowRulesModal(true)}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
          />
        </section>

        {/* RIGHT COLUMN: Player 2 Profile/Score → Player 2's Cards */}
        <PlayerSidePanel
          player={p2 ? { ...p2, cardCount: p2Cards.length, genderLabel: '(Girl)' } : undefined}
          isCurrentTurn={currentTurnPlayerId === 'p2'}
          cards={p2Cards}
          validCardsInHand={p2Validation.validCardsInHand}
          selectedCardId={currentTurnPlayerId === 'p2' ? selectedCardId : null}
          shakingCardId={shakingCardId}
          side="right"
          onSelectCard={(cardId) => handleSelectCard(cardId, 'p2')}
          onDrawCard={handleDrawCard}
        />
      </main>

      {/* 3. SLIDE-OVER RIGHT LEDGER DRAWER: 3 Panels (Scoreboard, Battle Log, Chronicle Lore) */}
      <AnimatePresence>
        {isLogOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 h-full w-84 md:w-96 bg-[#0E2419] border-l-2 border-[#D4AF37]/40 shadow-2xl z-40 p-5 flex flex-col justify-between"
          >
            {/* Drawer Header with Tabs */}
            <div className="pb-3 border-b border-[#D4AF37]/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-kate font-bold text-sm text-[#F4D03F] uppercase tracking-wider">
                  Imperial Court Ledger
                </h3>
                <button
                  onClick={() => setIsLogOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#163828] border border-[#D4AF37]/30 text-amber-200 flex items-center justify-center font-bold text-xs hover:bg-[#D4AF37] hover:text-[#0A1A12] transition cursor-pointer shadow"
                >
                  ✕
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex rounded-lg bg-black/40 p-1 border border-[#D4AF37]/20 gap-1 text-[11px] font-kate">
                <button
                  onClick={() => setActiveTab('scoreboard')}
                  className={`flex-1 py-1 rounded font-bold transition cursor-pointer ${
                    activeTab === 'scoreboard'
                      ? 'bg-[#D4AF37] text-[#0A1A12]'
                      : 'text-amber-200/70 hover:text-amber-200'
                  }`}
                >
                  Scoreboard
                </button>
                <button
                  onClick={() => setActiveTab('battlelog')}
                  className={`flex-1 py-1 rounded font-bold transition cursor-pointer ${
                    activeTab === 'battlelog'
                      ? 'bg-[#D4AF37] text-[#0A1A12]'
                      : 'text-amber-200/70 hover:text-amber-200'
                  }`}
                >
                  Live Log
                </button>
                <button
                  onClick={() => setActiveTab('lore')}
                  className={`flex-1 py-1 rounded font-bold transition cursor-pointer ${
                    activeTab === 'lore'
                      ? 'bg-[#D4AF37] text-[#0A1A12]'
                      : 'text-amber-200/70 hover:text-amber-200'
                  }`}
                >
                  Chronicle Lore
                </button>
              </div>
            </div>

            {/* Tab 1: Live Scoreboard breakdown according to PDF rules */}
            {activeTab === 'scoreboard' && (
              <div className="flex-1 py-4 overflow-y-auto flex flex-col gap-4 text-xs">
                <div className="rounded-xl bg-[#163828] p-3 border border-[#D4AF37]/30">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Official Scoring Formula (PDF Rules)
                  </span>
                  <p className="text-amber-100/70 text-[10.5px] mt-1">
                    Total = (Played CLeMaR Card Pts) + (Rival Stolen Pts) - (Draw Penalties: -1 Pt/Card)
                  </p>
                </div>

                {players.map((p) => {
                  const netScore = (p.cardPoints || 0) + (p.stolenPoints || 0) - (p.drawPenalties || 0);
                  const isCurrent = p.id === currentTurnPlayerId;
                  return (
                    <div
                      key={p.id}
                      className={`rounded-xl p-3.5 border ${
                        isCurrent
                          ? 'bg-[#163828] border-[#F4D03F] shadow-md'
                          : 'bg-black/30 border-[#D4AF37]/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-kate font-bold text-sm text-white">
                          {p.name} {isCurrent && '👑 (Turn)'}
                        </span>
                        <span className="font-supremacy text-lg font-black text-[#F4D03F]">
                          {netScore} PTS
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-[#D4AF37]/15">
                        <div className="flex flex-col">
                          <span className="text-amber-200/60">Card Pts</span>
                          <span className="font-bold text-[#55EFC4]">+{p.cardPoints || 0}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-amber-200/60">Stolen</span>
                          <span className="font-bold text-amber-300">+{p.stolenPoints || 0}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-amber-200/60">Draw Penalty</span>
                          <span className="font-bold text-red-400">-{p.drawPenalties || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Pot Status Card */}
                <div className="rounded-xl bg-gradient-to-r from-[#D4AF37]/20 via-[#F4D03F]/10 to-[#D4AF37]/20 p-3 border border-[#D4AF37] text-center mt-auto">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                    Current Imperial Pot
                  </span>
                  <div className="font-supremacy text-2xl font-black text-[#F4D03F]">
                    {pot} POINTS
                  </div>
                  <span className="text-[10px] text-amber-200/70 block mt-0.5">
                    Rival cards (Shivaji / Pratap) steal this entire pot!
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Live Battle Log Stream */}
            {activeTab === 'battlelog' && (
              <div className="flex-1 py-3 overflow-hidden">
                <BattleLog logs={battleLog} />
              </div>
            )}

            {/* Tab 3: Chronicle Lore of the Last Played Card */}
            {activeTab === 'lore' && (
              <div className="flex-1 py-4 overflow-y-auto text-xs flex flex-col gap-3">
                {lastPlayedCard ? (
                  <div className="rounded-xl bg-[#163828] p-4 border border-[#D4AF37]/40">
                    <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20 mb-2">
                      <span className="font-kate font-bold text-sm text-[#F4D03F]">
                        {lastPlayedCard.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#55EFC4]">
                        {lastPlayedCard.points ? `+${lastPlayedCard.points} PTS` : '0 PTS'}
                      </span>
                    </div>

                    <p className="font-editorial italic text-sm text-[#F5EBE6] leading-relaxed">
                      {lastPlayedCard.historicalDetail ||
                        lastPlayedCard.historicalContext ||
                        'Recorded in the Imperial Archives of Bharat.'}
                    </p>

                    {lastPlayedCard.effect && (
                      <div className="mt-3 pt-2 border-t border-[#D4AF37]/20 text-[11px]">
                        <span className="font-bold text-[#55EFC4]">Tactical Effect: </span>
                        <span className="text-amber-100/90">{lastPlayedCard.effect.replace(/_/g, ' ')}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-amber-200/60 text-center my-auto">
                    Play a card to view its dynastic historical record here.
                  </p>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-[#D4AF37]/20 text-[10px] text-amber-200/60 text-center font-centrion">
              52 Cards · 7 Dynastic Rounds · CLeMaR Hierarchy
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. VICTORY & MATCH OVER MODAL */}
      <AnimatePresence>
        {gameStatus === 'ended' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-lg z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl bg-gradient-to-b from-[#163828] to-[#0A1A12] border-2 border-[#D4AF37] rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center"
            >
              <span className="text-5xl mb-2">🏆</span>
              <span className="text-xs font-kate uppercase tracking-[0.3em] text-[#D4AF37] font-black">
                Chronicle Complete
              </span>
              <h2 className="font-supremacy text-3xl font-black text-[#FDFBF7] mt-1">
                {winner ? `${winner.name} Claims the Throne!` : 'Match Concluded'}
              </h2>
              <p className="text-xs text-amber-100/70 max-w-md mt-2">
                The Yuga has reached its conclusion. Final scores and authoritative tie-breakers have been recorded into the Imperial Archive.
              </p>

              {/* Tie-breaker scoreboard */}
              <div className="w-full mt-6 bg-black/40 rounded-2xl border border-[#D4AF37]/30 overflow-hidden shadow-inner">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#10291D] text-amber-200 font-kate font-bold border-b border-[#D4AF37]/20">
                    <tr>
                      <th className="p-3">Rank</th>
                      <th className="p-3">Chronicler</th>
                      <th className="p-3 text-right">Card Pts</th>
                      <th className="p-3 text-right">Stolen</th>
                      <th className="p-3 text-right">Penalty</th>
                      <th className="p-3 text-right">Hand</th>
                      <th className="p-3 text-right font-black">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4AF37]/10">
                    {finalScores.map((score, idx) => (
                      <tr
                        key={score.player.id}
                        className={idx === 0 ? 'bg-[#D4AF37]/15 font-bold' : ''}
                      >
                        <td className="p-3">
                          {idx === 0 ? '👑 1st' : `${idx + 1}th`}
                        </td>
                        <td className="p-3 font-semibold text-white">{score.player.name}</td>
                        <td className="p-3 text-right text-[#55EFC4]">+{score.cardPoints}</td>
                        <td className="p-3 text-right text-amber-300 font-bold">
                          +{score.stolenPoints}
                        </td>
                        <td className="p-3 text-right text-red-400">-{score.drawPenalties}</td>
                        <td className="p-3 text-right text-white/70">{score.handCount}</td>
                        <td className="p-3 text-right font-supremacy text-base font-black text-[#F4D03F]">
                          {score.totalScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() => {
                    startDualPlayerGame(maxRounds || 7);
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-[#0A1A12] font-kate font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  Play Rematch
                </button>

                <button
                  onClick={() => {
                    resetGame();
                    setCurrentPage('landing');
                  }}
                  className="px-6 py-3 rounded-full bg-[#163828] border border-[#D4AF37]/30 text-amber-200 font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0A1A12] transition cursor-pointer"
                >
                  Return to Main Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. RULES & CODEX MODAL */}
      <Chronicle isOpen={showRulesModal} onClose={() => setShowRulesModal(false)} />

      {/* 6. AADESH / ROYAL FARMAN COMMAND SELECTION MODAL */}
      <AadeshModal
        isOpen={Boolean(pendingAadeshCardId)}
        playerName={activePlayer ? activePlayer.name : 'Imperial Chronicler'}
        onSelectCategory={handleAadeshCategorySelect}
        onCancel={() => setPendingAadeshCardId(null)}
      />
    </div>
  </div>
  );
};
