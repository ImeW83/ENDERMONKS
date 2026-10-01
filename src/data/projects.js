// Shared by the home-page Projects section and the full portfolio page.
// Class strings are written out in full so Tailwind can see them.
export const gridBg = {
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
  backgroundSize: '30px 30px',
};

export const themes = {
  pink: {
    glow: 'rgba(47,25,95,.65)',
    tag: 'text-[#FAA6FF] border-[#FAA6FF]/40',
    link: 'group-hover:text-[#FAA6FF] group-hover:border-[#FAA6FF]',
    btn: 'bg-[#FAA6FF] text-black hover:bg-white',
    dot: 'bg-black',
    stat: 'text-[#FAA6FF]',
  },
  blue: {
    glow: 'rgba(14,150,216,.28)',
    tag: 'text-[#8BD0F2] border-[#8BD0F2]/40',
    link: 'group-hover:text-[#8BD0F2] group-hover:border-[#8BD0F2]',
    btn: 'bg-[#0E96D8] text-white hover:bg-[#1BA8EC]',
    dot: 'bg-white',
    stat: 'text-[#8BD0F2]',
  },
  mono: {
    glow: 'rgba(255,255,255,.07)',
    tag: 'text-white border-white/40',
    link: 'group-hover:text-grey-6 group-hover:border-grey-6',
    btn: 'bg-off-white text-black hover:bg-white',
    dot: 'bg-black',
    stat: 'text-white',
  },
  orange: {
    glow: 'rgba(255,106,19,.28)',
    tag: 'text-[#FF8A3D] border-[#FF8A3D]/40',
    link: 'group-hover:text-[#FF8A3D] group-hover:border-[#FF8A3D]',
    btn: 'bg-[#FF6A13] text-black hover:bg-[#FF8A3D]',
    dot: 'bg-black',
    stat: 'text-[#FF8A3D]',
  },
};

export const projects = [
  {
    num: '01',
    theme: 'pink',
    href: '/work/vcare-nursing',
    liveUrl: 'https://www.vcareos.com',
    cat: 'Healthcare Platform',
    name: 'VCare Nursing',
    brief:
      "The complete digital operation for a Sri Lankan home-healthcare provider: a public booking site, a client portal, a mobile-first staff portal and a 32-module admin back office. It covers everything from the first enquiry to the final payslip.",
    stats: [['4', 'Connected apps'], ['32', 'Admin modules'], ['180+', 'Permissions'], ['~150k', 'Lines of code']],
    tags: ['React 19', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    num: '02',
    theme: 'blue',
    reverse: true,
    href: '/work/world-class-travels',
    liveUrl: 'https://world-class-travels.vercel.app/',
    cat: 'Travel & Tourism Platform',
    name: 'World Class Travels',
    brief:
      "A fully digital travel agency: a cinematic booking website, a traveller portal, a B2B partner portal and a 28-module operations console. Visa files, fare holds, holiday packages and multi-currency payments, from first message to safe return.",
    stats: [['4', 'Connected apps'], ['28', 'Ops modules'], ['45+', 'Visa destinations'], ['~110k', 'Lines of code']],
    tags: ['React 19', 'Node.js', 'MongoDB', 'BullMQ', 'AWS'],
  },
  {
    num: '03',
    theme: 'mono',
    href: '/work/cheapass',
    liveUrl: 'https://cheapass.app',
    cat: 'Gig Economy · Consumer SaaS',
    name: 'CheapAss',
    brief:
      "The delivery driver's secret weapon: a community platform where drivers log anonymous Delivery Notes (tips, addresses, platforms and issues) so others can dodge bad drops. One Flutter codebase runs as a web app, a PWA and a mobile app, with a Stripe-powered freemium model.",
    stats: [['3', 'Surfaces, one codebase'], ['5+', 'Delivery platforms'], ['$14.95', 'For 100 notes'], ['PWA', 'iOS & Android']],
    tags: ['Flutter', 'Firebase', 'Stripe', 'Google Maps', 'PWA'],
  },
  {
    num: '04',
    theme: 'orange',
    reverse: true,
    href: '/work/honeylight',
    cat: 'Cybersecurity · Research Platform',
    name: 'Honeylight',
    brief:
      "A honeypot that doesn't just detect attacks, it physically shows you one. A Cowrie SSH honeypot on a Raspberry Pi feeds a machine learning detection engine and a live dashboard, and an Arduino-driven set of lights turns off, dims or flickers depending on what the attacker is doing.",
    stats: [['3', 'Attack types classified'], ['89%', 'Random Forest accuracy'], ['3', 'Physical lights'], ['2', 'Detection layers']],
    tags: ['Python', 'scikit-learn', 'Cowrie', 'Raspberry Pi', 'Arduino'],
  },
];
