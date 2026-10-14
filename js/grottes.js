/* ============================================================
   VERBUM — Qumrân : carte interactive des 11 grottes
   + comparateur Texte de Qumrân / Texte Massorétique / Français
   ============================================================ */

(function () {
  "use strict";

  /* ================= CARTE DES GROTTES ================= */
  const carte = document.getElementById("carte-grottes");
  const panneau = document.getElementById("grotte-panneau");

  const GROTTES = [
    { id: 1, nom: "Grotte 1", annee: "1947", x: 22, y: 38,
      contenu: "La découverte fondatrice : le Grand Rouleau d'Ésaïe (1QIsaᵃ), la Règle de la communauté (1QS), le Commentaire d'Habacuc (1QpHab) et des fragments de la Genèse. 7 manuscrits majeurs dans des jarres scellées.",
      tresor: "Grand Rouleau d'Ésaïe" },
    { id: 2, nom: "Grotte 2", annee: "1952", x: 31, y: 52,
      contenu: "Environ 300 fragments de manuscrits bibliques et sectaires : Exode, Nombres, Deutéronome, Jérémie, Psaumes. Découverte lors d'une prospection systématique des falaises.",
      tresor: "Fragments de Jérémie" },
    { id: 3, nom: "Grotte 3", annee: "1952", x: 38, y: 33,
      contenu: "Le célèbre Rouleau de cuivre (3Q15) : deux bandes de cuivre gravées d'un inventaire au trésor — 64 lieux de cachette mentionnés. Manuscrit unique en son genre.",
      tresor: "Rouleau de cuivre" },
    { id: 4, nom: "Grotte 4", annee: "1956", x: 47, y: 57,
      contenu: "La grotte la plus riche de tout le désert de Judée : près de 550 manuscrits. Tous les livres bibliques (sauf Esther), des textes sectaires, et des écrits apocryphes comme le livre d'Hénoch et les Jubilés.",
      tresor: "550 manuscrits" },
    { id: 5, nom: "Grotte 5", annee: "1952", x: 55, y: 41,
      contenu: "Fragments bibliques (dont un rouleau des Psaumes incluant le Psaume 151) et textes sectaires. Des jarres intactes y furent encore observées.",
      tresor: "Psaumes (5QPs)" },
    { id: 6, nom: "Grotte 6", annee: "1952", x: 61, y: 54,
      contenu: "Plusieurs manuscrits, dont des fragments en grec — preuve que la communauté lisait aussi les Écritures dans la Septante.",
      tresor: "Fragments grecs" },
    { id: 7, nom: "Grotte 7", annee: "1955", x: 68, y: 36,
      contenu: "Curiosité majeure : cette grotte ne contenait que des manuscrits en grec — dont l'Exode et l'Épître de Jérémie. Aucun texte hébreu.",
      tresor: "Manuscrits grecs" },
    { id: 8, nom: "Grotte 8", annee: "1955", x: 74, y: 50,
      contenu: "Fragments bibliques, mais aussi tissus, paniers et outils : les vestiges de la vie quotidienne des copistes de Qumrân.",
      tresor: "Vestiges de copistes" },
    { id: 9, nom: "Grotte 9", annee: "1955", x: 80, y: 42,
      contenu: "Fragments mineurs de manuscrits et d'objets, témoins de l'occupation ancienne de ces recoins de falaise.",
      tresor: "Fragments divers" },
    { id: 10, nom: "Grotte 10", annee: "1956", x: 85, y: 56,
      contenu: "Un ostracone (tesson de poterie portant une inscription) : parmi les rares textes courts trouvés dans les grottes.",
      tresor: "Ostracone inscrit" },
    { id: 11, nom: "Grotte 11", annee: "1956", x: 91, y: 38,
      contenu: "Le Rouleau du Temple (11Q19) — le plus long rouleau de Qumrân avec 8,60 mètres — ainsi qu'un rouleau des Psaumes incluant des psaumes supplémentaires et un Lévitique en araméen.",
      tresor: "Rouleau du Temple" }
  ];

  function afficherGrotte(g) {
    if (!panneau) return;
    panneau.innerHTML = `
      <div class="grotte-entete">
        <span class="grotte-numero">${g.nom}</span>
        <span class="grotte-annee">Découverte : ${g.annee}</span>
      </div>
      <p class="grotte-tresor">⭐ ${g.tresor}</p>
      <p class="grotte-contenu">${g.contenu}</p>`;
    carte.querySelectorAll(".hotspot-grotte").forEach((h) => {
      h.classList.toggle("actif", Number(h.dataset.grotte) === g.id);
    });
  }

  if (carte && panneau) {
    const calque = carte.querySelector(".hotspots-grottes");
    if (calque) {
      calque.innerHTML = GROTTES.map(
        (g) => `<button class="hotspot-grotte" data-grotte="${g.id}"
                 style="left:${g.x}%;top:${g.y}%"
                 aria-label="${g.nom} — ${g.tresor}">
                 <span>${g.id}</span>
               </button>`
      ).join("");
      calque.querySelectorAll(".hotspot-grotte").forEach((h) => {
        h.addEventListener("click", () => {
          const g = GROTTES.find((x) => x.id === Number(h.dataset.grotte));
          if (g) afficherGrotte(g);
        });
      });
    }
    afficherGrotte(GROTTES[0]);
  }

  /* ================= COMPARATEUR DE TEXTES ================= */
  const comparateur = document.getElementById("comparateur");
  if (comparateur) {
    const boutons = comparateur.querySelectorAll("[data-colonne]");
    const colonnes = comparateur.querySelectorAll("[data-texte]");

    boutons.forEach((b) => {
      b.addEventListener("click", () => {
        const cible = b.dataset.colonne;
        boutons.forEach((x) => x.classList.toggle("actif", x === b));
        colonnes.forEach((col) => {
          col.classList.toggle(
            "colonne-active",
            cible === "tous" || col.dataset.texte === cible
          );
        });
      });
    });

    // Vue "tous" par défaut
    const tous = comparateur.querySelector('[data-colonne="tous"]');
    if (tous) tous.click();
  }
})();
