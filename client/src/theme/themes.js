export const THEMES = [
  {
    id: "sun", label: "Sun", kanji: "陽",
    sky: ["#3a1204", "#7a2c06", "#c1560c", "#2b0e02"],
    accent: "#ff8c1a", accent2: "#ffd23f", text: "#fff3d6",
    glow: "rgba(255, 140, 26, 0.55)",
    particle: "ember", particleColor: ["#ffd23f", "#ff6a1a"], extra: "rays",
  },
  {
    id: "water", label: "Water", kanji: "水",
    sky: ["#031b2e", "#053a52", "#0a5c78", "#01111f"],
    accent: "#2ec4d6", accent2: "#8fe9f0", text: "#dff8fb",
    glow: "rgba(46, 196, 214, 0.5)",
    particle: "rain", particleColor: ["#8fe9f0", "#2ec4d6"], extra: "waves",
  },
  {
    id: "thunder", label: "Thunder", kanji: "雷",
    sky: ["#0e0e02", "#1c1c04", "#2c2c06", "#050502"],
    accent: "#f5e642", accent2: "#fffbe0", text: "#fdfbe8",
    glow: "rgba(245, 230, 66, 0.6)",
    particle: "spark", particleColor: ["#fffbe0", "#f5e642"], extra: "lightning",
  },
  {
    id: "insect", label: "Insect", kanji: "虫",
    sky: ["#0c1a08", "#1c3311", "#2f4d1a", "#070f04"],
    accent: "#7fd13b", accent2: "#c9f27a", text: "#e6f7d2",
    glow: "rgba(127, 209, 59, 0.5)",
    particle: "spore", particleColor: ["#c9f27a", "#7fd13b"], extra: "haze",
  },
  {
    id: "sound", label: "Sound", kanji: "音",
    sky: ["#1c0521", "#3a0a3f", "#5c1263", "#100213"],
    accent: "#e64fd9", accent2: "#ff9df0", text: "#fbe4fa",
    glow: "rgba(230, 79, 217, 0.55)",
    particle: "pulse", particleColor: ["#ff9df0", "#e64fd9"], extra: "rings",
  },
  {
    id: "mist", label: "Mist", kanji: "霧",
    sky: ["#1a1c22", "#2b2e38", "#3d4150", "#101216"],
    accent: "#a8b0c0", accent2: "#dfe4ee", text: "#eef0f5",
    glow: "rgba(168, 176, 192, 0.45)",
    particle: "haze-drift", particleColor: ["#dfe4ee", "#a8b0c0"], extra: "denseFog",
  },
  {
    id: "stone", label: "Stone", kanji: "岩",
    sky: ["#1f180f", "#3a2c1a", "#544022", "#120d08"],
    accent: "#c98a3f", accent2: "#e8c48a", text: "#f2e3cc",
    glow: "rgba(201, 138, 63, 0.45)",
    particle: "dust", particleColor: ["#e8c48a", "#c98a3f"], extra: "cracks",
  },
  {
    id: "flower", label: "Flower", kanji: "花",
    sky: ["#22101a", "#3d1c2e", "#5c2c46", "#150a10"],
    accent: "#ff8fb3", accent2: "#ffd6e4", text: "#fdeef3",
    glow: "rgba(255, 143, 179, 0.5)",
    particle: "petal", particleColor: ["#ffd6e4", "#ff8fb3"], extra: "bloom",
  },
  {
    id: "love", label: "Love", kanji: "恋",
    sky: ["#1f0308", "#3d0813", "#5c0f1e", "#100104"],
    accent: "#e6304f", accent2: "#ff8095", text: "#ffe3e8",
    glow: "rgba(230, 48, 79, 0.55)",
    particle: "heart", particleColor: ["#ff8095", "#e6304f"], extra: "pulseRing",
  },
];

export const DEFAULT_THEME = "sound";

export const getTheme = (id) =>
  THEMES.find((t) => t.id === id) ?? THEMES.find((t) => t.id === DEFAULT_THEME);