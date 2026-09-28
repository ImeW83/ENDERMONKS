import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import './vcare.css';

// Palette — matches the site's black theme with the pink accent used in section headings.
const PINK = '#FAA6FF';
const VIOLET = '#9B7BFF';
const CREAM = '#f0ede8';

const TONES = {
  violet: { bg: 'rgba(155,123,255,0.12)', fg: '#B9A4FF' },
  pink:   { bg: 'rgba(250,166,255,0.10)', fg: PINK },
  cream:  { bg: 'rgba(240,237,232,0.06)', fg: CREAM },
};

const STATS = [
  { n: 4,      label: 'Connected applications',    note: 'Public site, client portal, staff portal and admin console' },
  { n: 32,     label: 'Admin modules',             note: 'Bookings to payroll, in one back office' },
  { n: 87,     label: 'Database tables',           note: 'Every patient, shift, payment and payslip, linked' },
  { n: 180,    label: 'Permission controls',       note: 'Each person sees and does only what their role allows', suffix: '+' },
  { n: 47,     label: 'Business-logic controllers', note: 'Plus 42 API route groups behind the apps' },
  { n: 5,      label: 'Automated overnight jobs',  note: 'Billing, invoicing and scheduling run while the office sleeps' },
  { n: 150000, label: 'Lines of code',             note: 'Written, reviewed and running in production', prefix: '~' },
  { n: 260,    label: 'Production iterations',     note: 'Over 8 months, since February 2026', suffix: '+' },
];

const ANATOMY = [
  { day: 'Day 1',  text: 'Live-in caregiver starts',         tone: 'violet' },
  { day: 'Day 3',  text: 'Client pays part in advance',      tone: 'cream' },
  { day: 'Day 14', text: 'Caregiver swapped mid-month',      tone: 'violet' },
  { day: 'Day 14', text: 'Replacement arrives 3 hours late', tone: 'pink' },
  { day: 'Day 21', text: 'One care day refunded',            tone: 'pink' },
];

const NIGHTLY = [
  ['00:05', 'Generate invoices'],
  ['00:10', 'Credit staff wallets'],
  ['00:15', 'Expire registration fees'],
  ['00:20', 'Bill equipment rentals'],
  ['00:25', 'Run scheduled staff changes'],
];

const STACK = [
  { name: 'Frontend', items: ['React 19', 'Vite 7', 'React Router 7', 'Tailwind CSS 4', 'Framer Motion', 'Recharts', 'Lucide icons', 'i18next (EN / SI)', 'react-easy-crop', 'libphonenumber-js'] },
  { name: 'Backend', items: ['Node.js 20', 'Express 5', 'PostgreSQL (pg)', 'JWT + bcrypt', 'node-cron', 'Multer'] },
  { name: 'Documents & Data', items: ['Puppeteer', 'html-pdf-node', 'Handlebars', 'SheetJS / xlsx', 'JSZip'] },
  { name: 'Cloud & Infrastructure', items: ['AWS EC2', 'AWS RDS', 'AWS S3 + IAM', 'Docker', 'Docker Compose', 'Nginx', "Let's Encrypt", 'Health-checked containers'], note: 'Vercel and Render configurations kept as alternative deployment targets.' },
  { name: 'Communications', items: ['Meta WhatsApp Cloud API', 'Twilio', 'Nodemailer / Gmail', 'SendGrid', 'Resend'] },
  { name: 'Engineering', items: ['Git dev / prod branches', 'Versioned DB migrations', 'Seed scripts', 'Cloudinary → S3 migration'] },
];

const QUALITY = [
  { title: 'Financial correctness first', text: 'Money movements use atomic database transactions, and every sensitive admin action is written to an audit log.' },
  { title: 'Built to evolve', text: 'A central permission registry, modular services and reusable UI components made it possible to add memberships, attendance and refunds without rewrites.' },
  { title: 'Cost-conscious cloud', text: 'Planned to run within the AWS free tier for the first year, with a documented path to a scaled production setup.' },
];

const OUTCOMES = [
  { who: 'Owners',       text: 'Live financial reports: P&L, balance sheet and who owes what.', color: VIOLET },
  { who: 'Office staff', text: 'Schedule, swap and bill caregivers in minutes instead of hours.', color: CREAM },
  { who: 'Clients',      text: 'Transparency: invoices, receipts, wallet balance and caregiver reviews.', color: PINK },
  { who: 'Caregivers',   text: "Their bookings and exactly what they've earned, on their phone.", color: '#888888' },
];

function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
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

const Accent = ({ children }) => <em className="font-fade not-italic text-[#FAA6FF]">{children}</em>;

function BrowserBar({ label }) {
  return <div className="vc-browser-top"><i /><i /><i /><div className="vc-url">{label}</div></div>;
}

function Pill({ tone = 'cream', children }) {
  const t = TONES[tone];
  return <span className="vc-pill" style={{ background: t.bg, color: t.fg }}>{children}</span>;
}

function VCareLogo() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="font-bebas text-[2.2rem] tracking-[0.06em] leading-none text-white">
        VCare <span className="text-[#FAA6FF]">Nursing</span>
      </span>
    );
  }
  // The client logo is designed for a light background, so it sits on a light tile.
  return (
    <span className="inline-block bg-off-white rounded-xl px-3 py-1 w-fit">
      <img src="/logo/vcare-logo.png" alt="VCare Nursing" className="block w-[180px] h-auto" onError={() => setFailed(true)} />
    </span>
  );
}

