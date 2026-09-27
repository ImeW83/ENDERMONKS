/**
 * EnderMonks animated logo.
 * - The two small bars in the middle band are the eyes: they glance left, then right, then back.
 * - The eyes blink on their own, slightly out of step with the glance, so it feels natural.
 * - A soft pink/purple glow swells behind the mark every ~11s.
 * Pure SVG + CSS, no dependencies. Motion stops for users with prefers-reduced-motion.
 *
 * Usage: <AnimatedLogo size={48} />   (size = rendered height in px)
 */
const css = `
.em-logo{position:relative;display:inline-flex;align-items:center;justify-content:center}
.em-logo__glow{position:absolute;left:50%;top:50%;width:160%;aspect-ratio:1;border-radius:50%;pointer-events:none;
  background:radial-gradient(circle,rgba(250,166,255,.55) 0%,rgba(177,128,229,.35) 35%,rgba(115,83,186,.15) 60%,transparent 72%);
  filter:blur(calc(var(--em-size) * .07));opacity:0;transform:translate(-50%,-50%) scale(.85);
  animation:emGlow 11s ease-in-out infinite}
.em-logo__mark{position:relative;overflow:visible;animation:emMarkGlow 11s ease-in-out infinite}
.em-logo__look{animation:emLook 9s cubic-bezier(.65,0,.35,1) infinite}
.em-logo__blink{transform-box:fill-box;transform-origin:center;animation:emBlink 4.7s ease-in-out infinite}
@keyframes emLook{0%,12%{transform:translateX(0)}20%,34%{transform:translateX(-260px)}44%,58%{transform:translateX(260px)}66%,100%{transform:translateX(0)}}
@keyframes emBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.06)}}
@keyframes emGlow{0%,52%,86%,100%{opacity:0;transform:translate(-50%,-50%) scale(.85)}66%{opacity:.95;transform:translate(-50%,-50%) scale(1.08)}}
@keyframes emMarkGlow{0%,52%,86%,100%{filter:drop-shadow(0 0 0 rgba(250,166,255,0))}66%{filter:drop-shadow(0 0 calc(var(--em-size) * .03) rgba(250,166,255,.55))}}
@media (prefers-reduced-motion: reduce){.em-logo__glow,.em-logo__mark,.em-logo__look,.em-logo__blink{animation:none}}
`;

export default function AnimatedLogo({ size = 56, color = '#ffffff', className = '', title = 'EnderMonks' }) {
  const width = (size * 2231) / 3070;
  return (
    <span className={`em-logo ${className}`} style={{ '--em-size': `${size}px`, width, height: size }}>
      <style>{css}</style>
      <span className="em-logo__glow" aria-hidden="true" />
      <svg className="em-logo__mark" viewBox="0 0 2231 3070" width={width} height={size} role="img" aria-label={title}>
        <g fill={color}>
          <polygon points="0,0 983,592 983,1342 0,1342" />
          <polygon points="1248,592 2231,0 2231,1342 1248,1342" />
          <polygon points="0,1596 983,1596 983,3070 0,2466" />
          <polygon points="1248,1596 2231,1596 2231,2466 1248,3070" />
        </g>
        {/* Eyes */}
        <g className="em-logo__look" fill={color}>
          <rect className="em-logo__blink" x="414" y="1342" width="174" height="254" />
          <rect className="em-logo__blink" x="1607" y="1342" width="174" height="254" />
        </g>
      </svg>
    </span>
  );
}