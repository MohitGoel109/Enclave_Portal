import { useEffect, useRef, useState } from "react";
import { getTheme } from "../theme/themes";

let idCounter = 0;

function TouchEffects({ themeId }) {
  const theme = getTheme(themeId);
  const [sparks, setSparks] = useState([]);
  const lastSpawn = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const SPAWN_INTERVAL = 45; // ms between spawns while moving

    const spawn = (x, y) => {
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_INTERVAL) return;
      lastSpawn.current = now;

      const id = idCounter++;
      setSparks((prev) => [
        ...prev.slice(-24),
        {
          id,
          x,
          y,
          size: 6 + Math.random() * 10,
          angle: Math.random() * 360,
        },
      ]);

      window.setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    };

    const handleMove = (e) => spawn(e.clientX, e.clientY);
    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        spawn(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTap = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      // burst of extra sparks on tap/click for a satisfying pop
      for (let i = 0; i < 6; i++) {
        const id = idCounter++;
        const angle = (360 / 6) * i;
        setSparks((prev) => [
          ...prev.slice(-24),
          { id, x: touch.clientX, y: touch.clientY, size: 8, angle, burst: true },
        ]);
        window.setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== id));
        }, 600);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("click", handleTap, { passive: true });
    window.addEventListener("touchstart", handleTap, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("click", handleTap);
      window.removeEventListener("touchstart", handleTap);
    };
  }, []);

  const [c1, c2] = theme.particleColor;

  return (
    <div className="touch-fx-layer" ref={containerRef} aria-hidden="true">
      {sparks.map((s) => (
        <span
          key={s.id}
          className={`touch-spark ${s.burst ? "touch-spark-burst" : ""}`}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, ${c2} 0%, ${c1} 60%, transparent 80%)`,
            boxShadow: `0 0 10px 2px ${c2}`,
            "--angle": `${s.angle}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default TouchEffects;