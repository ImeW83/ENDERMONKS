import { useRef, useState } from 'react';
import { LuCheck, LuZap, LuLock, LuGlobe } from 'react-icons/lu';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import './evorn.css';

const GLOW = 'rgba(226, 184, 87, 0.25)';

// ASSUMED STACK: confirm front end and database
const HERO_CHIPS = ['React', 'Vercel', 'Resend', 'SMSAPI.lk', 'evorn.lk'];

// 2, 1 and 1 are real. 3 seconds and 100 percent are invented placeholders: replace
const STATS = [
  { n: 2,   label: 'Alert channels',     note: 'Email and SMS on every order.' },
  { n: 1,   label: 'Approved sender ID', note: 'Texts arrive from “EVORN”, not a number.' },
  { n: 3,   suffix: 's', label: 'Order to alert', note: 'Placeholder: measure real delivery time.' },
  { n: 100, suffix: '%', label: 'Own domain',     note: 'Live on evorn.lk, DNS managed at register.lk.' },
];

const CHALLENGES = [
  { title: 'Trust comes first', text: 'Buyers of jewellery want to feel the shop is real before they pay. A custom domain, clear confirmations and a named sender all do that work.' },
  { title: "Orders can't be missed", text: 'A small business has no ops team watching a dashboard. If an order lands, the owner and the customer must both hear about it straight away.' },
  { title: 'Local delivery rails', text: 'Sri Lankan SMS needs an approved sender ID, and the domain must go through the LK Domain Registry. Both have lead times and paperwork.' },
];

const SOLUTION = [
  { label: '01 · The storefront', title: 'Shop on evorn.lk', text: 'A fast, mobile-first catalogue and checkout where customers browse pieces and place orders.', chips: ['React', 'Vercel'], mock: 'tiles' },
  { label: '02 · The order desk', title: 'Every order, one view', text: 'New orders arrive in one place so the owner can confirm, pack and ship without chasing messages.', chips: ['Orders API'], mock: 'table' },
  { label: '03 · The notifier', title: 'Email and SMS alerts', text: 'Resend handles email, SMSAPI.lk handles text, both through plain fetch calls with no extra SDKs.', chips: ['Resend', 'SMSAPI.lk'], mock: 'term' },
];

const STEPS = [
  { title: 'Customer places an order', text: 'Checkout posts the order to the server.' },
  { title: 'Email goes out via Resend', text: 'Receipt with items, total and order number.' },
  { title: 'SMS goes out via SMSAPI.lk', text: 'Short confirmation from the EVORN sender ID.' },
];

// sample order: invented for the preview
const SAMPLE_ITEMS = ['Gold pendant', 'Silver ring'];

const BENTO = [
  { wide: true, title: 'Alerts without the extra weight', text: 'Email and SMS both use plain fetch against the provider APIs. No Resend package, no SDK to update, and a smaller bundle to deploy.', tag: 'fetch · Resend · SMSAPI.lk' },
  { title: 'Switching SMS providers', text: 'The first provider was dropped for SMSAPI.lk, which worked end to end.', tag: 'provider swap' },
  { title: 'A sender name, not a number', text: 'The “EVORN” sender ID was requested by formal letter and is now approved.', tag: 'sender ID' },
  { wide: true, title: 'A real .lk domain', text: 'evorn.lk was requested through the LK Domain Registry, is active, and its DNS is managed at register.lk.', tag: 'LK Domain Registry · DNS' },
  { wide: true, title: 'Shipped to production', text: 'The store runs on Vercel and is meant for real trading as a small startup, not as a demo.', tag: 'Vercel' },
  { title: 'Secrets kept off the client', text: 'API keys live in server environment variables, never in browser code.', tag: 'env vars' },
];

// ASSUMED: confirm every chip below
const STACK = [
  ['Frontend', ['React', 'Tailwind CSS']],
  ['Backend', ['Node.js', 'Serverless functions', 'fetch']],
  ['Messaging', ['Resend (email)', 'SMSAPI.lk (SMS)']],
  ['Infra', ['Vercel', 'evorn.lk', 'register.lk DNS']],
  ['Source', ['GitHub (private)']],
];

