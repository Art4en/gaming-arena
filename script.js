/* =========================================================
   GAMER ARENA — LOGIQUE
   Données (questions, profils, rangs, jeux) : data.js
   Comptes, profils et classements : Supabase (base en ligne)
   ========================================================= */

/* ---------- Connexion à Supabase ----------
   La clé « publishable » est faite pour être dans le navigateur.
   Ne mets jamais la clé « secret » dans ce fichier. */
const SUPABASE_URL = "https://jvbvnhxebkgylyybfgon.supabase.co";
const SUPABASE_KEY = "sb_publishable_ncVJST7fuCVo5CUzUbxNOw__Vrhko_7";
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ---------- Utilitaires ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/* Mélange de Fisher-Yates (renvoie une copie) */
const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/* Protège l'affichage quand on insère du texte venant d'autres personnes */
const escapeHTML = (str) => String(str ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

/* Stockage local protégé (navigation privée, données bloquées…) */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Sauvegarde impossible :", e);
    }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
};

/* Ce qui reste sur l'appareil (le reste est sur Supabase) */
const STORAGE = {
  best: "gamerArena.best.v1",      // meilleur score de culture, affiché sur le menu
  intro: "gamerArena.intro.v1",    // test de bienvenue déjà fait sur cet appareil
  pending: "gamerArena.pending.v1" // activité recommandée, lancée dès la connexion
};

/* Notification temporaire en bas de l'écran */
let toastTimer = null;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* Affiche un seul panneau parmi une liste d'ids */
function showOnly(panelIds, activeId) {
  panelIds.forEach((id) => { $("#" + id).hidden = id !== activeId; });
}

/* Copie un texte dans le presse-papier (avec solution de secours) */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { /* ignore */ }
    area.remove();
    return ok;
  }
}

/* =========================================================
   COMPTE : inscription, connexion, session (Supabase Auth)
   ========================================================= */

/* Personne connectée : { id, email, pseudo, avatar, createdAt } ou null */
let me = null;

/* Charge le profil (pseudo, photo) de la session en cours */
async function loadMe(session) {
  if (!session) {
    me = null;
    return;
  }
  const { data } = await db
    .from("profiles")
    .select("pseudo, avatar, created_at")
    .eq("id", session.user.id)
    .maybeSingle();

  me = data
    ? { id: session.user.id, email: session.user.email, pseudo: data.pseudo, avatar: data.avatar, createdAt: data.created_at }
    : null;
}

const currentUser = () => me;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Messages d'erreur Supabase traduits */
const AUTH_MESSAGES = {
  "Invalid login credentials": "Mail ou mot de passe incorrect.",
  "User already registered": "Un compte existe déjà avec ce mail. Connecte-toi plutôt.",
  "Password should be at least 6 characters.": "Le mot de passe doit faire au moins 6 caractères.",
  "Email rate limit exceeded": "Trop de tentatives, réessaie dans quelques minutes."
};
const translateError = (msg) => AUTH_MESSAGES[msg] || `Erreur : ${msg}`;

function authError(message) {
  $("#auth-error").textContent = message;
}

async function signup(email, pseudo, password) {
  if (!EMAIL_RE.test(email.trim())) return authError("Ce mail ne ressemble pas à un mail. Vérifie-le.");
  if (pseudo.trim().length < 2) return authError("Ton pseudo doit faire au moins 2 caractères.");
  if (password.length < 6) return authError("Le mot de passe doit faire au moins 6 caractères.");

  const { data, error } = await db.auth.signUp({ email: email.trim(), password });
  if (error) return authError(translateError(error.message));
  if (!data.session) {
    return authError("Compte créé. Il faut le confirmer : dans Supabase, désactive « Confirm email » (Authentication → Sign In / Providers → Email), puis connecte-toi.");
  }

  const { error: profileError } = await db
    .from("profiles")
    .insert({ id: data.user.id, pseudo: pseudo.trim().slice(0, 20) });
  if (profileError) return authError(`Profil impossible à créer : ${profileError.message}`);

  await loadMe(data.session);
  toast(`🎉 Bienvenue ${me.pseudo} !`);
  afterLogin();
}

async function login(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return authError(translateError(error.message));

  await loadMe(data.session);
  if (!me) return authError("Ce compte n'a pas de profil. Vérifie que la base est bien installée.");

  toast(`👋 Re-bonjour ${me.pseudo} !`);
  afterLogin();
}

/* Après inscription ou connexion : activité recommandée par le test, sinon le lobby */
function afterLogin() {
  refreshAccountUI();
  const pending = store.get(STORAGE.pending, null);
  store.remove(STORAGE.pending);
  if (pending) launchActivity(pending);
  else showScreen("accueil");
}

async function logout() {
  await db.auth.signOut();
  me = null;
  refreshAccountUI();
  toast("👋 Déconnecté. À bientôt, joueur.");
  showScreen(gateScreen());
}

/* Met à jour le bouton du haut et le message d'accueil */
function refreshAccountUI() {
  const btn = $("#account-btn");
  btn.textContent = me ? `👤 ${me.pseudo}` : "S'inscrire";
  btn.dataset.go = me ? "profil" : "compte";

  $("#hello").textContent = me
    ? `Salut ${me.pseudo} 👋 Prêt à te faire humilier ?`
    : "Pas encore de compte ? Crée-le en 30 secondes, ton score t'attendra au classement.";
}

