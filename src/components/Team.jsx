import { useReveal } from '../hooks/useReveal';
import SpotlightCard from './SpotlightCard/SpotlightCard';

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const members = [
  {
    name:    'Imeth',
    role:    'The Coordinator',
    bio:     'The coordinator of Endermonks. Imeth keeps the group aligned and every project accountable to its deadline, bringing a security-first mindset to everything the team ships — equal parts strategist, guardian, and builder.',
    skills:  ['Cybersecurity', 'Project Management', 'Software Development'],
    color:   '#6B46C1',
  },
  {
    name:    'Heshal',
    role:    'The Brain',
    bio:     "The one the team turns to when a problem gets genuinely hard. Fluent across data science, machine learning, and IoT, and just as comfortable architecting the cloud infrastructure and CI/CD pipelines that keep it all running — Heshal is the one who handles the most complex tasks.",
    skills:  ['Data Science', 'Machine Learning', 'IoT', 'DevOps & Cloud Infrastructure'],
    color:   '#6B46C1',
  },
  {
    name:    'Naveed',
    role:    'The Builder',
    bio:     "Naveed turns ideas into the apps people actually carry in their pocket. His focus is mobile, but his range runs the full width of computer science — a versatile engineer who's just as sharp outside his lane as in it.",
    skills:  ['Mobile Development', 'Full Stack Development', 'Software Engineering'],
    color:   '#6B46C1',
  },
];

export default function Team() {
  const ref = useReveal();

  return (
    <section id="team" className="py-28 px-[3.5%] border-b border-grey-3 bg-black">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-20">
          <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
            The Monks
          </p>
          <h2 className="font-bebas text-white uppercase" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
            <em className="font-fade not-italic text-[#FAA6FF]">Team</em>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {members.map((m) => (
            <SpotlightCard
              key={m.name}
              className="team-card reveal !rounded-none !border-grey-3 !bg-grey-1 !p-10 cursor-none"
              spotlightColor={hexToRgba(m.color, 0.55)}
              style={{ '--accent': m.color }}
            >
              <div className="font-bebas text-[2rem] tracking-[0.06em] text-white mb-1">{m.name}</div>
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-grey-5 mb-7 pb-7 border-b border-grey-3">
                {m.role}
              </div>
              <p className="text-[0.84rem] leading-[1.8] text-grey-5 mb-7">{m.bio}</p>
              <div className="flex flex-wrap gap-2">
                {m.skills.map((sk) => (
                  <span key={sk} className="text-[0.62rem] tracking-[0.12em] uppercase text-grey-6 border border-grey-3 px-3 py-1 hover:border-[var(--accent)] transition-colors duration-200">
                    {sk}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