const QUALITY = [
  { title: 'Tested end to end', text: 'SMS and email were tested live against the real providers before launch.', tag: 'live provider tests' },
  { title: 'Secure by default', text: 'Provider keys stay on the server, and the whole site is served over HTTPS on its own domain.', tag: 'HTTPS · env vars' },
  { title: 'Fast on mobile', text: 'Most jewellery shoppers browse on a phone, so the storefront is built mobile-first.', tag: 'mobile-first' },
];

const OUTCOMES = [
  { title: 'Live on evorn.lk', text: 'A working store with its own .lk address.' },
  { title: 'Instant order alerts', text: 'Email and SMS fire on every order.' },
  { title: 'Branded sender', text: 'Customers see EVORN, not a random number.' },
  { title: 'Ready for a startup', text: 'Deployed and set up for small-scale real sales.' },
];

function Eyebrow({ children, className = '' }) {
  return (
    <p className={`flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-[#E2B857] mb-4 before:block before:w-8 before:h-px before:bg-[#E2B857] ${className}`}>
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

const Accent = ({ children }) => <em className="font-fade not-italic text-[#E2B857]">{children}</em>;

function Brand({ name }) {
  return (
    <div className="flex items-center gap-3">
      <span className="ev-mark" aria-hidden="true"><i /></span>
      <span className="font-bebas text-[1.75rem] tracking-[0.28em] leading-none text-white">{name}</span>
    </div>
  );
}

function Card({ title, children, tag, className = '' }) {
  return (
    <SpotlightCard className={`reveal !rounded-none !border-0 !bg-grey-1 !p-8 flex flex-col gap-3.5 ${className}`} spotlightColor={GLOW}>
      <h3 className="relative font-bebas uppercase text-white text-[1.9rem] leading-[0.95]">{title}</h3>
      <div className="relative flex flex-col gap-3 text-[0.92rem] leading-relaxed text-grey-6">{children}</div>
      {tag && <div className="relative mt-auto pt-2"><span className="ev-tag">{tag}</span></div>}
    </SpotlightCard>
  );
}

function PhoneMockup() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[560px]" aria-hidden="true">
      <div className="absolute right-[-8%] top-[10%] w-[640px] max-w-[90vw] aspect-square pointer-events-none" style={{ background: `radial-gradient(circle, rgba(226,184,87,.16), transparent 65%)` }} />
      <div className="ev-phone">
        <div className="w-[70px] h-1.5 bg-[#222] mx-auto mb-3.5" />
        <div className="flex justify-between font-bebas tracking-[0.2em] text-white text-[15px] mb-3"><span>EVORN</span><span>☰</span></div>
        <div className="ev-ph-hero"><div className="ev-ring" /></div>
        <div className="grid grid-cols-2 gap-2 mt-2.5">
          <div className="ev-ph-card"><span /><span /></div>
          <div className="ev-ph-card"><span /><span /></div>
        </div>
        <div className="mt-2.5 bg-[#E2B857] text-black text-[10px] tracking-[0.2em] text-center p-[11px] uppercase font-semibold">Place order</div>
      </div>
      <div className="ev-toast ev-t1"><b>Email · Resend</b>Order confirmed. Your receipt is on its way.</div>
      <div className="ev-toast ev-t2"><b>SMS · EVORN</b>Thanks for shopping with EVORN. Your order is confirmed.</div>
    </div>
  );
}

function SolutionMock({ kind }) {
  if (kind === 'tiles') {
    return (
      <div className="ev-mock" aria-hidden="true">
        <div className="ev-tiles"><i /><i /><i /><i /><i /><i /></div>
        <div className="h-1.5 w-[35%] bg-[#E2B857]" />
      </div>
    );
  }
  if (kind === 'table') {
    return (
      <div className="ev-mock" aria-hidden="true">
        {[['#1042', 'Pendant', 'NEW'], ['#1041', 'Ring', 'PAID'], ['#1040', 'Bracelet', 'SENT']].map(([id, item, st]) => (
          <div key={id} className="ev-trow"><span>{id}</span><span>{item}</span><em>{st}</em></div>
        ))}
      </div>
    );
  }
  return (
    <div className="ev-mock ev-term" aria-hidden="true">
      <span>POST <b>/api/notify</b></span>
      <span>→ resend.emails <b>200</b></span>
      <span>→ smsapi.lk <b>200</b></span>
      <span>sender: <b>EVORN</b></span>
    </div>
  );
}