function resetAuth() {
  authError("");
  const pending = store.get(STORAGE.pending, null);
  const hint = $("#auth-hint");
  hint.textContent = pending
    ? `Plus qu'une étape : crée ton compte et on lance directement « ${ONBOARDING_ACTIVITIES[pending].name} ».`
    : "";
  hint.hidden = !pending;

  $$("[data-auth]").forEach((t) => t.classList.toggle("active", t.dataset.auth === "signup"));
  $("#signup-form").hidden = false;
  $("#login-form").hidden = true;
  $("#signup-form").reset();
  $("#login-form").reset();
}

$$("[data-auth]").forEach((tab) => tab.addEventListener("click", () => {
  const signupTab = tab.dataset.auth === "signup";
  authError("");
  $$("[data-auth]").forEach((t) => t.classList.toggle("active", t === tab));
  $("#signup-form").hidden = !signupTab;
  $("#login-form").hidden = signupTab;
}));

$("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  authError("");
  signup($("#signup-email").value, $("#signup-pseudo").value, $("#signup-password").value);
});

$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  authError("");
  login($("#login-email").value, $("#login-password").value);
});

$("#logout-btn").addEventListener("click", logout);

/* Photo de profil : recadrée en carré de 256 px pour rester légère */
function resizeImage(file, size = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        canvas.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, size, size);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

$("#avatar-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) return toast("❌ Ce fichier n'est pas une image.");
  if (file.size > 5 * 1024 * 1024) return toast("❌ Image trop lourde (5 Mo maximum).");

  try {
    const avatar = await resizeImage(file);
    const { error } = await db.from("profiles").update({ avatar }).eq("id", me.id);
    if (error) return toast(`❌ Photo non enregistrée : ${error.message}`);
    me.avatar = avatar;
    renderProfile();
    toast("📷 Photo de profil mise à jour !");
  } catch (err) {
    toast("❌ Impossible de lire cette image.");
  }
});

/* =========================================================
   NAVIGATION ENTRE ÉCRANS
   ========================================================= */
let currentScreen = "accueil";

/* Écrans réservés aux personnes connectées */
const PROTECTED_SCREENS = ["profil", "classements", "bienvenue"];

/* Sans compte, seuls le test de bienvenue et l'inscription sont accessibles */
const GATE_SCREENS = ["compte", "bienvenue"];

/* Écran d'entrée quand personne n'est connecté */
function gateScreen() {
  return store.get(STORAGE.intro, false) ? "compte" : "bienvenue";
}

/* Fond de l'activité : pictogrammes en mosaïque + teinte de couleur */
function setActivityBg(key) {
  const bg = ACTIVITY_BACKGROUNDS[key] || ACTIVITY_BACKGROUNDS.accueil;
  const texts = [[20, 60], [120, 40], [70, 130], [160, 150]]
    .map(([x, y], i) => `<text x="${x}" y="${y}" font-size="44">${bg.icons[i % bg.icons.length]}</text>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">${texts}</svg>`;
  const root = document.documentElement.style;
  root.setProperty("--activity-bg", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  root.setProperty("--activity-tint", bg.tint);
}

/* Actions à lancer à l'arrivée sur un écran (remise à zéro) */
const onEnter = {
  accueil: refreshAccountUI,
  personnalite: resetPersonality,
  reaction: resetReaction,
  aim: resetAim,
  culture: renderCultureBest,
  compte: resetAuth,
  bienvenue: startOnboarding,
  profil: renderProfile,
  classements: renderClassements
};

function showScreen(name) {
  if (!currentUser() && !GATE_SCREENS.includes(name)) name = gateScreen();
  if (PROTECTED_SCREENS.includes(name) && !currentUser()) name = gateScreen();

  const target = document.getElementById("screen-" + name);
  if (!target) return;

  stopAllGames(); // on coupe les minuteurs de l'écran précédent

  $$(".screen").forEach((s) => s.classList.toggle("active", s === target));
  $$(".nav-link").forEach((l) => l.classList.toggle("current", l.dataset.go === name));
  currentScreen = name;
  setActivityBg(name);

  if (onEnter[name]) onEnter[name]();

  window.scrollTo({ top: 0, behavior: "smooth" });
  try { history.replaceState(null, "", "#" + name); } catch (e) { /* ignore */ }
}

/* Clics de navigation */
document.addEventListener("click", (e) => {
  const startQuiz = e.target.closest("[data-start-quiz]");
  if (startQuiz) {
    showScreen("quiz");                        // d'abord l'écran…
    startCulture(startQuiz.dataset.startQuiz); // …puis le quiz
    return;
  }
  const go = e.target.closest("[data-go]");
  if (go) showScreen(go.dataset.go);
});

/* Accessibilité : les cartes cliquables s'activent aussi avec Entrée / Espace */
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[role='button'][data-go]")) {
    e.preventDefault();
    showScreen(e.target.dataset.go);
  }
});

/* =========================================================
   TEST DE BIENVENUE : quelle activité essayer en premier ?
   ========================================================= */
const onb = { step: 0, scores: {}, locked: false, result: null };

function startOnboarding() {
  onb.step = 0;
  onb.locked = false;
  onb.scores = Object.fromEntries(Object.keys(ONBOARDING_ACTIVITIES).map((k) => [k, 0]));
  showOnly(["onb-quiz", "onb-result"], "onb-quiz");
  renderOnbStep();
}

