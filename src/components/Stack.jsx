import { useReveal } from '../hooks/useReveal';
import SpotlightCard from './SpotlightCard/SpotlightCard';
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiLaravel,
  SiTailwindcss,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiLangchain,
  SiArduino,
  SiRaspberrypi,
  SiEspressif,
  SiMqtt,
  SiCplusplus,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiNodedotjs,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si';
import { TbBrandOpenai, TbBrandAws, TbInfinity, TbApi } from 'react-icons/tb';

const iconMap = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  Laravel: SiLaravel,
  'Tailwind CSS': SiTailwindcss,
  Flutter: SiFlutter,
  'React Native': SiReact,
  Swift: SiSwift,
  Kotlin: SiKotlin,
  Firebase: SiFirebase,
  Python: SiPython,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  LangChain: SiLangchain,
  'OpenAI API': TbBrandOpenai,
  Arduino: SiArduino,
  'Raspberry Pi': SiRaspberrypi,
  ESP32: SiEspressif,
  MQTT: SiMqtt,
  'C++': SiCplusplus,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: TbBrandAws,
  'CI/CD': TbInfinity,
  Terraform: SiTerraform,
  'Node.js': SiNodedotjs,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  'REST APIs': TbApi,
};

const categories = [
  {
    name: 'Web Development',
    tag: 'Interfaces and platforms built for the web.',
    items: ['React', 'Next.js', 'Vue.js', 'Laravel', 'Tailwind CSS'],
  },
  {
    name: 'Mobile Applications',
    tag: 'Native and cross-platform apps for iOS and Android.',
    items: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    name: 'Data Science & AI',
    tag: 'Models, pipelines, and intelligence layered into your product.',
    items: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI API'],
  },
  {
    name: 'IoT & Embedded',
    tag: 'Connected hardware and the firmware that drives it.',
    items: ['Arduino', 'Raspberry Pi', 'ESP32', 'MQTT', 'C++'],
  },
  {
    name: 'DevOps & Cloud',
    tag: 'Infrastructure, deployment, and scaling done right.',
    items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
  },
  {
    name: 'Custom Software',
    tag: 'Bespoke systems built to your exact spec.',
    items: ['Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
];

export default function Stack() {
  const ref = useReveal();

  return (
    <section id="stack" className="py-28 px-[3.5%] border-b border-grey-3 bg-grey-1">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
            Arsenal
          </p>
          <h2 className="font-bebas text-white" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
            <em className="font-fade not-italic text-[#FAA6FF] uppercase">Tech</em> <em className="font-fade not-italic text-[#FAA6FF] uppercase">Stack</em>
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-grey-3"
        >
          {categories.map((cat) => (
            <SpotlightCard
              key={cat.name}
              className="reveal !rounded-none !bg-transparent !p-10 border-r border-b border-grey-3"
              spotlightColor="rgba(250, 166, 255, 0.25)"
            >
              <h3 className="font-bebas text-white tracking-[0.04em] mb-2" style={{ fontSize: '1.8rem' }}>
                {cat.name}
              </h3>
              <p className="text-[0.8rem] leading-[1.6] text-grey-5 mb-7">{cat.tag}</p>

              <ul className="grid grid-cols-3 gap-6">
                {cat.items.map((item) => {
                  const Icon = iconMap[item];
                  return (
                    <li
                      key={item}
                      className="group flex flex-col items-center justify-center gap-2 cursor-none"
                    >
                      {Icon && <Icon className="w-7 h-7 text-grey-6 transition-colors duration-200 group-hover:text-[#FAA6FF]" />}
                      <span className="text-[0.6rem] tracking-[0.08em] uppercase text-grey-5 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 text-center">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
