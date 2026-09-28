import { useEffect, useRef, useState } from 'react';
import {
  LuInbox, LuBookUser, LuVault, LuTimer, LuFileText, LuMap, LuCoins, LuCalendarClock, LuBookOpen,
  LuPercent, LuUsers, LuKeyRound, LuFiles, LuMessageCircle, LuDatabaseZap, LuChartLine, LuCompass,
  LuMapPin, LuLink, LuShieldCheck, LuLayers, LuZap, LuArrowRight, LuCheck, LuPlay, LuPlane,
} from 'react-icons/lu';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import './wct.css';

// Palette — the client's blues on the site's black.
const SKY = '#0E96D8';
const SOFT = '#8BD0F2';
const BRAND = '#1B458F';
const DANGER = '#F04438';
const GREEN = '#22C55E';

const LIVE_URL = 'https://world-class-travels.vercel.app/';

const STATS = [
  { n: 4,      label: 'Connected applications',    note: 'Public site, traveller portal, partner portal, operations console' },
  { n: 28,     label: 'Operations modules',        note: 'From the leads inbox to the audit trail' },
  { n: 45,     label: 'Visa destinations',         note: 'Each with its own document checklist', suffix: '+' },
  { n: 64,     label: 'Data models',               note: 'Behind the platform' },
  { n: 140,    label: 'Permission controls',       note: 'For role-based access', suffix: '+' },
  { n: 6,      label: 'Automated background jobs', note: 'Reminders, fare deadlines, exchange rates and payments' },
  { n: 110000, label: 'Lines of code',             note: 'Written, reviewed and running in production', prefix: '~' },
  { n: 220,    label: 'Production iterations',     note: 'Over 10 months, since December 2025', suffix: '+' },
];

const BENTO = [
  { Icon: LuMap, title: 'Holiday package builder', body: 'Day-by-day itineraries, seasonal pricing, fixed departure dates and seat limits for group tours, all managed from the console and published straight to the website.', tag: 'Inventory-aware departures' },
  { Icon: LuCoins, title: 'Multi-currency without the headache', body: "Suppliers are paid in USD, AUD or EUR while travellers pay in LKR. The exchange rate is locked at quote time, so margins are always visible and currency moves don't eat the profit.", tag: 'Daily FX rate job · rate snapshots per quote' },
  { Icon: LuCalendarClock, title: 'Instalments and payment tracking', body: 'Advances, split payments, balances due before departure and automatic reminders. Clients can pay online by card or upload a bank transfer slip for the team to verify.', tag: 'PayHere gateway · slip verification queue' },
  { Icon: LuBookOpen, title: 'Supplier ledger and true margins', body: 'Airlines, consolidators, hotels, ground handlers and visa centres each have their own ledger. The cost price and selling price of every booking are tracked separately.', tag: 'Dual-rate booking model' },
  { Icon: LuPercent, title: 'Partner and staff commissions', body: 'Sub-agents earn commission on what they sell. Consultants are credited for the bookings they close. Both are calculated automatically.' },
  { Icon: LuUsers, title: 'Group and family bookings', body: 'Corporate trips, student groups and family holidays are managed as one booking with many travellers, each with their own visa file, ticket and rooming assignment.' },
  { Icon: LuKeyRound, title: 'Enterprise-grade access control', body: 'More than 140 fine-grained permissions, custom roles, OTP-protected admin logins, session management and a complete activity log of who viewed or changed what, which matters most for passport data.' },
  { Icon: LuFiles, title: 'Automatic documents', body: 'Invoices, receipts, quotations, itineraries, visa cover letters and payment statements are generated as branded PDFs, and reports export to Excel.', tag: 'Puppeteer · Handlebars · SheetJS' },
  { Icon: LuMessageCircle, title: 'Messaging that keeps travellers calm', body: 'WhatsApp, SMS and email updates go out when a visa changes status, a payment is due, a ticket is issued or departure is 48 hours away.', tag: 'Meta WhatsApp Cloud API · Twilio · Nodemailer' },
  { Icon: LuDatabaseZap, title: 'Years of records, cleaned and imported', body: 'Thousands of past clients were moved in from spreadsheets. Duplicate accounts were detected and merged using email normalisation, and phone numbers were converted to the international E.164 format.' },
];

const STACK = [
  ['Frontend', ['React 19', 'Vite', 'React Router 7', 'Tailwind CSS', 'GSAP', 'Motion', 'Lucide', 'React Icons', 'React Toastify', 'React Markdown', 'i18next (English, Sinhala, Tamil)', 'Recharts']],
  ['Backend', ['Node.js 20', 'Express 5', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'express-validator', 'Multer', 'BullMQ', 'Redis']],
  ['Documents & Data', ['Puppeteer', 'Handlebars', 'SheetJS / xlsx']],
  ['Cloud & Infrastructure', ['AWS EC2', 'MongoDB Atlas', 'Cloudinary', 'Docker', 'Docker Compose', 'Nginx', "Let's Encrypt / Certbot", 'Health-checked containers']],
  ['Communications & Payments', ['Meta WhatsApp Cloud API', 'Twilio', 'Nodemailer', 'PayHere']],
  ['Engineering', ['Git branch-based dev and production workflow', 'Versioned data migrations', 'Seed scripts', 'Migration from Create React App to Vite']],
];

const QUALITY = [
  { Icon: LuShieldCheck, title: 'Trust by design', text: 'Sign-up uses email OTP. Unverified accounts delete themselves after 10 minutes. Account creation and every money movement run inside atomic database transactions. Passport documents are protected by permissions and recorded in the audit log.' },
  { Icon: LuLayers, title: 'Built to evolve', text: 'The site began as a visa catalogue and a flight request form. Because of modular services and a central permission registry, packages, payments, the partner portal and multi-currency were added without rewrites.' },
  { Icon: LuZap, title: 'Built for peak season', text: 'Stateless containers, background job queues and a CDN for media mean the platform handles December and April holiday rushes without slowing down.' },
];

const OUTCOMES = [
  { Icon: LuChartLine, who: 'Owners', text: 'See live sales by destination, margins per booking, and who still owes what.' },
  { Icon: LuCompass, who: 'Consultants', text: 'Turn an enquiry into a branded quote in minutes and never miss a fare deadline.' },
  { Icon: LuMapPin, who: 'Travellers', text: "Always know where their visa stands, what they've paid and what they still need to send." },
  { Icon: LuLink, who: 'Partner agents', text: 'Sell World Class Travels products under their own relationships and see their commission in real time.' },
];

const BEFORE_AFTER = [
  ['WhatsApp threads', 'One lead inbox'],
  ['Photocopied passports', 'Secure document vault'],
  ['Excel payment sheets', 'Automatic instalment tracking'],
  ['Missed fare holds', 'Live countdown alerts'],
];

const STARS = [[12, 14, 3, -1], [31, 9, 2, -2.4], [47, 19, 3, -0.4], [66, 11, 2, -3], [82, 22, 3, -1.7], [92, 8, 2, -2], [22, 30, 2, -0.9], [58, 28, 2, -2.2]];
const CLOUDS = [[46, 520, 150, 90, -8], [60, 720, 190, 120, -70], [34, 400, 110, 75, -40], [70, 600, 160, 100, -20], [24, 460, 120, 110, -95]];