function MailLines({ last }) {
  return (
    <>
      {SAMPLE_ITEMS.map((it) => (
        <div key={it} className="flex justify-between border-t border-grey-3 py-2.5 text-[13px]"><span>{it}</span><b className="text-white font-medium">1 ×</b></div>
      ))}
      <div className="flex justify-between border-t border-grey-3 py-2.5 text-[13px]"><span>{last[0]}</span><b className="text-white font-medium">{last[1]}</b></div>
    </>
  );
}

function StepPane({ step }) {
  if (step === 0) {
    return (
      <div className="border border-grey-3 bg-grey-1">
        <div className="ev-mono px-[18px] py-3.5 border-b border-grey-3 text-[12px] text-grey-5 leading-[1.7]">
          POST <b className="text-white font-normal">/api/orders</b><br />status: <b className="text-white font-normal">201 Created</b>
        </div>
        <div className="px-[18px] py-[22px] text-[14px]">
          <h4 className="font-bebas tracking-[0.1em] text-[24px] text-white uppercase mb-2.5">Order received</h4>
          <MailLines last={['Next', 'Trigger notifications']} />
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <>
        <div className="border border-grey-3 bg-grey-1">
          <div className="ev-mono px-[18px] py-3.5 border-b border-grey-3 text-[12px] text-grey-5 leading-[1.7]">
            From: <b className="text-white font-normal">EVORN</b><br />Subject: <b className="text-white font-normal">Your EVORN order is confirmed</b>
          </div>
          <div className="px-[18px] py-[22px] text-[14px]">
            <h4 className="font-bebas tracking-[0.1em] text-[24px] text-white uppercase mb-2.5">Thank you for your order</h4>
            <MailLines last={['Status', 'Confirmed']} />
          </div>
        </div>
        <p className="ev-mono text-[11px] text-grey-5 mt-[18px]">Sent with plain <b className="text-[#E2B857] font-normal">fetch</b> to the Resend API.</p>
      </>
    );
  }
  return (
    <>
      <div className="max-w-[330px] mx-auto">
        <div className="ev-mono text-center text-[11px] text-grey-5 tracking-[0.15em] mb-3.5">FROM · <b className="text-[#E2B857] font-medium">EVORN</b></div>
        <div className="ev-bub bg-[#1d1d1d] border border-grey-3 px-4 py-3.5 text-[14px] text-[#ddd]">
          Thanks for shopping with EVORN. Your order is confirmed and we are preparing it now.
        </div>
      </div>
      <p className="ev-mono text-[11px] text-grey-5 mt-[18px] text-center">Sender ID “<b className="text-[#E2B857] font-normal">EVORN</b>” approved by SMSAPI.lk.</p>
    </>
  );
}

// In the fan-out row the grid sets the width; elsewhere nodes keep a minimum width.
function ArchNode({ title, sub, core = false, fork = false }) {
  return (
    <div className={`relative px-7 py-[18px] text-center border max-w-full ${fork ? 'min-w-0' : 'w-full sm:w-auto sm:min-w-[300px]'} ${core ? 'bg-[#E2B857] border-[#E2B857] text-black' : 'bg-black border-grey-3'}`}>
      <div className={`text-[13px] font-medium tracking-[0.14em] uppercase ${core ? '' : 'text-white'}`}>{title}</div>
      <div className={`ev-mono text-[11px] mt-1 ${core ? 'opacity-70' : 'text-grey-5'}`}>{sub}</div>
    </div>
  );
}

