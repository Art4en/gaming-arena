/* =========================================================
   QUIZ — JEUX D'HISTOIRE
   Cyberpunk 2077, The Witcher 3, Red Dead Redemption 2,
   The Last of Us, God of War, plus un mix des cinq.
   Chargé après data.js : complète GAMES, ICONS, CULTURE_QUESTIONS
   et ACTIVITY_BACKGROUNDS. Même format de question que data.js.
   ========================================================= */

Object.assign(ICONS, {
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  axe: '<path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z"/>'
});

Object.assign(GAMES, {
  cyberpunk: {
    name: "Cyberpunk 2077", icon: "cpu", genre: "RPG futuriste · Night City",
    pourToi: "tu aimes les mégacorporations, les implants et les histoires qui font mal"
  },
  witcher: {
    name: "The Witcher 3", icon: "moon", genre: "RPG fantasy · monstres et choix",
    pourToi: "tu aimes les quêtes secondaires qui valent un jeu entier"
  },
  rdr2: {
    name: "Red Dead Redemption 2", icon: "compass", genre: "Western · monde ouvert",
    pourToi: "tu prends le temps de regarder le paysage, même pendant une fusillade"
  },
  tlou: {
    name: "The Last of Us", icon: "leaf", genre: "Survie · post-apocalypse",
    pourToi: "tu aimes quand un jeu te serre la gorge"
  },
  gow: {
    name: "God of War", icon: "axe", genre: "Action · mythologie nordique",
    pourToi: "tu aimes la mythologie, les haches qui reviennent et les pères en colère"
  },
  histoire: {
    name: "Mix histoire", icon: "book", genre: "Les 5 jeux d'histoire mélangés",
    pourToi: "tu veux tester tes souvenirs de cinématiques"
  }
});

/* Regroupement des cartes sur l'écran « Culture », et pool du mode « mix » de chaque groupe */
const GAME_GROUPS = {
  competitif: { title: "Jeux compétitifs", games: ["lol", "valorant", "fortnite", "apex"], mix: "mix" },
  histoire: { title: "Jeux d'histoire", games: ["cyberpunk", "witcher", "rdr2", "tlou", "gow"], mix: "histoire" }
};

Object.assign(ACTIVITY_BACKGROUNDS, {
  "quiz-cyberpunk": { icons: ["cpu", "bot", "zap"], tint: "#facc15" },
  "quiz-witcher": { icons: ["moon", "swords", "flame"], tint: "#94a3b8" },
  "quiz-rdr2": { icons: ["compass", "star", "crosshair"], tint: "#d97706" },
  "quiz-tlou": { icons: ["leaf", "skull", "heart"], tint: "#84cc16" },
  "quiz-gow": { icons: ["axe", "shield", "flame"], tint: "#ef4444" },
  "quiz-histoire": { icons: ["book", "brain", "help"], tint: "#a78bfa" }
});

