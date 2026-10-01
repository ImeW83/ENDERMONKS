import { useReveal } from '../hooks/useReveal';
import { gridBg, themes, projects } from '../data/projects';

function FeaturedProject({ p }) {
  const t = themes[p.theme];
  return (
    <div
      className="project-card reveal group relative overflow-hidden bg-grey-2 mb-0.5 cursor-none"
      style={gridBg}
    >
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(900px 420px at ${p.reverse ? '15%' : '85%'} 20%, ${t.glow}, transparent 70%)` }}
      />
      <div className={`relative grid gap-10 p-8 md:p-12 ${p.reverse ? 'lg:grid-cols-[1fr_1.4fr]' : 'lg:grid-cols-[1.4fr_1fr]'}`}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.6rem] tracking-[0.2em] text-grey-5">{p.num}</span>
            <span className={`text-[0.6rem] tracking-[0.15em] uppercase border px-2 py-1 ${t.tag}`}>Featured</span>
            <span className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-5 border border-grey-3 px-2 py-1">{p.cat}</span>
          </div>
          <h3 className="font-bebas text-white uppercase tracking-[0.02em]" style={{ fontSize: 'clamp(2.6rem,6vw,5.5rem)', lineHeight: 0.92 }}>
            {p.name}
          </h3>
          <p className="text-[1rem] leading-relaxed text-grey-6 max-w-[620px]">{p.brief}</p>
          <div className="flex gap-3 flex-wrap">
            {p.tags.map((tag, i) => (
              <span key={tag} className="text-[0.6rem] tracking-[0.12em] uppercase text-grey-6">
                {i > 0 && <span className="mr-3 text-grey-4">·</span>}
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* The ::after overlay stretches this link across the whole card */}
            <a
              href={p.href}
              className={`no-underline text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5 w-fit transition-colors duration-200 after:absolute after:inset-0 after:content-[''] ${t.link}`}
            >
              Read the Case Study ↗
            </a>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-10 no-underline inline-flex items-center gap-2.5 text-[0.68rem] tracking-[0.18em] uppercase px-5 py-3 transition-colors duration-200 ${t.btn}`}
              >
                <span aria-hidden="true" className="relative flex w-2 h-2">
                  <span className={`absolute inset-0 rounded-full animate-ping ${t.dot}`} />
                  <span className={`relative w-2 h-2 rounded-full ${t.dot}`} />
                </span>
                Visit Live Site ↗
              </a>
            )}
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-px bg-grey-3 border border-grey-3 self-end ${p.reverse ? 'lg:order-first' : ''}`}>
          {p.stats.map(([n, label]) => (
            <div key={label} className="bg-grey-1/90 px-6 py-7">
              <div className={`font-bebas leading-none ${t.stat}`} style={{ fontSize: 'clamp(2.4rem,4vw,3.4rem)' }}>{n}</div>
              <div className="mt-2 text-[0.62rem] tracking-[0.15em] uppercase text-grey-5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();

  return (
    <section id="work" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex items-end justify-between mb-16 gap-4">
          <div>
            <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
              Proof of Concept
            </p>
            <h2 className="font-bebas text-white uppercase" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
              <em className="font-fade not-italic text-[#FAA6FF]">Projects</em>
            </h2>
          </div>
          <a href="/work" className="no-underline text-[0.7rem] tracking-[0.2em] uppercase text-grey-5 border-b border-grey-4 pb-0.5 whitespace-nowrap transition-colors duration-200 hover:text-white hover:border-white">
            View All →
          </a>
        </div>

        <div ref={ref}>
        {projects.map((p) => <FeaturedProject key={p.href} p={p} />)}

        <div
          className="reveal flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-grey-3 px-8 py-7"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
        >
          <div>
            <div className="font-bebas text-[1.2rem] tracking-[0.2em] text-grey-5 mb-1">Your Project</div>
            <div className="text-[0.7rem] tracking-[0.15em] uppercase text-grey-4">Could be here</div>
          </div>
          <a href="#contact" className="text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5 no-underline w-fit">
            Start a Project ↗
          </a>
        </div>
        </div>

      </div>
    </section>
  );
}