// Live fare-hold timer (HH:MM:SS), counting down from `from` seconds.
function Countdown({ from, className = '', style }) {
  const [s, setS] = useState(from);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <b className={`wct-mono font-normal ${className}`} style={{ color: DANGER, ...style }}>
      {pad(Math.floor(s / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}
    </b>
  );
}

// Flight path: a dotted line zig-zagging down the page margins, with a plane that travels along
// it as you scroll and lands next to the final call-to-action button.
function useFlightPath() {
  const mainRef = useRef(null);
  const ctaRef = useRef(null);
  const svgRef = useRef(null);
  const baseRef = useRef(null);
  const doneRef = useRef(null);
  const clipRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const svg = svgRef.current;
    if (!main || !svg) return undefined;
    let len = 0;
    let startY = 0;
    let endY = 0;

    const movePlane = () => {
      const pathEl = baseRef.current;
      if (!pathEl || !len) return;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const t = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const targetY = startY + t * (endY - startY);
      // Binary-search the path length for the point at the target height.
      let lo = 0;
      let hi = len;
      for (let i = 0; i < 22; i++) {
        const mid = (lo + hi) / 2;
        if (pathEl.getPointAtLength(mid).y <= targetY) lo = mid; else hi = mid;
      }
      const p1 = pathEl.getPointAtLength(lo);
      const p2 = pathEl.getPointAtLength(Math.min(len, lo + 4));
      const ang = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
      planeRef.current.setAttribute('transform', `translate(${p1.x} ${p1.y}) rotate(${ang + 45})`);
      clipRef.current.setAttribute('height', Math.max(0, p1.y));
    };

    const build = () => {
      const mr = main.getBoundingClientRect();
      const W = mr.width;
      if (W < 1180) return;
      const secs = Array.from(main.querySelectorAll('[data-fp]'));
      const btn = ctaRef.current;
      if (secs.length < 10 || !btn) return;
      const tops = secs.map((s) => s.getBoundingClientRect().top - mr.top);
      const xL = W * 0.018;
      const xR = W * 0.982;
      const heroH = secs[0].getBoundingClientRect().height;
      const pts = [{ x: xL, y: tops[0] + heroH * 0.7 }];
      let left = true;
      for (let i = 1; i <= 8; i++) {
        pts.push({ x: left ? xL : xR, y: tops[i] - 70 });
        pts.push({ x: left ? xR : xL, y: tops[i] + 60 });
        left = !left;
      }
      const br = btn.getBoundingClientRect();
      const qy = br.top - mr.top + br.height / 2;
      const qx = br.left - mr.left - 34;
      pts.push({ x: pts[pts.length - 1].x, y: qy - 300 });
      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dy = (b.y - a.y) / 2;
        d += ` C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
      }
      const end = pts[pts.length - 1];
      d += ` C${end.x} ${qy} ${qx - (qx - end.x) * 0.45} ${qy} ${qx} ${qy}`;
      svg.setAttribute('viewBox', `0 0 ${W} ${mr.height}`);
      baseRef.current.setAttribute('d', d);
      doneRef.current.setAttribute('d', d);
      clipRef.current.setAttribute('width', W);
      len = baseRef.current.getTotalLength();
      startY = pts[0].y;
      endY = qy;
      movePlane();
    };

    window.addEventListener('scroll', movePlane, { passive: true });
    window.addEventListener('resize', build);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null;
    ro?.observe(main);
    document.fonts?.ready?.then(build);
    const late = setTimeout(build, 300);
    build();
    return () => {
      window.removeEventListener('scroll', movePlane);
      window.removeEventListener('resize', build);
      ro?.disconnect();
      clearTimeout(late);
    };
  }, []);

  return { mainRef, ctaRef, svgRef, baseRef, doneRef, clipRef, planeRef };
}

function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-[#6f86ab] mb-4 before:block before:w-8 before:h-px before:bg-[#6f86ab]">
      {children}
    </p>
  );
}

function Heading({ id, children, className = '' }) {
  return (
    <h2 id={id} className={`font-bebas text-white uppercase ${className}`} style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', lineHeight: 0.95 }}>
      {children}
    </h2>
  );
}

const Accent = ({ children }) => <em className="font-fade not-italic text-[#8BD0F2]">{children}</em>;

function BrowserBar({ label }) {
  return <div className="wct-browser-top"><i /><i /><i /><div className="wct-url">{label}</div></div>;
}

function Logo({ className = '' }) {
  return <span className={`wct-logo ${className}`}><img src="/logo/world-class-logo.png" alt="World Class Travels" /></span>;
}

function LiveSiteButton({ size = 'lg' }) {
  const big = size === 'lg';
  return (
    <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className={`wct-live-btn w-fit ${big ? 'px-7 py-5' : 'px-6 py-4'}`}>
      <span className="flex flex-col items-start leading-none">
        <span className={`font-bebas tracking-[0.06em] ${big ? 'text-[1.9rem]' : 'text-[1.5rem]'}`}>Visit the Live Site</span>
        <span className="wct-mono text-[0.68rem] tracking-[0.05em] opacity-75 mt-1">world-class-travels.vercel.app</span>
      </span>
      <span aria-hidden="true" className={big ? 'text-[1.6rem]' : 'text-[1.3rem]'}>↗</span>
    </a>
  );
}

function Check({ done }) {
  return done ? (
    <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-black" style={{ background: GREEN }}><LuCheck size={10} strokeWidth={4} /></span>
  ) : (
    <span className="block w-4 h-4 rounded-full border-2 border-[#2a4270] shrink-0" />
  );
}

function AppRow({ num, audience, title, text, reverse, children }) {
  return (
    <article className="reveal grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
      <div className="flex flex-col gap-4">
        <span className="wct-mono text-[0.75rem] text-[#8BD0F2]">{num} · {audience}</span>
        <h3 className="font-bebas text-white uppercase tracking-[0.02em] text-[2.6rem] leading-none">{title}</h3>
        <p className="text-[1.02rem] leading-relaxed text-grey-6">{text}</p>
      </div>
      <div className={reverse ? 'lg:order-first' : ''}>{children}</div>
    </article>
  );
}

function BentoCard({ span, Icon, title, tag, big, children }) {
  return (
    <SpotlightCard
      className={`reveal ${span} !rounded-none !border-0 !bg-[#050c1a] !p-8 flex flex-col gap-3.5 ${big ? 'lg:min-h-[420px]' : ''}`}
      spotlightColor="rgba(14, 150, 216, 0.22)"
    >
      <div className="relative wct-ico"><Icon /></div>
      <h3 className={`relative text-white leading-snug ${big ? 'text-[1.4rem]' : 'text-[1.15rem]'}`}>{title}</h3>
      <div className="relative flex flex-col gap-3 text-[0.92rem] leading-relaxed text-grey-6">{children}</div>
      {tag && <div className="relative mt-auto pt-2"><span className="wct-tech">{tag}</span></div>}
    </SpotlightCard>
  );
}

function HeroSky() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 45% at 78% 88%, rgba(14,150,216,.35), transparent 70%), radial-gradient(90% 60% at 20% 10%, rgba(27,69,143,.4), transparent 70%)' }} />
      {STARS.map(([l, t, s, d], i) => (
        <span key={i} className="wct-star absolute rounded-full bg-white" style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, animationDelay: `${d}s` }} />
      ))}
      {CLOUDS.map(([t, w, h, dur, delay], i) => (
        <span key={i} className="wct-cl" style={{ left: 0, top: `${t}%`, width: w, height: h, animationDuration: `${dur}s`, animationDelay: `${delay}s` }} />
      ))}
      <div className="wct-fly absolute left-0 top-[30%] w-full">
        <div className="flex items-center w-[260px]">
          <span className="flex-1 border-t-2 border-dotted border-white/40 mr-2" />
          <LuPlane size={32} className="text-white rotate-45 shrink-0" />
        </div>
      </div>
      <svg viewBox="0 0 1440 230" preserveAspectRatio="xMidYMax slice" className="absolute left-0 bottom-0 w-full h-[230px] block">
        <g fill="#071737" opacity="0.9">
          <rect x="0" y="120" width="70" height="110" /><rect x="70" y="90" width="55" height="140" /><rect x="125" y="140" width="80" height="90" /><rect x="215" y="70" width="60" height="160" /><rect x="290" y="110" width="90" height="120" /><rect x="400" y="60" width="50" height="170" /><rect x="470" y="130" width="100" height="100" /><rect x="590" y="95" width="60" height="135" /><rect x="680" y="120" width="80" height="110" /><rect x="790" y="50" width="56" height="180" /><rect x="860" y="105" width="90" height="125" /><rect x="970" y="80" width="64" height="150" /><rect x="1050" y="135" width="100" height="95" /><rect x="1170" y="65" width="58" height="165" /><rect x="1240" y="110" width="80" height="120" /><rect x="1340" y="85" width="100" height="145" />
        </g>
        <g fill="#000">
          <rect x="0" y="170" width="120" height="60" /><rect x="110" y="150" width="70" height="80" /><rect x="190" y="180" width="100" height="50" /><rect x="300" y="140" width="64" height="90" /><polygon points="364,230 364,100 384,100 392,20 400,100 420,100 420,230" /><rect x="430" y="165" width="120" height="65" /><rect x="560" y="150" width="76" height="80" /><rect x="650" y="180" width="140" height="50" /><rect x="800" y="135" width="66" height="95" /><rect x="876" y="170" width="110" height="60" /><rect x="996" y="120" width="80" height="110" /><polygon points="1090,230 1090,110 1150,110 1150,230" /><rect x="1160" y="160" width="130" height="70" /><rect x="1300" y="130" width="70" height="100" /><rect x="1370" y="175" width="70" height="55" />
        </g>
        <g fill={SOFT}>
          {[[82, 112, 0], [98, 128, -1.5], [228, 96, -2.5], [245, 126, -0.8], [312, 152, -3.2], [392, 46, -2], [811, 150, -1.1], [1008, 140, -2.9], [1110, 130, -0.3], [1312, 150, -1.9]].map(([x, y, d]) => (
            <rect key={x} className="wct-star" x={x} y={y} width="4" height="6" style={{ animationDelay: `${d}s` }} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.6) 45%, rgba(0,0,0,.1) 100%), linear-gradient(0deg, rgba(0,0,0,.8) 0%, transparent 40%)' }} />
    </div>
  );
}

