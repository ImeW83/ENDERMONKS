import { useState } from 'react';
import {
  LuMap, LuMessagesSquare, LuTriangleAlert, LuSearch, LuNotebookPen, LuCreditCard, LuCheck, LuX,
  LuArrowRight, LuZap, LuLock, LuGlobe, LuMapPin, LuCamera, LuShieldCheck, LuGhost, LuImage,
} from 'react-icons/lu';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import './cheapass.css';

const LIVE_URL = 'https://cheapass.app';
const LOGO = '/logo/CheapAss%20Logo.jpeg';

const STATS = [
  { n: 2,   label: 'User roles',                    note: 'Drivers who post, public who search' },
  { n: 3,   label: 'Free trial posts',              note: 'Included with every new account' },
  { n: 100, label: 'Delivery Notes per $14.95',     note: 'One-time purchase' },
  { n: 1,   label: 'Stripe Checkout integration',   note: 'No card required for trial' },
  { n: 7,   label: 'Core app views',                note: 'Search, Post, My List, Subscribe, Profile, Premium, Verify' },
  { n: 5,   label: 'Delivery platforms supported',  note: 'UberEats, DoorDash, Grubhub, Instacart, and more' },
  { n: 6,   label: 'Issue categories',              note: 'Per delivery note' },
  { text: 'PWA', label: 'Installable on iOS and Android', note: 'Without an app store' },
];

const CHALLENGES = [
  { Icon: LuMap, title: 'No data, no pattern recognition', text: "Drivers accept or reject deliveries with almost no information. A low-tip offer from an address known to be in a gated community with no parking, or a customer notorious for complaints, gets accepted because there's nowhere to look that up." },
  { Icon: LuMessagesSquare, title: 'Community knowledge trapped in group chats', text: 'Driver communities exist on Facebook groups and Telegram. But searching "is 123 Main St worth it?" in a noisy chat returns nothing useful. There was no structured, searchable record of delivery history.' },
  { Icon: LuTriangleAlert, title: 'A real freemium business model was needed', text: "Building a community platform requires real monetisation that doesn't block value until users trust the product. The challenge was to design a trial-to-purchase flow that converts without friction, using Stripe Checkout with no card required for the trial." },
];

