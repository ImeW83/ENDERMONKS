import { useState } from 'react';

const socials = [
  { label: 'hello@endermonks.com', href: 'mailto:hello@endermonks.com' },
  { label: 'LinkedIn',             href: '#' },
  { label: 'GitHub',               href: '#' },
  { label: 'WhatsApp',             href: '#' },
];

const services = [
  'Web Development', 'Mobile Application', 'POS System',
  'AI Integration', 'LMS Development', 'Inventory Management',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="py-28 px-[3.5%] border-b border-grey-3 bg-black">
      <div className="max-w-[1400px] mx-auto">

        <p className="flex items-center gap-4 text-[0.62rem] tracking-[0.4em] uppercase text-grey-5 mb-4 before:block before:w-8 before:h-px before:bg-grey-5">
          Get In Touch
        </p>
        <h2 className="font-bebas text-white mb-16" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 0.92 }}>
          Start a <em className="font-fade not-italic text-[#FAA6FF] uppercase">Project</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="font-bebas text-white leading-none mb-8" style={{ fontSize: 'clamp(3rem,5.5vw,5rem)' }}>
              Let's build<br />something<br />legendary.
            </p>
            <p className="text-[0.82rem] leading-[1.8] text-grey-5 mb-12">
              Have a vision? Tell us about your project and we'll come back to you within 24 hours. No agencies, no middlemen — you talk directly to the people building your product.
            </p>
            <div className="flex flex-col gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-6 text-[0.72rem] tracking-[0.18em] uppercase text-grey-5 no-underline hover:text-white transition-colors duration-200 group"
                >
                  <span className="block w-6 h-px bg-grey-5 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-0 border-t border-grey-3">

            {[
              { label: 'Your Name',      name: 'name',    type: 'text',  placeholder: 'John Doe'          },
              { label: 'Email Address',  name: 'email',   type: 'email', placeholder: 'john@company.com'  },
            ].map((f) => (
              <div key={f.name} className="form-field border-b border-grey-3 pb-0">
                <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-grey-5 pt-5 pb-1">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handle}
                  placeholder={f.placeholder}
                  className="w-full bg-transparent border-none outline-none text-[0.95rem] font-light text-white pb-5 placeholder-grey-4"
                />
              </div>
            ))}

            <div className="form-field border-b border-grey-3">
              <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-grey-5 pt-5 pb-1">
                Service Needed
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handle}
                className="w-full bg-transparent border-none outline-none text-[0.95rem] font-light text-white pb-5 cursor-none appearance-none"
                style={{ color: form.service ? '#fff' : '#555' }}
              >
                <option value="" style={{ background: '#1a1a1a' }}>Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s} style={{ background: '#1a1a1a' }}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-field border-b border-grey-3">
              <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-grey-5 pt-5 pb-1">
                Project Brief
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                placeholder="Tell us what you're building..."
                rows={4}
                className="w-full bg-transparent border-none outline-none text-[0.95rem] font-light text-white pb-5 placeholder-grey-4 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-10 self-start bg-white text-black text-[0.72rem] tracking-[0.22em] uppercase px-10 py-5 border-none hover:opacity-85 transition-opacity cursor-none"
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
