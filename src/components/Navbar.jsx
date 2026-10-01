import CardNav from './CardNav/CardNav';

const card = { bgColor: '#1a1a1a', textColor: '#f0ede8' };

// Each card links to its section as a whole; the sub-link is that section's eyebrow label.
const items = [
  {
    ...card,
    label: 'Services',
    href: '#services',
    links: [{ label: 'What We Build', href: '#services', ariaLabel: 'What We Build' }],
  },
  {
    ...card,
    label: 'Work',
    href: '#work',
    links: [{ label: 'Proof of Concept', href: '#work', ariaLabel: 'Proof of Concept' }],
  },
  {
    ...card,
    label: 'Team',
    href: '#team',
    links: [{ label: 'The Monks', href: '#team', ariaLabel: 'The Monks' }],
  },
  {
    ...card,
    label: 'Stack',
    href: '#stack',
    links: [{ label: 'Arsenal', href: '#stack', ariaLabel: 'Arsenal' }],
  },
  {
    ...card,
    label: 'Contact',
    href: '#contact',
    links: [{ label: 'Get In Touch', href: '#contact', ariaLabel: 'Get In Touch' }],
  },
];

// `base` prefixes the section anchors so the nav also works from sub-pages (e.g. '/').
export default function Navbar({ base = '' }) {
  // Only in-page anchors need the prefix.
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
