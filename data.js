/* =========================================================
   ICÔNES (SVG, trait fin 24x24)
   Contenu interne des symboles ; le sprite est injecté par script.js.
   ========================================================= */
const ICONS = {
  gamepad: '<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
  swords: '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
  crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>',
  hammer: '<path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  shuffle: '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  tent: '<path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  bird: '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>',
  ghost: '<path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
  skull: '<path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  chart: '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
  medal: '<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
  "trending-up": '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  "trending-down": '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>'
};

/* =========================================================
   GAMER ARENA — DONNÉES
   Tout le contenu du site est ici : facile à modifier sans
   toucher à la logique. Ajoute une question = ajoute un objet.
   ========================================================= */

/* ---------- Jeux (couleur d'accent + nom affiché) ---------- */
/* icon = pictogramme, genre = type de jeu, pourToi = le « rapport »
   qui aide à comprendre vers quel jeu on va */
const GAMES = {
  lol: {
    name: "League of Legends", icon: "swords", genre: "MOBA · 5 contre 5",
    pourToi: "tu aimes la stratégie d'équipe et les parties tactiques"
  },
  valorant: {
    name: "Valorant", icon: "crosshair", genre: "Tir tactique · 5 contre 5",
    pourToi: "tu aimes viser juste et réfléchir avant de tirer"
  },
  fortnite: {
    name: "Fortnite", icon: "hammer", genre: "Battle royale · construction",
    pourToi: "tu aimes l'ambiance colorée, construire et rigoler"
  },
  apex: {
    name: "Apex Legends", icon: "shield", genre: "Battle royale · légendes",
    pourToi: "tu aimes le travail d'équipe, les pouvoirs et la tension"
  },
  mix: {
    name: "Mix de tous les jeux", icon: "shuffle", genre: "Les 4 jeux mélangés",
    pourToi: "tu veux goûter un peu de tout"
  }
};

/* Test de bienvenue (première ouverture). points = activités recommandées par la réponse */
const ONBOARDING_QUESTIONS = [
  {
    question: "Tu veux d'abord…",
    answers: [
      { text: "Découvrir quel gamer tu es", points: { personnalite: 2 } },
      { text: "Prouver tes réflexes", points: { reaction: 2, aim: 1 } },
      { text: "Viser juste sous pression", points: { aim: 2, valorant: 1 } },
      { text: "Tester ta culture gaming", points: { lol: 1, valorant: 1, fortnite: 1, apex: 1 } }
    ]
  },
  {
    question: "Ton univers préféré ?",
    answers: [
      { text: "Un monde fantasy riche (LoL)", points: { lol: 2 } },
      { text: "Tactique et précision (Valorant)", points: { valorant: 2, aim: 1 } },
      { text: "Construire et s'amuser (Fortnite)", points: { fortnite: 2 } },
      { text: "Survie et équipe (Apex)", points: { apex: 2 } }
    ]
  },
  {
    question: "Ta méthode de jeu ?",
    answers: [
      { text: "Je réfléchis avant d'agir", points: { personnalite: 1, lol: 1 } },
      { text: "J'agis dans l'instant", points: { reaction: 2 } },
      { text: "Je vise la précision", points: { aim: 2 } },
      { text: "Je veux juste rigoler", points: { fortnite: 1, personnalite: 1 } }
    ]
  }
];

/* Activités proposées à la fin du test. Ordre = priorité en cas d'égalité */
const ONBOARDING_ACTIVITIES = {
  personnalite: { icon: "gamepad", name: "Quel gamer es-tu ?", desc: "20 questions pour découvrir ton profil de joueur. C'est l'échauffement idéal." },
  reaction: { icon: "timer", name: "Temps de réaction", desc: "La case devient verte, tu cliques. 5 essais, moyenne en millisecondes." },
  aim: { icon: "target", name: "Aim trainer", desc: "30 secondes de cibles à toucher, avec combo. Les doigts vont chauffer." },
  lol: { icon: GAMES.lol.icon, name: "Quiz League of Legends", desc: GAMES.lol.pourToi },
  valorant: { icon: GAMES.valorant.icon, name: "Quiz Valorant", desc: GAMES.valorant.pourToi },
  fortnite: { icon: GAMES.fortnite.icon, name: "Quiz Fortnite", desc: GAMES.fortnite.pourToi },
  apex: { icon: GAMES.apex.icon, name: "Quiz Apex Legends", desc: GAMES.apex.pourToi }
};

/* =========================================================
   MODE 1 — PROFILS DE GAMER
   game = clé de GAMES qui correspond le mieux au profil
   ========================================================= */
