/* ============================================================
   VERBUM — Frise chronologique interactive
   Rendu depuis data/timeline.json · filtres par époque · modale
   ============================================================ */

(function () {
  "use strict";

  const piste = document.getElementById("frise-complete");
  const zoneFiltres = document.getElementById("frise-filtres");
  const modale = document.getElementById("modale-frise");
  if (!piste || !modale) return;

  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let evenements = [];
  let filtreCourant = "tous";

  /* ---------- Données (window.VERBUM_TIMELINE injecté par data/timeline-data.js) ---------- */
  function chargerDonnees() {
    if (window.VERBUM_TIMELINE && Array.isArray(window.VERBUM_TIMELINE.evenements)) {
      evenements = window.VERBUM_TIMELINE.evenements;
      rendre();
      return;
    }
    fetch("data/timeline.json")
      .then((r) => r.json())
      .then((json) => {
        evenements = json.evenements || [];
        rendre();
      })
      .catch(() => {
        piste.innerHTML = "<p class='frise-vide'>Frise indisponible hors-ligne.</p>";
      });
  }

  /* ---------- Rendu des cartes ---------- */
  function badge(statut) {
    if (statut === "apocryphe") return '<span class="badge badge-apocryphe">Apocryphe</span>';
    if (statut === "evenement") return '<span class="badge badge-actualite">Événement</span>';
    return '<span class="badge badge-canonique">Canonique</span>';
  }

  function rendre() {
    const visibles = evenements.filter(
      (e) => filtreCourant === "tous" || e.epoque === filtreCourant
    );
    piste.innerHTML = visibles
      .map(
        (e, i) => `
      <article class="frise-evenement" tabindex="0" role="button"
               data-evenement="${e.id}" aria-label="${e.titre} — ${e.date_texte}"
               style="--delai:${Math.min(i, 6) * 0.06}s">
        <div class="date">${e.date_texte}</div>
        <h4>${e.titre}</h4>
        <p>${e.resume}</p>
        <div class="pied-carte-frise">
          ${badge(e.statut)}
          <span class="lien-detail">Lire le détail →</span>
        </div>
      </article>`
      )
      .join("");

    piste.querySelectorAll(".frise-evenement").forEach((carte) => {
      const ouvrir = () => ouvrirModale(carte.dataset.evenement);
      carte.addEventListener("click", ouvrir);
      carte.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          ouvrir();
        }
      });
    });
  }

  /* ---------- Filtres ---------- */
  if (zoneFiltres) {
    zoneFiltres.addEventListener("click", (e) => {
      const bouton = e.target.closest("[data-epoque]");
      if (!bouton) return;
      filtreCourant = bouton.dataset.epoque;
      zoneFiltres.querySelectorAll("[data-epoque]").forEach((b) => {
        b.classList.toggle("actif", b === bouton);
      });
      rendre();
    });
  }

  /* ---------- Modale ---------- */
  const contenuModale = modale.querySelector(".modale-contenu");
  const fermerModale = () => {
    modale.classList.remove("ouverte");
    modale.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-ouvert");
  };

  function ouvrirModale(id) {
    const e = evenements.find((x) => x.id === id);
    if (!e || !contenuModale) return;
    contenuModale.innerHTML = `
      <button class="modale-fermer" aria-label="Fermer">&times;</button>
      <div class="modale-visuel">
        <img src="${e.image}" alt="${e.titre}" loading="lazy">
      </div>
      <div class="modale-corps">
        <div class="modale-entete">
          <span class="modale-date">${e.date_texte}</span>
          ${badge(e.statut)}
        </div>
        <h3>${e.titre}</h3>
        <p class="modale-lieu">📍 ${e.lieu}</p>
        <p class="modale-detail">${e.detail}</p>
        <p class="modale-resume">${e.resume}</p>
        <a class="bouton bouton-primaire" href="${e.galerie}">
          Voir la galerie associée
          <svg class="fleche" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>`;
    contenuModale.querySelector(".modale-fermer").addEventListener("click", fermerModale);
    modale.classList.add("ouverte");
    modale.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-ouvert");
    modale.querySelector(".modale-fermer").focus();
  }

  modale.addEventListener("click", (e) => {
    if (e.target === modale) fermerModale();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modale.classList.contains("ouverte")) fermerModale();
  });

  /* ---------- Boutons de défilement ---------- */
  document.querySelectorAll("[data-frise-direction]").forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const direction = bouton.dataset.friseDirection === "suivant" ? 1 : -1;
      const carte = piste.querySelector(".frise-evenement");
      const pas = carte ? carte.offsetWidth + 25 : 320;
      piste.scrollBy({ left: direction * pas, behavior: reduit ? "auto" : "smooth" });
    });
  });

  /* ---------- Glisser-déposer ---------- */
  let enCours = false;
  let departX = 0;
  let scrollDepart = 0;

  piste.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".frise-evenement") && e.pointerType === "mouse") {
      // simple clic : on laisse la modale s'ouvrir ; le drag suit
    }
    enCours = true;
    departX = e.clientX;
    scrollDepart = piste.scrollLeft;
    piste.classList.add("saisie");
    piste.setPointerCapture(e.pointerId);
  });
  piste.addEventListener("pointermove", (e) => {
    if (!enCours) return;
    const delta = e.clientX - departX;
    if (Math.abs(delta) > 6) piste.scrollLeft = scrollDepart - delta;
  });
  const relacher = () => {
    enCours = false;
    piste.classList.remove("saisie");
  };
  piste.addEventListener("pointerup", relacher);
  piste.addEventListener("pointercancel", relacher);

  piste.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        piste.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    },
    { passive: false }
  );

  chargerDonnees();
})();