Object.assign(CULTURE_QUESTIONS, {
  cyberpunk: [
    {
      q: "Quel studio a développé Cyberpunk 2077 ?",
      correct: "CD Projekt RED",
      wrong: ["Ubisoft Montréal", "Bethesda Game Studios", "Rockstar Games"],
      fun: "Les mêmes que The Witcher, avec un peu plus de néons et un peu moins de chevaux."
    },
    {
      q: "Comment s'appelle la ville où se déroule le jeu ?",
      correct: "Night City",
      wrong: ["Neo Tokyo", "Cyber Harbor", "Los Santos"],
      fun: "Une ville où tout est à vendre, y compris tes yeux."
    },
    {
      q: "Quel acteur prête ses traits à Johnny Silverhand ?",
      correct: "Keanu Reeves",
      wrong: ["Idris Elba", "Norman Reedus", "Mark Hamill"],
      fun: "« Tu es à couper le souffle », mais cette fois c'est lui qui se tient dans ta tête."
    },
    {
      q: "Quel est le nom du personnage que tu incarnes ?",
      correct: "V",
      wrong: ["K", "J", "X"],
      fun: "Une seule lettre, mais assez de problèmes pour remplir tout l'alphabet."
    },
    {
      q: "Sur quel jeu de rôle sur table Cyberpunk 2077 est-il basé ?",
      correct: "Cyberpunk 2020",
      wrong: ["Shadowrun", "Donjons & Dragons", "Warhammer 40,000"],
      fun: "Créé par Mike Pondsmith, qui a aussi conseillé l'équipe du jeu."
    },
    {
      q: "Comment s'appelle le groupe de rock de Johnny Silverhand ?",
      correct: "Samurai",
      wrong: ["Maelstrom", "Valentinos", "Voodoo Boys"],
      fun: "Le groupe le plus rebelle de Night City, tant qu'on ne parle pas de royalties."
    },
    {
      q: "Comment s'appelle le meilleur ami de V au début de l'histoire ?",
      correct: "Jackie Welles",
      wrong: ["Goro Takemura", "Dexter DeShawn", "Viktor Vektor"],
      fun: "Il est adorable. Tu sais ce que ça annonce."
    },
    {
      q: "Quelle mégacorporation japonaise a été fondée par Saburo Arasaka ?",
      correct: "Arasaka",
      wrong: ["Militech", "Kang Tao", "Biotechnica"],
      fun: "Leur devise : le contrôle avant tout, la politesse en second."
    },
    {
      q: "Comment s'appelle la puce expérimentale qui menace la vie de V ?",
      correct: "Relic",
      wrong: ["Soulkiller", "Sandevistan", "Mantis Blade"],
      fun: "Une puce qui remplace le cerveau de V par Johnny. Mauvaise affaire."
    },
    {
      q: "Quel studio d'animation a réalisé l'anime Cyberpunk: Edgerunners ?",
      correct: "Studio Trigger",
      wrong: ["Studio Ghibli", "MAPPA", "Madhouse"],
      fun: "10 épisodes, des millions de fans en larmes et un jeu qui est remonté dans les ventes."
    },
    {
      q: "Quand Cyberpunk 2077 est-il finalement sorti, après plusieurs reports ?",
      correct: "Décembre 2020",
      wrong: ["Avril 2020", "Septembre 2020", "Mars 2021"],
      fun: "Le lancement a été chaotique, mais le jeu a énormément progressé depuis."
    },
    {
      q: "Comment s'appelle l'extension sortie en 2023 ?",
      correct: "Phantom Liberty",
      wrong: ["Dogtown Rising", "Edgerunners Rising", "Night Protocol"],
      fun: "Elle se déroule à Dogtown, une zone où personne ne vient te sauver."
    },
    {
      q: "Quel acteur joue Solomon Reed dans Phantom Liberty ?",
      correct: "Idris Elba",
      wrong: ["Samuel L. Jackson", "Denzel Washington", "Michael B. Jordan"],
      fun: "Un agent du gouvernement avec une voix qu'on ne peut pas ignorer."
    },
    {
      q: "Laquelle de ces propositions n'est PAS une origine de V ?",
      correct: "Mercenaire",
      wrong: ["Nomade", "Corpo", "Gamin des rues"],
      fun: "Tu deviens mercenaire de toute façon, quelle que soit ton origine."
    },
    {
      q: "Comment s'appelle le bar des mercenaires de Night City ?",
      correct: "Afterlife",
      wrong: ["Lizzie's Bar", "Totentanz", "The Dive Bar"],
      fun: "Chaque mercenaire légendaire y a son cocktail. Le tien est à gagner."
    },
    {
      q: "Que désigne la « cyberpsychose » dans l'univers du jeu ?",
      correct: "Une folie provoquée par un excès d'implants",
      wrong: ["Un virus informatique", "Une drogue de synthèse", "Un gang de rue"],
      fun: "Trop de chrome, pas assez d'humanité. Les cyberpsychos ne se négocient pas."
    },
    {
      q: "Quel métier exerce Judy Alvarez ?",
      correct: "Technicienne de braindance",
      wrong: ["Médecin de rue", "Fixeuse", "Pilote d'Aerodyne"],
      fun: "Elle rejoue les souvenirs des autres, et ça ne rend pas toujours heureux."
    },
    {
      q: "Quel clan nomade accueille V grâce à Panam Palmer ?",
      correct: "Les Aldecaldos",
      wrong: ["Les Wraiths", "Les Valentinos", "Les Tyger Claws"],
      fun: "Une famille de nomades qui a des voitures, du désert et des principes."
    },
    {
      q: "Dans quel État fictif se situe Night City ?",
      correct: "L'État libre de Californie du Nord",
      wrong: ["La République du Texas", "L'Union du Nevada", "L'État libre de New York"],
      fun: "Un État libre, ce qui veut surtout dire que personne n'est là pour t'aider."
    },
    {
      q: "Quel type de véhicule est géré par l'IA Delamain ?",
      correct: "Des taxis autonomes",
      wrong: ["Des ambulances", "Des camions de livraison", "Des motos de police"],
      fun: "Une IA de taxi qui a une vie plus compliquée que la tienne."
    }
  ],

  witcher: [
    {
      q: "Comment s'appelle le héros de The Witcher 3 ?",
      correct: "Geralt de Riv",
      wrong: ["Vesemir de Kaer Morhen", "Eskel de Cintra", "Lambert de Novigrad"],
      fun: "Il dit « Hm » plus souvent que « Bonjour », et c'est ce qu'on aime chez lui."
    },
    {
      q: "Quel auteur polonais a écrit les romans à l'origine de la saga ?",
      correct: "Andrzej Sapkowski",
      wrong: ["J.R.R. Tolkien", "George R.R. Martin", "Terry Pratchett"],
      fun: "Il a créé Geralt avant que quiconque pense à en faire un jeu vidéo."
    },
    {
      q: "Quel sorceleur est le mentor de Geralt à Kaer Morhen ?",
      correct: "Vesemir",
      wrong: ["Eskel", "Lambert", "Emhyr"],
      fun: "Le doyen des sorceleurs, qui a vu passer plus de monstres que tu n'as de potions."
    },
    {
      q: "Comment s'appelle la fille adoptive de Geralt ?",
      correct: "Ciri",
      wrong: ["Triss", "Keira", "Anna"],
      fun: "Elle a des cheveux blancs, une épée et un destin qui dépasse tout le monde."
    },
    {
      q: "Comment s'appelle l'armée spectrale qui traque Ciri ?",
      correct: "La Chasse sauvage",
      wrong: ["La Horde noire", "Les Cavaliers de l'Hiver", "Les Griffes de Nilfgaard"],
      fun: "Leur arrivée annonce une tempête de glace et beaucoup de problèmes."
    },
    {
      q: "Comment s'appelle le jeu de cartes présent dans The Witcher 3 ?",
      correct: "Gwent",
      wrong: ["Tarot", "Poker du Nord", "Triple Triade"],
      fun: "Ce mini-jeu était tellement bon qu'il est devenu un jeu à part entière."
    },
    {
      q: "Comment s'appelle le cheval de Geralt dans la version française ?",
      correct: "Ablette",
      wrong: ["Épona", "Tonnerre", "Pégase"],
      fun: "Tous ses chevaux s'appellent Ablette, et ça ne l'a jamais dérangé."
    },
    {
      q: "En quelle année The Witcher 3 est-il sorti ?",
      correct: "2015",
      wrong: ["2013", "2017", "2011"],
      fun: "Dix ans plus tard, on y joue encore pour la fenêtre de la taverne."
    },
    {
      q: "Quel barde accompagne souvent Geralt ?",
      correct: "Jaskier",
      wrong: ["Zoltan", "Letho", "Roche"],
      fun: "Il écrit des chansons sur Geralt, qui préférerait qu'il se taise."
    },
    {
      q: "Quelle école de sorceleurs est celle de Geralt ?",
      correct: "L'école du Loup",
      wrong: ["L'école du Chat", "L'école du Griffon", "L'école de l'Ours"],
      fun: "Son médaillon vibre à l'approche de la magie. Pratique, mais bruyant."
    },
    {
      q: "Quel acteur joue Geralt dans la série Netflix, de la saison 1 à la saison 3 ?",
      correct: "Henry Cavill",
      wrong: ["Chris Hemsworth", "Jason Momoa", "Kit Harington"],
      fun: "Il est aussi un fan de jeux vidéo, et on dit que ça se voit dans le rôle."
    },
    {
      q: "Quelle extension de The Witcher 3 se déroule dans la région de Toussaint ?",
      correct: "Blood and Wine",
      wrong: ["Hearts of Stone", "Le Dernier Vœu", "L'Ère du mépris"],
      fun: "Du vin, des chevaliers et un vampire. Voilà pour les vacances de Geralt."
    },
    {
      q: "Quel empereur dirige Nilfgaard ?",
      correct: "Emhyr var Emreis",
      wrong: ["Foltest", "Radovid", "Henselt"],
      fun: "Il a des projets pour Ciri, et ils ne sont pas tous rassurants."
    },
    {
      q: "Quelle magicienne aux cheveux noirs sent le lilas et les groseilles ?",
      correct: "Yennefer",
      wrong: ["Triss Merigold", "Keira Metz", "Philippa Eilhart"],
      fun: "Le parfum le plus célèbre des Royaumes du Nord."
    },
    {
      q: "En quel métal est faite l'épée du sorceleur utilisée contre les monstres ?",
      correct: "L'argent",
      wrong: ["L'or", "Le bronze", "L'obsidienne"],
      fun: "L'acier pour les humains, l'argent pour les monstres. Il faut bien suivre."
    },
    {
      q: "Quelle récompense majeure The Witcher 3 a-t-il remportée aux Game Awards 2015 ?",
      correct: "Jeu de l'année",
      wrong: ["Meilleur jeu mobile", "Meilleur jeu de sport", "Meilleur jeu pour enfants"],
      fun: "Le jeu a remporté plus de 250 récompenses au total, dit-on."
    },
    {
      q: "Quel surnom est donné à Geralt ?",
      correct: "Le Loup blanc",
      wrong: ["Le Corbeau noir", "Le Lion de Cintra", "L'Ours gris"],
      fun: "Un surnom qui fait peur, jusqu'à ce qu'on le voie hésiter devant un tonneau."
    },
    {
      q: "Quelle grande ville libre est dominée par l'Église du Feu Éternel ?",
      correct: "Novigrad",
      wrong: ["Oxenfurt", "Vizima", "Beauclair"],
      fun: "On y brûle les mages. Mieux vaut éviter de dire que tu en connais."
    },
    {
      q: "Quel Signe de Geralt sert à lancer des flammes ?",
      correct: "Igni",
      wrong: ["Aard", "Quen", "Axii"],
      fun: "Pratique contre les loups, les noyeurs, et les gens qui ne paient pas."
    },
    {
      q: "Combien d'épées Geralt porte-t-il sur le dos ?",
      correct: "Deux",
      wrong: ["Une", "Trois", "Quatre"],
      fun: "Une pour les monstres et une pour les humains. Il n'en a pas pour les bugs."
    }
  ],

  rdr2: [
    {
      q: "Quel studio a développé Red Dead Redemption 2 ?",
      correct: "Rockstar Games",
      wrong: ["Ubisoft", "Naughty Dog", "CD Projekt RED"],
      fun: "Le studio qui a mis des années à faire un jeu où l'on peut brosser son cheval."
    },
    {
      q: "Comment s'appelle le héros du jeu ?",
      correct: "Arthur Morgan",
      wrong: ["John Marston", "Micah Bell", "Charles Smith"],
      fun: "Un hors-la-loi qui écrit dans son journal. Bien plus tendre qu'il n'y paraît."
    },
    {
      q: "Comment s'appelle le chef du gang auquel appartient Arthur ?",
      correct: "Dutch van der Linde",
      wrong: ["Hosea Matthews", "Leviticus Cornwall", "Micah Bell"],
      fun: "Un grand parleur qui a toujours un plan. Le plan change souvent."
    },
    {
      q: "Quel personnage du premier Red Dead Redemption est jouable dans l'épilogue ?",
      correct: "John Marston",
      wrong: ["Jack Marston", "Edgar Ross", "Bill Williamson"],
      fun: "L'épilogue fait le lien avec le premier jeu, et c'est assez émouvant."
    },
    {
      q: "En quelle année l'histoire commence-t-elle ?",
      correct: "1899",
      wrong: ["1911", "1875", "1920"],
      fun: "La fin du Far West, juste avant que les voitures s'invitent."
    },
    {
      q: "De quelle maladie Arthur Morgan souffre-t-il ?",
      correct: "La tuberculose",
      wrong: ["Le choléra", "La variole", "La malaria"],
      fun: "Une toux qui sonne plus tragique que n'importe quelle fusillade."
    },
    {
      q: "Red Dead Redemption 2 est…",
      correct: "Une préquelle du premier Red Dead Redemption",
      wrong: ["Une suite directe du premier jeu", "Un reboot complet", "Un spin-off sans lien"],
      fun: "On connaît la fin du gang avant de commencer. Ça n'aide pas."
    },
    {
      q: "La ville de Saint Denis est inspirée de quelle ville réelle ?",
      correct: "La Nouvelle-Orléans",
      wrong: ["Chicago", "Boston", "San Francisco"],
      fun: "Des tramways, du jazz et des rues où on a envie de flâner. Même avec une prime."
    },
    {
      q: "Quelle agence de détectives traque le gang ?",
      correct: "L'agence Pinkerton",
      wrong: ["L'agence Dalton", "Les Texas Rangers", "Le Bureau Cooper"],
      fun: "Ils existaient vraiment, et ils n'avaient pas bonne réputation non plus."
    },
    {
      q: "Comment s'appelle le fils de John Marston et d'Abigail ?",
      correct: "Jack",
      wrong: ["Tom", "Arthur", "Hosea"],
      fun: "Un jeune garçon qui préfère les livres aux revolvers. Ça ne dure pas."
    },
    {
      q: "Quel braquage raté force le gang à fuir au début du jeu ?",
      correct: "Blackwater",
      wrong: ["Valentine", "Rhodes", "Saint Denis"],
      fun: "Tout part de là. Après, c'est une longue série de mauvaises idées."
    },
    {
      q: "Quel acteur prête sa voix et ses mouvements à Arthur Morgan ?",
      correct: "Roger Clark",
      wrong: ["Rob Wiethoff", "Benjamin Byron Davis", "Steve Blum"],
      fun: "Il a passé des années sur ce rôle, et ça se ressent à chaque phrase."
    },
    {
      q: "En quelle année la version PC est-elle sortie ?",
      correct: "2019",
      wrong: ["2018", "2020", "2021"],
      fun: "Les joueurs PC ont attendu un an. Leur cheval aussi."
    },
    {
      q: "Quelle tribu amérindienne vit dans la réserve de Wapiti ?",
      correct: "Les Wapiti",
      wrong: ["Les Apaches", "Les Sioux", "Les Navajos"],
      fun: "Un peuple fictif, mais dont la situation est tristement réaliste."
    },
    {
      q: "Quelle phrase Dutch répète-t-il sans arrêt ?",
      correct: "« J'ai un plan »",
      wrong: ["« Je suis le shérif »", "« Tout le monde descend »", "« Mort aux Pinkerton »"],
      fun: "Le plan est rarement expliqué, et encore moins réussi."
    },
    {
      q: "De quel pays vient Javier Escuella ?",
      correct: "Le Mexique",
      wrong: ["L'Espagne", "Cuba", "L'Argentine"],
      fun: "Un révolutionnaire qui tient à ses idéaux et à sa guitare."
    },
    {
      q: "Que devient Sadie Adler après la mort de son mari ?",
      correct: "Chasseuse de primes",
      wrong: ["Institutrice", "Shérif", "Infirmière"],
      fun: "Elle passe du deuil à la détermination, et du tablier au fusil."
    },
    {
      q: "Quel autre jeu célèbre de Rockstar est sorti en 2013 ?",
      correct: "Grand Theft Auto V",
      wrong: ["Assassin's Creed IV", "Far Cry 3", "Fallout 4"],
      fun: "Les deux ont un monde ouvert, mais les voitures sont plus rapides qu'un cheval."
    },
    {
      q: "Quel métier exerce Leviticus Cornwall ?",
      correct: "Magnat du pétrole",
      wrong: ["Shérif", "Maire", "Médecin"],
      fun: "Il possède tout ce qui brille dans la région, sauf la bonté."
    },
    {
      q: "Comment s'appelle le système qui influence la fin de l'histoire d'Arthur ?",
      correct: "L'honneur",
      wrong: ["Le karma", "L'alignement", "Le destin"],
      fun: "Aider les gens, c'est bien. Les dépouiller, un peu moins."
    }
  ],

  tlou: [
    {
      q: "Quel studio a développé The Last of Us ?",
      correct: "Naughty Dog",
      wrong: ["Santa Monica Studio", "Insomniac Games", "Bungie"],
      fun: "Le même studio qu'Uncharted, mais avec nettement moins de blagues."
    },
    {
      q: "Comment s'appelle le héros du premier jeu ?",
      correct: "Joel",
      wrong: ["Tommy", "David", "Ethan"],
      fun: "Un père bourru qui ne pensait plus revoir un jour de bonheur."
    },
    {
      q: "Quelle jeune fille Joel doit-il escorter à travers le pays ?",
      correct: "Ellie",
      wrong: ["Tess", "Dina", "Riley"],
      fun: "Elle fait des blagues nulles, et c'est pour ça qu'on l'adore."
    },
    {
      q: "Quel champignon est à l'origine de l'infection ?",
      correct: "Le Cordyceps",
      wrong: ["Le Pénicillium", "L'Amanite", "La Truffe"],
      fun: "Il existe vraiment, mais heureusement il n'infecte que des insectes."
    },
    {
      q: "Comment appelle-t-on les infectés aveugles qui émettent des claquements ?",
      correct: "Les Claqueurs",
      wrong: ["Les Coureurs", "Les Marcheurs", "Les Hurleurs"],
      fun: "Tu entends « clic clic » et tu cesses de respirer."
    },
    {
      q: "Dans quelle ville américaine commence le prologue ?",
      correct: "Austin",
      wrong: ["Seattle", "Denver", "Chicago"],
      fun: "Le prologue dure peu de temps, mais il marque pour toute la partie."
    },
    {
      q: "Comment s'appelle le groupe rebelle qui cherche un remède ?",
      correct: "Les Lucioles",
      wrong: ["Les Chasseurs", "Les Faucons", "Les Corbeaux"],
      fun: "Leur nom évoque l'espoir, mais l'histoire ne leur fait aucun cadeau."
    },
    {
      q: "Quel compositeur a signé la bande-son du premier jeu ?",
      correct: "Gustavo Santaolalla",
      wrong: ["Hans Zimmer", "Ennio Morricone", "Jesper Kyd"],
      fun: "Quelques notes de guitare suffisent pour te mettre les larmes aux yeux."
    },
    {
      q: "En quelle année The Last of Us Part II est-il sorti ?",
      correct: "2020",
      wrong: ["2018", "2019", "2021"],
      fun: "Une suite qui a divisé les joueurs, et personne n'est resté indifférent."
    },
    {
      q: "Quel acteur joue Joel dans la série HBO ?",
      correct: "Pedro Pascal",
      wrong: ["Oscar Isaac", "Javier Bardem", "Josh Brolin"],
      fun: "Il a un don pour jouer des pères protecteurs, et ça ne lui réussit pas mal."
    },
    {
      q: "Comment s'appelle la fille de Joel ?",
      correct: "Sarah",
      wrong: ["Tess", "Marlene", "Maria"],
      fun: "Les premières minutes du jeu suffisent à comprendre pourquoi Joel est devenu ce qu'il est."
    },
    {
      q: "Qui dirige les Lucioles dans le premier jeu ?",
      correct: "Marlene",
      wrong: ["Tess", "Maria", "Dina"],
      fun: "Elle fait des promesses, mais elle sait que certains choix sont impossibles."
    },
    {
      q: "Comment s'appelle la communauté où vit Tommy, le frère de Joel ?",
      correct: "Jackson",
      wrong: ["Boulder", "Haven", "Springfield"],
      fun: "Un endroit presque paisible. Presque."
    },
    {
      q: "Quel animal Ellie découvre-t-elle dans une scène restée célèbre ?",
      correct: "Des girafes",
      wrong: ["Des éléphants", "Des cerfs", "Des chevaux"],
      fun: "Un moment de douceur au milieu d'un monde en ruines."
    },
    {
      q: "Dans quelle ville se trouve l'hôpital de la fin du premier jeu ?",
      correct: "Salt Lake City",
      wrong: ["Denver", "Boise", "Jackson"],
      fun: "Le dernier choix de Joel y est devenu l'un des plus débattus du jeu vidéo."
    },
    {
      q: "Quel âge a Ellie dans le premier jeu ?",
      correct: "14 ans",
      wrong: ["10 ans", "12 ans", "17 ans"],
      fun: "Elle a déjà beaucoup vu et pourtant elle trouve encore le temps de blaguer."
    },
    {
      q: "Quel personnage est jouable dans la seconde partie de Part II ?",
      correct: "Abby",
      wrong: ["Tess", "Tommy", "Marlene"],
      fun: "Le jeu te demande de la suivre alors que tu avais envie de la détester."
    },
    {
      q: "Sur quelle console le premier The Last of Us est-il sorti en 2013 ?",
      correct: "PlayStation 3",
      wrong: ["Xbox 360", "Wii U", "PC"],
      fun: "Un des derniers grands jeux de la PS3, et l'un de ses plus beaux."
    },
    {
      q: "Quel instrument Ellie joue-t-elle dans Part II ?",
      correct: "De la guitare",
      wrong: ["Du piano", "Du violon", "De la batterie"],
      fun: "Une guitare dans un monde en ruines. Elle n'a pas fini d'émouvoir."
    },
    {
      q: "Comment s'appelle le mode multijoueur du premier jeu ?",
      correct: "Factions",
      wrong: ["Survivants", "Clans", "Escouades"],
      fun: "Tu y gérais un camp de survivants. Avec les mêmes dilemmes, en moins dramatique."
    }
  ],

  gow: [
    {
      q: "Quel studio a développé God of War (2018) ?",
      correct: "Santa Monica Studio",
      wrong: ["Naughty Dog", "Sucker Punch", "Guerrilla Games"],
      fun: "Ils ont changé de mythologie, et Kratos a changé de ton."
    },
    {
      q: "De quelle cité grecque vient Kratos ?",
      correct: "Sparte",
      wrong: ["Athènes", "Corinthe", "Thèbes"],
      fun: "« Spartiate » veut dire « dur », et lui n'a jamais été ramolli."
    },
    {
      q: "Comment s'appelle le fils de Kratos dans le jeu de 2018 ?",
      correct: "Atreus",
      wrong: ["Deimos", "Calliope", "Magni"],
      fun: "Il a un arc, beaucoup de questions, et un père qui ne répond qu'à moitié."
    },
    {
      q: "Quelle est l'arme principale de Kratos dans le jeu de 2018 ?",
      correct: "La hache Léviathan",
      wrong: ["Le marteau Mjölnir", "La lance Gungnir", "L'épée d'Olympe"],
      fun: "Lance-la, rappelle-la, et attends ce bruit parfait quand elle revient."
    },
    {
      q: "Dans quelle mythologie le jeu de 2018 se déroule-t-il ?",
      correct: "La mythologie nordique",
      wrong: ["La mythologie égyptienne", "La mythologie celte", "La mythologie japonaise"],
      fun: "Kratos a quitté l'Olympe pour le froid, et le froid ne lui a pas arrangé le caractère."
    },
    {
      q: "Qu'est-ce que Mimir ?",
      correct: "Une tête parlante",
      wrong: ["Un loup géant", "Un nain forgeron", "Un dragon de glace"],
      fun: "Il a un millier d'histoires à raconter, et il adore les raconter."
    },
    {
      q: "Quel acteur prête sa voix à Kratos dans le jeu de 2018 ?",
      correct: "Christopher Judge",
      wrong: ["T.C. Carson", "Troy Baker", "Nolan North"],
      fun: "Une voix grave qui peut dire « Garçon » de six manières différentes."
    },
    {
      q: "Comment s'appelle l'Étranger, le premier ennemi important du jeu ?",
      correct: "Baldur",
      wrong: ["Thor", "Tyr", "Loki"],
      fun: "Un dieu qui ne ressent plus la douleur, ce qui semble pratique mais pas tant que ça."
    },
    {
      q: "Quelle déesse est la mère de Baldur ?",
      correct: "Freya",
      wrong: ["Sif", "Hel", "Skadi"],
      fun: "Une mère protectrice, qui a lancé un sort qui a mal tourné."
    },
    {
      q: "Comment s'appellent les armes d'origine de Kratos ?",
      correct: "Les Lames du Chaos",
      wrong: ["Les Lames de Zeus", "Les Lames d'Olympe", "Les Lames d'Hadès"],
      fun: "Elles sont attachées à ses bras. Comme son passé."
    },
    {
      q: "Quel dieu de la guerre Kratos tue-t-il dans le tout premier jeu ?",
      correct: "Ares",
      wrong: ["Hadès", "Hermès", "Apollon"],
      fun: "La vengeance de Kratos a duré plusieurs jeux, et plusieurs dieux."
    },
    {
      q: "Comment s'appelle le serpent géant qui vit dans le lac des Neuf ?",
      correct: "Jörmungandr",
      wrong: ["Fenrir", "Nidhogg", "Sleipnir"],
      fun: "Un serpent qui encercle le monde et qui sait garder un secret."
    },
    {
      q: "Quel sous-titre porte la suite sortie en 2022 ?",
      correct: "Ragnarök",
      wrong: ["Valhalla", "Yggdrasil", "Asgard"],
      fun: "Le titre annonce la fin du monde, et pourtant on veut y rester."
    },
    {
      q: "Comment s'appellent les frères nains forgerons ?",
      correct: "Brok et Sindri",
      wrong: ["Mimir et Tyr", "Magni et Modi", "Hrungnir et Thrúd"],
      fun: "Ils se disputent comme des frères, mais ils forgent comme des dieux."
    },
    {
      q: "Comment s'appelle la mère d'Atreus ?",
      correct: "Faye",
      wrong: ["Freya", "Sif", "Hel"],
      fun: "Elle a laissé plus de mystères que de réponses."
    },
    {
      q: "Quel autre nom donne-t-on à Atreus chez les géants ?",
      correct: "Loki",
      wrong: ["Odin", "Fenrir", "Baldur"],
      fun: "Un nom qui évoque la ruse, et qu'il n'a pas choisi."
    },
    {
      q: "Comment s'appelle l'arbre géant qui relie les neuf royaumes ?",
      correct: "Yggdrasil",
      wrong: ["Bifröst", "Mjölnir", "Valhalla"],
      fun: "Un arbre si grand qu'il sert de carte du monde."
    },
    {
      q: "Quelle particularité de mise en scène a le jeu de 2018 ?",
      correct: "Un seul plan-séquence sans coupure",
      wrong: ["Une vue à la première personne", "Une caméra fixe", "Un rendu en 2D"],
      fun: "Pas de coupure de caméra. Même quand Kratos s'écrase au sol."
    },
    {
      q: "Comment s'appelle le marteau de Thor ?",
      correct: "Mjölnir",
      wrong: ["Gungnir", "Excalibur", "Gáe Bulg"],
      fun: "Un marteau qui revient toujours dans la main de son propriétaire. Comme la hache de Kratos."
    },
    {
      q: "Quel surnom est donné à Kratos ?",
      correct: "Le Fantôme de Sparte",
      wrong: ["Le Lion de Thèbes", "L'Ombre d'Athènes", "Le Dragon d'Argos"],
      fun: "Ses cendres blanches sont un rappel qu'il ne peut pas oublier ce qu'il a fait."
    }
  ]
});

/* Mix histoire : les 5 jeux d'histoire mélangés (le pool est construit par script.js) */
