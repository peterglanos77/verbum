/* ============================================================
   VERBUM — Lecteur audio MP3 custom (visite guidée)
   Multi-playlists · progression · onde animée
   ============================================================ */

(function () {
  "use strict";

  const listes = document.querySelectorAll(".playlist-audio");
  if (!listes.length) return;

  const audioGlobal = new Audio();
  audioGlobal.preload = "none";

  let listeCourante = null;
  let indexCourant = -1;

  function majEtat() {
    listes.forEach((liste) => {
      liste.querySelectorAll("[data-audio-src]").forEach((bouton, i) => {
        const actif = liste === listeCourante && i === indexCourant && !audioGlobal.paused;
        bouton.classList.toggle("lecture-en-cours", actif);
        const icone = bouton.querySelector(".icone-lecture");
        if (icone) {
          icone.innerHTML = actif
            ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>';
        }
      });
    });
  }

  function jouer(liste, index) {
    const boutons = liste.querySelectorAll("[data-audio-src]");
    if (index < 0 || index >= boutons.length) return;
    if (liste !== listeCourante || index !== indexCourant) {
      listeCourante = liste;
      indexCourant = index;
      audioGlobal.src = boutons[index].dataset.audioSrc;
    }
    audioGlobal.play().catch(() => {});
    majEtat();
  }

  listes.forEach((liste) => {
    const boutons = liste.querySelectorAll("[data-audio-src]");
    boutons.forEach((bouton, i) => {
      bouton.addEventListener("click", () => {
        if (liste === listeCourante && i === indexCourant && !audioGlobal.paused) {
          audioGlobal.pause();
          majEtat();
        } else {
          jouer(liste, i);
        }
      });
    });
  });

  audioGlobal.addEventListener("ended", () => {
    if (!listeCourante) return;
    const boutons = listeCourante.querySelectorAll("[data-audio-src]");
    if (indexCourant + 1 < boutons.length) {
      jouer(listeCourante, indexCourant + 1);
    } else {
      indexCourant = -1;
      majEtat();
    }
  });
  audioGlobal.addEventListener("play", majEtat);
  audioGlobal.addEventListener("pause", majEtat);

  // Barre de progression (optionnelle, dernière liste rencontrée)
  const barre = document.getElementById("audio-progression");
  if (barre) {
    audioGlobal.addEventListener("timeupdate", () => {
      if (audioGlobal.duration) {
        barre.style.transform = `scaleX(${audioGlobal.currentTime / audioGlobal.duration})`;
      }
    });
    audioGlobal.addEventListener("ended", () => {
      barre.style.transform = "scaleX(0)";
    });
  }

  majEtat();
})();
