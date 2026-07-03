import { useMemo } from "react";

/*
|--------------------------------------------------------------------------
| AnimeBackground
|--------------------------------------------------------------------------
| A fully original, procedurally generated dark-fantasy scene:
| night sky, glowing moon, drifting fog, mountain silhouettes,
| a torii gate, and rising embers. Pure CSS/SVG animation —
| no external images, no copyrighted artwork.
*/

const EMBER_COUNT = 26;
const PETAL_COUNT = 10;

function AnimeBackground() {
  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: -40 + Math.random() * 80,
      })),
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 14 + Math.random() * 10,
        delay: Math.random() * 14,
        size: 8 + Math.random() * 8,
      })),
    []
  );

  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-sky" />

      <div className="scene-stars" />

      <svg
        className="scene-moon"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffdfae" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#e6a15a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e6a15a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#moonGlow)" />
        <circle cx="100" cy="100" r="46" fill="#fff1d6" />
        <circle cx="82" cy="86" r="7" fill="#e6c893" opacity="0.5" />
        <circle cx="112" cy="108" r="10" fill="#e6c893" opacity="0.4" />
        <circle cx="96" cy="122" r="5" fill="#e6c893" opacity="0.45" />
      </svg>

      <svg
        className="scene-mountains-far"
        viewBox="0 0 1600 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="0,320 0,180 200,90 420,200 620,60 860,190 1080,100 1300,210 1600,140 1600,320"
          fill="#241333"
        />
      </svg>

      <svg
        className="scene-mountains-near"
        viewBox="0 0 1600 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="0,300 0,220 250,120 500,240 760,100 1000,230 1260,130 1600,220 1600,300"
          fill="#150a1f"
        />
      </svg>

      <svg
        className="scene-torii"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#3c0f14" strokeWidth="7" strokeLinecap="square">
          <line x1="30" y1="40" x2="30" y2="150" />
          <line x1="130" y1="40" x2="130" y2="150" />
          <line x1="14" y1="42" x2="146" y2="42" />
          <line x1="8" y1="26" x2="152" y2="26" />
          <line x1="45" y1="60" x2="115" y2="60" />
        </g>
      </svg>

      <div className="scene-fog fog-1" />
      <div className="scene-fog fog-2" />
      <div className="scene-fog fog-3" />

      <div className="scene-embers">
        {embers.map((e) => (
          <span
            key={e.id}
            className="ember"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": `${e.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="scene-petals">
        {petals.map((p) => (
          <span
            key={p.id}
            className="petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.7}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="scene-vignette" />
    </div>
  );
}

export default AnimeBackground;
