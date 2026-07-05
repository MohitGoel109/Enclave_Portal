import { useMemo } from "react";
import { getTheme } from "../theme/themes";

const COUNT = { ember: 26, rain: 70, spark: 18, spore: 0, pulse: 0, "haze-drift": 10, dust: 20, petal: 6, heart: 14 };

function AnimeBackground({ themeId }) {
  const theme = getTheme(themeId);
  const particleType = theme.particle;
  const count = COUNT[particleType] ?? 20;
  const has = (key) => theme.extras.includes(key);

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
    [count]
  );

  const boltPaths = useMemo(
    () => [
      "180,0 215,140 175,150 235,300 195,310 250,540",
      "60,0 95,120 60,130 120,280 90,290 140,480",
      "320,0 350,110 315,120 365,260 335,270 380,460",
    ],
    []
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 15 + Math.random() * 65,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 5,
        wx1: `${-30 + Math.random() * 60}px`,
        wy1: `${-30 + Math.random() * 60}px`,
        wx2: `${-30 + Math.random() * 60}px`,
        wy2: `${-30 + Math.random() * 60}px`,
        wx3: `${-30 + Math.random() * 60}px`,
        wy3: `${-30 + Math.random() * 60}px`,
      })),
    []
  );

  const pollen = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 30 + Math.random() * 60,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 6,
      })),
    []
  );

  const eqBars = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        base: `${10 + Math.random() * 15}%`,
        peak: `${50 + Math.random() * 45}%`,
        duration: 0.7 + Math.random() * 0.6,
        delay: Math.random() * 0.5,
      })),
    []
  );

  const [c1, c2] = theme.particleColor;

  return (
    <div className={`scene ${has("tremor") ? "scene-tremor" : ""}`} aria-hidden="true">
      <div
        className="scene-sky"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 75% 15%, ${theme.glow}, transparent 60%),
            linear-gradient(180deg, ${theme.sky[0]} 0%, ${theme.sky[1]} 35%, ${theme.sky[2]} 65%, ${theme.sky[3]} 100%)`,
        }}
      />

      <div className="scene-stars" />

      {has("lightning") && (
        <>
          <div className="thunder-flash" />
          <svg className="scene-bolts" viewBox="0 0 400 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {boltPaths.map((points, i) => (
              <polyline key={i} className={`bolt bolt-${i}`} points={points} fill="none" stroke={theme.accent2} strokeWidth="3" strokeLinejoin="round" />
            ))}
          </svg>
        </>
      )}

      {has("waves") && (
        <svg className="scene-waves" viewBox="0 0 1600 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path className="wave wave-1" d="M0,120 Q400,60 800,120 T1600,120 V240 H0 Z" fill={theme.accent} opacity="0.22" />
          <path className="wave wave-2" d="M0,150 Q400,190 800,150 T1600,150 V240 H0 Z" fill={theme.accent2} opacity="0.16" />
        </svg>
      )}

      {has("rays") && (
        <svg className="scene-rays" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="196" y="0" width="8" height="400" fill={theme.accent} opacity="0.14" transform={`rotate(${i * 30} 200 200)`} />
          ))}
        </svg>
      )}

      {has("rings") && (
        <div className="scene-rings">
          {[0, 1, 2, 3].map((n) => (
            <span key={n} className="ring" style={{ borderColor: theme.accent, animationDelay: `${n * 1}s` }} />
          ))}
        </div>
      )}
      {has("equalizer") && (
        <div className="scene-equalizer">
          {eqBars.map((b) => (
            <span
              key={b.id}
              className="eq-bar"
              style={{
                background: `linear-gradient(180deg, ${theme.accent2}, ${theme.accent})`,
                "--eq-base": b.base,
                "--eq-peak": b.peak,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {has("cracks") && (
        <svg className="scene-cracks" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,400 L90,300 L60,250 L110,180 L90,90" fill="none" stroke={theme.accent} strokeWidth="2" opacity="0.4" />
          <path d="M300,400 L270,290 L310,240 L270,150" fill="none" stroke={theme.accent} strokeWidth="2" opacity="0.35" />
        </svg>
      )}

      {has("fireflies") && (
        <div className="scene-fireflies">
          {fireflies.map((f) => (
            <span
              key={f.id}
              className="firefly"
              style={{
                left: `${f.left}%`,
                top: `${f.top}%`,
                background: theme.accent2,
                boxShadow: `0 0 8px 2px ${theme.accent2}`,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                "--wx1": f.wx1, "--wy1": f.wy1,
                "--wx2": f.wx2, "--wy2": f.wy2,
                "--wx3": f.wx3, "--wy3": f.wy3,
              }}
            />
          ))}
        </div>
      )}

      {has("godrays") && (
        <div className="scene-godrays">
          <span className="godray godray-1" style={{ background: `linear-gradient(180deg, ${theme.accent2}, transparent)` }} />
          <span className="godray godray-2" style={{ background: `linear-gradient(180deg, ${theme.accent2}, transparent)` }} />
          <span className="godray godray-3" style={{ background: `linear-gradient(180deg, ${theme.accent2}, transparent)` }} />
        </div>
      )}

      {has("bloom") && (
        <div className="scene-bloom" style={{ background: `radial-gradient(circle, ${theme.accent2}, transparent 70%)` }} />
      )}
      {has("pollen") && (
        <div className="scene-pollen">
          {pollen.map((p) => (
            <span
              key={p.id}
              className="pollen-mote"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                background: theme.accent2,
                boxShadow: `0 0 4px 1px ${theme.accent2}`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {has("heartbeat") && (
        <div className="scene-heartbeat" style={{ background: `radial-gradient(circle, ${theme.accent2}, transparent 70%)` }} />
      )}

      <svg className={`scene-moon ${has("heartbeat") ? "scene-moon-heartbeat" : ""}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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

      <svg className="scene-mountains-far" viewBox="0 0 1600 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,320 0,180 200,90 420,200 620,60 860,190 1080,100 1300,210 1600,140 1600,320" fill={theme.sky[1]} opacity="0.7" />
      </svg>

      <svg className="scene-mountains-near" viewBox="0 0 1600 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,300 0,220 250,120 500,240 760,100 1000,230 1260,130 1600,220 1600,300" fill={theme.sky[3]} />
      </svg>

      <div className="scene-fog fog-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)` }} />
      <div className="scene-fog fog-2" style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)` }} />
      {has("godrays") && (
        <div className="scene-fog fog-3 fog-dense" style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)` }} />
      )}

      {particleType !== "pulse" && count > 0 && (
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
      )}

      <div className="scene-vignette" />
    </div>
  );
}

export default AnimeBackground;