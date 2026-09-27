import CardNav from './CardNav/CardNav';

const items = [
  {
    label: 'Services',
    bgColor: '#1a1a1a',
    textColor: '#f0ede8',
    links: [{ label: 'What we do', href: '#services', ariaLabel: 'Services' }],
  },
  {
    label: 'Work',
    bgColor: '#1a1a1a',
    textColor: '#f0ede8',
    links: [{ label: 'Selected projects', href: '#work', ariaLabel: 'Work' }],
  },
  {
    label: 'Stats',
    bgColor: '#1a1a1a',
    textColor: '#f0ede8',
    links: [{ label: 'By the numbers', href: '#stats', ariaLabel: 'Stats' }],
  },
  {
    label: 'Team',
    bgColor: '#1a1a1a',
    textColor: '#f0ede8',
    links: [{ label: 'Who we are', href: '#team', ariaLabel: 'Team' }],
  },
  {
    label: 'Stack',
    bgColor: '#1a1a1a',
    textColor: '#f0ede8',
    links: [{ label: 'Our arsenal', href: '#stack', ariaLabel: 'Stack' }],
  },
  {
    label: 'Contact',
    bgColor: '#1a1a1a',
    textColor: '#f0ede8',
    links: [{ label: 'Get in touch', href: '#contact', ariaLabel: 'Contact' }],
  },
];

export default function Navbar() {
  return (
    <CardNav
      logo="/logo-mark.svg"
      logoAlt="Endermonks"
      logoHref="#hero"
      items={items}
      baseColor="#111111"
      menuColor="#f0ede8"
      buttonBgColor="#f0ede8"
      buttonTextColor="#000000"
      ctaLabel="Hire Us"
      ctaHref="#contact"
      ease="power3.out"
    />
  );
}
