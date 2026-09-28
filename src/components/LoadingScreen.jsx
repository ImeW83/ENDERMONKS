import { useEffect, useRef, useState } from 'react';

/**
 * EnderMonks loading screen.
 *
 * The animated logo (eyes glance centre → left → right → centre and blink), a thin segmented
 * progress bar with the percentage underneath, then a glitch transition that reveals the site.
 *
 * Usage: wrap the part of the site that should appear after loading:
 *
 *   <LoadingScreen>
 *     <App />
 *   </LoadingScreen>
 *
 * Props
 *   children     What gets revealed. It mounts as the glitch starts, so the hero's own intro
 *                animation (e.g. the Micro Slats sweep) plays at the moment of reveal.
 *   progress     Optional real progress, 0–100. Leave it out and the loader runs a simulated
 *                progress curve (quick start, two short stalls, then finish).
 *   duration     Length of the simulated run in seconds (default 4.5). Ignored when `progress` is given.
 *   segments     Number of blocks in the bar (default 30).
 *   onComplete   Called once the transition has finished and the loader is gone.
 *
 * Visitors who prefer reduced motion get a still logo, a quick fill and a plain fade instead of the glitch.
 */

const HOLD_MS = 280; // pause on 100% before the glitch
const GLITCH_MS = 880; // length of the glitch transition

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
.eml-root{position:fixed;inset:0;z-index:9999;pointer-events:none}
.eml-screen{position:absolute;inset:0;background:#141416;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;font-family:'Bebas Neue',sans-serif;color:#fff;pointer-events:auto}
.eml-logo{width:35px;height:48px;display:block;overflow:visible}
.eml-look{animation:emlLook 4s cubic-bezier(.65,0,.35,1) infinite}
.eml-blink{transform-box:fill-box;transform-origin:center;animation:emlBlink 3.3s ease-in-out infinite}
@keyframes emlLook{0%,14%{transform:translateX(0)}26%,42%{transform:translateX(-260px)}56%,72%{transform:translateX(260px)}86%,100%{transform:translateX(0)}}
@keyframes emlBlink{0%,88%,100%{transform:scaleY(1)}92%{transform:scaleY(.06)}}
.eml-bar-wrap{display:flex;flex-direction:column;align-items:stretch;gap:12px;width:min(420px,78vw)}
.eml-bar{display:flex;gap:3px;height:8px}
.eml-seg{flex:1 1 0;background:rgba(255,255,255,.14);transition:background .12s ease}
.eml-seg.is-on{background:#fff}
.eml-pct{align-self:center;font-size:20px;letter-spacing:.06em;line-height:1;font-variant-numeric:tabular-nums}

.eml-glitch{animation:emlOut ${GLITCH_MS}ms steps(1,end) forwards}
@keyframes emlOut{
0%{clip-path:inset(0 0 0 0);transform:none;filter:none;opacity:1}
8%{clip-path:inset(14% 0 58% 0);transform:translate(-22px,0)}
16%{clip-path:inset(52% 0 10% 0);transform:translate(26px,0);filter:hue-rotate(90deg) saturate(3)}
24%{clip-path:inset(0 0 0 0);transform:translate(-10px,0) skewX(-8deg);filter:none}
32%{clip-path:inset(34% 0 38% 0);transform:translate(18px,0)}
42%{clip-path:inset(0 0 0 0);transform:none}
52%{clip-path:inset(62% 0 22% 0);transform:translate(-36px,0);filter:invert(1)}
62%{clip-path:inset(8% 0 80% 0);transform:translate(44px,0);filter:none;opacity:.85}
74%{clip-path:inset(44% 0 44% 0);transform:translate(-60px,0) scaleX(1.4);opacity:.6}
86%{clip-path:inset(49% 0 49% 0);transform:scaleX(2);opacity:.35}
100%{clip-path:inset(50% 0 50% 0);opacity:0}}

.eml-bars{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:0}
.eml-bars.is-on{animation:emlBars ${GLITCH_MS}ms steps(1,end) forwards}
@keyframes emlBars{
0%{opacity:0}
6%{opacity:1;background:linear-gradient(transparent 18%,rgba(250,166,255,.55) 18% 23%,transparent 23% 61%,rgba(115,83,186,.6) 61% 64%,transparent 64%)}
18%{opacity:1;background:linear-gradient(transparent 40%,rgba(177,128,229,.55) 40% 47%,transparent 47% 82%,rgba(250,166,255,.5) 82% 84%,transparent 84%)}
30%{opacity:0}
48%{opacity:1;background:linear-gradient(transparent 8%,rgba(250,166,255,.6) 8% 11%,transparent 11% 70%,rgba(115,83,186,.55) 70% 78%,transparent 78%)}
60%{opacity:1;background:linear-gradient(transparent 55%,rgba(255,255,255,.35) 55% 56%,transparent 56%)}
72%,100%{opacity:0}}

.eml-reveal{animation:emlIn .9s steps(1,end) both}
@keyframes emlIn{
0%{transform:translate(14px,0);filter:hue-rotate(60deg) saturate(2.5) brightness(1.3)}
14%{transform:translate(-12px,0);filter:none;clip-path:inset(0 0 40% 0)}
26%{transform:none;clip-path:inset(0 0 0 0)}
40%{transform:translate(8px,0);clip-path:inset(30% 0 50% 0)}
50%{transform:none;clip-path:inset(0 0 0 0);filter:hue-rotate(-40deg)}
62%{filter:none;transform:translate(-4px,0)}
70%,100%{transform:none;filter:none;clip-path:none}}

@media (prefers-reduced-motion: reduce){
.eml-look,.eml-blink{animation:none}
.eml-glitch{animation:emlFade .3s linear forwards}
.eml-bars.is-on,.eml-reveal{animation:none}}
@keyframes emlFade{to{opacity:0}}
`;

// Uneven, realistic-feeling progress: quick start, short stalls, then finish.
const STOPS = [[0, 0], [0.18, 22], [0.3, 28], [0.5, 57], [0.62, 61], [0.85, 92], [1, 100]];
function simulated(t) {
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      const [t0, v0] = STOPS[i - 1];
      const [t1, v1] = STOPS[i];
      const k = (t - t0) / (t1 - t0);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      return v0 + (v1 - v0) * e;
    }
  }
  return 100;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Logo() {
  return (
    <svg className="eml-logo" viewBox="0 0 2231 3070" aria-hidden="true">
      <g fill="#fff">
        <polygon points="0,0 983,592 983,1342 0,1342" />
        <polygon points="1248,592 2231,0 2231,1342 1248,1342" />
        <polygon points="0,1596 983,1596 983,3070 0,2466" />
        <polygon points="1248,1596 2231,1596 2231,2466 1248,3070" />
      </g>
      {/* Eyes */}
      <g className="eml-look" fill="#fff">
        <rect className="eml-blink" x="414" y="1342" width="174" height="254" />
        <rect className="eml-blink" x="1607" y="1342" width="174" height="254" />
      </g>
    </svg>
  );
}

export default function LoadingScreen({ children, progress, duration = 4.5, segments = 30, onComplete }) {
  const [shown, setShown] = useState(0); // percentage currently displayed
  const shownRef = useRef(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'glitch' | 'done'
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const controlled = typeof progress === 'number';

  // Simulated progress when no real progress is supplied.
  useEffect(() => {
    if (controlled) return undefined;
    const reduced = prefersReducedMotion();
    const total = reduced ? 300 : Math.max(1, duration) * 1000;
    const start = performance.now();
    let raf = 0;
    const step = (now) => {
      const t = Math.min(1, (now - start) / total);
      setShown(simulated(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [controlled, duration]);

  // Real progress: ease the displayed number towards the value passed in (never backwards).
  useEffect(() => {
    if (!controlled) return undefined;
    const target = Math.max(0, Math.min(100, progress));
    let raf = 0;
    const step = () => {
      const cur = shownRef.current;
      if (cur >= target) return;
      const next = Math.min(target, cur + Math.max(0.4, (target - cur) * 0.12));
      shownRef.current = next;
      setShown(next);
      if (next < target) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [controlled, progress]);

  // At 100%: hold a beat, glitch out, then remove the loader.
  const complete = shown >= 100;
  useEffect(() => {
    if (!complete || phase !== 'loading') return undefined;
    const reduced = prefersReducedMotion();
    let t2;
    const t1 = setTimeout(() => {
      setPhase('glitch');
      t2 = setTimeout(() => {
        setPhase('done');
        onCompleteRef.current?.();
      }, reduced ? 320 : GLITCH_MS);
    }, HOLD_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [complete, phase]);

  // Stop the page scrolling behind the loader.
  useEffect(() => {
    if (phase === 'done') return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  const pct = Math.round(shown);
  const lit = Math.floor((pct / 100) * segments + 1e-6);

  return (
    <>
      <style>{css}</style>

      {phase !== 'loading' ? <div className={phase === 'glitch' ? 'eml-reveal' : undefined}>{children}</div> : null}

      {phase !== 'done' ? (
        <div className="eml-root">
          <div
            className={`eml-screen${phase === 'glitch' ? ' eml-glitch' : ''}`}
            role="status"
            aria-live="polite"
            aria-label="Loading"
          >
            <Logo />
            <div className="eml-bar-wrap">
              <div className="eml-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                {Array.from({ length: segments }, (_, i) => (
                  <span key={i} className={`eml-seg${i < lit ? ' is-on' : ''}`} />
                ))}
              </div>
              <span className="eml-pct">{pct}%</span>
            </div>
          </div>
          <div className={`eml-bars${phase === 'glitch' ? ' is-on' : ''}`} />
        </div>
      ) : null}
    </>
  );
}