const PROFILES = {
  tryhard: {
    title: "Le Tryhard Sans Sommeil",
    icon: "flame",
    description: "Ton PC est allumé depuis trois jours, ta souris chauffe et tu regardes ton classement toutes les cinq minutes. Le repos ? Connais pas.",
    strengths: ["Motivation de fer", "Mécanique et réflexes au top", "Toujours une stratégie en réserve"],
    weaknesses: ["Tu oublies de manger", "Tu révises tes ratios la nuit", "Ton entourage te supplie de dormir"],
    game: "valorant"
  },
  rageux: {
    title: "Le Rageux Professionnel",
    icon: "megaphone",
    description: "Tu as un talent unique : transformer une défaite de 3 minutes en thérapie de 3 heures. Le lag, le matchmaking et ton équipe sont responsables de tout.",
    strengths: ["Énergie inépuisable", "Tu sais toujours qui blâmer", "Un clavier increvable"],
    weaknesses: ["Tu accuses le lag depuis 2019", "Tes coéquipiers t'ont mis en sourdine", "Tu as déjà parlé à ta souris comme à un ennemi"],
    game: "lol"
  },
  touriste: {
    title: "Le Touriste du Week-end",
    icon: "sun",
    description: "Tu lances une partie le samedi, tu fais trois danses, tu meurs au premier coup de feu et tu trouves ça très bien comme ça.",
    strengths: ["Bonne humeur permanente", "Des skins qui font briller les yeux", "Tu profites du paysage"],
    weaknesses: ["Tu tombes toujours en premier", "Tu oublies la tempête", "Tu confonds le bouton de tir et celui de danse"],
    game: "fortnite"
  },
  support: {
    title: "Le Support Incompris",
    icon: "heart",
    description: "Tu soignes, tu protèges, tu pinges les objectifs. Personne ne retient ton nom à la fin, mais sans toi, toute l'équipe serait déjà au cimetière.",
    strengths: ["Tu protèges tes alliés", "Tu vois toute la carte", "Tu fais le boulot sans les lauriers"],
    weaknesses: ["Personne ne regarde tes stats", "Tu te fais one-shot en essayant de soigner", "Tu pinges plus vite que tu ne parles"],
    game: "lol"
  },
  camper: {
    title: "Le Camper Légendaire",
    icon: "tent",
    description: "Tu es arrivé avant la partie, tu t'es planqué derrière un buisson et tu attends depuis quarante minutes. Personne ne t'a vu, et c'est ta plus grande fierté.",
    strengths: ["Une patience de moine", "Tu gagnes par surprise", "Tu es le roi des buissons"],
    weaknesses: ["Tu n'avances jamais", "Tes alliés ont peur de toi", "Le cercle finit toujours par te rattraper"],
    game: "apex"
  },
  streamer: {
    title: "Le Streamer Raté",
    icon: "video",
    description: "Tu lances ton live avec trois spectateurs : un bot, ta mère et toi. Tu as un micro de qualité, un éclairage de luxe et une audience qui dort.",
    strengths: ["Un charisme XXL", "Tu sais faire des blagues", "Tu crées de l'ambiance"],
    weaknesses: ["Ton chat parle plus que toi", "Tu oublies de couper le micro", "Tes meilleurs clips sont tes fails"],
    game: "fortnite"
  }
};

