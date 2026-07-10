import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AnimeBackground from "./components/AnimeBackground";
import ThemeSelector from "./components/ThemeSelector";
import TouchEffects from "./components/TouchEffects";
import ContactForm from "./components/ContactForm";
import Dashboard from "./pages/Dashboard";
import { getTheme, DEFAULT_THEME } from "./theme/themes";

function MainPage() {
  const [themeId, setThemeId] = useState(DEFAULT_THEME);
  const [unlockedSigils, setUnlockedSigils] = useState([]);
  const theme = getTheme(themeId);
  const navigate = useNavigate();

  const showDashboardBtn = unlockedSigils.length >= 2;

  const handleSigilClick = (index) => {
    setUnlockedSigils((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

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

          <div className="hero-sigils" role="group" aria-label="Hidden unlock sigils">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                className={`sigil sigil-btn ${unlockedSigils.includes(i) ? "sigil-active" : ""}`}
                onClick={() => handleSigilClick(i)}
                aria-label={`Sigil ${i + 1}`}
              />
            ))}
          </div>

          {showDashboardBtn && (
            <button
              type="button"
              className="submit-btn dashboard-reveal-btn"
              onClick={() => navigate("/dashboard")}
            >
              <span>View Messages</span>
            </button>
          )}
        </div>

        <ContactForm />
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;