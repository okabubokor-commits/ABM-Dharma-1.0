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

  // Determine specific character archetype
  const getCharacterArchetype = (): string => {
    // 1. Rivals (Wild)
    if (isRival) {
      if (cardNameLower.includes('shivaji')) return 'shivaji';
      if (cardNameLower.includes('pratap')) return 'maharana_pratap';
      return 'shivaji';
    }

    // 2. Special Wild Actions
    if (isAadesh) return 'aadesh_vizier';
    if (isMouna) return 'mouna_mystic';
    if (isChakra) return 'chakravyuha_strategist';
    if (isKarma) return 'karma_dharma';
    if (isCrisis) {
      if (cardNameLower.includes('nadir')) return 'crisis_nadir';
      return 'crisis_famine';
    }

    // 3. Court / Emperors (C)
    if (category === 'C' || rulerNameLower.includes('babur') || cardNameLower.includes('babur')) {
      if (cardNameLower.includes('babur') || rulerNameLower === 'babur') return 'emperor_babur';
      if (cardNameLower.includes('humayun') || rulerNameLower === 'humayun') return 'emperor_humayun';
      if (cardNameLower.includes('akbar') || rulerNameLower === 'akbar') return 'emperor_akbar';
      if (cardNameLower.includes('jahangir') || rulerNameLower === 'jahangir') return 'emperor_jahangir';
      if (cardNameLower.includes('shah jahan') || rulerNameLower === 'shah_jahan') return 'emperor_shah_jahan';
      if (cardNameLower.includes('aurangzeb') || rulerNameLower === 'aurangzeb') return 'emperor_aurangzeb';
      if (cardNameLower.includes('bahadur shah i') || rulerNameLower === 'bahadur_shah_i') return 'emperor_bahadur_i';
      if (cardNameLower.includes('muhammad shah') || rulerNameLower === 'muhammad_shah') return 'emperor_rangila';
      if (cardNameLower.includes('zafar') || rulerNameLower === 'bahadur_shah_zafar') return 'emperor_zafar';
      return 'emperor_akbar';
    }

    // 4. Legislature / Laws / Military reforms (Le / L)
    if (category === 'Le' || category === 'L') {
      if (cardNameLower.includes('artillery') || cardNameLower.includes('cannon') || cardNameLower.includes('matchlock')) {
        return 'law_cannoneer';
      }
      if (cardNameLower.includes('mansab') || cardNameLower.includes('army') || cardNameLower.includes('cavalry')) {
        return 'law_commander';
      }
      if (cardNameLower.includes('sulh') || cardNameLower.includes('din-i') || cardNameLower.includes('tolerance')) {
        return 'law_justice_scales';
      }
      return 'law_minister';
    }

    // 5. Marvel / Architecture / Wonders (Ma / M)
    if (category === 'Ma' || category === 'M') {
      if (cardNameLower.includes('peacock') || cardNameLower.includes('throne') || cardNameLower.includes('koh-i-noor')) {
        return 'marvel_peacock';
      }
      if (cardNameLower.includes('taj') || cardNameLower.includes('tomb') || cardNameLower.includes('shalimar')) {
        return 'marvel_celestial_seraph';
      }
      return 'marvel_fortress_guardian';
    }

    // 6. Region / Lands / Territorials (R)
    if (category === 'R') {
      if (cardNameLower.includes('bengal') || cardNameLower.includes('coast')) {
        return 'region_bengal_tiger';
      }
      if (cardNameLower.includes('kashmir') || cardNameLower.includes('kabul')) {
        return 'region_snow_hawk';
      }
      if (cardNameLower.includes('deccan') || cardNameLower.includes('khandesh')) {
        return 'region_war_elephant';
      }
      return 'region_desert_stallion';
    }

    return 'emperor_akbar';
  };

  const archetype = getCharacterArchetype();

  // Dynamic animation classes based on hover / selection / wild dramatic states
  const breathClass = isWildDramatic ? 'animate-wild-surge' : isSelected ? 'animate-character-focus' : 'animate-character-breathe';
  const swayClass = isWildDramatic ? 'animate-element-sway-fast' : 'animate-element-sway';
  const auraGlow = isWildDramatic
    ? 'drop-shadow-[0_0_24px_rgba(0,229,255,0.9)] filter brightness-125'
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
      {/* 1. LAYER 1: Deep Thematic Architectural Arch & Background Vignette */}
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
              ) : category === 'Le' || category === 'L' ? (
                <>
                  <stop offset="0%" stopColor="#2B1038" />
                  <stop offset="60%" stopColor="#170720" />
                  <stop offset="100%" stopColor="#0A020E" />
                </>
              ) : category === 'Ma' || category === 'M' ? (
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

            {/* Radiant Sunburst Pattern */}
            <radialGradient id={`sunburst-${card.id}`} cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity={isHovered || isSelected ? '0.35' : '0.18'} />
              <stop offset="65%" stopColor="#F4D03F" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Canvas Background */}
          <rect width="100" height="65" fill={`url(#bg-grad-${card.id})`} />

          {/* Sunburst Flare behind character */}
          <circle cx="50" cy="30" r="38" fill={`url(#sunburst-${card.id})`} className="animate-pulse" />

          {/* Mughal Pointed Arch Frame in Background */}
          <path
            d="M 12,65 L 12,28 C 12,12 32,8 50,2 C 68,8 88,12 88,28 L 88,65"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.75"
            strokeDasharray="2,2"
            opacity="0.3"
          />
          <path
            d="M 16,65 L 16,30 C 16,16 34,12 50,6 C 66,12 84,16 84,30 L 84,65"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* 2. LAYER 2: Floating Thematic Particles (Embers, Lotus petals, Stardust, Leaves) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isRival || archetype === 'crisis_nadir' ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-red-400 blur-[0.5px] animate-particle-float-1 top-3 left-4" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.5px] animate-particle-float-2 bottom-3 right-6" />
            <div className="absolute w-1 h-1 rounded-full bg-orange-300 animate-particle-float-3 top-7 right-3" />
          </>
        ) : isAadesh || isKarma ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-purple-300 blur-[0.5px] animate-particle-float-1 top-2 left-5" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 animate-particle-float-2 bottom-4 left-6" />
            <div className="absolute w-1 h-1 rounded-full bg-fuchsia-400 blur-[0.5px] animate-particle-float-3 top-6 right-5" />
          </>
        ) : isMouna ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-cyan-200 blur-[0.5px] animate-particle-float-1 top-3 right-6" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300 animate-particle-float-2 bottom-3 left-5" />
          </>
        ) : category === 'C' ? (
          <>
            <div className="absolute w-1 h-1 rounded-full bg-[#F4D03F] blur-[0.5px] animate-particle-float-1 top-2 left-6" />
            <div className="absolute w-1 h-1 rounded-full bg-amber-200 blur-[0.5px] animate-particle-float-2 bottom-4 right-5" />
          </>
        ) : category === 'Ma' || category === 'M' ? (
          <>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-sky-300 blur-[0.5px] animate-particle-float-1 top-4 left-5" />
            <div className="absolute w-1 h-1 rounded-full bg-teal-200 animate-particle-float-2 bottom-3 right-6" />
          </>
        ) : (
          <>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/80 blur-[0.5px] animate-particle-float-1 top-3 right-4" />
            <div className="absolute w-1 h-1 rounded-full bg-lime-200/80 animate-particle-float-2 bottom-3 left-6" />
          </>
        )}
      </div>

      {/* 3. LAYER 3: Hero Character SVG Illustration with Multi-layer Depth & Living Animation */}
      <div className={`relative z-10 w-full h-full flex items-center justify-center ${breathClass} ${auraGlow}`}>
        <svg
          viewBox="0 0 100 68"
          className="w-full h-full max-h-[74px] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ========================================================
              ARCHETYPE: SHIVAJI (Legendary Maratha Lion King)
             ======================================================== */}
          {archetype === 'shivaji' && (
            <g id="char-shivaji" transform="translate(0, 0)">
              {/* Fiery Solar Crimson Aura */}
              <circle cx="50" cy="32" r="26" fill="url(#shivaji-aura)" opacity={isWildDramatic ? '0.9' : '0.45'} />
              <defs>
                <radialGradient id="shivaji-aura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E74C3C" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#C0392B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Steel Armor & Shoulders */}
              <path d="M 32,58 L 38,44 L 50,47 L 62,44 L 68,58 L 50,66 Z" fill="#2C3E50" stroke="#BDC3C7" strokeWidth="1" />
              <path d="M 42,47 L 50,49 L 58,47 L 50,62 Z" fill="#C0392B" />

              {/* Royal Golden Chainmail Collar */}
              <path d="M 44,43 Q 50,47 56,43" stroke="#D4AF37" strokeWidth="1.5" fill="none" />

              {/* Warrior Neck & Face */}
              <rect x="46" y="36" width="8" height="9" fill="#D39E70" rx="2" />
              <ellipse cx="50" cy="30" rx="9" ry="10" fill="#E0AA7C" />

              {/* Fierce Eyes & Imperial Mustache */}
              <circle cx="47" cy="29" r="1.2" fill="#1C140D" />
              <circle cx="53" cy="29" r="1.2" fill="#1C140D" />
              {/* Eye spark / battle focus */}
              <circle cx="47.3" cy="28.7" r="0.4" fill="#FF4D4D" className={isWildDramatic ? 'animate-ping' : ''} />
              <circle cx="53.3" cy="28.7" r="0.4" fill="#FF4D4D" className={isWildDramatic ? 'animate-ping' : ''} />

              {/* Royal Pointed Maratha Mustache */}
              <path d="M 44,34 Q 50,37 56,34 Q 50,33 44,34" fill="#1C140D" />
              {/* Royal Tilak on Forehead */}
              <path d="M 49,24 L 51,24 L 50,27 Z" fill="#C0392B" />
              <circle cx="50" cy="24" r="0.6" fill="#F4D03F" />

              {/* Saffron Pagri (Turban) with Royal Jio-feather Plume */}
              <path d="M 40,24 C 40,16 60,16 60,24 C 62,26 38,26 40,24 Z" fill="#E67E22" stroke="#D35400" strokeWidth="0.8" />
              <path d="M 43,21 Q 50,17 57,21" fill="#F39C12" />
              {/* Jewel Sarpech Ornament */}
              <ellipse cx="50" cy="21" rx="1.8" ry="2.4" fill="#D4AF37" />
              <circle cx="50" cy="21" r="0.8" fill="#E74C3C" />

              {/* Plume Swaying */}
              <path d="M 50,19 Q 53,10 58,8" stroke="#FDFEFE" strokeWidth="1.2" strokeLinecap="round" fill="none" className={swayClass} />

              {/* Bhavani Talwar (Legendary Sword with Sparks) */}
              <g className={isWildDramatic ? 'animate-sword-slash' : ''}>
                <line x1="68" y1="20" x2="60" y2="48" stroke="#ECF0F1" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="68" y1="20" x2="60" y2="48" stroke="#00E5FF" strokeWidth="0.8" opacity="0.8" />
                {/* Golden Hilt & Pommel */}
                <rect x="58" y="44" width="7" height="2.5" fill="#D4AF37" rx="1" transform="rotate(-15 61 45)" />
                <circle cx="59" cy="49" r="1.5" fill="#D4AF37" />
                {/* Electric Sparks around blade */}
                <circle cx="67" cy="22" r="1" fill="#F4D03F" className="animate-ping" />
              </g>

              {/* Maratha Tiger Claws (Bagh Nakh) on Left Gauntlet */}
              <path d="M 33,48 Q 30,44 32,41" stroke="#BDC3C7" strokeWidth="1.2" fill="none" />
              <path d="M 35,47 Q 33,43 35,40" stroke="#BDC3C7" strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MAHARANA PRATAP (Rajput Sun King of Mewar)
             ======================================================== */}
          {archetype === 'maharana_pratap' && (
            <g id="char-pratap" transform="translate(0, 0)">
              {/* Solar Radiance Disc behind him */}
              <circle cx="50" cy="30" r="25" fill="#E67E22" opacity="0.3" className="animate-pulse" />
              <circle cx="50" cy="30" r="20" fill="#F39C12" opacity="0.25" />

              {/* Body in Gold-Plated Armor */}
              <path d="M 32,58 L 38,42 L 62,42 L 68,58 Z" fill="#B7950B" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="50" cy="50" r="4.5" fill="#D4AF37" stroke="#7D6608" strokeWidth="0.8" />

              {/* Neck & Resolute Face */}
              <rect x="46" y="34" width="8" height="9" fill="#CA8A53" rx="2" />
              <ellipse cx="50" cy="28" rx="8.5" ry="9.5" fill="#DC9960" />

              {/* Gaze & Royal Rajput Beard */}
              <circle cx="47" cy="27" r="1.2" fill="#17120E" />
              <circle cx="53" cy="27" r="1.2" fill="#17120E" />
              <path d="M 43,32 Q 50,38 57,32" stroke="#17120E" strokeWidth="2.2" fill="none" strokeLinecap="round" />

              {/* Rajput Turban with Golden Sun Crest */}
              <path d="M 40,21 Q 50,15 60,21 L 61,24 L 39,24 Z" fill="#C0392B" />
              <circle cx="50" cy="18" r="3.5" fill="#F4D03F" stroke="#B7950B" strokeWidth="0.8" />
              <line x1="50" y1="13" x2="50" y2="8" stroke="#F4D03F" strokeWidth="1" className={swayClass} />

              {/* Haldighati Legendary Spear */}
              <g className={isWildDramatic ? 'animate-spear-thrust' : ''}>
                <line x1="28" y1="8" x2="38" y2="58" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                {/* Flaming Spearhead */}
                <polygon points="28,8 24,14 30,13" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="0.5" />
                <polygon points="28,8 24,14 30,13" fill="#F39C12" opacity="0.6" className="animate-pulse" />
                <circle cx="28" cy="8" r="1.5" fill="#FFF" className="animate-ping" />
              </g>

              {/* Mewar Royal Sun Medallion */}
              <circle cx="50" cy="50" r="2" fill="#E74C3C" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: AADESH (Grand Vizier / Imperial Decree Scribe)
             ======================================================== */}
          {archetype === 'aadesh_vizier' && (
            <g id="char-aadesh" transform="translate(0, 0)">
              {/* Mystic Purple Rune Halo */}
              <circle cx="50" cy="32" r="26" fill="#8E44AD" opacity="0.3" className="animate-pulse" />

              {/* Robes of Imperial Purple & Gold Brocade */}
              <path d="M 30,58 L 36,38 L 64,38 L 70,58 Z" fill="#4A235A" stroke="#8E44AD" strokeWidth="1" />
              <path d="M 44,38 L 50,42 L 56,38 L 50,58 Z" fill="#D4AF37" opacity="0.8" />

              {/* Face & Scholarly Beard */}
              <ellipse cx="50" cy="27" rx="8" ry="9" fill="#E0AE82" />
              <circle cx="47" cy="26" r="1" fill="#2C3E50" />
              <circle cx="53" cy="26" r="1" fill="#2C3E50" />
              <path d="M 45,31 Q 50,38 55,31" fill="#F4F6F7" />

              {/* Grand Vizier High Turban */}
              <path d="M 41,20 C 41,12 59,12 59,20 Z" fill="#6C3483" stroke="#D4AF37" strokeWidth="0.8" />
              <ellipse cx="50" cy="18" rx="2" ry="2.5" fill="#9B59B6" />
              <circle cx="50" cy="18" r="1" fill="#F4D03F" />

              {/* Glowing Imperial Farman (Scroll of Command) */}
              <g className={isWildDramatic ? 'animate-scroll-unfurl' : ''}>
                <rect x="32" y="44" width="36" height="18" fill="#F9E79F" rx="2" stroke="#D4AF37" strokeWidth="1" />
                {/* Golden Wax Seal on Scroll */}
                <circle cx="50" cy="53" r="3.5" fill="#C0392B" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="50" cy="53" r="1.5" fill="#F4D03F" />
                {/* Arcane Calligraphy Lines */}
                <line x1="36" y1="48" x2="64" y2="48" stroke="#7D6608" strokeWidth="0.8" strokeDasharray="2,1" />
                <line x1="36" y1="58" x2="64" y2="58" stroke="#7D6608" strokeWidth="0.8" strokeDasharray="3,1" />
              </g>

              {/* Arcane Stardust Floating from Scroll */}
              <circle cx="34" cy="42" r="1" fill="#D4AF37" className="animate-ping" />
              <circle cx="66" cy="42" r="1" fill="#AF7AC5" className="animate-pulse" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MOUNA (Mystic Enchanter of Silence)
             ======================================================== */}
          {archetype === 'mouna_mystic' && (
            <g id="char-mouna" transform="translate(0, 0)">
              {/* Ethereal Silver Silence Ring */}
              <circle cx="50" cy="30" r="24" fill="#34495E" opacity="0.35" />
              <circle cx="50" cy="30" r="22" stroke="#BDC3C7" strokeWidth="0.8" strokeDasharray="3,3" fill="none" className="animate-spin-slow" />

              {/* Cloak & Cowl of Midnight Mist */}
              <path d="M 28,60 L 36,36 L 64,36 L 72,60 Z" fill="#1C2833" stroke="#5D6D7E" strokeWidth="1" />

              {/* Hooded Cowl Shadow */}
              <path d="M 38,20 C 38,10 62,10 62,20 C 64,32 36,32 38,20 Z" fill="#2C3E50" stroke="#7F8C8D" strokeWidth="0.8" />
              <ellipse cx="50" cy="27" rx="6.5" ry="7" fill="#17202A" />

              {/* Luminous Mystic Eyes shining from deep cowl */}
              <ellipse cx="47" cy="25" rx="1.2" ry="1.6" fill="#85C1E9" className="animate-pulse" />
              <ellipse cx="53" cy="25" rx="1.2" ry="1.6" fill="#85C1E9" className="animate-pulse" />

              {/* Finger Raised in Universal Symbol of Silence (Shhh) */}
              <rect x="48.5" y="27" width="3" height="10" fill="#BDC3C7" rx="1.5" />

              {/* Ethereal Ice / Mist Wisps */}
              <path d="M 30,50 Q 50,44 70,50" stroke="#AED6F1" strokeWidth="1" strokeDasharray="2,2" fill="none" opacity="0.7" className={swayClass} />
              <circle cx="50" cy="42" r="2.5" fill="#5DADE2" opacity="0.8" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: CHAKRAVYUHA (Cosmic Wheel Strategist)
             ======================================================== */}
          {archetype === 'chakravyuha_strategist' && (
            <g id="char-chakra" transform="translate(0, 0)">
              {/* Concentric Rotating 7-Tier Sacred Labyrinth Wheels */}
              <g className="animate-spin-slow origin-center">
                <circle cx="50" cy="32" r="26" stroke="#16A085" strokeWidth="1" strokeDasharray="4,2" fill="none" opacity="0.6" />
                <circle cx="50" cy="32" r="20" stroke="#48C9B0" strokeWidth="0.8" strokeDasharray="3,2" fill="none" opacity="0.7" />
                <circle cx="50" cy="32" r="14" stroke="#A3E4D7" strokeWidth="0.6" strokeDasharray="2,2" fill="none" opacity="0.8" />
              </g>

              {/* Cosmic Tactician Figure */}
              <path d="M 34,58 L 40,40 L 60,40 L 66,58 Z" fill="#0E4B40" stroke="#1ABC9C" strokeWidth="1" />
              <ellipse cx="50" cy="30" rx="7.5" ry="8.5" fill="#D5D8DC" />
              <circle cx="47" cy="29" r="1" fill="#117A65" />
              <circle cx="53" cy="29" r="1" fill="#117A65" />

              {/* Third Eye / Ajna Chakra on Forehead */}
              <ellipse cx="50" cy="25" rx="1" ry="1.5" fill="#1ABC9C" className="animate-pulse" />

              {/* Sacred Tactician Crown */}
              <polygon points="42,22 50,14 58,22" fill="#16A085" stroke="#F4D03F" strokeWidth="0.8" />

              {/* Glowing Lotus Core */}
              <circle cx="50" cy="46" r="4.5" fill="#1ABC9C" opacity="0.85" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: CRISIS (Famine / Nadir Shah Warlord)
             ======================================================== */}
          {(archetype === 'crisis_famine' || archetype === 'crisis_nadir') && (
            <g id="char-crisis" transform="translate(0, 0)">
              {/* Ominous Blood Moon / Void Eclipse */}
              <circle cx="50" cy="30" r="25" fill="#641E16" opacity="0.5" />
              <circle cx="50" cy="30" r="22" fill="#1A0507" />

              {/* Dark Conqueror / Wraith Armor */}
              <path d="M 30,60 L 37,38 L 63,38 L 70,60 Z" fill="#212F3D" stroke="#922B21" strokeWidth="1" />

              {/* Piercing Crimson Eyes */}
              <ellipse cx="50" cy="28" rx="8" ry="9" fill="#1C2833" />
              <ellipse cx="46" cy="27" rx="1.5" ry="1" fill="#E74C3C" className="animate-pulse" />
              <ellipse cx="54" cy="27" rx="1.5" ry="1" fill="#E74C3C" className="animate-pulse" />

              {/* Astrakhan Fur Hat or Spiked Iron Helmet */}
              <rect x="40" y="17" width="20" height="7" fill="#17202A" rx="2" stroke="#78281F" strokeWidth="0.8" />
              <polygon points="50,10 47,17 53,17" fill="#BDC3C7" />

              {/* Dripping Flaming Blade */}
              <line x1="68" y1="18" x2="62" y2="52" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
              <line x1="68" y1="18" x2="62" y2="52" stroke="#F39C12" strokeWidth="1" />
              <circle cx="68" cy="18" r="1.5" fill="#F4D03F" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: EMPEROR BABUR (Conqueror in Emerald Chainmail)
             ======================================================== */}
          {archetype === 'emperor_babur' && (
            <g id="char-babur" transform="translate(0, 0)">
              <circle cx="50" cy="30" r="24" fill="#B7950B" opacity="0.25" />
              {/* Armor */}
              <path d="M 32,58 L 38,40 L 62,40 L 68,58 Z" fill="#145A32" stroke="#D4AF37" strokeWidth="1" />
              <path d="M 44,40 L 50,45 L 56,40 L 50,58 Z" fill="#1E8449" />
              {/* Face */}
              <rect x="46" y="34" width="8" height="9" fill="#D4AC0D" opacity="0.3" />
              <ellipse cx="50" cy="28" rx="8" ry="9" fill="#E59866" />
              <circle cx="47" cy="27" r="1.1" fill="#1C140D" />
              <circle cx="53" cy="27" r="1.1" fill="#1C140D" />
              <path d="M 44,32 Q 50,36 56,32" stroke="#1C140D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Fur-trimmed Central Asian Turban */}
              <path d="M 39,21 C 39,14 61,14 61,21 Z" fill="#7D6608" stroke="#D4AF37" strokeWidth="0.8" />
              <rect x="38" y="20" width="24" height="4" fill="#6E2C00" rx="2" />
              {/* Curved Saber */}
              <path d="M 66,22 Q 62,38 60,52" stroke="#F2F3F4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: EMPEROR AKBAR (The Sovereign of Din-i-Ilahi)
             ======================================================== */}
          {archetype === 'emperor_akbar' && (
            <g id="char-akbar" transform="translate(0, 0)">
              {/* Radiant Prabhavali Solar Halo */}
              <circle cx="50" cy="28" r="23" fill="#F4D03F" opacity="0.3" className="animate-pulse" />
              <circle cx="50" cy="28" r="19" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,2" fill="none" />

              {/* Imperial Court Robes */}
              <path d="M 30,60 L 36,38 L 64,38 L 70,60 Z" fill="#7D6608" stroke="#D4AF37" strokeWidth="1" />
              <path d="M 42,38 L 50,44 L 58,38 L 50,60 Z" fill="#B7950B" />
              {/* Imperial Pearl Necklace */}
              <path d="M 43,44 Q 50,50 57,44" stroke="#FDFEFE" strokeWidth="1.2" strokeDasharray="1.5,1" fill="none" />

              {/* Face & Imperial Mustache */}
              <ellipse cx="50" cy="28" rx="8.5" ry="9.5" fill="#EDBB99" />
              <circle cx="47" cy="27" r="1.2" fill="#1C140D" />
              <circle cx="53" cy="27" r="1.2" fill="#1C140D" />
              <path d="M 44,32 Q 50,36 56,32" stroke="#1C140D" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Royal Jewel-Encrusted Turban with Egret Plume */}
              <path d="M 40,21 C 40,13 60,13 60,21 Z" fill="#1E8449" stroke="#D4AF37" strokeWidth="0.8" />
              <circle cx="50" cy="19" r="2" fill="#E74C3C" stroke="#D4AF37" strokeWidth="0.8" />
              <path d="M 50,17 Q 53,8 57,6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" className={swayClass} />

              {/* Royal Golden Falcon / Scepter */}
              <line x1="66" y1="28" x2="62" y2="52" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="66" cy="27" r="2.5" fill="#F4D03F" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: EMPEROR SHAH JAHAN (Master Architect Emperor)
             ======================================================== */}
          {archetype === 'emperor_shah_jahan' && (
            <g id="char-shahjahan" transform="translate(0, 0)">
              {/* Marble Dome Backdrop Silhouette */}
              <path d="M 40,30 C 40,16 60,16 60,30 Z" fill="#ECF0F1" opacity="0.2" />
              {/* Robes */}
              <path d="M 32,60 L 38,40 L 62,40 L 68,60 Z" fill="#1B4F72" stroke="#D4AF37" strokeWidth="1" />
              {/* Face & Trimmed Beard */}
              <ellipse cx="50" cy="28" rx="8" ry="9" fill="#E59866" />
              <circle cx="47" cy="27" r="1.1" fill="#1B2631" />
              <circle cx="53" cy="27" r="1.1" fill="#1B2631" />
              <path d="M 44,32 Q 50,38 56,32" stroke="#1B2631" strokeWidth="1.6" fill="none" />
              {/* White Silk Turban with Sapphire Jewel */}
              <path d="M 40,21 C 40,14 60,14 60,21 Z" fill="#FDFEFE" stroke="#D4AF37" strokeWidth="0.8" />
              <ellipse cx="50" cy="19" rx="2" ry="2.5" fill="#2980B9" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Architect Compass / Jewel */}
              <polygon points="34,42 38,36 40,44" fill="#D4AF37" />
              <circle cx="50" cy="46" r="3" fill="#2980B9" stroke="#D4AF37" strokeWidth="0.8" className="animate-pulse" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: EMPEROR HUMAYUN, JAHANGIR, AURANGZEB, ETC.
             ======================================================== */}
          {(archetype === 'emperor_humayun' ||
            archetype === 'emperor_jahangir' ||
            archetype === 'emperor_aurangzeb' ||
            archetype === 'emperor_bahadur_i' ||
            archetype === 'emperor_rangila' ||
            archetype === 'emperor_zafar') && (
            <g id="char-emperor-general" transform="translate(0, 0)">
              <circle cx="50" cy="28" r="22" fill="#D4AF37" opacity="0.25" />
              <path d="M 32,60 L 38,40 L 62,40 L 68,60 Z" fill="#2C3E50" stroke="#D4AF37" strokeWidth="1" />
              <ellipse cx="50" cy="28" rx="8" ry="9" fill="#E59866" />
              <circle cx="47" cy="27" r="1" fill="#1C140D" />
              <circle cx="53" cy="27" r="1" fill="#1C140D" />
              <path d="M 44,32 Q 50,36 56,32" stroke="#1C140D" strokeWidth="1.8" fill="none" />
              {/* Imperial Turban */}
              <path d="M 40,21 C 40,14 60,14 60,21 Z" fill="#9A7D0A" stroke="#F4D03F" strokeWidth="0.8" />
              <circle cx="50" cy="19" r="2" fill="#D4AF37" />
              <circle cx="50" cy="48" r="3" fill="#E74C3C" stroke="#D4AF37" strokeWidth="0.8" className="animate-pulse" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: LAW / LEGISLATURE CANNONEER (Mir Atish)
             ======================================================== */}
          {archetype === 'law_cannoneer' && (
            <g id="char-cannoneer" transform="translate(0, 0)">
              <ellipse cx="50" cy="34" r="24" fill="#6E2C00" opacity="0.3" />
              {/* Dragon Brass Cannon Barrel */}
              <path d="M 28,48 L 68,36 L 72,44 L 32,56 Z" fill="#B7950B" stroke="#7D6608" strokeWidth="1" />
              {/* Cannon Wheel */}
              <circle cx="40" cy="52" r="9" fill="#4A235A" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="40" cy="52" r="3" fill="#D4AF37" />
              {/* Cannoneer with Glowing Match Cord */}
              <ellipse cx="64" cy="26" rx="6" ry="7" fill="#EDBB99" />
              <rect x="58" y="19" width="12" height="4" fill="#C0392B" rx="1" />
              <circle cx="72" cy="34" r="1.5" fill="#E67E22" className="animate-ping" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: LAW / MANSABDAR COMMANDER & JUSTICE
             ======================================================== */}
          {(archetype === 'law_commander' || archetype === 'law_justice_scales' || archetype === 'law_minister') && (
            <g id="char-lawgiver" transform="translate(0, 0)">
              <circle cx="50" cy="30" r="22" fill="#8E44AD" opacity="0.25" />
              {/* Balanced Golden Scales of Justice */}
              <line x1="50" y1="18" x2="50" y2="46" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="30" y1="24" x2="70" y2="24" stroke="#D4AF37" strokeWidth="1.5" />
              {/* Left Scale */}
              <line x1="32" y1="24" x2="28" y2="36" stroke="#F4D03F" strokeWidth="0.8" />
              <line x1="32" y1="24" x2="36" y2="36" stroke="#F4D03F" strokeWidth="0.8" />
              <path d="M 26,36 Q 32,40 38,36 Z" fill="#B7950B" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Right Scale */}
              <line x1="68" y1="24" x2="64" y2="36" stroke="#F4D03F" strokeWidth="0.8" />
              <line x1="68" y1="24" x2="72" y2="36" stroke="#F4D03F" strokeWidth="0.8" />
              <path d="M 62,36 Q 68,40 74,36 Z" fill="#B7950B" stroke="#D4AF37" strokeWidth="0.8" />
              {/* Grand Qazi Figure in Back */}
              <ellipse cx="50" cy="26" rx="7" ry="8" fill="#EDBB99" opacity="0.9" />
              <path d="M 42,20 C 42,13 58,13 58,20 Z" fill="#5B2C6F" stroke="#D4AF37" strokeWidth="0.8" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL PEACOCK SPIRIT (Mayura)
             ======================================================== */}
          {archetype === 'marvel_peacock' && (
            <g id="char-peacock" transform="translate(0, 0)">
              {/* Radiant Peacock Feathers Fan */}
              <g className="animate-pulse">
                <ellipse cx="36" cy="22" rx="4" ry="10" fill="#16A085" transform="rotate(-35 36 22)" />
                <ellipse cx="44" cy="18" rx="4" ry="10" fill="#1ABC9C" transform="rotate(-15 44 18)" />
                <ellipse cx="50" cy="16" rx="4" ry="11" fill="#2980B9" />
                <ellipse cx="56" cy="18" rx="4" ry="10" fill="#1ABC9C" transform="rotate(15 56 18)" />
                <ellipse cx="64" cy="22" rx="4" ry="10" fill="#16A085" transform="rotate(35 64 22)" />
                {/* Golden Peacock Eyes */}
                <circle cx="36" cy="18" r="1.5" fill="#F4D03F" />
                <circle cx="50" cy="12" r="1.5" fill="#F4D03F" />
                <circle cx="64" cy="18" r="1.5" fill="#F4D03F" />
              </g>
              {/* Majestic Peacock Body */}
              <path d="M 46,38 Q 48,26 50,22 Q 52,26 54,38 Z" fill="#1B4F72" stroke="#D4AF37" strokeWidth="0.8" />
              <circle cx="50" cy="20" r="3.5" fill="#1F618D" />
              {/* Royal Crest Feathers */}
              <line x1="50" y1="17" x2="50" y2="13" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="50" cy="12" r="1" fill="#58D68D" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: MARVEL CELESTIAL SERAPH & FORTRESS GUARDIAN
             ======================================================== */}
          {(archetype === 'marvel_celestial_seraph' || archetype === 'marvel_fortress_guardian') && (
            <g id="char-seraph" transform="translate(0, 0)">
              {/* Shimmering Palace Dome Silhouette */}
              <path d="M 35,36 C 35,18 65,18 65,36 Z" fill="#ECF0F1" opacity="0.4" />
              <line x1="50" y1="18" x2="50" y2="12" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="50" cy="11" r="1.5" fill="#F4D03F" />
              {/* Celestial Wings */}
              <path d="M 30,36 Q 16,22 28,16 Q 36,24 38,36" fill="#A9DFBF" opacity="0.7" className={swayClass} />
              <path d="M 70,36 Q 84,22 72,16 Q 64,24 62,36" fill="#A9DFBF" opacity="0.7" className={swayClass} />
              {/* Guardian Avatar */}
              <ellipse cx="50" cy="30" rx="7" ry="8" fill="#FDFEFE" />
              <circle cx="50" cy="24" r="3" fill="#F4D03F" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: REGION BENGAL TIGER
             ======================================================== */}
          {archetype === 'region_bengal_tiger' && (
            <g id="char-tiger" transform="translate(0, 0)">
              <circle cx="50" cy="30" r="22" fill="#196F3D" opacity="0.3" />
              {/* Tiger Head & Face */}
              <ellipse cx="50" cy="32" rx="14" ry="12" fill="#E67E22" stroke="#BA4A00" strokeWidth="1" />
              <circle cx="40" cy="22" r="3.5" fill="#BA4A00" />
              <circle cx="60" cy="22" r="3.5" fill="#BA4A00" />
              {/* White Fur Patches */}
              <ellipse cx="45" cy="33" rx="4" ry="3.5" fill="#FBFCFC" />
              <ellipse cx="55" cy="33" rx="4" ry="3.5" fill="#FBFCFC" />
              {/* Piercing Jade Eyes */}
              <ellipse cx="45" cy="32" rx="1.5" ry="1.2" fill="#2ECC71" className="animate-pulse" />
              <ellipse cx="55" cy="32" rx="1.5" ry="1.2" fill="#2ECC71" className="animate-pulse" />
              {/* Black Stripes */}
              <path d="M 50,22 L 50,26" stroke="#17202A" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 42,26 L 46,28" stroke="#17202A" strokeWidth="1.5" />
              <path d="M 58,26 L 54,28" stroke="#17202A" strokeWidth="1.5" />
              {/* Nose & Whiskers */}
              <polygon points="50,35 48,38 52,38" fill="#E74C3C" />
              <line x1="42" y1="37" x2="34" y2="36" stroke="#FFFFFF" strokeWidth="0.8" />
              <line x1="58" y1="37" x2="66" y2="36" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>
          )}

          {/* ========================================================
              ARCHETYPE: REGION WAR ELEPHANT & HAWK & STALLION
             ======================================================== */}
          {archetype === 'region_war_elephant' && (
            <g id="char-elephant" transform="translate(0, 0)">
              <circle cx="50" cy="32" r="22" fill="#145A32" opacity="0.3" />
              {/* Elephant Head & Large Ears */}
              <ellipse cx="34" cy="30" rx="6" ry="10" fill="#5D6D7E" className={swayClass} />
              <ellipse cx="66" cy="30" rx="6" ry="10" fill="#5D6D7E" className={swayClass} />
              <ellipse cx="50" cy="32" rx="13" ry="14" fill="#7F8C8D" />
              {/* Trunk */}
              <path d="M 50,38 Q 48,50 54,54" stroke="#5D6D7E" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Golden Tusks */}
              <path d="M 44,40 Q 38,44 36,40" stroke="#FDFEFE" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 56,40 Q 62,44 64,40" stroke="#FDFEFE" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Golden Head Armor (Jhool) */}
              <path d="M 42,22 L 58,22 L 50,32 Z" fill="#D4AF37" stroke="#B7950B" strokeWidth="0.8" />
              <circle cx="50" cy="26" r="1.5" fill="#C0392B" />
            </g>
          )}

          {(archetype === 'region_snow_hawk' || archetype === 'region_desert_stallion') && (
            <g id="char-stallion" transform="translate(0, 0)">
              <circle cx="50" cy="30" r="22" fill="#1E8449" opacity="0.25" />
              {/* Proud Royal Steed Mane */}
              <path d="M 38,48 L 44,24 L 56,22 L 62,48 Z" fill="#FDFEFE" stroke="#BDC3C7" strokeWidth="1" />
              <polygon points="44,20 48,12 50,20" fill="#FDFEFE" />
              <ellipse cx="56" cy="30" rx="6" ry="10" fill="#F2F3F4" transform="rotate(25 56 30)" />
              {/* Golden Bridle */}
              <path d="M 50,26 L 60,34" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="50" cy="26" r="1.2" fill="#E74C3C" />
              {/* Eye */}
              <circle cx="52" cy="25" r="1.2" fill="#17202A" />
            </g>
          )}
        </svg>
      </div>

      {/* 4. LAYER 4: Dynamic Lighting Flare across character on hover/selection */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none transition-opacity duration-300 ${
          isHovered || isSelected ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
