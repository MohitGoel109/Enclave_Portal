import { useMemo } from "react";
import { getTheme } from "../theme/themes";

const COUNT = { ember: 26, rain: 60, spark: 18, spore: 22, pulse: 6, "haze-drift": 8, dust: 20, petal: 10, heart: 14 };

function AnimeBackground({ themeId }) {
  const theme = getTheme(themeId);
  const particleType = theme.particle;
  const count = COUNT[particleType] ?? 20;

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 4 + Math.random() * 12,
        delay: Math.random() * 10,
        drift: -40 + Math.random() * 80,
      })),
    [count, particleType]
  );

  const [c1, c2] = theme.particleColor;

  return (
    <div className="scene" aria-hidden="true">
      <div
        className="scene-sky"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 75% 15%, ${theme.glow}, transparent 60%),
            linear-gradient(180deg, ${theme.sky[0]} 0%, ${theme.sky[1]} 35%, ${theme.sky[2]} 65%, ${theme.sky[3]} 100%)`,
        }}
      />

      <div className="scene-stars" />

      <svg className="scene-moon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.accent2} stopOpacity="0.9" />
            <stop offset="35%" stopColor={theme.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#moonGlow)" />
        <circle cx="100" cy="100" r="46" fill={theme.accent2} />
      </svg>

      {theme.extra === "rays" && (
        <svg className="scene-rays" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="196" y="0" width="8" height="400" fill={theme.accent}
              opacity="0.12" transform={`rotate(${i * 30} 200 200)`} />
          ))}
        </svg>
      )}

      {theme.extra === "lightning" && (
        <svg className="scene-lightning" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
          <polyline points="180,0 220,150 170,160 240,320 190,330 260,600"
            fill="none" stroke={theme.accent2} strokeWidth="3" />
        </svg>
      )}

      {theme.extra === "waves" && (
        <svg className="scene-waves" viewBox="0 0 1600 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q400,40 800,100 T1600,100 V200 H0 Z" fill={theme.accent} opacity="0.15" />
        </svg>
      )}

      {theme.extra === "rings" && (
        <div className="scene-rings">
          {[1, 2, 3].map((n) => (
            <span key={n} className="ring" style={{ borderColor: theme.accent, animationDelay: `${n * 1.2}s` }} />
          ))}
        </div>
      )}

      {theme.extra === "cracks" && (
        <svg className="scene-cracks" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,400 L90,300 L60,250 L110,180 L90,90" fill="none" stroke={theme.accent} strokeWidth="2" opacity="0.35" />
        </svg>
      )}

      <svg className="scene-mountains-far" viewBox="0 0 1600 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,320 0,180 200,90 420,200 620,60 860,190 1080,100 1300,210 1600,140 1600,320" fill={theme.sky[1]} opacity="0.7" />
      </svg>

      <svg className="scene-mountains-near" viewBox="0 0 1600 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,300 0,220 250,120 500,240 760,100 1000,230 1260,130 1600,220 1600,300" fill={theme.sky[3]} />
      </svg>

      <div className="scene-fog fog-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)` }} />
      <div className="scene-fog fog-2" style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)` }} />
      {(theme.extra === "denseFog" || theme.extra === "haze") && (
        <div className="scene-fog fog-3 fog-dense" style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)` }} />
      )}

      <div className="scene-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`particle particle-${particleType}`}
            style={{
              left: `${p.left}%`,
              width: particleType === "rain" ? "2px" : `${p.size}px`,
              height: particleType === "rain" ? "18px" : particleType === "petal" ? `${p.size * 0.7}px` : `${p.size}px`,
              background: particleType === "petal" || particleType === "dust"
                ? `linear-gradient(135deg, ${c1}, ${c2})`
                : `radial-gradient(circle, ${c1} 0%, ${c2} 60%, transparent 80%)`,
              boxShadow: `0 0 6px 1px ${c2}`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="scene-vignette" />
    </div>
  );
}

export default AnimeBackground;