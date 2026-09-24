import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };

    const targets = 'a, button, .service-row, .project-card, .team-card, .stack-item';
    const onEnter = () => setExpanded(true);
    const onLeave = () => setExpanded(false);

    document.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);

    document.querySelectorAll(targets).forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={`cursor-dot  ${expanded ? 'expanded' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${expanded ? 'expanded' : ''}`} />
    </>
  );
}
