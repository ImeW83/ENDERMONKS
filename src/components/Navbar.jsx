import CardNav from './CardNav/CardNav';

const card = { bgColor: '#1a1a1a', textColor: '#f0ede8' };

// Each card links to its section as a whole; the sub-links mirror what's actually in that section.
const items = [
  {
    ...card,
    label: 'Services',
    href: '#services',
    links: [
      { label: 'Web Development', href: '#services', ariaLabel: 'Web development services' },
      { label: 'Mobile Applications', href: '#services', ariaLabel: 'Mobile application services' },
      { label: 'Data Science & AI', href: '#services', ariaLabel: 'Data science and AI services' },
    ],
  },
  {
    ...card,
    label: 'Work',
    href: '#work',
    links: [
      { label: 'VCare Nursing', href: '/work/vcare-nursing', ariaLabel: 'VCare Nursing case study' },
      { label: 'All projects', href: '#work', ariaLabel: 'All projects' },
    ],
  },
  {
    ...card,
    label: 'Team',
    href: '#team',
    links: [
      { label: 'Imeth — The Coordinator', href: '#team', ariaLabel: 'Imeth, the coordinator' },
      { label: 'Heshal — The Brain', href: '#team', ariaLabel: 'Heshal, the brain' },
      { label: 'Naveed — The Builder', href: '#team', ariaLabel: 'Naveed, the builder' },
    ],
  },
  {
    ...card,
    label: 'Stack',
    href: '#stack',
    links: [
      { label: 'Web · Mobile · AI', href: '#stack', ariaLabel: 'Web, mobile and AI stack' },
      { label: 'IoT · DevOps & Cloud', href: '#stack', ariaLabel: 'IoT, DevOps and cloud stack' },
    ],
  },
  {
    ...card,
    label: 'Contact',
    href: '#contact',
    links: [
      { label: 'Start a project', href: '#contact', ariaLabel: 'Start a project' },
      { label: 'hello@endermonks.com', href: 'mailto:hello@endermonks.com', ariaLabel: 'Email Endermonks' },
    ],
  },
];

// `base` prefixes the section anchors so the nav also works from sub-pages (e.g. '/').
export default function Navbar({ base = '' }) {
  // Only in-page anchors need the prefix; real paths and mailto links are left as-is.
  const withBase = (href) => (href.startsWith('#') ? base + href : href);
  const navItems = items.map((it) => ({
    ...it,
    href: withBase(it.href),
    links: it.links.map((l) => ({ ...l, href: withBase(l.href) })),
  }));

  return (
    <CardNav
      logo="/logo-mark.svg"
      logoAlt="Endermonks"
      logoHref={`${base}#hero`}
      items={navItems}
      baseColor="#111111"
      menuColor="#f0ede8"
      buttonBgColor="#f0ede8"
      buttonTextColor="#000000"
      ctaLabel="Hire Us"
      ctaHref={`${base}#contact`}
      ease="power3.out"
    />
  );
}
