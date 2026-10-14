# ⚙️ VERBUM — Workflow & Machine à États

> **Projet** : VERBUM — Le Musée Virtuel de la Bible
> **Langue du site** : Français exclusivement · **Langue de pilotage** : Français
> **Dernière mise à jour** : 13 octobre 2026

---

## 🔄 Machine à états — Vue générale

```
E01 ➜ E02 ➜ E03 ➜ E04 ➜ E05 ➜ E06 ➜ E07 ➜ E08 ➜ E09 ➜ E10 ➜ E11 ➜ E12 ➜ E13 ➜ E14
Architecture   Accueil  G1    G2    G3*   G4    G5    G6    G7    G8    G9    G10   Frise   Final
(* = section phare)
```

**Protocole d'avancement** : à la fin de chaque état, l'agent affiche un résumé visuel,
la barre de progression, puis **demande explicitement à l'utilisateur de valider pour continuer**.

---

## 📊 Tableau de bord des états

| ID | État | Statut | Livrable clé |
|----|------|--------|--------------|
| E01 | Initialisation & Architecture | ✅ TERMINÉ | Arborescence, design system, page d'accueil animée, logo/favicon |
| E02 | Page d'accueil épique | ✅ TERMINÉ | Hero parallaxe + particules, frise 20 événements avec modale, carte du monde interactive, 20 images, 3 narrations MP3 |
| E03 | Galerie I — Les Origines (Moïse, Ketef Hinnom) | ✅ TERMINÉ | Texte intégral de la bénédiction (hébreu + français, Jéhovah), preuves Ébla/Ipuwer/Mérenptah, 8 images, 3 narrations |
| E04 | Galerie II — Copistes & Massorètes | ✅ TERMINÉ | Esdras & scribes, niqqud/massorah, Alep & Leningradensis, Genizah & Papyrus Nash, 8 images, 4 narrations |
| E05 | Galerie III — Manuscrits de la Mer Morte | ✅ TERMINÉ | 1947 & les 11 grottes (carte interactive), Grand Rouleau d'Ésaïe + comparateur 3 colonnes, manuscrits sectaires/apocryphes, 8 images, 7 narrations |
| E06 | Galerie IV — Grands Codex grecs | ✅ TERMINÉ | P52/P66/P64 traduits intégralement, Vaticanus/Sinaïticus/Alexandrinus/Bible éthiopienne, controverse Matthieu, liens digi.vatlib & codexsinaiticus, 8 images, 5 narrations |
| E07 | Galerie V — Codex H : 42 pages perdues (2026) | ✅ TERMINÉ | Récit du démantèlement, slider avant/après multispectral, 4 étapes technologiques interactives, citation Pr. Allen, carte de dispersion 5 pays, 8 images, 5 narrations |
| E08 | Galerie VI — Textes apocryphes | ✅ TERMINÉ | Thomas/Marie/Judas/Hénoch/Hermas (résumés + extraits traduits), formation du canon (Muratorie, Athanase), 8 images, 4 narrations |
| E09 | Galerie VII — Septante & traductions antiques | ✅ TERMINÉ | LXX (Lettre d'Aristée résumé + Siracide traduit), Hexaples, Vulgate, Peshitta, Wyclif/Luther/Olivétan/Segond, BHS/BHQ ; 9 images, 5 narrations |
| E10 | Galerie VIII — Gutenberg & l'imprimerie | ✅ TERMINÉ | B42 (180 ex./48 survivants, Gen 1:1 traduit), 4 étapes techniques, procès Fust, Psautier 1457, diffusion ; 7 images, 5 narrations |
| E11 | Galerie IX — Preuves historiques & archéologiques | ✅ TERMINÉ | Merneptah, Mésha, Tel Dan (Maison de David), Cyrus, Pilate, bulles d'Ézéchias/Ésaïe, Ebla, Nash, Ipuwer (débat) ; 6 images, 5 narrations |
| E12 | Galerie X — La Bible face aux destructions | ✅ TERMINÉ | Dioclétien 303, Index/chaînes, Wyclif/Tyndale, Voltaire (récit nuancé), URSS/samizdat, sauvetages ; 6 images, 5 narrations |
| E13 | Frise chronologique géante interactive | ✅ TERMINÉ | frise.html : 36 jalons -1450 ➜ 2026, 5 époques, 4 filtres, modale cliquable (←/→), liens vers 10 galeries ; hero-frise + grande-frise.{css,js} + grande-frise-data.js |
| E14 | Assemblage final & déploiement | ✅ TERMINÉ | Audit 422 liens (0 cassé), SEO (JSON-LD, sitemap, robots), recherche plein texte sur la frise, 100 % français, 0 croix, ZIP de déploiement |
| E15 | Salle des Sources & Défi final | ✅ TERMINÉ | sources.html (méthode en 5 règles + sources primaires), quiz.html (10 questions interactives avec explications + liens galeries), épilogue audio ; 2 images, 2 narrations |
| E16 | Cabinet des Trésors & Glossaire vivant | ✅ TERMINÉ | tresors.html (24 chefs-d'œuvre, masonry + lightbox ←/→), glossaire.html (23 termes, recherche A-Z, liens salles), 2 narrations contemplatives + 1 glossaire ; 2 images |
| E17 | Dossier Paul (hors-série) | ✅ TERMINÉ | galeries/paul.html : P46, Claromontanus, Codex H & Paul, Actes de Paul/3Cor/Laodicéens (badge rouge), débat authenticité 7 vs 13 (DEUX thèses), 1 Cor 13 + Rom 8 traduits ; 6 images, 5 narrations |
| E18 | Radio du musée & Comparateur de textes | ✅ TERMINÉ | radio.html (63 pistes rangées par salle), comparateur.html (5 passages hébreu/grec/latin/français + notes : Gen 1:1, Chema, Ps 23, És 53:5, Jn 1:1) ; 2 images, 2 narrations |
| E19 | Parcours jeunesse & Visite guidée pas-à-pas | ✅ TERMINÉ | parcours-jeunesse.html (7 missions, étoiles, progression localStorage), visite-guidee.html (10 étapes / 90 min avec narrations et liens) ; 2 images, 2 narrations |
| E20 | Salle des Questions & Confort de visite | ✅ TERMINÉ | questions.html (FAQ 12 réponses sourcées, accordéon), widget de confort universel (taille texte, espace de lecture, localStorage) dans app.js ; 2 images, 2 narrations |
| E21 | Dossier Marie-Madeleine (HS) & Colophon | ✅ TERMINÉ | marie-madeleine.html (Jn 20:11-18 traduit, Évangile de Marie apocryphe BG 8502, Évangile de Philippe, mélange médiéval Grégoire 591 → réforme 1969, Sainte-Baume tradition), colophon.html (conventions, production, méthode) ; 4 images, 4 narrations |
| E22 | Atlas & Cartes interactives | ✅ TERMINÉ | atlas.html : 3 cartes SVG interactives (monde des manuscrits 11 lieux, Qumrân 11 grottes, route des traductions 9 stations), panneaux cliquables + clavier (js/atlas.js) ; 4 images, 4 narrations |
| E23 | Livre d'Or des Découvertes | ✅ TERMINÉ | livre-or.html : 10 découvertes (Ketef Hinnom 2 thèses de datation, Merneptah, Mesha/Tel Dan, Cyrus, Septante, Qumrân, P52, Leningrad/Alep, Gutenberg, Codex H) ; image rouleaux-argent-deroules.jpg remplacée (réaliste, d'après photos) ; 3 images, 5 narrations |
| E24 | La Lumière des Lettres (Le Texte dans l'Art) | ✅ TERMINÉ | art.html : 5 pages (rouleau→codex, enluminure, sofer, onciale/caroline, rubricateurs) + Psaume 119:105 hébreu→FR ; 6 images ornementales sans croix, 5 narrations |
| E25 | La Science au secours du Texte | ✅ TERMINÉ | science.html : 5 pages (carbone 14 & Codex H, paléographie + 2 thèses P64, imagerie multispectrale & virtual unwrapping Ein Gedi 2016, IA Groningue, conservation) ; 6 images (1 échec puis réussie), 5 narrations |
| E26 | Vrai ou Faux (10 idées reçues) | ✅ TERMINÉ | vrai-faux.html : 10 verdicts (Faux/Nuancé/Vrai nuancé) sourcés et liés aux galeries ; + passe améliorations : 404.html, lang="he" sur passages hébreux, OG tags ; 3 images, 5 narrations |
| E27 | Le Jardin des Psaumes | ✅ TERMINÉ | jardin-psaumes.html : 7 psaumes traduits intégralement (1, 8, 19, 23, 121, 137, 150) en hébreu dir=rtl + français, Tétragramme → Jéhovah ; 5 images, 8 narrations |
| E28 | Les Voix du Monde (10 langues) | ✅ TERMINÉ | voix-monde.html : hébreu, araméen, grec, latin, syriaque, arménien, guèze, gothique, slavon, français — alphabets, « mot qui voyage » traduit, anecdotes (Rosette, Bible d'argent Uppsala, Olivétan) ; 4 images, 5 narrations |
| E29 | Passe qualité complète (A1+A2+A3) | ✅ TERMINÉ | skip-link + id="contenu" (32 pages), :focus-visible global, width/height sur toutes les images (CLS), Open Graph (28 pages), JSON-LD WebPage + BreadcrumbList (31 pages) ; 0 image, 0 audio (aucun nécessaire) |
| E30 | Les Énigmes du Texte | ✅ TERMINÉ | enigmes.html : 6 énigmes (fin de Marc 2 thèses, femme adultère 2 thèses, comma johanneum addition tardive, 666/616, trésor de Manué, arche disparue « ce que nous ne savons pas ») ; 4 images, 5 narrations |

---

## 📐 Définition du « Terminé » (DoD) pour chaque état

Un état est **TERMINÉ** uniquement si :
1. Tous les contenus textuels sont rédigés en français (textes courts ➜ intégral + langue originale ; textes longs ➜ résumé détaillé).
2. Le tétragramme יהוה est traduit par **Jéhovah** partout.
3. Les badges **CANONIQUE** / **APOCRYPHE** sont posés sur chaque document.
4. Les images (JPG, max 10/réponse, style hyperréaliste cinématographique, **jamais de croix**) sont générées et intégrées.
5. Les audios (MP3, max 10/réponse) sont générés et intégrés via le lecteur custom.
6. La navigation, le responsive et les animations sont fonctionnels.
7. Un résumé + la barre de progression sont affichés, puis **validation utilisateur demandée**.

---

## 🔁 Boucles de reprise

- **Échec génération image** ➜ régénérer au tour suivant (compteur de 10 images/tour inclut les échecs).
- **Contenu insuffisant** ➜ recherches web complémentaires (CSNTM, e-codices, digi.vatlib.it, codexsinaiticus.org, deadseascrolls.org.il, codexh.arts.gla.ac.uk).
- **Rejet utilisateur** ➜ retour à l'état concerné, statut 🔄 EN COURS.

---

## 📦 Jalons livrables majeurs

| Jalon | Contenu |
|-------|---------|
| **M1** (E01-E02) | Musée ouvert : accueil immersif complet |
| **M2** (E03-E05) | Cœur de la démonstration : origines ➜ massorètes ➜ Qumrân |
| **M3** (E06-E08) | Codex grecs, actualité 2026, apocryphes |
| **M4** (E09-E12) | Traductions, imprimerie, preuves, résistance |
| **M5** (E13-E14) | Frise géante + site finalisé, SEO, déploiement |

---

## ✅ Clôture provisoire — le 13 octobre 2026 (réouvert en E30)

**E01 → E29** toutes terminées et validées. 32 pages HTML · 146 JPG · 108 MP3 · 0 lien cassé.
Aucun fichier ZIP produit (consigne utilisateur). Le workspace `verbum/` est la livraison finale.
| E32 | Les Petits Boutons | 14 octobre 2026 | **Réparation des boutons de navigation « supérieur / inférieur »** : les chevrons `lien-galerie` s'affichaient en géant sur les 9 salles + le Plan (CSS de galeries non chargé) → composant unique moderne (petites pastilles, chevron 14 px en pastille dorée) déplacé dans `components.css` (34 pages) ; `.icone-bouton` enfin dimensionnée (17 px, 12 instances) ; filet de sécurité `:where(svg)` contre les SVG sans dimension |
| E33 | Le Grand Héros | 14 octobre 2026 | **Correction de la superposition en haut d'explorer.html** (et 9 salles en sursis) : le héros `hero-galerie` n'était stylé que par `galeries.css`, non chargé sur 10 pages → `galeries.css` injecté sur art, atlas, colophon, enigmes, explorer, jardin-psaumes, livre-or, science, voix-monde, vrai-faux ; balayage systémique classes CSS × pages = **0 trou restant** ; blocs partagés déplacés dans `components.css` (verdicts vert/rouge, `.mission-actions`, `.barre-filtres-grande`) |