function renderOnbStep() {
  const q = ONBOARDING_QUESTIONS[onb.step];
  const total = ONBOARDING_QUESTIONS.length;
  $("#onb-progress").style.width = `${(onb.step / total) * 100}%`;
  $("#onb-counter").textContent = `Question ${onb.step + 1} / ${total}`;
  $("#onb-question").textContent = q.question;

  const box = $("#onb-answers");
  box.innerHTML = "";
  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer";
    btn.textContent = answer.text;
    btn.addEventListener("click", () => chooseOnbAnswer(answer.points, btn));
    box.appendChild(btn);
  });
  box.classList.remove("anim-in");
  void box.offsetWidth;
  box.classList.add("anim-in");
}

function chooseOnbAnswer(points, btn) {
  if (onb.locked) return;
  onb.locked = true;
  Object.entries(points).forEach(([key, n]) => { onb.scores[key] += n; });
  btn.classList.add("picked");

  setTimeout(() => {
    onb.step += 1;
    onb.locked = false;
    if (onb.step < ONBOARDING_QUESTIONS.length) renderOnbStep();
    else finishOnboarding();
  }, 350);
}

/* En cas d'égalité, c'est la première activité de ONBOARDING_ACTIVITIES qui gagne */
function finishOnboarding() {
  const keys = Object.keys(ONBOARDING_ACTIVITIES);
  let best = keys[0];
  keys.forEach((k) => { if (onb.scores[k] > onb.scores[best]) best = k; });
  onb.result = best;

  const activity = ONBOARDING_ACTIVITIES[best];
  $("#onb-icon").textContent = activity.icon;
  $("#onb-title").textContent = activity.name;
  $("#onb-desc").textContent = `${activity.desc} C'est ce qu'on te conseille pour commencer.`;
  $("#onb-launch").textContent = currentUser() ? "Lancer" : "Créer mon compte pour jouer";
  showOnly(["onb-quiz", "onb-result"], "onb-result");
}

/* Lance une activité (écran ou quiz de culture) */
function launchActivity(key) {
  if (["personnalite", "reaction", "aim"].includes(key)) {
    showScreen(key);
  } else {
    showScreen("quiz");  // d'abord l'écran…
    startCulture(key);   // …puis le quiz du jeu
  }
}

/* Fin du test : sans compte, on demande l'inscription et on garde l'activité en attente */
$("#onb-launch").addEventListener("click", () => {
  store.set(STORAGE.intro, true);
  if (currentUser()) {
    launchActivity(onb.result);
  } else {
    store.set(STORAGE.pending, onb.result);
    showScreen("compte");
  }
});

/* =========================================================
   MODE 1 — QUEL GAMER ES-TU ?
   ========================================================= */
const PROFILE_KEYS = Object.keys(PROFILES);
const perso = { index: 0, scores: {}, total: PERSO_QUESTIONS.length, locked: false, result: null };

function resetPersonality() {
  showOnly(["perso-intro", "perso-quiz", "perso-result"], "perso-intro");
}

function beginPersonality() {
  perso.index = 0;
  perso.locked = false;
  perso.scores = Object.fromEntries(PROFILE_KEYS.map((k) => [k, 0]));
  showOnly(["perso-intro", "perso-quiz", "perso-result"], "perso-quiz");
  renderPersoQuestion();
}

function renderPersoQuestion() {
  const q = PERSO_QUESTIONS[perso.index];
  $("#perso-progress").style.width = `${(perso.index / perso.total) * 100}%`;
  $("#perso-counter").textContent = `Question ${perso.index + 1} / ${perso.total}`;
  $("#perso-question").textContent = q.question;

  const box = $("#perso-answers");
  box.innerHTML = "";
  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer";
    btn.textContent = answer.text;
    btn.addEventListener("click", () => choosePersoAnswer(answer.profile, btn));
    box.appendChild(btn);
  });

  // Relance l'animation d'entrée des réponses
  box.classList.remove("anim-in");
  void box.offsetWidth;
  box.classList.add("anim-in");
}

function choosePersoAnswer(profile, btn) {
  if (perso.locked) return;
  perso.locked = true;
  perso.scores[profile] += 1;
  btn.classList.add("picked");

  // Petite pause pour laisser voir le choix avant la question suivante
  setTimeout(() => {
    perso.index += 1;
    perso.locked = false;
    if (perso.index < perso.total) renderPersoQuestion();
    else showPersoResult();
  }, 450);
}

/* En cas d'égalité, c'est le premier profil de PROFILES qui gagne */
function getWinningProfile() {
  let best = PROFILE_KEYS[0];
  PROFILE_KEYS.forEach((k) => {
    if (perso.scores[k] > perso.scores[best]) best = k;
  });
  return best;
}

function fillList(selector, items) {
  $(selector).innerHTML = items.map((item) => `<li>${escapeHTML(item)}</li>`).join("");
}

function showPersoResult() {
  const key = getWinningProfile();
  const p = PROFILES[key];
  perso.result = key;

  $("#res-emoji").textContent = p.emoji;
  $("#res-title").textContent = p.title;
  $("#res-desc").textContent = p.description;
  fillList("#res-forces", p.strengths);
  fillList("#res-faiblesses", p.weaknesses);
  $("#res-game").textContent = `${GAMES[p.game].icon} ${GAMES[p.game].name}`;

  showOnly(["perso-intro", "perso-quiz", "perso-result"], "perso-result");
}

