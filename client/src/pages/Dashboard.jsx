import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllContacts } from "../services/contact.service";
import AnimeBackground from "../components/AnimeBackground";
import { getTheme, DEFAULT_THEME } from "../theme/themes";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = getTheme(DEFAULT_THEME);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getAllContacts();
        setContacts(res.data || []);
      } catch (err) {
        setError(err.message || "Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <main className="app" data-theme={DEFAULT_THEME}>
      <AnimeBackground themeId={DEFAULT_THEME} />

      <section className="container dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            <span className="badge-kanji">{theme.kanji}</span> Message Archive
          </h1>
          <Link to="/" className="submit-btn dashboard-back-btn">
            <span>Back to Portal</span>
          </Link>
        </div>

        {loading && <p className="subtitle">Loading messages...</p>}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && !error && contacts.length === 0 && (
          <p className="subtitle">No messages yet.</p>
        )}

        {!loading && !error && contacts.length > 0 && (
          <div className="dashboard-grid">
            {contacts.map((c) => (
              <div key={c._id} className="contact-card dashboard-card">
                <span className="corner corner-tl" aria-hidden="true" />
                <span className="corner corner-tr" aria-hidden="true" />
                <span className="corner corner-bl" aria-hidden="true" />
                <span className="corner corner-br" aria-hidden="true" />

                <h3 className="dashboard-card-subject">{c.subject}</h3>
                <p className="dashboard-card-meta">
                  {c.name} &lt;{c.email}&gt;
                </p>
                <p className="dashboard-card-message">{c.message}</p>
                <p className="dashboard-card-date">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;