/* 20 questions, 4 réponses chacune. "profile" = clé de PROFILES. */
const PERSO_QUESTIONS = [
  {
    question: "Ton équipe perd 0-10 à la 15e minute. Tu fais quoi ?",
    answers: [
      { text: "Je farm comme si ma vie en dépendait", profile: "tryhard" },
      { text: "J'insulte tout le monde en vocal", profile: "rageux" },
      { text: "Je fais un selfie avec le Baron et je zappe", profile: "touriste" },
      { text: "Je pinge les objectifs en silence pour aider", profile: "support" }
    ]
  },
  {
    question: "Tu ragequit combien de fois par semaine ?",
    answers: [
      { text: "Jamais, je suis un moine zen", profile: "support" },
      { text: "Au moins 3 fois, c'est mon sport", profile: "rageux" },
      { text: "Une fois, puis je boude dans mon coin", profile: "camper" },
      { text: "Je joue pas assez pour ragequit", profile: "touriste" }
    ]
  },
  {
    question: "Ton main sur LoL c'est Yasuo ?",
    answers: [
      { text: "Oui, et je le joue même quand l'équipe demande autre chose", profile: "rageux" },
      { text: "Oui, je connais chaque combo par cœur", profile: "tryhard" },
      { text: "C'est quoi un main ? J'achète surtout les skins", profile: "touriste" },
      { text: "Non, je joue support, je protège mes alliés", profile: "support" }
    ]
  },
  {
    question: "Ta session de jeu idéale dure combien de temps ?",
    answers: [
      { text: "Le temps d'un café, pas plus", profile: "touriste" },
      { text: "Jusqu'à ce que mes yeux saignent", profile: "tryhard" },
      { text: "Le temps d'une partie, puis je lance mon live", profile: "streamer" },
      { text: "Jusqu'à la fin de la partie, je fais le coach", profile: "support" }
    ]
  },
  {
    question: "Ton pseudo en jeu ressemble à :",
    answers: [
      { text: "xX_Sn1perKing_Xx", profile: "camper" },
      { text: "ChocoDragon93", profile: "touriste" },
      { text: "Le_Coach_De_Ton_Equipe", profile: "support" },
      { text: "Tryhard_Forever_2014", profile: "tryhard" }
    ]
  },
  {
    question: "Ton réveil sonne. Ton premier réflexe :",
    answers: [
      { text: "Check mon classement et mon ratio", profile: "tryhard" },
      { text: "Je hurle sur le réveil, c'est déjà un problème", profile: "rageux" },
      { text: "Je lance un live pour 4 personnes et ma mère", profile: "streamer" },
      { text: "Je check la boutique de skins", profile: "touriste" }
    ]
  },
  {
    question: "Ton arme préférée dans un FPS :",
    answers: [
      { text: "Le sniper planqué dans un buisson", profile: "camper" },
      { text: "Le couteau, c'est plus stylé", profile: "tryhard" },
      { text: "La pioche de Fortnite, pour la déco", profile: "touriste" },
      { text: "Le soin ou le bouclier de l'équipe", profile: "support" }
    ]
  },
  {
    question: "Tu meurs pour la 9e fois d'affilée. Tu fais quoi ?",
    answers: [
      { text: "Je relance direct, je veux la revanche", profile: "tryhard" },
      { text: "Je hurle contre le lag et le matchmaking", profile: "rageux" },
      { text: "Je fais une pause pour réagir devant le chat", profile: "streamer" },
      { text: "Je cherche un nouveau coin tranquille", profile: "camper" }
    ]
  },
  {
    question: "Tes amis demandent : « On joue ce soir ? »",
    answers: [
      { text: "Oui, en ranked, on monte ou on meurt", profile: "tryhard" },
      { text: "Oui, mais à 22h je dois dormir", profile: "touriste" },
      { text: "Oui, en mode muet, t'inquiète", profile: "camper" },
      { text: "Oui, je stream la session, venez me soutenir", profile: "streamer" }
    ]
  },
  {
    question: "Ta façon de parler en vocal :",
    answers: [
      { text: "Je donne des ordres toutes les 3 secondes", profile: "tryhard" },
      { text: "« LA FAUTE À QUI ?! » en boucle", profile: "rageux" },
      { text: "Je blague et je mets l'ambiance", profile: "streamer" },
      { text: "Je parle peu, je pinge, je reste dans l'ombre", profile: "camper" }
    ]
  },
  {
    question: "En Battle Royale, tu finis souvent :",
    answers: [
      { text: "Éliminé en premier, à force de courir partout", profile: "touriste" },
      { text: "Top 1, sinon c'est une erreur de matchmaking", profile: "tryhard" },
      { text: "Caché dans une maison pendant 40 minutes", profile: "camper" },
      { text: "Relevé par mes coéquipiers, je soigne tout le monde", profile: "support" }
    ]
  },
  {
    question: "Ta souris ou ta manette :",
    answers: [
      { text: "Une pro à 12 boutons, parfaitement réglée", profile: "tryhard" },
      { text: "Le clavier de l'ordi familial", profile: "touriste" },
      { text: "La manette qui a déjà pris des coups", profile: "rageux" },
      { text: "Le micro-casque qui crache un peu", profile: "streamer" }
    ]
  },
  {
    question: "Tu regardes des tutos YouTube ?",
    answers: [
      { text: "Tous les jours, même pour les strats obscures", profile: "tryhard" },
      { text: "Je regarde des tutos et je fais l'inverse", profile: "rageux" },
      { text: "Je regarde, mais je ne joue pas, c'est pareil", profile: "touriste" },
      { text: "Je suis le coach de mon équipe, pas besoin de tuto", profile: "support" }
    ]
  },
  {
    question: "Ta mort la plus fréquente :",
    answers: [
      { text: "Trop agressif, je plonge tout seul", profile: "tryhard" },
      { text: "Oublié de regarder la minimap", profile: "touriste" },
      { text: "En essayant de soigner tout le monde", profile: "support" },
      { text: "Planqué, et la zone m'a rattrapé", profile: "camper" }
    ]
  },
  {
    question: "Ton équipe déteste ton pick à la sélection :",
    answers: [
      { text: "Je pick mon main, c'est la vie", profile: "rageux" },
      { text: "Je pick le méta, sans surprise", profile: "tryhard" },
      { text: "Je pick au hasard, c'est fun", profile: "touriste" },
      { text: "Je pick le support, le roi du sacrifice", profile: "support" }
    ]
  },
  {
    question: "Ta définition d'un bon jeu :",
    answers: [
      { text: "Un système de ranked hyper compétitif", profile: "tryhard" },
      { text: "De bons skins et des events sympa", profile: "touriste" },
      { text: "Un jeu qui fait un bon spectacle pour ma caméra", profile: "streamer" },
      { text: "Un jeu où on peut se planquer tranquille", profile: "camper" }
    ]
  },
  {
    question: "Après une victoire, tu fais :",
    answers: [
      { text: "Je lance directement la prochaine game", profile: "tryhard" },
      { text: "« C'était grâce à moi » en vocal", profile: "rageux" },
      { text: "Je fais un screen et je le poste partout", profile: "streamer" },
      { text: "Je reste discret et je refais ma routine", profile: "camper" }
    ]
  },
  {
    question: "Tes objets préférés :",
    answers: [
      { text: "Les skins légendaires à six pages", profile: "touriste" },
      { text: "Les stats, rien que les stats", profile: "tryhard" },
      { text: "Les objets qui soignent les autres", profile: "support" },
      { text: "Les objets qui rendent invisible", profile: "camper" }
    ]
  },
  {
    question: "Ta devise gamer :",
    answers: [
      { text: "Gagner ou mourir en essayant", profile: "tryhard" },
      { text: "C'est pas ma faute, c'est le lag", profile: "rageux" },
      { text: "L'important c'est de s'amuser", profile: "touriste" },
      { text: "Protège ton équipe, même si personne ne le remarque", profile: "support" }
    ]
  },
  {
    question: "Ton prochain achat gaming :",
    answers: [
      { text: "Une souris à 150 € avec 12 boutons", profile: "tryhard" },
      { text: "Un skin à 1 000 V-Bucks, c'est une question de vie", profile: "touriste" },
      { text: "Un micro qui ne grésille plus", profile: "streamer" },
      { text: "Une chaise pour tenir 14 heures sans bouger", profile: "camper" }
    ]
  }
];

/* =========================================================
   MODE 2 — TEST DE RÉFLEXES : rangs humoristiques
   Temps de réaction : plus c'est bas, mieux c'est.
   Aim trainer : score = cibles touchées + précision (%).
   ========================================================= */
