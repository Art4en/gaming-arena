/* =========================================================
   QUIZ — JEUX SOULS (FromSoftware)
   Dark Souls, Elden Ring, Bloodborne, Sekiro, plus un mix des quatre.
   Chargé après data-story.js : complète GAMES, ICONS, GAME_GROUPS,
   CULTURE_QUESTIONS et ACTIVITY_BACKGROUNDS.
   ========================================================= */

Object.assign(ICONS, {
  crown: '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M5 20h14"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  sword: '<path d="m11 19-6-6"/><path d="m5 21-2-2"/><path d="m8 16-4 4"/><path d="M9.5 17.5 21 6V3h-3L6.5 14.5"/>'
});

Object.assign(GAMES, {
  darksouls: {
    name: "Dark Souls", icon: "flame", genre: "Action-RPG · difficile et sombre",
    pourToi: "tu aimes mourir, apprendre, puis recommencer"
  },
  eldenring: {
    name: "Elden Ring", icon: "crown", genre: "Action-RPG · monde ouvert",
    pourToi: "tu aimes explorer et te perdre dans un monde immense"
  },
  bloodborne: {
    name: "Bloodborne", icon: "droplet", genre: "Action-RPG · horreur gothique",
    pourToi: "tu préfères attaquer que parer, et l'horreur ne te fait pas peur"
  },
  sekiro: {
    name: "Sekiro", icon: "sword", genre: "Action · ninja au Japon féodal",
    pourToi: "tu aimes les duels au timing millimétré"
  },
  souls: {
    name: "Mix Souls", icon: "skull", genre: "Les 4 jeux FromSoftware mélangés",
    pourToi: "tu es prêt à mourir dans quatre univers différents"
  }
});

GAME_GROUPS.souls = { title: "Jeux Souls", games: ["darksouls", "eldenring", "bloodborne", "sekiro"], mix: "souls" };

Object.assign(ACTIVITY_BACKGROUNDS, {
  "quiz-darksouls": { icons: ["flame", "shield", "skull"], tint: "#f59e0b" },
  "quiz-eldenring": { icons: ["crown", "sun", "swords"], tint: "#eab308" },
  "quiz-bloodborne": { icons: ["droplet", "moon", "skull"], tint: "#b91c1c" },
  "quiz-sekiro": { icons: ["sword", "flame", "shield"], tint: "#dc2626" },
  "quiz-souls": { icons: ["skull", "flame", "sword"], tint: "#71717a" }
});

