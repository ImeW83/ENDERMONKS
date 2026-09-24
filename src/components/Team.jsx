import { useReveal } from '../hooks/useReveal';

const members = [
  {
    initial: 'I',
    name:    'Imeth',
    role:    'Project Manager · Full Stack Developer',
    bio:     'The strategist of Endermonks. Imeth bridges vision and execution — leading every project with precision, clarity, and a relentless focus on delivery.',
    skills:  ['React', 'Node.js', 'Project Mgmt', 'Cybersecurity'],
  },
  {
    initial: 'H',
    name:    'Heshal',
    role:    'Full Stack Developer',
    bio:     'A craftsman of robust, scalable systems. Heshal turns complex requirements into clean, high-performance code — back to front, without compromise.',
    skills:  ['Laravel', 'Vue.js', 'MySQL', 'API Design'],
  },
  {
    initial: 'N',
    name:    'Naveed',
    role:    'Full Stack Developer',
    bio:     'The innovator of the team. Naveed pushes limits with AI integrations and mobile engineering, constantly bringing cutting-edge solutions to the table.',
    skills:  ['Flutter', 'Python', 'AI / ML', 'Firebase'],
  },
];

export default function Team() {
  const ref = useReveal();

  return (
    <section id="team" className="py-28 px-[3.5%] border-b border-grey-3 bg-black">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-20">
          <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
            The Builders
          </p>
          <h2 className="font-bebas text-white" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
            Meet the <em className="font-dm not-italic text-grey-6">Team</em>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {members.map((m) => (
            <div key={m.name} className="team-card reveal bg-grey-1 p-10 hover:bg-grey-2 transition-colors duration-300 cursor-none">
              <span className="font-bebas block leading-none text-grey-3 mb-8 transition-colors duration-300 hover:text-grey-4"
                style={{ fontSize: '6rem' }}>
                {m.initial}
              </span>
              <div className="font-bebas text-[2rem] tracking-[0.06em] text-white mb-1">{m.name}</div>
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-grey-5 mb-7 pb-7 border-b border-grey-3">
                {m.role}
              </div>
              <p className="text-[0.84rem] leading-[1.8] text-grey-5 mb-7">{m.bio}</p>
              <div className="flex flex-wrap gap-2">
                {m.skills.map((sk) => (
                  <span key={sk} className="text-[0.62rem] tracking-[0.12em] uppercase text-grey-6 border border-grey-3 px-3 py-1 hover:border-grey-4 transition-colors duration-200">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