function ChallengeCollage() {
  const bubble = (mine) => ({
    background: mine ? '#DCF8C6' : '#fff',
    borderRadius: mine ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
    margin: mine ? '0 0 8px auto' : '0 0 8px 0',
  });
  const cell = 'px-2 py-1.5 border-b border-[#EDF0F5]';
  return (
    <div className="reveal relative h-[560px] hidden sm:block text-[#0B1B36]" role="img" aria-label="Collage of a WhatsApp chat, an Excel sheet with pending cells and stacked paper passports">
      <div className="absolute left-0 top-2.5 w-[330px] bg-[#E7DFCF] rounded-[22px] p-4 -rotate-3" style={{ boxShadow: '0 30px 50px -28px rgba(0,0,0,.9)' }}>
        <div className="text-[12px] font-bold text-[#075E54] mb-3">Family trip · Australia</div>
        <div className="px-3 py-2.5 text-[13px] max-w-[82%]" style={bubble(false)}>Sending passport copy now</div>
        <div className="px-3 py-2.5 text-[13px] max-w-[70%] flex gap-2 items-center" style={bubble(false)}><span className="block w-[26px] h-8 bg-[#D8E0EA] rounded shrink-0" />IMG_4421.jpg</div>
        <div className="px-3 py-2.5 text-[13px] max-w-[74%]" style={bubble(true)}>Is the Sydney fare still available?</div>
        <div className="px-3 py-2.5 text-[13px] max-w-[78%]" style={bubble(false)}>Any update on my visa??</div>
        <div className="px-3 py-2.5 text-[13px] max-w-[60%]" style={{ ...bubble(true), marginBottom: 0 }}>Checking, one minute</div>
      </div>
      <div className="absolute right-0 top-0 w-[300px] bg-white rounded-xl border border-[#D0D8E2] rotate-3 overflow-hidden" style={{ boxShadow: '0 30px 50px -28px rgba(0,0,0,.9)' }}>
        <div className="bg-[#1D6F42] text-white text-[11px] font-bold px-2.5 py-1.5">payments_FINAL_v7.xlsx</div>
        <div className="grid grid-cols-[1.3fr_1fr_1fr] text-[11px]">
          {['Name', 'Visa', 'Paid?'].map((h) => <span key={h} className="px-2 py-1.5 bg-[#EEF2F7] font-bold border-b border-[#DDE3EB]">{h}</span>)}
          <span className={cell}>Perera family</span><span className={cell}>AU x5</span><span className={`${cell} bg-[#FFF1B8]`}>half?</span>
          <span className={cell}>Fernando</span><span className={cell}>CA</span><span className={`${cell} bg-[#FFD0CC]`}>PENDING</span>
          <span className={cell}>Silva group</span><span className={cell}>JP x12</span><span className={`${cell} bg-[#FFF1B8]`}>2 of 3</span>
          <span className="px-2 py-1.5">Jayasinghe</span><span className="px-2 py-1.5">???</span><span className="px-2 py-1.5 bg-[#FFD0CC]">PENDING</span>
        </div>
      </div>
      {[['left-[30px] bottom-[30px] -rotate-[9deg]', '#7A2E3B'], ['left-[150px] bottom-1.5 rotate-6', '#1F3D6E']].map(([pos, bg]) => (
        <div key={bg} className={`absolute ${pos} w-[190px] h-[250px] rounded-xl flex flex-col items-center justify-center gap-3 text-[#E8C877]`} style={{ background: bg, boxShadow: '0 24px 40px -22px rgba(0,0,0,.9)' }}>
          <LuMapPin size={44} />
          <span className="text-[13px] font-bold tracking-[0.2em]">PASSPORT</span>
        </div>
      ))}
      <div className="absolute right-5 bottom-[60px] w-[200px] bg-[#FFE98A] p-4 rotate-[4deg] text-[15px] font-bold leading-snug text-[#3A2E00]" style={{ boxShadow: '0 24px 36px -22px rgba(0,0,0,.9)' }}>
        Fare hold expires in 24h. Who is issuing this?
      </div>
    </div>
  );
}

