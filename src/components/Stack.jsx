import { useReveal } from '../hooks/useReveal';

const categories = [
  { name: 'Frontend',        items: ['React', 'Next.js', 'Vue.js', 'Flutter', 'Tailwind CSS']  },
  { name: 'Backend',         items: ['Node.js', 'Laravel', 'FastAPI', 'Python', 'REST APIs']   },
  { name: 'Database & Cloud',items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'AWS']      },
  { name: 'AI & Emerging',   items: ['TensorFlow', 'OpenAI API', 'LangChain', 'Scikit-learn'] },
];

export default function Stack() {
  const ref = useReveal();

  return (
    <section id="stack" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
            Our Arsenal
          </p>
          <h2 className="font-bebas text-white" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
            Tech <em className="font-dm not-italic text-grey-6">Stack</em>
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-grey-3"
        >
          {categories.map((cat) => (
            <div key={cat.name} className="reveal stack-item p-10 border-r border-b border-grey-3">
              <div className="flex items-center gap-3 text-[0.6rem] tracking-[0.3em] uppercase text-grey-5 mb-6">
                {cat.name}
                <span className="flex-1 h-px bg-grey-3" />
              </div>
              <div className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <span key={item} className="text-[0.9rem] text-grey-6 hover:text-white transition-colors duration-200 cursor-none">
                    {item}
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
