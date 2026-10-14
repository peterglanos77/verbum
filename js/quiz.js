/* ============================================================
   VERBUM — Le Défi de la Transmission (quiz interactif)
   ============================================================ */
(function () {
  "use strict";

  const questions = [
    {
      q: "Quel est le plus ancien fragment biblique connu au monde ?",
      options: [
        "Le papyrus Nash",
        "Les amulettes de Ketef Hinnom",
        "Le rouleau d'Ésaïe de Qumrân",
        "La stèle de Merneptah"
      ],
      bonne: 1,
      explication: "Les deux amulettes d'argent de Ketef Hinnom (Jérusalem, fouillées en 1979-80) portent la bénédiction de Nombres 6:24-26 — gravées environ un millénaire avant les manuscrits de Qumrân.",
      lien: { href: "galeries/origines.html", texte: "Galerie I — Les Origines" }
    },
    {
      q: "Combien de grottes ont livré les manuscrits de la mer Morte ?",
      options: ["7", "9", "11", "13"],
      bonne: 2,
      explication: "Onze grottes autour de Qumrân, plus de 900 manuscrits, dont environ 200 textes bibliques — tous les livres de l'Ancien Testament sauf Esther.",
      lien: { href: "galeries/qumran.html", texte: "Galerie III — Qumrân" }
    },
    {
      q: "Selon la Lettre d'Aristée, combien de jours ont duré les travaux des traducteurs de la Septante ?",
      options: ["40 jours", "70 jours", "72 jours", "100 jours"],
      bonne: 2,
      explication: "72 traducteurs (six par tribu), 72 jours, sur l'île de Pharos — sous Ptolémée II Philadelphe, vers 250 av. J.-C.",
      lien: { href: "galeries/traductions.html", texte: "Galerie VII — Les Grandes Traductions" }
    },
    {
      q: "Quelle inscription antique nomme Ponce Pilate, le gouverneur des Évangiles ?",
      options: [
        "Le cylindre de Cyrus",
        "La stèle de Mésha",
        "L'inscription du théâtre de Césarée (1961)",
        "Les tablettes d'Amarna"
      ],
      bonne: 2,
      explication: "Découverte en 1961 à Césarée maritime : « Pontius Pilatus, praefectus Iudaeae ». C'est la seule inscription antique connue nommant Pilate.",
      lien: { href: "galeries/preuves.html", texte: "Galerie IX — Preuves Archéologiques" }
    },
    {
      q: "Combien d'exemplaires de la Bible à 42 lignes de Gutenberg subsistent aujourd'hui ?",
      options: ["18", "48", "120", "180"],
      bonne: 1,
      explication: "Environ 180 exemplaires imprimés en 1455 — un quart sur vélin — dont il reste aujourd'hui 48, parmi les livres les plus précieux du monde.",
      lien: { href: "galeries/gutenberg.html", texte: "Galerie VIII — Gutenberg" }
    },
    {
      q: "Comment le musée traduit-il systématiquement le tétragramme hébreu יהוה ?",
      options: ["Le Seigneur", "L'Éternel", "Jéhovah", "Adonaï"],
      bonne: 2,
      explication: "Convention VERBUM : partout où le texte hébreu porte YHWH, la traduction française emploie « Jéhovah » — jamais un substitut.",
      lien: { href: "index.html#conventions", texte: "Nos conventions" }
    },
    {
      q: "Quel livre considéré comme apocryphe par la majorité des Églises fait partie du canon éthiopien ?",
      options: [
        "L'Évangile de Thomas",
        "Le Pasteur d'Hermas",
        "Le livre d'Hénoch",
        "L'Évangile de Judas"
      ],
      bonne: 2,
      explication: "Le premier livre d'Hénoch est cité par l'épître de Jude, rejeté par le canon hébreu et la plupart des Églises — mais canonique en Éthiopie. Le musée affiche les deux statuts.",
      lien: { href: "galeries/apocryphes.html", texte: "Galerie VI — Les Textes Apocryphes" }
    },
    {
      q: "En quelle année le Codex H a-t-il été ressuscité par imagerie multispectrale ?",
      options: ["2019", "2022", "2026", "2030"],
      bonne: 2,
      explication: "24 avril 2026 : l'Université de Glasgow lit 42 pages perdues des Lettres de Paul. Sans textes inédits — mais avec une méthode révolutionnaire. Datation C14 : VIe siècle.",
      lien: { href: "galeries/codex-h.html", texte: "Galerie V — Codex H" }
    },
    {
      q: "Quelle stèle porte les mots « Maison de David » ?",
      options: [
        "La stèle de Mésha",
        "La stèle de Tel Dan (1993)",
        "La stèle de Merneptah",
        "L'inscription de Pilate"
      ],
      bonne: 1,
      explication: "Découverte en 1993 à Tel Dan : première preuve extrabiblique de la dynastie davidique. La Bible parlait d'une maison royale ; la pierre a répondu.",
      lien: { href: "galeries/preuves.html", texte: "Galerie IX — Preuves Archéologiques" }
    },
    {
      q: "Selon le musée, que prouve la comparaison entre le Grand Rouleau d'Ésaïe et la Bible d'aujourd'hui ?",
      options: [
        "Que le texte n'a strictement jamais varié",
        "Que le texte a été transmis avec une fidélité remarquable (~95 % identique)",
        "Que les manuscrits de Qumrân sont des faux",
        "Rien : la comparaison est impossible"
      ],
      bonne: 1,
      explication: "Honnêteté scientifique : le texte est quasi identique (~95 %), les variantes sont mineures et documentées. Le musée ne prétend jamais « zéro variation » — il montre les preuves.",
      lien: { href: "galeries/qumran.html", texte: "Galerie III — Qumrân" }
    }
  ];

  let index = 0;
  let score = 0;
  let repondu = false;

  const zone = document.getElementById("quiz-zone");
  const barre = document.getElementById("quiz-progression-texte");
  const jauge = document.getElementById("quiz-jauge");
  if (!zone) return;

  function rendreQuestion() {
    repondu = false;
    const q = questions[index];
    if (barre) barre.textContent = `Question ${index + 1} / ${questions.length} · Score : ${score}`;
    if (jauge) jauge.style.width = `${(index / questions.length) * 100}%`;
    zone.innerHTML = `
      <div class="quiz-entete">
        <span class="date-preuve">Question ${index + 1}</span>
        <h3>${q.q}</h3>
      </div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="quiz-option" data-index="${i}"><span class="lettre">${String.fromCharCode(65 + i)}</span><span>${o}</span></button>`).join("")}
      </div>
      <div class="quiz-feedback" hidden></div>`;
    zone.querySelectorAll(".quiz-option").forEach((b) =>
      b.addEventListener("click", () => repondre(parseInt(b.dataset.index, 10)))
    );
  }

  function repondre(choix) {
    if (repondu) return;
    repondu = true;
    const q = questions[index];
    const feedback = zone.querySelector(".quiz-feedback");
    const juste = choix === q.bonne;
    if (juste) score++;
    zone.querySelectorAll(".quiz-option").forEach((b) => {
      const i = parseInt(b.dataset.index, 10);
      b.disabled = true;
      if (i === q.bonne) b.classList.add("juste");
      else if (i === choix) b.classList.add("faux");
    });
    feedback.hidden = false;
    feedback.innerHTML = `
      <p class="verdict ${juste ? "verdict-juste" : "verdict-faux"}">
        ${juste ? "✓ Exact !" : "✗ Pas tout à fait."} ${q.explication}
      </p>
      <a class="lien-galerie-jalon" href="${q.lien.href}">${q.lien.texte} →</a>
      <button class="bouton bouton-primaire quiz-suivant" type="button">
        ${index < questions.length - 1 ? "Question suivante →" : "Voir mon résultat →"}
      </button>`;
    feedback.querySelector(".quiz-suivant").addEventListener("click", () => {
      index++;
      if (index < questions.length) rendreQuestion();
      else rendreResultat();
    });
  }

  function rendreResultat() {
    if (jauge) jauge.style.width = "100%";
    if (barre) barre.textContent = `Terminé · Score : ${score} / ${questions.length}`;
    const mention =
      score === 10 ? "Gardien du texte — le musée vous embauche." :
      score >= 8 ? "Excellent — vous maîtrisez la transmission." :
      score >= 6 ? "Solide — quelques salles à revisiter." :
      score >= 4 ? "Bonne base — la Grande Frise vous attend." :
      "Le fil commence ici — reprenez la visite depuis le début.";
    zone.innerHTML = `
      <div class="quiz-entete" style="text-align:center">
        <span class="date-preuve">Résultat final</span>
        <h3 style="font-size:clamp(1.65rem,4vw,2.45rem)">${score} / ${questions.length}</h3>
        <p class="sous-titre-section" style="margin-inline:auto">${mention}</p>
      </div>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.85rem">
        <button class="bouton bouton-primaire" id="quiz-rejouer" type="button">Rejouer le défi</button>
        <a class="bouton bouton-secondaire" href="frise.html">Parcourir la Grande Frise</a>
      </div>`;
    const rejouer = document.getElementById("quiz-rejouer");
    if (rejouer) rejouer.addEventListener("click", () => {
      index = 0; score = 0; rendreQuestion();
    });
  }

  rendreQuestion();
})();
