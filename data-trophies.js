/* =========================================================
   TROPHÉES
   Chaque trophée : id, name, desc, icon, tier ("bronze", "argent", "or")
   et test(c) qui renvoie true quand il est mérité.

   c = contexte donné par script.js après chaque fin de test :
     c.event   : "reaction" | "aim" | "quiz" | "perso"
     c.stats   : compteurs du joueur (games, played, quizGames, profiles…)
     c.bests   : meilleurs scores de quiz par jeu { jeu: { points, correct } }
     + les données de la partie (avg, best, earlies, score, hits, correct…)
   ========================================================= */

const TROPHY_TIERS = {
  bronze: "Bronze",
  argent: "Argent",
  or: "Or"
};

/* Jeux de quiz individuels (sans les modes « mix »), pour les trophées de collection */
const QUIZ_GAME_KEYS = ["lol", "valorant", "fortnite", "apex", "cyberpunk", "witcher", "rdr2", "tlou", "gow", "darksouls", "eldenring", "bloodborne", "sekiro"];

/* Vrai si le joueur a au moins `min` bonnes réponses sur chacun des jeux listés */
const allQuizzesAtLeast = (c, keys, min) => keys.every((k) => (c.bests[k]?.correct ?? 0) >= min);

const TROPHIES = [
  /* ---------- Temps de réaction ---------- */
  { id: "react-first", name: "Premiers réflexes", desc: "Termine un test de temps de réaction.", icon: "timer", tier: "bronze",
    test: (c) => c.event === "reaction" },
  { id: "react-300", name: "Réveillé", desc: "Fais une moyenne de 300 ms ou moins.", icon: "zap", tier: "bronze",
    test: (c) => c.event === "reaction" && c.avg <= 300 },
  { id: "react-260", name: "Œil de lynx", desc: "Fais une moyenne de 260 ms ou moins.", icon: "zap", tier: "argent",
    test: (c) => c.event === "reaction" && c.avg <= 260 },
  { id: "react-230", name: "Prédateur", desc: "Fais une moyenne de 230 ms ou moins.", icon: "flame", tier: "or",
    test: (c) => c.event === "reaction" && c.avg <= 230 },
  { id: "react-200", name: "Plus vite que la physique", desc: "Fais une moyenne de 200 ms ou moins.", icon: "crown", tier: "or",
    test: (c) => c.event === "reaction" && c.avg <= 200 },
  { id: "react-click", name: "Clic éclair", desc: "Réussis un essai en moins de 180 ms.", icon: "zap", tier: "argent",
    test: (c) => c.event === "reaction" && c.best < 180 },
  { id: "react-calm", name: "Sang-froid", desc: "Moyenne de 300 ms ou moins, sans aucun faux départ.", icon: "shield", tier: "argent",
    test: (c) => c.event === "reaction" && c.avg <= 300 && c.earlies === 0 },
  { id: "react-prefire", name: "Pré-fire", desc: "Fais 5 faux départs pendant un même test.", icon: "crosshair", tier: "bronze",
    test: (c) => c.event === "reaction" && c.earlies >= 5 },

  /* ---------- Aim trainer ---------- */
  { id: "aim-first", name: "Échauffement", desc: "Termine une partie d'aim trainer.", icon: "target", tier: "bronze",
    test: (c) => c.event === "aim" },
  { id: "aim-zero", name: "Mauvais côté de l'écran", desc: "Finis l'aim trainer sans toucher une seule cible.", icon: "ghost", tier: "bronze",
    test: (c) => c.event === "aim" && c.hits === 0 },
  { id: "aim-75", name: "Mains en forme", desc: "Fais 75 points ou plus.", icon: "target", tier: "bronze",
    test: (c) => c.event === "aim" && c.score >= 75 },
  { id: "aim-105", name: "Tireur d'élite", desc: "Fais 105 points ou plus.", icon: "crosshair", tier: "argent",
    test: (c) => c.event === "aim" && c.score >= 105 },
  { id: "aim-120", name: "Aimbot (légal)", desc: "Fais 120 points ou plus.", icon: "crown", tier: "or",
    test: (c) => c.event === "aim" && c.score >= 120 },
  { id: "aim-combo10", name: "Combo x10", desc: "Enchaîne 10 cibles sans rater.", icon: "flame", tier: "argent",
    test: (c) => c.event === "aim" && c.maxCombo >= 10 },
  { id: "aim-combo20", name: "Combo x20", desc: "Enchaîne 20 cibles sans rater.", icon: "flame", tier: "or",
    test: (c) => c.event === "aim" && c.maxCombo >= 20 },
  { id: "aim-sniper", name: "Sniper", desc: "100 % de précision avec au moins 15 cibles touchées.", icon: "crosshair", tier: "or",
    test: (c) => c.event === "aim" && c.precision === 100 && c.hits >= 15 },

  /* ---------- Quiz de culture ---------- */
  { id: "quiz-first", name: "Premier quiz", desc: "Termine un quiz de culture.", icon: "brain", tier: "bronze",
    test: (c) => c.event === "quiz" },
  { id: "quiz-13", name: "Tu tiens la route", desc: "13 bonnes réponses ou plus sur un quiz.", icon: "book", tier: "bronze",
    test: (c) => c.event === "quiz" && c.correct >= 13 },
  { id: "quiz-17", name: "Challenger de la culture", desc: "17 bonnes réponses ou plus sur un quiz.", icon: "brain", tier: "argent",
    test: (c) => c.event === "quiz" && c.correct >= 17 },
  { id: "quiz-perfect", name: "Sans faute", desc: "20 bonnes réponses sur 20.", icon: "crown", tier: "or",
    test: (c) => c.event === "quiz" && c.correct >= 20 },
  { id: "quiz-streak10", name: "Série de 10", desc: "10 bonnes réponses d'affilée.", icon: "flame", tier: "argent",
    test: (c) => c.event === "quiz" && c.maxStreak >= 10 },
  { id: "quiz-fast", name: "Doigts de fée", desc: "Réponds juste en moins de 3 secondes, 10 fois dans le même quiz.", icon: "zap", tier: "argent",
    test: (c) => c.event === "quiz" && c.fastCorrect >= 10 },
  { id: "quiz-5games", name: "Touche-à-tout", desc: "Joue à 5 quiz de jeux différents.", icon: "shuffle", tier: "bronze",
    test: (c) => c.stats.quizGames.length >= 5 },
  { id: "quiz-allgames", name: "Tour du monde", desc: "Joue aux 13 quiz de jeux au moins une fois.", icon: "compass", tier: "or",
    test: (c) => QUIZ_GAME_KEYS.every((k) => c.stats.quizGames.includes(k)) },
  { id: "quiz-competitif", name: "Esprit de compétition", desc: "13 bonnes réponses ou plus sur LoL, Valorant, Fortnite et Apex.", icon: "swords", tier: "or",
    test: (c) => allQuizzesAtLeast(c, ["lol", "valorant", "fortnite", "apex"], 13) },
  { id: "quiz-histoire", name: "Fan d'histoire", desc: "13 bonnes réponses ou plus sur les 5 jeux d'histoire.", icon: "book", tier: "or",
    test: (c) => allQuizzesAtLeast(c, ["cyberpunk", "witcher", "rdr2", "tlou", "gow"], 13) },
  { id: "quiz-souls", name: "Louez le soleil", desc: "13 bonnes réponses ou plus sur les 4 jeux Souls.", icon: "sun", tier: "or",
    test: (c) => allQuizzesAtLeast(c, ["darksouls", "eldenring", "bloodborne", "sekiro"], 13) },

  /* ---------- Personnalité ---------- */
  { id: "perso-first", name: "Qui es-tu ?", desc: "Termine le test de personnalité.", icon: "help", tier: "bronze",
    test: (c) => c.event === "perso" },
  { id: "perso-all", name: "Collectionneur de profils", desc: "Obtiens les 6 profils de gamer.", icon: "star", tier: "or",
    test: (c) => c.stats.profiles.length >= 6 },

  /* ---------- Général ---------- */
  { id: "games-10", name: "Habitué", desc: "Termine 10 parties, tous tests confondus.", icon: "gamepad", tier: "bronze",
    test: (c) => c.stats.games >= 10 },
  { id: "games-50", name: "Accro", desc: "Termine 50 parties.", icon: "gamepad", tier: "argent",
    test: (c) => c.stats.games >= 50 },
  { id: "games-100", name: "Légende de l'arène", desc: "Termine 100 parties.", icon: "trophy", tier: "or",
    test: (c) => c.stats.games >= 100 },
  { id: "all-modes", name: "Polyvalent", desc: "Joue au moins une fois à chaque mode : personnalité, réflexes, aim et quiz.", icon: "medal", tier: "argent",
    test: (c) => ["perso", "reaction", "aim", "quiz"].every((e) => (c.stats.played[e] ?? 0) > 0) }
];

/* GIFs meme de la notification de trophée (identifiants Giphy), selon la rareté du trophée */
const TROPHY_GIFS = {
  bronze: ["tAAvKbJEGgXFnls0f2", "cUi5FW3NdoGoB6l8Ya", "c5skRQb3BXp8RwKGKW"],
  argent: ["QkH8vnCaAsYGC9RM01", "N0ZnyUg7csbMmfrSCo", "bpTL6wXRuMQpMIVduB"],
  or: ["IwFMsIjN4ZmL1124Xt", "37vebOicbHKbwKfXhd", "D00YhPhbmXdVLEzxFN"]
};
