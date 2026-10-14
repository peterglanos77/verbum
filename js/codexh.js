/* ============================================================
   VERBUM — Codex H : slider avant/après + étapes technologiques
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Slider avant / après ---------- */
  const slider = document.getElementById("slider-multispectral");
  if (slider) {
    const apres = slider.querySelector(".slider-couche-apres");
    const poignee = slider.querySelector(".slider-poignee");
    const curseur = slider.querySelector("#slider-curseur");

    const majSlider = (valeur) => {
      const v = Math.max(2, Math.min(98, valeur));
      if (apres) apres.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      if (poignee) poignee.style.left = `${v}%`;
      if (curseur && Number(curseur.value) !== v) curseur.value = String(v);
    };

    if (curseur) {
      curseur.addEventListener("input", () => majSlider(Number(curseur.value)));
    }

    // Glisser directement sur l'image
    let enCours = false;
    const depuisEvent = (e) => {
      const rect = slider.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      majSlider((x / rect.width) * 100);
    };
    slider.addEventListener("pointerdown", (e) => {
      enCours = true;
      slider.setPointerCapture(e.pointerId);
      depuisEvent(e);
    });
    slider.addEventListener("pointermove", (e) => {
      if (enCours) depuisEvent(e);
    });
    const relacher = () => { enCours = false; };
    slider.addEventListener("pointerup", relacher);
    slider.addEventListener("pointercancel", relacher);

    majSlider(50);
  }

  /* ---------- Étapes de la technologie multispectrale ---------- */
  const etapes = document.getElementById("etapes-techno");
  if (etapes) {
    const panneau = document.getElementById("etape-panneau");
    const DONNEES = {
      1: {
        titre: "1. Le ré-encrement médiéval",
        texte: "Entre le Xe et le XIIIe siècle, les pages du Codex H sont découpées, puis recouvertes d'une nouvelle encre pour être réutilisées en reliure. Le texte d'origine disparaît sous le nouveau — mais pas entièrement : la chimie garde la mémoire."
      },
      2: {
        titre: "2. L'empreinte chimique",
        texte: "Les composants de la nouvelle encre se transfèrent par contact sur les pages en vis-à-vis, parfois sur plusieurs feuillets de profondeur. Ces empreintes en miroir — le « texte fantôme » — sont invisibles à l'œil nu, mais elles existent physiquement."
      },
      3: {
        titre: "3. L'imagerie multispectrale",
        texte: "Chaque page est photographiée sous de nombreuses longueurs d'onde, de l'ultraviolet à l'infrarouge. Selon la bande spectrale, l'encre fantôme absorbe ou réfléchit différemment que le parchemin : les lettres effacées remontent à la surface de l'image."
      },
      4: {
        titre: "4. La reconstruction numérique",
        texte: "Les 42 pages restituées sont assemblées virtuellement dans leur ordre d'origine, et la datation au radiocarbone (Paris) confirme le VIe siècle. Chaque page physique rend plusieurs pages d'information — et le codex dispersé retrouve son unité."
      }
    };

    const afficher = (n) => {
      const d = DONNEES[n];
      if (!d || !panneau) return;
      panneau.innerHTML = `<h4>${d.titre}</h4><p>${d.texte}</p>`;
      etapes.querySelectorAll("[data-etape]").forEach((b) => {
        b.classList.toggle("actif", Number(b.dataset.etape) === Number(n));
      });
    };

    etapes.addEventListener("click", (e) => {
      const b = e.target.closest("[data-etape]");
      if (b) afficher(b.dataset.etape);
    });
    afficher(1);
  }
})();
