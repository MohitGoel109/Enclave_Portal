import AnimeBackground from "./components/AnimeBackground";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <main className="app">
      <AnimeBackground />

      <section className="container">
        <div className="hero">
          <p className="badge">
            <span className="badge-kanji">封</span>
            Sealed Contact Scroll
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
