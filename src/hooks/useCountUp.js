import { useEffect, useRef, useState } from 'react';

// Counts each target number up from 0 once the referenced element scrolls into view.
// Returns [ref, formattedValues].
export function useCountUp(targets, duration = 1800) {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') { setP(1); return undefined; }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / duration);
        setP(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [duration]);

  const eased = 1 - Math.pow(1 - p, 3);
  return [ref, targets.map((n) => Math.round(n * eased).toLocaleString('en-US'))];
}
