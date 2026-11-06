import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

// Audio synthesis context and procedural Indian instrument sound synthesizer
class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public play(soundName: string) {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      switch (soundName) {
        case 'cardHover': {
          // Subtle paper rustle: filtered white noise
          const bufferSize = ctx.sampleRate * 0.08;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1800;
          filter.Q.value = 3;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(now);
          break;
        }

        case 'cardPlay': {
          // Card slam on wood: quick low-frequency thump + high click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        }

        case 'cardDraw': {
          // Card slide + shuffle
          const bufferSize = ctx.sampleRate * 0.22;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2400, now);
          filter.frequency.linearRampToValueAtTime(800, now + 0.22);
          filter.Q.value = 4;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(now);
          break;
        }

        case 'cardShuffle': {
          // Rapid riffle shuffle texture
          for (let step = 0; step < 7; step++) {
            const stepTime = now + step * 0.06;
            const bufferSize = ctx.sampleRate * 0.05;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              data[i] = (Math.random() * 2 - 1) * 0.15;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(2200 + step * 150, stepTime);
            filter.Q.value = 3;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.08, stepTime);
            gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.05);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(stepTime);
          }
          break;
        }

        case 'cardDeal': {
          // Sharp card deal snap
          const bufferSize = ctx.sampleRate * 0.12;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(3200, now);
          filter.frequency.linearRampToValueAtTime(1200, now + 0.1);
          filter.Q.value = 3.5;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(now);
          break;
        }

        case 'potIncrease': {
          // Soft coin chime: bright shimmering arpeggios
          const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
          freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + idx * 0.05);

            gain.gain.setValueAtTime(0.12, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.45);
          });
          break;
        }

        case 'rivalSteal': {
          // Orchestral sting + whoosh: dramatic brass impact
          const freqs = [110, 164.8, 220, 329.6];
          freqs.forEach((f) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(f, now);
            osc.frequency.exponentialRampToValueAtTime(f * 0.9, now + 0.7);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now);
            filter.frequency.exponentialRampToValueAtTime(200, now + 0.7);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.8);
          });
          break;
        }

        case 'aadeshCommand':
        case 'mahaKarmaStrike': {
          // Single sharp tabla resonant hit (Bayan + Dayan combo)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(240, now);
          osc1.frequency.exponentialRampToValueAtTime(70, now + 0.35);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(880, now);
          osc2.frequency.exponentialRampToValueAtTime(220, now + 0.15);

          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.45);
          osc2.stop(now + 0.45);
          break;
        }

        case 'mounaSkip': {
          // Temple bell + silence: clear ringing bronze bowl with long harmonics
          const harmonics = [587.33, 1174.66, 1762.0, 2349.32];
          harmonics.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now);

            const initialGain = 0.2 / (idx + 1);
            gain.gain.setValueAtTime(initialGain, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 2.0);
          });
          break;
        }

        case 'chakravyuhaReverse': {
          // Whoosh + reverse sweep
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.25, now + 0.25);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        }

        case 'crisisNullification': {
          // Low-frequency gong + hum
          const gong = ctx.createOscillator();
          const sub = ctx.createOscillator();
          const gain = ctx.createGain();

          gong.type = 'triangle';
          gong.frequency.setValueAtTime(78, now);
          sub.type = 'sine';
          sub.frequency.setValueAtTime(39, now);

          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          gong.connect(gain);
          sub.connect(gain);
          gain.connect(ctx.destination);

          gong.start(now);
          sub.start(now);
          gong.stop(now + 1.3);
          sub.stop(now + 1.3);
          break;
        }

        case 'fluteFlourish': {
          // Indian flute flourish (Bansuri pentatonic phrase: Sa-Ga-Ma-Pa-Dha-Sa)
          const notes = [440, 554.37, 659.25, 830.61, 880];
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);

            gain.gain.setValueAtTime(0, now + idx * 0.1);
            gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.1 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.3);
          });
          break;
        }

        case 'victoryFanfare': {
          // Orchestral victory sting (D major royal brass fanfare)
          const chords = [
            [293.66, 369.99, 440],
            [369.99, 440, 587.33],
            [440, 554.37, 659.25],
            [587.33, 739.99, 880]
          ];
          chords.forEach((chord, step) => {
            const time = now + step * 0.22;
            const duration = step === 3 ? 1.4 : 0.25;
            chord.forEach((freq) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(freq, time);

              gain.gain.setValueAtTime(0.18, time);
              gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(time);
              osc.stop(time + duration + 0.1);
            });
          });
          break;
        }

        case 'tanpuraPluck': {
          // Soft tanpura pluck
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(110, now + 0.6);

          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.75);
          break;
        }

        case 'errorBuzz': {
          // Harsh royal rejection buzz for illegal card move
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sawtooth';
          osc2.type = 'square';
          osc1.frequency.setValueAtTime(130, now);
          osc2.frequency.setValueAtTime(125, now);

          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.35);
          osc2.stop(now + 0.35);
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.warn('Audio synthesis warning:', err);
    }
  }

  public startAmbientLoop() {
    if (this.isAmbientPlaying) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.06, now + 2);
      this.ambientGain.connect(ctx.destination);

      // Classical Indian Sa-Pa drone (Tanpura resonance at 110Hz and 165Hz)
      const freqs = [110, 164.81, 220, 329.63];
      this.ambientOscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        osc.connect(this.ambientGain!);
        osc.start(now);
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch {
      // User hasn't interacted yet
    }
  }

  public stopAmbientLoop() {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.ambientOscs.forEach((osc) => osc.stop());
          this.ambientOscs = [];
          this.isAmbientPlaying = false;
        }, 1100);
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }
}

export const soundEngine = new SoundEngine();

export function useAudio() {
  const soundEnabled = useGameStore((s) => s.settings.soundEnabled);
  const musicEnabled = useGameStore((s) => s.settings.musicEnabled);
  const audioStartedRef = useRef(false);

  const play = (soundName: string) => {
    if (!soundEnabled) return;
    soundEngine.play(soundName);
  };

  useEffect(() => {
    if (musicEnabled && !audioStartedRef.current) {
      const handleUserGesture = () => {
        if (musicEnabled) {
          soundEngine.startAmbientLoop();
          audioStartedRef.current = true;
        }
        window.removeEventListener('click', handleUserGesture);
      };
      window.addEventListener('click', handleUserGesture, { once: true });
    } else if (!musicEnabled && audioStartedRef.current) {
      soundEngine.stopAmbientLoop();
      audioStartedRef.current = false;
    }
  }, [musicEnabled]);

  return { play };
}