function NotificationFlow() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + STEPS.length) % STEPS.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-11 lg:gap-14 items-start">
      <div role="tablist" aria-label="Order notification steps" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-px bg-grey-3 border border-grey-3">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.title}
              ref={(el) => { tabsRef.current[i] = el; }}
              type="button"
              role="tab"
              id={`ev-tab-${i}`}
              aria-selected={on}
              aria-controls="ev-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className="ev-step cursor-none grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-1 text-left px-6 py-[22px] bg-grey-1 hover:bg-[#161616] transition-colors duration-200"
            >
              <span className={`ev-mono row-span-2 pt-[3px] text-[11px] ${on ? 'text-[#E2B857]' : 'text-grey-5'}`}>{String(i + 1).padStart(2, '0')}</span>
              <strong className="text-white font-medium text-[15px]">{s.title}</strong>
              <span className="text-[13.5px] text-grey-5">{s.text}</span>
            </button>
          );
        })}
      </div>
      <div className="border border-grey-3 bg-[#0a0a0a] p-4 sm:p-7 min-h-[360px] text-grey-6">
        <div key={active} id="ev-panel" role="tabpanel" aria-labelledby={`ev-tab-${active}`} tabIndex={0} className="ev-in">
          <StepPane step={active} />
        </div>
      </div>
    </div>
  );
}

