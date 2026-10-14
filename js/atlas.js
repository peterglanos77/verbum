/* ==========================================================================
   VERBUM — Atlas des Textes : cartes interactives
   Clic / clavier sur les points d'or → panneau d'information.
   ========================================================================== */
(function () {
  'use strict';

  /* ==================== DONNÉES ==================== */

  var LIEUX = {
    /* ---------- Carte 1 : le monde des manuscrits ---------- */
    'rome': {
      date: 'I<sup>er</sup> – V<sup>e</sup> s. · Italie',
      titre: 'Rome',
      texte: "Capitale de l'Empire, plaque tournante des premières communautés chrétiennes. La <strong>Vulgate</strong> de Jérôme (392-405) naît dans son orbite ; la <strong>Bible de Gutenberg</strong> (1455) reprend justement la Vulgate romaine. Le papyrus <strong>P52</strong>, plus ancien fragment du Nouveau Testament, a circulé dans cet empire-là.",
      lien: 'galeries/gutenberg.html', lienLabel: 'La galerie Gutenberg'
    },
    'sainte-baume': {
      date: 'Tradition · Provence',
      titre: 'Sainte-Baume',
      texte: "Selon la <strong>tradition</strong>, Marie-Madeleine aborde les côtes de Provence et vit en ermite dans la grotte de la Sainte-Baume. Le musée respecte cette tradition <strong>comme tradition</strong> — jamais comme témoignage. La distinction est la règle n° 2 du musée.",
      lien: 'galeries/marie-madeleine.html', lienLabel: 'Le Dossier Marie-Madeleine'
    },
    'corinthe': {
      date: 'I<sup>er</sup> s. · Grèce',
      titre: 'Corinthe',
      texte: "Port cosmopolite où Paul écrit ses lettres aux Corinthiens vers 55 ap. J.-C. La ville est l'un des laboratoires du christianisme grec — la langue dans laquelle le Nouveau Testament sera écrit.",
      lien: 'galeries/paul.html', lienLabel: 'Le Dossier Paul'
    },
    'ephese': {
      date: 'I<sup>er</sup> – II<sup>e</sup> s. · Asie Mineure',
      titre: 'Éphèse',
      texte: "Grande métropole d'Asie Mineure. Traditionnellement liée aux dernières années de Jean, et proche des lieux où circulent les plus anciens manuscrits chrétiens. La bibliothèque d'Éphèse comptait parmi les plus grandes de l'Empire.",
      lien: 'galeries/codex-grecs.html', lienLabel: 'Les Codex Grecs'
    },
    'antioche': {
      date: 'I<sup>er</sup> – V<sup>e</sup> s. · Syrie',
      titre: 'Antioche',
      texte: "Troisième ville de l'Empire, berceau du christianisme syriaque. La <strong>Peshitta</strong>, la Bible syriaque, se fixe ici autour du V<sup>e</sup> siècle — l'une des versions les plus fidèles à l'hébreu.",
      lien: 'galeries/traductions.html', lienLabel: 'La galerie des Traductions'
    },
    'jerusalem': {
      date: 'av. −1250 · −586 · 70 · 135',
      titre: 'Jérusalem',
      texte: "Le centre de gravité. De la bénédiction sacerdotale gravée (<strong>Ketef Hinnom, −1250</strong>) à la destruction du Temple en 586, puis en 70, puis à la révolte de Bar Kokhba (135) : chaque chute disperse des textes — et les sauve, paradoxalement. La <strong>Septante</strong> y est commandée vers −250.",
      lien: 'galeries/origines.html', lienLabel: 'I. Les Origines'
    },
    'qumran': {
      date: '1947 · désert de Juda',
      titre: 'Qumrân',
      texte: "Onze grottes, environ <strong>900 manuscrits</strong>, le Rouleau d'Ésaïe complet (vieux de ~2 200 ans), et le seul exemplaire du <strong>Rouleau de cuivre</strong>. La plus grande découverte de manuscrits de tous les temps — détaillée sur la carte 2.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },
    'alexandrie': {
      date: 'av. −250 · III<sup>e</sup> s.',
      titre: 'Alexandrie',
      texte: "La ville du Pharos et de la Grande Bibliothèque. Vers −250, la <strong>Septante</strong>, première traduction grecque de l'hébreu, y naît pour la communauté juive d'Égypte. C'est là que sont retrouvés les papyrus <strong>P46</strong> (Paul) et les <strong>códices de Nag Hammadi</strong>.",
      lien: 'galeries/origines.html', lienLabel: 'I. Les Origines'
    },
    'babylone': {
      date: 'av. −586 · −539',
      titre: 'Babylone',
      texte: "L'exil. En 586 av. J.-C., le Temple tombe, l'élite part pour Babylone — et c'est là que le texte hébreu se rassemble, se commente, se transmet. En 539, <strong>Cyrus</strong> ouvre les portes. Le psaume 137 (« Au bord des fleuves de Babylone ») garde la mémoire des larmes.",
      lien: 'galeries/origines.html', lienLabel: 'I. Les Origines'
    },
    'ecbatane': {
      date: 'av. −539 · VI<sup>e</sup> s. av. J.-C.',
      titre: 'Ecbatane',
      texte: "Capitale d'été mède puis perse, citée dans le livre d'Esdras : c'est à Ecbatane qu'Artaxerxès aurait retrouvé le rouleau du décret de <strong>Cyrus</strong>. Un fil discret entre l'archéologie perse et la mémoire biblique.",
      lien: 'galeries/preuves.html', lienLabel: 'IX. Les Preuves'
    },
    'echmiadzin': {
      date: '405 · Arménie',
      titre: 'Echmiadzin',
      texte: "Siège de l'Église apostolique arménienne. En 405, <strong>Mesrop Mashtots</strong> invente l'alphabet arménien pour traduire la Bible : la version arménienne, surnommée la « reine des traductions », est l'une des plus exactes de l'histoire.",
      lien: 'galeries/traductions.html', lienLabel: 'VII. Les Traductions'
    },

    /* ---------- Carte 2 : Qumrân ---------- */
    'village': {
      date: 'av. −150 · 68 ap. J.-C.',
      titre: 'Khirbet Qumrân',
      texte: "Le village des sectaires : bassins rituels, scriptorium, tour, cimetière de 1 100 tombes. La communauté vit dans une exigence d'une pureté extrême — et écrit. En 68 ap. J.-C., les Romains détruisent le site ; les rouleaux resteront dans les grottes jusqu'en 1947.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },
    'grotte1': {
      date: '1947 · la découverte',
      titre: 'Grotte 1',
      texte: "C'est ici que tout commence : sept grands rouleaux, dont le <strong>Rouleau d'Ésaïe complet</strong> (1A, ~2 200 ans), la <strong>Règle de la Communauté</strong>, et le <strong>Commentaire d'Habacuc</strong>. Vendus au métropolite Athanase, ils atteindront le Musée d'Israël.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },
    'grotte2': {
      date: '1952',
      titre: 'Grotte 2',
      texte: "Une trentaine de manuscrits : rouleaux bibliques, textes halakhiques, un apocryphe du Pentateuque. Les fragments confirment que la grotte 1 n'était pas un cas isolé — le désert est plein de textes.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },
    'grotte3': {
      date: '1952 · le métal',
      titre: 'Grotte 3',
      texte: "Elle livre le seul manuscrit de la mer Morte écrit sur <strong>cuivre</strong> : le <strong>Rouleau de cuivre</strong>, inventaire de trésors cachés — dont le fameux trésor de Manué, qui ne s'est jamais retrouvé. Deux métaux, deux défis de déchiffrement.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },
    'grotte4': {
      date: '1952-1956 · la plus grande',
      titre: 'Grotte 4',
      texte: "La grotte des trésors : environ <strong>15 000 fragments</strong>, plus de 500 manuscrits — dont le <strong>Rouleau du Temple</strong>, le plus long de tous (~8 m). C'est la bibliothèque entière d'une communauté : Écritures, commentaires, règles, hymnes.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },
    'grotte11': {
      date: '1956 · le Psautier',
      titre: 'Grotte 11',
      texte: "Elle livre le <strong>Psaumier</strong> presque complet, le <strong>Lévitique targum</strong> (plus ancienne traduction araméenne) et le <strong>Temple Scroll</strong> acquis par Yigael Yadin. La grotte 11 fut longtemps gardée par les bédouins — jusqu'au bout.",
      lien: 'galeries/qumran.html', lienLabel: 'III. Les Manuscrits du Désert'
    },

    /* ---------- Carte 3 : route des traductions ---------- */
    'r-jerusalem': {
      date: 'av. −450 · hébreu & araméen',
      titre: 'Jérusalem — la source',
      texte: "Les textes hébreux se fixent progressivement après l'exil ; l'araméen devient la langue du quotidien. Les <strong>Targums</strong>, traductions araméennes orales puis écrites, naissent de ce bilinguisme.",
      lien: 'galeries/origines.html', lienLabel: 'I. Les Origines'
    },
    'r-alexandrie': {
      date: 'av. −250 · grec (koine)',
      titre: 'Alexandrie — la Septante',
      texte: "Première traduction de la Bible hébraïque en grec, commandée pour les Juifs d'Égypte. La légende des <strong>72 traducteurs</strong> (Lettre d'Aristée) prétend à l'inspiration : « sans la moindre retouche ». La Bible de Cléopâtre et le Vaticanus sortent de cette tradition.",
      lien: 'galeries/origines.html', lienLabel: 'I. Les Origines'
    },
    'r-edesse': {
      date: 'II<sup>e</sup> s. · syriaque',
      titre: 'Édesse — la Peshitta',
      texte: "La <strong>Peshitta</strong> (« simple ») est la Bible syriaque, proche de l'hébreu et de la Septante. Manuscrits de garde en cuir marron : l'aspect « fidèle » de la tradition orientale.",
      lien: 'galeries/traductions.html', lienLabel: 'VII. Les Traductions'
    },
    'r-rome': {
      date: '392-405 · latin (Vulgate)',
      titre: 'Rome — la Vulgate de Jérôme',
      texte: "Jérôme traduit la Bible en latin à partir de l'<strong>hébreu original</strong>, pas de la Septante — révolution critique. Une traduction fait l'objet d'un procès en hérésie : ce sera la nôtre, la Vulgate, qui dominera mille ans.",
      lien: 'galeries/traductions.html', lienLabel: 'VII. Les Traductions'
    },
    'r-echmiadzin': {
      date: '405 · arménien',
      titre: 'Echmiadzin — la reine des traductions',
      texte: "Pour traduire les Écritures, <strong>Mesrop Mashtots</strong> invente un alphabet : 36 lettres à l'origine. La Bible arménienne est réputée pour sa fidélité aux originaux grecs et syriaques.",
      lien: 'galeries/traductions.html', lienLabel: 'VII. Les Traductions'
    },
    'r-axoum': {
      date: 'IV<sup>e</sup> s. · guèze',
      titre: "Axoum — l'Éthiopie",
      texte: "La Bible éthiopienne (guèze) est la seule à compter <strong>Henokh</strong> (Hénoch) dans son canon — un apocryphe pour tous les autres, un Écrit pour l'Église d'Éthiopie. Le canon biblique n'a pas la même carte partout.",
      lien: 'galeries/apocryphes.html', lienLabel: 'VI. Les Apocryphes'
    },
    'r-moravie': {
      date: '863 · slavon',
      titre: 'Moravie — les Slaves',
      texte: "Les frères <strong>Cyrille et Méthode</strong> traduisent la Bible en slavon et inventent l'alphabet glagolitique. La mission morave de 863 ouvre la route des langues slaves — jusqu'au russe, au bulgare, au serbe.",
      lien: 'galeries/traductions.html', lienLabel: 'VII. Les Traductions'
    },
    'r-maurienne': {
      date: 'VI<sup>e</sup>-VII<sup>e</sup> s.',
      titre: 'Saint-Jean-de-Maurienne — Codex H',
      texte: "La cathédrale de Maurienne conserve le <strong>Codex H</strong> (PA 6, Paris VI<sup>e</sup> s.), l'actuelle actualité 2026 : 42 pages de l'Ancien et du Nouveau Testament, jamais publiées, sans textes inédits pour autant.",
      lien: 'galeries/codex-h.html', lienLabel: 'V. Le Codex H'
    },
    'r-paris': {
      date: '1535 · 1880 · français',
      titre: 'Paris — la Bible française',
      texte: "<strong>Olivétan</strong> publie la première Bible française complète (1535) ; la <strong>Seminary</strong> puis la <strong>Segond</strong> (1880) fixent le français biblique moderne. La route a traversé les Alpes — et les siècles.",
      lien: 'galeries/traductions.html', lienLabel: 'VII. Les Traductions'
    }
  };

  /* ==================== PANNEAUX ==================== */

  function panneauPour(idMarqueur) {
    if (idMarqueur.indexOf('r-') === 0) return 'panneau-route';
    if (idMarqueur.indexOf('grotte') === 0 || idMarqueur === 'village') return 'panneau-qumran';
    return 'panneau-monde';
  }

  function remplirPanneau(id) {
    var info = LIEUX[id];
    if (!info) return;
    var panneau = document.getElementById(panneauPour(id));
    if (!panneau) return;
    panneau.innerHTML =
      '<div class="panneau-date">' + info.date + '</div>' +
      '<h3 class="panneau-titre">' + info.titre + '</h3>' +
      '<p class="panneau-texte">' + info.texte + '</p>' +
      '<a class="panneau-lien" href="' + info.lien + '">' + info.lienLabel +
      ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>';
    panneau.classList.add('panneau-actif');
  }

  /* ==================== INTERACTIONS ==================== */

  var marqueurs = document.querySelectorAll('.marqueur');
  Array.prototype.forEach.call(marqueurs, function (m) {
    m.addEventListener('click', function () {
      Array.prototype.forEach.call(marqueurs, function (x) { x.classList.remove('actif'); });
      m.classList.add('actif');
      remplirPanneau(m.getAttribute('data-lieu'));
    });
    m.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        m.click();
      }
    });
    m.addEventListener('mouseenter', function () { m.classList.add('survol'); });
    m.addEventListener('mouseleave', function () { m.classList.remove('survol'); });
  });

  /* Premier panneau pré-rempli : Jérusalem (carte 1) */
  var premier = document.querySelector('.marqueur[data-lieu="jerusalem"]');
  if (premier) {
    premier.classList.add('actif');
    remplirPanneau('jerusalem');
  }
})();
