import { useState } from "react";
import { THEMES, getTheme } from "../theme/themes";

function ThemeSelector({ current, onChange }) {
  const [open, setOpen] = useState(false);
  const theme = getTheme(current);

  const handlePick = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="theme-fab"
        style={{ "--fab-accent": theme.accent, "--fab-accent2": theme.accent2 }}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="theme-fab-kanji">{theme.kanji}</span>
        <span className="theme-fab-label">{theme.label} Breathing</span>
      </button>

      {open && (
        <div
          className="theme-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Choose a breathing style"
          onClick={() => setOpen(false)}
        >
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <div className="theme-modal-header">
              <h3>Select Your Breathing Style</h3>
              <button
                type="button"
                className="theme-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="theme-grid">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-card ${current === t.id ? "active" : ""}`}
                  style={{
                    "--card-accent": t.accent,
                    "--card-accent2": t.accent2,
                    "--card-sky1": t.sky[0],
                    "--card-sky2": t.sky[2],
                  }}
                  onClick={() => handlePick(t.id)}
                >
                  <span className="theme-card-swatch" />
                  <span className="theme-card-kanji">{t.kanji}</span>
                  <span className="theme-card-label">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ThemeSelector;