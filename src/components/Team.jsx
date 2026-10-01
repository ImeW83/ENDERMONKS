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
    bio:     'Imeth handles client conversations, keeps projects on schedule and reminds grown men to check their messages. He also brings the cybersecurity expertise that keeps your website from becoming a side hustle for some scammer. In his own time, he’s usually tinkering with decoy systems that lure hackers in, or chasing a personal best at the gym.',
    color:   '#6B46C1',
  },
  {
    name:    'Heshal',
    role:    'The Brain',
    bio:     "Heshal has 24 hours in his day(allegedly). He leads development, plans how our software fits together, writes code and handles cloud infrastructure and deployments. Ask him something outside tech and you can find yourself discussing free will when you only meant to make small talk. Apparently he’s found a loophole in the laws of physics and decided to keep it to himself.",
    color:   '#6B46C1',
  },
  {
    name:    'Naveed',
    role:    'The Builder',
    bio:     "Naveed is a skilled mobile developer who also spends hours testing mobile games for companies that don’t know he exists. He builds our apps, keeps the team’s spirits high and comes through when things get hectic, despite the obvious demands of his unpaid gaming career.",
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
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
