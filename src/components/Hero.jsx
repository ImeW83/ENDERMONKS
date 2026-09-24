export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end px-[3.5%] pb-20 overflow-hidden border-b border-grey-3"
    >
      {/* Grid background */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.9), transparent 70%)' }}
      />

      {/* Ghost word */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: 'clamp(14rem,28vw,26rem)', color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.02em' }}
      >
        BUILD
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-[3.5%] bottom-20 flex flex-col items-center gap-2 z-10">
        <div className="scroll-line w-px h-16" style={{ background: 'linear-gradient(to bottom, #555, transparent)' }} />
        <span className="text-[0.58rem] tracking-[0.3em] uppercase text-grey-5" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-grey-5 mb-6 before:block before:w-10 before:h-px before:bg-grey-5">
          Est. 2024 · Sri Lanka · Digital Studio
        </p>

        <h1
          className="font-bebas leading-[0.9] text-white mb-12"
          style={{ fontSize: 'clamp(5rem,14vw,13rem)', letterSpacing: '-0.01em' }}
        >
          We Build<br />
          <em className="font-dm not-italic" style={{ color: '#e8e0d0' }}>Digital</em><br />
          Empires.
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <p className="text-[0.9rem] leading-[1.8] text-grey-5 max-w-sm">
            A trio of developers building world-class web, mobile, AI, and enterprise systems — from Sri Lanka, for the world.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#projects"
              className="text-[0.72rem] tracking-[0.18em] uppercase bg-white text-black px-9 py-4 no-underline hover:opacity-85 transition-opacity"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="text-[0.72rem] tracking-[0.18em] uppercase border border-grey-4 text-white px-9 py-4 no-underline hover:border-white transition-colors"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
