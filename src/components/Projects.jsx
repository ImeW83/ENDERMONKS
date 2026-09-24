import { useReveal } from '../hooks/useReveal';

const projects = [
  { num: '01', cat: 'POS System', emoji: '🛒', name: 'RetailCore POS', tags: ['React', 'Node.js', 'MySQL'], bg: 'bg-dots' },
  { num: '02', cat: 'LMS', emoji: '🎓', name: 'EduPath LMS', tags: ['Laravel', 'Vue.js'], bg: 'bg-lines' },
  { num: '03', cat: 'AI', emoji: '🤖', name: 'IntelliBot AI', tags: ['Python', 'FastAPI'], bg: 'bg-grid' },
  { num: '04', cat: 'Mobile App', emoji: '📱', name: 'StockSense IMS', tags: ['Flutter', 'Firebase'], bg: 'bg-cross' },
];

const bgStyles = {
  'bg-dots': { backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' },
  'bg-lines': { backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.03) 20px,rgba(255,255,255,0.03) 21px)' },
  'bg-grid': { backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '30px 30px' },
  'bg-cross': { background: 'radial-gradient(ellipse at center,rgba(255,255,255,0.07),transparent 70%)' },
};

function ProjectCard({ p, className, cardStyle }) {
  return (
    <div
      className={`project-card reveal relative overflow-hidden bg-grey-2 group cursor-none ${className || ''}`}
      style={cardStyle || {}}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-700 group-hover:scale-105"
        style={bgStyles[p.bg] || {}}
      >
        {p.emoji}
      </div>

      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        <span className="text-[0.6rem] tracking-[0.2em] text-grey-5">{p.num}</span>
        <span className="text-[0.6rem] tracking-[0.15em] uppercase text-grey-5 border border-grey-3 px-2 py-1">{p.cat}</span>
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent 60%)' }}
      >
        <div className="flex gap-3 flex-wrap mb-2">
          {p.tags.map((t, i) => (
            <span key={i} className="text-[0.6rem] tracking-[0.12em] uppercase text-grey-6">
              {i > 0 && <span className="mr-3 text-grey-4">·</span>}
              {t}
            </span>
          ))}
        </div>
        <div
          className="font-bebas text-white tracking-[0.04em] mb-3"
          style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}
        >
          {p.name}
        </div>
        <span className="text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5 w-fit">
          View Project ↗
        </span>
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
              Selected Work
            </p>
            <h2 className="font-bebas text-white" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
              Our <em className="font-dm not-italic text-grey-6">Projects</em>
            </h2>
          </div>
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-grey-5 border-b border-grey-4 pb-0.5 whitespace-nowrap">
            View All →
          </span>
        </div>

        <div ref={ref} className="flex flex-col lg:flex-row gap-0.5 mb-0.5">
          <ProjectCard p={projects[0]} className="flex-[5]" cardStyle={{ aspectRatio: '16/10' }} />
          <div className="flex flex-col gap-0.5 flex-[3]">
            <ProjectCard p={projects[1]} cardStyle={{ aspectRatio: '4/3' }} />
            <ProjectCard p={projects[2]} cardStyle={{ aspectRatio: '4/3' }} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-0.5">
          <ProjectCard p={projects[3]} className="flex-1" cardStyle={{ aspectRatio: '4/3' }} />

          <div
            className="flex-1 relative bg-grey-3 flex items-center justify-center cursor-none"
            style={{ aspectRatio: '4/3', backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
          >
            <div className="text-center">
              <div className="font-bebas text-[1.2rem] tracking-[0.2em] text-grey-5 mb-1">Your Project</div>
              <div className="text-[0.7rem] tracking-[0.15em] uppercase text-grey-4">Could be here</div>
            </div>
            <div className="absolute bottom-8 left-8">
              <a href="#contact" className="text-[0.68rem] tracking-[0.18em] uppercase text-white border-b border-white/30 pb-0.5 no-underline">
                Start a Project ↗
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
