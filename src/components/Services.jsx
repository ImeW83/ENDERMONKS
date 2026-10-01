import { useReveal } from '../hooks/useReveal';

const services = [
  { num: '01', title: 'Web Development',               tag: 'Websites · Web Apps · SaaS Platforms'        },
  { num: '02', title: 'Mobile Applications',            tag: 'iOS · Android · Cross-Platform'               },
  { num: '03', title: 'Data Science & AI',              tag: 'Analytics · Machine Learning · Automation'    },
  { num: '04', title: 'IoT & Embedded Systems',         tag: 'Connected Devices · Sensors · Hardware Integration' },
  { num: '05', title: 'DevOps & Cloud Infrastructure',  tag: 'CI/CD · Cloud Deployment · Scaling'            },
  { num: '06', title: 'Custom Software Solutions',      tag: 'POS · LMS · Inventory · Bespoke Systems'       },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="py-28 px-[3.5%] border-b border-grey-3 bg-black">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-20">
          <div>
            <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
              What We Build
            </p>
            <h2 className="font-bebas text-white uppercase" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
              <em className="font-fade not-italic text-[#FAA6FF]">Services</em>
            </h2>
          </div>
        </div>

        {/* List */}
        <div ref={ref} className="border-t border-grey-3">
          {services.map((s) => (
            <div
              key={s.num}
              className="service-row reveal flex items-center justify-between py-9 border-b border-grey-3 transition-[padding] duration-300 hover:pl-6 cursor-none"
            >
              <div className="flex items-center gap-10 z-10">
                <span className="text-[0.65rem] tracking-[0.2em] text-grey-5 min-w-[2rem]">{s.num}</span>
                <span
                  className="font-bebas text-white tracking-[0.04em] transition-colors duration-200"
                  style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)' }}
                >
                  {s.title}
                </span>
              </div>
              <div className="flex items-center gap-8 z-10">
                <span className="hidden sm:block text-[0.65rem] tracking-[0.15em] uppercase text-grey-5 border border-grey-3 px-3 py-1">
                  {s.tag}
                </span>              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
