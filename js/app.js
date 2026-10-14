/* ============================================================
   VERBUM — Orchestrateur principal
   Loader · Navigation · Reveals · Compteurs · Frise · Parallaxe
   ============================================================ */

(function () {
  "use strict";

  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- LOADER ---------------- */
  const loader = document.querySelector(".loader-verbum");
  function masquerLoader() {
    if (!loader || loader.classList.contains("disparu")) return;
    loader.classList.add("disparu");
    document.body.classList.add("curseur-plume");
    setTimeout(() => loader.remove(), 1100);
  }
  window.addEventListener("load", () => setTimeout(masquerLoader, reduit ? 200 : 1750));
  setTimeout(masquerLoader, 4200); // filet de sécurité

  /* ---------------- NAVIGATION ---------------- */
  const nav = document.querySelector(".nav-principale");
  const barre = document.querySelector(".barre-progression");
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".nav-liens");

  function auScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrollee", y > 60);

    if (barre) {
      const hauteurDoc = document.documentElement.scrollHeight - window.innerHeight;
      const progression = hauteurDoc > 0 ? y / hauteurDoc : 0;
      barre.style.transform = `scaleX(${Math.min(1, progression)})`;
    }

    // Lien actif
    const sections = document.querySelectorAll("main section[id]");
    let courant = "";
    sections.forEach((section) => {
      if (y >= section.offsetTop - 180) courant = section.id;
    });
    document.querySelectorAll(".nav-liens a").forEach((lien) => {
      lien.classList.toggle("actif", lien.getAttribute("href") === `#${courant}`);
    });
  }
  window.addEventListener("scroll", auScroll, { passive: true });
  auScroll();

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const ouvert = menu.classList.toggle("ouvert");
      burger.classList.toggle("actif", ouvert);
      document.body.classList.toggle("menu-ouvert", ouvert);
    });
    menu.querySelectorAll("a").forEach((lien) =>
      lien.addEventListener("click", () => {
        menu.classList.remove("ouvert");
        burger.classList.remove("actif");
        document.body.classList.remove("menu-ouvert");
      })
    );
  }

  // Défilement doux pour les ancres internes
  document.querySelectorAll('a[href^="#"]').forEach((lien) => {
    lien.addEventListener("click", (e) => {
      const cible = document.querySelector(lien.getAttribute("href"));
      if (!cible) return;
      e.preventDefault();
      cible.scrollIntoView({ behavior: reduit ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------------- REVEALS AU SCROLL ---------------- */
  const revelables = document.querySelectorAll("[data-reveal]");
  if (revelables.length) {
    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            entree.target.classList.add("visible");
            observateur.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revelables.forEach((el, i) => {
      if (!el.style.getPropertyValue("--delai")) {
        el.style.setProperty("--delai", `${Math.min(i % 6, 5) * 0.1}s`);
      }
      observateur.observe(el);
    });
  }

  /* ---------------- COMPTEURS ANIMÉS ---------------- */
  const compteurs = document.querySelectorAll("[data-count]");
  if (compteurs.length) {
    const formater = (valeur, suffixe) =>
      new Intl.NumberFormat("fr-FR").format(Math.round(valeur)) + (suffixe || "");

    const lancerCompteur = (el) => {
      const cible = parseFloat(el.dataset.count);
      const suffixe = el.dataset.suffixe || "";
      const duree = 1900;
      if (reduit) {
        el.textContent = formater(cible, suffixe);
        return;
      }
      const debut = performance.now();
      const pas = (maintenant) => {
        const t = Math.min(1, (maintenant - debut) / duree);
        const adouci = 1 - Math.pow(1 - t, 3);
        el.textContent = formater(cible * adouci, suffixe);
        if (t < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    };

    const observateurCompteurs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            lancerCompteur(entree.target);
            observateurCompteurs.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    compteurs.forEach((el) => observateurCompteurs.observe(el));
  }

  /* ---------------- FRISE HORIZONTALE ---------------- */
  const piste = document.querySelector(".frise-piste");
  if (piste) {
    const fleches = document.querySelectorAll("[data-frise-direction]");
    fleches.forEach((bouton) => {
      bouton.addEventListener("click", () => {
        const direction = bouton.dataset.friseDirection === "suivant" ? 1 : -1;
        const carte = piste.querySelector(".frise-evenement");
        const pas = carte ? carte.offsetWidth + 25 : 320;
        piste.scrollBy({ left: direction * pas, behavior: reduit ? "auto" : "smooth" });
      });
    });

    // Glisser-déposer horizontal
    let enCours = false;
    let departX = 0;
    let scrollDepart = 0;

    piste.addEventListener("pointerdown", (e) => {
      enCours = true;
      departX = e.clientX;
      scrollDepart = piste.scrollLeft;
      piste.classList.add("saisie");
      piste.setPointerCapture(e.pointerId);
    });
    piste.addEventListener("pointermove", (e) => {
      if (!enCours) return;
      piste.scrollLeft = scrollDepart - (e.clientX - departX);
    });
    const relacher = () => {
      enCours = false;
      piste.classList.remove("saisie");
    };
    piste.addEventListener("pointerup", relacher);
    piste.addEventListener("pointercancel", relacher);

    // Molette verticale ➜ défilement horizontal sur la frise
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
  }

  /* ---------------- PARALLAXE DU HÉROS ---------------- */
  const heros = document.querySelector(".heros");
  const coucheFond = document.querySelector(".heros-couche.fond");
  const contenuHeros = document.querySelector(".heros-contenu");

  if (heros && coucheFond && !reduit) {
    // Parallaxe au scroll
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y > window.innerHeight * 1.2) return;
        coucheFond.style.transform = `scale(1.08) translateY(${y * 0.22}px)`;
        if (contenuHeros) {
          contenuHeros.style.transform = `translateY(${y * 0.12}px)`;
          contenuHeros.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.85)));
        }
      },
      { passive: true }
    );

    // Parallaxe à la souris
    heros.addEventListener("pointermove", (e) => {
      const rect = heros.getBoundingClientRect();
      const dx = (e.clientX - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.height / 2) / rect.height;
      coucheFond.style.transform = `scale(1.1) translate(${dx * -18}px, ${dy * -14}px)`;
    });
    heros.addEventListener("pointerleave", () => {
      coucheFond.style.transform = "scale(1.08)";
    });
  }

  /* ---------------- ANNÉE DYNAMIQUE ---------------- */
  const annee = document.getElementById("annee-courante");
  if (annee) annee.textContent = String(new Date().getFullYear());
})();