const REACTION_RANKS = [
  { max: 200, label: "Radiant",              comment: "Tes réflexes dépassent les lois de la physique. Un peu flippant, honnêtement." },
  { max: 230, label: "Challenger",           comment: "Un vrai prédateur. Ta souris a peur de toi." },
  { max: 260, label: "Diamant",              comment: "Solide ! Tu réagis plus vite que ton grille-pain." },
  { max: 300, label: "Or",                   comment: "Pas mal ! Tu es dans le haut du panier des gamers bien réveillés." },
  { max: 360, label: "Argent",               comment: "Tu réagis comme quelqu'un qui relit son message avant de l'envoyer." },
  { max: 450, label: "Bronze",               comment: "Tu as dû faire une sieste pendant le test, avoue." },
  { max: 600, label: "Fer 4",                comment: "Ton cerveau a encore son chargement en cours. Ça va venir." },
  { max: Infinity, label: "Bot niveau débutant", comment: "Même un bot aurait cliqué plus vite. Respire, et réessaie." }
];

const AIM_RANKS = [
  { min: 120, label: "Radiant",              comment: "Ton aim est tellement propre qu'on dirait un aimbot. Ne touche surtout pas à ta sensibilité." },
  { min: 105, label: "Challenger",           comment: "Tu vises comme tu parles en vocal : précis et sans pitié." },
  { min: 90,  label: "Diamant",              comment: "Solide ! Tu rates encore quelques cibles, mais tes doigts sont en forme." },
  { min: 75,  label: "Or",                   comment: "Tu te débrouilles bien. Il te manque juste un peu de café, ou de sommeil." },
  { min: 60,  label: "Argent",               comment: "Tu vises comme tu conduis : on a vu pire, mais pas souvent." },
  { min: 45,  label: "Bronze",               comment: "Tes cibles ont eu le temps de faire le tour de la carte avant que tu cliques." },
  { min: 30,  label: "Fer 4",                comment: "Tu vises avec la souris de l'ordi de ton grand-père. Ça viendra." },
  { min: 0,   label: "Bot niveau débutant", comment: "Même un bot aurait fait mieux. On a tous commencé comme ça, courage." }
];

/* Messages affichés quand on clique trop tôt */
const TOO_EARLY_MESSAGES = [
  "Trop tôt, t'as pré-fire comme sur Valorant",
  "Tu as lancé ton ult avant que l'équipe arrive",
  "Faux départ ! Même les sprinters attendent le pistolet",
  "Attends le vert, champion. Le bot, lui, ne triche pas",
  "Ta souris a cliqué toute seule, on a les preuves"
];

/* =========================================================
   MODE 3 — QUIZ DE CULTURE GAMING
   Chaque jeu : 20 questions. correct = bonne réponse,
   wrong = 3 mauvaises, fun = anecdote ou blague.
   ========================================================= */
