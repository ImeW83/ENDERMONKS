const links = ['Services', 'Work', 'Team', 'Contact'];

export default function Footer() {
  return (
    <footer className="bg-grey-1 border-t border-grey-3 px-[3.5%] py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-bebas text-[1.1rem] tracking-widest text-grey-5">Endermonks</span>
      <span className="text-[0.68rem] tracking-[0.1em] text-grey-4">© 2024 Endermonks · Crafted in Sri Lanka</span>
      <div className="flex gap-8">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-[0.65rem] tracking-[0.15em] uppercase text-grey-5 no-underline hover:text-white transition-colors duration-200"
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}