/* ============================================================
   VERBUM — Contrôles de confort (taille du texte, espace, mémoire)
   Widget flottant discret présent sur toutes les pages.
   ============================================================ */
(function () {
  "use strict";

  const CLE_TAILLE = "verbum-confort-taille";
  const CLE_ESPACE = "verbum-confort-espace";
  const ECHELLES = [0.9, 1, 1.12, 1.25, 1.4];
  let taille = 1;
  let espace = false;

  try {
    const t = parseFloat(localStorage.getItem(CLE_TAILLE));
    if (ECHELLES.includes(t)) taille = t;
    espace = localStorage.getItem(CLE_ESPACE) === "1";
  } catch (e) { /* stockage indisponible */ }

  function appliquer() {
    document.documentElement.style.fontSize = `${16 * taille}px`;
    document.body.classList.toggle("confort-espace", espace);
    try {
      localStorage.setItem(CLE_TAILLE, String(taille));
      localStorage.setItem(CLE_ESPACE, espace ? "1" : "0");
    } catch (e) { /* stockage indisponible */ }
  }

  function construire() {
    const widget = document.createElement("div");
    widget.className = "widget-confort";
    widget.innerHTML = `
      <button class="confort-bascule" aria-label="Réglages de confort de lecture" aria-expanded="false">Aa</button>
      <div class="confort-panneau" hidden>
        <p class="confort-titre">Confort de lecture</p>
        <div class="confort-ligne">
          <span>Taille du texte</span>
          <div class="confort-boutons">
            <button type="button" data-confort="moins" aria-label="Réduire le texte">A−</button>
            <button type="button" data-confort="plus" aria-label="Agrandir le texte">A+</button>
          </div>
        </div>
        <div class="confort-ligne">
          <span>Espace de lecture</span>
          <div class="confort-boutons">
            <button type="button" data-confort="espace" aria-pressed="${espace}">${espace ? "Activé" : "Désactivé"}</button>
          </div>
        </div>
        <button type="button" class="confort-reset" data-confort="reset">Réinitialiser</button>
      </div>`;
    document.body.appendChild(widget);

    const bascule = widget.querySelector(".confort-bascule");
    const panneau = widget.querySelector(".confort-panneau");
    bascule.addEventListener("click", () => {
      const ouvert = panneau.hidden;
      panneau.hidden = !ouvert;
      bascule.setAttribute("aria-expanded", String(ouvert));
    });

    widget.addEventListener("click", (e) => {
      const b = e.target.closest("[data-confort]");
      if (!b) return;
      const action = b.dataset.confort;
      if (action === "plus") taille = ECHELLES[Math.min(ECHELLES.indexOf(taille) + 1, ECHELLES.length - 1)];
      if (action === "moins") taille = ECHELLES[Math.max(ECHELLES.indexOf(taille) - 1, 0)];
      if (action === "espace") {
        espace = !espace;
        b.textContent = espace ? "Activé" : "Désactivé";
        b.setAttribute("aria-pressed", String(espace));
      }
      if (action === "reset") {
        taille = 1;
        espace = false;
        const be = widget.querySelector("[data-confort='espace']");
        if (be) { be.textContent = "Désactivé"; be.setAttribute("aria-pressed", "false"); }
      }
      appliquer();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { appliquer(); construire(); });
  } else {
    appliquer();
    construire();
  }
})();
