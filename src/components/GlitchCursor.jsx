import { useEffect, useRef } from 'react';

/**
 * Pixel-art purple cursor that glitches out and back in every few seconds.
 *
 * Mount it once, anywhere near the root of the app:
 *
 *   <GlitchCursor />
 *
 * Props
 *   fill        Body colour of the arrow (default #8453C9).
 *   outline     One-pixel outline colour (default #000000).
 *   shadow      Colour of the split ghost layer during a glitch (default #5B3896).
 *   ghost       Colour of the first ghost layer during a glitch (default #FAA6FF).
 *   scale       Screen pixels per art pixel (default 1.5, so the arrow is 18 x 27).
 *   minDelay    Shortest gap between glitches in ms (default 3000).
 *   maxDelay    Longest gap in ms (default 3000, so glitches land at a steady rhythm).
 *
 * Behaviour
 *   - Only turns on for devices with a mouse or trackpad (pointer: fine). Touch screens are untouched.
 *   - Over links and buttons the arrow lights up and grows slightly; on press it shrinks.
 *   - Over text fields the normal text cursor comes back, so typing stays obvious.
 *   - The glitch is skipped for visitors who prefer reduced motion (the cursor still shows).
 *   - Native cursors are hidden with one CSS rule while the component is mounted and restored on unmount.
 */

// 12 x 18 pixel arrow. O = outline, F = fill. Top-left pixel is the hotspot.
const GRID = [
  'O...........',
  'OO..........',
  'OFO.........',
  'OFFO........',
  'OFFFO.......',
  'OFFFFO......',
  'OFFFFFO.....',
  'OFFFFFFO....',
  'OFFFFFFFO...',
  'OFFFFFFFFO..',
  'OFFFFFFFFFO.',
  'OFFFFFFOOOOO',
  'OFFOFFO.....',
  'OFO.OFFO....',
  'OO..OFFO....',
  'O....OFFO...',
  '.....OFFO...',
  '......OO....',
];
const COLS = GRID[0].length;
const ROWS = GRID.length;

// Merge horizontal runs of one colour into a single SVG path.
function pathFor(ch) {
  let d = '';
  GRID.forEach((row, y) => {
    let x = 0;
    while (x < COLS) {
      if (row[x] !== ch) { x += 1; continue; }
      let w = 1;
      while (x + w < COLS && row[x + w] === ch) w += 1;
      d += `M${x} ${y}h${w}v1h-${w}z`;
      x += w;
    }
  });
  return d;
}
const OUTLINE_D = pathFor('O');
const FILL_D = pathFor('F');
const ALL_D = OUTLINE_D + FILL_D;

const css = `
html.gc-on, html.gc-on *{cursor:none !important}
html.gc-on input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button]):not([type=submit]),
html.gc-on textarea, html.gc-on [contenteditable=""], html.gc-on [contenteditable="true"]{cursor:text !important}

.gc{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;opacity:0;will-change:transform}
.gc.is-visible{opacity:1}
.gc-pose{transform-origin:0 0;transition:transform .12s ease-out;position:relative}
.gc.is-link .gc-pose{transform:scale(1.18)}
.gc.is-down .gc-pose{transform:scale(.88)}
.gc.is-link.is-down .gc-pose{transform:scale(1.05)}
.gc svg{position:absolute;left:0;top:0;display:block;overflow:visible;shape-rendering:crispEdges}
.gc-ghost{opacity:0}

/* Glitch out, flicker off, glitch back in. */
.gc.is-glitch .gc-base{animation:gcBase .4s steps(1,end) both}
.gc.is-glitch .gc-ghost-a{animation:gcGhostA .4s steps(1,end) both}
.gc.is-glitch .gc-ghost-b{animation:gcGhostB .4s steps(1,end) both}
@keyframes gcBase{
0%{opacity:1;transform:none;clip-path:inset(0 0 0 0)}
8%{clip-path:inset(0 0 58% 0);transform:translateX(-5px)}
16%{clip-path:inset(46% 0 0 0);transform:translateX(6px)}
24%{clip-path:inset(0 0 0 0);transform:translateX(-3px) skewX(-10deg)}
32%{clip-path:inset(30% 0 40% 0);transform:translateX(4px)}
38%{opacity:0}
56%{opacity:0}
60%{opacity:1;clip-path:inset(35% 0 30% 0);transform:translateX(5px)}
68%{clip-path:inset(0 0 62% 0);transform:translateX(-6px)}
76%{clip-path:inset(54% 0 0 0);transform:translateX(3px)}
86%{clip-path:inset(0 0 0 0);transform:translateX(-2px)}
94%{transform:none}
100%{opacity:1;transform:none;clip-path:inset(0 0 0 0)}}
@keyframes gcGhostA{
0%{opacity:0}
8%{opacity:.95;transform:translate(-7px,1px)}
24%{opacity:.8;transform:translate(6px,-1px)}
34%{opacity:.9;transform:translate(-4px,0)}
40%{opacity:0}
58%{opacity:.9;transform:translate(7px,0)}
76%{opacity:.8;transform:translate(-6px,1px)}
90%{opacity:0}
100%{opacity:0}}
@keyframes gcGhostB{
0%{opacity:0}
12%{opacity:.9;transform:translate(8px,-1px)}
28%{opacity:.8;transform:translate(-5px,1px)}
38%{opacity:0}
62%{opacity:.85;transform:translate(-8px,0)}
80%{opacity:.8;transform:translate(5px,-1px)}
92%{opacity:0}
100%{opacity:0}}

@media (prefers-reduced-motion: reduce){
.gc.is-glitch .gc-base,.gc.is-glitch .gc-ghost-a,.gc.is-glitch .gc-ghost-b{animation:none}
.gc-pose{transition:none}}
`;

