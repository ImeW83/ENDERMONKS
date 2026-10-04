import { useEffect, useRef, useState } from 'react';
import MicroSlats from './MicroSlats/MicroSlats';

// Background ghost words: each one holds, blurs out, and the next blurs in.
const GHOST_WORDS = ['BUILD', 'CREATE', 'IMAGINE', 'INNOVATE'];
const GHOST_HOLD_MS = 3500; // how long each word stays
const GHOST_FADE_MS = 600;  // length of the fade in / fade out

// Glitch effect for the DIGITAL word: two clipped, offset copies (via data-text) flicker in short bursts.
const glitchCss = `
.glitch{position:relative;display:inline-block;animation:glitchMain 3.6s infinite steps(1)}
.glitch::before,.glitch::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;clip-path:inset(50% 0 50% 0)}
.glitch::before{color:#B180E5;text-shadow:-2px 0 #7353BA;animation:glitchA 3.6s infinite steps(1)}
.glitch::after{color:#FFFFFF;text-shadow:2px 0 #B180E5;animation:glitchB 3.6s infinite steps(1)}
@keyframes glitchMain{0%,84%,100%{transform:none}85%{transform:skewX(-10deg) translateX(-4px)}87%{transform:skewX(6deg) translateX(3px)}89%{transform:none}93%{transform:translateX(-5px)}94%{transform:none}}
@keyframes glitchA{0%,84%,100%{clip-path:inset(50% 0 50% 0);transform:none}85%{clip-path:inset(8% 0 68% 0);transform:translate(-9px,-2px)}87%{clip-path:inset(42% 0 30% 0);transform:translate(7px,1px)}89%{clip-path:inset(72% 0 6% 0);transform:translate(-5px,0)}91%{clip-path:inset(18% 0 58% 0);transform:translate(10px,0)}93%{clip-path:inset(55% 0 22% 0);transform:translate(-7px,2px)}95%{clip-path:inset(50% 0 50% 0);transform:none}}
@keyframes glitchB{0%,84%,100%{clip-path:inset(50% 0 50% 0);transform:none}86%{clip-path:inset(62% 0 14% 0);transform:translate(8px,2px)}88%{clip-path:inset(4% 0 80% 0);transform:translate(-10px,0)}90%{clip-path:inset(36% 0 44% 0);transform:translate(6px,-1px)}92%{clip-path:inset(80% 0 2% 0);transform:translate(-4px,0)}94%{clip-path:inset(50% 0 50% 0);transform:none}}
.ghost-word{display:inline-block;animation:ghostIn ${GHOST_FADE_MS}ms ease-out backwards;transition:opacity ${GHOST_FADE_MS}ms ease-in,filter ${GHOST_FADE_MS}ms ease-in,transform ${GHOST_FADE_MS}ms ease-in}
.ghost-word.is-leaving{opacity:0;filter:blur(14px);transform:translateY(-3%) scale(1.02)}
@keyframes ghostIn{from{opacity:0;filter:blur(14px);transform:translateY(3%) scale(.98)}to{opacity:1;filter:blur(0);transform:none}}
@media (prefers-reduced-motion: reduce){.glitch,.glitch::before,.glitch::after,.ghost-word{animation:none;transition:none}}
`;

export default function Hero() {
  const sectionRef = useRef(null);
  const digitalRef = useRef(null);
  const [ghostIndex, setGhostIndex] = useState(0);
  const [ghostLeaving, setGhostLeaving] = useState(false);

  // Cycle the background word. Skipped entirely for visitors who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let swapTimer;
    const cycle = setInterval(() => {
      setGhostLeaving(true);
      swapTimer = setTimeout(() => {
        setGhostIndex((i) => (i + 1) % GHOST_WORDS.length);
        setGhostLeaving(false);
      }, GHOST_FADE_MS);
    }, GHOST_HOLD_MS + GHOST_FADE_MS);
    return () => {
      clearInterval(cycle);
      clearTimeout(swapTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end px-[3.5%] pt-20 md:pt-24 pb-20 overflow-hidden border-b"
      style={{ background: 'linear-gradient(160deg, #2F195F 0%, #0F1020 62%)', borderColor: '#2F195F' }}
    >
      <style>{glitchCss}</style>

      {/* Micro Slats background (replaces the old .hero-grid).
          It listens for the cursor on window, so pointer-events-none is safe. */}
      <div className="absolute inset-0 pointer-events-none">
        <MicroSlats
          preset="swell"
          color="#1B0E3A"
          glintColor="#FAA6FF"
          backgroundColor="#0F1020"
          slatWidth={10}
          slatHeight={25}
          gap={3}
          interactive
        />
      </div>

      {/* Radial vignette — keeps the headline readable over the slats */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,16,32,0.92), transparent 70%)' }}
      />

      {/* Ghost word — cycles through GHOST_WORDS */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: 'clamp(14rem,28vw,26rem)', color: 'rgba(250,166,255,0.035)', letterSpacing: '-0.02em' }}
      >
        <span key={ghostIndex} className={`ghost-word${ghostLeaving ? ' is-leaving' : ''}`}>
          {GHOST_WORDS[ghostIndex]}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-grey-5 mb-6 before:block before:w-10 before:h-px before:bg-grey-5">
          Est. 2024 · Sri Lanka · Digital Studio
        </p>

        <h1
          className="font-bebas leading-[0.9] text-white mb-12"
          style={{ fontSize: 'clamp(4.5rem,13vw,11.5rem)', letterSpacing: '-0.01em' }}
        >
          Building<br />
          {/* The only place Rubik 80s Fade is used — keep it rare so it stays special */}
          <em
            ref={digitalRef}
            data-text="DIGITAL"
            className="glitch font-fade not-italic uppercase"
            style={{ color: '#FAA6FF', fontSize: '0.92em', lineHeight: 1.2, letterSpacing: '0.01em' }}
          >
            Digital
          </em><br />
          Empires.
        </h1>

        <p className="text-[0.9rem] leading-[1.8] text-grey-5 max-w-sm">
  
        </p>
      </div>
    </section>
  );
}