/* ============================================================
   VERBUM — Le Glossaire Vivant (données + recherche + filtre A-Z)
   ============================================================ */
(function () {
  "use strict";

  const termes = [
    { mot: "Amulette", origine: "du latin amuletum", definition: "Petit objet porté sur soi pour protéger. Les deux amulettes d'argent de Ketef Hinnom (≈ −1250) portent la plus ancienne bénédiction biblique connue.", galerie: "galeries/origines.html" },
    { mot: "Apocryphe", origine: "du grec apokruphos — « caché »", definition: "Texte qui se présente comme biblique mais n'a pas été retenu dans le canon (Évangile de Thomas, de Judas, d'Hénoch…). Le musée les signale toujours avec leur badge rouge.", galerie: "galeries/apocryphes.html" },
    { mot: "Canon", origine: "du grec kanôn — « règle »", definition: "La liste des livres reconnus comme Écriture sainte. Le Nouveau Testament compte 27 livres, listés dès Athanase (367).", galerie: "galeries/apocryphes.html" },
    { mot: "Codex", origine: "du latin codex — « tablette de bois »", definition: "Livre à feuillets reliés, ancêtre du livre moderne. Apparu aux premiers siècles, il remplace le rouleau.", galerie: "galeries/codex-grecs.html" },
    { mot: "Colophon", origine: "du grec kolophōn — « sommet »", definition: "Note finale d'un manuscrit ou d'un livre imprimé : date, copiste, lieu. Un témoin direct de l'histoire du document.", galerie: "galeries/gutenberg.html" },
    { mot: "Datation au carbone 14", origine: "méthode scientifique", definition: "Mesure de la radioactivité du carbone organique pour dater un matériau. Utilisée sur le Codex H (résultat : VIe siècle, confirmé à la Sorbonne).", galerie: "galeries/codex-h.html" },
    { mot: "Hexaples", origine: "du grec hexapla — « six colonnes »", definition: "L'œuvre d'Origène (≈ 240) : hébreu, translittération et quatre versions grecques alignées. Le premier appareil comparatif de l'histoire.", galerie: "galeries/traductions.html" },
    { mot: "Hénoch", origine: "nom propre hébreu — Ḥanokh", definition: "Patriarche antédiluvien. Son livre apocalyptique est cité par Jude 14-15 — canonique en Éthiopie, apocryphe ailleurs.", galerie: "galeries/apocryphes.html" },
    { mot: "Manuscrit", origine: "du latin manu scriptum — « écrit à la main »", definition: "Tout document écrit à la main. Les manuscrits de la mer Morte (≈ −250 à 68) sont les plus célèbres.", galerie: "galeries/qumran.html" },
    { mot: "Massorah", origine: "de l'hébreu massorah — « tradition »", definition: "L'ensemble des notes des scribes de Tibériade (VIe-Xe siècle) qui comptent les lettres et fixent la prononciation du texte hébreu.", galerie: "galeries/copistes.html" },
    { mot: "Niqqud", origine: "de l'hébreu niqqud — « ponctuation »", definition: "Les points-voyelles ajoutés sous les consonnes hébraïques par les massorètes, pour fixer la prononciation.", galerie: "galeries/copistes.html" },
    { mot: "Palimpseste", origine: "du grec palimpsēstos — « gratté de nouveau »", definition: "Parchemin gratté puis réécrit. L'imagerie multispectrale permet de lire le texte effacé — c'est le cas des pages du Codex H.", galerie: "galeries/codex-h.html" },
    { mot: "Papyrus", origine: "du grec papuros", definition: "Support d'écriture fait de la tige du papyrus, dominant en Égypte antique. P52, P66 et la Septante originelle sont sur papyrus.", galerie: "galeries/codex-grecs.html" },
    { mot: "Parchemin", origine: "du grec Pergamos — Pergame", definition: "Peau de veau, de chèvre ou de mouton préparée pour l'écriture. Plus durable que le papyrus : les codex de Qumrân sont sur parchemin.", galerie: "galeries/qumran.html" },
    { mot: "Peshitta", origine: "du syriaque pšîṭtâ — « simple »", definition: "La Bible syriaque (IIe-Ve siècle), traduite depuis l'hébreu et le grec. Canon du Nouveau Testament légèrement plus court.", galerie: "galeries/traductions.html" },
    { mot: "Rouleau", origine: "du latin rotulus", definition: "Support en parchemin ou papyrus enroulé autour de deux bâtons. La forme du livre biblique pendant plus de mille ans.", galerie: "galeries/qumran.html" },
    { mot: "Scribe", origine: "du latin scriba", definition: "Copiste professionnel. De Moïse aux moines, des scribes d'Alexandrie aux massorètes : quinze siècles de gestes identiques.", galerie: "galeries/copistes.html" },
    { mot: "Samizdat", origine: "du russe — « édition à soi »", definition: "Copie clandestine de textes interdits, en URSS. Les Bibles y circulaient page après page, sous les parquets.", galerie: "galeries/destructions.html" },
    { mot: "Septante", origine: "du latin Septuaginta — « soixante-dix »", definition: "La traduction grecque de la Bible hébraïque (≈ −250), d'après les 72 traducteurs de la Lettre d'Aristée. Citée par le Nouveau Testament.", galerie: "galeries/traductions.html" },
    { mot: "Tétragramme", origine: "du grec tetragrammaton — « de quatre lettres »", definition: "Le nom divin יהוה (YHWH). Convention VERBUM : toujours traduit par « Jéhovah » — jamais « Seigneur » ni « LORD ».", galerie: "index.html#conventions" },
    { mot: "Traditores", origine: "du latin — « ceux qui livrent »", definition: "Surnom des chrétiens qui livrèrent les Écritures aux autorités lors de la persécution de Dioclétien (303). D'autres moururent pour ne pas livrer un rouleau.", galerie: "galeries/destructions.html" },
    { mot: "Vélin", origine: "du latin vitulus — « veau »", definition: "Peau de veau fine et blanche, support de luxe. Un quart des Bibles de Gutenberg imprimé sur vélin.", galerie: "galeries/gutenberg.html" },
    { mot: "Vulgate", origine: "du latin vulgata — « courante »", definition: "La traduction latine de Jérôme (392-405), depuis l'hébreu et le grec. L'Occident chrétien la lira pendant plus de mille ans.", galerie: "galeries/traductions.html" }
  ];

  const zone = document.getElementById("glossaire-zone");
  const champ = document.getElementById("glossaire-recherche");
  const indexLettres = document.getElementById("glossaire-index");
  if (!zone) return;

  let lettreActive = "toutes";

  function rendu() {
    const terme = champ ? champ.value.trim().toLowerCase() : "";
    const filtres = termes.filter((t) => {
      const okL = lettreActive === "toutes" || t.mot[0].toLowerCase() === lettreActive;
      const okT = !terme || (t.mot + " " + t.origine + " " + t.definition).toLowerCase().includes(terme);
      return okL && okT;
    });
    zone.innerHTML = filtres.length ? filtres.map((t) => `
      <article class="carte-preuve" data-reveal>
        <div class="corps-preuve">
          <h3>${t.mot}</h3>
          <div class="date-preuve">${t.origine}</div>
          <p class="description">${t.definition}</p>
          <a class="lien-galerie-jalon" href="${t.galerie}">Voir la salle →</a>
        </div>
      </article>`).join("")
      : `<p class="frise-vide">Aucun terme ne correspond à votre recherche.</p>`;
  }

  if (indexLettres) {
    const lettres = ["toutes", ...Array.from(new Set(termes.map((t) => t.mot[0].toLowerCase()))).sort()];
    indexLettres.innerHTML = lettres.map((l) =>
      `<button class="filtre-bouton ${l === "toutes" ? "actif" : ""}" data-lettre="${l}">${l === "toutes" ? "Tous" : l.toUpperCase()}</button>`
    ).join("");
    indexLettres.querySelectorAll("[data-lettre]").forEach((b) =>
      b.addEventListener("click", () => {
        lettreActive = b.dataset.lettre;
        indexLettres.querySelectorAll("[data-lettre]").forEach((x) => x.classList.toggle("actif", x === b));
        rendu();
      })
    );
  }

  if (champ) champ.addEventListener("input", rendu);
  rendu();
})();
