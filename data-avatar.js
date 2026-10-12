/* =========================================================
   AVATAR PERSONNALISABLE — PIXEL ART ARCADE
   Le personnage est dessiné sur une grille de 32 x 32 pixels, par couches
   (de l'arrière vers l'avant) : fond, cape, cheveux (arrière), haut, cou et tête,
   yeux, bouche, cheveux (devant), visage, couvre-chef, cape (devant), cadre.

   Chaque objet : id, name, svg (devant), back (derrière, facultatif)
   et trophy = id du trophée (data-trophies.js) qui le débloque.
   Sans trophy, l'objet est libre.

   Les dessins sont écrits avec sprite() : une lettre = une couleur (voir AV_PAL),
   « . » = vide. Les contours noirs sont ajoutés automatiquement.
   S/s = peau et son ombre, H/h/J = cheveux, lumière et contour, T/t = haut et ombre.
   ========================================================= */

const AVATAR_SKINS = ["#ffdbb4", "#f1c27d", "#e0ac69", "#c68642", "#8d5524", "#5c3a21"];
const AVATAR_HAIR_COLORS = ["#1a1a1a", "#3f2a1d", "#8b5a2b", "#d4a017", "#c0392b", "#9ca3af", "#7c3aed", "#2563eb", "#ec4899"];
const AVATAR_TOP_COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#a78bfa", "#f59e0b", "#ec4899", "#e5e7eb", "#1f2937"];

const AVATAR_DEFAULT = {
  skin: "#f1c27d", hair: "court", hairColor: "#3f2a1d", eyes: "e0", mouth: "m0",
  top: "tshirt", topColor: "#3b82f6", head: "", face: "", cape: "", bg: "bg-dark", frame: ""
};

/* Onglets de l'éditeur. color = champ de config qui reçoit la couleur, colors = choix possibles */
const AVATAR_SLOTS = [
  { key: "skin", icon: "user", label: "Peau", paletteOnly: true, color: "skin", colors: AVATAR_SKINS },
  { key: "hair", icon: "star", label: "Cheveux", color: "hairColor", colors: AVATAR_HAIR_COLORS },
  { key: "eyes", icon: "target", label: "Yeux" },
  { key: "mouth", icon: "megaphone", label: "Bouche" },
  { key: "top", icon: "shield", label: "Haut", color: "topColor", colors: AVATAR_TOP_COLORS },
  { key: "head", icon: "crown", label: "Couvre-chef" },
  { key: "face", icon: "crosshair", label: "Visage" },
  { key: "cape", icon: "flag", label: "Cape" },
  { key: "bg", icon: "sun", label: "Fond" },
  { key: "frame", icon: "medal", label: "Cadre" }
];

/* ---------- Moteur de pixel art ---------- */
const AV_W = 32;
const AV_H = 34; // 2 lignes sous le cadre visible, pour que le bas du corps ne soit pas contouré

/* Palette : une lettre = une couleur. $S, $s… sont remplacés au dessin (couleurs choisies par le joueur) */
const AV_PAL = {
  S: "$S", s: "$s", H: "$H", h: "$h", J: "$J", T: "$T", t: "$t",
  k: "#171726", w: "#ffffff", m: "#7f1d1d", n: "#111827", d: "#334155",
  r: "#ef4444", R: "#b91c1c", y: "#facc15", Y: "#ca8a04", o: "#f97316", O: "#c2410c",
  b: "#3b82f6", B: "#1d4ed8", g: "#22c55e", G: "#15803d", p: "#8b5cf6", P: "#5b21b6",
  c: "#cbd5e1", C: "#64748b", e: "#94a3b8", x: "#f9a8d4", u: "#a3764a", U: "#6b4423"
};

/* Dessine un sprite. draw(g) reçoit un pinceau : g.p(x,y,c) pixel, g.r(x,y,w,h,c) rectangle,
   g.rows(x,y,[...]) lignes de texte. Option outline : lettre du contour (null = aucun). */