function PublicSiteMockup() {
  return (
    <div className="wct-browser">
      <BrowserBar label="worldclasstravels.lk" />
      <div className="relative h-[170px] overflow-hidden" style={{ background: `linear-gradient(135deg, #06122B, ${SKY})` }}>
        <div className="absolute -right-8 -bottom-10 w-[200px] h-[200px] rounded-full bg-white/10" />
        <div className="absolute left-[18px] bottom-4 text-white">
          <div className="text-[9px] opacity-80 tracking-[0.14em]">DESTINATION STORY</div>
          <div className="font-bebas text-[1.6rem] tracking-[0.04em] leading-none mt-1">Kyoto in autumn</div>
        </div>
        <div className="absolute right-[18px] top-4 w-[34px] h-[34px] rounded-full bg-white/90 text-[#06122B] flex items-center justify-center"><LuPlay size={15} /></div>
      </div>
      <div className="p-4 grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-3.5">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-white">Visa catalogue</div>
          <div className="h-[26px] rounded-lg bg-[#0b1830] flex items-center px-2.5 text-[9px] text-[#6f86ab]">Search a country…</div>
          {[['Australia', '15–20 days'], ['Canada', '25–30 days'], ['Japan', '7–10 days']].map(([c, d]) => (
            <div key={c} className="wct-tile flex justify-between items-center gap-2 px-2.5 py-2 rounded-lg">
              <span className="text-[10px] text-white">{c}</span>
              <span className="wct-pill" style={{ background: 'rgba(14,150,216,.15)', color: SOFT }}>{d}</span>
            </div>
          ))}
        </div>
        <div className="wct-tile rounded-xl p-3 flex flex-col gap-2">
          <div className="text-[10px] text-white">Request a flight</div>
          <div className="flex gap-1 flex-wrap">
            <span className="wct-pill text-white" style={{ background: BRAND }}>One-way</span>
            <span className="wct-pill bg-[#16284a] text-[#8aa0c4]">Round-trip</span>
            <span className="wct-pill bg-[#16284a] text-[#8aa0c4]">Multi-city</span>
          </div>
          {['Colombo (CMB)', 'Melbourne (MEL)'].map((a) => (
            <div key={a} className="rounded-md bg-[#040a16] border border-[#16284a] text-[9px] text-grey-6 px-2 py-1">{a}</div>
          ))}
          <div className="flex gap-1.5"><span className="wct-pill border border-[#16284a] text-[#8aa0c4]">Economy</span><span className="wct-pill border border-[#16284a] text-[#8aa0c4]">2 adults</span></div>
          <div className="flex gap-1.5">
            <span className="wct-pill text-white !px-2.5 !py-1.5" style={{ background: SKY }}>Send request</span>
            <span className="wct-pill text-[#06331B] !px-2.5 !py-1.5" style={{ background: '#25D366' }}>WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TravellerMockup() {
  const steps = [['Documents pending', '1 document still needed', 'now'], ['Submitted'], ['Appointment booked'], ['Approved']];
  const docs = [['Passport copy', true], ['Passport photo', true], ['Bank statement', true], ['Employment letter', false]];
  return (
    <div className="flex justify-center items-end py-5" style={{ background: 'radial-gradient(60% 60% at 50% 60%, rgba(14,150,216,.18), transparent 75%)' }}>
      <div className="wct-phone w-[290px] shrink-0 relative z-[2]">
        <div className="wct-screen h-[580px] flex flex-col">
          <div className="px-[18px] pt-[26px] pb-4 text-white" style={{ background: '#06122B' }}>
            <div className="flex justify-between items-center"><span className="text-[10px] opacity-75">Visa tracker</span><span className="wct-pill bg-white/10 text-white">Family · 5</span></div>
            <div className="flex items-center gap-2.5 mt-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center text-[12px]" style={{ background: SKY }}>AU</span>
              <div><div className="font-bebas text-[1.35rem] tracking-[0.03em] leading-none">Australia visa</div><div className="text-[10px] opacity-75 mt-0.5">Application · Amara P.</div></div>
            </div>
          </div>
          <div className="p-3.5 flex flex-col gap-3 flex-1">
            <div className="wct-tile rounded-2xl p-3.5">
              <div className="relative pl-[26px] flex flex-col gap-4">
                <span className="absolute left-2 top-2 bottom-2 w-0.5 bg-[#1f3560]" />
                {steps.map(([t, sub, now]) => (
                  <div key={t} className="relative">
                    <span
                      className="absolute -left-[26px] top-px w-[18px] h-[18px] rounded-full box-border"
                      style={now ? { background: SKY, boxShadow: '0 0 0 4px rgba(14,150,216,.25)' } : { background: '#07101f', border: '2px solid #2a4270' }}
                    />
                    <div className={`text-[11px] ${now ? 'text-white' : 'text-[#6f86ab]'}`}>{t}</div>
                    {sub && <div className="text-[9px] text-[#6f86ab]">{sub}</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="wct-tile rounded-2xl p-3.5 flex flex-col gap-2.5">
              <div className="text-[11px] text-white">Documents</div>
              {docs.map(([d, ok]) => (
                <div key={d} className="flex items-center gap-2 text-[10px] text-grey-6">
                  <Check done={ok} />{d}
                  {!ok && <span className="wct-pill ml-auto" style={{ background: 'rgba(14,150,216,.18)', color: SOFT }}>Upload</span>}
                </div>
              ))}
            </div>
            <div className="mt-auto text-center text-white text-[13px] py-3 rounded-full" style={{ background: SKY }}>Pay next instalment</div>
          </div>
        </div>
      </div>
      <div className="wct-phone hidden md:block w-[210px] -ml-11 -mb-7 shrink-0 relative z-[1] rotate-[4deg]">
        <div className="wct-screen h-[430px] px-3 pt-[22px] pb-3 flex flex-col gap-2.5">
          <div className="text-[11px] text-white">Family account</div>
          <div className="flex gap-1.5">
            {[['A', SKY], ['K', BRAND], ['N', SOFT], ['S', '#2a4270']].map(([l, c]) => (
              <span key={l} className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] text-white" style={{ background: c }}>{l}</span>
            ))}
            <span className="block w-[30px] h-[30px] rounded-full border-2 border-dashed border-[#2a4270]" />
          </div>
          <div className="wct-tile rounded-xl p-2.5">
            <div className="text-[10px] text-white">E-ticket · CMB → MEL</div>
            <span className="wct-sk mt-2 w-[70%]" /><span className="wct-sk mt-1 w-[45%]" />
            <div className="wct-pill mt-2" style={{ background: 'rgba(14,150,216,.18)', color: SOFT }}>Download</div>
          </div>
          <div className="wct-tile rounded-xl p-2.5 text-[9px] text-[#8aa0c4] flex flex-col gap-0.5">
            <div className="text-[10px] text-white mb-1">Pre-departure checklist</div>
            <span>Passport valid 6+ months</span><span>Travel insurance added</span><span>Airport transfer confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerMockup() {
  const commissions = [['Visa · Canada', 'Net rate booking', '6,000'], ['Package · Bangkok', '4 travellers', '18,400'], ['Flight · CMB → DXB', '2 passengers', '3,200']];
  return (
    <div className="flex justify-center items-center gap-6 flex-wrap py-5" style={{ background: 'radial-gradient(60% 60% at 50% 55%, rgba(14,150,216,.18), transparent 75%)' }}>
      <div className="wct-phone w-[270px] shrink-0">
        <div className="wct-screen h-[520px] flex flex-col">
          <div className="px-[18px] pt-[26px] pb-5 text-white" style={{ background: '#06122B' }}>
            <div className="text-[10px] opacity-75">Partner portal</div>
            <div className="text-[10px] opacity-80 mt-3.5">Commission wallet</div>
            <div className="font-bebas text-[2.2rem] tracking-[0.02em] leading-none mt-1">LKR 184,250</div>
            <div className="text-[10px] mt-1" style={{ color: SOFT }}>+ LKR 42,600 earned this month</div>
          </div>
          <div className="p-3.5 flex flex-col gap-2.5 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {[['Credit wallet', 'LKR 320,000'], ['My customers', '46']].map(([k, v]) => (
                <div key={k} className="wct-tile rounded-xl p-2.5"><div className="text-[9px] text-[#6f86ab]">{k}</div><div className="text-[11px] text-white mt-1">{v}</div></div>
              ))}
            </div>
            <div className="text-[11px] text-white mt-1">Recent commissions</div>
            {commissions.map(([t, s, v]) => (
              <div key={t} className="wct-tile rounded-xl px-3 py-2.5 flex justify-between items-center text-[10px]">
                <span className="text-white">{t}<br /><span className="text-[#6f86ab]">{s}</span></span>
                <b className="font-normal" style={{ color: GREEN }}>+ LKR {v}</b>
              </div>
            ))}
            <div className="mt-auto text-center text-white text-[13px] py-3 rounded-full" style={{ background: SKY }}>Top up credit wallet</div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-[230px] p-5 flex-col gap-2.5 bg-[#050c1a] border border-[#15294d]" style={{ boxShadow: '0 30px 50px -30px rgba(0,0,0,.9)' }}>
        <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8BD0F2]">Net rates</div>
        <div className="flex justify-between text-[0.85rem]"><span className="text-grey-5">Public price</span><span className="line-through text-grey-5">LKR 96,000</span></div>
        <div className="flex justify-between text-[0.85rem]"><span className="text-grey-5">Partner net rate</span><span className="text-white">LKR 88,500</span></div>
        <div className="flex justify-between text-[0.85rem] border-t border-[#15294d] pt-2.5"><span className="text-grey-5">Your commission</span><span style={{ color: SOFT }}>+ LKR 3,600</span></div>
      </div>
    </div>
  );
}

function ConsoleMockup() {
  const nav = ['Leads', 'Visa Cases', 'Ticketing', 'Packages', 'Quotes', 'Payments', 'Suppliers', 'Reports'];
  const kpis = [['Open leads', '128', '+ 12 today'], ['Visa files in progress', '74', '9 need documents'], ['Fare holds expiring today', '9', 'Act now', true], ['Payments due', '17', '3 slips to verify']];
  const sales = [['Australia', 92, BRAND], ['Canada', 71, BRAND], ['Singapore', 58, SKY], ['Japan', 44, SKY], ['Thailand', 31, SOFT]];
  const holds = [['CMB → MEL', 2, 2529, true], ['CMB → SIN', 1, 1651, true], ['CMB → YYZ', 4, 10943], ['CMB → NRT', 2, 18124]];
  return (
    <div className="wct-browser max-w-[1040px] mx-auto w-full">
      <BrowserBar label="console · Dashboard" />
      <div className="flex min-h-[470px]">
        <div className="hidden md:flex w-[176px] shrink-0 bg-black border-r border-[#16284a] px-3 py-[18px] flex-col gap-1.5">
          <div className="flex items-center gap-2 px-2 pb-3 text-white text-[11px]"><LuPlane size={18} style={{ color: SOFT }} />Console</div>
          <div className="text-[11px] text-white px-2.5 py-2 rounded-lg" style={{ background: 'rgba(14,150,216,.22)' }}>Dashboard</div>
          {nav.map((n) => <div key={n} className="text-[11px] text-[#8aa0c4] px-2.5 py-2">{n}</div>)}
          <div className="text-[10px] text-[#4d6590] px-2.5 py-2 mt-auto">+ 19 more modules</div>
        </div>
        <div className="flex-1 min-w-0 p-5 flex flex-col gap-3.5 bg-[#040a16]">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5">
            {kpis.map(([k, v, s, hot]) => (
              <div key={k} className="rounded-xl p-3 border" style={hot ? { background: 'rgba(240,68,56,.08)', borderColor: 'rgba(240,68,56,.35)' } : { background: '#0b1830', borderColor: '#16284a' }}>
                <div className="text-[10px]" style={{ color: hot ? DANGER : '#6f86ab' }}>{k}</div>
                <div className="font-bebas text-[2rem] leading-none mt-1" style={{ color: hot ? DANGER : '#fff' }}>{v}</div>
                <div className="text-[9px]" style={{ color: hot ? DANGER : k === 'Open leads' ? GREEN : '#6f86ab' }}>{s}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-3 flex-1">
            <div className="wct-tile rounded-xl p-4 flex flex-col gap-3">
              <div className="text-[11px] text-white">Sales by destination</div>
              {sales.map(([c, w, col]) => (
                <div key={c} className="flex items-center gap-2.5 text-[10px]">
                  <span className="w-[70px] text-[#8aa0c4]">{c}</span>
                  <span className="flex-1 h-3 rounded-md bg-[#16284a] block"><span className="block h-full rounded-md" style={{ width: `${w}%`, background: col }} /></span>
                </div>
              ))}
            </div>
            <div className="wct-tile rounded-xl p-4 flex flex-col gap-2">
              <div className="text-[11px] text-white">Fare holds expiring</div>
              {holds.map(([r, pax, sec, urgent]) => (
                <div key={r} className="flex justify-between items-center px-2.5 py-2 rounded-lg text-[10px]" style={{ background: urgent ? 'rgba(240,68,56,.1)' : '#07101f' }}>
                  <span className="text-grey-6"><span className="text-white">{r}</span> · {pax} pax</span>
                  <Countdown from={sec} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuotePdf() {
  const lines = [['Flights × 5', '1,425,000'], ['Hotels · 3 nights', '610,000'], ['Visas × 5', '175,000'], ['Insurance', '62,500'], ['Airport transfers', '38,000']];
  return (
    <div className="w-[268px] h-[380px] bg-white rounded-t-lg text-[#0B1B36] px-4 pt-4 pb-5 rotate-2 origin-bottom overflow-hidden text-[9px] leading-snug" style={{ boxShadow: '0 24px 50px -20px rgba(0,0,0,.9)' }}>
      <div className="flex justify-between items-center border-b-2 pb-2" style={{ borderColor: BRAND }}>
        <Logo className="w-[62px]" />
        <div className="text-right"><div className="font-bold tracking-[0.12em]" style={{ color: BRAND }}>QUOTATION</div><div className="text-[#7A889C]">Family trip · Australia</div></div>
      </div>
      <div className="flex items-center gap-2 mt-2.5 p-2 rounded-md bg-[#EEF3F9]">
        <LuPlane size={14} style={{ color: BRAND }} className="rotate-45 shrink-0" />
        <div><b>CMB → SYD</b> · Economy · 5 pax<br /><span className="text-[#7A889C]">Outbound and return, one hold</span></div>
      </div>
      <div className="font-bold mt-2.5 tracking-[0.1em]" style={{ color: BRAND }}>ITINERARY</div>
      <div className="mt-1 flex flex-col gap-0.5">
        <span><b>Day 1</b> · Arrive Sydney, hotel check-in</span><span><b>Day 2</b> · Harbour cruise and city tour</span>
        <span><b>Day 3</b> · Blue Mountains day trip</span><span><b>Day 4</b> · Fly to Melbourne</span>
      </div>
      <div className="font-bold mt-2.5 tracking-[0.1em]" style={{ color: BRAND }}>PRICE BREAKDOWN (LKR)</div>
      <div className="mt-1 flex flex-col gap-0.5">
        {lines.map(([k, v]) => <span key={k} className="flex justify-between"><span>{k}</span><span>{v}</span></span>)}
        <span className="flex justify-between border-t border-[#D5DEEA] pt-1 font-bold text-[11px]"><span>Total</span><span style={{ color: SKY }}>2,310,500</span></span>
      </div>
    </div>
  );
}

export default function WorldClassCaseStudy() {
  const revealRef = useReveal();
  const fp = useFlightPath();
  const [statsRef, stats] = useCountUp(STATS.map((s) => s.n), 1900);

  // Both hooks need the <main> element.
  const setMain = (el) => { revealRef.current = el; fp.mainRef.current = el; };

  return (
    <main ref={setMain} className="relative bg-black text-white overflow-x-clip">

      {/* Flight path (dotted line + travelling plane) */}
      <svg ref={fp.svgRef} className="wct-fp" aria-hidden="true">
        <defs><clipPath id="wctFpClip"><rect ref={fp.clipRef} x="0" y="0" width="100" height="0" /></clipPath></defs>
        <path ref={fp.baseRef} d="M0 0" fill="none" stroke={SKY} strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0 11" />
        <path ref={fp.doneRef} d="M0 0" fill="none" stroke={SOFT} strokeWidth="3" strokeLinecap="round" strokeDasharray="0 11" clipPath="url(#wctFpClip)" />
        <g ref={fp.planeRef}>
          <g transform="translate(-16 -16)" style={{ color: SOFT, filter: 'drop-shadow(0 0 6px rgba(139,208,242,.6))' }}>
            <LuPlane size={32} />
          </g>
        </g>
      </svg>

      {/* 1. HERO */}
      <header data-fp="hero" className="relative min-h-[860px] flex items-end overflow-hidden border-b border-[#15294d]" style={{ background: 'linear-gradient(180deg, #000 0%, #030B1F 40%, #06122B 75%, #0B2A5B 100%)' }}>
        <HeroSky />
        <div className="relative z-[2] w-full max-w-[1400px] mx-auto px-[3.5%] pt-32 pb-24">
          <div className="max-w-[860px] flex flex-col gap-7">
            <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-[#6f86ab]">
              <a href="/#hero" className="no-underline text-[#6f86ab] hover:text-white transition-colors">Endermonks</a>
              <span aria-hidden="true">/</span>
              <a href="/#work" className="no-underline text-[#6f86ab] hover:text-white transition-colors">Work</a>
              <span aria-hidden="true">/</span>
              <span className="text-white">World Class Travels</span>
            </nav>
            <span className="inline-block w-fit bg-off-white rounded-xl px-3 py-2">
              <Logo className="w-[150px]" />
            </span>
            <Eyebrow>Case Study · Travel &amp; Tourism · Full-Stack Platform</Eyebrow>
            <h1 className="font-bebas uppercase text-white -mt-4" style={{ fontSize: 'clamp(3rem,6.5vw,6.2rem)', lineHeight: 0.92 }}>
              From{' '}
              <span className="text-[#6f86ab] line-through decoration-[#0E96D8] decoration-[3px]">“send your passport copy on WhatsApp”</span>
              {' '}to a <Accent>fully digital travel agency.</Accent>
            </h1>
            <p className="text-[1.1rem] leading-relaxed text-grey-6 max-w-[720px]">
              We designed and built World Class Travels' complete digital operation. It covers a cinematic booking website,
              a traveller portal, a partner portal for sub-agents and a 28-module operations console. It handles every enquiry,
              visa file, flight ticket and holiday package from first message to safe return.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <LiveSiteButton />
              <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] uppercase text-[#6f86ab]">
                <span className="block w-2 h-2 rounded-full" style={{ background: SKY }} aria-hidden="true" /> Live in production
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Web Platform', 'Visa & Ticketing Operations', 'Payments & Finance', 'Cloud Infrastructure'].map((c) => (
                <span key={c} className="text-[0.6rem] tracking-[0.15em] uppercase text-[#CFEBFA] border border-[#8BD0F2]/30 bg-[#0E96D8]/10 px-3 py-1.5">{c}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-9 pt-4 border-t border-[#15294d]">
              {[['Client', 'World Class Travels, Sri Lanka'], ['Timeline', 'Dec 2025 — ongoing'], ['Our role', 'Design · Engineering · Cloud']].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6f86ab]">{k}</div>
                  <div className="mt-1.5 text-white">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. IMPACT NUMBERS */}
      <section data-fp="stats" aria-labelledby="wct-impact-h" className="py-28 px-[3.5%] border-b border-[#15294d] bg-[#040B1A]">
        <div className="relative z-[2] max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal">
            <Eyebrow>By the numbers</Eyebrow>
            <Heading id="wct-impact-h">Serious software for a <Accent>serious business</Accent></Heading>
          </div>
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#15294d] border border-[#15294d]">
            {STATS.map((s, i) => (
              <div key={s.label} className="bg-[#040B1A] px-7 py-8">
                <div className="font-bebas leading-none" style={{ fontSize: 'clamp(3rem,5vw,4.5rem)', color: SOFT }}>{s.prefix}{stats[i]}{s.suffix}</div>
                <div className="mt-3 text-[0.72rem] tracking-[0.15em] uppercase text-white">{s.label}</div>
                <div className="mt-2 text-[0.85rem] leading-relaxed text-[#6f86ab]">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CHALLENGE */}
      <section data-fp="challenge" aria-labelledby="wct-challenge-h" className="py-28 px-[3.5%] border-b border-[#15294d]">
        <div className="relative z-[2] max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal flex flex-col gap-5">
            <Eyebrow>The challenge</Eyebrow>
            <Heading id="wct-challenge-h" className="-mt-4">Travel is harder to run <Accent>than it looks.</Accent></Heading>
            <div className="flex flex-col gap-5 text-[1.02rem] leading-[1.75] text-grey-6">
              <p>World Class Travels is a Sri Lankan travel agency. It helps people fly abroad, secure visas for more than 40 countries and go on holiday packages across Asia, Australia and North America. Before this project, the business ran on WhatsApp chats, phone calls, email threads, Excel sheets and folders full of photocopied passports.</p>
              <p>One family trip to Australia can mean five separate visa files, each needing a dozen documents. It can also mean an airfare held for only 24 hours before it expires, a tour priced in Australian dollars while the family pays in rupees across three instalments, and a hotel supplier paid in US dollars. Then an embassy asks for one more bank statement two days before the appointment. Multiply that by hundreds of travellers in peak season, and things slip through the cracks: a hold that lapses, a passport that expires too soon, a payment nobody chased.</p>
              <p className="text-white">They needed one system where the owners, travel consultants, partner agents and travellers could all see the same truth. It had to protect sensitive documents and keep the money right across currencies.</p>
            </div>
          </div>
          <ChallengeCollage />
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section data-fp="solution" aria-labelledby="wct-apps-h" className="py-28 px-[3.5%] border-b border-[#15294d]">
        <div className="relative z-[2] max-w-[1400px] mx-auto flex flex-col gap-24">
          <div className="reveal max-w-[760px]">
            <Eyebrow>The solution</Eyebrow>
            <Heading id="wct-apps-h">Four apps. <Accent>One platform.</Accent></Heading>
          </div>

          <AppRow
            num="01 / 04" audience="For the public" title="Public Website & Online Enquiries"
            text="A cinematic marketing site with destination video stories, a searchable visa catalogue with country guides, prices and processing times, and a step-by-step flight request wizard (one-way, round-trip and multi-city, with cabin class and passengers). It also offers curated holiday packages with day-by-day itineraries, travel insurance and airport transfers. Every enquiry can go straight into the system or out to WhatsApp in one tap."
          >
            <PublicSiteMockup />
          </AppRow>

          <AppRow
            reverse num="02 / 04" audience="For travellers" title="Traveller Portal"
            text="Travellers sign up with email OTP verification. They then track each visa application stage by stage, upload documents to a secure vault, and approve quotes. They can also pay instalments, download e-tickets, invoices and itineraries, and get pre-departure checklists. Family accounts let one person manage the whole household's trips."
          >
            <TravellerMockup />
          </AppRow>

          <AppRow
            num="03 / 04" audience="For sub-agents and corporate clients" title="Partner Portal (B2B)"
            text="Sub-agents and corporate clients book visas, flights and packages at net rates. They manage their own customers, top up a credit wallet and see the commission they earn on every booking."
          >
            <PartnerMockup />
          </AppRow>

          <article className="reveal flex flex-col gap-11">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-end">
              <div className="flex flex-col gap-4">
                <span className="wct-mono text-[0.75rem] text-[#8BD0F2]">04 / 04 · For the team</span>
                <h3 className="font-bebas text-white uppercase tracking-[0.02em] text-[2.6rem] leading-none">Operations Console</h3>
              </div>
              <p className="text-[1.02rem] leading-relaxed text-grey-6">
                The command centre. It has 28 modules covering the leads inbox, visa case management, ticketing, the package builder,
                quotations, customers, the document vault, payments, supplier ledgers, commissions, reports, content management,
                notifications, permissions and a full audit trail.
              </p>
            </div>
            <ConsoleMockup />
          </article>
        </div>
      </section>

      {/* 5. COMPLEXITY BENTO */}
      <section data-fp="bento" aria-labelledby="wct-bento-h" className="py-28 px-[3.5%] border-b border-[#15294d] bg-[#040B1A]">
        <div className="relative z-[2] max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal flex flex-wrap justify-between items-end gap-6">
            <div className="max-w-[720px] flex flex-col gap-4">
              <Eyebrow>What's inside</Eyebrow>
              <Heading id="wct-bento-h" className="-mt-4">The hard parts, <Accent>handled.</Accent></Heading>
              <p className="text-[1.02rem] leading-relaxed text-grey-6">Every card starts with the business problem it solves. The small tags underneath show the engineering, for anyone who wants to look.</p>
            </div>
            <div className="flex items-center gap-2 text-[0.8rem] text-[#6f86ab]"><span className="wct-tech">Tech tag</span> = how it's built</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-px bg-[#15294d] border border-[#15294d]">
            <BentoCard big span="lg:col-span-3" Icon={LuInbox} title="Every enquiry in one inbox" tag="Meta WhatsApp Cloud API webhooks · lead pipeline">
              <p>Messages from the website, WhatsApp, phone calls and partner agents go into one pipeline. They are assigned to a consultant automatically and tracked until they become bookings or are marked as lost.</p>
              <div className="flex flex-col gap-2.5 mt-1" role="img" aria-label="Illustration of lead sources flowing into a five-stage pipeline">
                <div className="flex gap-1.5 flex-wrap">
                  {['Website', 'WhatsApp', 'Phone', 'Partner'].map((s) => <span key={s} className="wct-tech">{s}</span>)}
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-[11px] text-[#6f86ab]">
                  {[['New', 3], ['Assigned', 2], ['Quoted', 2], ['Booked', 1, GREEN], ['Lost', 1, '#16284a']].map(([st, n, c]) => (
                    <div key={st} className="flex flex-col gap-1">
                      <span>{st}</span>
                      {Array.from({ length: n }).map((_, i) => <span key={i} className="block h-[26px]" style={{ background: c || 'rgba(14,150,216,.2)', opacity: c === GREEN ? 0.75 : 1 }} />)}
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            <BentoCard big span="lg:col-span-3" Icon={LuBookUser} title="Visa files that manage themselves" tag="Configurable checklist engine · case state machine">
              <p>Each country has its own checklist of required documents, fees and steps. The system tracks each applicant from “documents pending” to “submitted”, “appointment booked” and “approved”, and it flags what is still missing.</p>
              <div className="flex flex-col gap-2.5 mt-1" role="img" aria-label="Illustration of a visa file with a progress bar and a missing document warning">
                <div className="flex justify-between text-[0.85rem]"><span className="text-white">Australia · Family of 5</span><span className="text-[#6f86ab]">9 of 12 documents</span></div>
                <span className="block h-2.5 bg-[#16284a]"><span className="block h-full" style={{ width: '75%', background: SKY }} /></span>
                <div className="flex gap-1.5 flex-wrap">
                  {['Documents pending', 'Submitted', 'Appointment booked', 'Approved'].map((s, i) => (
                    <span key={s} className="wct-tech" style={i ? { opacity: 0.45 } : undefined}>{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 text-[0.85rem]" style={{ background: 'rgba(240,68,56,.1)', color: DANGER }}>
                  <span aria-hidden="true">!</span>Missing: latest bank statement
                </div>
              </div>
            </BentoCard>

            <BentoCard big span="lg:col-span-3" Icon={LuVault} title="A secure passport and document vault" tag="Signed, time-limited file URLs · expiry watcher job">
              <p>Passports, photos, bank statements and letters are stored securely, not in chat threads. Staff can open them only with the right permission, and the system warns when a passport expires within six months of travel.</p>
              <div className="flex gap-3.5 items-center mt-1" role="img" aria-label="Illustration of a locked passport record with an expiry warning">
                <div className="w-24 h-32 rounded-lg bg-[#1F3D6E] text-[#E8C877] flex flex-col items-center justify-center gap-2 shrink-0">
                  <LuVault size={30} /><span className="text-[9px] tracking-[0.18em]">PASSPORT</span>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  <span className="wct-tech w-fit">Viewable with permission only</span>
                  <div className="px-3 py-2.5 text-[0.85rem] leading-snug" style={{ background: 'rgba(240,68,56,.1)', color: DANGER }}>Expires in 5 months, within six months of travel</div>
                </div>
              </div>
            </BentoCard>

            <BentoCard big span="lg:col-span-3" Icon={LuTimer} title="Fare deadlines never missed" tag="Request → quote → hold → issue workflow · scheduled alerts">
              <p>Held airfares carry a live countdown. Consultants get alerts before a hold lapses, so a traveller never loses a price because someone forgot to issue the ticket.</p>
              <div className="flex flex-col gap-2.5 mt-1" role="img" aria-label="Illustration of a fare hold countdown">
                <div className="flex items-center justify-between gap-3 px-4 py-3.5 border" style={{ background: 'rgba(240,68,56,.08)', borderColor: 'rgba(240,68,56,.3)' }}>
                  <div>
                    <div className="text-[0.8rem] text-[#6f86ab]">CMB → MEL · 2 pax</div>
                    <Countdown from={12669} className="text-[1.9rem] leading-tight" />
                  </div>
                  <span className="wct-pill text-white !text-[11px] !px-2.5 !py-1" style={{ background: DANGER }}>Hold expiring</span>
                </div>
                <div className="flex items-center gap-2 text-[0.85rem] text-[#6f86ab]">
                  <span className="wct-live block w-2 h-2 rounded-full" style={{ background: SKY }} />Consultant alerted before the hold lapses
                </div>
              </div>
            </BentoCard>

            <SpotlightCard className="reveal lg:col-span-4 !rounded-none !border-0 !bg-[#050c1a] !p-0" spotlightColor="rgba(14, 150, 216, 0.22)">
              <div className="relative grid md:grid-cols-[minmax(0,1fr)_320px] h-full">
                <div className="p-8 flex flex-col gap-3.5">
                  <div className="wct-ico"><LuFileText /></div>
                  <h3 className="text-white text-[1.4rem] leading-snug">Quotes in minutes, not hours</h3>
                  <p className="text-[0.92rem] leading-relaxed text-grey-6">Flights, hotels, visas, insurance and transfers are combined into one branded PDF quotation and itinerary. When the client accepts it, the quote becomes a live booking.</p>
                  <div className="mt-auto pt-2"><span className="wct-tech">Modular quote builder · Puppeteer · Handlebars</span></div>
                </div>
                <div className="flex justify-center items-end overflow-hidden px-6 pt-7" style={{ background: 'rgba(14,150,216,.12)' }}>
                  <QuotePdf />
                </div>
              </div>
            </SpotlightCard>

            {BENTO.map((b) => (
              <BentoCard key={b.title} span="lg:col-span-2" Icon={b.Icon} title={b.title} tag={b.tag}>
                <p>{b.body}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ARCHITECTURE */}
      <section data-fp="arch" aria-labelledby="wct-arch-h" className="relative py-28 px-[3.5%] border-b border-[#15294d]" style={{ background: '#06122B' }}>
        <div className="relative z-[2] max-w-[1100px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[800px]">
            <Eyebrow>Under the hood</Eyebrow>
            <Heading id="wct-arch-h">Built like the business depends on it. <Accent>Because it does.</Accent></Heading>
          </div>

          <div
            className="reveal flex flex-col"
            role="img"
            aria-label="Architecture diagram: users connect over HTTPS to an Nginx reverse proxy with SSL, which serves a React single-page app. The app calls a Node.js and Express REST API over /api. The API contains authentication, business services, a job engine, webhooks and document generation, and connects to MongoDB Atlas, Redis with BullMQ, Cloudinary, payments and messaging services."
          >
            <div className="flex flex-wrap justify-between items-center gap-5 px-5 py-4 bg-black/40 border border-[#1f3560]">
              <div><div className="text-white">Users</div><div className="text-[0.8rem] text-[#6f86ab] mt-1">Browser / phone</div></div>
              <div className="flex gap-1.5 flex-wrap">{['Travellers', 'Partners', 'Staff'].map((u) => <span key={u} className="wct-pill bg-white/10 text-white">{u}</span>)}</div>
            </div>
            <div className="wct-conn"><b>HTTPS</b></div>
            <div className="flex flex-wrap justify-between items-center gap-5 px-5 py-4 border" style={{ background: 'rgba(14,150,216,.12)', borderColor: 'rgba(139,208,242,.4)' }}>
              <div><div className="text-white">Nginx reverse proxy + SSL</div><div className="text-[0.8rem] text-[#6f86ab] mt-1">The front door: encrypts traffic and routes every request</div></div>
              <span className="wct-tech">Let's Encrypt · Certbot</span>
            </div>
            <div className="wct-conn" style={{ height: 34 }} />
            <div className="relative px-4 pb-4 border border-dashed" style={{ borderColor: 'rgba(139,208,242,.45)' }}>
              <div className="relative -top-2.5 inline-block px-2 wct-mono text-[0.7rem]" style={{ background: '#06122B', color: SOFT }}>Docker containers · AWS EC2 · Mumbai (ap-south-1)</div>
              <div className="flex flex-wrap justify-between items-center gap-5 px-5 py-4 bg-black/40 border border-[#1f3560]">
                <div><div className="text-white">React 19 single-page app</div><div className="text-[0.8rem] text-[#6f86ab] mt-1">The screens of all four apps, served by Nginx</div></div>
                <span className="wct-tech">Vite build</span>
              </div>
              <div className="wct-conn" style={{ height: 40 }}><b>/api</b></div>
              <div className="px-5 py-4 bg-black/40 border border-[#1f3560] flex flex-col gap-4">
                <div><div className="text-white">Node.js 20 + Express 5 REST API</div><div className="text-[0.8rem] text-[#6f86ab] mt-1">The brain: every rule about visas, fares, money and people lives here</div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[
                    ['Login and permissions', 'JWT authentication, OTP verification + permission middleware'],
                    ['Business services', 'visa cases, ticketing, packages, quotes, payments, commissions'],
                    ['Job engine', 'fare-hold alerts, payment reminders, passport expiry, FX rates, departures'],
                    ['Webhooks', 'WhatsApp inbound messages, payment gateway callbacks'],
                    ['Documents', 'PDF / Excel document generation', 'lg:col-span-2'],
                  ].map(([t, d, span]) => (
                    <div key={t} className={`px-3.5 py-3 bg-[#0b1830] text-[0.85rem] text-white ${span || ''}`}>
                      {t}
                      <div className="wct-mono text-[0.68rem] text-[#6f86ab] mt-1 leading-relaxed">{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="wct-fan grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 lg:mt-0">
              {[
                ['MongoDB Atlas', 'Replica set with multi-document transactions', '64 models'],
                ['Redis + BullMQ', 'Background job queues'],
                ['Cloudinary', 'Destination media, documents and PDFs (signed access)'],
                ['Payments', 'PayHere · bank transfer verification'],
                ['Messaging', 'Meta WhatsApp · Twilio SMS · Email'],
              ].map(([t, d, n]) => (
                <div key={t}>
                  <div className="h-full p-4 border" style={{ background: 'rgba(14,150,216,.09)', borderColor: 'rgba(139,208,242,.28)' }}>
                    <div className="text-white">{t}</div>
                    <div className="text-[0.82rem] text-[#8aa0c4] mt-1.5 leading-relaxed">{d}</div>
                    {n && <div className="wct-mono text-[0.7rem] mt-2" style={{ color: SOFT }}>{n}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="reveal text-[1rem] leading-[1.75] text-[#8aa0c4]">
            The platform is hosted on Amazon Web Services in the Mumbai (ap-south-1) region, with the database on MongoDB Atlas in the same
            region. It is the closest cloud region to Sri Lanka, so pages and searches respond quickly for local travellers. Every service runs
            in a Docker container, so the platform deploys the same way on any host and can scale up for peak travel seasons.
          </p>
        </div>
      </section>

      {/* 7. STACK */}
      <section data-fp="stack" aria-labelledby="wct-stack-h" className="py-28 px-[3.5%] border-b border-[#15294d]">
        <div className="relative z-[2] max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal">
            <Eyebrow>Technology</Eyebrow>
            <Heading id="wct-stack-h">A modern, <Accent>proven stack</Accent></Heading>
          </div>
          <div className="reveal border-b border-[#15294d]">
            {STACK.map(([label, items]) => (
              <div key={label} className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-3 md:gap-5 items-start py-6 border-t border-[#15294d]">
                <div className="text-[0.62rem] tracking-[0.3em] uppercase pt-2" style={{ color: SOFT }}>{label}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((it) => (
                    <span key={it} className="text-[0.88rem] text-grey-6 px-3.5 py-2 bg-[#050c1a] border border-[#15294d] hover:text-white hover:border-[#0E96D8] transition-colors">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ENGINEERING QUALITY */}
      <section data-fp="quality" aria-label="Engineering quality" className="py-24 px-[3.5%] border-b border-[#15294d] bg-[#040B1A]">
        <div className="relative z-[2] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#15294d] border border-[#15294d]">
          {QUALITY.map(({ Icon, title, text }) => (
            <div key={title} className="reveal bg-[#040B1A] p-9 flex flex-col gap-3.5">
              <div className="wct-ico"><Icon /></div>
              <h3 className="text-white text-[1.3rem]">{title}</h3>
              <p className="text-grey-6 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. OUTCOME */}
      <section data-fp="outcome" aria-labelledby="wct-outcome-h" className="py-28 px-[3.5%] border-b border-[#15294d]">
        <div className="relative z-[2] max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal max-w-[960px]">
            <Eyebrow>The outcome</Eyebrow>
            <Heading id="wct-outcome-h">From WhatsApp threads, spreadsheets and paper passport copies to <Accent>one system</Accent> that everyone uses.</Heading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#15294d] border border-[#15294d]">
            {OUTCOMES.map(({ Icon, who, text }) => (
              <div key={who} className="reveal bg-black p-7 flex flex-col gap-3.5">
                <div className="wct-ico"><Icon /></div>
                <div className="text-white text-[1.15rem]">{who}</div>
                <p className="text-grey-6 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="reveal border border-[#15294d] bg-[#050c1a] px-8 pt-3 pb-5">
            <div className="grid grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] gap-3 pt-4 pb-2.5 text-[0.62rem] tracking-[0.3em] uppercase">
              <span className="text-[#6f86ab]">Before</span><span /><span style={{ color: SOFT }}>After</span>
            </div>
            {BEFORE_AFTER.map(([b, a], i) => (
              <div key={b} className={`grid grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] gap-3 items-center py-4 ${i ? 'border-t border-[#15294d]' : ''}`}>
                <span className="text-[1.05rem] text-[#6f86ab] line-through decoration-[#2a4270]">{b}</span>
                <LuArrowRight size={22} style={{ color: SKY }} />
                <span className="text-[1.05rem] text-white">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section data-fp="cta" aria-labelledby="wct-cta-h" className="relative overflow-hidden py-36 px-[3.5%] text-center hero-grid">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(70% 60% at 50% 110%, rgba(14,150,216,.4), transparent 70%), radial-gradient(60% 50% at 80% 100%, rgba(27,69,143,.45), transparent 70%)' }} />
        <div className="reveal relative z-[2] max-w-[900px] mx-auto flex flex-col items-center gap-6">
          <Heading id="wct-cta-h">Still running your agency on <Accent>WhatsApp and Excel?</Accent></Heading>
          <p className="max-w-[580px] text-[1.1rem] leading-relaxed text-grey-6">
            We build platforms like this: custom software shaped around how your business actually works.
          </p>
          {/* The flight path lands just left of this row */}
          <div ref={fp.ctaRef} className="flex flex-wrap justify-center gap-6 items-center mt-2">
            <LiveSiteButton size="sm" />
            <a href="/#contact" className="no-underline bg-off-white text-black text-[0.72rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#8BD0F2] transition-colors duration-200">
              Start a Project ↗
            </a>
            <a href="/#work" className="no-underline text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5">
              ← Back to all work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
