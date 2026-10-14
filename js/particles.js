/* ============================================================
   VERBUM — Particules dorées (canvas du héros)
   Poussière sacrée flottante, légère et respectueuse de
   prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  const canvas = document.getElementById("particules");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let largeur = 0;
  let hauteur = 0;
  let particules = [];
  let animationId = null;

  const COULEURS = [
    "rgba(201, 168, 76,",
    "rgba(232, 212, 139,",
    "rgba(240, 232, 213,",
    "rgba(138, 109, 47,"
  ];

  function alea(min, max) {
    return Math.random() * (max - min) + min;
  }

  function creerParticules() {
    const densite = Math.min(90, Math.floor((largeur * hauteur) / 22000));
    particules = Array.from({ length: densite }, () => ({
      x: alea(0, largeur),
      y: alea(0, hauteur),
      rayon: alea(0.7, 2.6),
      vitesseX: alea(-0.12, 0.12),
      vitesseY: alea(-0.32, -0.06),
      opacite: alea(0.12, 0.55),
      scintillement: alea(0.002, 0.01),
      phase: alea(0, Math.PI * 2),
      couleur: COULEURS[Math.floor(Math.random() * COULEURS.length)]
    }));
  }

  function redimensionner() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    largeur = canvas.clientWidth;
    hauteur = canvas.clientHeight;
    canvas.width = largeur * ratio;
    canvas.height = hauteur * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    creerParticules();
    if (reduit) dessinerStatique();
  }

  function dessinerParticule(p) {
    const scintille = p.opacite + Math.sin(p.phase) * 0.12;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.rayon, 0, Math.PI * 2);
    ctx.fillStyle = p.couleur + Math.max(0.05, scintille) + ")";
    ctx.fill();

    // Halo doux
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.rayon * 3.2, 0, Math.PI * 2);
    ctx.fillStyle = p.couleur + Math.max(0, scintille * 0.14) + ")";
    ctx.fill();
  }

  function dessinerStatique() {
    ctx.clearRect(0, 0, largeur, hauteur);
    particules.forEach(dessinerParticule);
  }

  function boucle() {
    ctx.clearRect(0, 0, largeur, hauteur);

    for (const p of particules) {
      p.x += p.vitesseX;
      p.y += p.vitesseY;
      p.phase += p.scintillement;

      if (p.y + p.rayon < 0) {
        p.y = hauteur + p.rayon;
        p.x = alea(0, largeur);
      }
      if (p.x < -10) p.x = largeur + 10;
      if (p.x > largeur + 10) p.x = -10;

      dessinerParticule(p);
    }

    animationId = requestAnimationFrame(boucle);
  }

  const observer = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (reduit) return;
      if (entree.isIntersecting && !animationId) {
        animationId = requestAnimationFrame(boucle);
      } else if (!entree.isIntersecting && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  }, { threshold: 0.02 });

  window.addEventListener("resize", redimensionner, { passive: true });
  redimensionner();
  observer.observe(canvas.parentElement || canvas);

  if (!reduit) animationId = requestAnimationFrame(boucle);
})();