function sprite(draw, { outline = "k", late = null, pal = null } = {}) {
  const cells = Array.from({ length: AV_H }, () => Array(AV_W).fill("."));
  const put = (x, y, ch) => { if (x >= 0 && x < AV_W && y >= 0 && y < AV_H) cells[y][x] = ch; };
  const g = {
    p: (x, y, ch) => put(x, y, ch),
    r: (x, y, w, h, ch) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(x + i, y + j, ch); },
    rows: (x, y, arr) => arr.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== ".") put(x + i, y + j, ch); }))
  };
  draw(g);

  if (outline) {
    const filled = (x, y) => (y >= AV_H ? true : x >= 0 && x < AV_W && y >= 0 && cells[y][x] !== ".");
    const edges = [];
    for (let y = 0; y < AV_H; y++) {
      for (let x = 0; x < AV_W; x++) {
        if (cells[y][x] !== "." && (!filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || !filled(x, y + 1))) edges.push([x, y]);
      }
    }
    edges.forEach(([x, y]) => { cells[y][x] = outline; });
  }
  if (late) late(g);

  // Une ligne = des rectangles de couleur unie (on regroupe les pixels voisins)
  let out = "";
  for (let y = 0; y < AV_H; y++) {
    let x = 0;
    while (x < AV_W) {
      const ch = cells[y][x];
      if (ch === ".") { x++; continue; }
      let n = 1;
      while (x + n < AV_W && cells[y][x + n] === ch) n++;
      const color = (pal && pal[ch]) || AV_PAL[ch];
      if (color) out += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${color}"/>`;
      x += n;
    }
  }
  return out;
}

/* Formes réutilisées */
const torsoShape = (g, ch) => {
  g.r(11, 22, 10, 1, ch); g.r(8, 23, 16, 1, ch); g.r(6, 24, 20, 1, ch); g.r(5, 25, 22, 9, ch);
};
const capeShape = (g, ch) => {
  g.r(9, 21, 14, 1, ch); g.r(7, 22, 18, 1, ch); g.r(5, 23, 22, 1, ch); g.r(2, 24, 28, 10, ch);
};
const skinV = (g) => { g.r(14, 22, 4, 1, "S"); g.r(15, 23, 2, 1, "S"); };
const hairFront = (g) => {
  g.rows(8, 5, [
    "...HHHHHHHHHH...",
    "..HHHHHHHHHHHH..",
    ".HHHHHHHHHHHHHH.",
    "HHHHHHHHHHHHHHHH",
    "HHHHH......HHHHH",
    "HHH..........HHH"
  ]);
  g.p(12, 6, "h"); g.p(13, 6, "h"); g.p(11, 7, "h");
};
const bgSolid = (main, floor, dot) => sprite((g) => {
  g.r(0, 0, 32, 32, "a"); g.r(0, 25, 32, 7, "b");
  [[3, 5], [27, 8], [6, 17], [25, 20], [14, 3]].forEach(([x, y]) => g.p(x, y, "c"));
}, { outline: null, pal: { a: main, b: floor, c: dot } });
const frameRing = (outer, inner) => sprite((g) => {
  [0, 1].forEach((t) => {
    const ch = t === 0 ? "a" : "b";
    g.r(2, t, 28, 1, ch); g.r(2, 31 - t, 28, 1, ch); g.r(t, 2, 1, 28, ch); g.r(31 - t, 2, 1, 28, ch);
  });
  [[1, 1], [30, 1], [1, 30], [30, 30]].forEach(([x, y]) => g.p(x, y, "a"));
  [[2, 2], [29, 2], [2, 29], [29, 29]].forEach(([x, y]) => g.p(x, y, "b"));
}, { outline: null, pal: { a: outer, b: inner } });

const NONE = { id: "", name: "Aucun", svg: "" };