const EDITABLE = 'input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button]):not([type=submit]),textarea,[contenteditable=""],[contenteditable="true"]';
const CLICKABLE = 'a[href],button,[role="button"],summary,select,label,input[type=checkbox],input[type=radio],input[type=range],input[type=button],input[type=submit]';

export default function GlitchCursor({
  fill = '#8453C9',
  outline = '#000000',
  shadow = '#5B3896',
  ghost = '#FAA6FF',
  scale = 1.5,
  minDelay = 3000,
  maxDelay = 3000,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return undefined;
    if (!window.matchMedia?.('(pointer: fine)').matches) return undefined; // touch devices keep their normal behaviour

    const root = document.documentElement;
    root.classList.add('gc-on');

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let timer = 0;
    let off = 0;

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      el.classList.add('is-visible');
    };
    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      const editable = !!t?.closest(EDITABLE);
      el.classList.toggle('is-visible', !editable);
      el.classList.toggle('is-link', !editable && !!t?.closest(CLICKABLE));
    };
    const onDown = () => el.classList.add('is-down');
    const onUp = () => el.classList.remove('is-down');
    const onLeave = () => el.classList.remove('is-visible');

    const glitch = () => {
      el.classList.remove('is-glitch');
      void el.offsetWidth; // restart the animation
      el.classList.add('is-glitch');
      off = window.setTimeout(() => el.classList.remove('is-glitch'), 850);
    };
    const schedule = () => {
      const wait = minDelay + Math.random() * Math.max(0, maxDelay - minDelay);
      timer = window.setTimeout(() => { glitch(); schedule(); }, wait);
    };
    if (!reduced) schedule();

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('gc-on');
      window.clearTimeout(timer);
      window.clearTimeout(off);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [minDelay, maxDelay]);

  const w = COLS * scale;
  const h = ROWS * scale;
  const svgProps = { viewBox: `0 0 ${COLS} ${ROWS}`, width: w, height: h, 'aria-hidden': 'true', focusable: 'false' };

  return (
    <>
      <style>{css}</style>
      <div ref={ref} className="gc" aria-hidden="true">
        <div className="gc-pose" style={{ width: w, height: h }}>
          <svg {...svgProps} className="gc-ghost gc-ghost-a"><path d={ALL_D} fill={ghost} /></svg>
          <svg {...svgProps} className="gc-ghost gc-ghost-b"><path d={ALL_D} fill={shadow} /></svg>
          <svg {...svgProps} className="gc-base">
            <path d={OUTLINE_D} fill={outline} />
            <path d={FILL_D} fill={fill} />
          </svg>
        </div>
      </div>
    </>
  );
}
