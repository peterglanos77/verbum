/* ============================================================
   VERBUM — Carte du monde interactive
   Carte en pointillés générée sur canvas · marqueurs · arcs
   de diffusion · infobulles
   ============================================================ */

(function () {
  "use strict";

  const carte = document.getElementById("carte-monde");
  if (!carte) return;

  const canvas = document.getElementById("carte-canvas");
  const coucheMarqueurs = document.getElementById("carte-marqueurs");
  const coucheArcs = document.getElementById("carte-arcs");
  const boutonRayonnement = document.getElementById("toggle-rayonnement");
  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const L = 1000;
  const H = 500;

  /* ---------- Formes continentales stylisées (1000 × 500) ---------- */
  const CONTINENTS = [
    // Amérique du Nord
    [[33, 69], [111, 52], [180, 42], [236, 45], [319, 86], [330, 110], [319, 138], [306, 148], [290, 180], [278, 207], [260, 200], [244, 217], [231, 203], [208, 217], [200, 195], [175, 183], [153, 128], [139, 103], [100, 95], [60, 80]],
    // Amérique du Sud
    [[281, 262], [300, 252], [330, 255], [345, 275], [335, 310], [325, 345], [305, 375], [285, 385], [270, 360], [265, 325], [270, 295]],
    // Groenland
    [[340, 30], [390, 22], [415, 40], [400, 65], [365, 70], [345, 55]],
    // Europe
    [[470, 130], [500, 115], [520, 100], [545, 105], [565, 115], [575, 135], [565, 155], [545, 160], [530, 170], [515, 165], [500, 155], [485, 150]],
    // Îles Britanniques
    [[478, 112], [492, 105], [499, 118], [489, 129], [478, 124]],
    // Afrique
    [[480, 190], [505, 183], [545, 183], [575, 195], [590, 215], [585, 250], [575, 285], [555, 320], [530, 345], [510, 340], [495, 310], [485, 275], [475, 240], [472, 210]],
    // Madagascar
    [[595, 315], [610, 310], [615, 335], [602, 345], [592, 330]],
    // Asie
    [[565, 105], [600, 85], [660, 65], [720, 58], [780, 62], [830, 80], [870, 105], [885, 130], [870, 160], [840, 185], [800, 205], [760, 215], [730, 205], [700, 195], [680, 215], [660, 205], [640, 190], [615, 185], [595, 170], [575, 150]],
    // Inde
    [[660, 195], [690, 195], [715, 215], [705, 245], [685, 240], [670, 220]],
    // Asie du Sud-Est
    [[730, 215], [760, 210], [785, 225], [775, 245], [750, 250], [735, 235]],
    // Indonésie
    [[760, 255], [800, 250], [835, 255], [830, 270], [790, 272], [762, 268]],
    // Australie
    [[805, 290], [845, 280], [885, 290], [895, 315], [875, 338], [835, 340], [810, 325]],
    // Japon
    [[862, 140], [875, 132], [882, 148], [870, 158], [860, 152]]
  ];

  function dansPolygone(x, y, poly) {
    let dedans = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      const croise = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (croise) dedans = !dedans;
    }
    return dedans;
  }

  function dessinerPoints() {
    if (!canvas) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = L * ratio;
    canvas.height = H * ratio;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, L, H);

    const pas = 9;
    for (let y = 0; y < H; y += pas) {
      for (let x = 0; x < L; x += pas) {
        for (const poly of CONTINENTS) {
          if (dansPolygone(x, y, poly)) {
            const dist = Math.hypot(x - 597, y - 185) / 480;
            const alpha = Math.max(0.12, 0.5 - dist * 0.32);
            ctx.beginPath();
            ctx.arc(x, y, 1.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
            ctx.fill();
            break;
          }
        }
      }
    }
  }

  /* ---------- Marqueurs ---------- */
  const LIEUX = [
    { nom: "Jérusalem", role: "Cœur de la transmission : Ketef Hinnom, Codex d'Alep", x: 597, y: 185 },
    { nom: "Qumrân", role: "Manuscrits de la Mer Morte — 900+ manuscrits", x: 601, y: 192 },
    { nom: "Sinaï", role: "Codex Sinaïticus — monastère Sainte-Catherine", x: 592, y: 197 },
    { nom: "Alexandrie", role: "La Septante (LXX) traduite en grec", x: 583, y: 188 },
    { nom: "Nag Hammadi", role: "Codex gnostiques — Évangile de Thomas", x: 587, y: 207 },
    { nom: "Rome", role: "Église primitive — Codex Vaticanus (Vatican)", x: 535, y: 149 },
    { nom: "Mont Athos", role: "Codex H démantelé — Grande Laure", x: 568, y: 156 },
    { nom: "Genève", role: "Papyrus Bodmer (P66) — Fondation Bodmer", x: 517, y: 136 },
    { nom: "Paris", role: "BnF — fragments du Codex H, datation C14", x: 509, y: 128 },
    { nom: "Manchester", role: "Papyrus P52 — John Rylands Library", x: 493, y: 114 },
    { nom: "Londres", role: "Codex Alexandrinus & Sinaïticus — British Library", x: 500, y: 122 },
    { nom: "Leipzig", role: "Codex Sinaïticus — Bibliothèque universitaire", x: 536, y: 119 },
    { nom: "Mayence", role: "Bible de Gutenberg (1455)", x: 524, y: 124 },
    { nom: "Saint-Pétersbourg", role: "Codex Leningradensis — Bible hébraïque complète", x: 584, y: 89 },
    { nom: "Glasgow", role: "Université — reconstitution du Codex H (2026)", x: 487, y: 106 }
  ];

  function poserMarqueurs() {
    if (!coucheMarqueurs) return;
    coucheMarqueurs.innerHTML = LIEUX.map((l) => {
      const gauche = (l.x / L) * 100;
      const haut = (l.y / H) * 100;
      const estCoeur = l.nom === "Jérusalem";
      return `
        <button class="marqueur${estCoeur ? " coeur" : ""}" style="left:${gauche}%;top:${haut}%"
                aria-label="${l.nom} — ${l.role}">
          <span class="marqueur-point"></span>
          <span class="marqueur-bulle"><strong>${l.nom}</strong>${l.role}</span>
        </button>`;
    }).join("");
  }

  /* ---------- Arcs de diffusion depuis Jérusalem ---------- */
  const DESTINATIONS = [
    { x: 535, y: 149 },  // Rome
    { x: 509, y: 128 },  // Paris
    { x: 524, y: 124 },  // Mayence
    { x: 584, y: 89 },   // Saint-Pétersbourg
    { x: 300, y: 210 },  // Amériques
    { x: 520, y: 300 },  // Afrique
    { x: 800, y: 180 },  // Asie de l'Est
    { x: 860, y: 320 }   // Océanie
  ];

  function poserArcs() {
    if (!coucheArcs) return;
    const origine = { x: 597, y: 185 };
    coucheArcs.setAttribute("viewBox", `0 0 ${L} ${H}`);
    coucheArcs.innerHTML = DESTINATIONS.map((d, i) => {
      const cx = (origine.x + d.x) / 2 + (d.y - origine.y) * 0.12;
      const cy = (origine.y + d.y) / 2 - Math.abs(d.x - origine.x) * 0.22 - 30;
      return `<path d="M ${origine.x} ${origine.y} Q ${cx} ${cy} ${d.x} ${d.y}"
                    class="arc-diffusion" style="animation-delay:${i * 0.35}s"/>`;
    }).join("");
  }

  let rayonnementVisible = false;
  if (boutonRayonnement) {
    boutonRayonnement.addEventListener("click", () => {
      rayonnementVisible = !rayonnementVisible;
      carte.classList.toggle("rayonnement-actif", rayonnementVisible);
      boutonRayonnement.classList.toggle("actif", rayonnementVisible);
      boutonRayonnement.setAttribute("aria-pressed", String(rayonnementVisible));
    });
    if (!reduit) {
      // Animation d'entrée douce dès l'affichage de la carte
      const obs = new IntersectionObserver((entrees) => {
        entrees.forEach((e) => {
          if (e.isIntersecting && !rayonnementVisible) {
            setTimeout(() => boutonRayonnement.click(), 700);
            obs.disconnect();
          }
        });
      }, { threshold: 0.35 });
      obs.observe(carte);
    }
  }

  dessinerPoints();
  poserMarqueurs();
  poserArcs();
})();
