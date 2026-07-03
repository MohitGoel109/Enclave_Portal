import { THEMES } from "../theme/themes";

function ThemeSwitcher({ current, onChange }) {
  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Breathing style theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={current === t.id}
          className={`theme-chip ${current === t.id ? "active" : ""}`}
          style={{
            "--chip-accent": t.accent,
            "--chip-accent2": t.accent2,
          }}
          onClick={() => onChange(t.id)}
          title={`${t.label} Breathing`}
        >
          <span className="theme-chip-kanji">{t.kanji}</span>
          <span className="theme-chip-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;