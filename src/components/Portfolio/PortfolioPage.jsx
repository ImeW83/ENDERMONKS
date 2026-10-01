import { useReveal } from '../../hooks/useReveal';
import { gridBg, themes, projects } from '../../data/projects';

function ProjectTile({ p }) {
  const t = themes[p.theme];
  return (
    <article
      className="project-card reveal group relative overflow-hidden bg-grey-2 cursor-none flex flex-col"
      style={gridBg}
    >
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(520px 320px at 85% 0%, ${t.glow}, transparent 70%)` }}
      />
      <div className="relative flex flex-col gap-6 p-8 md:p-10 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[0.6rem] tracking-[0.2em] text-grey-5">{p.num}</span>
          <span className={`text-[0.6rem] tracking-[0.15em] uppercase border px-2 py-1 ${t.tag}`}>Featured</span>
          <span className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-5 border border-grey-3 px-2 py-1">{p.cat}</span>
        </div>
        <h2 className="font-bebas text-white uppercase tracking-[0.02em]" style={{ fontSize: 'clamp(2.4rem,4.5vw,4rem)', lineHeight: 0.92 }}>
          {p.name}
        </h2>
        <p className="text-[0.92rem] leading-relaxed text-grey-6">{p.brief}</p>

        <div className="grid grid-cols-2 gap-px bg-grey-3 border border-grey-3">
          {p.stats.map(([n, label]) => (
            <div key={label} className="bg-grey-1/90 px-5 py-5">
              <div className={`font-bebas leading-none ${t.stat}`} style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>{n}</div>
              <div className="mt-2 text-[0.58rem] tracking-[0.15em] uppercase text-grey-5">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          {p.tags.map((tag, i) => (
            <span key={tag} className="text-[0.6rem] tracking-[0.12em] uppercase text-grey-6">
              {i > 0 && <span className="mr-3 text-grey-4">·</span>}
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
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
    </article>
  );
}

export default function PortfolioPage() {
  const ref = useReveal();

  return (
    <main className="bg-black text-white">
      <header className="pt-32 pb-20 px-[3.5%] border-b border-grey-3 hero-grid">
        <div className="max-w-[1400px] mx-auto">
          <a
            href="/#work"
            className="no-underline inline-block text-[0.68rem] tracking-[0.18em] uppercase text-grey-5 border-b border-grey-4 pb-0.5 mb-12 transition-colors duration-200 hover:text-white hover:border-white"
          >
            ← Back to Home
          </a>
          <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
            Proof of Concept
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-bebas text-white uppercase" style={{ fontSize: 'clamp(3rem,9vw,9rem)', lineHeight: 0.92 }}>
              Full <em className="font-fade not-italic text-[#FAA6FF]">Portfolio</em>
            </h1>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-grey-5">
              {String(projects.length).padStart(2, '0')} projects shipped
            </p>
          </div>
        </div>
      </header>

      <section className="py-20 px-[3.5%] border-b border-grey-3 bg-grey-1">
        <div className="max-w-[1400px] mx-auto">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
            {projects.map((p) => <ProjectTile key={p.href} p={p} />)}

            <div
              className="reveal flex flex-col justify-between gap-8 bg-grey-3 p-8 md:p-10 min-h-[240px]"
              style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
            >
              <div>
                <div className="font-bebas text-[1.2rem] tracking-[0.2em] text-grey-5 mb-1">Your Project</div>
                <div className="text-[0.7rem] tracking-[0.15em] uppercase text-grey-4">Could be here</div>
              </div>
              <a href="/#contact" className="text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5 no-underline w-fit">
                Start a Project ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
