import { useReveal } from '../hooks/useReveal';

const stats = [
  { num: '20+', label: 'Projects Delivered'    },
  { num: '15+', label: 'Happy Clients'         },
  { num: '6',   label: 'Domains of Expertise'  },
  { num: '3',   label: 'Elite Developers'      },
];

export default function Stats() {
  const ref = useReveal();

  return (
    <section className="py-20 px-[3.5%] bg-white border-b border-black/10">
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 border-l border-black/10"
      >
        {stats.map((s) => (
          <div key={s.label} className="reveal stat-item px-10 py-12 border-r border-b lg:border-b-0 border-black/10">
            <span className="font-bebas text-black block leading-none mb-2" style={{ fontSize: 'clamp(3.5rem,6vw,5.5rem)' }}>
              {s.num}
            </span>
            <span className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-500">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