$("#perso-start").addEventListener("click", beginPersonality);
$("#perso-restart").addEventListener("click", beginPersonality);

$("#perso-share").addEventListener("click", async () => {
  const p = PROFILES[perso.result];
  const text =
    `🎮 Mon profil de gamer sur GAMER ARENA : ${p.emoji} ${p.title} !\n` +
    `💪 Forces : ${p.strengths.join(", ")}\n` +
    `💀 Faiblesses : ${p.weaknesses.join(", ")}\n` +
    `🕹️ Mon jeu idéal : ${GAMES[p.game].name}\n` +
    `Et toi, t'es quel gamer ?`;
  const ok = await copyText(text);
  toast(ok ? "📋 Résultat copié dans le presse-papier !" : "❌ Copie impossible, sélectionne le texte à la main.");
});

/* =========================================================
   PROFIL ET CLASSEMENTS (partagés, lus depuis Supabase)
   ========================================================= */
const BOARDS = [
  { key: "reaction", label: "⚡ Temps de réaction" },
  { key: "aim", label: "🎯 Aim trainer" },
  ...["lol", "valorant", "fortnite", "apex", "mix"].map((k) => ({ key: k, label: `${GAMES[k].icon} ${GAMES[k].name}` }))
];
let boardKey = "reaction";
let lastSavedId = null;

/* Enregistre un score sur le compte connecté */
async function saveScore(board, data) {
  const { data: row, error } = await db
    .from("scores")
    .insert({
      user_id: me.id,
      board,
      value: data.value,
      hits: data.hits ?? null,
      precision: data.precision ?? null,
      correct: data.correct ?? null
    })
    .select("id")
    .single();

  if (error) {
    toast(`❌ Score non enregistré : ${error.message}`);
    return false;
  }
  lastSavedId = row.id;
  return true;
}

function renderProfile() {
  if (!me) return;
  $("#profil-pseudo").textContent = me.pseudo;
  $("#profil-email").textContent = me.email;
  $("#profil-since").textContent = `Membre depuis le ${new Date(me.createdAt).toLocaleDateString("fr-FR")}`;
  $("#profil-avatar").innerHTML = me.avatar
    ? `<img src="${escapeHTML(me.avatar)}" alt="Photo de ${escapeHTML(me.pseudo)}">`
    : "🎮";
}

/* Page des classements : onglets par jeu, puis le top 10 */
function renderClassements() {
  if (!currentUser()) return;
  $("#board-tabs").innerHTML = BOARDS.map((b) =>
    `<button class="tab ${b.key === boardKey ? "active" : ""}" data-board="${b.key}" type="button">${b.label}</button>`
  ).join("");
  renderBoard();
}