const CULTURE_QUESTIONS = {
  lol: [
    {
      q: "Quel studio a développé League of Legends ?",
      correct: "Riot Games",
      wrong: ["Blizzard Entertainment", "Valve", "Epic Games"],
      fun: "Le seul jeu où l'on pleure en Ranked… et en Normal aussi."
    },
    {
      q: "Combien de joueurs par équipe dans le mode classique (5v5) ?",
      correct: "5",
      wrong: ["3", "4", "6"],
      fun: "Cinq joueurs, mais tu as toujours l'impression qu'il en manque un."
    },
    {
      q: "Quel monstre géant apparaît au milieu de la Faille de l'Invocateur ?",
      correct: "Baron Nashor",
      wrong: ["Héraut de la Faille", "Dragon des Nuages", "Larve du Vide"],
      fun: "Le Baron ne demande jamais la permission. Il arrive, c'est tout."
    },
    {
      q: "À quelle espèce appartient Teemo ?",
      correct: "Yordle",
      wrong: ["Vastaya", "Humain", "Golem"],
      fun: "Teemo : le seul à poser des champignons pour le plaisir et le seul à s'en vanter."
    },
    {
      q: "Quelle monnaie achetable avec de l'argent réel existe dans LoL ?",
      correct: "Riot Points (RP)",
      wrong: ["Blue Essence", "Gold", "Orbes de Vie"],
      fun: "Sans RP, tu n'as rien. Sans Blue Essence, tu n'as juste pas le champion de la semaine."
    },
    {
      q: "De quelle région vient Garen ?",
      correct: "Demacia",
      wrong: ["Noxus", "Ionie", "Piltover"],
      fun: "« Pour Demacia ! » crie Garen, même quand il est tout seul dans la rivière."
    },
    {
      q: "De quelle ville vient Jinx ?",
      correct: "Zaun",
      wrong: ["Piltover", "Noxus", "Bilgewater"],
      fun: "On lui a donné un lance-roquettes. Ses alliés sont toujours de cet avis : c'était une mauvaise idée."
    },
    {
      q: "Quelle est l'espèce d'Ahri ?",
      correct: "Vastaya",
      wrong: ["Yordle", "Humaine", "Golem"],
      fun: "Neuf queues, zéro patience quand un Yasuo s'approche."
    },
    {
      q: "De quelle région vient Yasuo ?",
      correct: "Ionie",
      wrong: ["Demacia", "Noxus", "Shurima"],
      fun: "Yasuo a un vent pour respirer. Le vent, lui, n'a jamais de repos."
    },
    {
      q: "De quelle ville vient Ezreal ?",
      correct: "Piltover",
      wrong: ["Zaun", "Demacia", "Bilgewater"],
      fun: "Ezreal part en mission pendant que son équipe meurt. Très pro, très seul."
    },
    {
      q: "Combien de voies (lanes) principales a la Faille de l'Invocateur ?",
      correct: "3",
      wrong: ["2", "4", "5"],
      fun: "Trois voies, et tu trouves toujours celle où ton équipe n'est pas."
    },
    {
      q: "Quel rôle occupe généralement Lulu ?",
      correct: "Support",
      wrong: ["Tireur", "Mage", "Combattant"],
      fun: "Lulu transforme ses ennemis en petites bêtes. Toi, tu fais pareil avec tes coéquipiers."
    },
    {
      q: "Quel est le nom du championnat mondial annuel de LoL ?",
      correct: "Worlds",
      wrong: ["The International", "Major", "Gamescom"],
      fun: "Gamescom est un salon, pas un tournoi. Mais on peut y pleurer aussi."
    },
    {
      q: "Quelle est la carte la plus jouée de LoL ?",
      correct: "La Faille de l'Invocateur",
      wrong: ["L'Abîme hurlant", "Le Bois tordu", "La Cicatrice de cristal"],
      fun: "La Faille : l'endroit où tout le monde tombe, littéralement et émotionnellement."
    },
    {
      q: "Quelle plateforme a diffusé la série Arcane ?",
      correct: "Netflix",
      wrong: ["Disney+", "Amazon Prime Video", "HBO Max"],
      fun: "Arcane a fait pleurer plus de joueurs que la fin de chaque saison de Ranked."
    },
    {
      q: "En quelle année Riot Games a-t-il été fondé ?",
      correct: "2006",
      wrong: ["2003", "2009", "2011"],
      fun: "Vingt ans d'existence, soit plus longtemps que ton tout premier pseudo cringe."
    },
    {
      q: "Où se trouve le siège de Riot Games ?",
      correct: "Los Angeles",
      wrong: ["Séoul", "Paris", "Berlin"],
      fun: "Le siège est à Los Angeles, mais ton ping, lui, a l'air de sortir de Séoul."
    },
    {
      q: "Quelle ressource sert à acheter des objets pendant une partie ?",
      correct: "L'or",
      wrong: ["Les orbes", "Les cristaux de mana", "Les crédits"],
      fun: "L'or : la seule chose qui fait tourner l'économie de la partie, et souvent celle qui te manque."
    },
    {
      q: "De quelle race est Tristana ?",
      correct: "Yordle",
      wrong: ["Vastaya", "Humaine", "Démon"],
      fun: "Petite, explosive, et elle ne pardonne pas le lag. Un vrai modèle."
    },
    {
      q: "De quelle région vient Katarina ?",
      correct: "Noxus",
      wrong: ["Demacia", "Ionie", "Freljord"],
      fun: "Son ultime ressemble à un spam de couteaux. Ton équipe aussi, après un teamfight."
    }
  ],

  valorant: [
    {
      q: "Quel studio a développé Valorant ?",
      correct: "Riot Games",
      wrong: ["Ubisoft", "Bungie", "Activision"],
      fun: "Riot a encore réussi à te faire passer ta nuit sur un jeu. Bravo."
    },
    {
      q: "En quelle année Valorant est-il sorti ?",
      correct: "2020",
      wrong: ["2018", "2019", "2021"],
      fun: "Sorti en 2020, l'année où tout le monde a appris à dire « je suis en vocal »."
    },
    {
      q: "De quel pays vient Jett ?",
      correct: "Corée du Sud",
      wrong: ["Japon", "Chine", "Thaïlande"],
      fun: "Jett dash plus vite que ton excuse quand tu te fais éliminer."
    },
    {
      q: "Quel est le rôle de Sage ?",
      correct: "Sentinelle",
      wrong: ["Duelliste", "Initiateur", "Contrôleur"],
      fun: "Sage soigne toute l'équipe, sauf ton ego."
    },
    {
      q: "Quel agent peut ressusciter un allié tombé ?",
      correct: "Sage",
      wrong: ["Killjoy", "Omen", "Raze"],
      fun: "Sage ressuscite tes alliés. Personne ne sait ressusciter ta réputation après un 0/12."
    },
    {
      q: "Quel agent pose des fumigènes depuis le ciel ?",
      correct: "Brimstone",
      wrong: ["Omen", "Viper", "Astra"],
      fun: "Brimstone fait des fumées depuis l'espace. Même fumer tranquille n'est plus possible."
    },
    {
      q: "Comment s'appelle la bombe dans Valorant ?",
      correct: "La Spike",
      wrong: ["Le Core", "La Charge", "La Dynamite"],
      fun: "La Spike, c'est aussi le pic de ton taux de stress en fin de manche."
    },
    {
      q: "Quelle carte de Valorant possède des téléporteurs ?",
      correct: "Bind",
      wrong: ["Haven", "Split", "Ascent"],
      fun: "Sur Bind, tu arrives plus vite que ton équipe ne comprend ton plan."
    },
    {
      q: "Combien de sites de pose de Spike possède Haven ?",
      correct: "3",
      wrong: ["2", "4", "1"],
      fun: "Trois sites, donc trois endroits où tu peux te faire tuer au lieu d'un."
    },
    {
      q: "Dans quel pays se déroule la carte Ascent ?",
      correct: "Italie",
      wrong: ["Espagne", "Grèce", "Portugal"],
      fun: "Ascent est une visite touristique, sauf que tu n'as jamais le temps de voir les pigeons."
    },
    {
      q: "De quel pays vient Reyna ?",
      correct: "Mexique",
      wrong: ["Brésil", "Chili", "Colombie"],
      fun: "Reyna se soigne en tuant. Ton ego, lui, fait pareil après une bonne série."
    },
    {
      q: "Quel agent est une ingénieure allemande ?",
      correct: "Killjoy",
      wrong: ["Cypher", "Sova", "Skye"],
      fun: "Sa tourelle ne rigole pas. Elle non plus quand tu passes devant."
    },
    {
      q: "De quel pays vient Cypher ?",
      correct: "Maroc",
      wrong: ["Turquie", "Égypte", "Algérie"],
      fun: "Cypher te surveille par caméra. Un vrai Big Brother, en pire."
    },
    {
      q: "Quel agent est un ancien mercenaire français ?",
      correct: "Chamber",
      wrong: ["Breach", "Phoenix", "Yoru"],
      fun: "Chamber a une arme de luxe et un tarif qui fait pleurer ton portefeuille."
    },
    {
      q: "Quelle est l'arme de précision la plus chère du jeu ?",
      correct: "The Operator",
      wrong: ["Marshall", "Outlaw", "Bulldog"],
      fun: "L'Operator coûte plus cher que ta souris, ton clavier et ton siège réunis."
    },
    {
      q: "Quel agent Initiateur tire une flèche de reconnaissance ?",
      correct: "Sova",
      wrong: ["Breach", "Fade", "Gekko"],
      fun: "Sova te voit avant que tu ne tires. Il est meilleur que toi en vision, c'est dit."
    },
    {
      q: "De quel pays vient Raze ?",
      correct: "Brésil",
      wrong: ["Argentine", "Mexique", "Colombie"],
      fun: "Raze pose des bombes partout. C'est le seul hobby qui fonctionne vraiment ici."
    },
    {
      q: "Quel est le rang le plus élevé de Valorant (hors top 500) ?",
      correct: "Radiant",
      wrong: ["Immortel", "Ascendant", "Champion"],
      fun: "Radiant : le seul rang où tu as le droit de te la péter, en théorie."
    },
    {
      q: "Combien de points de vie a un joueur au début d'une manche ?",
      correct: "100",
      wrong: ["75", "125", "150"],
      fun: "100 PV. Ton ego, lui, en a beaucoup moins après une défaite."
    },
    {
      q: "Quel est le nom du circuit esport officiel de Valorant ?",
      correct: "VCT (Valorant Champions Tour)",
      wrong: ["LEC", "LCK", "CDL"],
      fun: "Le VCT : là où ton CV se résume à un score et ton ego à une statistique."
    }
  ],

  fortnite: [
    {
      q: "Quel studio a développé Fortnite ?",
      correct: "Epic Games",
      wrong: ["Riot Games", "Bungie", "Valve"],
      fun: "Epic Games : le nom le plus épique qu'on puisse donner à une défaite."
    },
    {
      q: "En quelle année est sorti le mode Battle Royale de Fortnite ?",
      correct: "2017",
      wrong: ["2016", "2018", "2019"],
      fun: "2017 : l'année où tout le monde a commencé à danser en plein combat."
    },
    {
      q: "Quel moteur de jeu utilise Fortnite ?",
      correct: "Unreal Engine",
      wrong: ["Unity", "Frostbite", "CryEngine"],
      fun: "Unreal Engine : le moteur qui te fait attendre trente secondes avant la partie."
    },
    {
      q: "Qui est le fondateur d'Epic Games ?",
      correct: "Tim Sweeney",
      wrong: ["Gabe Newell", "Hideo Kojima", "Ben Cichy"],
      fun: "Tim Sweeney a réussi à rendre le lama plus célèbre que lui-même. Chapeau."
    },
    {
      q: "Quelle est la monnaie virtuelle de Fortnite ?",
      correct: "V-Bucks",
      wrong: ["Gold Coins", "Crédits Fortnite", "Dollars Epic"],
      fun: "Les V-Bucks disparaissent plus vite que ton budget skins."
    },
    {
      q: "Comment s'appelle le bus qui transporte les joueurs au début d'une partie ?",
      correct: "Battle Bus",
      wrong: ["Shuttle Bus", "Zeppelin", "Tramway"],
      fun: "Le Battle Bus : le seul bus que tu prends sans payer, et sans savoir où tu descends."
    },
    {
      q: "Comment s'appelle la zone mortelle qui se réduit au fil de la partie ?",
      correct: "La tempête",
      wrong: ["Le brouillard", "Le cercle de feu", "La zone grise"],
      fun: "La tempête te suit plus fidèlement que ta mère quand tu rentres tard."
    },
    {
      q: "Quel outil sert à récolter les matériaux ?",
      correct: "La pioche",
      wrong: ["Le marteau", "La hache de guerre", "Le pied-de-biche"],
      fun: "La pioche sert à tout, sauf à te faire des amis."
    },
    {
      q: "Quel matériau de construction est le plus solide ?",
      correct: "Le métal",
      wrong: ["Le bois", "La brique", "Le verre"],
      fun: "Le métal : le plus solide, comme ton ego après un Victory Royale."
    },
    {
      q: "Combien de joueurs participent à une partie solo de Battle Royale ?",
      correct: "100",
      wrong: ["50", "64", "150"],
      fun: "Cent joueurs, dont quatre-vingt-dix-neuf ont eu la même idée : se cacher dans la même maison."
    },
    {
      q: "Quel skin est une banane ?",
      correct: "Peely",
      wrong: ["Sparkle Specialist", "Ninja", "Black Knight"],
      fun: "Peely : il a plus de fruits que ton frigo, et il a fait le même chemin."
    },
    {
      q: "Quel tournoi mondial de 2019 a distribué 30 millions de dollars ?",
      correct: "Fortnite World Cup",
      wrong: ["Worlds", "The International", "Winter Cup"],
      fun: "Trente millions de dollars… pour un jeu soi-disant « gratuit ». Ahah."
    },
    {
      q: "Comment s'appelle le mode coopératif PvE de Fortnite ?",
      correct: "Sauver le Monde",
      wrong: ["Mode Créatif", "Zone Wars", "Duo Arena"],
      fun: "Sauver le Monde : un mode que tout le monde a oublié, sauf ceux qui y ont mille heures."
    },
    {
      q: "Quel animal distribue du butin dans Fortnite ?",
      correct: "Le lama",
      wrong: ["Le chien", "Le corbeau", "Le renard"],
      fun: "Le lama : le seul animal qui te donne du loot sans te demander de l'aide."
    },
    {
      q: "Dans quel mode construit-on librement sans combattre ?",
      correct: "Mode Créatif",
      wrong: ["Sauver le Monde", "Battle Royale", "Zone Wars"],
      fun: "Le Mode Créatif : ton terrain de jeu préféré quand tu as perdu le goût de tirer."
    },
    {
      q: "Combien de joueurs par équipe en mode Escouade ?",
      correct: "4",
      wrong: ["2", "3", "5"],
      fun: "Quatre joueurs, dont un qui se fait éliminer dans les trente premières secondes."
    },
    {
      q: "Comment s'appellent les compétitions officielles de Fortnite ?",
      correct: "FNCS (Fortnite Champion Series)",
      wrong: ["LEC", "VCT", "LCK"],
      fun: "La FNCS se regarde mieux qu'elle ne se joue, surtout quand tu finis en 98e position."
    },
    {
      q: "Quelle est la rareté la plus élevée parmi les objets de Fortnite ?",
      correct: "Mythique",
      wrong: ["Légendaire", "Épique", "Rare"],
      fun: "Mythique : le nom parfait pour une arme qui te fait fuir."
    },
    {
      q: "Quelle est la protection maximale que peut apporter le bouclier ?",
      correct: "100",
      wrong: ["50", "150", "200"],
      fun: "100 de bouclier. Ton ego, lui, n'en a plus après une élimination."
    },
    {
      q: "Combien de matériaux de construction différents existent ?",
      correct: "3",
      wrong: ["2", "4", "5"],
      fun: "Bois, brique, métal : tu construis une forteresse, et tu meurs dans le couloir."
    }
  ],

  apex: [
    {
      q: "Quel studio a développé Apex Legends ?",
      correct: "Respawn Entertainment",
      wrong: ["Bungie", "Infinity Ward", "Bethesda"],
      fun: "Respawn a fait Titanfall : ils savent faire des robots, et des fans frustrés."
    },
    {
      q: "En quelle année Apex Legends est-il sorti ?",
      correct: "2019",
      wrong: ["2017", "2018", "2020"],
      fun: "Sorti en 2019 : une bonne surprise pour ceux qui ont sauté le lancement."
    },
    {
      q: "Combien de joueurs par équipe en mode classique ?",
      correct: "3",
      wrong: ["2", "4", "5"],
      fun: "Trois joueurs, donc trois fois plus de gens pour te reprocher ton ping."
    },
    {
      q: "Quelle légende est une médecin ?",
      correct: "Lifeline",
      wrong: ["Pathfinder", "Caustic", "Gibraltar"],
      fun: "Lifeline soigne tes alliés pendant que tu te fais tirer dessus. Elle a le rôle, tu as le reste."
    },
    {
      q: "Quelle légende est un robot équipé d'un grappin ?",
      correct: "Pathfinder",
      wrong: ["Wraith", "Octane", "Fuse"],
      fun: "Pathfinder a un meilleur sens de l'orientation que toi, et ça se voit."
    },
    {
      q: "Quelle légende déploie un dôme protecteur ?",
      correct: "Gibraltar",
      wrong: ["Mirage", "Bloodhound", "Wattson"],
      fun: "Le dôme protège tout le monde, sauf celui qui cherche la porte."
    },
    {
      q: "Quelle légende utilise des pièges à gaz ?",
      correct: "Caustic",
      wrong: ["Wattson", "Lifeline", "Octane"],
      fun: "Caustic met du gaz partout. Ton équipe finit par tousser en pleine partie."
    },
    {
      q: "Quelle légende utilise des pièges électriques ?",
      correct: "Wattson",
      wrong: ["Caustic", "Mirage", "Pathfinder"],
      fun: "Wattson tient les intrus à distance, et ta motivation aussi, après une défaite."
    },
    {
      q: "Quelle légende utilise une seringue de stim pour accélérer ?",
      correct: "Octane",
      wrong: ["Fuse", "Bloodhound", "Wraith"],
      fun: "Octane : le stim, la meilleure façon d'aller plus vite que ton bon sens."
    },
    {
      q: "Quelle est la carte d'origine d'Apex Legends ?",
      correct: "King's Canyon",
      wrong: ["World's Edge", "Olympus", "Storm Point"],
      fun: "King's Canyon : la première carte, un peu comme tes stats de 2019."
    },
    {
      q: "Quel jeu précédent a été créé par Respawn ?",
      correct: "Titanfall",
      wrong: ["Battlefield", "Halo", "Destiny"],
      fun: "Sans les Titans, il ne reste que ta souris et tes excuses."
    },
    {
      q: "Quel est le rang le plus élevé dans Apex ?",
      correct: "Apex Predator",
      wrong: ["Maître", "Diamant", "Champion"],
      fun: "Apex Predator : le rang où tu te dis que ce n'est pas toi qui lagues."
    },
    {
      q: "Quelle légende utilise des leurres (décoys) ?",
      correct: "Mirage",
      wrong: ["Bangalore", "Caustic", "Pathfinder"],
      fun: "Mirage crée des doubles pour tromper l'ennemi, et ton équipe pour te fuir."
    },
    {
      q: "Quelle légende traque ses ennemis grâce à ses sens hors-normes ?",
      correct: "Bloodhound",
      wrong: ["Crypto", "Wraith", "Lifeline"],
      fun: "Bloodhound renifle les traces mieux que ton père qui cherche ses clés."
    },
    {
      q: "Quelle légende est une experte en explosifs ?",
      correct: "Fuse",
      wrong: ["Gibraltar", "Caustic", "Lifeline"],
      fun: "Fuse a des explosifs partout, comme tes excuses après un 0/12."
    },
    {
      q: "Quel est le modèle économique d'Apex Legends ?",
      correct: "Free-to-play",
      wrong: ["Abonnement mensuel", "Achat unique", "Payant à la sortie"],
      fun: "Gratuit, mais ton portefeuille a son avis sur les skins."
    },
    {
      q: "Combien de joueurs au total dans une partie classique ?",
      correct: "60",
      wrong: ["40", "50", "80"],
      fun: "Soixante joueurs, et toujours un qui court dans le mauvais sens."
    },
    {
      q: "Quel éditeur possède Respawn Entertainment ?",
      correct: "Electronic Arts",
      wrong: ["Ubisoft", "Activision", "Take-Two"],
      fun: "EA sort un jeu tous les trois ans, et te demande de payer le reste."
    },
    {
      q: "Quelle légende ouvre des portails pour se déplacer ?",
      correct: "Wraith",
      wrong: ["Mirage", "Crypto", "Caustic"],
      fun: "Wraith sort de son portail avec la classe. Ton équipe, après s'être fait tuer, beaucoup moins."
    },
    {
      q: "Combien de joueurs compte un duo ?",
      correct: "2",
      wrong: ["1", "3", "4"],
      fun: "Duo : le seul mode où tu peux blâmer une seule personne plutôt que toute l'équipe."
    }
  ]
};