const LIVE_URL = 'https://www.vcareos.com';

function LiveSiteButton({ size = 'lg' }) {
  const big = size === 'lg';
  return (
    <a
      href={LIVE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`vc-live-btn w-fit ${big ? 'px-7 py-5' : 'px-6 py-4'}`}
    >
      <span className="flex flex-col items-start leading-none">
        <span className={`font-bebas tracking-[0.06em] ${big ? 'text-[1.9rem]' : 'text-[1.5rem]'}`}>Visit the Live Site</span>
        <span className="vc-mono text-[0.68rem] tracking-[0.05em] opacity-70 mt-1">www.vcareos.com</span>
      </span>
      <span aria-hidden="true" className={big ? 'text-[1.6rem]' : 'text-[1.3rem]'}>↗</span>
    </a>
  );
}

function BentoCard({ span, title, text, tech, techNote, dark, children }) {
  return (
    <SpotlightCard
      className={`reveal ${span} !rounded-none !border-0 !p-8 flex flex-col gap-3 ${dark ? '!bg-[#1B0E3A]' : '!bg-grey-1'}`}
      spotlightColor="rgba(250, 166, 255, 0.18)"
    >
      <h3 className="relative text-[1.2rem] leading-snug text-white">{title}</h3>
      {text && <p className="relative text-[0.92rem] leading-relaxed text-grey-6">{text}</p>}
      {children && <div className="relative">{children}</div>}
      {(tech || techNote) && (
        <div className="relative mt-auto pt-2 flex flex-col gap-2">
          {tech && <span className="vc-tech w-fit">{tech}</span>}
          {techNote && <span className="text-[0.8rem] italic text-grey-5">{techNote}</span>}
        </div>
      )}
    </SpotlightCard>
  );
}