const AVATAR_PARTS = {
  hair: [
    { id: "court", name: "Courts", svg: sprite(hairFront, { outline: "J" }) },
    { id: "long", name: "Longs",
      back: sprite((g) => { g.r(7, 8, 18, 17, "H"); g.r(6, 12, 20, 12, "H"); }, { outline: "J" }),
      svg: sprite(hairFront, { outline: "J" }) },
    { id: "crete", name: "Crête",
      svg: sprite((g) => { g.r(15, 1, 2, 1, "H"); g.r(14, 2, 4, 7, "H"); g.r(13, 8, 6, 1, "H"); g.p(15, 3, "h"); }, { outline: "J" }) },
    { id: "queue", name: "Queue de cheval",
      back: sprite((g) => g.rows(22, 7, [".HHHHH.", "HHHHHHH", "HHHHHHH", ".HHHHHH", "..HHHHH", "..HHHH.", "..HHH..", "..HH..."]), { outline: "J" }),
      svg: sprite(hairFront, { outline: "J" }) },
    { id: "afro", name: "Afro",
      back: sprite((g) => g.rows(5, 2, [
        "......HHHHHHHHHH......", "....HHHHHHHHHHHHHH....", "...HHHHHHHHHHHHHHHH...",
        "HHHHHHHHHHHHHHHHHHHHHH", "HHHHHHHHHHHHHHHHHHHHHH", "HHHHHHHHHHHHHHHHHHHHHH", "HHHHHHHHHHHHHHHHHHHHHH",
        "HHHHHHHHHHHHHHHHHHHHHH", "HHHHHHHHHHHHHHHHHHHHHH", "HHHHHHHHHHHHHHHHHHHHHH", "HHHHHHHHHHHHHHHHHHHHHH",
        ".HHHHHHHHHHHHHHHHHHHH.", "..HHHHHHHHHHHHHHHHHH.."]), { outline: "J" }),
      svg: sprite(hairFront, { outline: "J" }) },
    { id: "chauve", name: "Chauve", svg: "" }
  ],

  eyes: [
    { id: "e0", name: "Normaux", svg: sprite((g) => { g.r(12, 11, 1, 2, "k"); g.r(19, 11, 1, 2, "k"); }, { outline: null }) },
    { id: "e1", name: "Contents", svg: sprite((g) => {
      g.p(11, 12, "k"); g.p(12, 11, "k"); g.p(13, 12, "k"); g.p(18, 12, "k"); g.p(19, 11, "k"); g.p(20, 12, "k");
    }, { outline: null }) },
    { id: "e2", name: "Déterminés", svg: sprite((g) => {
      g.r(12, 11, 1, 2, "k"); g.r(19, 11, 1, 2, "k");
      g.p(11, 9, "k"); g.p(12, 9, "k"); g.p(13, 10, "k"); g.p(20, 9, "k"); g.p(19, 9, "k"); g.p(18, 10, "k");
    }, { outline: null }) },
    { id: "e3", name: "Étonnés", svg: sprite((g) => {
      g.r(11, 10, 3, 3, "w"); g.r(18, 10, 3, 3, "w"); g.p(12, 11, "k"); g.p(19, 11, "k");
    }, { outline: null }) }
  ],

  mouth: [
    { id: "m0", name: "Sourire", svg: sprite((g) => { g.p(13, 15, "m"); g.r(14, 16, 4, 1, "m"); g.p(18, 15, "m"); }, { outline: null }) },
    { id: "m1", name: "Grand sourire", svg: sprite((g) => {
      g.r(13, 15, 6, 1, "m"); g.p(13, 16, "m"); g.r(14, 16, 4, 1, "w"); g.p(18, 16, "m"); g.r(14, 17, 4, 1, "m");
    }, { outline: null }) },
    { id: "m2", name: "Neutre", svg: sprite((g) => g.r(14, 16, 4, 1, "m"), { outline: null }) },
    { id: "m3", name: "Surpris", svg: sprite((g) => { g.r(15, 15, 2, 3, "m"); }, { outline: null }) }
  ],

  top: [
    { id: "tshirt", name: "T-shirt",
      svg: sprite((g) => { torsoShape(g, "T"); g.r(23, 25, 3, 9, "t"); g.r(5, 31, 22, 3, "t"); }, { late: skinV }) },
    { id: "hoodie", name: "Sweat à capuche",
      svg: sprite((g) => {
        torsoShape(g, "T"); g.r(23, 25, 3, 9, "t");
      }, { late: (g) => {
        g.r(12, 22, 8, 1, "t"); g.r(13, 23, 6, 1, "t"); g.r(14, 22, 4, 1, "S"); g.r(15, 23, 2, 1, "S");
        g.r(14, 25, 1, 4, "w"); g.r(17, 25, 1, 4, "w"); g.p(14, 29, "c"); g.p(17, 29, "c");
        g.r(11, 30, 10, 2, "t");
      } }) },
    { id: "veste", name: "Veste éclair", trophy: "react-230",
      svg: sprite((g) => torsoShape(g, "d"), { late: (g) => {
        skinV(g); g.r(15, 24, 2, 10, "C");
        g.rows(19, 25, ["..yy", ".yy.", "yyyy", ".yy.", "yy.."]);
      } }) },
    { id: "gilet", name: "Gilet tactique", trophy: "aim-combo10",
      svg: sprite((g) => torsoShape(g, "C"), { late: (g) => {
        skinV(g); g.r(9, 24, 2, 10, "d"); g.r(21, 24, 2, 10, "d");
        g.r(11, 28, 4, 3, "d"); g.r(17, 28, 4, 3, "d"); g.r(11, 28, 4, 1, "e"); g.r(17, 28, 4, 1, "e");
      } }) },
    { id: "armure", name: "Armure de chevalier", trophy: "quiz-competitif",
      svg: sprite((g) => torsoShape(g, "e"), { late: (g) => {
        g.r(5, 23, 6, 5, "c"); g.r(21, 23, 6, 5, "c"); g.r(11, 25, 10, 9, "c"); g.r(15, 25, 2, 9, "C");
        g.r(5, 27, 6, 1, "C"); g.r(21, 27, 6, 1, "C"); g.p(6, 24, "w"); g.p(25, 24, "w");
        g.r(15, 22, 2, 1, "S");
      } }) },
    { id: "trench", name: "Trench d'aventurier", trophy: "quiz-histoire",
      svg: sprite((g) => torsoShape(g, "u"), { late: (g) => {
        skinV(g); g.rows(11, 23, ["UU", ".UU", "..UU"]); g.rows(19, 23, ["UU", "UU.", "UU.."]);
        g.r(5, 29, 22, 2, "U"); g.r(15, 29, 2, 2, "y"); g.r(15, 25, 2, 1, "Y"); g.r(15, 26, 2, 1, "U");
      } }) },
    { id: "costume", name: "Costume cravate", trophy: "quiz-streak10",
      svg: sprite((g) => torsoShape(g, "n"), { late: (g) => {
        g.r(14, 22, 4, 2, "w"); g.r(13, 24, 6, 1, "w"); g.r(14, 25, 4, 1, "w");
        g.r(15, 23, 2, 6, "r"); g.p(15, 29, "R"); g.p(16, 29, "R");
        g.rows(11, 23, ["kk", ".k", "..k"]); g.rows(19, 23, ["kk", "k.", "k.."]);
      } }) }
  ],

  head: [
    NONE,
    { id: "casque", name: "Casque audio", trophy: "react-first",
      svg: sprite((g) => {
        g.r(10, 4, 12, 1, "d"); g.r(9, 5, 2, 1, "d"); g.r(21, 5, 2, 1, "d");
        g.r(8, 6, 1, 5, "d"); g.r(23, 6, 1, 5, "d");
        g.r(6, 10, 4, 7, "d"); g.r(22, 10, 4, 7, "d"); g.r(7, 11, 1, 5, "C"); g.r(24, 11, 1, 5, "C");
        g.p(8, 17, "d"); g.p(9, 18, "d"); g.p(10, 19, "d"); g.p(11, 19, "d"); g.r(12, 19, 2, 1, "r");
      }, { outline: "k" }) },
    { id: "bandeau", name: "Bandeau rapide", trophy: "react-300",
      svg: sprite((g) => {
        g.r(9, 8, 14, 2, "r"); g.r(9, 9, 14, 1, "R");
        g.rows(23, 8, ["rrr", ".rrr", "..rr"]); g.rows(23, 10, ["rr", "R"]);
      }) },
    { id: "casquette", name: "Casquette", trophy: "aim-first",
      svg: sprite((g) => {
        g.rows(9, 3, ["...bbbbbbbb...", "..bbbbbbbbbb..", ".bbbbbbbbbbbb.", ".bbbbbbbbbbbb.", ".bbbbbbbbbbbb."]);
        g.r(7, 8, 18, 1, "B"); g.r(9, 9, 14, 1, "B"); g.p(15, 5, "w"); g.p(16, 5, "w");
      }) },
    { id: "bonnet", name: "Bonnet", trophy: "quiz-first",
      svg: sprite((g) => {
        g.rows(9, 4, ["...oooooooo...", "..oooooooooo..", ".oooooooooooo.", ".oooooooooooo."]);
        g.r(9, 8, 14, 2, "O"); [10, 12, 14, 16, 18, 20].forEach((x) => g.p(x, 8, "o"));
        g.r(14, 2, 4, 2, "w"); g.r(15, 1, 2, 1, "w");
      }) },
    { id: "hautdeforme", name: "Haut-de-forme", trophy: "quiz-13",
      svg: sprite((g) => {
        g.r(11, 0, 10, 8, "d"); g.r(11, 6, 10, 2, "r"); g.r(8, 8, 16, 2, "d"); g.r(12, 1, 1, 4, "C");
      }) },
    { id: "sorcier", name: "Chapeau de sorcier", trophy: "quiz-17",
      svg: sprite((g) => {
        g.rows(11, 0, [
          "....pp....", "....pp....", "...pppp...", "...pppp...", "..pppppp..", "..pppppp..", ".pppppppp.", ".pppppppp."]);
        g.r(11, 8, 10, 1, "y"); g.r(7, 9, 18, 1, "P"); g.p(15, 4, "y"); g.p(16, 5, "y");
      }) },
    { id: "couronne", name: "Couronne dorée", trophy: "quiz-perfect",
      svg: sprite((g) => {
        g.rows(10, 3, ["y....yy....y", "y.y..yy..y.y", "yyy.yyyy.yyy", "yyyyyyyyyyyy", "yyyyyyyyyyyy", "YYYYYYYYYYYY"]);
        g.p(12, 7, "r"); g.p(15, 7, "b"); g.p(16, 7, "b"); g.p(19, 7, "g");
      }) },
    { id: "aureole", name: "Auréole", trophy: "react-200",
      svg: sprite((g) => {
        g.rows(10, 0, ["..yyyyyyyy..", ".y........y.", "..yyyyyyyy.."]);
      }, { outline: null }) },
    { id: "heaume", name: "Heaume", trophy: "quiz-souls",
      svg: sprite((g) => {
        g.rows(9, 3, [
          "...eeeeeeee...", "..eeeeeeeeee..", ".eeeeeeeeeeee.", "eeeeeeeeeeeeee", "eeeeeeeeeeeeee", "eeeeeeeeeeeeee"]);
        g.r(9, 9, 2, 5, "e"); g.r(21, 9, 2, 5, "e"); g.r(15, 9, 2, 4, "c");
        g.r(11, 9, 4, 1, "n"); g.r(17, 9, 4, 1, "n"); g.r(13, 4, 3, 1, "c");
        g.r(17, 0, 3, 1, "r"); g.r(15, 1, 6, 2, "r"); g.p(21, 2, "R"); g.p(21, 3, "R");
      }) },
    { id: "chat", name: "Oreilles de chat", trophy: "games-50",
      svg: sprite((g) => {
        const ear = ["d", "dd", "ddd", "dddd", "ddddd"];
        ear.forEach((row, j) => [...row].forEach((_, i) => { g.p(10 + i, 2 + j, "d"); g.p(21 - i, 2 + j, "d"); }));
        g.p(11, 4, "x"); g.p(11, 5, "x"); g.p(12, 5, "x"); g.p(20, 4, "x"); g.p(20, 5, "x"); g.p(19, 5, "x");
      }) },
    { id: "viking", name: "Casque viking", trophy: "perso-all",
      svg: sprite((g) => {
        g.rows(9, 3, ["...cccccccc...", "..cccccccccc..", ".cccccccccccc.", "cccccccccccccc", "cccccccccccccc"]);
        g.r(9, 8, 14, 2, "C");
        [[8, 8], [7, 8], [7, 7], [6, 7], [6, 6], [5, 6], [5, 5], [5, 4], [6, 3], [6, 2]].forEach(([x, y]) => { g.p(x, y, "w"); g.p(31 - x, y, "w"); });
      }) }
  ],

  face: [
    NONE,
    { id: "lunettes", name: "Lunettes de gamer", trophy: "react-260",
      svg: sprite((g) => {
        g.rows(11, 10, ["dddd", "d..d", "d..d", "dddd"]); g.rows(17, 10, ["dddd", "d..d", "d..d", "dddd"]);
        g.r(15, 11, 2, 1, "d"); g.p(10, 10, "d"); g.p(21, 10, "d");
      }, { outline: null }) },
    { id: "soleil", name: "Lunettes de soleil", trophy: "react-calm",
      svg: sprite((g) => {
        g.r(10, 10, 5, 3, "n"); g.r(17, 10, 5, 3, "n"); g.r(15, 10, 2, 1, "n"); g.p(8, 10, "n"); g.p(9, 10, "n"); g.p(22, 10, "n"); g.p(23, 10, "n");
        g.p(11, 10, "C"); g.p(18, 10, "C");
      }, { outline: null }) },
    { id: "cacheoeil", name: "Cache-œil", trophy: "aim-105",
      svg: sprite((g) => {
        g.r(18, 10, 4, 4, "k");
        [[17, 9], [16, 9], [15, 8], [14, 8], [13, 8], [12, 7], [11, 7], [10, 7], [22, 12], [23, 13]].forEach(([x, y]) => g.p(x, y, "k"));
      }, { outline: null }) },
    { id: "viseur", name: "Viseur de sniper", trophy: "aim-sniper",
      svg: sprite((g) => {
        g.rows(16, 8, ["..rrr..", ".r.r.r.", "r..r..r", "rrr.rrr", "r..r..r", ".r.r.r.", "..rrr.."]);
      }, { outline: null }) },
    { id: "bandana", name: "Bandana", trophy: "aim-75",
      svg: sprite((g) => {
        g.r(10, 14, 12, 2, "b"); g.r(11, 16, 10, 1, "b"); g.r(12, 17, 8, 1, "b"); g.r(13, 18, 6, 1, "B"); g.r(14, 19, 4, 1, "B");
        g.p(8, 14, "b"); g.p(9, 14, "b"); g.p(23, 14, "b"); g.p(22, 14, "b"); g.p(8, 15, "B"); g.p(23, 15, "B");
        g.p(13, 16, "c"); g.p(18, 16, "c"); g.p(15, 18, "c");
      }) },
    { id: "moustache", name: "Moustache", trophy: "react-prefire",
      svg: sprite((g) => {
        g.r(12, 14, 8, 1, "U"); g.r(11, 15, 4, 1, "U"); g.r(17, 15, 4, 1, "U"); g.p(11, 16, "U"); g.p(20, 16, "U");
      }, { outline: null }) },
    { id: "monocle", name: "Monocle", trophy: "quiz-fast",
      svg: sprite((g) => {
        g.rows(17, 9, [".yyy.", "y...y", "y...y", "y...y", ".yyy."]);
        g.p(21, 14, "Y"); g.p(22, 15, "Y"); g.p(22, 16, "Y"); g.p(22, 17, "Y"); g.p(22, 18, "Y");
      }, { outline: null }) }
  ],

  cape: [
    NONE,
    { id: "fantome", name: "Drap de fantôme", trophy: "aim-zero",
      back: sprite((g) => {
        g.r(10, 3, 12, 1, "w"); g.r(8, 4, 16, 1, "w"); g.r(6, 5, 20, 1, "w"); g.r(5, 6, 22, 13, "w"); g.r(3, 19, 26, 15, "w");
        g.r(3, 30, 4, 4, "c"); g.r(25, 30, 4, 4, "c");
      }), svg: "" },
    { id: "rouge", name: "Cape rouge", trophy: "aim-combo20",
      back: sprite((g) => { capeShape(g, "R"); g.r(2, 28, 28, 6, "r"); g.r(2, 24, 3, 4, "r"); }),
      svg: sprite((g) => { g.r(11, 23, 2, 2, "y"); g.r(19, 23, 2, 2, "y"); g.r(13, 24, 6, 1, "Y"); }, { outline: null }) },
    { id: "voyageur", name: "Cape de voyageur", trophy: "quiz-allgames",
      back: sprite((g) => { capeShape(g, "G"); g.r(2, 28, 28, 6, "g"); }),
      svg: sprite((g) => { g.r(12, 22, 8, 1, "y"); g.p(15, 23, "Y"); g.p(16, 23, "Y"); }, { outline: null }) }
  ],

  bg: [
    { id: "bg-dark", name: "Nuit", svg: bgSolid("#1e222b", "#14171e", "#3a4152") },
    { id: "bg-blue", name: "Bleu", svg: bgSolid("#1e3a8a", "#172554", "#60a5fa") },
    { id: "bg-purple", name: "Violet", svg: bgSolid("#4c1d95", "#2e1065", "#a78bfa") },
    { id: "bg-green", name: "Vert", svg: bgSolid("#14532d", "#052e16", "#4ade80") },
    { id: "bg-red", name: "Rouge", svg: bgSolid("#7f1d1d", "#450a0a", "#f87171") },
    { id: "bg-eclair", name: "Éclair", trophy: "react-click",
      svg: sprite((g) => {
        g.r(0, 0, 32, 32, "a");
        g.rows(3, 4, ["..yyy", ".yyy.", "yyyyy", "..yy.", ".yy..", "yy..."]);
        g.rows(24, 12, ["..yyy", ".yyy.", "yyyyy", "..yy.", ".yy..", "yy..."]);
        g.rows(5, 20, ["..yyy", ".yyy.", "yyyyy", "..yy.", ".yy..", "yy..."]);
      }, { outline: null, pal: { a: "#0f172a", y: "#facc15" } }) },
    { id: "bg-sunset", name: "Coucher de soleil", trophy: "quiz-5games",
      svg: sprite((g) => {
        [["a", 0], ["b", 6], ["c", 12], ["d", 18], ["e", 24]].forEach(([ch, y]) => g.r(0, y, 32, ch === "e" ? 8 : 6, ch));
        g.rows(23, 5, ["..yyyy..", ".yyyyyy.", "yyyyyyyy", "yyyyyyyy", ".yyyyyy.", "..yyyy.."]);
      }, { outline: null, pal: { a: "#4c1d95", b: "#7c3aed", c: "#db2777", d: "#f97316", e: "#facc15", y: "#fde047" } }) },
    { id: "bg-dots", name: "Points d'interrogation", trophy: "perso-first",
      svg: sprite((g) => {
        g.r(0, 0, 32, 32, "a");
        const q = [".qqq.", "q...q", "....q", "...q.", "..q..", ".....", "..q.."];
        [[2, 2], [24, 3], [26, 17], [2, 19], [13, 24], [12, 1]].forEach(([x, y]) => g.rows(x, y, q));
      }, { outline: null, pal: { a: "#312e81", q: "#4f46e5" } }) },
    { id: "bg-galaxie", name: "Galaxie", trophy: "games-100",
      svg: sprite((g) => {
        g.r(0, 0, 32, 32, "a"); g.r(2, 3, 12, 8, "b"); g.r(4, 2, 8, 10, "b"); g.r(19, 15, 11, 9, "b"); g.r(21, 14, 7, 11, "b");
        g.r(5, 5, 6, 4, "c"); g.r(22, 17, 5, 5, "c");
        [[12, 14], [28, 6], [30, 28], [3, 25], [9, 29], [24, 30], [17, 3], [29, 12], [1, 14], [21, 9], [7, 21]].forEach(([x, y]) => g.p(x, y, "w"));
        g.p(14, 6, "y"); g.p(26, 26, "y"); g.p(4, 14, "z"); g.p(31, 20, "z");
      }, { outline: null, pal: { a: "#0b1026", b: "#1e1b4b", c: "#4c1d95", w: "#ffffff", y: "#fde047", z: "#67e8f9" } }) }
  ],

  frame: [
    NONE,
    { id: "bronze", name: "Cadre bronze", trophy: "games-10", svg: frameRing("#d97706", "#f59e0b") },
    { id: "argent", name: "Cadre argent", trophy: "all-modes", svg: frameRing("#94a3b8", "#e2e8f0") },
    { id: "or", name: "Cadre or", trophy: "aim-120", svg: frameRing("#ca8a04", "#fde047") }
  ]
};