/* Top 10 du classement choisi, avec les scores de tout le monde */
async function renderBoard() {
  const ol = $("#scores-list");
  ol.innerHTML = `<li class="empty">Chargement du classement…</li>`;

  // Temps de réaction : plus petit = mieux. Les autres : plus grand = mieux.
  let query = db
    .from("scores")
    .select("id, value, hits, precision, correct, created_at, user_id, profiles(pseudo, avatar)")
    .eq("board", boardKey)
    .order("value", { ascending: boardKey === "reaction" });
  if (boardKey === "aim") query = query.order("precision", { ascending: false });

  const { data, error } = await query.limit(10);
  if (error) {
    ol.innerHTML = `<li class="empty">Impossible de charger le classement : ${escapeHTML(error.message)}</li>`;
    return;
  }
  if (!data.length) {
    ol.innerHTML = `<li class="empty">Aucun score pour l'instant. Sois le premier à te faire humilier ici !</li>`;
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  ol.innerHTML = data.map((e, i) => {
    const rank = i < 3 ? medals[i] : `#${i + 1}`;
    const value = boardKey === "reaction"
      ? `${e.value} ms`
      : boardKey === "aim"
        ? `${e.value} pts <small>${e.hits} cibles · ${e.precision} %</small>`
        : `${e.value} pts <small>${e.correct} / 20 bonnes réponses</small>`;
    const date = new Date(e.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const mine = me && e.user_id === me.id;
    const pseudo = e.profiles?.pseudo ?? "Inconnu";
    const thumb = e.profiles?.avatar ? `<img class="row-avatar" src="${escapeHTML(e.profiles.avatar)}" alt="">` : "";
    const classes = ["score-row", mine ? "mine" : "", e.id === lastSavedId ? "fresh" : ""].join(" ");

    return `
      <li class="${classes}">
        <span class="rank-num">${rank}</span>
        <span class="pseudo">${thumb}${escapeHTML(pseudo)}${mine ? " <small>(toi)</small>" : ""}</span>
        <span class="value">${value}</span>
        <span class="date">${date}</span>
      </li>`;
  }).join("");
}

$("#board-tabs").addEventListener("click", (e) => {
  const tab = e.target.closest("[data-board]");
  if (!tab) return;
  boardKey = tab.dataset.board;
  renderClassements();
});

/* Efface uniquement TES scores de ce classement */
$("#scores-clear").addEventListener("click", async () => {
  const label = BOARDS.find((b) => b.key === boardKey).label;
  if (!confirm(`Effacer TES scores du classement « ${label} » ?`)) return;

  const { error } = await db.from("scores").delete().eq("board", boardKey).eq("user_id", me.id);
  if (error) return toast(`❌ Effacement impossible : ${error.message}`);
  renderBoard();
  toast("🗑️ Tes scores ont été effacés de ce classement.");
});

/* Après un enregistrement : on va voir le classement */
function goToBoard(key) {
  boardKey = key;
  lastSavedId = null;
  showScreen("classements");
}

/* =========================================================
   MODE 2a — TEMPS DE RÉACTION
   ========================================================= */
const REACTION_ROUNDS = 5;
const reaction = { state: "idle", attempt: 0, times: [], timer: null, startedAt: 0, average: 0 };
const reactionZone = $("#reaction-zone");

function setReactionZone(state, title, sub = "") {
  reactionZone.dataset.state = state;
  $("#reaction-title").textContent = title;
  $("#reaction-sub").textContent = sub;
}

function resetReaction() {
  clearTimeout(reaction.timer);
  reaction.state = "idle";
  reaction.attempt = 0;
  reaction.times = [];
  $("#reaction-end").hidden = true;
  $("#reaction-counter").textContent = `0 / ${REACTION_ROUNDS}`;
  $("#reaction-save").disabled = false;
  setReactionZone("idle", "Clique pour lancer l'essai", "La case va devenir verte. Ne clique pas avant.");
}

function reactionRank(ms) {
  return REACTION_RANKS.find((r) => ms <= r.max);
}

function startReactionRound() {
  reaction.state = "waiting";
  setReactionZone("waiting", "Attends le vert…", "Pas encore ! Ton pouce s'impatiente, pas le jeu.");

  const delay = randInt(1500, 4500);
  reaction.timer = setTimeout(() => {
    reaction.state = "go";
    reaction.startedAt = performance.now();
    setReactionZone("go", "CLIQUE !", "");
  }, delay);
}

function tooEarly() {
  clearTimeout(reaction.timer);
  reaction.state = "early";
  const msg = TOO_EARLY_MESSAGES[randInt(0, TOO_EARLY_MESSAGES.length - 1)];
  setReactionZone("early", msg, "Clique pour réessayer (ce faux départ ne compte pas).");
}

function recordReaction(ms) {
  reaction.times.push(ms);
  reaction.attempt += 1;
  reaction.state = "result";
  $("#reaction-counter").textContent = `${reaction.attempt} / ${REACTION_ROUNDS}`;

  if (reaction.attempt === REACTION_ROUNDS) {
    finishReaction();
  } else {
    setReactionZone("result", `${ms} ms`, "Bien joué ! Clique pour l'essai suivant.");
  }
}

function finishReaction() {
  const total = reaction.times.reduce((a, b) => a + b, 0);
  reaction.average = Math.round(total / REACTION_ROUNDS);
  reaction.state = "done";

  setReactionZone("done", `${reaction.average} ms`, "Moyenne sur 5 essais");

  const rank = reactionRank(reaction.average);
  $("#reaction-avg").textContent = `${reaction.average} ms`;
  $("#reaction-rank").textContent = rank.label;
  $("#reaction-comment").textContent = rank.comment;
  $("#reaction-end").hidden = false;
}

reactionZone.addEventListener("click", () => {
  switch (reaction.state) {
    case "idle":
    case "early":
    case "result":
      startReactionRound();
      break;
    case "waiting":
      tooEarly();
      break;
    case "go":
      recordReaction(Math.round(performance.now() - reaction.startedAt));
      break;
    default:
      break; // "done" : il faut utiliser les boutons en dessous
  }
});

reactionZone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    reactionZone.click();
  }
});

async function saveReaction() {
  $("#reaction-save").disabled = true;
  const ok = await saveScore("reaction", { value: reaction.average });
  if (!ok) {
    $("#reaction-save").disabled = false;
    return;
  }
  toast("✅ Score enregistré !");
  goToBoard("reaction");
}

$("#reaction-save").addEventListener("click", saveReaction);
$("#reaction-retry").addEventListener("click", resetReaction);

/* =========================================================
   MODE 2b — AIM TRAINER (30 secondes)
   Score = cibles touchées + précision (%). Combo = cibles touchées d'affilée.
   ========================================================= */
const ARENA_SECONDS = 30;
const MAX_TARGETS = 3;
const EMOTES_HIT = ["🎮", "🎯", "😎", "🔥", "⚡", "💀", "🤯", "👌"];
const EMOTE_MISS = "💨";
const EMOTE_EXPIRED = "😬";
const arena = $("#arena");
const aim = {
  running: false,
  hits: 0,
  clicks: 0,
  combo: 0,
  maxCombo: 0,
  precision: 0,
  score: 0,
  endAt: 0,
  tickTimer: null,
  spawnTimer: null,
  countdownTimer: null
};

function stopAimTimers() {
  clearInterval(aim.tickTimer);
  clearTimeout(aim.spawnTimer);
  clearInterval(aim.countdownTimer);
}

function currentPrecision() {
  return aim.clicks ? Math.round((aim.hits / aim.clicks) * 100) : 0;
}

function updateAimStats() {
  $("#aim-hits").textContent = aim.hits;
  $("#aim-precision").textContent = `${currentPrecision()} %`;
  $("#aim-combo").textContent = `x${aim.combo}`;
}

