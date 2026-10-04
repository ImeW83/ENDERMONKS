import { socials } from './socials';

const nav = ['Services', 'Work', 'Team', 'Stack', 'Contact'];

export default function Footer({ base = '' }) {
  return (
    <footer className="bg-black border-t border-grey-3 px-[3.5%] pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-16 lg:gap-12 pb-16 border-b border-grey-3">

          {/* Brand */}
          <div>
            <span className="font-bebas text-[2.2rem] tracking-wide text-white leading-none block mb-4">
              Endermonks
            </span>
            <p className="text-[0.8rem] leading-[1.8] text-grey-5 max-w-sm">
              A small studio building web, mobile and AI products. No agencies, no middlemen — you talk directly to the people building your product.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="flex items-center gap-4 text-[0.6rem] tracking-[0.4em] uppercase text-grey-5 mb-6 before:block before:w-6 before:h-px before:bg-grey-5">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {nav.map((l) => (
                <a
                  key={l}
                  href={`${base}#${l.toLowerCase()}`}
                  className="text-[0.78rem] tracking-wide text-grey-5 no-underline hover:text-white transition-colors duration-200 w-fit"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="flex items-center gap-4 text-[0.6rem] tracking-[0.4em] uppercase text-grey-5 mb-6 before:block before:w-6 before:h-px before:bg-grey-5">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-3 text-[0.78rem] tracking-wide text-grey-5 no-underline hover:text-white transition-colors duration-200 w-fit group"
                >
                  <span className="block w-4 h-px bg-grey-5 group-hover:w-8 group-hover:bg-[#FAA6FF] transition-all duration-300" />
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[0.65rem] tracking-[0.15em] uppercase text-grey-4">
            © {new Date().getFullYear()} Endermonks · Crafted in Sri Lanka
          </span>
          <a
            href={`${base}#hero`}
            className="text-[0.65rem] tracking-[0.15em] uppercase text-grey-5 no-underline hover:text-white transition-colors duration-200"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
