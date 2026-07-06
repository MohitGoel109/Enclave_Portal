import { useEffect, useRef, useState } from "react";
import { getTheme } from "../theme/themes";

let idCounter = 0;

// How many trail particles to spawn per burst, and the min ms between
// trail spawns while the pointer is moving — tuned per shape so each
// style feels distinct (e.g. fire trail is denser, ripples are sparser).
const SHAPE_CONFIG = {
  flame: { spawnMs: 40, life: 750, burstCount: 8 },
  ripple: { spawnMs: 220, life: 900, burstCount: 3 },
  zap: { spawnMs: 90, life: 400, burstCount: 5 },
  orb: { spawnMs: 60, life: 850, burstCount: 7 },
  wave: { spawnMs: 200, life: 950, burstCount: 3 },
  puff: { spawnMs: 140, life: 1100, burstCount: 4 },
  chip: { spawnMs: 70, life: 700, burstCount: 8 },
  petal: { spawnMs: 90, life: 1000, burstCount: 6 },
  heart: { spawnMs: 110, life: 800, burstCount: 5 },
};

function TouchEffects({ themeId }) {
  const theme = getTheme(themeId);
  const shape = theme.touchShape;
  const config = SHAPE_CONFIG[shape] ?? SHAPE_CONFIG.orb;

  const [sparks, setSparks] = useState([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const spawnOne = (x, y, extra = {}) => {
      const id = idCounter++;
      setSparks((prev) => [
        ...prev.slice(-30),
        {
          id,
          x,
          y,
          size: 14 + Math.random() * 16,
          angle: Math.random() * 360,
          rotate: Math.random() * 360,
          ...extra,
        },
      ]);
      window.setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, config.life);
    };

    const spawnTrail = (x, y) => {
      const now = performance.now();
      if (now - lastSpawn.current < config.spawnMs) return;
      lastSpawn.current = now;
      spawnOne(x, y);
    };

    const spawnBurst = (x, y) => {
      for (let i = 0; i < config.burstCount; i++) {
        const angle = (360 / config.burstCount) * i;
        spawnOne(x, y, { angle, burst: true });
      }
    };

    const handleMove = (e) => spawnTrail(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) spawnTrail(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTap = (e) => {
      const point = e.touches ? e.touches[0] : e;
      if (point) spawnBurst(point.clientX, point.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleTap, { passive: true });
    window.addEventListener("touchstart", handleTap, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleTap);
      window.removeEventListener("touchstart", handleTap);
    };
  }, [shape, config]);

  const [c1, c2] = theme.particleColor;

  return (
    <div className="touch-fx-layer" aria-hidden="true">
      {sparks.map((s) => {
        const baseStyle = {
          left: `${s.x}px`,
          top: `${s.y}px`,
          "--angle": `${s.angle}deg`,
          "--rotate": `${s.rotate}deg`,
        };

        if (shape === "ripple" || shape === "wave") {
          return (
            <span
              key={s.id}
              className={`touch-fx touch-ripple-ring ${s.burst ? "touch-ripple-burst" : ""}`}
              style={{ ...baseStyle, borderColor: c2, boxShadow: `0 0 12px ${c1}` }}
            />
          );
        }

        if (shape === "zap") {
          return (
            <span
              key={s.id}
              className="touch-fx touch-zap"
              style={{
                ...baseStyle,
                background: c2,
                boxShadow: `0 0 10px 3px ${c1}`,
              }}
            />
          );
        }

        if (shape === "puff") {
          return (
            <span
              key={s.id}
              className="touch-fx touch-puff"
              style={{
                ...baseStyle,
                width: `${s.size * 3.4}px`,
                height: `${s.size * 3.4}px`,
                background: `radial-gradient(circle, ${c2}55 0%, ${c1}33 60%, transparent 80%)`,
              }}
            />
          );
        }

        if (shape === "petal") {
          return (
            <span
              key={s.id}
              className={`touch-fx touch-petal-fx ${s.burst ? "touch-petal-burst" : ""}`}
              style={{
                ...baseStyle,
                width: `${s.size * 1.6}px`,
                height: `${s.size * 1.1}px`,
                background: `linear-gradient(135deg, ${c2}, ${c1})`,
              }}
            />
          );
        }

        if (shape === "heart") {
          return (
            <span
              key={s.id}
              className="touch-fx touch-heart-fx"
              style={{
                ...baseStyle,
                width: `${s.size * 1.5}px`,
                height: `${s.size * 1.5}px`,
                background: `linear-gradient(135deg, ${c2}, ${c1})`,
              }}
            />
          );
        }

        if (shape === "chip") {
          return (
            <span
              key={s.id}
              className={`touch-fx touch-chip ${s.burst ? "touch-chip-burst" : ""}`}
              style={{
                ...baseStyle,
                width: `${s.size * 1.3}px`,
                height: `${s.size * 1.3}px`,
                background: `linear-gradient(135deg, ${c2}, ${c1})`,
              }}
            />
          );
        }

        if (shape === "flame") {
          return (
            <span
              key={s.id}
              className={`touch-fx touch-flame ${s.burst ? "touch-flame-burst" : ""}`}
              style={{
                ...baseStyle,
                width: `${s.size * 1.4}px`,
                height: `${s.size * 2}px`,
                background: `linear-gradient(0deg, ${c1}, ${c2})`,
              }}
            />
          );
        }

        // orb (default / insect fireflies)
        return (
          <span
            key={s.id}
            className={`touch-fx touch-orb ${s.burst ? "touch-orb-burst" : ""}`}
            style={{
              ...baseStyle,
              width: `${s.size * 1.7}px`,
              height: `${s.size * 1.7}px`,
              background: `radial-gradient(circle, ${c2} 0%, ${c1} 60%, transparent 80%)`,
              boxShadow: `0 0 10px 2px ${c2}`,
            }}
          />
        );
      })}
    </div>
  );
}

export default TouchEffects;