/* Emote flottante à une position (en pixels, dans l'arène) */
function spawnEmote(x, y, text, isCombo = false) {
  const el = document.createElement("span");
  el.className = isCombo ? "emote emote-combo" : "emote";
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  arena.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function resetAim() {
  stopAimTimers();
  aim.running = false;
  aim.hits = 0;
  aim.clicks = 0;
  aim.combo = 0;
  aim.maxCombo = 0;

  $$("#arena .target").forEach((t) => t.remove());
  $$("#arena .emote").forEach((t) => t.remove());
  $("#aim-overlay").hidden = false;
  $("#aim-overlay-text").textContent = "Prêt ?";
  $("#aim-start").disabled = false;
  $("#aim-end").hidden = true;
  $("#aim-save").disabled = false;
  $("#aim-time").textContent = `${ARENA_SECONDS.toFixed(1)} s`;
  updateAimStats();
}

/* Compte à rebours 3-2-1-GO puis démarrage */
function startAimCountdown() {
  resetAim();
  $("#aim-start").disabled = true;

  const steps = ["3", "2", "1", "GO !"];
  let step = 0;
  $("#aim-overlay-text").textContent = steps[0];

  aim.countdownTimer = setInterval(() => {
    step += 1;
    if (step < steps.length) {
      $("#aim-overlay-text").textContent = steps[step];
    } else {
      clearInterval(aim.countdownTimer);
      beginAim();
    }
  }, 700);
}

function beginAim() {
  aim.running = true;
  $("#aim-overlay").hidden = true;
  aim.endAt = performance.now() + ARENA_SECONDS * 1000;
  aim.tickTimer = setInterval(tickAim, 100);
  scheduleSpawn(0);
}

function tickAim() {
  const left = Math.max(0, (aim.endAt - performance.now()) / 1000);
  $("#aim-time").textContent = `${left.toFixed(1)} s`;
  if (left <= 0) endAim();
}

function scheduleSpawn(delay) {
  aim.spawnTimer = setTimeout(() => {
    spawnTarget();
    scheduleSpawn(randInt(450, 900));
  }, delay);
}

/* Centre d'une cible, en pixels dans l'arène (cible de 58 px) */
function targetCenter(target, axis = "x") {
  const pos = parseFloat(axis === "x" ? target.style.left : target.style.top);
  return pos + 29;
}

function spawnTarget() {
  if (!aim.running) return;
  if (arena.querySelectorAll(".target").length >= MAX_TARGETS) return;

  const size = 58;
  const maxX = Math.max(8, arena.clientWidth - size - 8);
  const maxY = Math.max(8, arena.clientHeight - size - 8);

  const target = document.createElement("button");
  target.type = "button";
  target.className = "target";
  target.setAttribute("aria-label", "Cible");
  target.style.width = `${size}px`;
  target.style.height = `${size}px`;
  target.style.left = `${randInt(8, maxX)}px`;
  target.style.top = `${randInt(8, maxY)}px`;

  // La cible disparaît si on ne la touche pas à temps : ça casse le combo
  target.expireTimer = setTimeout(() => {
    if (aim.running && !target.dataset.hit) {
      aim.combo = 0;
      spawnEmote(targetCenter(target), targetCenter(target, "y"), EMOTE_EXPIRED);
      updateAimStats();
    }
    target.remove();
  }, randInt(1100, 1500));

  target.addEventListener("click", (e) => {
    e.stopPropagation(); // évite de compter aussi un clic raté sur l'arène
    hitTarget(target);
  });

  arena.appendChild(target);
}

function hitTarget(target) {
  if (!aim.running || target.dataset.hit) return;
  target.dataset.hit = "1";
  clearTimeout(target.expireTimer);
  aim.hits += 1;
  aim.clicks += 1;

  // Combo : chaque cible touchée d'affilée ajoute 1
  aim.combo += 1;
  aim.maxCombo = Math.max(aim.maxCombo, aim.combo);

  const x = targetCenter(target);
  const y = targetCenter(target, "y");
  spawnEmote(x, y, EMOTES_HIT[randInt(0, EMOTES_HIT.length - 1)]);
  if (aim.combo >= 2) {
    spawnEmote(x, y - 36, `COMBO x${aim.combo}`, true);
  }

  target.classList.add("hit");
  setTimeout(() => target.remove(), 150);
  updateAimStats();
}

/* Clic dans l'arène hors cible = clic raté : combo cassé */
arena.addEventListener("click", (e) => {
  if (!aim.running || e.target.closest(".target")) return;
  aim.clicks += 1;
  aim.combo = 0;

  const rect = arena.getBoundingClientRect();
  spawnEmote(e.clientX - rect.left, e.clientY - rect.top, EMOTE_MISS);
  updateAimStats();
});

function endAim() {
  stopAimTimers();
  aim.running = false;
  $$("#arena .target").forEach((t) => t.remove());

  aim.precision = currentPrecision();
  aim.score = aim.hits + aim.precision;

  $("#aim-time").textContent = "0.0 s";
  $("#aim-overlay").hidden = false;
  $("#aim-overlay-text").textContent = "Temps écoulé !";
  $("#aim-start").disabled = true;

  const rank = AIM_RANKS.find((r) => aim.score >= r.min);
  $("#aim-score").textContent = `${aim.score} pts`;
  $("#aim-detail").textContent = `${aim.hits} cibles touchées · précision ${aim.precision} % · combo max x${aim.maxCombo}`;
  $("#aim-rank").textContent = rank.label;
  $("#aim-comment").textContent = rank.comment;
  $("#aim-end").hidden = false;

  // Easter egg : aucune cible touchée
  if (aim.hits === 0) setTimeout(() => showEgg(EASTER_EGGS.aimZero), 1200);
}

async function saveAim() {
  $("#aim-save").disabled = true;
  const ok = await saveScore("aim", { value: aim.score, hits: aim.hits, precision: aim.precision });
  if (!ok) {
    $("#aim-save").disabled = false;
    return;
  }
  toast("✅ Score enregistré !");
  goToBoard("aim");
}

$("#aim-start").addEventListener("click", startAimCountdown);
$("#aim-retry").addEventListener("click", startAimCountdown);
$("#aim-save").addEventListener("click", saveAim);

/* =========================================================
   MODE 3 — QUIZ DE CULTURE GAMING
   ========================================================= */
const CULTURE_TOTAL = 20;
const CULTURE_SECONDS = 15;
const culture = {
  game: "",
  questions: [],
  index: 0,
  correct: 0,
  points: 0,
  locked: true,
  buttons: [],
  startAt: 0,
  timerId: null
};

/* Cartes de jeux, générées à partir de GAMES (data.js) : icône, genre et « pour toi si… » */
function renderGameCards() {
  $("#games-grid").innerHTML = ["lol", "valorant", "fortnite", "apex", "mix"].map((key) => {
    const g = GAMES[key];
    return `
      <button class="game-card" data-start-quiz="${key}" type="button">
        <span class="game-emoji">${g.icon}</span>
        <strong>${g.name}</strong>
        <span class="genre">${g.genre}</span>
        <span class="pour-toi">Pour toi si ${g.pourToi}</span>
        <small data-best="${key}"></small>
      </button>`;
  }).join("");
}

function startCulture(gameKey) {
  const pool = gameKey === "mix"
    ? Object.values(CULTURE_QUESTIONS).flat()
    : CULTURE_QUESTIONS[gameKey];

  culture.game = gameKey;
  culture.questions = shuffle(pool).slice(0, CULTURE_TOTAL);
  culture.index = 0;
  culture.correct = 0;
  culture.points = 0;

  $("#quiz-game-title").textContent = `${GAMES[gameKey].icon} ${GAMES[gameKey].name}`;
  setActivityBg(`quiz-${gameKey}`);
  showOnly(["quiz-play", "quiz-end"], "quiz-play");
  renderCultureQuestion();
}

function currentCultureQuestion() {
  return culture.questions[culture.index];
}

function renderCultureQuestion() {
  const q = currentCultureQuestion();
  culture.locked = false;
  culture.buttons = [];

  $("#quiz-progress").style.width = `${(culture.index / CULTURE_TOTAL) * 100}%`;
  $("#quiz-counter").textContent = `Question ${culture.index + 1} / ${CULTURE_TOTAL}`;
  $("#quiz-score").textContent = `${culture.points} pts`;
  $("#quiz-question").textContent = q.q;
  $("#quiz-feedback").hidden = true;
  $("#quiz-feedback").className = "feedback";
  $("#quiz-next").hidden = true;

  // Mélange les réponses à chaque question
  const options = shuffle([q.correct, ...q.wrong]);
  const box = $("#quiz-answers");
  box.innerHTML = "";

  options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer";
    btn.dataset.text = text;
    btn.innerHTML = `<kbd>${i + 1}</kbd><span></span>`;
    btn.querySelector("span").textContent = text;
    btn.addEventListener("click", () => answerCulture(text));
    box.appendChild(btn);
    culture.buttons.push(btn);
  });

  box.classList.remove("anim-in");
  void box.offsetWidth;
  box.classList.add("anim-in");

  startCultureTimer();
}

