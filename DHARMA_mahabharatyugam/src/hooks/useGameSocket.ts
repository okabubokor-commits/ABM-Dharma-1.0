import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/gameStore';
import { useAudio } from './useAudio';
import { GameStateSnapshot } from '../../engine/types';
import { isWildCard } from '../../engine/validator';

export function useGameSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { play } = useAudio();
  const {
    syncSnapshot,
    setSession,
    showToast,
    setSelectedCard,
    setSelectedTargetNode,
    triggerWildCardEffect,
    myPlayerId,
    roomId
  } = useGameStore();

  useEffect(() => {
    // Initialize client socket connection to origin
    const socket = io({
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to Dharma Court gateway:', socket.id);
    });

    socket.on('room:created', ({ roomId, playerId, state }) => {
      setSession(roomId, playerId);
      syncSnapshot(state, playerId);
    });

    socket.on('room:joined', ({ roomId, playerId, state }) => {
      setSession(roomId, playerId);
      syncSnapshot(state, playerId);
      showToast(`Welcome to the Court assembly! Room: ${roomId}`);
    });

    socket.on('game:started', (state: GameStateSnapshot) => {
      syncSnapshot(state);
      play('fluteFlourish');
      showToast('⚔ The Yuga has begun! Round 1 is in progress.');
    });

    socket.on('game:sync', (state: GameStateSnapshot) => {
      syncSnapshot(state);
    });

    socket.on('game:cardPlayed', ({ result, state }: { result: any; state: GameStateSnapshot }) => {
      syncSnapshot(state);
      setSelectedCard(null);
      setSelectedTargetNode(null);

      // Trigger wild card cinematic effect if played card is wild
      if (result.card && isWildCard(result.card)) {
        triggerWildCardEffect(result.card);
      }

      // Play matching audio
      if (result.effectApplied === 'steal_pot') {
        play('rivalSteal');
        showToast('⚡ RIVAL STEAL! The Imperial Pot has been plundered!');
      } else if (result.effectApplied === 'steal_last_card') {
        play('mahaKarmaStrike');
        showToast('🕉 Maha-Karma strike! Cosmic balance restored.');
      } else if (result.effectApplied === 'skip_next') {
        play('mounaSkip');
        showToast('🤫 Mouna (Silence)! Next chronicler is skipped.');
      } else if (result.effectApplied === 'reverse_order') {
        play('chakravyuhaReverse');
        showToast('🌀 Chakravyuha! Turn order inverted.');
      } else if (result.effectApplied?.startsWith('nullify')) {
        play('crisisNullification');
        showToast('💥 Crisis struck! Card points nullified.');
      } else {
        play('cardPlay');
        play('potIncrease');
      }

      if (state.gameStatus === 'ended') {
        play('victoryFanfare');
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    });

    socket.on('game:cardDrawn', ({ state }: { state: GameStateSnapshot }) => {
      syncSnapshot(state);
      play('cardDraw');
    });

    socket.on('game:playError', ({ message }: { message: string }) => {
      showToast(`Invalid Move: ${message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createRoom = (
    rId: string,
    rounds: number,
    playerName: string,
    p2Name?: string,
    againstAI?: boolean
  ) => {
    if (!socketRef.current) return;
    socketRef.current.emit('room:create', {
      roomId: rId,
      maxRounds: rounds,
      playerName,
      p2Name,
      againstAI
    });
  };

  const joinRoom = (rId: string, playerName: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('room:join', { roomId: rId, playerName });
  };

  const startGame = (rId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('room:start', { roomId: rId });
  };

  const playCard = (cardId: string, targetNodeId: string) => {
    if (!socketRef.current || !roomId) return;
    socketRef.current.emit('game:playCard', {
      roomId,
      cardId,
      targetNodeId
    });
  };

  const drawCard = () => {
    if (!socketRef.current || !roomId) return;
    socketRef.current.emit('game:drawCard', { roomId });
  };

  const handleTimeout = () => {
    if (!socketRef.current || !roomId) return;
    socketRef.current.emit('game:timeout', { roomId });
  };

  return {
    createRoom,
    joinRoom,
    startGame,
    playCard,
    drawCard,
    handleTimeout
  };
}
