/* ============================================================
   VERBUM — Grande Frise interactive
   Rendu depuis js/grande-frise-data.js · filtres · modale · nav
   ============================================================ */
(function () {
  "use strict";

  const conteneur = document.getElementById("grande-frise");
  const zoneFiltres = document.getElementById("grande-frise-filtres");
  const modale = document.getElementById("modale-frise");
  if (!conteneur || !modale || !window.GRANDE_FRISE) return;

  const evenements = window.GRANDE_FRISE.slice().sort((a, b) => a.ordre - b.ordre);
  const epoques = window.GRANDE_FRISE_EPOQUES || [];
  const categories = window.GRANDE_FRISE_CATEGORIES || {};

  let filtreActif = "toutes";
  let indexCourant = 0;

  /* ---------- Rendu de la frise ---------- */
  function rendre() {
    let html = "";
    epoques.forEach((ep) => {
      const jalons = evenements.filter((e) => e.epoque === ep.id);
      if (!jalons.length) return;
      html += `<section class="epoque-frise" data-epoque="${ep.id}">
        <header class="entete-epoque">
          <h2>${ep.titre}</h2>
          <span class="periode">${ep.sous_titre}</span>
        </header>
        <div class="piste-verticale">`;
      jalons.forEach((e) => {
        const cat = categories[e.categorie] || { label: "", classe: "" };
        html += `<article class="jalon-frise" tabindex="0" role="button"
            data-id="${e.id}" data-categorie="${e.categorie}"
            aria-label="Ouvrir la fiche : ${e.titre}">
          <div class="jalon-vignette">
            <img src="${e.image}" alt="${e.titre}" loading="lazy" width="640" height="480">
            <span class="date-jalon">${e.date_texte}</span>
          </div>
          <div class="jalon-corps">
            <span class="categorie-jalon ${cat.classe}">${cat.label}</span>
            <h3>${e.titre}</h3>
            <p class="lieu-jalon">📍 ${e.lieu}</p>
            <p class="resume-jalon">${e.resume}</p>
            <span class="lien-galerie-jalon">${e.galerie.titre} <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </div>
        </article>`;
      });
      html += `</div></section>`;
    });
    conteneur.innerHTML = html;

    conteneur.querySelectorAll(".jalon-frise").forEach((carte) => {
      carte.addEventListener("click", (ev) => {
        // Le lien galerie ouvre la page sans modale
        if (ev.target.closest(".lien-galerie-jalon")) {
          ev.stopPropagation();
          const evt = evenements.find((x) => x.id === carte.dataset.id);
          if (evt) window.location.href = evt.galerie.href;
          return;
        }
        ouvrirModale(carte.dataset.id);
      });
      carte.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          ouvrirModale(carte.dataset.id);
        }
      });
    });
  }

  /* ---------- Filtres + recherche ---------- */
  const champRecherche = document.getElementById("grande-frise-recherche");

  function appliquerFiltre() {
    const terme = champRecherche ? champRecherche.value.trim().toLowerCase() : "";
    conteneur.querySelectorAll(".jalon-frise").forEach((carte) => {
      const okCat = filtreActif === "toutes" || carte.dataset.categorie === filtreActif;
      let okTexte = true;
      if (terme) {
        const evt = evenements.find((x) => x.id === carte.dataset.id) || {};
        const corpus = [
          evt.titre, evt.resume, evt.detail, evt.lieu, evt.date_texte,
          evt.galerie && evt.galerie.titre
        ].join(" ").toLowerCase();
        okTexte = corpus.includes(terme);
      }
      carte.classList.toggle("masque", !(okCat && okTexte));
    });
    conteneur.querySelectorAll(".epoque-frise").forEach((sec) => {
      const visibles = sec.querySelectorAll(".jalon-frise:not(.masque)").length;
      sec.style.display = visibles ? "" : "none";
    });
  }

  if (champRecherche) {
    champRecherche.addEventListener("input", appliquerFiltre);
  }

  if (zoneFiltres) {
    zoneFiltres.querySelectorAll("[data-filtre]").forEach((bouton) => {
      bouton.addEventListener("click", () => {
        filtreActif = bouton.dataset.filtre;
        zoneFiltres.querySelectorAll("[data-filtre]").forEach((b) =>
          b.classList.toggle("actif", b === bouton)
        );
        appliquerFiltre();
      });
    });
  }

  /* ---------- Modale ---------- */
  const contenuModale = modale.querySelector(".modale-contenu");

  function fermerModale() {
    modale.classList.remove("ouverte");
    modale.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function ouvrirModale(id) {
    indexCourant = evenements.findIndex((e) => e.id === id);
    if (indexCourant < 0) return;
    const e = evenements[indexCourant];
    contenuModale.innerHTML = `
      <button class="modale-fermer" aria-label="Fermer">&times;</button>
      <div class="modale-visuel">
        <img src="${e.image}" alt="${e.titre}">
      </div>
      <div class="modale-corps">
        <div class="modale-entete">
          <span class="modale-date">${e.date_texte}</span>
          <span class="categorie-jalon ${(categories[e.categorie] || {}).classe || ""}">${(categories[e.categorie] || {}).label || ""}</span>
        </div>
        <h3>${e.titre}</h3>
        <p class="modale-lieu">📍 ${e.lieu}</p>
        <p class="modale-resume">${e.resume}</p>
        <p class="modale-detail">${e.detail}</p>
        <a class="lien-galerie-jalon" href="${e.galerie.href}">${e.galerie.titre} →</a>
        <div class="modale-jalon-nav">
          <button type="button" data-nav="precedent">← Précédent</button>
          <button type="button" data-nav="suivant">Suivant →</button>
        </div>
      </div>`;
    contenuModale.querySelector(".modale-fermer").addEventListener("click", fermerModale);
    contenuModale.querySelector("[data-nav='precedent']").addEventListener("click", () => {
      indexCourant = (indexCourant - 1 + evenements.length) % evenements.length;
      ouvrirModale(evenements[indexCourant].id);
    });
    contenuModale.querySelector("[data-nav='suivant']").addEventListener("click", () => {
      indexCourant = (indexCourant + 1) % evenements.length;
      ouvrirModale(evenements[indexCourant].id);
    });
    modale.classList.add("ouverte");
    modale.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modale.querySelector(".modale-fermer").focus();
  }

  modale.addEventListener("click", (e) => {
    if (e.target === modale) fermerModale();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modale.classList.contains("ouverte")) fermerModale();
    if (!modale.classList.contains("ouverte")) return;
    if (e.key === "ArrowRight") {
      indexCourant = (indexCourant + 1) % evenements.length;
      ouvrirModale(evenements[indexCourant].id);
    }
    if (e.key === "ArrowLeft") {
      indexCourant = (indexCourant - 1 + evenements.length) % evenements.length;
      ouvrirModale(evenements[indexCourant].id);
    }
  });

  rendre();
})();