/* ----- Minuteur 15 s ----- */
function remainingSeconds() {
  return Math.max(0, CULTURE_SECONDS - (performance.now() - culture.startAt) / 1000);
}

function startCultureTimer() {
  stopCultureTimer();
  culture.startAt = performance.now();
  culture.timerId = setInterval(updateCultureTimer, 100);
  updateCultureTimer();
}

function updateCultureTimer() {
  const left = remainingSeconds();
  const bar = $("#quiz-timer-bar");
  bar.style.width = `${(left / CULTURE_SECONDS) * 100}%`;
  bar.classList.toggle("danger", left <= 5);
  $("#quiz-timer-text").textContent = Math.ceil(left);

  if (left <= 0 && !culture.locked) timeoutCulture();
}

function stopCultureTimer() {
  clearInterval(culture.timerId);
  culture.timerId = null;
}

function stopAllGames() {
  clearTimeout(reaction.timer);
  stopAimTimers();
  aim.running = false;
  stopCultureTimer();
}

/* ----- Réponses ----- */
function markAnswers(selectedText, correctText) {
  culture.buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.text === correctText) btn.classList.add("correct");
    else if (btn.dataset.text === selectedText) btn.classList.add("wrong");
  });
}

function showFeedback(isGood, title, fun) {
  const box = $("#quiz-feedback");
  box.className = `feedback ${isGood ? "good" : "bad"}`;
  $("#quiz-feedback-title").textContent = title;
  $("#quiz-feedback-fun").textContent = fun;
  box.hidden = false;

  const next = $("#quiz-next");
  const isLast = culture.index + 1 >= CULTURE_TOTAL;
  next.textContent = isLast ? "Voir mon score 🏁" : "Question suivante ➜";
  next.hidden = false;
  next.focus();
}

