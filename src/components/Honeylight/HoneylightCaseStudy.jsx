import { Fragment, useEffect, useRef, useState } from 'react';

/**
 * Honeylight: portfolio case-study page (black and orange, with a light-mode toggle).
 *
 * - Self-contained: no images and no imports besides React. Styles are scoped under
 *   .hp-page and every class is prefixed hp-.
 * - The site Navbar and Footer wrap this page (see App.jsx), so it has no nav of its own;
 *   the light/dark toggle floats bottom-right.
 * - The hero runs an illustrative loop of the three lights reacting to three attack types.
 *   The session lines in it are sample text, not real captures.
 * - The impact numbers count up once when they scroll into view. All motion is off for
 *   prefers-reduced-motion, and the scroll reveal only runs where the browser supports
 *   CSS scroll-driven animation.
 * - The terminal, ML chart, laptop and breadboard frames are placeholders: swap in real
 *   screenshots and a hardware photo.
 */

const css = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
.hp-page{--bg:#0B0B0C;--bg2:#121110;--surface:rgba(255,255,255,.04);--surface-solid:#171514;--line:rgba(255,255,255,.09);--line-strong:rgba(255,255,255,.18);--text:#F6F2EE;--muted:#A8A29E;--faint:#8A837D;--chip:#1D1A18;--acc:#FF6A13;--acc-text:#FF8A3D;--acc-ink:#0B0B0C;--amber:#FFB020;--blue:#38BDF8;--glow:rgba(255,106,19,.16);position:relative;width:100%;background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;transition:background .3s ease,color .3s ease}
.hp-page.hp-light{--bg:#FFF9F3;--bg2:#FBEFE3;--surface:rgba(20,10,0,.035);--surface-solid:#FFFFFF;--line:rgba(20,10,0,.1);--line-strong:rgba(20,10,0,.22);--text:#16110D;--muted:#5C5149;--faint:#78695E;--chip:#F3E4D6;--acc-text:#B93C00;--glow:rgba(255,106,19,.14)}
.hp-page a{color:var(--text)}.hp-page a:hover{color:var(--acc-text)}
.hp-wrap{max-width:1240px;margin:0 auto;padding:0 32px;box-sizing:border-box}
.hp-hd{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:-.03em;line-height:1.04;margin:0}
.hp-eyebrow{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--acc-text);letter-spacing:.02em}
.hp-lede{font-size:19px;line-height:1.65;color:var(--muted);margin:0}
.hp-acc{color:var(--acc-text)}
.hp-glass{background:var(--surface);border:1px solid var(--line);border-radius:22px;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);box-sizing:border-box}
.hp-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.5;color:var(--muted);background:var(--chip);border:1px solid var(--line);padding:4px 9px;border-radius:7px}
.hp-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;font-size:14px;font-weight:600;border:1px solid var(--line-strong);color:var(--text);white-space:nowrap}
.hp-pill::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--acc)}
.hp-ic{width:22px;height:22px;display:block}
.hp-ico{width:46px;height:46px;border-radius:13px;background:var(--chip);border:1px solid var(--line);color:var(--acc-text);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hp-tog{position:fixed;right:20px;bottom:20px;z-index:60;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line-strong);background:var(--surface-solid);color:var(--text);font:600 14px 'Inter',sans-serif;cursor:pointer;box-shadow:0 10px 30px -10px rgba(0,0,0,.5)}
.hp-tog:hover{border-color:var(--acc)}
.hp-g-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:56px;align-items:center}
.hp-g-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:24px;overflow:hidden}
.hp-stat{background:var(--bg);padding:30px 26px}
.hp-stat .hp-n{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:60px;line-height:1;letter-spacing:-.04em;color:var(--acc-text)}
.hp-g-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.hp-g-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.hp-bento{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.hp-bcard{padding:28px;display:flex;flex-direction:column;gap:14px}
.hp-bcard h3{margin:0;font-family:'Plus Jakarta Sans',sans-serif;font-size:21px;line-height:1.25;font-weight:800;letter-spacing:-.015em}
.hp-bcard p{margin:0;color:var(--muted);font-size:16px;line-height:1.6}
.hp-span2{grid-column:span 2}
.hp-lift{transition:transform .28s ease,border-color .28s ease}
.hp-lift:hover{transform:translateY(-4px);border-color:var(--acc)}
.hp-num{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--faint)}
.hp-node{border-radius:16px;padding:16px 20px;background:var(--surface-solid);border:1px solid var(--line);box-sizing:border-box}
.hp-node b{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;letter-spacing:-.01em}
.hp-node .hp-s{font-size:14px;color:var(--muted);margin-top:4px;line-height:1.5}
.hp-node .hp-subs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}
.hp-node .hp-subs span{font-size:13.5px;line-height:1.45;color:var(--muted);padding:8px 11px;border-radius:10px;background:var(--surface);border:1px solid var(--line)}
.hp-node .hp-subs span code{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--acc-text)}
.hp-node-acc{background:var(--acc);color:var(--acc-ink);border-color:var(--acc)}
.hp-node-acc .hp-s{color:inherit;opacity:.75}
.hp-v{height:38px;display:flex;justify-content:center;position:relative}
.hp-v::before{content:'';border-left:2px dashed var(--line-strong)}
.hp-v span{position:absolute;left:calc(50% + 12px);top:9px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--faint)}
.hp-fork{height:24px;position:relative}
.hp-fork::before{content:'';position:absolute;left:25%;right:25%;top:0;bottom:0;border:2px dashed var(--line-strong);border-bottom:0;border-radius:10px 10px 0 0}
.hp-lrow{display:flex;justify-content:space-between;gap:10px;align-items:baseline;font-size:13.5px;padding:8px 11px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);margin-top:8px}
.hp-lrow code{font-family:'JetBrains Mono',monospace;font-size:12px;color:#FFB020;text-align:right}
.hp-lrow b{font-size:14px;color:#F6F2EE;font-family:'Inter',sans-serif}
.hp-stk{display:grid;grid-template-columns:230px minmax(0,1fr);gap:18px;padding:22px 0;border-top:1px solid var(--line)}
.hp-stk .hp-lbl{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--acc-text);padding-top:8px}
.hp-stk .hp-chips{display:flex;flex-wrap:wrap;gap:8px}
.hp-stk .hp-chips span{font-size:14.5px;font-weight:600;padding:8px 14px;border-radius:12px;background:var(--surface);border:1px solid var(--line)}
.hp-chk{display:flex;gap:10px;align-items:flex-start;font-size:15.5px;line-height:1.5}
.hp-chk svg{width:18px;height:18px;flex-shrink:0;margin-top:3px;color:var(--acc-text)}

/* ---- lamps (the physical artefact) ---- */
.hp-lamp{width:54px;height:54px;border-radius:50%;position:relative;flex-shrink:0;border:2px solid #3A3430;background:#1A1715;transition:background .25s ease,box-shadow .25s ease,border-color .25s ease}
.hp-lamp.hp-s-on{background:radial-gradient(circle at 40% 35%,#FFE2B8,#FFB020 45%,#FF6A13);border-color:#FFB020;box-shadow:0 0 26px 4px rgba(255,150,30,.55)}
.hp-lamp.hp-s-dim{background:radial-gradient(circle at 40% 35%,#8A5A2A,#5A3416 60%,#3D240F);border-color:#6B4220;box-shadow:0 0 12px 1px rgba(255,120,20,.2)}
.hp-lamp.hp-s-off{background:#1A1715;border-color:#3A3430;box-shadow:none}
.hp-lamp.hp-s-flick{background:radial-gradient(circle at 40% 35%,#FFE2B8,#FFB020 45%,#FF6A13);border-color:#FFB020;animation:hp-flick .5s steps(1,end) infinite}
@keyframes hp-flick{0%{opacity:1;box-shadow:0 0 26px 4px rgba(255,150,30,.55)}25%{opacity:.18;box-shadow:none}50%{opacity:1;box-shadow:0 0 26px 4px rgba(255,150,30,.55)}75%{opacity:.4;box-shadow:none}100%{opacity:1}}
.hp-s-restore{border-color:var(--blue)}

/* hero demo panel (always dark) */
.hp-demo{background:#050505;border:1px solid rgba(255,176,32,.35);border-radius:28px;padding:26px;color:#F6F2EE;box-shadow:0 50px 90px -40px rgba(0,0,0,.8),0 0 60px -20px rgba(255,106,19,.35);position:relative;z-index:2}
.hp-demo-top{display:flex;justify-content:space-between;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#A8A29E}
.hp-demo-top i{display:inline-block;width:8px;height:8px;border-radius:50%;background:#FF6A13;margin-right:8px;animation:hp-blip 1.6s ease-in-out infinite}
@keyframes hp-blip{0%,100%{opacity:1}50%{opacity:.3}}
.hp-lamps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:26px 0 22px}
.hp-lampcol{display:flex;flex-direction:column;align-items:center;gap:9px;padding:18px 8px 14px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
.hp-lname{font-size:12.5px;color:#A8A29E;text-align:center;line-height:1.35}
.hp-lstate{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#FFB020;letter-spacing:.08em}
.hp-status{border-radius:14px;padding:14px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.7}
.hp-status .hp-a{color:#FFB020}.hp-status .hp-b{color:#38BDF8}.hp-status .hp-c{color:#A8A29E}

/* mockup frames */
.hp-frame{border-radius:16px;border:1px solid var(--line);background:var(--surface-solid);overflow:hidden}
.hp-mk-top{display:flex;gap:6px;padding:9px 12px;border-bottom:1px solid var(--line);background:var(--chip)}
.hp-mk-top i{width:9px;height:9px;border-radius:50%;background:var(--line-strong);display:block}
.hp-mono{font-family:'JetBrains Mono',monospace}
.hp-term{background:#070707;color:#D6D3D1;font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.75;padding:14px 16px}
.hp-term .hp-p{color:#FF8A3D}.hp-term .hp-d{color:#78716C}
.hp-laptop{position:relative;max-width:420px;margin:0 auto;width:100%}
.hp-laptop .hp-lid{border:6px solid #1A1816;border-bottom-width:10px;border-radius:14px 14px 4px 4px;background:#0E0D0C;overflow:hidden}
.hp-laptop .hp-base{height:12px;background:linear-gradient(#26231F,#141210);border-radius:0 0 14px 14px;width:112%;margin:0 -6%}
.hp-dbar{height:8px;border-radius:4px;background:rgba(255,255,255,.12)}
.hp-hwframe{border:1.5px dashed rgba(255,176,32,.45);border-radius:16px;background:repeating-linear-gradient(45deg,rgba(255,176,32,.04) 0 10px,transparent 10px 20px);padding:18px;display:flex;flex-direction:column;gap:14px;align-items:center}
.hp-card-hw{background:#050505;border:1px solid rgba(255,176,32,.45);box-shadow:0 0 60px -26px rgba(255,106,19,.6);color:#F6F2EE;--text:#F6F2EE;--muted:#B5AEA8;--line:rgba(255,255,255,.1);--chip:#1D1A18;--acc-text:#FFB020;--faint:#8A837D}
.hp-card-hw .hp-ico{background:rgba(255,176,32,.12);border-color:rgba(255,176,32,.35)}
.hp-sol{padding:32px;gap:18px}
.hp-sol h3{font-size:23px}
.hp-sol .hp-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}
.hp-part{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--acc-text);letter-spacing:.04em}
.hp-atk{padding:30px;display:flex;flex-direction:column;gap:16px}
.hp-atk h3{margin:0;font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;letter-spacing:-.015em;line-height:1.25}
.hp-atk p{margin:0;color:var(--muted)}
.hp-atk .hp-lampbox{height:104px;border-radius:16px;background:#050505;border:1px solid rgba(255,176,32,.3);display:flex;align-items:center;justify-content:center;gap:14px}
.hp-reveal{opacity:1}
@supports (animation-timeline: view()){.hp-reveal{animation:hp-rise linear both;animation-timeline:view();animation-range:entry 0% cover 22%}}
@keyframes hp-rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
@media (max-width:1024px){.hp-g-hero{grid-template-columns:minmax(0,1fr)}.hp-g-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.hp-g-3{grid-template-columns:minmax(0,1fr)}.hp-g-2{grid-template-columns:minmax(0,1fr)}.hp-bento{grid-template-columns:repeat(2,minmax(0,1fr))}.hp-span2{grid-column:span 2}.hp-stk{grid-template-columns:minmax(0,1fr);gap:10px}.hp-chal{grid-template-columns:minmax(0,1fr) !important}}
@media (max-width:767px){.hp-wrap{padding:0 18px}.hp-bento{grid-template-columns:minmax(0,1fr)}.hp-span2{grid-column:span 1}.hp-h1x{font-size:40px !important}.hp-h2x{font-size:32px !important}.hp-stat .hp-n{font-size:46px}.hp-hide-sm{display:none !important}.hp-stat{padding:22px 18px}.hp-node .hp-subs{grid-template-columns:minmax(0,1fr)}.hp-arch-cols{grid-template-columns:minmax(0,1fr) !important}.hp-fork{display:none}.hp-arch-cols>*+*{margin-top:0}.hp-sol{padding:24px}}
@media (prefers-reduced-motion:reduce){.hp-reveal,.hp-lamp,.hp-demo-top i{animation:none !important;opacity:1 !important}.hp-lift{transition:none}}`;

const STAT_DEFS = [
  { v: 3, label: 'attack types detected and classified in real time' },
  { v: 61, label: 'sessions used to train and evaluate the ML model' },
  { v: 89, suf: '%', label: 'Random Forest classifier accuracy after bias correction' },
  { v: 5, label: 'detection and response scripts in the live pipeline' },
  { v: 3, label: 'physical lights controlled independently by the detection engine' },
  { v: 7, label: 'behavioral features extracted per session for ML classification' },
  { v: 2, label: 'detection layers: rule-based scoring + ML classifier' },
  { v: 8, suf: '+', label: 'debugging cycles resolved through empirical isolation testing' },
];

// Illustrative response simulation: which light does what, step by step.
const STEPS = [
  { l: ['on', 'on', 'on'], event: 'Listening on port 22', verdict: 'No active session', cmd: 'All lights on' },
  { l: ['off', 'on', 'on'], event: 'Session: wget + execute payload', verdict: 'Verdict: malware deployment', cmd: 'Light 1 → FORCE:OFF' },
  { l: ['on', 'on', 'on'], event: 'Threat mitigated', verdict: 'Session closed', cmd: 'Light 1 → RESTORE' },
  { l: ['on', 'dim', 'on'], event: 'Session: miner binary started', verdict: 'Verdict: cryptomining infection', cmd: 'Light 2 → DIM' },
  { l: ['on', 'on', 'on'], event: 'Threat mitigated', verdict: 'Session closed', cmd: 'Light 2 → RESTORE' },
  { l: ['on', 'on', 'flick'], event: 'Session: repeated flood commands', verdict: 'Verdict: flood attack', cmd: 'Light 3 → FLASH' },
  { l: ['on', 'on', 'on'], event: 'Threat mitigated', verdict: 'Session closed', cmd: 'Light 3 → RESTORE' },
  { l: ['on', 'on', 'on'], event: 'Listening on port 22', verdict: 'No active session', cmd: 'All lights on' },
];
const LAMP_NAMES = ['Light 1 · Relay', 'Light 2 · MOSFET', 'Light 3 · MOSFET'];
const LAMP_LABEL = { on: 'ON', off: 'OFF', dim: 'DIM', flick: 'FLASH' };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Counts the impact numbers up once the stats band scrolls into view.
function useCountUp(duration = 1700) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') { setP(1); return undefined; }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / duration);
        setP(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [duration]);
  return [ref, p];
}

export default function HoneylightCaseStudy() {
  const [statsRef, progress] = useCountUp();
  const [light, setLight] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setStep((s) => s + 1), 2100);
    return () => clearInterval(id);
  }, []);

  const eased = 1 - Math.pow(1 - progress, 3);
  const stats = STAT_DEFS.map((d) => ({ n: Math.round(d.v * eased) + (d.suf || ''), label: d.label }));

  const cur = STEPS[step % STEPS.length];
  const lamps = cur.l.map((s, i) => ({ cls: `hp-lamp hp-s-${s}`, name: LAMP_NAMES[i], state: LAMP_LABEL[s] }));
  const status = { event: cur.event, verdict: cur.verdict, cmd: cur.cmd };

  const themeLabel = light ? 'Dark' : 'Light';
  const toggleTheme = () => setLight((v) => !v);

  return (
    <>
      <style>{css}</style>
      <main className={`hp-page${light ? ' hp-light' : ''}`} id="hp-top">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
      <symbol id="hp-hl" viewBox="0 0 120 120"><polygon points="60,6 106,33 106,87 60,114 14,87 14,33" fill="var(--lg-bg,#0B0B0C)" stroke="var(--lg-a,#FF6A13)" strokeWidth="5" strokeLinejoin="round"></polygon><path d="M60 28a20 20 0 0 0-11 36.7c2 1.4 3 3.3 3 5.3v2h16v-2c0-2 1-3.9 3-5.3A20 20 0 0 0 60 28z" fill="var(--lg-a,#FF6A13)"></path><path d="M53.5 49.5 60 58l6.5-8.5" fill="none" stroke="var(--lg-bg,#0B0B0C)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52 79h16M54.5 86h11" fill="none" stroke="var(--lg-a,#FF6A13)" strokeWidth="5" strokeLinecap="round"></path></symbol>
      <symbol id="hp-h-bulb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4"></path><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"></path></symbol>
      <symbol id="hp-h-chip" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"></rect><rect x="9.5" y="9.5" width="5" height="5"></rect><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"></path></symbol>
      <symbol id="hp-h-monitor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path></symbol>
      <symbol id="hp-h-term" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="m7 9 3 3-3 3M13 15h4"></path></symbol>
      <symbol id="hp-h-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m8.5 12 2.5 2.5 4.5-5"></path></symbol>
      <symbol id="hp-h-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"></path></symbol>
      <symbol id="hp-h-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></symbol>
      <symbol id="hp-h-bug" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="8" width="10" height="11" rx="5"></rect><path d="M9.5 8a2.5 2.5 0 0 1 5 0M12 11v8M3 12l4 1.5M21 12l-4 1.5M3 19l4-2M21 19l-4-2"></path></symbol>
      <symbol id="hp-h-wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"></path></symbol>
      <symbol id="hp-h-key" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4"></circle><path d="m11 12 9-9M16 7l3 3"></path></symbol>
      <symbol id="hp-h-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></symbol>
      <symbol id="hp-h-loop" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11a8 8 0 0 0-14.9-3M4 5v4h4M4 13a8 8 0 0 0 14.9 3M20 19v-4h-4"></path></symbol>
      <symbol id="hp-h-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 9 5-9 5-9-5z"></path><path d="m3 13 9 5 9-5"></path></symbol>
      <symbol id="hp-h-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"></path></symbol>
      </defs>
      </svg>

      <button type="button" className="hp-tog" onClick={toggleTheme} aria-label="Toggle light and dark theme"><svg className="hp-ic" viewBox="0 0 24 24" style={{ width: '17px', height: '17px' }} aria-hidden="true"><use href="#hp-h-moon"></use></svg><span>{themeLabel}</span></button>

      {/* 1. HERO */}
      <header style={{ position: 'relative', overflow: 'hidden', padding: '150px 0 110px' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: '0', backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)', backgroundSize: '56px 56px', WebkitMaskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent 75%)', maskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent 75%)', opacity: '.6' }}></div>
      <div className="hp-wrap hp-g-hero" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg viewBox="0 0 120 120" style={{ width: '40px', height: '40px', display: 'block', '--lg-bg': 'var(--bg)' }} aria-hidden="true"><use href="#hp-hl"></use></svg>
      <span style={{ fontFamily: '\'Plus Jakarta Sans\', sans-serif', fontWeight: '800', fontSize: '17px', letterSpacing: '.14em' }}>HONEYLIGHT</span>
      <span className="hp-hide-sm" style={{ fontSize: '14px', color: 'var(--faint)' }}>/ <a href="/#work" style={{ textDecoration: 'none', color: 'var(--muted)' }}>EnderMonks work</a></span>
      </div>
      <div className="hp-eyebrow">Case Study · Cybersecurity · Research Platform</div>
      <h1 className="hp-hd hp-h1x" style={{ fontSize: '62px' }}>A honeypot that doesn't just detect attacks: <span className="hp-acc">it physically shows you one.</span></h1>
      <p className="hp-lede">ENDERMONKS designed and built a full IoT botnet detection and analysis system: a Cowrie SSH honeypot running on a Raspberry Pi, a machine learning detection engine, a real-time web dashboard, and a physical smart-lighting artefact that visibly responds to attacks, turning off, dimming, or flickering depending on what the attacker is doing.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <span className="hp-pill">IoT Security</span><span className="hp-pill">Machine Learning</span><span className="hp-pill">Physical Computing</span><span className="hp-pill">Honeypot Research</span>
      </div>
      </div>

      {/* live response demo */}
      <div style={{ position: 'relative', padding: '20px 0' }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: '520px', height: '520px', transform: 'translate(-50%, -50%)', borderRadius: '50%', background: 'radial-gradient(circle, var(--glow), transparent 65%)', filter: 'blur(10px)' }}></div>
      <div className="hp-demo" role="img" aria-label="Illustrative simulation: three lights react to three kinds of attack, then restore">
      <div className="hp-demo-top"><span><i></i>RESPONSE ENGINE</span><span>illustrative simulation</span></div>
      <div className="hp-lamps">
      {lamps.map((l, i) => (
      <Fragment key={i}>
      <div className="hp-lampcol"><div className={l.cls}></div><div className="hp-lname">{l.name}</div><div className="hp-lstate">{l.state}</div></div>
      </Fragment>
      ))}
      </div>
      <div className="hp-status"><div className="hp-c">&gt; {status.event}</div><div className="hp-a">&gt; {status.verdict}</div><div className="hp-b">&gt; {status.cmd}</div></div>
      </div>
      </div>
      </div>
      </header>

      {/* 2. STATS */}
      <section aria-label="Impact numbers" style={{ padding: '20px 0 110px' }}>
      <div className="hp-wrap">
      <div className="hp-g-stats hp-reveal" ref={statsRef}>
      {stats.map((s, i) => (
      <Fragment key={i}>
      <div className="hp-stat"><div className="hp-n">{s.n}</div><div style={{ fontWeight: '600', marginTop: '14px', fontSize: '16px', lineHeight: '1.45' }}>{s.label}</div></div>
      </Fragment>
      ))}
      </div>
      </div>
      </section>

      {/* 3. CHALLENGE */}
      <section aria-labelledby="hp-chal-h" style={{ padding: '110px 0', background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="hp-wrap hp-chal" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, .9fr) minmax(0, 1.1fr)', gap: '72px', alignItems: 'start' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div className="hp-eyebrow">// The Challenge</div>
      <h2 id="hp-chal-h" className="hp-hd hp-h2x" style={{ fontSize: '54px' }}>The problem is <span className="hp-acc">invisible.</span></h2>
      <div className="hp-glass" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '22px' }}>
      <div className="hp-hd" style={{ fontSize: '76px', color: 'var(--acc-text)' }}>61</div>
      <div style={{ fontSize: '15.5px', lineHeight: '1.5', color: 'var(--muted)' }}>default username and password pairs, hardcoded into Mirai, were enough to compromise millions of devices.</div>
      </div>
      </div>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '18px', lineHeight: '1.75', color: 'var(--muted)' }}>
      <p style={{ margin: '0' }}>IoT devices (smart lights, cameras, routers) are shipped with weak default credentials and minimal security controls. Mirai, the most documented IoT botnet in history, used a hardcoded list of 61 default username/password pairs to silently compromise millions of devices and turn them into a DDoS army.</p>
      <p style={{ margin: '0' }}>The problem is invisible. When a device is compromised, nothing obvious happens: there's no alert, no flashing light, no sign that someone is in control of your infrastructure. Most existing research stops at the log file: detect the attack, write it down, move on.</p>
      <p style={{ margin: '0', color: 'var(--text)' }}>ENDERMONKS built a system that doesn't stop there. We connected detection directly to a physical IoT device, a smart lighting system, so that when an attack is detected, you can see it. The light goes out, dims, or flickers. And when the system mitigates the threat, the light restores itself. Cyber threat intelligence made tangible.</p>
      </div>
      </div>
      </section>

      {/* 4. SOLUTION */}
      <section aria-labelledby="hp-sol-h" style={{ padding: '120px 0' }}>
      <div className="hp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
      <div className="hp-eyebrow">// The Solution</div>
      <h2 id="hp-sol-h" className="hp-hd hp-h2x" style={{ fontSize: '52px' }}>Four components, <span className="hp-acc">one pipeline.</span></h2>
      </div>
      <div className="hp-g-2">

      {/* 1 honeypot */}
      <article className="hp-glass hp-lift hp-bcard hp-sol hp-reveal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-bug"></use></svg></div><span className="hp-part">01 · THE DECOY</span></div>
      <h3>Cowrie honeypot</h3>
      <p>A medium-interaction SSH honeypot running on a Raspberry Pi 4, configured to look exactly like a vulnerable IoT device. Every attacker who connects thinks they've found a real target. Every login attempt, command, and session is silently captured.</p>
      <div className="hp-frame" role="img" aria-label="Placeholder terminal showing a captured SSH session"><div className="hp-mk-top"><i></i><i></i><i></i></div><div className="hp-term"><div><span className="hp-p">$</span> ssh root@&lt;target&gt;</div><div><span className="hp-d">#</span> login attempt → captured</div><div><span className="hp-d">#</span> command → captured</div><div><span className="hp-d">#</span> session → cowrie.json</div></div></div>
      <div className="hp-tags"><span className="hp-tag">Cowrie</span><span className="hp-tag">Raspberry Pi</span><span className="hp-tag">iptables</span><span className="hp-tag">SSH emulation</span></div>
      </article>

      {/* 2 ML */}
      <article className="hp-glass hp-lift hp-bcard hp-sol hp-reveal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-chip"></use></svg></div><span className="hp-part">02 · THE BRAIN</span></div>
      <h3>ML detection engine</h3>
      <p>A two-layer detection system: a rule-based scorer for immediate classification, and a trained Random Forest classifier that learns from behavioral patterns (command sequences, credential types, session timing), not just a fixed list of rules.</p>
      <div className="hp-frame" role="img" aria-label="Placeholder chart of feature importance" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
      <div className="hp-mono" style={{ fontSize: '11.5px', color: 'var(--faint)' }}>FEATURE IMPORTANCE · illustrative</div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: '10px', alignItems: 'center', fontSize: '12.5px', color: 'var(--muted)' }}><span>Command behaviour</span><span style={{ height: '9px', borderRadius: '5px', background: 'var(--acc)', width: '86%', display: 'block' }}></span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: '10px', alignItems: 'center', fontSize: '12.5px', color: 'var(--muted)' }}><span>Session timing</span><span style={{ height: '9px', borderRadius: '5px', background: 'var(--acc)', opacity: '.6', width: '52%', display: 'block' }}></span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: '10px', alignItems: 'center', fontSize: '12.5px', color: 'var(--muted)' }}><span>Credential type</span><span style={{ height: '9px', borderRadius: '5px', background: 'var(--acc)', opacity: '.35', width: '30%', display: 'block' }}></span></div>
      </div>
      <div className="hp-tags"><span className="hp-tag">scikit-learn</span><span className="hp-tag">Random Forest</span><span className="hp-tag">Python</span><span className="hp-tag">Weak labelling</span></div>
      </article>

      {/* 3 dashboard */}
      <article className="hp-glass hp-lift hp-bcard hp-sol hp-reveal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-monitor"></use></svg></div><span className="hp-part">03 · THE EYES</span></div>
      <h3>Real-time dashboard</h3>
      <p>A Flask web application that reads live from the honeypot logs and the ML model, displaying active sessions, attack verdicts, model confidence scores, feature importance charts, and a timeline of attacks over time.</p>
      <div className="hp-laptop" role="img" aria-label="Placeholder laptop frame for the dashboard screenshot">
      <div className="hp-lid"><div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#0E0D0C', minHeight: '170px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="hp-mono" style={{ fontSize: '10px', color: '#A8A29E' }}>DASHBOARD · :5000</span><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6A13' }}></span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
      <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,.05)' }}><div className="hp-dbar" style={{ width: '60%' }}></div><div className="hp-dbar" style={{ width: '90%', height: '14px', marginTop: '8px', background: '#FF6A13' }}></div></div>
      <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,.05)' }}><div className="hp-dbar" style={{ width: '50%' }}></div><div className="hp-dbar" style={{ width: '70%', height: '14px', marginTop: '8px', background: '#FFB020' }}></div></div>
      <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,.05)' }}><div className="hp-dbar" style={{ width: '70%' }}></div><div className="hp-dbar" style={{ width: '50%', height: '14px', marginTop: '8px', background: 'rgba(255,255,255,.3)' }}></div></div>
      </div>
      <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }} aria-hidden="true"><path d="M0 58 L40 46 L80 52 L120 28 L160 36 L200 14 L240 30 L300 8" fill="none" stroke="#FF6A13" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"></path><path d="M0 58 L40 46 L80 52 L120 28 L160 36 L200 14 L240 30 L300 8 L300 70 L0 70z" fill="rgba(255,106,19,.12)"></path></svg>
      </div></div>
      <div className="hp-base"></div>
      </div>
      <div className="hp-tags"><span className="hp-tag">Flask</span><span className="hp-tag">Chart.js</span><span className="hp-tag">SQLite</span><span className="hp-tag">JSON logs</span></div>
      </article>

      {/* 4 hardware */}
      <article className="hp-glass hp-lift hp-bcard hp-sol hp-card-hw hp-reveal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-bulb"></use></svg></div><span className="hp-part">04 · THE CONSEQUENCE</span></div>
      <h3>Physical artefact</h3>
      <p>An Arduino Mega controlling three independently addressable lights via relay and MOSFET modules. When the detection engine fires, it sends a serial command that forces a light off, dims it, or makes it flicker, depending on what the attacker actually did.</p>
      <div className="hp-hwframe" role="img" aria-label="Placeholder frame for a photo of the breadboard and lights">
      <svg viewBox="0 0 260 90" style={{ width: '100%', maxWidth: '300px', display: 'block' }} aria-hidden="true"><rect x="8" y="14" width="130" height="62" rx="6" fill="#0E3B43" stroke="#1F7A88" strokeWidth="2"></rect><rect x="22" y="26" width="26" height="22" rx="3" fill="#B8B2AC"></rect><rect x="62" y="30" width="60" height="8" rx="2" fill="#26231F"></rect><rect x="62" y="44" width="60" height="8" rx="2" fill="#26231F"></rect><g fill="#FFB020"><rect x="16" y="66" width="6" height="8"></rect><rect x="30" y="66" width="6" height="8"></rect><rect x="44" y="66" width="6" height="8"></rect><rect x="58" y="66" width="6" height="8"></rect><rect x="72" y="66" width="6" height="8"></rect></g><path d="M138 30h30M138 46h40M138 62h50" stroke="#FFB020" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 6"></path><circle cx="206" cy="28" r="14" fill="#FFB020"></circle><circle cx="226" cy="46" r="12" fill="#6B4220"></circle><circle cx="206" cy="64" r="14" fill="#1A1715" stroke="#3A3430" strokeWidth="2"></circle></svg>
      <span className="hp-mono" style={{ fontSize: '11.5px', color: '#B5AEA8' }}>PHOTO PLACEHOLDER · breadboard + lights</span>
      </div>
      <div className="hp-tags"><span className="hp-tag">Arduino Mega</span><span className="hp-tag">PWM</span><span className="hp-tag">Relay</span><span className="hp-tag">MOSFET</span><span className="hp-tag">PySerial</span></div>
      </article>
      </div>
      </div>
      </section>

      {/* 5. ATTACK CLASSIFICATION */}
      <section aria-labelledby="hp-atk-h" style={{ padding: '110px 0', background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="hp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '860px' }}>
      <div className="hp-eyebrow">// Attack classification</div>
      <h2 id="hp-atk-h" className="hp-hd hp-h2x" style={{ fontSize: '52px' }}>Three attacks. <span className="hp-acc">Three things you can see.</span></h2>
      <p className="hp-lede">The response maps to the attacker's intent, derived from their own commands. And when the threat is mitigated, the light restores itself.</p>
      </div>
      <div className="hp-g-3">
      <article className="hp-glass hp-atk hp-reveal"><div className="hp-lampbox" aria-hidden="true"><div className="hp-lamp hp-s-off"></div></div><div className="hp-mono" style={{ fontSize: '12px', color: 'var(--acc-text)' }}>MALWARE DEPLOYMENT</div><h3>The light turns off</h3><p>Command signature classified as takedown. The matching light is forced off until the threat is cleared.</p><span className="hp-tag" style={{ alignSelf: 'flex-start' }}>FORCE:OFF</span></article>
      <article className="hp-glass hp-atk hp-reveal"><div className="hp-lampbox" aria-hidden="true"><div className="hp-lamp hp-s-dim"></div></div><div className="hp-mono" style={{ fontSize: '12px', color: 'var(--acc-text)' }}>CRYPTOMINING INFECTION</div><h3>The light dims</h3><p>Command signature classified as cryptomining. The PWM-driven light drops to a low, steady glow.</p><span className="hp-tag" style={{ alignSelf: 'flex-start' }}>DIM</span></article>
      <article className="hp-glass hp-atk hp-reveal"><div className="hp-lampbox" aria-hidden="true"><div className="hp-lamp hp-s-flick"></div></div><div className="hp-mono" style={{ fontSize: '12px', color: 'var(--acc-text)' }}>FLOOD ATTACK</div><h3>The light flickers</h3><p>Command signature classified as flood. The light flashes for as long as the attack lasts.</p><span className="hp-tag" style={{ alignSelf: 'flex-start' }}>FLASH</span></article>
      </div>
      <div className="hp-reveal" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', padding: '16px 22px', borderRadius: '999px', border: '1px solid var(--line-strong)', alignSelf: 'center', fontSize: '15.5px', color: 'var(--muted)' }}><span className="hp-tag" style={{ color: 'var(--blue)', borderColor: 'var(--blue)' }}>RESTORE</span>Threat mitigated, so the light returns to normal.</div>
      </div>
      </section>

      {/* 6. BENTO */}
      <section aria-labelledby="hp-bento-h" style={{ padding: '120px 0' }}>
      <div className="hp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="hp-eyebrow">// Complexity highlights</div>
      <h2 id="hp-bento-h" className="hp-hd hp-h2x" style={{ fontSize: '54px' }}>Harder than it looks.</h2>
      </div>
      <div className="hp-bento">
      <article className="hp-glass hp-lift hp-bcard hp-span2 hp-reveal"><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="hp-num">01</span><svg className="hp-ic" viewBox="0 0 24 24" style={{ color: 'var(--acc-text)' }} aria-hidden="true"><use href="#hp-h-bolt"></use></svg></div><h3>Attack-type aware response</h3><p>The system doesn't treat all attacks the same. A malware deployment turns a light off. A cryptomining infection dims it. A flood attack makes it flicker. The response maps to the attacker's intent, derived from their own commands.</p><div style={{ marginTop: 'auto', paddingTop: '6px' }}><span className="hp-tag">Command signature classification · Threaded response engine</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="hp-num">02</span><svg className="hp-ic" viewBox="0 0 24 24" style={{ color: 'var(--acc-text)' }} aria-hidden="true"><use href="#hp-h-shield"></use></svg></div><h3>ML bias found and fixed in production</h3><p>The first trained model achieved 1.00 accuracy, which turned out to be a warning sign, not a success. It was over-relying on credential matching and missed attacks from unlisted passwords. Retraining with deliberately varied credentials shifted the top feature from credential matching to command behavior.</p><div style={{ marginTop: 'auto', paddingTop: '6px' }}><span className="hp-tag">Weak labelling · Feature importance analysis · varied_attacks.py</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="hp-num">03</span><svg className="hp-ic" viewBox="0 0 24 24" style={{ color: 'var(--acc-text)' }} aria-hidden="true"><use href="#hp-h-layers"></use></svg></div><h3>Non-blocking concurrent responses</h3><p>Early versions blocked the entire detection loop while waiting for a light to restore. Under rapid multi-session attacks, lights got stuck in their attacked state. A full rewrite used Python threads with a serial write lock so every session's response runs independently.</p><div style={{ marginTop: 'auto', paddingTop: '6px' }}><span className="hp-tag">Python threading · Serial locking · Emergency restore on shutdown</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-span2 hp-reveal"><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="hp-num">04</span><svg className="hp-ic" viewBox="0 0 24 24" style={{ color: 'var(--acc-text)' }} aria-hidden="true"><use href="#hp-h-term"></use></svg></div><h3>Self-authored Mirai-lifecycle attack script</h3><p>Rather than relying on a generic simulation, a custom attack script was built from scratch, faithfully reproducing the documented Mirai stages: port scan, credential brute force, device fingerprinting, payload staging, and persistence attempt. Each step is independently logged.</p><div style={{ marginTop: 'auto', paddingTop: '6px' }}><span className="hp-tag">paramiko · socket · JSON self-logging</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="hp-num">05</span><svg className="hp-ic" viewBox="0 0 24 24" style={{ color: 'var(--acc-text)' }} aria-hidden="true"><use href="#hp-h-wrench"></use></svg></div><h3>Hardware debugging under pressure</h3><p>A MOSFET module appeared non-functional for days despite correct signal reception. Systematic bypass testing (removing the module entirely and powering the LED directly), combined with close-up pad inspection revealed a labelling mismatch between generic documentation and the specific module revision. Fixed by correcting the OUT+ wiring.</p><div style={{ marginTop: 'auto', paddingTop: '6px' }}><span className="hp-tag">XY-MOS D4184 · Isolation testing methodology</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-span2 hp-reveal"><div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="hp-num">06</span><svg className="hp-ic" viewBox="0 0 24 24" style={{ color: 'var(--acc-text)' }} aria-hidden="true"><use href="#hp-h-key"></use></svg></div><h3>Backup administrative access</h3><p>Redirecting port 22 to the honeypot without a fallback access route caused a complete lockout early in development. Recovery required re-imaging the SD card. A secondary SSH service on port 2200 was configured and independently verified before any future port changes, a design pattern now baked into all Pi deployments.</p><div style={{ marginTop: 'auto', paddingTop: '6px' }}><span className="hp-tag">iptables · sshd_config · netfilter-persistent</span></div></article>
      </div>
      </div>
      </section>

      {/* 7. ARCHITECTURE */}
      <section aria-labelledby="hp-arch-h" style={{ padding: '120px 0', background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="hp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '820px' }}>
      <div className="hp-eyebrow">// System architecture</div>
      <h2 id="hp-arch-h" className="hp-hd hp-h2x" style={{ fontSize: '54px' }}>From attacker to <span className="hp-acc">light switch.</span></h2>
      </div>
      <div className="hp-reveal" role="img" aria-label="Architecture diagram: an attacker connects over SSH port 22, iptables redirects to the Cowrie honeypot on port 2222, a Python detection engine reads the logs, then forwards results to a Flask dashboard on port 5000 and to an Arduino Mega that controls three lights." style={{ maxWidth: '920px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <div className="hp-node" style={{ textAlign: 'center' }}><b>Attacker</b><div className="hp-s">Internet / local network</div></div>
      <div className="hp-v"><span>SSH port 22</span></div>
      <div className="hp-node" style={{ textAlign: 'center' }}><b>iptables PREROUTING redirect</b><div className="hp-s">Port 22 → honeypot</div></div>
      <div className="hp-v"><span>port 2222</span></div>
      <div className="hp-node"><b>Cowrie SSH Honeypot, port 2222</b>
      <div className="hp-subs" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}><span>Session capture: credentials, commands, metadata</span><span>JSON log output <code>cowrie.json</code></span><span>SQLite output (partial: input table)</span></div></div>
      <div className="hp-v"><span>log tail</span></div>
      <div className="hp-node hp-node-acc"><b>Python Detection Engine <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontWeight: '500', fontSize: '13px' }}>live_response_typed_v2.py</span></b>
      <div className="hp-subs"><span style={{ background: 'rgba(0,0,0,.12)', borderColor: 'rgba(0,0,0,.2)', color: 'inherit' }}>Log tail loop (real-time event reader)</span><span style={{ background: 'rgba(0,0,0,.12)', borderColor: 'rgba(0,0,0,.2)', color: 'inherit' }}>Feature extraction (7 behavioral features per session)</span><span style={{ background: 'rgba(0,0,0,.12)', borderColor: 'rgba(0,0,0,.2)', color: 'inherit' }}>Rule-based scorer (baseline classification)</span><span style={{ background: 'rgba(0,0,0,.12)', borderColor: 'rgba(0,0,0,.2)', color: 'inherit' }}>Random Forest model <code style={{ color: 'inherit' }}>botnet_model.joblib</code></span><span style={{ background: 'rgba(0,0,0,.12)', borderColor: 'rgba(0,0,0,.2)', color: 'inherit' }}>Attack-type classifier (takedown / cryptomine / flood)</span><span style={{ background: 'rgba(0,0,0,.12)', borderColor: 'rgba(0,0,0,.2)', color: 'inherit' }}>Threaded response dispatcher (serial write lock)</span></div></div>
      <div className="hp-v"></div>
      <div className="hp-fork"></div>
      <div className="hp-arch-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
      <div className="hp-node"><b>Flask Dashboard</b><div className="hp-s"><code className="hp-mono" style={{ fontSize: '12.5px' }}>dashboard_v2.py</code> · port 5000</div><div className="hp-subs" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}><span>Live stats</span><span>ML verdicts</span><span>Feature importance</span><span>Timeline</span></div></div>
      <div className="hp-node" style={{ background: '#050505', borderColor: 'rgba(255,176,32,.45)', color: '#F6F2EE' }}><b>Arduino Mega</b><div className="hp-s" style={{ color: '#B5AEA8' }}>USB serial <code className="hp-mono" style={{ fontSize: '12.5px' }}>/dev/ttyACM0</code></div>
      <div className="hp-lrow"><b>Light 1 · Relay (on/off)</b><code>FORCE:OFF / RESTORE</code></div>
      <div className="hp-lrow"><b>Light 2 · MOSFET PWM</b><code>DIM / FLASH / RESTORE</code></div>
      <div className="hp-lrow"><b>Light 3 · MOSFET PWM</b><code>DIM / FLASH / RESTORE</code></div>
      </div>
      </div>
      </div>
      <p className="hp-reveal" style={{ maxWidth: '920px', margin: '0 auto', fontSize: '16.5px', lineHeight: '1.7', color: 'var(--muted)' }}>Deployed on a Raspberry Pi 4 (2GB) on a local network, with all components running in a Python virtual environment. The Arduino communicates over USB serial at 9600 baud. The dashboard is accessible from any device on the same network.</p>
      </div>
      </section>

      {/* 8. STACK */}
      <section aria-labelledby="hp-stack-h" style={{ padding: '120px 0' }}>
      <div className="hp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="hp-eyebrow">// Technology stack</div>
      <h2 id="hp-stack-h" className="hp-hd hp-h2x" style={{ fontSize: '52px' }}>Software, silicon and <span className="hp-acc">solder.</span></h2>
      </div>
      <div className="hp-reveal" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="hp-stk"><div className="hp-lbl">Detection &amp; Backend</div><div className="hp-chips"><span>Python 3.13</span><span>Cowrie honeypot</span><span>scikit-learn</span><span>pandas</span><span>joblib</span><span>Flask</span><span>SQLite</span><span>PySerial</span><span>paramiko</span></div></div>
      <div className="hp-stk"><div className="hp-lbl">Physical Computing</div><div className="hp-chips"><span>Arduino Mega 2560</span><span>Arduino IDE</span><span>PWM (analogWrite)</span><span>Relay module</span><span>XY-MOS MOSFET</span><span>LDR sensor</span></div></div>
      <div className="hp-stk"><div className="hp-lbl">Infrastructure</div><div className="hp-chips"><span>Raspberry Pi 4</span><span>Raspberry Pi OS Lite (64-bit)</span><span>iptables</span><span>netfilter-persistent</span><span>SSH (OpenSSH)</span></div></div>
      <div className="hp-stk"><div className="hp-lbl">Frontend / Dashboard</div><div className="hp-chips"><span>Flask</span><span>Chart.js</span><span>HTML/CSS/JS</span><span>Jinja2 templates</span></div></div>
      <div className="hp-stk"><div className="hp-lbl">ML &amp; Data</div><div className="hp-chips"><span>Random Forest (scikit-learn)</span><span>Weak labelling</span><span>Feature extraction pipeline</span><span>joblib model serialisation</span></div></div>
      </div>
      </div>
      </section>

      {/* 9. QUALITY */}
      <section aria-label="Research quality" style={{ padding: '0 0 120px' }}>
      <div className="hp-wrap hp-g-3">
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-wrench"></use></svg></div><h3>Empirical debugging methodology</h3><p>Every hardware and software fault was diagnosed by isolating variables and testing hypotheses one at a time, not guesswork. Each bug is documented with its root cause, the diagnostic steps taken, and the verified fix.</p></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-eye"></use></svg></div><h3>Honest evaluation</h3><p>A 1.00 model accuracy was treated as a red flag, not a success. The team actively looked for failure cases in live testing, found one, traced it to a feature bias, and corrected it, with before/after evidence.</p></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-ico"><svg className="hp-ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-loop"></use></svg></div><h3>Research gap addressed</h3><p>Prior honeypot research stops at the log file. This system closes the loop by connecting detection to a physical, reversible consequence, translating an abstract log event into something a non-technical audience can see and understand.</p></article>
      </div>
      </section>

      {/* 10. OUTCOME */}
      <section aria-labelledby="hp-out-h" style={{ padding: '110px 0', background: 'var(--bg2)', borderTop: '1px solid var(--line)' }}>
      <div className="hp-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
      <div className="hp-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px' }}>
      <div className="hp-eyebrow">// Outcome</div>
      <h2 id="hp-out-h" className="hp-hd hp-h2x" style={{ fontSize: '50px' }}>A complete loop, from <span className="hp-acc">attack capture to physical response.</span></h2>
      <p className="hp-lede">The system successfully demonstrates a complete, working pipeline from attack capture to classification to physical response, a loop that existing honeypot literature does not close.</p>
      </div>
      <div className="hp-g-2">
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-chk"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-check"></use></svg><span>Security researchers get a reproducible, open methodology for connecting honeypot detection to physical actuators.</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-chk"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-check"></use></svg><span>The ML correction cycle (credential bias → command behavior) is a documented, evidence-based example of diagnosing and fixing a model in production.</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-chk"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-check"></use></svg><span>Three distinct attack types (takedown, cryptomining, flood) produce three visibly different physical outcomes, making abstract threat classifications tangible.</span></div></article>
      <article className="hp-glass hp-lift hp-bcard hp-reveal"><div className="hp-chk"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#hp-h-check"></use></svg><span>The codebase is structured, documented, and reproducible on any Raspberry Pi + Arduino setup.</span></div></article>
      </div>
      </div>
      </section>

      {/* 11. CLOSING */}
      <section aria-labelledby="hp-end-h" style={{ position: 'relative', overflow: 'hidden', padding: '140px 0 150px', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '55%', width: '1100px', height: '700px', transform: 'translate(-50%, -50%)', background: 'radial-gradient(closest-side, var(--glow), transparent)', filter: 'blur(20px)' }}></div>
      <div className="hp-wrap hp-reveal" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '26px' }}>
      <svg viewBox="0 0 120 120" style={{ width: '96px', height: '96px', display: 'block', '--lg-bg': 'var(--bg)' }} aria-hidden="true"><use href="#hp-hl"></use></svg>
      <h2 id="hp-end-h" className="hp-hd hp-h2x" style={{ fontSize: '48px', maxWidth: '900px' }}>Built by ENDERMONKS as part of a BSc Cybersecurity dissertation research programme.</h2>
      <p className="hp-lede" style={{ maxWidth: '680px' }}>This project was designed, implemented, debugged and evaluated entirely in-house, from hardware wiring to ML model training to production bug fixes. It is part of ENDERMONKS' growing portfolio of research-grade technical work.</p>
      <a href="/#work" style={{ textDecoration: 'none', fontSize: '15px', color: 'var(--muted)' }}>← Back to all work</a>
      </div>
      </section>
      </main>
    </>
  );
}
