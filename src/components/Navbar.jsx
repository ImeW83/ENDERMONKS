import { useEffect, useState } from 'react';

const links = ['Services', 'Work', 'Team', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[3.5%] py-8 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 border-b border-grey-3'
          : 'mix-blend-difference'
      }`}
    >
      <a href="#hero" className="font-bebas text-[1.4rem] tracking-widest text-white no-underline">
        Endermonks
      </a>

      <ul className="hidden md:flex gap-12 list-none">
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="text-[0.7rem] tracking-[0.18em] uppercase text-grey-5 no-underline hover:text-white transition-colors duration-200"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="text-[0.7rem] tracking-[0.18em] uppercase bg-white text-black px-6 py-2 no-underline hover:opacity-85 transition-opacity duration-200"
      >
        Hire Us
      </a>
    </nav>
  );
}