function HeroDevices() {
  const nav = ['Bookings', 'Staffing', 'Care timeline', 'Quotations', 'Finance', 'Payroll', 'Reports'];
  const kpis = [['Active bookings', '60%', VIOLET], ['Staff on duty', '45%', CREAM], ['Receivables', '70%', PINK], ['Revenue (MTD)', '55%', '#888']];
  const bars = [[55, 38], [62, 44], [58, 40], [74, 50], [80, 55], [92, 61]];
  const jobs = ['Generate invoices', 'Credit staff wallets', 'Bill rentals', 'Run staff swaps', 'Expire reg. fees'];

  return (
    <div className="relative pt-5 pb-16 sm:pr-10">
      <div className="vc-browser">
        <BrowserBar label="Admin Console · Dashboard" />
        <div className="flex h-[340px]">
          <div className="w-[118px] shrink-0 bg-black border-r border-grey-3 px-2.5 py-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="block w-3.5 h-3.5 rounded bg-[#FAA6FF]" />
              <span className="vc-sk w-[50px]" style={{ background: 'rgba(255,255,255,.35)' }} />
            </div>
            <div className="text-[9px] text-white px-2 py-1.5 rounded-md" style={{ background: 'rgba(250,166,255,.18)' }}>Dashboard</div>
            {nav.map((n) => <div key={n} className="text-[9px] text-grey-6 px-2">{n}</div>)}
            <div className="text-[9px] text-grey-4 px-2">+ 24 more</div>
          </div>
          <div className="flex-1 min-w-0 p-4 flex flex-col gap-3 bg-grey-1">
            <div className="grid grid-cols-4 gap-2">
              {kpis.map(([label, w, c]) => (
                <div key={label} className="bg-grey-2 border border-grey-3 rounded-lg p-2">
                  <div className="text-[8px] text-grey-5 truncate">{label}</div>
                  <span className="vc-sk mt-2" style={{ width: w, height: 12, background: c }} />
                </div>
              ))}
            </div>
            <div className="grid gap-2 flex-1" style={{ gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)' }}>
              <div className="bg-grey-2 border border-grey-3 rounded-lg p-2.5 flex flex-col">
                <div className="text-[8px] text-grey-5">Billing vs staff cost</div>
                <div className="flex-1 flex items-end gap-1.5 pt-2.5">
                  {bars.map(([a, b], i) => (
                    <div key={i} className="flex-1 flex gap-0.5 items-end h-full">
                      <span className="block flex-1 rounded-t-sm" style={{ height: `${a}%`, background: VIOLET }} />
                      <span className="block flex-1 rounded-t-sm" style={{ height: `${b}%`, background: PINK }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-grey-2 border border-grey-3 rounded-lg p-2.5 flex flex-col gap-2">
                <div className="text-[8px] text-grey-5">Tonight's jobs</div>
                {jobs.map((j) => (
                  <div key={j} className="flex items-center gap-1.5">
                    <span className="vc-live block w-1.5 h-1.5 rounded-full bg-[#FAA6FF] shrink-0" />
                    <span className="text-[8px] text-grey-6 truncate">{j}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff portal phone */}
      <div className="vc-phone hidden sm:block absolute right-0 bottom-0 w-[176px]">
        <div className="vc-screen h-[340px] flex flex-col">
          <div className="px-3.5 pt-5 pb-3.5 text-white" style={{ background: '#1B0E3A' }}>
            <div className="flex justify-between items-center">
              <span className="text-[9px] opacity-75">Staff Portal</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-white/10">EN | සිං</span>
            </div>
            <div className="text-[13px] mt-1.5">Today's booking</div>
          </div>
          <div className="p-2.5 flex flex-col gap-2">
            <div className="bg-grey-2 border border-grey-3 rounded-xl p-2.5">
              <div className="flex justify-between"><span className="text-[9px] text-white">Live-in care</span><Pill tone="pink">Active</Pill></div>
              <span className="vc-sk mt-2" style={{ width: '70%' }} />
              <span className="vc-sk mt-1" style={{ width: '45%' }} />
            </div>
            <div className="bg-grey-2 border border-grey-3 rounded-xl p-2.5">
              <div className="text-[9px] text-white">Earnings this month</div>
              <div className="flex h-[7px] rounded overflow-hidden mt-2">
                <span className="block" style={{ width: '62%', background: VIOLET }} />
                <span className="block" style={{ width: '22%', background: CREAM }} />
                <span className="block" style={{ width: '16%', background: PINK }} />
              </div>
              <div className="flex gap-1.5 mt-1.5 text-[7px] text-grey-5"><span>Care days</span><span>Allowances</span><span>Advance</span></div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-grey-2 border border-grey-3 rounded-xl p-2 text-[8px] text-grey-6">Leave requests</div>
              <div className="bg-grey-2 border border-grey-3 rounded-xl p-2 text-[8px] text-grey-6">My documents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppCard({ num, audience, title, subtitle, text, dark, children }) {
  return (
    <article
      className={`reveal project-card p-8 flex flex-col gap-6 overflow-hidden border border-grey-3 ${dark ? '' : 'bg-grey-1'}`}
      style={dark ? { background: '#1B0E3A', borderColor: '#2F195F' } : undefined}
    >
      <div className="flex justify-between items-center">
        <span className="vc-mono text-[0.75rem] text-[#FAA6FF]">{num}</span>
        <span className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-5 border border-grey-3 px-2 py-1">{audience}</span>
      </div>
      <div>
        <h3 className="font-bebas text-white tracking-[0.03em] text-[2rem] leading-none">
          {title} {subtitle && <span className="text-[#FAA6FF] text-[1.3rem]">{subtitle}</span>}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-grey-6">{text}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </article>
  );
}

function OtpBox({ digit }) {
  return (
    <span
      className="w-[22px] h-7 rounded-md bg-grey-2 flex items-center justify-center text-[11px] text-white"
      style={{ border: `1.5px solid ${digit ? PINK : '#2a2a2a'}` }}
    >
      {digit}
    </span>
  );
}

export default function VCareCaseStudy() {
  const revealRef = useReveal();
  const [statsRef, stats] = useCountUp(STATS.map((s) => s.n));

  return (
    <main ref={revealRef} className="bg-black text-white overflow-hidden">

      {/* HERO */}
      <header className="pt-32 pb-20 px-[3.5%] border-b border-grey-3 hero-grid relative">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(900px 500px at 85% 25%, rgba(47,25,95,.55), transparent 70%)' }} />
        <div className="relative max-w-[1400px] mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-grey-5 mb-12">
            <a href="/#hero" className="no-underline text-grey-5 hover:text-white transition-colors">Endermonks</a>
            <span aria-hidden="true">/</span>
            <a href="/#work" className="no-underline text-grey-5 hover:text-white transition-colors">Work</a>
            <span aria-hidden="true">/</span>
            <span className="text-white">VCare Nursing</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="flex flex-col gap-7">
              <VCareLogo />
              <Eyebrow>Case Study · Healthcare · Full-Stack Platform</Eyebrow>
              <h1 className="font-bebas uppercase text-white -mt-4" style={{ fontSize: 'clamp(3rem,6.5vw,6.2rem)', lineHeight: 0.92 }}>
                One platform that runs an entire <Accent>home-healthcare</Accent> business.
              </h1>
              <p className="text-[1.1rem] leading-relaxed text-grey-6 max-w-[560px]">
                We designed and built VCare Nursing's complete digital operation: a public booking website, a client portal,
                a mobile-first portal for nurses and caregivers, and a 32-module admin back office. It handles everything
                from the first enquiry to the final payslip.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <LiveSiteButton />
                <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] uppercase text-grey-5">
                  <span className="vc-ping text-[#FAA6FF]" aria-hidden="true" /> Live in production
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Web Platform', 'Operations & ERP', 'Finance & Payroll', 'Cloud Infrastructure'].map((c) => (
                  <span key={c} className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-6 border border-grey-3 px-3 py-1.5">{c}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-9 pt-4 border-t border-grey-3">
                {[['Client', 'VCare Nursing, Sri Lanka'], ['Timeline', 'Feb 2026 — ongoing'], ['Our role', 'Design · Engineering · Cloud']].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[0.6rem] tracking-[0.2em] uppercase text-grey-5">{k}</div>
                    <div className="mt-1.5 text-white">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <HeroDevices />
          </div>
        </div>
      </header>

      {/* IMPACT NUMBERS */}
      <section aria-labelledby="impact-h" className="py-24 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div>
              <Eyebrow>By the numbers</Eyebrow>
              <Heading id="impact-h">The scale of <Accent>what we built</Accent></Heading>
            </div>
            <p className="max-w-[380px] text-grey-5 text-[0.95rem] leading-relaxed">
              This is not a website with a booking form. It's the whole operating system of the business.
            </p>
          </div>
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grey-3 border border-grey-3">
            {STATS.map((s, i) => (
              <div key={s.label} className="bg-grey-1 px-7 py-8">
                <div className="font-bebas leading-none text-[#FAA6FF]" style={{ fontSize: 'clamp(3rem,5vw,4.5rem)' }}>
                  {s.prefix}{stats[i]}{s.suffix}
                </div>
                <div className="mt-3 text-[0.72rem] tracking-[0.15em] uppercase text-white">{s.label}</div>
                <div className="mt-2 text-[0.85rem] leading-relaxed text-grey-5">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section aria-labelledby="challenge-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal flex flex-col gap-5">
              <Eyebrow>The challenge</Eyebrow>
              <Heading id="challenge-h" className="-mt-4">Real care is messy. <Accent>Spreadsheets can't keep up.</Accent></Heading>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Phone calls', 'Spreadsheets', 'WhatsApp threads', 'Paper ledgers'].map((c) => (
                  <span key={c} className="text-[0.8rem] px-3.5 py-2 border border-dashed border-grey-4 text-grey-5 line-through">{c}</span>
                ))}
              </div>
            </div>
            <div className="reveal flex flex-col gap-5 text-[1.05rem] leading-[1.75] text-grey-6">
              <p>VCare Nursing places nurses, caregivers and babysitters in patients' homes and in hospitals across Sri Lanka. Before this project, the business ran on phone calls, spreadsheets, WhatsApp threads and paper ledgers.</p>
              <p>Their business is hard to run. A single booking can involve a live-in caregiver who is swapped mid-month, a replacement who arrives three hours late, a client who pays partly in advance, a day that has to be refunded, and a nurse whose pay is calculated differently from what the client is billed. Multiply that by dozens of staff and hundreds of bookings, and manual tracking breaks down.</p>
              <p className="text-white">They needed one system that the owners, office staff, clients and field workers could all trust, and that would keep the finances accurate even when real life got messy.</p>
            </div>
          </div>

          <div className="reveal mt-16 border border-grey-3 bg-grey-1 p-8">
            <div className="flex flex-wrap justify-between items-baseline gap-3">
              <div className="text-[0.72rem] tracking-[0.2em] uppercase text-white">Anatomy of one ordinary booking</div>
              <div className="text-[0.85rem] italic text-grey-5">Every event below changes what the client owes and what staff are paid.</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
              {ANATOMY.map((a, i) => (
                <div key={i} className="p-4" style={{ background: TONES[a.tone].bg }}>
                  <div className="vc-mono text-[0.7rem]" style={{ color: TONES[a.tone].fg }}>{a.day}</div>
                  <div className="mt-2 text-[0.9rem] text-white">{a.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION: FOUR APPS */}
      <section aria-labelledby="apps-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[760px] flex flex-col gap-4">
            <Eyebrow>The solution</Eyebrow>
            <Heading id="apps-h" className="-mt-4">Four apps. One platform. <Accent>One source of truth.</Accent></Heading>
            <p className="text-[1.05rem] leading-relaxed text-grey-6">
              Each audience gets an app built for how they work, and every app reads and writes the same live data.
              When the office swaps a nurse, the client, the nurse and the invoice all know instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0.5">
            <AppCard
              num="01" audience="For the public" title="Public Website & Online Booking"
              text="A service marketing site for Home Nursing, Elderly Care, Baby and Child Care, Hospital Staffing, Doctor Visits and Ambulance. It includes guided booking flows, a medical equipment and product catalogue, public caregiver profiles, and Priority Memberships."
            >
              <div className="vc-browser">
                <BrowserBar label="Home · Services" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex gap-3.5 items-center">
                    <div className="flex-1">
                      <div className="font-bebas text-[1.3rem] tracking-[0.04em] text-white">Care that comes home.</div>
                      <span className="vc-sk mt-2" style={{ width: '80%' }} />
                      <span className="inline-block mt-2.5 text-[10px] text-black bg-[#FAA6FF] px-3 py-1.5 rounded-full">Book care</span>
                    </div>
                    <div className="w-[90px] h-[70px] rounded-lg shrink-0" style={{ background: 'rgba(155,123,255,.18)' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Home Nursing', 'Elderly Care', 'Baby & Child', 'Hospital Staffing', 'Doctor Visits', 'Ambulance'].map((s) => (
                      <div key={s} className="text-[9px] p-2 rounded-md bg-grey-2 text-grey-6 border border-grey-3">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </AppCard>

            <AppCard
              num="02" audience="For families" title="Client Portal"
              text="Families manage care profiles for each patient, track active and past bookings, request service changes, view invoices and receipts, see their wallet balance, buy or rent products, and review the caregivers who looked after them."
            >
              <div className="vc-browser">
                <BrowserBar label="My account · Invoices" />
                <div className="p-4 grid gap-3" style={{ gridTemplateColumns: 'minmax(0,1fr) 120px' }}>
                  <div className="bg-grey-2 border border-grey-3 rounded-lg p-3 flex flex-col gap-2.5">
                    <div className="text-[10px] text-white">Invoices &amp; receipts</div>
                    {[['55%', 'cream', 'Paid'], ['48%', 'cream', 'Paid'], ['60%', 'pink', 'Due'], ['40%', 'violet', 'Refunded']].map(([w, tone, label], i) => (
                      <div key={i} className="flex justify-between items-center"><span className="vc-sk" style={{ width: w }} /><Pill tone={tone}>{label}</Pill></div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-lg p-3" style={{ background: '#2F195F' }}>
                      <div className="text-[8px] text-white/70">Wallet balance</div>
                      <span className="vc-sk mt-2" style={{ width: '70%', height: 12, background: 'rgba(255,255,255,.5)' }} />
                    </div>
                    <div className="bg-grey-2 border border-grey-3 rounded-lg p-2.5">
                      <div className="text-[8px] text-white">Rate your caregiver</div>
                      <div className="text-[12px] mt-1 tracking-[2px] text-[#FAA6FF]">★★★★★</div>
                    </div>
                  </div>
                </div>
              </div>
            </AppCard>

            <AppCard
              num="03" audience="For nurses & caregivers" title="Staff Portal" subtitle="(mobile-first)"
              text="Nurses and caregivers register, verify by OTP (a one-time code sent to their phone), upload documents for background verification, and then see their bookings, earnings breakdowns, leave requests and profile. It is built for phones and ready for English and Sinhala."
            >
              <div className="flex gap-4 justify-center items-end border border-grey-3 px-4 pt-7" style={{ background: 'rgba(47,25,95,.35)' }}>
                <div className="vc-phone w-[160px] !rounded-b-none !pb-0">
                  <div className="vc-screen !rounded-b-none h-[220px] px-3 py-4 flex flex-col gap-2.5">
                    <div className="text-[11px] text-white">Verify your number</div>
                    <div className="flex gap-1"><OtpBox digit="4" /><OtpBox digit="8" /><OtpBox digit="1" /><OtpBox /></div>
                    <div className="text-[9px] text-white mt-1">Documents</div>
                    <div className="flex justify-between items-center bg-grey-2 border border-grey-3 rounded-lg p-1.5"><span className="text-[8px] text-grey-6">NIC copy</span><Pill tone="cream">Verified</Pill></div>
                    <div className="flex justify-between items-center bg-grey-2 border border-grey-3 rounded-lg p-1.5"><span className="text-[8px] text-grey-6">Police report</span><Pill tone="pink">Pending</Pill></div>
                  </div>
                </div>
                <div className="vc-phone hidden sm:block w-[160px] !rounded-b-none !pb-0">
                  <div className="vc-screen !rounded-b-none h-[250px] px-3 py-4 flex flex-col gap-2.5">
                    <div className="flex justify-between"><span className="text-[11px] text-white">My earnings</span><span className="text-[8px] text-[#FAA6FF]">EN | සිං</span></div>
                    <div className="rounded-lg p-2.5" style={{ background: '#2F195F' }}>
                      <div className="text-[8px] text-white/70">This month</div>
                      <span className="vc-sk mt-2" style={{ width: '65%', height: 12, background: 'rgba(255,255,255,.5)' }} />
                    </div>
                    {[['Care days', 40], ['Allowances', 30]].map(([l, w]) => (
                      <div key={l} className="flex justify-between items-center text-[8px] text-grey-6"><span>{l}</span><span className="vc-sk" style={{ width: w, height: 6 }} /></div>
                    ))}
                    <div className="flex justify-between items-center text-[8px] text-[#FAA6FF]"><span>Advance taken</span><span className="vc-sk" style={{ width: 26, height: 6, background: 'rgba(250,166,255,.3)' }} /></div>
                  </div>
                </div>
              </div>
            </AppCard>

            <AppCard
              dark num="04" audience="For the office" title="Admin Operations Console"
              text="The command centre. It has 32 modules covering bookings, staffing, service requests, quotations, patients, finance, payroll, vendors, reports, reviews, notifications, permissions and a full audit trail."
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {['Bookings', 'Staffing', 'Requests', 'Quotations', 'Patients', 'Finance', 'Payroll', 'Vendors', 'Reports', 'Reviews', 'Permissions', 'Audit trail'].map((m) => {
                  const hot = m === 'Finance' || m === 'Payroll';
                  const sec = m === 'Permissions' || m === 'Audit trail';
                  return (
                    <span
                      key={m}
                      className="text-[0.7rem] text-center px-2 py-2.5 text-white"
                      style={{ background: hot ? 'rgba(250,166,255,.28)' : sec ? 'rgba(155,123,255,.3)' : 'rgba(255,255,255,.07)' }}
                    >
                      {m}
                    </span>
                  );
                })}
                <span className="col-span-2 sm:col-span-4 text-[0.75rem] text-center p-2.5 border border-dashed border-white/25 text-white/70">
                  + 20 more modules — 32 in total
                </span>
              </div>
            </AppCard>
          </div>
        </div>
      </section>

      {/* COMPLEXITY BENTO */}
      <section aria-labelledby="bento-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal flex flex-wrap justify-between items-end gap-6">
            <div className="max-w-[680px] flex flex-col gap-4">
              <Eyebrow>What's inside</Eyebrow>
              <Heading id="bento-h" className="-mt-4">The hard parts, <Accent>handled.</Accent></Heading>
              <p className="text-[1.05rem] leading-relaxed text-grey-6">
                Each feature starts with the business problem it solves. The small tags show the engineering underneath, for anyone who wants to look.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[0.8rem] text-grey-5"><span className="vc-tech">Under the hood</span> = how it's built</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-px bg-grey-3 border border-grey-3">
            <BentoCard
              span="lg:col-span-3" title="Smart care scheduling across 3 service models" tech="Rule engine · shift-pattern service"
              text="Live-in, shift-based and visiting care each bill, staff and pay in their own way. The system handles all three automatically."
            >
              <div className="grid grid-cols-3 gap-2 my-1.5">
                {[['Live-in', 'Billed by the day', 'violet'], ['Shift', 'Day and night patterns', 'cream'], ['Visiting', 'Billed per visit', 'pink']].map(([t, d, tone]) => (
                  <div key={t} className="p-3" style={{ background: TONES[tone].bg }}>
                    <div className="text-[0.9rem]" style={{ color: TONES[tone].fg }}>{t}</div>
                    <div className="text-[0.75rem] text-grey-5 mt-1">{d}</div>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard
              span="lg:col-span-3" title="Caregiver swaps without losing a rupee" tech="Scheduled actions engine · daily attendance ledger"
              text="Staff can be swapped immediately, scheduled for a future date or recorded after the fact, with exact in and out times. The system detects coverage gaps and overlaps so nobody is overpaid or underpaid."
            >
              <div className="flex flex-col gap-1.5 my-1.5">
                <div className="flex h-[26px] overflow-hidden text-[11px] text-white">
                  <span className="flex items-center pl-2.5 truncate" style={{ width: '46%', background: '#2F195F' }}>Caregiver A · out 09:00</span>
                  <span className="block" title="Coverage gap" style={{ width: '10%', background: `repeating-linear-gradient(45deg, ${PINK} 0 4px, rgba(250,166,255,.35) 4px 8px)` }} />
                  <span className="flex items-center pl-2.5 truncate text-black" style={{ width: '44%', background: CREAM }}>Caregiver B · in 12:00</span>
                </div>
                <div className="text-[0.75rem] text-[#FAA6FF]">3-hour gap detected — not billed, not paid</div>
              </div>
            </BentoCard>

            <BentoCard
              span="lg:col-span-4" title="Visual care timeline" tech="Custom React visualisation"
              text="A week-by-week timeline shows who cared for each patient on each day, with every handover and allocation change. Admins can simulate changes before they commit them."
            >
              <div
                role="img"
                aria-label="Illustration of a weekly care timeline with three patients and caregiver handovers"
                className="grid items-center my-2 text-[11px] overflow-x-auto"
                style={{ gridTemplateColumns: '72px repeat(7, minmax(0,1fr))', gap: '6px 4px' }}
              >
                <span />
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d} className="text-center text-grey-5">{d}</span>)}

                <span className="text-grey-6">Patient 1</span>
                <span className="h-6 flex items-center pl-2 text-white truncate" style={{ gridColumn: '2 / 5', background: '#2F195F' }}>Live-in · A</span>
                <span className="h-6 flex items-center pl-2 text-black truncate" style={{ gridColumn: '5 / 9', background: CREAM, boxShadow: `-3px 0 0 ${PINK}` }}>Handover → B</span>

                <span className="text-grey-6">Patient 2</span>
                {[VIOLET, '#2F195F', VIOLET, '#2F195F', VIOLET].map((c, i) => <span key={i} className="h-6" style={{ background: c }} />)}
                <span className="h-6 border-2 border-dashed border-[#FAA6FF]" />
                <span className="h-6 border-2 border-dashed border-[#FAA6FF]" />

                <span className="text-grey-6">Patient 3</span>
                {[1, 0, 1, 0, 1, 0, 0].map((v, i) => (
                  <span key={i} className="h-6 flex justify-center items-center">
                    {v ? <span className="block w-3 h-3 rounded-full bg-[#FAA6FF]" /> : null}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-[0.75rem] text-grey-5">
                <span>■ <b className="font-normal text-[#B9A4FF]">Live-in</b></span>
                <span>■ <b className="font-normal" style={{ color: VIOLET }}>Day</b> / <b className="font-normal text-grey-6">night</b> shifts</span>
                <span>● <b className="font-normal text-[#FAA6FF]">Visits</b></span>
                <span>▭ Dashed = simulated change, not yet saved</span>
              </div>
            </BentoCard>

            <BentoCard
              dark span="lg:col-span-2" title="Daily attendance and automated invoicing"
              text="Every night the platform does the office's paperwork on its own."
              tech="5 node-cron jobs · idempotent billing"
              techNote="Idempotent = safe to re-run. A job can never bill the same day twice."
            >
              <div className="flex flex-col gap-2 my-1.5 text-[0.82rem] text-white">
                {NIGHTLY.map(([t, j]) => (
                  <div key={t} className="flex gap-2.5 items-center"><span className="vc-mono text-[0.7rem] text-[#FAA6FF]">{t}</span>{j}</div>
                ))}
              </div>
            </BentoCard>

            <BentoCard
              span="lg:col-span-2" title="Separate client billing and staff pay rates" tech="Dual-rate data model"
              text="What the client pays and what the caregiver earns are tracked separately, so margins are always visible."
            >
              <div className="flex flex-col gap-1.5 my-1.5 text-[0.75rem] text-grey-6">
                <div className="flex items-center gap-2"><span className="w-[74px] shrink-0">Client rate</span><span className="block flex-1 h-3" style={{ background: VIOLET }} /></div>
                <div className="flex items-center gap-2"><span className="w-[74px] shrink-0">Staff pay</span><span className="block h-3" style={{ width: '55%', background: CREAM }} /><span className="text-[0.7rem] text-[#FAA6FF]">margin</span></div>
              </div>
            </BentoCard>

            <BentoCard
              span="lg:col-span-2" title="Refunds, write-offs and clawbacks"
              text="If a care day is cancelled, the admin can refund it to the client's wallet, refund to a bank account, or write it off. Staff pay adjusts independently."
              tech="Atomic database transactions" techNote="All-or-nothing: money never moves halfway."
            />

            <BentoCard
              span="lg:col-span-2" title="Wallets for clients and staff"
              text="Advances, partial payments, allocations across invoices, staff advance requests and payouts. It works like a small bank, with a full ledger behind it."
            >
              <div className="vc-mono flex flex-col gap-1 text-[0.7rem] mt-1">
                {[['+ Advance received', 'credit', 'cream'], ['− Allocated to invoice', 'debit', 'violet'], ['+ Day refunded', 'credit', 'pink']].map(([l, r, tone]) => (
                  <div key={l} className="flex justify-between px-2 py-1.5" style={{ background: TONES[tone].bg, color: TONES[tone].fg }}><span>{l}</span><span>{r}</span></div>
                ))}
              </div>
            </BentoCard>

            <BentoCard span="lg:col-span-4" title="Full accounting suite" text="Zoho-style finance, built around their own business instead of a generic template.">
              <div className="flex flex-wrap gap-2 my-1.5">
                {['Balance sheet', 'Profit & loss', 'Receivables ageing', 'Payables ageing', 'Sales by customer', 'Bank accounts', 'Petty cash', 'Vendor bills', 'Finance periods', 'Client statements'].map((c) => (
                  <span key={c} className="text-[0.6rem] tracking-[0.12em] uppercase text-grey-6 border border-grey-3 px-2.5 py-1.5">{c}</span>
                ))}
              </div>
            </BentoCard>

            <BentoCard span="lg:col-span-2" title="Payroll and payslips" text="Salaries for internal office staff and field-staff earnings, with salary sheets and branded PDF payslips." />

            <BentoCard span="lg:col-span-2" title="Sales and recruitment commissions" text="Salespeople and recruiters are linked to the clients and staff they bring in, and the system tracks their commissions automatically." />

            <BentoCard span="lg:col-span-2" title="Quotations and estimates" text="A modular quote builder with reusable presets turns an enquiry into a live booking.">
              <div className="flex flex-wrap items-center gap-1.5 text-[0.72rem]">
                <span className="px-2.5 py-1.5 bg-grey-2 border border-grey-3 text-grey-6">Enquiry</span><span aria-hidden="true" className="text-grey-4">→</span>
                <span className="px-2.5 py-1.5 bg-grey-2 border border-grey-3 text-grey-6">PDF estimate</span><span aria-hidden="true" className="text-grey-4">→</span>
                <span className="px-2.5 py-1.5 bg-[#FAA6FF] text-black">Booking</span>
              </div>
            </BentoCard>

            <BentoCard span="lg:col-span-2" title="Enterprise-grade access control" text="More than 180 fine-grained permissions, custom roles, device activation for admin logins, active-session management and a complete activity log of who did what and when." />

            <BentoCard
              span="lg:col-span-2" title="Automatic documents" tech="Puppeteer · Handlebars · SheetJS"
              text="Invoices, receipts, statements, salary sheets, registration-fee invoices and transaction exports, generated as branded PDFs and Excel files."
            />

            <BentoCard
              span="lg:col-span-2" title="Messaging" tech="Meta WhatsApp Cloud API · Twilio · email providers"
              text="WhatsApp and SMS notifications and email alerts go out when bookings are made, staff are assigned, payments arrive and OTP codes are sent."
            />

            <BentoCard
              span="lg:col-span-2" title="Bulk data migration"
              text="Years of spreadsheet records were imported into the new system, with validation and every phone number converted to one international format."
              techNote="The international E.164 standard, so every SMS and WhatsApp message reaches the right phone."
            >
              <div className="vc-mono text-[0.75rem] p-2.5 bg-grey-2 border border-grey-3 text-[#FAA6FF]">077 123 4567 → +94 77 123 4567</div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section aria-labelledby="arch-h" className="py-28 px-[3.5%] border-b border-grey-3 relative">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(800px 500px at 10% 30%, rgba(47,25,95,.4), transparent 70%)' }} />
        <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal flex flex-col gap-5 lg:sticky lg:top-28">
            <Eyebrow>Under the hood</Eyebrow>
            <Heading id="arch-h" className="-mt-4">Built like the business depends on it. <Accent>Because it does.</Accent></Heading>
            <p className="text-[1rem] leading-[1.75] text-grey-6">
              Hosted on Amazon Web Services in the Mumbai (ap-south-1) region, the closest AWS region to Sri Lanka, for fast local response times.
            </p>
            <p className="text-[1rem] leading-[1.75] text-grey-6">
              Every service runs in a Docker container, a sealed, portable package, so the platform can be deployed the same way anywhere and moved between hosts easily.
            </p>
          </div>

          <div
            className="reveal flex flex-col"
            role="img"
            aria-label="Architecture diagram: users connect over HTTPS to an Nginx reverse proxy, which serves the React app and forwards API calls to a Node.js Express API. The API uses PostgreSQL on AWS RDS, files on AWS S3, and WhatsApp, SMS and email messaging."
          >
            <div className="flex flex-wrap justify-between items-center gap-5 px-5 py-4 bg-grey-1 border border-grey-3">
              <div><div className="text-white">Users</div><div className="text-[0.8rem] text-grey-5 mt-1">Browser or phone</div></div>
              <div className="flex gap-1.5">
                {['Public', 'Clients', 'Staff', 'Admins'].map((u) => <span key={u} className="vc-pill bg-white/10 text-white">{u}</span>)}
              </div>
            </div>
            <div className="vc-conn"><span /><b>HTTPS</b></div>
            <div className="flex flex-wrap justify-between items-center gap-5 px-5 py-4 border" style={{ background: 'rgba(155,123,255,.1)', borderColor: 'rgba(155,123,255,.35)' }}>
              <div><div className="text-white">Nginx reverse proxy + SSL</div><div className="text-[0.8rem] text-grey-5 mt-1">The front door: encrypts traffic and routes every request</div></div>
              <span className="vc-tech">Let's Encrypt · Certbot</span>
            </div>

            <div className="relative mt-5 px-3.5 pb-3.5 border border-dashed" style={{ borderColor: 'rgba(250,166,255,.45)' }}>
              <div className="relative -top-2.5 inline-block bg-black px-2 vc-mono text-[0.7rem] text-[#FAA6FF]">Docker containers · AWS EC2</div>
              <div className="px-5 py-4 bg-grey-1 border border-grey-3">
                <div className="text-white">React 19 single-page app</div>
                <div className="text-[0.8rem] text-grey-5 mt-1">All four apps' screens, served by Nginx</div>
              </div>
              <div className="vc-conn"><span /><b>/api</b></div>
              <div className="px-5 py-4 bg-grey-1 border border-grey-3 flex flex-col gap-4">
                <div>
                  <div className="text-white">Node.js + Express 5 REST API</div>
                  <div className="text-[0.8rem] text-grey-5 mt-1">The brain: every rule about money, people and time lives here</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    ['Login and permissions', 'JWT + permission middleware'],
                    ['Business services', 'billing · wallets · settlement · scheduling · commissions'],
                    ['Nightly engine', 'invoicing · rentals · actions · leave · fee expiry'],
                    ['Documents', 'PDF / Excel generation'],
                  ].map(([t, d]) => (
                    <div key={t} className="px-3 py-2.5 bg-grey-2 text-[0.82rem] text-white">
                      {t}
                      <div className="vc-mono text-[0.68rem] text-grey-5 mt-1">{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="vc-conn" style={{ height: 36 }}><span /></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                ['AWS RDS', 'PostgreSQL · 87 tables', 'violet'],
                ['AWS S3', 'Documents, photos, PDFs', 'violet'],
                ['Messaging', 'WhatsApp · SMS · Email', 'pink'],
              ].map(([t, d, tone]) => (
                <div key={t} className="p-4 border" style={{ background: TONES[tone].bg, borderColor: tone === 'pink' ? 'rgba(250,166,255,.3)' : 'rgba(155,123,255,.35)' }}>
                  <div className="text-white text-[0.9rem]">{t}</div>
                  <div className="text-[0.75rem] text-grey-5 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section aria-labelledby="stack-h" className="py-28 px-[3.5%] bg-grey-1">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal mb-14">
            <Eyebrow>Technology</Eyebrow>
            <Heading id="stack-h">A modern, <Accent>proven stack</Accent></Heading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-grey-3">
            {STACK.map((cat) => (
              <SpotlightCard
                key={cat.name}
                className="reveal stack-item !rounded-none !bg-transparent !p-10 border-r border-b !border-grey-3 !border-t-0 !border-l-0"
                spotlightColor="rgba(250, 166, 255, 0.25)"
              >
                <div className="relative flex items-center gap-3 text-[0.6rem] tracking-[0.3em] uppercase text-grey-5 mb-6">
                  {cat.name}
                  <span className="flex-1 h-px bg-grey-3" />
                </div>
                <div className="relative flex flex-wrap gap-1.5">
                  {cat.items.map((item) => <span key={item} className="vc-tech">{item}</span>)}
                </div>
                {cat.note && <div className="relative mt-4 text-[0.8rem] italic text-grey-5">{cat.note}</div>}
              </SpotlightCard>
            ))}
          </div>

          {/* Engineering quality */}
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-20 border-t border-white border-b border-b-grey-3">
            {QUALITY.map((q, i) => (
              <div key={q.title} className={`reveal py-9 ${i === 0 ? 'lg:pr-8' : i === 1 ? 'lg:px-8' : 'lg:pl-8'}`}>
                <div className="vc-mono text-[0.75rem] text-[#FAA6FF]">0{i + 1}</div>
                <h3 className="mt-3 mb-2.5 text-[1.2rem] text-white">{q.title}</h3>
                <p className="text-grey-6 leading-relaxed">{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      <section aria-labelledby="outcome-h" className="py-28 px-[3.5%] border-t border-b border-grey-3" style={{ background: '#0F1020' }}>
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal max-w-[900px]">
            <Eyebrow>The outcome</Eyebrow>
            <Heading id="outcome-h">From spreadsheets, WhatsApp and paper to <Accent>a single system</Accent> that everyone uses.</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-grey-3 border border-grey-3">
            {OUTCOMES.map((o) => (
              <div key={o.who} className="reveal p-8 flex gap-4 items-start" style={{ background: '#0F1020' }}>
                <span aria-hidden="true" className="block w-3 h-3 mt-1.5 rounded-full shrink-0" style={{ background: o.color }} />
                <div>
                  <div className="text-[1.1rem] text-white">{o.who}</div>
                  <p className="mt-1.5 text-grey-6 leading-relaxed">{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-h" className="py-32 px-[3.5%] text-center hero-grid">
        <div className="reveal max-w-[900px] mx-auto flex flex-col items-center gap-6">
          <Heading id="cta-h">Running your business on <Accent>spreadsheets and group chats?</Accent></Heading>
          <p className="max-w-[560px] text-[1.1rem] leading-relaxed text-grey-6">
            We build platforms like this: custom software shaped around how your business actually works.
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center mt-2">
            <LiveSiteButton size="sm" />
            <a href="/#contact" className="no-underline bg-off-white text-black text-[0.72rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#FAA6FF] transition-colors duration-200">
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
