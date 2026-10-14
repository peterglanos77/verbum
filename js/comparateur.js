/* ============================================================
   VERBUM — Le Comparateur de Textes
   5 passages · hébreu / grec / latin / français + notes
   ============================================================ */
(function () {
  "use strict";

  const passages = [
    {
      id: "genese-1-1",
      titre: "Genèse 1:1",
      contexte: "La première phrase de la Bible · hébreu ≈ −X<sup>e</sup> s. · LXX ≈ −250 · Vulgate 392-405",
      versions: [
        { langue: "Hébreu (massorétique)", classe: "texte-hebreu", texte: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ", translit: "Bereshit bara Elohim et hashamayim ve'et ha'arets" },
        { langue: "Grec (Septante)", classe: "texte-grec", texte: "Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν.", translit: "En archē epoiēsen ho theos ton ouranon kai tēn gēn" },
        { langue: "Latin (Vulgate)", classe: "", texte: "In principio creavit Deus caelum et terram.", translit: "Jérôme, 392-405" }
      ],
      francais: "« Au commencement, Dieu créa les cieux et la terre. »",
      note: "L'hébreu <em>bara</em> (créa, un mot réservé à Dieu) est rendu en grec par <em>epoiēsen</em> (fit) : la Septante choisi le verbe le plus large. La Vulgate, elle, a créé un mot qui traversera toutes les langues romanes : <em>creavit</em>. La traduction change les mots — pas le récit."
    },
    {
      id: "shema",
      titre: "Deutéronome 6:4 — le Chema",
      contexte: "La prière centrale d'Israël · citée par Jésus dans Marc 12:29",
      versions: [
        { langue: "Hébreu (massorétique)", classe: "texte-hebreu", texte: "שְׁמַע יִשְׂרָאֵל יהוה אֱלֹהֵינוּ יהוה אֶחָד", translit: "Shema Yisraël YHWH Eloheinu YHWH ehad" },
        { langue: "Grec (Septante)", classe: "texte-grec", texte: "Ἄκουε, Ισραήλ· κύριος ὁ θεὸς ἡμῶν κύριος εἷς ἐστιν.", translit: "Akoue, Israël; kurios ho theos hēmōn kurios heis estin" },
        { langue: "Latin (Vulgate)", classe: "", texte: "Audi, Israel: Dominus Deus noster Dominus unus est.", translit: "Jérôme" }
      ],
      francais: "« Écoute, Israël : Jéhovah notre Dieu est un Jéhovah unique. »",
      note: "Le tétragramme <span class=\"texte-hebreu\">יהוה</span> est rendu par <em>kurios</em> en grec et <em>Dominus</em> en latin — « Seigneur ». Convention VERBUM : la traduction française emploie <strong>Jéhovah</strong>, pour rester au plus près de l'hébreu. On compte <strong>deux</strong> occurrences du nom divin dans ce seul verset."
    },
    {
      id: "psaume-23",
      titre: "Psaume 23:1 (= Psaume 22:1 grec/latin)",
      contexte: "« Jéhovah est mon berger » · attention : le numéro change selon les traditions",
      versions: [
        { langue: "Hébreu (massorétique)", classe: "texte-hebreu", texte: "יהוה רֹעִי לֹא אֶחְסָר", translit: "YHWH ro'i lo ekhsar" },
        { langue: "Grec (Septante)", classe: "texte-grec", texte: "Κύριος ποιμαίνει με καὶ οὐδέν με ὑστερήσει.", translit: "Kurios poimainei me kai ouden me hysterēsei" },
        { langue: "Latin (Vulgate)", classe: "", texte: "Dominus regit me, et nihil mihi deerit.", translit: "Psaume 22 dans la Vulgate" }
      ],
      francais: "« Jéhovah est mon berger : je ne manquerai de rien. »",
      note: "Deux observations de muse. 1° La <strong>numérotation</strong> diffère : ce psaume est le 23<sup>e</sup> en hébreu, le 22<sup>e</sup> en grec et en latin (les LXX ont regroupé les psaumes 9 et 10). 2° L'hébreu dit « Jéhovah est mon berger », la Septante « le Seigneur me fait paître » — le même sens, deux images. C'est une <strong>variante de traduction</strong>, pas une contradiction."
    },
    {
      id: "esaie-53-5",
      titre: "Ésaïe 53:5 — le serviteur souffrant",
      contexte: "Le chapitre le plus commenté de l'Ancien Testament · rouleau d'Ésaïe ≈ −125",
      versions: [
        { langue: "Hébreu (massorétique)", classe: "texte-hebreu", texte: "וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ מְדֻכָּא מֵעֲו‍ֹנֹתֵינוּ מוּסַר שְׁלוֹמֵנוּ עָלָיו וּבַחֲבֻרָתוֹ נִרְפָּא־לָנוּ", translit: "Vehu meholal mipeshaeinu meduka me'avonoteinu…" },
        { langue: "Grec (Septante)", classe: "texte-grec", texte: "αὐτὸς δὲ ἐτραυματίσθη διὰ τὰς ἀνομίας ἡμῶν καὶ μεμαλάκισται διὰ τὰς ἁμαρτίας ἡμῶν…", translit: "Autos de etraumatisthē dia tas anomias hēmōn…" },
        { langue: "Latin (Vulgate)", classe: "", texte: "Ipse autem vulneratus est propter scelera nostra, attritus est propter iniquitates nostras…", translit: "Jérôme, depuis l'hébreu" }
      ],
      francais: "« Et lui, il était transpercé à cause de nos révoltes, broyé à cause de nos fautes ; la punition qui nous donne la paix est tombée sur lui, et c'est par ses meurtrissures que nous sommes guéris. »",
      note: "Le Grand Rouleau d'Ésaïe de Qumrân (≈ −125) contient ce verset à <strong>quasi-mot identique</strong> au texte massorétique mille ans plus tard. Comparé au grec, le sens est stable ; les images bougent légèrement (« meurtrissures » / « plaies »). C'est exactement ce que la <a href='galeries/qumran.html'>galerie III</a> démontre en grand : ~95 % d'identité, variantes mineures, transmission solide."
    },
    {
      id: "jean-1-1",
      titre: "Jean 1:1",
      contexte: "L'incipit du quatrième Évangile · grec ≈ 90 ap. J.-C. · P52 ≈ 125",
      versions: [
        { langue: "Grec (Nouveau Testament)", classe: "texte-grec", texte: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.", translit: "En archē ēn ho logos, kai ho logos ēn pros ton theon, kai theos ēn ho logos" },
        { langue: "Latin (Vulgate)", classe: "", texte: "In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.", translit: "Jérôme" },
        { langue: "Grec — P52 (≈ 125)", classe: "texte-grec", texte: "…ν τῇ ἀρχῇ ἦν ὁ λό… καὶ ὁ λό[γος] ἦ[ν] πρ[ὸς τὸν θεόν…", translit: "Fragment de Manchester : les mêmes mots, 80 ans plus tôt" }
      ],
      francais: "« Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu. »",
      note: "<em>Logos</em> se traduit « Parole » (Segond, TOB) ou « Verbe » (traductions catholiques). Le <a href='galeries/codex-grecs.html'>P52</a>, minuscule fragment de Manchester, prouve que ces mots circulaient déjà vers 125 — un siècle à peine après leur rédaction."
    }
  ];

  const zone = document.getElementById("comparateur-zone");
  const onglets = document.getElementById("comparateur-onglets");
  if (!zone || !onglets) return;

  function rendre(i) {
    const p = passages[i];
    onglets.querySelectorAll("[data-passage]").forEach((b) =>
      b.classList.toggle("actif", parseInt(b.dataset.passage, 10) === i)
    );
    zone.innerHTML = `
      <div class="comparateur-contexte">${p.contexte}</div>
      <div class="comparateur-colonnes">
        ${p.versions.map((v) => `
          <div class="comparateur-version">
            <div class="comparateur-langue">${v.langue}</div>
            <div class="comparateur-texte ${v.classe}">${v.texte}</div>
            <div class="comparateur-translit">${v.translit}</div>
          </div>`).join("")}
        <div class="comparateur-version comparateur-francais">
          <div class="comparateur-langue">Français — traduction VERBUM</div>
          <div class="comparateur-texte">${p.francais}</div>
        </div>
      </div>
      <div class="comparateur-note">
        <h4>Note du musée</h4>
        <p>${p.note}</p>
      </div>`;
  }

  onglets.innerHTML = passages.map((p, i) =>
    `<button class="filtre-bouton ${i === 0 ? "actif" : ""}" data-passage="${i}">${p.titre}</button>`
  ).join("");
  onglets.querySelectorAll("[data-passage]").forEach((b) =>
    b.addEventListener("click", () => rendre(parseInt(b.dataset.passage, 10)))
  );
  rendre(0);
})();