Object.assign(CULTURE_QUESTIONS, {
  darksouls: [
    {
      q: "Quel studio a développé Dark Souls ?",
      correct: "FromSoftware",
      wrong: ["Bandai Namco Studios", "Capcom", "Platinum Games"],
      fun: "Un studio japonais qui a inventé une nouvelle façon de souffrir."
    },
    {
      q: "Quel réalisateur a dirigé le premier Dark Souls ?",
      correct: "Hidetaka Miyazaki",
      wrong: ["Hideo Kojima", "Shigeru Miyamoto", "Yoko Taro"],
      fun: "Il a dit que les joueurs devaient surmonter l'échec pour mieux apprécier la victoire."
    },
    {
      q: "En quelle année Dark Souls est-il sorti ?",
      correct: "2011",
      wrong: ["2009", "2013", "2015"],
      fun: "Il est sorti il y a plus de dix ans, et on s'en souvient encore à chaque boss."
    },
    {
      q: "Comment s'appelle le royaume du premier Dark Souls ?",
      correct: "Lordran",
      wrong: ["Drangleic", "Lothric", "Boletaria"],
      fun: "Un royaume en ruines où chaque raccourci est une bénédiction."
    },
    {
      q: "Comment s'appellent les points de repos du jeu ?",
      correct: "Les feux de camp",
      wrong: ["Les autels", "Les lanternes", "Les cairns"],
      fun: "Se reposer fait revenir tous les ennemis. C'est le prix du confort."
    },
    {
      q: "Quel objet de soin se recharge à chaque feu de camp ?",
      correct: "La fiole d'Estus",
      wrong: ["La potion rouge", "L'éther", "Le baume de vie"],
      fun: "Une boisson dorée qui te sauve la vie, une gorgée à la fois."
    },
    {
      q: "Quel chevalier célèbre s'écrie « Praise the sun! » ?",
      correct: "Solaire d'Astora",
      wrong: ["Siegmeyer de Catarina", "Artorias", "Lautrec"],
      fun: "Le joueur qui lève les bras avec lui a déjà compris l'essentiel du jeu."
    },
    {
      q: "Quels boss affrontes-tu en duo à Anor Londo ?",
      correct: "Ornstein et Smough",
      wrong: ["Artorias et Sif", "Gwyn et Nito", "Seath et Gwyndolin"],
      fun: "Un beau chevalier et un énorme bourreau. Tu tues l'un, et l'autre s'énerve."
    },
    {
      q: "Quel personnage est le dernier boss du premier Dark Souls ?",
      correct: "Gwyn, Seigneur des Cendres",
      wrong: ["Manus", "Nito", "Seath"],
      fun: "Le combat dure peu, mais il a une atmosphère qu'on n'oublie pas."
    },
    {
      q: "Quelle est la monnaie du jeu, également utilisée pour monter de niveau ?",
      correct: "Les âmes",
      wrong: ["Les runes", "Les échos de sang", "Les pièces d'or"],
      fun: "Elles disparaissent à ta mort. Retourne vite les récupérer."
    },
    {
      q: "Quelle zone marécageuse est célèbre pour ses chutes de framerate ?",
      correct: "Blighttown",
      wrong: ["Anor Londo", "La Forteresse de Sen", "Les Catacombes"],
      fun: "On y descend longtemps, et on regrette à chaque marche."
    },
    {
      q: "Quelle est la zone d'introduction du premier jeu ?",
      correct: "Undead Asylum",
      wrong: ["Firelink Shrine", "Cemetery of Ash", "Chapel of Anticipation"],
      fun: "Le tutoriel te fait comprendre vite que tu es en difficulté."
    },
    {
      q: "Dans quel royaume se déroule Dark Souls II ?",
      correct: "Drangleic",
      wrong: ["Lordran", "Lothric", "Boletaria"],
      fun: "Un royaume que beaucoup trouvent trop vaste, et d'autres trop cruel."
    },
    {
      q: "Quel chevalier est surnommé « le Marcheur de l'Abîme » ?",
      correct: "Artorias",
      wrong: ["Ornstein", "Havel", "Solaire"],
      fun: "Un chevalier au bouclier large, et à la fin tragique."
    },
    {
      q: "Quel dragon sans écailles est à l'origine des cristaux ?",
      correct: "Seath l'Écailleux",
      wrong: ["Kalameet", "Nito", "Gwyndolin"],
      fun: "Il a trahi les siens pour percer le secret de l'immortalité. Mauvaise idée."
    },
    {
      q: "Quel message s'affiche à chaque mort du joueur ?",
      correct: "YOU DIED",
      wrong: ["GAME OVER", "TRY AGAIN", "YOU FAILED"],
      fun: "Ces deux mots rouges ont inspiré plus de mèmes que n'importe quelle cinématique."
    },
    {
      q: "Quel jeu de 2009 est considéré comme le précurseur de Dark Souls ?",
      correct: "Demon's Souls",
      wrong: ["Armored Core V", "Bloodborne", "Sekiro"],
      fun: "Il était exclusif à la PS3 et c'est lui qui a lancé la formule."
    },
    {
      q: "À quoi sert un signe d'invocation blanc ?",
      correct: "À appeler un autre joueur à l'aide",
      wrong: ["À se téléporter à un feu de camp", "À se soigner", "À vendre un objet"],
      fun: "Coopérer dans un jeu de souffrance : c'est la meilleure idée du jeu."
    },
    {
      q: "Quelle flamme les héros doivent-ils raviver ou laisser mourir ?",
      correct: "La Première Flamme",
      wrong: ["La Flamme Éternelle", "L'Âtre Sacré", "La Torche d'Ordre"],
      fun: "Un choix qui fait l'une des plus belles fins du jeu."
    },
    {
      q: "Quel statut a le héros du premier Dark Souls ?",
      correct: "Mort-vivant élu",
      wrong: ["Vampire", "Fantôme", "Démon"],
      fun: "Sa malédiction : mourir, encore, et encore, et encore."
    }
  ],

  eldenring: [
    {
      q: "En quelle année Elden Ring est-il sorti ?",
      correct: "2022",
      wrong: ["2020", "2021", "2023"],
      fun: "Février 2022 : plusieurs millions de joueurs ont perdu leur semaine de travail."
    },
    {
      q: "Quel écrivain a collaboré avec FromSoftware sur la mythologie du jeu ?",
      correct: "George R.R. Martin",
      wrong: ["J.R.R. Tolkien", "Brandon Sanderson", "Andrzej Sapkowski"],
      fun: "Il a écrit la mythologie, et on attend toujours le prochain tome de Game of Thrones."
    },
    {
      q: "Comment appelle-t-on le personnage du joueur ?",
      correct: "Sans-éclat",
      wrong: ["Les Déchus", "Les Maudits", "Les Élus"],
      fun: "Un Sans-éclat est quelqu'un qui a perdu la grâce, et pas seulement sa santé."
    },
    {
      q: "Comment s'appelle la monture spectrale du joueur ?",
      correct: "Torrent",
      wrong: ["Épona", "Agro", "Roach"],
      fun: "Le meilleur cheval du jeu vidéo, d'après une étude très sérieuse."
    },
    {
      q: "Quelle est la première région du jeu ?",
      correct: "Limgrave",
      wrong: ["Liurnia", "Caelid", "Altus"],
      fun: "Beaucoup s'y perdent, et c'est justement le but."
    },
    {
      q: "Quel boss est surnommé « Fell Omen » ?",
      correct: "Margit",
      wrong: ["Godrick", "Radahn", "Rennala"],
      fun: "Ton premier vrai mur. Tu t'en souviendras toute ta vie."
    },
    {
      q: "Quelle boss optionnelle est connue comme « Blade of Miquella » ?",
      correct: "Malenia",
      wrong: ["Rennala", "Ranni", "Fia"],
      fun: "Si tu l'as battue, tu mérites de te vanter pendant des mois."
    },
    {
      q: "Quel demi-dieu, surnommé « Starscourge », affronte-t-on dans une grande bataille à Caelid ?",
      correct: "Radahn",
      wrong: ["Mohg", "Godfrey", "Morgott"],
      fun: "Un festival de combat avec des invocations, dont certaines viennent d'autres joueurs."
    },
    {
      q: "Comment s'appelle l'immense arbre doré visible depuis presque partout ?",
      correct: "L'Arbre-Monde (Erdtree)",
      wrong: ["Yggdrasil", "L'Arbre Sacré", "L'Arbre de Vie"],
      fun: "Un arbre qui illumine tout le ciel, et ça annonce des ennuis."
    },
    {
      q: "Quelle reine est à l'origine du Brisement ?",
      correct: "Marika",
      wrong: ["Rennala", "Ranni", "Melina"],
      fun: "Elle a brisé l'Anneau d'Elden. Et on doit tout réparer."
    },
    {
      q: "Quelle extension est sortie en 2024 ?",
      correct: "Shadow of the Erdtree",
      wrong: ["Ashes of Ariandel", "The Old Hunters", "Crown of the Old Iron King"],
      fun: "Une extension aussi grande qu'un jeu complet, et aussi dure que prévu."
    },
    {
      q: "Quel boss, surnommé « l'Empaleur », est l'un des principaux ennemis de l'extension ?",
      correct: "Messmer",
      wrong: ["Radahn", "Mohg", "Maliketh"],
      fun: "Il a un serpent, un feu, et beaucoup de lances. Bonne chance."
    },
    {
      q: "Comment s'appelle la monnaie du jeu ?",
      correct: "Les runes",
      wrong: ["Les âmes", "Les échos de sang", "Les pièces"],
      fun: "Tu les perds si tu meurs, et il faut les récupérer là où tu es tombé."
    },
    {
      q: "Quelle demi-déesse à quatre bras est une sorcière de Liurnia ?",
      correct: "Ranni",
      wrong: ["Melina", "Fia", "Rennala"],
      fun: "Une quête qui ne se termine jamais de la façon qu'on attendait."
    },
    {
      q: "Quel personnage permet au joueur de monter de niveau ?",
      correct: "Melina",
      wrong: ["Fia", "Gideon", "Roderika"],
      fun: "Elle accepte de t'aider, mais elle a ses propres plans."
    },
    {
      q: "Comment s'appellent les points de repos dorés ?",
      correct: "Les Sites de Grâce",
      wrong: ["Les feux de camp", "Les lanternes", "Les autels"],
      fun: "Le jeu te guide avec leur lumière dorée, même quand tu es perdu."
    },
    {
      q: "Quel éditeur publie Elden Ring ?",
      correct: "Bandai Namco",
      wrong: ["Sony Interactive Entertainment", "Nintendo", "Capcom"],
      fun: "Le jeu est sorti sur PC et consoles, sans exclusivité."
    },
    {
      q: "Comment s'appelle le lieu qui sert de hub central ?",
      correct: "Roundtable Hold",
      wrong: ["Firelink Shrine", "Hunter's Dream", "Majula"],
      fun: "Un endroit où l'on croise des PNJ qui parlent en énigmes."
    },
    {
      q: "Que sont les Spirit Ashes (cendres d'esprit) ?",
      correct: "Des esprits invocables qui combattent à tes côtés",
      wrong: ["Des armes légendaires", "Des runes de soin", "Des montures"],
      fun: "Une armée de méduses ou de loups qui t'aident à vaincre les boss."
    },
    {
      q: "Quelle récompense Elden Ring a-t-il remportée aux Game Awards 2022 ?",
      correct: "Jeu de l'année",
      wrong: ["Meilleur jeu mobile", "Meilleur jeu de sport", "Meilleur jeu pour enfants"],
      fun: "Un prix largement mérité, selon la communauté."
    }
  ],

  bloodborne: [
    {
      q: "Sur quelle console Bloodborne est-il sorti, en exclusivité ?",
      correct: "PlayStation 4",
      wrong: ["Xbox One", "Nintendo Switch", "PC"],
      fun: "Les fans de PC attendent toujours une version sur leur machine."
    },
    {
      q: "En quelle année Bloodborne est-il sorti ?",
      correct: "2015",
      wrong: ["2013", "2016", "2018"],
      fun: "Un jeu qui a eu droit à des années de rumeurs sur une suite."
    },
    {
      q: "Comment s'appelle la ville gothique où se déroule le jeu ?",
      correct: "Yharnam",
      wrong: ["Lordran", "Leyndell", "Cainhurst"],
      fun: "Une ville avec des habitants qui ont bien trop peur de te laisser entrer."
    },
    {
      q: "Comment s'appelle le hub où le joueur se repose ?",
      correct: "Le Rêve du Chasseur",
      wrong: ["Le Camp du Chasseur", "Le Sanctuaire des Ombres", "Le Château Noir"],
      fun: "Un jardin paisible pour se reposer, quand on n'a pas la tête sous l'eau."
    },
    {
      q: "Quelle mécanique permet de regagner la santé perdue en contre-attaquant vite ?",
      correct: "Le Rally",
      wrong: ["Le Parry", "L'Estus", "La régénération passive"],
      fun: "Le jeu te pousse à attaquer, pas à te cacher."
    },
    {
      q: "Comment appelle-t-on les armes qui changent de forme ?",
      correct: "Les Trick Weapons",
      wrong: ["Les armes sacrées", "Les armes de grâce", "Les armes runiques"],
      fun: "Une canne qui devient un fouet, ou une hache qui devient une lance."
    },
    {
      q: "Quelle est la monnaie du jeu ?",
      correct: "Les échos de sang",
      wrong: ["Les âmes", "Les runes", "Les pièces d'or"],
      fun: "Le sang est autant une monnaie qu'un thème."
    },
    {
      q: "Quel est le premier boss rencontré ?",
      correct: "La Bête Clerc",
      wrong: ["Vicaire Amelia", "Rom", "Ludwig"],
      fun: "Une bête gigantesque, qui t'apprend qu'esquiver n'est pas une option."
    },
    {
      q: "Quelle extension majeure est sortie fin 2015 ?",
      correct: "The Old Hunters",
      wrong: ["Ashes of Ariandel", "The Painted World", "Shadow of the Erdtree"],
      fun: "Elle ajoute des boss plus durs que ceux du jeu de base."
    },
    {
      q: "Que représente l'Insight (perspicacité) ?",
      correct: "La capacité à percevoir des choses cachées",
      wrong: ["Une réserve de balles", "L'endurance", "La santé maximale"],
      fun: "Plus tu en as, plus tu vois de choses. Et plus il y a de choses à craindre."
    },
    {
      q: "Quel auteur d'horreur cosmique inspire l'univers du jeu ?",
      correct: "H.P. Lovecraft",
      wrong: ["Stephen King", "Edgar Allan Poe", "Mary Shelley"],
      fun: "Des dieux anciens, des yeux partout et un seul avenir : la folie."
    },
    {
      q: "Comment s'appelle la compagne du Rêve du Chasseur qui t'aide à monter de niveau ?",
      correct: "La Poupée",
      wrong: ["Lady Maria", "Iosefka", "Annalise"],
      fun: "Elle est calme, elle est douce, et elle ne bouge presque pas."
    },
    {
      q: "Quel vieux chasseur est ton guide dans le Rêve du Chasseur ?",
      correct: "Gehrman, le Premier Chasseur",
      wrong: ["Ludwig", "Djura", "Alfred"],
      fun: "Il est toujours dans son fauteuil, et il sait plus de choses qu'il n'en dit."
    },
    {
      q: "Quel est le rôle principal du pistolet dans Bloodborne ?",
      correct: "Étourdir l'ennemi pour riposter",
      wrong: ["Infliger le plus de dégâts", "Tuer à distance", "Ouvrir les portes"],
      fun: "Tirer au bon moment, c'est l'équivalent de la parade dans les autres Souls."
    },
    {
      q: "Comment s'appellent les donjons générés aléatoirement ?",
      correct: "Les Donjons du Calice",
      wrong: ["Les Cryptes du Rêve", "Les Catacombes d'Ombre", "Les Labyrinthes d'Os"],
      fun: "Des heures de jeu en plus, avec un seul but : trouver plus de sang."
    },
    {
      q: "Quel est le boss final de l'extension The Old Hunters ?",
      correct: "L'Orphelin de Kos",
      wrong: ["Ludwig", "Lady Maria", "Laurence"],
      fun: "Un des boss les plus emblématiques et les plus redoutés de la série."
    },
    {
      q: "Comment appelle-t-on les entités cosmiques de l'univers ?",
      correct: "Les Grands (Great Ones)",
      wrong: ["Les Anciens Dieux", "Les Pâles", "Les Primordiaux"],
      fun: "On ne comprend pas leurs plans, et on a peur de les comprendre."
    },
    {
      q: "Qui a dirigé Bloodborne ?",
      correct: "Hidetaka Miyazaki",
      wrong: ["Hideo Kojima", "Shigeru Miyamoto", "Yoko Taro"],
      fun: "Il a dit qu'il voulait un jeu inspiré par ses lectures d'horreur d'enfance."
    },
    {
      q: "Combien de fins principales Bloodborne propose-t-il ?",
      correct: "Trois",
      wrong: ["Deux", "Cinq", "Sept"],
      fun: "Dont une où tu deviens un nourrisson cosmique. Rien que ça."
    },
    {
      q: "Quel rôle joue le héros du jeu ?",
      correct: "Chasseur",
      wrong: ["Sorceleur", "Sans-éclat", "Mort-vivant"],
      fun: "La nuit de la chasse est longue, et la bête, c'est peut-être toi."
    }
  ],

  sekiro: [
    {
      q: "En quelle année Sekiro: Shadows Die Twice est-il sorti ?",
      correct: "2019",
      wrong: ["2017", "2018", "2020"],
      fun: "Un jeu qui a prouvé que FromSoftware savait faire autre chose que des Souls."
    },
    {
      q: "Quel éditeur a publié Sekiro ?",
      correct: "Activision",
      wrong: ["Bandai Namco", "Sony Interactive Entertainment", "Capcom"],
      fun: "Pas Bandai Namco, cette fois-ci. Une exception dans leur catalogue."
    },
    {
      q: "Dans quel contexte historique se déroule le jeu ?",
      correct: "Le Japon de l'ère Sengoku",
      wrong: ["Le Japon de l'ère Edo", "Le Japon de l'ère Meiji", "La Chine des Trois Royaumes"],
      fun: "Un Japon féodal avec des moines, des démons et des singes géants."
    },
    {
      q: "Que signifie le nom « Sekiro » ?",
      correct: "Le loup manchot",
      wrong: ["Le fantôme noir", "L'épée solitaire", "Le dernier ninja"],
      fun: "Il lui manque un bras, et le jeu s'en sert à merveille."
    },
    {
      q: "Quel personnage doit être protégé par Sekiro ?",
      correct: "Kuro, l'héritier divin",
      wrong: ["Genichiro", "Emma", "Owl"],
      fun: "Un jeune seigneur à protéger, et un shinobi qui l'a juré."
    },
    {
      q: "Quelle jauge faut-il briser pour porter un coup mortel ?",
      correct: "La posture",
      wrong: ["La stamina", "La santé uniquement", "Le sang"],
      fun: "On gagne en étant agressif, pas en reculant."
    },
    {
      q: "Quel objet permet de se soigner dans Sekiro ?",
      correct: "La gourde de guérison",
      wrong: ["La fiole d'Estus", "Les fioles de sang", "Les herbes médicinales"],
      fun: "Une gourde qui se recharge, et qui a peut-être sauvé ta partie."
    },
    {
      q: "Quel objet remplace le bras perdu de Sekiro ?",
      correct: "Une prothèse de shinobi",
      wrong: ["Un bras fantôme", "Un gantelet d'Ashina", "Un bras de bois sacré"],
      fun: "Un grappin, un feu d'artifice, une hache : un couteau suisse pour ninja."
    },
    {
      q: "Comment s'appelle la maladie causée par les résurrections ?",
      correct: "La pourriture du dragon",
      wrong: ["La peste rouge", "La brûlure de l'âme", "La malédiction du loup"],
      fun: "Chaque mort a un prix, et d'autres paient pour toi."
    },
    {
      q: "Quel vieux maître, surnommé le Saint de l'épée, est un boss du jeu ?",
      correct: "Isshin Ashina",
      wrong: ["Genichiro", "Owl", "Gyoubu"],
      fun: "Un combat épique, dont on parle encore des années après."
    },
    {
      q: "Qui est le père adoptif de Sekiro ?",
      correct: "La Chouette (Owl)",
      wrong: ["Isshin", "Emma", "Kuro"],
      fun: "Un père qui t'a formé, et qui a ses propres secrets."
    },
    {
      q: "Quelle récompense Sekiro a-t-il remportée aux Game Awards 2019 ?",
      correct: "Jeu de l'année",
      wrong: ["Meilleur jeu mobile", "Meilleur jeu de course", "Meilleur jeu pour enfants"],
      fun: "Un jeu très dur, et récompensé comme le meilleur de l'année."
    },
    {
      q: "Que peut faire Sekiro après sa mort ?",
      correct: "Se ressusciter une fois",
      wrong: ["Se téléporter", "Voler", "Se dupliquer"],
      fun: "La mort n'est pas une fin, mais ce n'est pas gratuit non plus."
    },
    {
      q: "Quel clan règne sur la région d'Ashina ?",
      correct: "Le clan Ashina",
      wrong: ["Le clan Takeda", "Le clan Oda", "Le clan Tokugawa"],
      fun: "Un clan qui perd du terrain, et qui est prêt à tout pour le garder."
    },
    {
      q: "Quel est le Gardien Singe, boss du jeu ?",
      correct: "Un énorme singe aveugle",
      wrong: ["Un tigre fantôme", "Un moine démon", "Un serpent des marais"],
      fun: "Il lui manque la tête dans la deuxième phase. Ça n'arrange rien."
    },
    {
      q: "Où Sekiro se repose-t-il et améliore-t-il sa prothèse ?",
      correct: "Les Idoles du Sculpteur",
      wrong: ["Les feux de camp", "Le Rêve du Chasseur", "Les Sites de Grâce"],
      fun: "Un sculpteur de bouddhas qui t'accueille dans son temple à demi en ruines."
    },
    {
      q: "Quelle est l'arme principale de Sekiro ?",
      correct: "Un katana",
      wrong: ["Une naginata", "Une lance de guerre", "Une kusarigama"],
      fun: "Une seule arme, mais une infinité de façons de s'en servir."
    },
    {
      q: "Quelle action permet de briser la posture adverse ?",
      correct: "La parade au bon moment",
      wrong: ["L'esquive en roulade", "Le saut seulement", "Le blocage maintenu"],
      fun: "Ce jeu est un duo de bruits métalliques, et c'est très agréable."
    },
    {
      q: "Combien de fins principales Sekiro propose-t-il ?",
      correct: "Quatre",
      wrong: ["Deux", "Trois", "Six"],
      fun: "Chaque fin dépend d'un choix de loyauté ou d'honneur."
    },
    {
      q: "Quel est le métier d'Emma ?",
      correct: "Médecin",
      wrong: ["Sculptrice", "Prêtresse", "Marchande"],
      fun: "Elle soigne les blessures du corps, mais pas celles de l'âme."
    }
  ]
});
