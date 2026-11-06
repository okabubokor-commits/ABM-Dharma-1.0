import React from 'react';
import { CardData, PlayedCard } from '../../engine/types';

interface CardCharacterArtProps {
  card: CardData | PlayedCard;
  compact?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
  isWildDramatic?: boolean;
}

export const CardCharacterArt: React.FC<CardCharacterArtProps> = ({
  card,
  compact = false,
  isSelected = false,
  isHovered = false,
  isWildDramatic = false
}) => {
  const isRival = card.type === 'rival' || card.variant === 'rival';
  const isAadesh = card.type === 'aadesh' || card.variant === 'aadesh' || card.name.toLowerCase().includes('aadesh');
  const isKarma = card.type === 'mahaKarma' || card.variant === 'karma';
  const isMouna = card.type === 'mouna' || card.variant === 'mouna';
  const isChakra = card.type === 'chakravyuha' || card.variant === 'chakra';
  const isCrisis = card.type === 'crisis' || card.variant === 'crisis';

  const cardNameLower = card.name.toLowerCase();
  const rulerNameLower = (card.ruler || card.rulerName || '').toLowerCase();
  const category = card.category;

  // Determine specific Mahabharata character/card archetype
  const getCharacterArchetype = (): string => {
    // 1. Rivals (Wild)
    if (isRival) {
      if (cardNameLower.includes('shakuni') || card.id.startsWith('sp1a') || card.id.startsWith('sp1b')) return 'rival_shakuni';
      if (cardNameLower.includes('ashwatthama') || card.id.startsWith('sp1c') || card.id.startsWith('sp1d')) return 'rival_ashwatthama';
      return 'rival_shakuni';
    }

    // 2. Special Wild Actions
    if (isAadesh) return 'aadesh_krishna';
    if (isMouna) return 'mouna_vrat';
    if (isChakra) return 'chakra_chakravyuha';
    if (isCrisis) {
      if (cardNameLower.includes('kurukshetra') || card.effect === 'force_marvel' || card.id.startsWith('sp5c') || card.id.startsWith('sp5d')) {
        return 'crisis_kurukshetra';
      }
      return 'crisis_lakshagriha';
    }

    // 3. Creators (C) - The 9 Mahabharata Heroes
    if (category === 'C') {
      if (cardNameLower.includes('krishna') || rulerNameLower === 'krishna') return 'creator_krishna';
      if (cardNameLower.includes('yudhishthira') || rulerNameLower === 'yudhishthira') return 'creator_yudhishthira';
      if (cardNameLower.includes('bhima') || rulerNameLower === 'bhima') return 'creator_bhima';
      if (cardNameLower.includes('arjuna') || rulerNameLower === 'arjuna') return 'creator_arjuna';
      if (cardNameLower.includes('karna') || rulerNameLower === 'karna') return 'creator_karna';
      if (cardNameLower.includes('bhishma') || rulerNameLower === 'bhishma') return 'creator_bhishma';
      if (cardNameLower.includes('dronacharya') || rulerNameLower === 'dronacharya') return 'creator_dronacharya';
      if (cardNameLower.includes('duryodhana') || rulerNameLower === 'duryodhana') return 'creator_duryodhana';
      if (cardNameLower.includes('draupadi') || rulerNameLower === 'draupadi') return 'creator_draupadi';
      return 'creator_krishna';
    }

    // 4. Dharma (L / Le) - The 9 Moral Teachings
    if (category === 'L' || category === 'Le') {
      if (cardNameLower.includes('counsel') || rulerNameLower === 'krishna') return 'dharma_krishna';
      if (cardNameLower.includes('rajadharma') || rulerNameLower === 'yudhishthira') return 'dharma_yudhishthira';
      if (cardNameLower.includes("bhima's vow") || cardNameLower.includes('vow — bhima') || rulerNameLower === 'bhima') return 'dharma_bhima';
      if (cardNameLower.includes('duty') || rulerNameLower === 'arjuna') return 'dharma_arjuna';
      if (cardNameLower.includes('charity') || rulerNameLower === 'karna') return 'dharma_karna';
      if (cardNameLower.includes("bhishma's vow") || cardNameLower.includes('vow — bhishma')) return 'dharma_bhishma';
      if (cardNameLower.includes('guru') || cardNameLower.includes('dakshina') || rulerNameLower === 'dronacharya') return 'dharma_dronacharya';
      if (cardNameLower.includes('question') || cardNameLower.includes('sabha') || rulerNameLower === 'draupadi') return 'dharma_draupadi';
      if (cardNameLower.includes('shanti') || cardNameLower.includes('teachings') || rulerNameLower === 'duryodhana') return 'dharma_shanti';
      return 'dharma_yudhishthira';
    }

    // 5. Marvel (M / Ma) - The 9 Divine Weapons & Wonders
    if (category === 'M' || category === 'Ma') {
      if (cardNameLower.includes('gandiva')) return 'marvel_gandiva';
      if (cardNameLower.includes('brahmastra')) return 'marvel_brahmastra';
      if (cardNameLower.includes('sudarshana')) return 'marvel_sudarshana';
      if (cardNameLower.includes('kaumodaki') || cardNameLower.includes('gada')) return 'marvel_kaumodaki';
      if (cardNameLower.includes('pashupatastra')) return 'marvel_pashupatastra';
      if (cardNameLower.includes('akshaya')) return 'marvel_akshaya';
      if (cardNameLower.includes('mayasabha')) return 'marvel_mayasabha';
      if (cardNameLower.includes('virata')) return 'marvel_virata';
      if (cardNameLower.includes('gita')) return 'marvel_gita';
      return 'marvel_sudarshana';
    }

    // 6. Region (R) - The 9 Sacred Epic Lands
    if (category === 'R') {
      if (cardNameLower.includes('hastinapura')) return 'region_hastinapura';
      if (cardNameLower.includes('indraprastha')) return 'region_indraprastha';
      if (cardNameLower.includes('kurukshetra')) return 'region_kurukshetra';
      if (cardNameLower.includes('panchala')) return 'region_panchala';
      if (cardNameLower.includes('matsya')) return 'region_matsya';
      if (cardNameLower.includes('dwaraka')) return 'region_dwaraka';
      if (cardNameLower.includes('gandhara')) return 'region_gandhara';
      if (cardNameLower.includes('magadha')) return 'region_magadha';
      if (cardNameLower.includes('kamyaka')) return 'region_kamyaka';
      return 'region_hastinapura';
    }

    return 'creator_krishna';
  };

  const archetype = getCharacterArchetype();

  // Dynamic animation classes based on hover / selection / wild dramatic states
  const breathClass = isWildDramatic ? 'animate-wild-surge' : isSelected ? 'animate-character-focus' : 'animate-character-breathe';
  const swayClass = isWildDramatic ? 'animate-element-sway-fast' : 'animate-element-sway';
  const auraGlow = isWildDramatic
    ? 'drop-shadow-[0_0_24px_rgba(244,208,63,0.9)] filter brightness-125'
    : isSelected
    ? 'drop-shadow-[0_0_12px_rgba(244,208,63,0.7)]'
    : isHovered
    ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]'
    : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]';

  return (
    <div
      id={`card-art-${card.id}`}
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      {/* 1. LAYER 1: Deep Thematic Sacred Prabhavali Background Vignette */}
      <div className="absolute inset-0 bg-radial-gradient flex items-center justify-center opacity-90">
        <svg
          viewBox="0 0 100 65"
          className="w-full h-full absolute inset-0 preserve-3d"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`bg-grad-${card.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              {isRival ? (
                <>
                  <stop offset="0%" stopColor="#4A0E17" />
                  <stop offset="60%" stopColor="#2A080C" />
                  <stop offset="100%" stopColor="#120305" />
                </>
              ) : isAadesh ? (
                <>
                  <stop offset="0%" stopColor="#3B1452" />
                  <stop offset="60%" stopColor="#200B2E" />
                  <stop offset="100%" stopColor="#0B0310" />
                </>
              ) : isMouna ? (
                <>
                  <stop offset="0%" stopColor="#2C3E50" />
                  <stop offset="60%" stopColor="#1A252F" />
                  <stop offset="100%" stopColor="#0E141A" />
                </>
              ) : isChakra ? (
                <>
                  <stop offset="0%" stopColor="#0E4B40" />
                  <stop offset="60%" stopColor="#082A24" />
                  <stop offset="100%" stopColor="#041411" />
                </>
              ) : category === 'C' ? (
                <>
                  <stop offset="0%" stopColor="#2E2407" />
                  <stop offset="60%" stopColor="#1A1504" />
                  <stop offset="100%" stopColor="#0A0802" />
                </>
              ) : category === 'L' || category === 'Le' ? (
                <>
                  <stop offset="0%" stopColor="#2B1038" />
                  <stop offset="60%" stopColor="#170720" />
                  <stop offset="100%" stopColor="#0A020E" />
                </>
              ) : category === 'M' || category === 'Ma' ? (
                <>
                  <stop offset="0%" stopColor="#0E2F44" />
                  <stop offset="60%" stopColor="#071926" />
                  <stop offset="100%" stopColor="#030C12" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#0D351E" />
                  <stop offset="60%" stopColor="#071E11" />
                  <stop offset="100%" stopColor="#030E08" />
                </>
              )}
            </linearGradient>

            {/* Sacred Prabhavali Sunburst Halo Pattern */}
            <radialGradient id={`sunburst-${card.id}`} cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity={isHovered || isSelected ? '0.4' : '0.2'} />
              <stop offset="65%" stopColor="#F4D03F" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Canvas Background */}
          <rect width="100" height="65" fill={`url(#bg-grad-${card.id})`} />

          {/* Sunburst Flare behind character */}
          <circle cx="50" cy="30" r="38" fill={`url(#sunburst-${card.id})`} className="animate-pulse" />

          {/* Vedic Temple Torana / Sacred Prabhavali Arch */}
          <path
            d="M 14,65 L 14,28 C 14,10 32,5 50,2 C 68,5 86,10 86,28 L 86,65"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeDasharray="3,2"
            opacity="0.35"
          />
          <circle cx="50" cy="2" r="2" fill="#D4AF37" opacity="0.6" />
        </svg>
      </div>

      {/* 2. LAYER 2: Floating Vedic Thematic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isRival || archetype === 'crisis_kurukshetra' || archetype === 'crisis_lakshagriha' ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-red-400 blur-[0.5px] animate-particle-float-1 top-3 left-4" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.5px] animate-particle-float-2 bottom-3 right-6" />
            <div className="absolute w-1 h-1 rounded-full bg-orange-300 animate-particle-float-3 top-7 right-3" />
          </>
        ) : isAadesh ? (
          <>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 blur-[0.5px] animate-particle-float-1 top-2 left-5" />
            <div className="absolute w-1 h-1 rounded-full bg-purple-300 animate-particle-float-2 bottom-4 left-6" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200 animate-particle-float-3 top-6 right-5" />
          </>
        ) : isMouna ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-cyan-200 blur-[0.5px] animate-particle-float-1 top-3 right-6" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300 animate-particle-float-2 bottom-3 left-5" />
          </>
        ) : category === 'C' ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-[#F4D03F] blur-[0.5px] animate-particle-float-1 top-2 left-6" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 blur-[0.5px] animate-particle-float-2 bottom-4 right-5" />
          </>
        ) : category === 'M' ? (
          <>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-sky-300 blur-[0.5px] animate-particle-float-1 top-4 left-5" />
            <div className="absolute w-1 h-1 rounded-full bg-teal-200 animate-particle-float-2 bottom-3 right-6" />
          </>
        ) : (
          <>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/80 blur-[0.5px] animate-particle-float-1 top-3 right-4" />
            <div className="absolute w-1 h-1 rounded-full bg-amber-200/80 animate-particle-float-2 bottom-3 left-6" />
          </>
        )}
      </div>

      {/* 3. LAYER 3: Heroic Mahabharata Visual Archetype */}
      <div className={`relative z-10 w-full h-full flex items-center justify-center ${breathClass} ${auraGlow}`}>
        <svg
          viewBox="0 0 100 65"
          className="w-full h-full preserve-3d"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ========================================================
              ARCHETYPE: KRISHNA (The Supreme Guide & Avatar)
             ======================================================== */}
          {archetype === 'creator_krishna' && (
            <g id="char-krishna">
              {/* Golden Prabhavali Halo */}
              <circle cx="50" cy="27" r="23" fill="#F4D03F" opacity="0.3" className="animate-pulse" />
              <circle cx="50" cy="27" r="19" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,2" fill="none" />

              {/* Pitambara Yellow Silk Robes */}
              <path d="M 30,60 L 36,38 L 64,38 L 70,60 Z" fill="#F4D03F" stroke="#D4AC0D" strokeWidth="1" />
              <path d="M 43,38 L 50,45 L 57,38 L 50,60 Z" fill="#D4AC0D" />
              {/* Divine Pearl & Lotus Garland */}
              <path d="M 41,43 Q 50,52 59,43" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="2,1" fill="none" />

              {/* Shyamavarna (Divine Azure Blue Complexion) */}
              <ellipse cx="50" cy="27" rx="8.5" ry="9.5" fill="#5DADE2" />
              <ellipse cx="46.5" cy="26" rx="1.2" ry="1.6" fill="#1B4F72" />
              <ellipse cx="53.5" cy="26" rx="1.2" ry="1.6" fill="#1B4F72" />
              <path d="M 46,31 Q 50,34 54,31" stroke="#1B4F72" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Tilak of Sandalwood & Kumkum */}
              <path d="M 49,20 L 51,20 L 50,25 Z" fill="#F4D03F" />
              <circle cx="50" cy="23" r="0.7" fill="#E74C3C" />

              {/* Golden Mukuta (Crown) */}
              <path d="M 40,19 C 40,12 60,12 60,19 Z" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.8" />
              <circle cx="50" cy="16" r="2" fill="#E74C3C" />

              {/* Iconic Mayur Pankh (Peacock Feather) with Iridescent Emerald Eye */}
              <g className={swayClass}>
                <path d="M 50,14 Q 57,4 62,3" stroke="#27AE60" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <ellipse cx="62" cy="3" rx="3.5" ry="2.5" fill="#16A085" />
                <circle cx="62" cy="3" r="1.5" fill="#2E86C1" />
                <circle cx="62" cy="3" r="0.8" fill="#F4D03F" />
              </g>

              {/* Divine Golden Flute (Bansuri) */}
              <rect x="36" y="38" width="28" height="2.8" rx="1.4" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.6" transform="rotate(-15 50 39)" />
              <circle cx="42" cy="41" r="0.6" fill="#7D6608" />
              <circle cx="48" cy="39" r="0.6" fill="#7D6608" />
              <circle cx="54" cy="37" r="0.6" fill="#7D6608" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: YUDHISHTHIRA (Dharmaraja Sovereign)
             ======================================================== */}
          {archetype === 'creator_yudhishthira' && (
            <g id="char-yudhishthira">
              {/* Serene Solar Halo */}
              <circle cx="50" cy="27" r="22" fill="#F9E79F" opacity="0.3" />
              <circle cx="50" cy="27" r="18" stroke="#D4AF37" strokeWidth="0.8" fill="none" />

              {/* Royal Pristine White & Imperial Gold Robes */}
              <path d="M 31,60 L 37,38 L 63,38 L 69,60 Z" fill="#FDFEFE" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M 44,38 L 50,45 L 56,38 L 50,60 Z" fill="#D4AF37" />

              {/* Face of Nobility and Calm Wisdom */}
              <ellipse cx="50" cy="27" rx="8.5" ry="9.5" fill="#F5CBA7" />
              <circle cx="47" cy="26" r="1.1" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.1" fill="#1C140D" />
              <path d="M 46,31 Q 50,33 54,31" stroke="#1C140D" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Sacred Urdhva Pundra Tilak */}
              <line x1="49" y1="20" x2="49" y2="25" stroke="#F4D03F" strokeWidth="0.8" />
              <line x1="51" y1="20" x2="51" y2="25" stroke="#F4D03F" strokeWidth="0.8" />
              <circle cx="50" cy="24" r="0.6" fill="#C0392B" />

              {/* Majestic Sovereign Crown with Emerald */}
              <polygon points="40,20 45,12 50,15 55,12 60,20" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.8" />
              <circle cx="50" cy="17" r="1.8" fill="#27AE60" />

              {/* Scepter of Righteous Kingship (Dharmadanda) */}
              <line x1="68" y1="20" x2="64" y2="56" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              <circle cx="68" cy="20" r="3" fill="#F4D03F" stroke="#B7950B" strokeWidth="0.8" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: BHIMA (The Indomitable Titan)
             ======================================================== */}
          {archetype === 'creator_bhima' && (
            <g id="char-bhima">
              {/* Aura of Raw Earth-shaking Power */}
              <circle cx="50" cy="29" r="24" fill="#E67E22" opacity="0.25" />

              {/* Muscular Titan Torso with Heavy Gold Vambraces */}
              <path d="M 28,60 L 34,36 L 66,36 L 72,60 Z" fill="#78281F" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M 42,36 L 50,44 L 58,36 L 50,60 Z" fill="#922B21" />
              {/* Tiger-Claw (Vyaghra-Nakha) Pendant */}
              <path d="M 44,40 Q 50,47 56,40" stroke="#F4D03F" strokeWidth="1.5" fill="none" />
              <polygon points="50,46 48,49 52,49" fill="#FDFEFE" />

              {/* Rugged Fierce Countenance */}
              <ellipse cx="50" cy="26" rx="9" ry="10" fill="#EDBB99" />
              <circle cx="47" cy="25" r="1.2" fill="#1C140D" />
              <circle cx="53" cy="25" r="1.2" fill="#1C140D" />
              {/* Determined Warrior Jaw & Mustache */}
              <path d="M 44,30 Q 50,33 56,30" stroke="#1C140D" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Spiked Gold War Coronet */}
              <polygon points="39,18 44,11 50,14 56,11 61,18" fill="#B7950B" stroke="#D4AF37" strokeWidth="0.8" />
              <circle cx="50" cy="15" r="1.5" fill="#E74C3C" />

              {/* Massive Golden War Mace (Kaumodaki Gada) Resting on Shoulder */}
              <g className={swayClass}>
                <line x1="68" y1="12" x2="62" y2="56" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
                <circle cx="68" cy="12" r="5" fill="#F39C12" stroke="#D4AF37" strokeWidth="1" />
                <circle cx="68" cy="12" r="2.5" fill="#E74C3C" />
              </g>
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: ARJUNA (The Supreme Archer Partha)
             ======================================================== */}
          {archetype === 'creator_arjuna' && (
            <g id="char-arjuna">
              {/* Celestial Solar Radiance */}
              <circle cx="50" cy="27" r="23" fill="#5DADE2" opacity="0.25" />

              {/* Silver & Bronze Warrior Mail with Golden Border */}
              <path d="M 31,60 L 37,38 L 63,38 L 69,60 Z" fill="#2E4053" stroke="#D4AF37" strokeWidth="1" />
              <path d="M 44,38 L 50,45 L 56,38 L 50,60 Z" fill="#34495E" />

              {/* Concentrated Archer Countenance */}
              <ellipse cx="50" cy="27" rx="8.5" ry="9.5" fill="#F5CBA7" />
              <circle cx="47" cy="26" r="1.2" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.2" fill="#1C140D" />
              {/* Focused Eyebrows */}
              <path d="M 44,23 L 48,24" stroke="#1C140D" strokeWidth="1.2" />
              <path d="M 52,24 L 56,23" stroke="#1C140D" strokeWidth="1.2" />

              {/* Golden Battle Helm with Sun Crest */}
              <path d="M 40,19 C 40,11 60,11 60,19 Z" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.8" />
              <circle cx="50" cy="14" r="2" fill="#F4D03F" />

              {/* The Divine Celestial Bow (Gandiva) */}
              <g className={swayClass}>
                <path d="M 28,12 Q 22,34 30,56" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <line x1="28" y1="12" x2="30" y2="56" stroke="#AED6F1" strokeWidth="0.8" strokeDasharray="1,1" />
                {/* Arrow of Celestial Light Ready to Fire */}
                <line x1="24" y1="34" x2="60" y2="34" stroke="#FDFEFE" strokeWidth="1.2" strokeLinecap="round" />
                <polygon points="62,34 58,32 58,36" fill="#F4D03F" />
              </g>

              {/* Golden Quiver with Celestial Astras */}
              <rect x="66" y="24" width="6" height="28" rx="2" fill="#B7950B" stroke="#D4AF37" strokeWidth="0.8" />
              <line x1="68" y1="20" x2="68" y2="24" stroke="#FDFEFE" strokeWidth="1" />
              <line x1="70" y1="18" x2="70" y2="24" stroke="#FDFEFE" strokeWidth="1" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: KARNA (Danaveera Radheya)
             ======================================================== */}
          {archetype === 'creator_karna' && (
            <g id="char-karna">
              {/* Blazing Surya Solar Disc behind Karna */}
              <circle cx="50" cy="27" r="24" fill="#E67E22" opacity="0.35" className="animate-pulse" />
              <circle cx="50" cy="27" r="20" stroke="#F39C12" strokeWidth="1" strokeDasharray="4,2" fill="none" />

              {/* Divine Golden Inborn Armor (Kavacha) */}
              <path d="M 30,60 L 36,38 L 64,38 L 70,60 Z" fill="#D4AC0D" stroke="#F4D03F" strokeWidth="1.5" />
              <polygon points="50,42 43,50 50,58 57,50" fill="#F4D03F" />

              {/* Regal Noble Face */}
              <ellipse cx="50" cy="27" rx="8.5" ry="9.5" fill="#EDBB99" />
              <circle cx="47" cy="26" r="1.2" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.2" fill="#1C140D" />
              <path d="M 46,31 Q 50,33 54,31" stroke="#1C140D" strokeWidth="1.2" fill="none" strokeLinecap="round" />

              {/* Divine Celestial Earrings (Kundala) Radiating Solar Brilliance */}
              <circle cx="40" cy="29" r="2.2" fill="#F4D03F" stroke="#D4AF37" strokeWidth="0.8" className="animate-ping" />
              <circle cx="40" cy="29" r="2" fill="#F4D03F" />
              <circle cx="60" cy="29" r="2.2" fill="#F4D03F" stroke="#D4AF37" strokeWidth="0.8" className="animate-ping" />
              <circle cx="60" cy="29" r="2" fill="#F4D03F" />

              {/* Crown of Anga with Solar Radiance */}
              <polygon points="40,19 45,11 50,15 55,11 60,19" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.8" />
              <circle cx="50" cy="15" r="1.8" fill="#E67E22" />

              {/* Vijaya Bow Held Steadfast */}
              <path d="M 26,14 Q 20,34 26,56" stroke="#F39C12" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: BHISHMA (Gangaputra Pitamaha)
             ======================================================== */}
          {archetype === 'creator_bhishma' && (
            <g id="char-bhishma">
              {/* Ethereal Sacred Ganga Wave Halo */}
              <circle cx="50" cy="27" r="23" fill="#85C1E9" opacity="0.25" />
              <circle cx="50" cy="27" r="19" stroke="#AED6F1" strokeWidth="0.8" strokeDasharray="3,2" fill="none" />

              {/* Pure Silver Warrior Robes & Ganga Armor */}
              <path d="M 31,60 L 37,38 L 63,38 L 69,60 Z" fill="#EAEDED" stroke="#BDC3C7" strokeWidth="1.2" />
              <path d="M 44,38 L 50,45 L 56,38 L 50,60 Z" fill="#BDC3C7" />

              {/* Venerable Patriarch Face */}
              <ellipse cx="50" cy="26" rx="8.5" ry="9" fill="#F5CBA7" />
              <circle cx="47" cy="25" r="1.1" fill="#1C140D" />
              <circle cx="53" cy="25" r="1.1" fill="#1C140D" />

              {/* Sacred Flowing Silver-White Beard and Hair */}
              <path d="M 43,28 C 41,40 59,40 57,28 C 54,34 46,34 43,28 Z" fill="#FDFEFE" stroke="#D5D8DC" strokeWidth="0.8" />
              <path d="M 39,22 C 37,12 63,12 61,22 Z" fill="#FDFEFE" stroke="#D5D8DC" strokeWidth="0.8" />

              {/* Silver Royal Coronet of Hastinapura */}
              <polygon points="41,19 46,13 50,16 54,13 59,19" fill="#D5D8DC" stroke="#BDC3C7" strokeWidth="0.8" />
              <circle cx="50" cy="15" r="1.5" fill="#3498DB" />

              {/* Grand Standard / Spear of the Kuru Patriarch */}
              <line x1="68" y1="10" x2="66" y2="58" stroke="#BDC3C7" strokeWidth="2" strokeLinecap="round" />
              <polygon points="68,10 75,14 68,18" fill="#D4AF37" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: DRONACHARYA (Royal Preceptor of Astras)
             ======================================================== */}
          {archetype === 'creator_dronacharya' && (
            <g id="char-dronacharya">
              {/* Ascetic Fire & Vedic Chanting Halo */}
              <circle cx="50" cy="27" r="22" fill="#F39C12" opacity="0.25" />

              {/* Sacred Saffron & Ochre Acharya Robes */}
              <path d="M 31,60 L 37,38 L 63,38 L 69,60 Z" fill="#D35400" stroke="#E67E22" strokeWidth="1" />
              {/* Yajnopavita (Sacred Thread) & Rudraksha Mala */}
              <line x1="43" y1="38" x2="57" y2="58" stroke="#FDFEFE" strokeWidth="1" strokeDasharray="2,1" />
              <path d="M 43,42 Q 50,49 57,42" stroke="#7E5109" strokeWidth="1.5" strokeDasharray="1.5,1" fill="none" />

              {/* Venerated Ascetic Sage Face */}
              <ellipse cx="50" cy="27" rx="8.5" ry="9" fill="#EDBB99" />
              <circle cx="47" cy="26" r="1.1" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.1" fill="#1C140D" />
              {/* Wise Sage Beard */}
              <path d="M 44,30 C 44,38 56,38 56,30 Z" fill="#BDC3C7" stroke="#95A5A6" strokeWidth="0.8" />

              {/* Yogic Hair Bun (Jata-Mukuta) with Rudraksha Bead */}
              <ellipse cx="50" cy="16" rx="5" ry="4" fill="#5D4037" />
              <circle cx="50" cy="15" r="1.5" fill="#D35400" />

              {/* Master Bow & Quiver of Celestial Astras */}
              <path d="M 28,14 Q 22,34 28,56" stroke="#A04000" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: DURYODHANA (Kaurava Sovereign of Hastinapura)
             ======================================================== */}
          {archetype === 'creator_duryodhana' && (
            <g id="char-duryodhana">
              {/* Crimson & Gold Imperial Aura */}
              <circle cx="50" cy="28" r="23" fill="#922B21" opacity="0.3" />

              {/* Heavy Crimson Silk Robes with Spiked Gold Shoulder Guards */}
              <path d="M 30,60 L 36,38 L 64,38 L 70,60 Z" fill="#641E16" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M 44,38 L 50,45 L 56,38 L 50,60 Z" fill="#922B21" />

              {/* Fierce Royal Countenance */}
              <ellipse cx="50" cy="27" rx="8.5" ry="9.5" fill="#F5CBA7" />
              <circle cx="47" cy="26" r="1.2" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.2" fill="#1C140D" />
              {/* Proud Royal Mustache */}
              <path d="M 44,31 Q 50,34 56,31" stroke="#1C140D" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Imposing Kaurava Crown with Blood-Ruby Gem */}
              <polygon points="39,19 44,11 50,15 56,11 61,19" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.8" />
              <circle cx="50" cy="15" r="2" fill="#C0392B" />

              {/* Spiked Heavy Iron Mace (Gada) */}
              <g className={swayClass}>
                <line x1="68" y1="16" x2="63" y2="56" stroke="#7F8C8D" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="68" cy="16" r="4.5" fill="#2C3E50" stroke="#BDC3C7" strokeWidth="1" />
                <polygon points="68,10 66,16 70,16" fill="#BDC3C7" />
              </g>
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: DRAUPADI (Yajnaseni Fireborn Queen)
             ======================================================== */}
          {archetype === 'creator_draupadi' && (
            <g id="char-draupadi">
              {/* Radiant Sacrificial Flame Aura */}
              <circle cx="50" cy="27" r="23" fill="#E74C3C" opacity="0.3" className="animate-pulse" />
              <circle cx="50" cy="27" r="19" stroke="#F39C12" strokeWidth="0.8" strokeDasharray="3,2" fill="none" />

              {/* Crimson & Gold Royal Saree */}
              <path d="M 32,60 L 38,38 L 62,38 L 68,60 Z" fill="#900C3F" stroke="#F4D03F" strokeWidth="1.2" />
              <path d="M 44,38 L 50,46 L 56,38 L 50,60 Z" fill="#C70039" />
              {/* Ornate Gold Choker & Temple Jewelry */}
              <path d="M 43,41 Q 50,47 57,41" stroke="#F4D03F" strokeWidth="1.5" fill="none" />

              {/* Incandescent Fiery Grace Complexion */}
              <ellipse cx="50" cy="27" rx="8" ry="9" fill="#F5CBA7" />
              <circle cx="47" cy="26" r="1.1" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.1" fill="#1C140D" />
              <path d="M 47,31 Q 50,33 53,31" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Red Kumkum Bindi */}
              <circle cx="50" cy="22" r="1" fill="#C0392B" />

              {/* Flowing Dark Tresses & Queenly Lotus Crown */}
              <path d="M 38,22 C 34,34 36,44 38,50" stroke="#17202A" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 62,22 C 66,34 64,44 62,50" stroke="#17202A" strokeWidth="3" fill="none" strokeLinecap="round" />
              <polygon points="41,19 45,13 50,16 55,13 59,19" fill="#D4AF37" stroke="#F4D03F" strokeWidth="0.8" />
              <circle cx="50" cy="15" r="1.5" fill="#E74C3C" />

              {/* Glowing Lotus of Dignity */}
              <circle cx="50" cy="52" r="3.5" fill="#E91E63" opacity="0.8" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: DHARMA CARDS (Category L)
             ======================================================== */}
          {archetype.startsWith('dharma_') && (
            <g id="art-dharma">
              {/* Radiant Dharmachakra Solar Disc */}
              <circle cx="50" cy="31" r="23" fill="#8E44AD" opacity="0.25" className="animate-pulse" />
              <circle cx="50" cy="31" r="20" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,2" fill="none" />

              {/* Sacred Dharmachakra (Wheel of Cosmic Law) with 24 Spokes */}
              <circle cx="50" cy="31" r="15" stroke="#F4D03F" strokeWidth="1.5" fill="none" />
              <circle cx="50" cy="31" r="4" fill="#D4AF37" />
              <line x1="50" y1="16" x2="50" y2="46" stroke="#F4D03F" strokeWidth="1" />
              <line x1="35" y1="31" x2="65" y2="31" stroke="#F4D03F" strokeWidth="1" />
              <line x1="39" y1="20" x2="61" y2="42" stroke="#F4D03F" strokeWidth="0.8" />
              <line x1="61" y1="20" x2="39" y2="42" stroke="#F4D03F" strokeWidth="0.8" />

              {/* Sacred Scales of Justice & Scroll of Truth */}
              <line x1="36" y1="48" x2="64" y2="48" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
              <polygon points="50,44 47,48 53,48" fill="#F4D03F" />
              <path d="M 40,54 Q 50,57 60,54" stroke="#FDFEFE" strokeWidth="1.2" fill="none" strokeLinecap="round" />

              {/* Sacred Lotus Pedestal */}
              <path d="M 38,58 Q 50,54 62,58" stroke="#AF7AC5" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - GANDIVA BOW
             ======================================================== */}
          {archetype === 'marvel_gandiva' && (
            <g id="marvel-gandiva">
              <circle cx="50" cy="31" r="24" fill="#2980B9" opacity="0.25" />
              {/* Celestial Arc of the Gandiva Bow */}
              <path d="M 24,10 Q 14,32 24,54" stroke="#F4D03F" strokeWidth="3" fill="none" strokeLinecap="round" />
              <line x1="24" y1="10" x2="24" y2="54" stroke="#AED6F1" strokeWidth="1" strokeDasharray="2,2" />
              {/* Blazing Arrow of Cosmic Energy */}
              <line x1="20" y1="32" x2="72" y2="32" stroke="#FDFEFE" strokeWidth="2" strokeLinecap="round" />
              <polygon points="78,32 70,28 70,36" fill="#F4D03F" />
              <circle cx="78" cy="32" r="2" fill="#E74C3C" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - BRAHMASTRA
             ======================================================== */}
          {archetype === 'marvel_brahmastra' && (
            <g id="marvel-brahmastra">
              <circle cx="50" cy="31" r="25" fill="#C0392B" opacity="0.3" className="animate-pulse" />
              {/* Four Heads of Cosmic Fire Radiating */}
              <circle cx="50" cy="31" r="8" fill="#F39C12" />
              <circle cx="50" cy="31" r="4" fill="#FDFEFE" />
              <polygon points="50,12 46,25 54,25" fill="#E74C3C" />
              <polygon points="50,50 46,37 54,37" fill="#E74C3C" />
              <polygon points="31,31 44,27 44,35" fill="#E74C3C" />
              <polygon points="69,31 56,27 56,35" fill="#E74C3C" />
              <circle cx="50" cy="31" r="16" stroke="#F4D03F" strokeWidth="1" strokeDasharray="3,3" fill="none" className="animate-spin-slow" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - SUDARSHANA CHAKRA
             ======================================================== */}
          {archetype === 'marvel_sudarshana' && (
            <g id="marvel-sudarshana">
              <circle cx="50" cy="31" r="25" fill="#F39C12" opacity="0.3" className="animate-pulse" />
              <g className="animate-spin-slow origin-center">
                <circle cx="50" cy="31" r="18" stroke="#F4D03F" strokeWidth="2" strokeDasharray="4,2" fill="none" />
                <circle cx="50" cy="31" r="12" stroke="#E67E22" strokeWidth="1.5" strokeDasharray="3,2" fill="none" />
                <circle cx="50" cy="31" r="6" fill="#FDFEFE" />
                {/* 8 Serrated Solar Spikes */}
                <line x1="50" y1="10" x2="50" y2="52" stroke="#F4D03F" strokeWidth="1.5" />
                <line x1="29" y1="31" x2="71" y2="31" stroke="#F4D03F" strokeWidth="1.5" />
                <line x1="35" y1="16" x2="65" y2="46" stroke="#F4D03F" strokeWidth="1.5" />
                <line x1="65" y1="16" x2="35" y2="46" stroke="#F4D03F" strokeWidth="1.5" />
              </g>
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - KAUMODAKI GADA
             ======================================================== */}
          {archetype === 'marvel_kaumodaki' && (
            <g id="marvel-kaumodaki">
              <circle cx="50" cy="31" r="23" fill="#D35400" opacity="0.25" />
              {/* Massive Celestial War Mace */}
              <line x1="28" y1="48" x2="68" y2="16" stroke="#B7950B" strokeWidth="4" strokeLinecap="round" />
              <circle cx="68" cy="16" r="8" fill="#F4D03F" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="68" cy="16" r="4" fill="#E74C3C" />
              <polygon points="68,6 64,14 72,14" fill="#D4AF37" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - PASHUPATASTRA
             ======================================================== */}
          {archetype === 'marvel_pashupatastra' && (
            <g id="marvel-pashupatastra">
              <circle cx="50" cy="31" r="24" fill="#1B4F72" opacity="0.3" className="animate-pulse" />
              {/* Celestial Trishula Trident of Shiva */}
              <line x1="50" y1="16" x2="50" y2="54" stroke="#AED6F1" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 40,24 Q 50,32 60,24" stroke="#AED6F1" strokeWidth="2" fill="none" strokeLinecap="round" />
              <polygon points="50,12 46,20 54,20" fill="#FDFEFE" />
              <polygon points="38,20 35,26 42,26" fill="#FDFEFE" />
              <polygon points="62,20 58,26 65,26" fill="#FDFEFE" />
              <circle cx="50" cy="14" r="1.5" fill="#3498DB" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - AKSHAYA PATRA
             ======================================================== */}
          {archetype === 'marvel_akshaya' && (
            <g id="marvel-akshaya">
              <circle cx="50" cy="31" r="23" fill="#D4AF37" opacity="0.25" />
              {/* Inexhaustible Solar Copper-Gold Vessel */}
              <ellipse cx="50" cy="36" rx="16" ry="7" fill="#E67E22" stroke="#F39C12" strokeWidth="1.5" />
              <path d="M 34,36 C 34,50 66,50 66,36 Z" fill="#D35400" stroke="#F39C12" strokeWidth="1.5" />
              {/* Amrita / Divine Grains Overflowing */}
              <ellipse cx="50" cy="34" rx="13" ry="5" fill="#F4D03F" />
              <circle cx="46" cy="32" r="1.5" fill="#FDFEFE" />
              <circle cx="52" cy="31" r="1.5" fill="#FDFEFE" />
              <circle cx="50" cy="24" r="2.5" fill="#F4D03F" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL - MAYASABHA / VIRATA COURT / GITA
             ======================================================== */}
          {(archetype === 'marvel_mayasabha' || archetype === 'marvel_virata' || archetype === 'marvel_gita') && (
            <g id="marvel-architecture">
              <circle cx="50" cy="31" r="23" fill="#2471A3" opacity="0.25" />
              {/* Celestial Dome & Crystal Palace Columns */}
              <path d="M 32,54 L 32,32 Q 50,18 68,32 L 68,54 Z" fill="#1A5276" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="38" y1="36" x2="38" y2="54" stroke="#F4D03F" strokeWidth="1" />
              <line x1="62" y1="36" x2="62" y2="54" stroke="#F4D03F" strokeWidth="1" />
              <path d="M 44,54 L 44,42 Q 50,38 56,42 L 56,54 Z" fill="#F4D03F" />
              <circle cx="50" cy="22" r="3" fill="#F4D03F" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: REGION CARDS (Category R)
             ======================================================== */}
          {archetype.startsWith('region_') && (
            <g id="art-region">
              <circle cx="50" cy="31" r="23" fill="#196F3D" opacity="0.25" />
              {/* Ancient Fortress Battlements & Flowing Sacred River */}
              <path d="M 20,54 L 20,38 L 28,38 L 28,42 L 36,42 L 36,38 L 44,38 L 44,42 L 56,42 L 56,38 L 64,38 L 64,42 L 72,42 L 72,38 L 80,38 L 80,54 Z" fill="#145A32" stroke="#D4AF37" strokeWidth="1" />
              {/* Grand Archway */}
              <path d="M 44,54 L 44,42 Q 50,37 56,42 L 56,54 Z" fill="#0E3A21" stroke="#D4AF37" strokeWidth="1" />
              {/* Mountain Peaks / Ramparts */}
              <polygon points="32,38 40,24 48,38" fill="#196F3D" stroke="#52BE80" strokeWidth="0.8" />
              <polygon points="52,38 60,24 68,38" fill="#196F3D" stroke="#52BE80" strokeWidth="0.8" />
              <circle cx="50" cy="18" r="3" fill="#F4D03F" className="animate-pulse" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: RIVAL - SHAKUNI (Dyuta / Loaded Dice)
             ======================================================== */}
          {archetype === 'rival_shakuni' && (
            <g id="char-shakuni">
              <circle cx="50" cy="30" r="24" fill="#641E16" opacity="0.4" />
              {/* Cunning Mantle & Courtly Robes */}
              <path d="M 32,58 L 38,38 L 62,38 L 68,58 Z" fill="#212F3D" stroke="#C0392B" strokeWidth="1" />
              <ellipse cx="50" cy="27" rx="8" ry="9" fill="#EDBB99" />
              <circle cx="47" cy="26" r="1.1" fill="#1C140D" />
              <circle cx="53" cy="26" r="1.1" fill="#1C140D" />
              <path d="M 46,31 Q 51,33 55,29" stroke="#922B21" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Turban of Gandhara */}
              <path d="M 40,19 C 40,12 60,12 60,19 Z" fill="#78281F" stroke="#D4AF37" strokeWidth="0.8" />

              {/* The Enchanted Loaded Dice of Fate (Dyuta) */}
              <g className={swayClass}>
                <rect x="34" y="40" width="10" height="10" rx="2" fill="#FDFEFE" stroke="#C0392B" strokeWidth="1" transform="rotate(15 39 45)" />
                <circle cx="39" cy="45" r="1.2" fill="#C0392B" />
                <rect x="56" y="40" width="10" height="10" rx="2" fill="#FDFEFE" stroke="#C0392B" strokeWidth="1" transform="rotate(-15 61 45)" />
                <circle cx="59" cy="43" r="1" fill="#C0392B" />
                <circle cx="63" cy="47" r="1" fill="#C0392B" />
              </g>
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: RIVAL - ASHWATTHAMA (Wrath & Divine Gem)
             ======================================================== */}
          {archetype === 'rival_ashwatthama' && (
            <g id="char-ashwatthama">
              <circle cx="50" cy="30" r="24" fill="#7B241C" opacity="0.4" />
              {/* Fierce Vengeful Warrior Robes */}
              <path d="M 31,58 L 37,38 L 63,38 L 69,58 Z" fill="#1C2833" stroke="#E74C3C" strokeWidth="1.2" />
              <ellipse cx="50" cy="27" rx="8.5" ry="9.5" fill="#EDBB99" />
              <circle cx="47" cy="26" r="1.2" fill="#E74C3C" />
              <circle cx="53" cy="26" r="1.2" fill="#E74C3C" />

              {/* The Immortal Forehead Gem (Shiromani) Blazing */}
              <polygon points="50,18 47,21 50,24 53,21" fill="#00E5FF" stroke="#FDFEFE" strokeWidth="0.6" className="animate-pulse" />
              <circle cx="50" cy="21" r="2" fill="#00E5FF" className="animate-ping" />

              {/* Flaming Brahmashira Astra */}
              <line x1="68" y1="14" x2="62" y2="54" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="68,14 65,22 71,22" fill="#F39C12" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: AADESH - KRISHNA'S AADESH
             ======================================================== */}
          {archetype === 'aadesh_krishna' && (
            <g id="char-aadesh">
              <circle cx="50" cy="31" r="24" fill="#8E44AD" opacity="0.35" className="animate-pulse" />
              {/* Cosmic Divine Mandate Scroll */}
              <rect x="30" y="16" width="40" height="32" rx="4" fill="#FDFEFE" stroke="#8E44AD" strokeWidth="1.5" />
              <line x1="36" y1="24" x2="64" y2="24" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="36" y1="30" x2="64" y2="30" stroke="#8E44AD" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="36" y1="36" x2="64" y2="36" stroke="#8E44AD" strokeWidth="1" strokeDasharray="3,2" />
              {/* Golden Sudarshana Seal */}
              <circle cx="50" cy="32" r="6" fill="#F4D03F" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="50" cy="32" r="2" fill="#E74C3C" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MOUNA - MAUNA VRAT
             ======================================================== */}
          {archetype === 'mouna_vrat' && (
            <g id="char-mouna">
              <circle cx="50" cy="30" r="24" fill="#34495E" opacity="0.35" />
              <circle cx="50" cy="30" r="20" stroke="#BDC3C7" strokeWidth="1" strokeDasharray="3,3" fill="none" className="animate-spin-slow" />
              {/* Meditating Yogic Sage Silhouette */}
              <path d="M 36,56 L 42,38 L 58,38 L 64,56 Z" fill="#1C2833" stroke="#7F8C8D" strokeWidth="1" />
              <ellipse cx="50" cy="27" rx="7.5" ry="8.5" fill="#D5D8DC" />
              {/* Finger Raised in Sacred Silence */}
              <rect x="48.5" y="26" width="3" height="11" fill="#BDC3C7" rx="1.5" />
              {/* Third Eye Glow */}
              <ellipse cx="50" cy="23" rx="1" ry="1.5" fill="#85C1E9" className="animate-pulse" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: CHAKRAVYUHA (7-Tier Circular Labyrinth)
             ======================================================== */}
          {archetype === 'chakra_chakravyuha' && (
            <g id="char-chakra">
              <g className="animate-spin-slow origin-center">
                <circle cx="50" cy="31" r="25" stroke="#16A085" strokeWidth="1.2" strokeDasharray="4,2" fill="none" opacity="0.7" />
                <circle cx="50" cy="31" r="19" stroke="#48C9B0" strokeWidth="1" strokeDasharray="3,2" fill="none" opacity="0.8" />
                <circle cx="50" cy="31" r="13" stroke="#A3E4D7" strokeWidth="0.8" strokeDasharray="2,2" fill="none" opacity="0.9" />
                <circle cx="50" cy="31" r="7" stroke="#F4D03F" strokeWidth="0.8" fill="none" />
              </g>
              <circle cx="50" cy="31" r="3" fill="#E74C3C" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: CRISIS - LAKSHAGRIHA (House of Lac in Flames)
             ======================================================== */}
          {archetype === 'crisis_lakshagriha' && (
            <g id="crisis-lakshagriha">
              <circle cx="50" cy="30" r="25" fill="#641E16" opacity="0.5" />
              {/* Burning Lacquer Palace */}
              <polygon points="50,14 30,36 70,36" fill="#1C2833" stroke="#E74C3C" strokeWidth="1" />
              <rect x="35" y="36" width="30" height="20" fill="#2C3E50" stroke="#E74C3C" strokeWidth="1" />
              {/* Wild Leaping Flames */}
              <path d="M 38,36 Q 42,20 46,34 Q 50,16 54,34 Q 58,20 62,36 Z" fill="#E74C3C" opacity="0.9" className="animate-pulse" />
              <path d="M 44,36 Q 50,22 56,36 Z" fill="#F39C12" />
              <circle cx="50" cy="20" r="2" fill="#F4D03F" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: CRISIS - KURUKSHETRA (The Great War)
             ======================================================== */}
          {archetype === 'crisis_kurukshetra' && (
            <g id="crisis-kurukshetra">
              <circle cx="50" cy="30" r="25" fill="#78281F" opacity="0.5" />
              {/* Blood-Red War Horizon & Clashing Weapons */}
              <line x1="26" y1="18" x2="74" y2="48" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="74" y1="18" x2="26" y2="48" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" />
              {/* War Chariot Wheel */}
              <circle cx="50" cy="33" r="14" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="animate-spin-slow" />
              <circle cx="50" cy="33" r="3" fill="#E74C3C" />
              <circle cx="50" cy="33" r="1.5" fill="#F4D03F" className="animate-ping" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