/* Commentaire final selon le nombre de bonnes réponses (sur 20) */
const CULTURE_COMMENTS = [
  { min: 20, text: "Parfait ! Tu n'as pas besoin de la wiki, c'est la wiki qui a besoin de toi." },
  { min: 17, text: "Challenger de la culture gaming. Tu lis les patchnotes, toi, et ça se voit." },
  { min: 13, text: "Diamant : tu tiens la route, mais un peu de Riot-ing ne ferait pas de mal." },
  { min: 9,  text: "Or : tu connais les bases, il reste quelques erreurs de débutant." },
  { min: 5,  text: "Fer 4 : un peu de lecture, c'est pas la mort. Relance la partie." },
  { min: 0,  text: "Bot niveau débutant : désinstalle, réinstalle, recommence." }
];

/* =========================================================
   EASTER EGGS
   Déclenchés en cliquant plusieurs fois sur certains éléments.
   trigger : sélecteur CSS de l'élément, count : nombre de clics
   (espacés de moins de 2 secondes). aim-zero se déclenche
   quand on finit l'aim trainer avec 0 cible touchée.
   ========================================================= */
const EASTER_EGGS = {
  logo: {
    trigger: ".logo", count: 5,
    icon: "bot",
    title: "Bip boup",
    text: "Tu cliques sur le logo 5 fois. Un bot ne ferait pas ça. Tu es humain, félicitations, le test est déjà raté."
  },
  footer: {
    trigger: ".footer", count: 3,
    icon: "bird",
    title: "Le canard de l'équipe",
    text: "Jamais appelé, toujours présent, zéro utilité. Comme ton coéquipier qui pinge le Baron à 4 minutes de la fin."
  },
  culture: {
    trigger: ".nav-link[data-go='culture']", count: 4,
    icon: "brain",
    title: "La réponse n'apparaît pas toute seule",
    text: "Tu cliques sur Culture comme si la réponse allait tomber du ciel. Ce n'est pas la wiki, mais tu peux toujours essayer."
  },
  hero: {
    trigger: ".hero-title", count: 5,
    icon: "bird",
    title: "Tu as cliqué sur le titre 5 fois",
    text: "Il ne va rien faire. On admire quand même ton endurance, comme celle d'un manchot qui attend son bus."
  },
  aimZero: {
    icon: "ghost",
    title: "0 cible touchée",
    text: "Tu as visé le fond d'écran pendant 30 secondes. Impressionnant, mais dans le mauvais sens."
  }
};