/* Objet débloqué par chaque trophée : AVATAR_UNLOCKS[idTrophée] = { slot, item } */
const AVATAR_UNLOCKS = {};
Object.entries(AVATAR_PARTS).forEach(([slot, items]) => {
  items.forEach((item) => { if (item.trophy) AVATAR_UNLOCKS[item.trophy] = { slot, item }; });
});

/* Cou et tête (la peau suit la couleur choisie) */
const AVATAR_NECK_HEAD =
  sprite((g) => { g.r(14, 20, 4, 2, "S"); g.r(14, 20, 4, 1, "s"); }, { outline: null }) +
  sprite((g) => {
    g.rows(9, 7, [
      "..SSSSSSSSSS..", ".SSSSSSSSSSSS.", "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS", "SSSSSSSSSSSSSS", ".SSSSSSSSSSSS.", "..SSSSSSSSSS.."
    ]);
  }, { late: (g) => { g.r(21, 9, 1, 9, "s"); g.r(12, 18, 8, 1, "s"); g.p(10, 14, "x"); g.p(21, 14, "x"); } });

const avatarPart = (slot, id) => AVATAR_PARTS[slot].find((p) => p.id === id);

/* Nettoie une config (venant du stockage ou de la base) : couleurs valides, objets connus */
function avatarConfig(raw) {
  const c = { ...AVATAR_DEFAULT, ...(raw && typeof raw === "object" ? raw : {}) };
  ["skin", "hairColor", "topColor"].forEach((k) => {
    if (!/^#[0-9a-f]{6}$/i.test(c[k])) c[k] = AVATAR_DEFAULT[k];
  });
  Object.keys(AVATAR_PARTS).forEach((slot) => {
    if (!avatarPart(slot, c[slot])) c[slot] = AVATAR_DEFAULT[slot];
  });
  return c;
}

/* Éclaircit (amount > 0) ou assombrit (amount < 0) une couleur « #rrggbb » */
function shadeHex(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (v) => Math.max(0, Math.min(255, Math.round(amount < 0 ? v * (1 + amount) : v + (255 - v) * amount)));
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(mix);
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/* Dessin complet de l'avatar, en SVG */
function avatarSVG(raw, cls = "") {
  const c = avatarConfig(raw);
  const part = (slot) => avatarPart(slot, c[slot]);
  const layers = [
    part("bg").svg, part("cape").back, part("hair").back, part("top").svg, AVATAR_NECK_HEAD,
    part("eyes").svg, part("mouth").svg, part("hair").svg, part("face").svg, part("head").svg,
    part("cape").svg, part("frame").svg
  ];
  const colors = {
    S: c.skin, s: shadeHex(c.skin, -0.16),
    H: c.hairColor, h: shadeHex(c.hairColor, 0.28), J: shadeHex(c.hairColor, -0.45),
    T: c.topColor, t: shadeHex(c.topColor, -0.25)
  };
  const body = layers.filter(Boolean).join("").replace(/\$([SsHhJTt])/g, (_, k) => colors[k]);
  return `<svg class="avatar-svg ${cls}" viewBox="0 0 32 32" shape-rendering="crispEdges" role="img" aria-label="Avatar">${body}</svg>`;
}

/* Valeur stockée dans la colonne « avatar » du profil : photo (data:image…) ou « char:{json} » */
const avatarCode = (cfg) => "char:" + JSON.stringify(avatarConfig(cfg));
const isAvatarCode = (value) => typeof value === "string" && value.startsWith("char:");
function avatarFromCode(value) {
  try { return avatarConfig(JSON.parse(value.slice(5))); } catch (e) { return null; }
}
