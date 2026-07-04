import { useState } from "react";
import AnimeBackground from "./components/AnimeBackground";
import ThemeSelector from "./components/ThemeSelector";
import TouchEffects from "./components/TouchEffects";
import ContactForm from "./components/ContactForm";
import { getTheme, DEFAULT_THEME } from "./theme/themes";

function App() {
  const [themeId, setThemeId] = useState(DEFAULT_THEME);
  const theme = getTheme(themeId);

  return (
    <main className="app" data-theme={themeId}>
      <AnimeBackground themeId={themeId} />
      <TouchEffects themeId={themeId} />

      <ThemeSelector current={themeId} onChange={setThemeId} />

      <section className="container">
        <div className="hero">
          <p className="badge">
            <span className="badge-kanji">{theme.kanji}</span>
            {theme.label} Breathing — Sealed Contact Scroll
          </p>

          <h1>
            <span className="hero-jp">影の絆</span>
            Enclave
            <br />
            Portal
          </h1>

          <p className="subtitle">
            A message sent into the void, sealed and guarded — built with
            React, Express, MongoDB, validation, rate limiting, and full
            request logging.
          </p>

          <div className="hero-sigils" aria-hidden="true">
            <span className="sigil" />
            <span className="sigil" />
            <span className="sigil" />
          </div>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}

export default App;