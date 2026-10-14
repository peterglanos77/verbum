/* ============================================================
   VERBUM — L'Expédition des Petits Scribes
   7 missions · étoiles · progression mémorisée (localStorage)
   ============================================================ */
(function () {
  "use strict";

  const zone = document.getElementById("missions-zone");
  const compteur = document.getElementById("missions-compteur");
  const jauge = document.getElementById("missions-jauge");
  if (!zone) return;

  const CLE = "verbum-jeunesse-missions";
  let accomplies = new Set();
  try {
    accomplies = new Set(JSON.parse(localStorage.getItem(CLE) || "[]"));
  } catch (e) { /* démarrage à vide */ }

  const missions = [
    {
      id: "ketef",
      titre: "Mission 1 — Le plus ancien écrit de la Bible",
      mission: "Deux petites bandes d'argent, gravées il y a plus de 3 000 ans. Elles portent une bénédiction que tu connais peut-être : « Que Jéhovah te bénisse et te garde. » Ton défi : les trouver dans la Galerie I.",
      indice: "Cherche « Ketef Hinnom » — et regarde bien : c'est plus petit qu'un doigt !",
      lien: { href: "galeries/origines.html", texte: "Partir vers la Galerie I →" }
    },
    {
      id: "grottes",
      titre: "Mission 2 — Compter les grottes",
      mission: "Dans le désert, près de la mer Morte, des grottes ont gardé des secrets pendant 2 000 ans. Combien de grottes ont livré des manuscrits ? Va vérifier dans la Galerie III — et regarde la carte interactive.",
      indice: "Le chiffre est entre 10 et 12… et il fait partie du titre de la galerie.",
      lien: { href: "galeries/qumran.html", texte: "Partir vers la Galerie III →" }
    },
    {
      id: "p52",
      titre: "Mission 3 — Le livre le plus petit",
      mission: "Un fragment de manuscrit pas plus grand qu'une carte de visite — et c'est pourtant le plus ancien texte du Nouveau Testament au monde ! Trouve P52 dans la Galerie IV et mesure-le des yeux.",
      indice: "Il est conservé à Manchester, et il écrit l'Évangile de Jean.",
      lien: { href: "galeries/codex-grecs.html", texte: "Partir vers la Galerie IV →" }
    },
    {
      id: "gutenberg",
      titre: "Mission 4 — L'atelier de l'inventeur",
      mission: "Il y a 570 ans, un homme a inventé le livre tel que tu le connais. À l'atelier : 180 Bibles imprimées. Devine combien il en reste aujourd'hui… La réponse t'attend dans la Galerie VIII.",
      indice: "Moins de 50. Et chacune vaut plus cher qu'un château !",
      lien: { href: "galeries/gutenberg.html", texte: "Partir vers la Galerie VIII →" }
    },
    {
      id: "tetragramme",
      titre: "Mission 5 — Le nom en quatre lettres",
      mission: "Dans la Bible hébraïque, le nom de Dieu s'écrit avec quatre lettres seulement — on l'appelle le tétragramme. Dans ce musée, on le traduit toujours de la même façon. Trouve laquelle dans le Glossaire.",
      indice: "Ça commence par « J »… et c'est la règle numéro 1 du musée !",
      lien: { href: "glossaire.html", texte: "Ouvrir le Glossaire →" }
    },
    {
      id: "paul",
      titre: "Mission 6 — Le voyageur aux lettres",
      mission: "Un homme a écrit des lettres en voyageant partout autour de la mer Méditerranée — et ses lettres sont les plus anciens écrits chrétiens qui existent. Ouvre le Dossier Paul et repère ses voyages sur la carte.",
      indice: "Il s'appelle Paul, et son histoire finit… à Rome.",
      lien: { href: "galeries/paul.html", texte: "Ouvrir le Dossier Paul →" }
    },
    {
      id: "defi",
      titre: "Mission 7 — Le Défi des grands",
      mission: "Dernière mission, explorateur : relever le Défi de la Transmission. Dix questions pour vérifier tout ce que tu as appris. Pas de piège — seulement des faits. Et si tu as suivi, ton score sera royal.",
      indice: "Relis les étoiles de tes missions : elles contiennent les réponses !",
      lien: { href: "quiz.html", texte: "Relever le Défi →" }
    }
  ];

  function maj() {
    const n = accomplies.size;
    if (compteur) compteur.textContent = `${n} / ${missions.length} missions accomplies`;
    if (jauge) jauge.style.width = `${(n / missions.length) * 100}%`;
    if (n === missions.length && compteur) {
      compteur.textContent = `⭐ ${missions.length} / ${missions.length} — EXPÉDITION TERMINÉE : tu es un gardien du texte !`;
    }
  }

  function sauver() {
    try { localStorage.setItem(CLE, JSON.stringify([...accomplies])); } catch (e) { /* stockage indisponible */ }
  }

  zone.innerHTML = missions.map((m) => `
    <article class="carte-preuve mission-carte" data-id="${m.id}">
      <div class="corps-preuve">
        <div class="date-preuve">Expédition</div>
        <h3>${m.titre}</h3>
        <p class="description">${m.mission}</p>
        <p class="description" style="opacity:.75"><strong>Indice :</strong> ${m.indice}</p>
        <div class="mission-actions">
          <a class="bouton bouton-primaire" href="${m.lien.href}">${m.lien.texte}</a>
          <button type="button" class="bouton bouton-secondaire bouton-mission" data-id="${m.id}" aria-pressed="${accomplies.has(m.id)}">
            ${accomplies.has(m.id) ? "⭐ Mission accomplie !" : "☆ Marquer comme accomplie"}
          </button>
        </div>
      </div>
    </article>`).join("");

  zone.querySelectorAll(".bouton-mission").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.dataset.id;
      if (accomplies.has(id)) {
        accomplies.delete(id);
        b.textContent = "☆ Marquer comme accomplie";
        b.setAttribute("aria-pressed", "false");
      } else {
        accomplies.add(id);
        b.textContent = "⭐ Mission accomplie !";
        b.setAttribute("aria-pressed", "true");
      }
      sauver();
      maj();
    });
  });

  maj();
})();