export default function EvornCaseStudy() {
  const revealRef = useReveal();
  const [statsRef, stats] = useCountUp(STATS.map((s) => s.n), 1200);

  return (
    <main ref={revealRef} className="bg-black text-white overflow-hidden">

      {/* 1. HERO */}
      <header className="relative overflow-hidden pt-32 pb-24 px-[3.5%] border-b border-grey-3">
        <div aria-hidden="true" className="absolute inset-0 ev-grid-bg" />
        <div className="relative max-w-[1400px] mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-grey-5 mb-12">
            <a href="/#hero" className="no-underline text-grey-5 hover:text-white transition-colors">Endermonks</a>
            <span aria-hidden="true">/</span>
            <a href="/#work" className="no-underline text-grey-5 hover:text-white transition-colors">Work</a>
            <span aria-hidden="true">/</span>
            <span className="text-white">EVORN</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-11 lg:gap-14 items-center">
            <div className="flex flex-col gap-7 min-w-0">
              <Brand name="EVORN" />
              <Eyebrow>Case Study · E-commerce · Jewellery</Eyebrow>
              <h1 className="font-bebas uppercase text-white -mt-4" style={{ fontSize: 'clamp(3rem,7vw,6.4rem)', lineHeight: 0.92 }}>
                A jewellery store that <Accent>tells you</Accent> the moment it sells.
              </h1>
              <p className="text-[1.1rem] leading-relaxed text-grey-6 max-w-[62ch]">
                EVORN is an online jewellery store built for real trading in Sri Lanka. Customers browse and order on evorn.lk, and every
                order triggers an email and an SMS from the approved EVORN sender ID.
              </p>
              <div className="flex flex-wrap gap-2">
                {HERO_CHIPS.map((c) => <span key={c} className="ev-chip">{c}</span>)}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="https://evorn.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline inline-flex items-center gap-2.5 bg-[#E2B857] border border-[#E2B857] text-black text-[0.72rem] tracking-[0.2em] uppercase px-7 py-4 hover:bg-[#F0D28A] hover:border-[#F0D28A] transition-colors duration-200"
                >
                  Live Site ↗
                </a>
                <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] uppercase text-grey-5">
                  <span className="block ev-live" aria-hidden="true" /> Deployed on Vercel
                </span>
              </div>
            </div>
            <PhoneMockup />
          </div>
        </div>
      </header>

      {/* 2. STATS */}
      <section aria-label="Impact numbers" className="py-24 px-[3.5%] border-b border-grey-3">
        <div ref={statsRef} className="reveal max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grey-3 border border-grey-3">
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-black px-7 py-10">
              <div className="font-bebas leading-none text-[#E2B857] tabular-nums" style={{ fontSize: 'clamp(3rem,5vw,4.6rem)' }}>{stats[i]}{s.suffix}</div>
              <div className="mt-3 text-[0.72rem] tracking-[0.2em] uppercase text-white">{s.label}</div>
              <div className="mt-2 text-[0.85rem] leading-relaxed text-grey-5">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHALLENGE */}
      <section aria-labelledby="ev-prob-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
          <div className="reveal">
            <Eyebrow>The challenge</Eyebrow>
            <div className="grid lg:grid-cols-2 gap-11 lg:gap-16 items-end">
              <Heading id="ev-prob-h">Selling jewellery online is <Accent>harder</Accent> than it looks.</Heading>
              <div>
                <div className="font-bebas leading-[0.8] text-[#E2B857]" style={{ fontSize: 'clamp(6rem,16vw,13rem)' }}>0</div>
                <p className="ev-mono mt-3.5 text-[12px] tracking-[0.1em] uppercase text-grey-5 max-w-[34ch]">Tolerance for a missed order when each sale is a single high-value piece.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3">
            {CHALLENGES.map(({ title, text }) => (
              <Card key={title} title={title}><p>{text}</p></Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section aria-labelledby="ev-sol-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[880px]">
            <Eyebrow>The solution</Eyebrow>
            <Heading id="ev-sol-h">Three parts. <Accent>One store.</Accent></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3">
            {SOLUTION.map(({ label, title, text, chips, mock }) => (
              <SpotlightCard key={title} className="reveal !rounded-none !border-0 !bg-black !p-8 flex flex-col gap-3.5" spotlightColor={GLOW}>
                <span className="relative ev-mono text-[11px] tracking-[0.25em] uppercase text-[#E2B857]">{label}</span>
                <h3 className="relative font-bebas uppercase text-white text-[1.9rem] leading-[0.95]">{title}</h3>
                <p className="relative text-[0.92rem] leading-relaxed text-grey-6">{text}</p>
                <div className="relative mt-auto"><SolutionMock kind={mock} /></div>
                <div className="relative flex flex-wrap gap-2">{chips.map((c) => <span key={c} className="ev-chip">{c}</span>)}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NOTIFICATION FLOW */}
      <section aria-labelledby="ev-flow-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[880px]">
            <Eyebrow>The signature feature</Eyebrow>
            <Heading id="ev-flow-h">One order. <Accent>Two alerts.</Accent></Heading>
            <p className="mt-6 text-[1.1rem] leading-relaxed text-grey-6">Pick a step to see what the customer receives.</p>
          </div>
          <div className="reveal"><NotificationFlow /></div>
        </div>
      </section>

      {/* 6. BENTO */}
      <section aria-labelledby="ev-bento-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[880px]">
            <Eyebrow>Under the hood</Eyebrow>
            <Heading id="ev-bento-h">The hard parts, <Accent>handled.</Accent></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3">
            {BENTO.map((c, i) => (
              <SpotlightCard
                key={c.title}
                className={`reveal !rounded-none !border-0 !bg-black !p-8 flex flex-col gap-3 ${c.wide ? 'lg:col-span-2' : ''}`}
                spotlightColor={GLOW}
              >
                <span className="relative ev-mono text-[11px] tracking-[0.2em] text-[#E2B857]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="relative font-bebas uppercase text-white text-[2rem] leading-[0.95]">{c.title}</h3>
                <p className="relative text-[0.92rem] leading-relaxed text-grey-6 max-w-[60ch]">{c.text}</p>
                <div className="relative mt-auto pt-2"><span className="ev-tag">{c.tag}</span></div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURE */}
      <section aria-labelledby="ev-arch-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[880px] mx-auto text-center flex flex-col items-center">
            <Eyebrow>Architecture</Eyebrow>
            <Heading id="ev-arch-h">Request flow, <Accent>top to bottom.</Accent></Heading>
          </div>
          {/* ASSUMED: confirm backend and data layer */}
          <div
            className="reveal max-w-[960px] w-full mx-auto flex flex-col items-center"
            role="img"
            aria-label="Architecture diagram: the customer reaches the React storefront on Vercel over HTTPS. The storefront posts to the Order API, which validates and saves the order and fans out to Resend for the email receipt, SMSAPI.lk for the SMS from sender EVORN, and the order database."
          >
            <ArchNode title="Customer" sub="evorn.lk" />
            <div className="ev-conn"><span>HTTPS</span></div>
            <ArchNode title="Storefront" sub="React on Vercel" />
            <div className="ev-conn"><span>POST /api/orders</span></div>
            <ArchNode title="Order API" sub="validates · saves · triggers alerts" core />
            <div className="ev-conn"><span>fan out</span></div>
            <div className="ev-fork grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              <ArchNode fork title="Resend" sub="email receipt" />
              <ArchNode fork title="SMSAPI.lk" sub="SMS, sender EVORN" />
              <ArchNode fork title="Order store" sub="database" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. STACK */}
      <section aria-labelledby="ev-stack-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[880px]">
            <Eyebrow>Stack</Eyebrow>
            <Heading id="ev-stack-h">What it's <Accent>built with.</Accent></Heading>
          </div>
          <div className="reveal border border-grey-3">
            {STACK.map(([label, items]) => (
              <div key={label} className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-3 md:gap-6 items-center px-7 py-6 border-b border-grey-3 last:border-b-0">
                <div className="text-[0.72rem] tracking-[0.25em] uppercase text-white">{label}</div>
                <div className="flex flex-wrap gap-2">{items.map((it) => <span key={it} className="ev-chip">{it}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. QUALITY */}
      <section aria-labelledby="ev-qual-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal max-w-[880px]">
            <Eyebrow>Quality</Eyebrow>
            <Heading id="ev-qual-h">Built to <Accent>trade for real.</Accent></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3">
            {QUALITY.map(({ title, text, tag }) => (
              <Card key={title} title={title} tag={tag}><p>{text}</p></Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. OUTCOME */}
      <section aria-labelledby="ev-out-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-14">
          <div className="reveal">
            <Eyebrow>Outcome</Eyebrow>
            <Heading id="ev-out-h" className="max-w-[18ch]">From an idea to a <Accent>real shop</Accent> on its own domain.</Heading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grey-3 border border-grey-3">
            {OUTCOMES.map(({ title, text }) => (
              <div key={title} className="reveal bg-black px-[26px] py-8">
                <span className="w-7 h-7 border border-[#E2B857] text-[#E2B857] flex items-center justify-center mb-[18px]" aria-hidden="true"><LuCheck size={15} strokeWidth={2.6} /></span>
                <h3 className="text-white text-[15px] font-medium mb-1.5">{title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-grey-6">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA */}
      <section aria-labelledby="ev-cta-h" className="relative overflow-hidden py-36 px-[3.5%] text-center bg-grey-1">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 w-[720px] max-w-[100vw] aspect-square -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(226,184,87,.14), transparent 65%)' }} />
        <div className="reveal relative max-w-[900px] mx-auto flex flex-col items-center gap-6">
          <div className="mb-3"><Brand name="ENDERMONKS" /></div>
          <Heading id="ev-cta-h" className="max-w-[14ch]">Selling online and <Accent>missing orders?</Accent></Heading>
          <div className="flex flex-wrap justify-center gap-6 items-center mt-5">
            <a href="/#contact" className="no-underline border border-[#E2B857] text-[#E2B857] text-[0.72rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#E2B857] hover:text-black transition-colors duration-200">
              Start a Project ↗
            </a>
            <a href="/#work" className="no-underline text-[0.68rem] tracking-[0.18em] uppercase text-[#E2B857] border-b border-[#E2B857]/40 pb-0.5 hover:text-[#F0D28A]">
              ← Back to all work
            </a>
          </div>
          <div className="flex gap-6 flex-wrap justify-center text-grey-5 text-[0.85rem] mt-4">
            <span className="inline-flex items-center gap-1.5"><LuZap size={15} />Typically respond within 24 hours</span>
            <span className="inline-flex items-center gap-1.5"><LuLock size={15} />NDA on request</span>
            <span className="inline-flex items-center gap-1.5"><LuGlobe size={15} />Remote-friendly</span>
          </div>
        </div>
      </section>
    </main>
  );
}

