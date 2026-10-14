/* ============================================================
   VERBUM — Le Cabinet des Trésors (galerie contemplative)
   Données + rendu + lightbox (modale-frise)
   ============================================================ */
(function () {
  "use strict";

  const tresors = [
    { image: "assets/images/rouleau-esaie-table.jpg", titre: "Le grand rouleau d'Ésaïe", legende: "7,34 mètres de parchemin, copiés vers −125 — le plus long manuscrit biblique complet retrouvé.", galerie: { href: "galeries/qumran.html", texte: "Galerie III — Qumrân" } },
    { image: "assets/images/p52-fragment.jpg", titre: "P52 — le plus ancien fragment du Nouveau Testament", legende: "Un carton de carte de visite, vers 125-150 : Jean 18 en grec, écrit en Égypte.", galerie: { href: "galeries/codex-grecs.html", texte: "Galerie IV — Les Grands Codex Grecs" } },
    { image: "assets/images/stele-mesha.jpg", titre: "La stèle de Mésha", legende: "Le basalte noir de Moab nomme le roi Omri — et les vases de Jéhovah.", galerie: { href: "galeries/preuves.html", texte: "Galerie IX — Preuves Archéologiques" } },
    { image: "assets/images/bible-42-lignes.jpg", titre: "La Bible de Gutenberg", legende: "1455 : initiales peintes à la main, rouge et or sur vélin — 48 exemplaires survivent.", galerie: { href: "galeries/gutenberg.html", texte: "Galerie VIII — Gutenberg" } },
    { image: "assets/images/grotte-interieure.jpg", titre: "La cachette de Qumrân", legende: "La grotte qui a gardé le silence deux millénaires avant de livrer ses jarres.", galerie: { href: "galeries/qumran.html", texte: "Galerie III — Qumrân" } },
    { image: "assets/images/chercheurs-multispectral.jpg", titre: "La lumière de Glasgow", legende: "L'imagerie multispectrale qui ressuscite les pages illisibles du Codex H.", galerie: { href: "galeries/codex-h.html", texte: "Galerie V — Codex H" } },

    { image: "assets/images/rouleaux-argent-deroules.jpg", titre: "Les rouleaux d'argent de Ketef Hinnom", legende: "Gravés vers −1250 : la bénédiction de Nombres 6, le plus ancien fragment biblique du monde.", galerie: { href: "galeries/origines.html", texte: "Galerie I — Les Origines" } },
    { image: "assets/images/mer-morte-aube.jpg", titre: "La mer Morte à l'aube", legende: "Le miroir de sel où dorment les manuscrits depuis le Ier siècle.", galerie: { href: "galeries/qumran.html", texte: "Galerie III — Qumrân" } },
    { image: "assets/images/codex-sinaiticus.jpg", titre: "Le Codex Sinaïticus", legende: "Vers 330 : le plus ancien Nouveau Testament complet, arraché à l'oubli par Tischendorf.", galerie: { href: "galeries/codex-grecs.html", texte: "Galerie IV — Les Grands Codex Grecs" } },
    { image: "assets/images/codex-vaticanus.jpg", titre: "Le Codex Vaticanus", legende: "L'un des deux géants du IVe siècle, gardé à la bibliothèque vaticane.", galerie: { href: "galeries/codex-grecs.html", texte: "Galerie IV — Les Grands Codex Grecs" } },
    { image: "assets/images/vitrine-alep.jpg", titre: "Le Codex d'Alep", legende: "La référence du texte hébreu — 195 feuillets sauvés des flammes en 1947.", galerie: { href: "galeries/copistes.html", texte: "Galerie II — Les Copistes" } },
    { image: "assets/images/codex-leningradensis.jpg", titre: "Le Codex de Leningrad", legende: "1008 : la copie complète la plus ancienne de la Bible hébraïque, base de la BHS.", galerie: { href: "galeries/copistes.html", texte: "Galerie II — Les Copistes" } },

    { image: "assets/images/massorete-tiberiade.jpg", titre: "Le massorète de Tibériade", legende: "Chaque lettre comptée, chaque voyelle notée : la discipline qui a figé le texte hébreu.", galerie: { href: "galeries/copistes.html", texte: "Galerie II — Les Copistes" } },
    { image: "assets/images/scribe-hebreu.jpg", titre: "Le geste du scribe", legende: "La plume, le calame, la patience : mille ans de transmission manuscrite.", galerie: { href: "galeries/copistes.html", texte: "Galerie II — Les Copistes" } },
    { image: "assets/images/moise-loi.jpg", titre: "Moïse et la Loi", legende: "Le commencement du fil : la Torah écrite, transmise, lue, commentée.", galerie: { href: "galeries/origines.html", texte: "Galerie I — Les Origines" } },
    { image: "assets/images/stele-merneptah.jpg", titre: "La stèle de Merneptah", legende: "−1208 : la première fois que le nom d'Israël apparaît hors de la Bible.", galerie: { href: "galeries/preuves.html", texte: "Galerie IX — Preuves Archéologiques" } },
    { image: "assets/images/cylindre-cyrus.jpg", titre: "Le cylindre de Cyrus", legende: "539 : le décret d'argile qui prépare le retour d'exil raconté par Esdras.", galerie: { href: "galeries/preuves.html", texte: "Galerie IX — Preuves Archéologiques" } },
    { image: "assets/images/inscription-pilate.jpg", titre: "L'inscription de Pilate", legende: "« Pontius Pilatus, praefectus Iudaeae » — le gouverneur des Évangiles en pierre.", galerie: { href: "galeries/preuves.html", texte: "Galerie IX — Preuves Archéologiques" } },

    { image: "assets/images/septante.jpg", titre: "Les 72 de Pharos", legende: "La Loi devient grecque : la traduction qui ouvrira la Bible au monde.", galerie: { href: "galeries/traductions.html", texte: "Galerie VII — Les Grandes Traductions" } },
    { image: "assets/images/jerome-vulgate.jpg", titre: "Jérôme à Bethléem", legende: "392-405 : la Vulgate naît dans une cellule, à la lumière d'une lampe.", galerie: { href: "galeries/traductions.html", texte: "Galerie VII — Les Grandes Traductions" } },
    { image: "assets/images/luther.jpg", titre: "La presse de Luther", legende: "1522 : le Nouveau Testament en allemand en onze semaines.", galerie: { href: "galeries/traductions.html", texte: "Galerie VII — Les Grandes Traductions" } },
    { image: "assets/images/nag-hammadi.jpg", titre: "La jarre de Nag Hammadi", legende: "1945 : treize codex cachés depuis seize siècles sortent de la terre d'Égypte.", galerie: { href: "galeries/apocryphes.html", texte: "Galerie VI — Les Textes Apocryphes" } },
    { image: "assets/images/genizah-caire.jpg", titre: "La Genizah du Caire", legende: "Ce que les hommes voulaient protéger de l'oubli, la poussière l'a gardé.", galerie: { href: "galeries/copistes.html", texte: "Galerie II — Les Copistes" } },
    { image: "assets/images/hero-destructions.jpg", titre: "La Bible parmi les braises", legende: "Dioclétien, l'Index, l'URSS : chaque attaque a laissé une preuve de survie.", galerie: { href: "galeries/destructions.html", texte: "Galerie X — La Bible résiste" } }
  ];

  const grille = document.getElementById("grille-tresors");
  const modale = document.getElementById("modale-frise");
  if (!grille || !modale) return;
  const contenu = modale.querySelector(".modale-contenu");
  let indexCourant = 0;

  function ouvrir(i) {
    indexCourant = (i + tresors.length) % tresors.length;
    const t = tresors[indexCourant];
    contenu.innerHTML = `
      <button class="modale-fermer" aria-label="Fermer">&times;</button>
      <div class="modale-visuel"><img src="${t.image}" alt="${t.titre}"></div>
      <div class="modale-corps">
        <div class="modale-entete"><span class="modale-date">Cabinet des Trésors</span></div>
        <h3>${t.titre}</h3>
        <p class="modale-resume">${t.legende}</p>
        <a class="lien-galerie-jalon" href="${t.galerie.href}">${t.galerie.texte} →</a>
        <div class="modale-jalon-nav">
          <button type="button" data-nav="precedent">← Précédent</button>
          <button type="button" data-nav="suivant">Suivant →</button>
        </div>
      </div>`;
    contenu.querySelector(".modale-fermer").addEventListener("click", fermer);
    contenu.querySelector("[data-nav='precedent']").addEventListener("click", () => ouvrir(indexCourant - 1));
    contenu.querySelector("[data-nav='suivant']").addEventListener("click", () => ouvrir(indexCourant + 1));
    modale.classList.add("ouverte");
    modale.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modale.querySelector(".modale-fermer").focus();
  }

  function fermer() {
    modale.classList.remove("ouverte");
    modale.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modale.addEventListener("click", (e) => { if (e.target === modale) fermer(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modale.classList.contains("ouverte")) fermer();
    if (!modale.classList.contains("ouverte")) return;
    if (e.key === "ArrowRight") ouvrir(indexCourant + 1);
    if (e.key === "ArrowLeft") ouvrir(indexCourant - 1);
  });

  grille.innerHTML = tresors.map((t, i) => `
    <figure class="tresor-item" tabindex="0" role="button" data-index="${i}" aria-label="Agrandir : ${t.titre}">
      <img src="${t.image}" alt="${t.titre}" loading="lazy" width="800" height="600">
      <figcaption>
        <h4>${t.titre}</h4>
        <p>${t.legende}</p>
      </figcaption>
    </figure>`).join("");

  grille.querySelectorAll(".tresor-item").forEach((item) => {
    item.addEventListener("click", () => ouvrir(parseInt(item.dataset.index, 10)));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        ouvrir(parseInt(item.dataset.index, 10));
      }
    });
  });
})();