function answerCulture(text) {
  if (culture.locked) return;
  culture.locked = true;

  const q = currentCultureQuestion();
  const left = remainingSeconds();
  stopCultureTimer();

  const isCorrect = text === q.correct;
  markAnswers(text, q.correct);

  if (isCorrect) {
    // 100 pts de base + bonus proportionnel au temps restant (jusqu'à +100)
    const bonus = Math.round((left / CULTURE_SECONDS) * 100);
    culture.correct += 1;
    culture.points += 100 + bonus;
    showFeedback(true, `✅ Bonne réponse ! +${100 + bonus} pts (bonus vitesse : +${bonus})`, q.fun);
  } else {
    showFeedback(false, `❌ Raté ! La bonne réponse était : ${q.correct}`, q.fun);
  }

  $("#quiz-score").textContent = `${culture.points} pts`;
}

function timeoutCulture() {
  culture.locked = true;
  stopCultureTimer();
  const q = currentCultureQuestion();
  markAnswers(null, q.correct);
  showFeedback(false, `⏰ Temps écoulé ! La bonne réponse était : ${q.correct}`, q.fun);
}

$("#quiz-next").addEventListener("click", () => {
  culture.index += 1;
  if (culture.index < CULTURE_TOTAL) renderCultureQuestion();
  else endCulture();
});

/* Raccourcis clavier 1 à 4 pendant le quiz */
document.addEventListener("keydown", (e) => {
  if (currentScreen !== "quiz" || culture.locked) return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= culture.buttons.length) culture.buttons[n - 1].click();
});

/* ----- Fin du quiz : classement en ligne + meilleur score local ----- */
function endCulture() {
  stopCultureTimer();
  culture.locked = true;

  const pct = Math.round((culture.correct / CULTURE_TOTAL) * 100);
  const comment = CULTURE_COMMENTS.find((c) => culture.correct >= c.min);

  $("#end-score").textContent = `${culture.correct} / ${CULTURE_TOTAL}`;
  $("#end-pct").textContent = `${pct} %  ·  ${culture.points} pts`;
  $("#end-comment").textContent = comment.text;

  saveScore(culture.game, { value: culture.points, correct: culture.correct });

  const best = store.get(STORAGE.best, {});
  const previous = best[culture.game];
  let message;

  if (!previous || culture.points > previous.points) {
    best[culture.game] = { points: culture.points, correct: culture.correct, date: new Date().toISOString() };
    store.set(STORAGE.best, best);
    message = previous ? "🏆 Nouveau record personnel !" : "🏆 Premier score enregistré !";
  } else {
    message = `Ton meilleur score : ${previous.points} pts (${previous.correct} / ${CULTURE_TOTAL})`;
  }
  $("#end-best").textContent = message;

  showOnly(["quiz-play", "quiz-end"], "quiz-end");
}

$("#quiz-replay").addEventListener("click", () => startCulture(culture.game));

/* Affiche le meilleur score de chaque jeu sur l'écran de choix */
function renderCultureBest() {
  const best = store.get(STORAGE.best, {});
  $$("[data-best]").forEach((el) => {
    const b = best[el.dataset.best];
    el.textContent = b ? `Meilleur : ${b.correct} / ${CULTURE_TOTAL} · ${b.points} pts` : "Pas encore joué";
  });
}

/* =========================================================
   EASTER EGGS (données dans data.js)
   ========================================================= */
function showEgg(egg) {
  $("#egg-emoji").textContent = egg.emoji;
  $("#egg-title").textContent = egg.title;
  $("#egg-text").textContent = egg.text;
  $("#egg").hidden = false;
  $("#egg-close").focus();
}

function closeEgg() {
  $("#egg").hidden = true;
}

$("#egg-close").addEventListener("click", closeEgg);
$("#egg").addEventListener("click", (e) => {
  if (e.target.id === "egg") closeEgg(); // clic en dehors de la fenêtre
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeEgg();
});

/* Compte les clics rapprochés (moins de 2 s entre deux) sur chaque élément piégé */
const eggCounters = {};
document.addEventListener("click", (e) => {
  for (const [id, egg] of Object.entries(EASTER_EGGS)) {
    if (!egg.trigger || !e.target.closest(egg.trigger)) continue;

    const now = Date.now();
    const counter = eggCounters[id] || { n: 0, last: 0 };
    counter.n = now - counter.last < 2000 ? counter.n + 1 : 1;
    counter.last = now;
    eggCounters[id] = counter;

    if (counter.n >= egg.count) {
      counter.n = 0;
      showEgg(egg);
    }
  }
});

/* =========================================================
   DÉMARRAGE
   ========================================================= */
async function init() {
  renderGameCards();
  renderCultureBest();

  // Récupère la session déjà ouverte sur cet appareil (si elle existe)
  const { data } = await db.auth.getSession();
  await loadMe(data.session);
  refreshAccountUI();

  // Première ouverture : test de bienvenue, puis inscription, avant l'accès au lobby
  const initialScreen = location.hash.replace("#", "");
  const allowedStart = ["personnalite", "reflexes", "culture", "profil", "classements", "compte", "accueil"];
  if (!me) showScreen(gateScreen());
  else showScreen(allowedStart.includes(initialScreen) ? initialScreen : "accueil");
}

init();
