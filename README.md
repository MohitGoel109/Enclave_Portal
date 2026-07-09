# ⛩️ Enclave Portal — Sealed Contact Scroll

**🔗 Live:** [enclave-portal-seven.vercel.app](https://enclave-portal-seven.vercel.app/) · **API:** [enclave-portal-afjg.onrender.com](https://enclave-portal-afjg.onrender.com)

A production-ready contact form portal with a fully animated, dark-fantasy
anime theme. Nine selectable **Breathing Styles** (Sun, Water, Thunder,
Insect, Sound, Mist, Stone, Flower, Love) each drive their own color
palette, animated background scene, and cursor/touch particle trail.

Built with **React (Vite)** on the frontend and **Express + MongoDB** on
the backend, with validation, rate limiting, security headers, and full
request logging baked in.

---

## ✨ Features

- **9 Breathing Style themes** — pick from a floating theme selector; each
  style swaps the entire background scene and color palette:
  - ☀️ Sun — rotating rays, flame cursor trail
  - 🌊 Water — flowing waves, ripple cursor trail
  - ⚡ Thunder — screen flash + lightning bolts, zap cursor trail
  - 🐛 Insect — wandering firefly swarm, orb cursor trail
  - 🔊 Sound — pulsing rings + live equalizer bars, wave cursor trail
  - 🌫️ Mist — sweeping god-rays through haze, soft puff cursor trail
  - 🪨 Stone — glowing cracks + periodic tremor, tumbling chip cursor trail
  - 🌸 Flower — pulsing bloom + drifting pollen, petal cursor trail
  - ❤️ Love — heartbeat-synced glow pulse, heart-pop cursor trail
- **Fully animated original background scene** (moon, mountains, fog,
  stars) — no copyrighted assets, all SVG/CSS.
- **Touch & cursor particle effects** that adapt shape and color per theme,
  working identically on desktop (mouse) and mobile (touch).
- **Responsive design** — full mobile support down to small phone widths.
- **Production-ready backend**:
  - Zod schema validation
  - Rate limiting (`express-rate-limit`)
  - Security headers (`helmet`)
  - Configurable CORS via environment variable
  - Structured logging (`winston` + `morgan`) to `combined.log`,
    `error.log`, and `access.log`
  - MongoDB persistence via Mongoose

---

## 🗂️ Project Structure

```
Enclave-portal-main/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimeBackground.jsx   # Per-theme animated scene
│   │   │   ├── ThemeSelector.jsx     # Floating button + theme modal
│   │   │   ├── TouchEffects.jsx      # Cursor/touch particle trail
│   │   │   └── ContactForm.jsx       # Form + validation + submit logic
│   │   ├── theme/
│   │   │   └── themes.js             # All 9 theme definitions
│   │   ├── services/
│   │   │   └── contact.service.js    # API calls to backend
│   │   ├── App.jsx
│   │   └── index.css                 # Full theme system + animations
│   └── .env                          # VITE_API_BASE_URL
│
├── server/                 # Express + MongoDB backend
│   ├── src/
│   │   ├── config/db.js              # MongoDB connection
│   │   ├── controllers/              # Route handlers
│   │   ├── middlewares/              # Validation, rate limit, errors
│   │   ├── models/                   # Mongoose schema
│   │   ├── routes/                   # /api/contact routes
│   │   ├── utils/logger.js           # Winston logger config
│   │   ├── logs/                     # combined.log, error.log, access.log
│   │   ├── app.js                    # Express app setup
│   │   └── server.js                 # Entry point
│   ├── .env                          # MONGO_URI, PORT, CORS_ORIGIN, etc.
│   └── .env.example
│
└── render.yaml              # Render deployment blueprint
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A MongoDB connection string (MongoDB Atlas recommended)

### 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=8888
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/enclave-portal
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=5
```

Start the server:

```bash
npm run dev
```

Verify it's running: open `http://localhost:8888/api/health` — should return:

```json
{ "success": true, "message": "Server is running successfully." }
```

### 2. Frontend setup

```bash
cd client
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

Confirm `client/.env` points at your backend:

```env
VITE_API_BASE_URL=http://localhost:8888/api
```

---

## 🔌 API Endpoints

| Method | Endpoint             | Description                          |
|--------|-----------------------|---------------------------------------|
| GET    | `/api/health`          | Health check                          |
| POST   | `/api/contact`         | Submit a contact message              |
| GET    | `/api/contact`         | List all submitted messages           |
| DELETE | `/api/contact/:id`     | Delete a message by ID                |

> ⚠️ `GET` and `DELETE` on `/api/contact` currently have **no
> authentication**. Add an admin key or auth middleware before exposing
> this publicly long-term.

### Validation rules (POST `/api/contact`)

| Field   | Rule                          |
|---------|-------------------------------|
| name    | minimum 3 characters          |
| email   | must be a valid email address |
| subject | minimum 5 characters          |
| message | minimum 20 characters         |

---

## 🌐 Deployment

### Backend → Render

1. New Web Service → connect this repo.
2. **Root Directory:** `server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Environment variables:

   | Key | Value |
   |---|---|
   | `MONGO_URI` | your Atlas connection string |
   | `NODE_ENV` | `production` |
   | `CORS_ORIGIN` | your Vercel URL (no trailing slash) |
   | `RATE_LIMIT_WINDOW_MS` | `60000` |
   | `RATE_LIMIT_MAX_REQUESTS` | `5` |

   A `render.yaml` blueprint is included at the repo root if you'd rather
   use Render's Blueprint deploy flow instead of manual setup.

### Frontend → Vercel

1. New Project → import this repo.
2. **Root Directory:** `client`
3. Framework preset: Vite (auto-detected)
4. Environment variable:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://enclave-portal-afjg.onrender.com/api` |

### Post-deploy checklist

- [ ] MongoDB Atlas → **Network Access** → allow `0.0.0.0/0` (Render uses
      dynamic IPs)
- [ ] `CORS_ORIGIN` on Render exactly matches your Vercel URL, **no
      trailing slash**
- [ ] `app.set("trust proxy", 1)` is set in `server/src/app.js` (Render
      sits behind a reverse proxy — required for rate limiting to
      correctly identify client IPs)
- [ ] Visit `<render-url>/api/health` to confirm the backend is live
- [ ] Submit the live contact form and confirm the entry appears in Atlas

---

## 📝 Logging

All requests and errors are logged via Winston to `server/src/logs/`:

- `combined.log` — all HTTP requests
- `access.log` — all HTTP requests (mirror)
- `error.log` — errors only

These are gitignored locally but will be created fresh on each
deployment environment.

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, vanilla CSS (custom properties for theming)
**Backend:** Node.js, Express, MongoDB, Mongoose, Zod, Winston, Morgan,
Helmet, express-rate-limit
**Deployment:** Render (backend), Vercel (frontend)

---

## 📄 License

Add your preferred license here (e.g. MIT).