const PLATFORM = [
  {
    Icon: LuSearch, title: 'Public Search, no account required',
    text: 'Anyone can search by street address and see aggregated delivery notes for that location: actual tip amounts, perceived tip vs reality, which platform generated the order, issue notes, and driver-submitted photos.',
    points: ['Google Maps-powered address autocomplete', 'Filter by delivery platform and issue category', 'Full notes visible to logged-in users; teaser visible to guests'],
  },
  {
    Icon: LuNotebookPen, title: 'Delivery Note Posting, structured and fast',
    text: 'Logged-in drivers post structured notes tied to a real address. The form captures every relevant data point in under 60 seconds: delivery date, platform, perceived vs actual tip, apartment/suite number, issue category, and up to 3 photos.',
    points: ['Google Places SDK address search with GPS fallback', 'Perceived tip vs actual tip comparison tracked per post', 'Optional Apt/Ste modal for apartment deliveries', 'Photo upload via Firebase Storage with image cropping'],
  },
  {
    Icon: LuCreditCard, title: 'Freemium Monetisation, trial to purchase',
    text: 'New users get a 3-day free trial with 3 posts, with no credit card required. Drivers who find value upgrade to 100 notes for $14.95 as a one-time purchase, paid via Stripe Checkout. The system tracks post counts, expiry dates, and plan status in Firestore in real time.',
    points: ['3-day / 3-post free trial, no card required', '$14.95 one-time payment for 100 Delivery Notes (1-year validity)', 'Stripe Checkout with webhook + Firestore verification', 'Reload top-up available when notes run out'],
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pay', label: 'Payments & Auth' },
  { id: 'data', label: 'Data & Maps' },
  { id: 'ux', label: 'UX Patterns' },
];

const CARDS = [
  { cats: ['pay'], wide: true, cat: 'Payments & Auth', title: 'Stripe session verification on return URL', body: 'When a driver completes Stripe Checkout, they land back at the app with a ?session_id= in the URL. The app extracts this from the fragment hash (not just queryParameters), verifies it server-side, then updates Firestore, handling edge cases where webhooks fire before or after the redirect.', tag: 'Stripe Checkout · Firebase Cloud Functions · URL fragment parsing' },
  { cats: ['pay'], cat: 'Payments & Auth', title: 'Free trial with no credit card', body: 'The trial is activated entirely within Firebase, with no Stripe session created. The system enforces one trial per account, blocks double-activation, and tracks trialStartDate, trialEndDate, and hasUsedFreeTrial as atomic Firestore fields.', tag: 'Firestore atomic writes · Trial guard logic' },
  { cats: ['pay', 'data'], cat: 'Payments · Data', title: 'Notes quota & expiry engine', body: 'Each user has a postCount, postLimit, and notesExpiryDate. When a driver posts a note, the count increments. If they hit the limit or the date expires, posting is blocked with a contextual upgrade prompt, not a hard error screen.', tag: 'Firestore real-time · GetX reactive state' },
  { cats: ['ux'], wide: true, cat: 'UX Patterns', title: 'Cross-platform Flutter Web + PWA + mobile', body: 'The app runs as a fully responsive Flutter Web application (hosted on Firebase Hosting), a Progressive Web App installable on iOS and Android, and as a native mobile build. A Responsive utility class switches layouts between mobile, tablet and desktop breakpoints. The same codebase targets all three.', tag: 'Flutter Web · PWA manifest · flutter_screenutil · pwa_install' },
  { cats: ['data'], cat: 'Data & Maps', title: 'Google Maps address search with GPS fallback', body: 'On the Post screen, drivers type a delivery address and get autocomplete from Google Places SDK. If they grant location permission, the app can pre-fill the nearest street address via Geolocator. Addresses are stored in normalized form tied to each note.', tag: 'flutter_google_places_sdk · geolocator · location' },
  { cats: ['pay'], cat: 'Payments & Auth', title: 'Email verification with legacy paid user exception', body: 'New users must verify their email before accessing the app. However, paid users who purchased notes before email verification was added are whitelisted. The auth gate checks paymentPlan and postLimit before redirecting, preventing accidental lockout of paying customers.', tag: 'Firebase Auth · Firestore guard · legacy compatibility' },
  { cats: ['ux'], cat: 'UX Patterns', title: 'Active session & route management', body: 'GetX handles all navigation. The RootView listens to Firebase auth state changes and subscription status simultaneously, redirecting to the correct screen (Welcome, Verify Email, Premium Paywall, or Home) with no race conditions.', tag: 'GetX StreamBuilder · FutureBuilder pipeline' },
];

const STACK = [
  ['Mobile & Web Framework', ['Flutter 3.x', 'Dart', 'flutter_screenutil', 'PWA (pwa_install)', 'Flutter Web']],
  ['State & Navigation', ['GetX (GetxController, Obx, Get.offAllNamed)', 'Reactive state streams']],
  ['Backend & Database', ['Firebase Auth', 'Cloud Firestore', 'Firebase Storage', 'Firebase Hosting', 'Firebase Cloud Functions (Node.js)']],
  ['Payments', ['Stripe Checkout (Web)', 'Stripe Payment Sheet (Mobile)', 'flutter_stripe', 'flutter_stripe_web', 'Stripe Webhooks']],
  ['Maps & Location', ['Google Maps Flutter', 'flutter_google_places_sdk', 'geolocator', 'location', 'libphonenumber-js']],
  ['Utilities & DevOps', ['Dio + dio_smart_retry', 'image_picker', 'react-easy-crop', 'uuid', 'shared_preferences', 'Firebase CLI', 'flutter build web']],
];

const QUALITY = [
  { Icon: LuShieldCheck, title: 'Defensive subscription routing', text: 'The RootView auth gate handles 7 possible user states (unverified, trial active, trial expired, notes valid, notes exhausted, notes expired, and brand new), each routing to the correct screen without double-redirects or blank loading states.' },
  { Icon: LuGhost, title: 'Ghost session prevention', text: 'After Stripe redirects the user back with ?session_id= in the URL, the app verifies the session, updates Firestore, and then immediately clears the session parameters from the browser URL using history.replaceState, preventing "ghost sessions" from re-triggering on refresh.' },
  { Icon: LuImage, title: 'Cross-platform image handling', text: 'Image picking uses image_picker on mobile and image_picker_web on Flutter Web (same controller, different imports resolved at runtime), with a shared Firebase Storage upload pipeline and react-easy-crop for client-side cropping before upload.' },
];

const OUTCOMES = [
  { title: 'Drivers have a searchable delivery history', text: "Where there was a noisy group chat, now there's a structured, queryable database of real delivery experiences tied to real addresses." },
  { title: 'A working freemium funnel', text: 'The 3-day, no-card trial removes friction at signup. Drivers who find two or three notes that save them a bad delivery have already covered the $14.95 cost, so the conversion case writes itself.' },
  { title: 'Cross-platform from day one', text: 'A single Flutter codebase runs as a web app, a PWA on phones, and a potential native app store release, without maintaining separate codebases for iOS, Android, and web.' },
  { title: 'Zero-server-cost baseline', text: "Firebase's free tier and serverless Cloud Functions mean the platform costs effectively nothing until it scales past hundreds of daily active users, letting the product validate product-market fit before infrastructure spend." },
];

const PLANS = [
  {
    badge: 'Start here · No card needed', name: 'Free Trial', price: '$0', meta: '3 days · 3 Delivery Notes',
    points: [['Full access to public search', true], ['Post up to 3 Delivery Notes', true], ['Access to all categories and platforms', true], ['No photo uploads on trial', false]],
  },
  {
    badge: 'Most popular', name: 'Delivery Notes Pack', price: '$14.95', meta: '12 months · 100 notes', hi: true,
    points: [['100 structured Delivery Notes', true], ['Photo uploads (up to 3 per note)', true], ['Full history in My List', true], ['Top-up reload available', true]],
  },
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

// Grey continuation of a heading, echoing the original design's two-tone titles.
const Muted = ({ children }) => <span className="text-grey-5">{children}</span>;
const Accent = ({ children }) => <em className="font-fade not-italic text-off-white">{children}</em>;

function Point({ children, ok = true }) {
  return (
    <div className={`flex gap-2.5 items-start text-[0.92rem] leading-relaxed ${ok ? '' : 'text-grey-5'}`}>
      {ok ? <LuCheck size={17} className="shrink-0 mt-1" strokeWidth={2.6} /> : <LuX size={17} className="shrink-0 mt-1" strokeWidth={2.6} />}
      <span>{children}</span>
    </div>
  );
}

function Card({ Icon, title, children, className = '' }) {
  return (
    <SpotlightCard className={`reveal !rounded-none !border-0 !bg-grey-1 !p-8 flex flex-col gap-3.5 ${className}`} spotlightColor="rgba(255, 255, 255, 0.12)">
      {Icon && <div className="relative ca-ico"><Icon /></div>}
      <h3 className="relative text-white text-[1.2rem] leading-snug">{title}</h3>
      <div className="relative flex flex-col gap-3 text-[0.92rem] leading-relaxed text-grey-6">{children}</div>
    </SpotlightCard>
  );
}

function LiveSiteButton({ size = 'lg' }) {
  const big = size === 'lg';
  return (
    <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className={`ca-live-btn w-fit ${big ? 'px-7 py-5' : 'px-6 py-4'}`}>
      <span className="flex flex-col items-start leading-none">
        <span className={`font-bebas tracking-[0.06em] ${big ? 'text-[1.9rem]' : 'text-[1.5rem]'}`}>Visit the Live Site</span>
        <span className="ca-mono text-[0.68rem] tracking-[0.05em] opacity-60 mt-1">cheapass.app</span>
      </span>
      <span aria-hidden="true" className={big ? 'text-[1.6rem]' : 'text-[1.3rem]'}>↗</span>
    </a>
  );
}

function PhoneMockup() {
  return (
    <div className="relative flex justify-center py-5">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[10px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,.09), transparent 65%)' }} />
      <div aria-hidden="true" className="hidden sm:block absolute right-0 top-5 w-[150px] h-[170px] bg-black overflow-hidden border border-grey-4 rotate-6 z-[3]" style={{ boxShadow: '0 30px 50px -20px rgba(0,0,0,.8)' }}>
        <img src={LOGO} alt="" className="w-full h-full object-cover block" />
      </div>
      <div className="ca-phone" role="img" aria-label="Phone mockup of the Post a Delivery Note form">
        <div className="ca-screen">
          <div className="px-[18px] pt-[22px] pb-3 flex justify-between items-center border-b border-white/10">
            <div>
              <div className="font-bebas text-[1.35rem] tracking-[0.03em] leading-none">Post a Delivery Note</div>
              <div className="text-[10.5px] text-[#a1a1aa] mt-1">2 of 3 free trial notes left</div>
            </div>
            <span className="block w-8 h-8 rounded-[9px] bg-black overflow-hidden border border-white/15">
              <img src={LOGO} alt="" className="w-full h-full object-cover block" style={{ objectPosition: '40% 40%' }} />
            </span>
          </div>
          <div className="px-4 py-3.5 flex flex-col gap-3 flex-1">
            <div>
              <div className="ca-fl">Delivery address</div>
              <div className="ca-fi flex items-center gap-1.5"><LuMapPin size={13} className="text-[#a1a1aa]" />123 Main St</div>
              <div className="mt-1 border border-white/10 rounded-[10px] overflow-hidden text-[11px] bg-[#18181b]">
                <div className="px-3 py-1.5 bg-white/5">123 Main St, Springfield</div>
                <div className="px-3 py-1.5 text-[#a1a1aa]">123 Main Ave, Riverside</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><div className="ca-fl">Delivery date</div><div className="ca-fi">Today</div></div>
              <div><div className="ca-fl">Apt / Ste</div><div className="ca-fi text-[#71717a]">Add unit</div></div>
            </div>
            <div>
              <div className="ca-fl">Platform</div>
              <div className="flex gap-1 flex-wrap">
                {['UberEats', 'DoorDash', 'Grubhub', 'Instacart'].map((p, i) => <span key={p} className={`ca-mchip ${i === 0 ? 'ca-on' : ''}`}>{p}</span>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><div className="ca-fl">Perceived tip</div><div className="ca-fi">$8.00</div></div>
              <div><div className="ca-fl">Actual tip</div><div className="ca-fi !text-[#F87171] !border-[#F87171]/45">$0.00</div></div>
            </div>
            <div>
              <div className="ca-fl">Issue category</div>
              <div className="flex gap-1 flex-wrap">
                {['Tip baiting', 'No parking', 'Gated access'].map((p, i) => <span key={p} className={`ca-mchip ${i === 0 ? 'ca-on' : ''}`}>{p}</span>)}
              </div>
            </div>
            <div>
              <div className="ca-fl">Photos (up to 3)</div>
              <div className="flex gap-1.5">
                <span className="block w-[52px] h-[52px] rounded-[10px]" style={{ background: 'linear-gradient(135deg, #3F3F46, #18181B)' }} />
                <span className="w-[52px] h-[52px] rounded-[10px] border-[1.5px] border-dashed border-white/20 flex items-center justify-center text-[#71717a]"><LuCamera size={16} /></span>
                <span className="block w-[52px] h-[52px] rounded-[10px] border-[1.5px] border-dashed border-white/20" />
              </div>
            </div>
            <div className="mt-auto bg-white text-[#0a0a0b] text-center text-[13.5px] py-3 rounded-full">Post Delivery Note</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheapAssCaseStudy() {
  const revealRef = useReveal();
  const [statsRef, stats] = useCountUp(STATS.map((s) => s.n ?? 0), 1600);
  const [filter, setFilter] = useState('all');

  return (
    <main ref={revealRef} className="bg-black text-white overflow-hidden">

      {/* 1. HERO */}
      <header className="relative overflow-hidden pt-32 pb-24 px-[3.5%] border-b border-grey-3">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            WebkitMaskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent 75%)',
            maskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent 75%)',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-grey-5 mb-12">
            <a href="/#hero" className="no-underline text-grey-5 hover:text-white transition-colors">Endermonks</a>
            <span aria-hidden="true">/</span>
            <a href="/#work" className="no-underline text-grey-5 hover:text-white transition-colors">Work</a>
            <span aria-hidden="true">/</span>
            <span className="text-white">CheapAss</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
            <div className="flex flex-col gap-7">
              <div className="flex items-center gap-3">
                <span className="block w-12 h-12 bg-black overflow-hidden border border-grey-4">
                  <img src={LOGO} alt="" className="w-full h-full object-cover block" style={{ objectPosition: '40% 40%' }} />
                </span>
                <span className="font-bebas text-[2rem] tracking-[0.06em] leading-none">CheapAss</span>
              </div>
              <Eyebrow>Case Study · Gig Economy · Consumer SaaS Platform</Eyebrow>
              <h1 className="font-bebas uppercase text-white -mt-4" style={{ fontSize: 'clamp(3rem,6.5vw,6.2rem)', lineHeight: 0.92 }}>
                The delivery driver's <Accent>secret weapon.</Accent>{' '}
                <Muted>A community platform built for the gig economy.</Muted>
              </h1>
              <p className="text-[1.1rem] leading-relaxed text-grey-6 max-w-[640px]">
                CheapAss is a cross-platform Flutter application where delivery drivers share anonymous “Delivery Notes”, logging tips,
                addresses, platform info, and issue categories for every drop. Other drivers can search those notes to avoid bad deliveries.
                Built with Firebase, Stripe, Google Maps, and Flutter Web, it runs as a PWA on mobile and a full web app on desktop.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <LiveSiteButton />
                <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] uppercase text-grey-5">
                  <span className="block w-2 h-2 rounded-full bg-white" aria-hidden="true" /> Live in production
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Flutter / Dart', 'Firebase (Auth, Firestore, Storage)', 'Stripe Payments', 'Google Maps', 'PWA'].map((c) => (
                  <span key={c} className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-6 border border-grey-3 px-3 py-1.5">{c}</span>
                ))}
              </div>
            </div>
            <PhoneMockup />
          </div>
        </div>
      </header>

      {/* 2. STATS */}
      <section aria-label="Impact numbers" className="py-24 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div ref={statsRef} className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-grey-3 border border-grey-3">
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-grey-1 px-7 py-8">
              <div className="font-bebas leading-none text-white" style={{ fontSize: 'clamp(3rem,5vw,4.5rem)' }}>{s.text ?? stats[i]}</div>
              <div className="mt-3 text-[0.72rem] tracking-[0.15em] uppercase text-white">{s.label}</div>
              <div className="mt-2 text-[0.85rem] leading-relaxed text-grey-5">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHALLENGE */}
      <section aria-labelledby="ca-prob-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal max-w-[800px]">
            <Eyebrow>The challenge</Eyebrow>
            <Heading id="ca-prob-h">Delivery drivers were <Accent>flying blind.</Accent></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3">
            {CHALLENGES.map(({ Icon, title, text }) => (
              <Card key={title} Icon={Icon} title={title}><p>{text}</p></Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM */}
      <section aria-labelledby="ca-sol-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal max-w-[960px]">
            <Eyebrow>The platform</Eyebrow>
            <Heading id="ca-sol-h">A searchable delivery intelligence database, <Muted>built by drivers, for drivers.</Muted></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3">
            {PLATFORM.map(({ Icon, title, text, points }) => (
              <Card key={title} Icon={Icon} title={title} className="!bg-black">
                <p>{text}</p>
                <div className="flex flex-col gap-2.5 mt-1 pt-4 border-t border-grey-3 text-white">
                  {points.map((pt) => <Point key={pt}>{pt}</Point>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING (filterable) */}
      <section aria-labelledby="ca-bento-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
          <div className="reveal flex flex-wrap justify-between items-end gap-6">
            <div>
              <Eyebrow>Engineering deep-dive</Eyebrow>
              <Heading id="ca-bento-h">Harder than <Accent>it looks.</Accent></Heading>
            </div>
            <div role="group" aria-label="Filter by category" className="flex gap-0.5 flex-wrap">
              {FILTERS.map((f) => {
                const on = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={on}
                    className={`cursor-none min-h-[44px] px-4 text-[0.62rem] tracking-[0.18em] uppercase border transition-colors duration-200 ${on ? 'bg-off-white text-black border-off-white' : 'bg-transparent text-grey-5 border-grey-3 hover:text-white hover:border-grey-4'}`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARDS.map((c, i) => {
              if (filter !== 'all' && !c.cats.includes(filter)) return null;
              const wide = c.wide && filter === 'all';
              return (
                <SpotlightCard
                  key={`${filter}-${c.title}`}
                  className={`ca-in !rounded-none !border !border-grey-3 !bg-grey-1 !p-8 flex flex-col gap-3.5 ${wide ? 'lg:col-span-2' : ''}`}
                  spotlightColor="rgba(255, 255, 255, 0.12)"
                >
                  <div className="relative flex justify-between items-center gap-2.5">
                    <span className="ca-mono text-[0.72rem] text-grey-4">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-5">{c.cat}</span>
                  </div>
                  <h3 className="relative text-white text-[1.2rem] leading-snug">{c.title}</h3>
                  <p className="relative text-[0.92rem] leading-relaxed text-grey-6">{c.body}</p>
                  <div className="relative mt-auto pt-1.5"><span className="ca-tag">{c.tag}</span></div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ARCHITECTURE */}
      <section aria-labelledby="ca-arch-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal max-w-[900px]">
            <Eyebrow>System architecture</Eyebrow>
            <Heading id="ca-arch-h">One codebase. Three surfaces. <Muted>Firebase-native.</Muted></Heading>
          </div>
          <div
            className="reveal max-w-[920px] w-full mx-auto flex flex-col"
            role="img"
            aria-label="Architecture diagram: the Flutter app for web, PWA and mobile connects over HTTPS to Firebase Hosting, then to Firebase Auth and Cloud Firestore, Firebase Storage, Firebase Cloud Functions with four Stripe functions, Stripe, and external Google Maps and SMS services."
          >
            <div className="px-5 py-4 text-center bg-off-white text-black">
              <div className="text-[1.05rem]">Flutter App</div>
              <div className="text-[0.82rem] opacity-70 mt-1">Web · PWA · Mobile, one codebase</div>
            </div>
            <div className="ca-v"><span>HTTPS</span></div>
            <div className="px-5 py-4 text-center bg-black border border-grey-3">
              <div className="text-white">Firebase Hosting</div>
              <div className="text-[0.82rem] text-grey-5 mt-1">Static Flutter Web build</div>
            </div>
            <div className="ca-v"><span>Auth &amp; real-time</span></div>
            <div className="grid md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1.4fr)] gap-3 md:gap-0">
              <div className="px-5 py-4 bg-black border border-grey-3"><div className="text-white">Firebase Auth</div><div className="text-[0.82rem] text-grey-5 mt-1">Sign-up, email verification, sessions</div></div>
              <div className="hidden md:flex items-center justify-center text-grey-5 ca-mono" aria-hidden="true">⟷</div>
              <div className="px-5 py-4 bg-black border border-grey-3"><div className="text-white">Cloud Firestore</div><div className="text-[0.82rem] text-grey-5 mt-1">User profiles · Delivery Notes · Subscriptions</div></div>
            </div>
            <div className="ca-v" />
            <div className="px-5 py-4 text-center bg-black border border-grey-3">
              <div className="text-white">Firebase Storage</div>
              <div className="text-[0.82rem] text-grey-5 mt-1">Delivery photos, user avatars</div>
            </div>
            <div className="ca-v" />
            <div className="px-5 py-4 bg-black border border-grey-3">
              <div className="text-white">Firebase Cloud Functions (Node.js)</div>
              <div className="text-[0.82rem] text-grey-5 mt-1">Every Stripe call runs here, never in the app</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {['createCheckoutSession', 'createPaymentIntent', 'verifyCheckoutSession', 'cancelStripeSubscription'].map((f) => <span key={f} className="ca-tag">{f}</span>)}
              </div>
            </div>
            <div className="ca-v" />
            <div className="grid md:grid-cols-2 gap-3.5">
              <div className="px-5 py-4 bg-black border border-grey-3"><div className="text-white">Stripe</div><div className="text-[0.82rem] text-grey-5 mt-1">Checkout · Webhooks · Payment Intents</div></div>
              <div className="px-5 py-4 bg-black border border-dashed border-grey-4"><div className="text-white">External APIs</div><div className="text-[0.82rem] text-grey-5 mt-1">Google Maps Platform (Places SDK, Geocoding) · Twilio / Firebase SMS (OTP, future)</div></div>
            </div>
          </div>
          <p className="reveal max-w-[920px] mx-auto text-[1rem] leading-[1.75] text-grey-6">
            The entire backend runs serverless on Firebase. Cloud Functions handle all Stripe interactions so no secret keys are ever exposed
            to the client. Firestore's real-time listeners mean the app reacts instantly to subscription changes, with no polling and no
            refresh required.
          </p>
        </div>
      </section>

      {/* 7. PRICING */}
      <section aria-labelledby="ca-price-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal text-center flex flex-col items-center">
            <Eyebrow>Business model</Eyebrow>
            <Heading id="ca-price-h">From “try it” to <Accent>“need it”</Accent> in 3 days.</Heading>
          </div>
          <div className="reveal grid lg:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] gap-4 items-center max-w-[920px] w-full mx-auto">
            {PLANS.map((p, idx) => (
              <div key={p.name} className="contents">
                {idx === 1 && (
                  <div className="flex justify-center text-grey-5 rotate-90 lg:rotate-0" aria-hidden="true"><LuArrowRight size={34} /></div>
                )}
                <div className={`p-8 flex flex-col gap-5 ${p.hi ? 'bg-off-white text-black' : 'border border-grey-4 text-white'}`}>
                  <span className={`self-start text-[0.6rem] tracking-[0.15em] uppercase px-2.5 py-1.5 ${p.hi ? 'bg-black text-off-white' : 'border border-grey-4 text-grey-6'}`}>{p.badge}</span>
                  <div className={`ca-mono text-[0.75rem] uppercase ${p.hi ? 'opacity-60' : 'text-grey-5'}`}>{p.name}</div>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="font-bebas text-[4.5rem] leading-none">{p.price}</span>
                    <span className={p.hi ? 'opacity-60' : 'text-grey-5'}>{p.meta}</span>
                  </div>
                  <div className={`flex flex-col gap-2.5 pt-4 border-t ${p.hi ? 'border-black/15' : 'border-grey-3'}`}>
                    {p.points.map(([pt, ok]) => <Point key={pt} ok={ok}>{pt}</Point>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal flex justify-center items-center gap-3 flex-wrap text-center text-grey-5 text-[0.9rem]">
            <span className="inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.15em] uppercase px-3 py-1.5 border border-grey-4 text-white"><LuLock size={14} />Powered by Stripe</span>
            <span>Secure, fast, PCI-compliant. No subscription. No auto-renewal.</span>
          </div>
        </div>
      </section>

      {/* 8. STACK */}
      <section aria-labelledby="ca-stack-h" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal max-w-[900px]">
            <Eyebrow>Technology stack</Eyebrow>
            <Heading id="ca-stack-h">Battle-tested, <Accent>cost-effective</Accent> infrastructure.</Heading>
          </div>
          <div className="reveal border-b border-grey-3">
            {STACK.map(([label, items]) => (
              <div key={label} className="grid md:grid-cols-[230px_minmax(0,1fr)] gap-3 md:gap-5 items-start py-6 border-t border-grey-3">
                <div className="text-[0.62rem] tracking-[0.3em] uppercase text-grey-5 pt-2">{label}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((it) => (
                    <span key={it} className="text-[0.88rem] text-grey-6 px-3.5 py-2 bg-black border border-grey-3 hover:text-white hover:border-grey-4 transition-colors">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Engineering quality */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-grey-3 border border-grey-3 mt-8">
            {QUALITY.map(({ Icon, title, text }) => (
              <Card key={title} Icon={Icon} title={title} className="!bg-black"><p>{text}</p></Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. OUTCOME */}
      <section aria-labelledby="ca-out-h" className="py-28 px-[3.5%] border-b border-grey-3">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="reveal">
            <Eyebrow>Results</Eyebrow>
            <Heading id="ca-out-h">A real product, <Accent>used by real drivers.</Accent></Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-grey-3 border border-grey-3">
            {OUTCOMES.map(({ title, text }) => (
              <div key={title} className="reveal bg-black p-8 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <span className="w-[30px] h-[30px] rounded-full bg-off-white text-black flex items-center justify-center shrink-0"><LuCheck size={16} strokeWidth={3} /></span>
                  <h3 className="text-white text-[1.2rem] leading-snug">{title}</h3>
                </div>
                <p className="text-grey-6 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section aria-labelledby="ca-cta-h" className="relative overflow-hidden py-36 px-[3.5%] text-center hero-grid">
        <div aria-hidden="true" className="absolute left-1/2 top-[55%] w-[1100px] h-[700px] -translate-x-1/2 -translate-y-1/2 blur-[20px]" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,.08), transparent)' }} />
        <div className="reveal relative max-w-[900px] mx-auto flex flex-col items-center gap-6">
          <span className="block w-[92px] h-[108px] bg-black overflow-hidden border border-grey-4">
            <img src={LOGO} alt="" className="w-full h-full object-cover block" />
          </span>
          <Heading id="ca-cta-h">Got a community, marketplace, or <Accent>gig-economy idea?</Accent></Heading>
          <p className="max-w-[620px] text-[1.1rem] leading-relaxed text-grey-6">
            We design and build products like this: fast, lean, and built to grow. From zero to a working product with real users.
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center mt-2">
            <LiveSiteButton size="sm" />
            <a href="/#contact" className="no-underline border border-off-white text-off-white text-[0.72rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-off-white hover:text-black transition-colors duration-200">
              Start a Project ↗
            </a>
            <a href="/#work" className="no-underline text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5">
              ← Back to all work
            </a>
          </div>
          <div className="flex gap-6 flex-wrap justify-center text-grey-5 text-[0.85rem] mt-2">
            <span className="inline-flex items-center gap-1.5"><LuZap size={15} />Typically respond within 24 hours</span>
            <span className="inline-flex items-center gap-1.5"><LuLock size={15} />NDA on request</span>
            <span className="inline-flex items-center gap-1.5"><LuGlobe size={15} />Remote-friendly</span>
          </div>
        </div>
      </section>
    </main>
  );
}