/* =========================================================
   FONDS PAR ACTIVITÉ
   Chaque écran affiche en fond des pictogrammes liés à l'activité.
   Clé = nom de l'écran ; "quiz-<jeu>" pour chaque quiz de culture.
   ========================================================= */
const ACTIVITY_BACKGROUNDS = {
  accueil:        { icons: ["gamepad", "gamepad", "bot"], tint: "#94a3b8" },
  personnalite:   { icons: ["gamepad", "star", "star"], tint: "#a78bfa" },
  reflexes:       { icons: ["target", "zap", "timer"], tint: "#60a5fa" },
  reaction:       { icons: ["timer", "timer", "zap"], tint: "#38bdf8" },
  aim:            { icons: ["target", "zap", "crosshair"], tint: "#f87171" },
  culture:        { icons: ["brain", "help", "book"], tint: "#4ade80" },
  "quiz-lol":     { icons: ["swords", "swords", "shield"], tint: "#facc15" },
  "quiz-valorant":{ icons: ["crosshair", "crosshair", "target"], tint: "#fb7185" },
  "quiz-fortnite":{ icons: ["hammer", "hammer", "star"], tint: "#c084fc" },
  "quiz-apex":    { icons: ["shield", "target", "skull"], tint: "#fb923c" },
  "quiz-mix":     { icons: ["shuffle", "brain", "help"], tint: "#2dd4bf" },
  compte:         { icons: ["lock", "user", "mail"], tint: "#cbd5e1" },
  bienvenue:      { icons: ["hand", "help", "gift"], tint: "#fbbf24" },
  profil:         { icons: ["trophy", "medal", "chart"], tint: "#fcd34d" }
};
