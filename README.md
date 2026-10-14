# VERBUM — Le Musée Virtuel de la Bible 🏛️

> **« La Parole qui traverse les millénaires »**
> Un musée numérique ultra-moderne, 100 % en français, retraçant la transmission quasi intacte
> de la Bible — de Moïse (≈ −1400) au **Codex H (24 avril 2026)**.

---

## 🌐 Accès
- **Aperçu local** : `http://localhost:4173` (serveur `python3 -m http.server 4173`)
- **Paquet de déploiement** : `verbum-site.zip` (43 Mo, à décompresser sur n'importe quel hébergement statique)

## 🗺️ Ce que contient le musée
| Ressource | Contenu |
|---|---|
| **Accueil** (`index.html`) | Hero parallaxe + particules, manifeste, frise 20 jalons avec modale, carte du monde interactive, 10 cartes galeries, visite audio (3 pistes) |
| **La Grande Frise** (`frise.html`) | 36 événements cliquables de −1450 à 2026, 5 époques, 4 filtres, **recherche plein texte**, modale navigable (←/→) |
| **10 galeries** (`galeries/`) | I. Les Origines · II. Les Copistes & Massorètes · III. Qumrân ⭐ · IV. Les Grands Codex Grecs · V. Codex H 2026 · VI. Les Textes Apocryphes · VII. La Septante & les Grandes Traductions · VIII. Gutenberg · IX. Preuves Archéologiques · X. La Bible résiste aux Destructions |
| **Sources & Méthode** (`sources.html`) | Les 5 règles éditoriales, sources primaires (Glasgow, BnF, musées), limites assumées, épilogue audio |
| **Le Défi** (`quiz.html`) | Quiz interactif : 10 questions, explications sourcées, liens vers les galeries |
| **Le Cabinet des Trésors** (`tresors.html`) | 24 chefs-d'œuvre contemplatifs, galerie masonry + lightbox navigable, 2 narrations |
| **Le Glossaire Vivant** (`glossaire.html`) | 23 termes essentiels, recherche instantanée, index A-Z, chaque terme relié à sa salle |
| **Le Dossier Paul** (`galeries/paul.html`) | Hors-série : P46 → Codex H, textes hors canon, débat d'authenticité (les 2 thèses), 1 Cor 13 & Rom 8 traduits |
| **La Radio de VERBUM** (`radio.html`) | Les 63 narrations réunies, rangées par salle — le musée les yeux fermés |
| **Le Comparateur de Textes** (`comparateur.html`) | 5 passages en hébreu/grec/latin/français (Gen 1:1, Chema, Ps 23, És 53:5, Jn 1:1) + notes |
| **La Visite guidée** (`visite-guidee.html`) | Le parcours complet en 10 étapes / 90 minutes, avec narrations et temps par étape |
| **L'Expédition des Petits Scribes** (`parcours-jeunesse.html`) | Parcours jeunesse : 7 missions, étoiles, progression mémorisée (localStorage) |
| **La Salle des Questions** (`questions.html`) | FAQ : 12 réponses sourcées (transmission, canon, Codex H, méthode…) en accordéon |
| **Confort de visite** (widget universel) | Taille du texte, espace de lecture, préférences mémorisées — sur toutes les pages |
| **113 images** | Toutes photoréalistes cinématographiques, **JPG haute qualité** uniquement |
| **67 narrations** | MP3, voix grave/solennelle française (`voice-00`) |

## 📐 Conventions éditoriales (non négociables)
1. **Tétragramme יהוה** → toujours traduit par **« Jéhovah »** (jamais « Seigneur »/« LORD »)
2. **Zéro croix** sur tout le site (visuels, icônes, images générées)
3. **Badges stricts** : `CANONIQUE` (vert) / `APOCRYPHE` (rouge) — jamais de confusion
4. **Textes courts** (inscriptions, versets) → traduction française intégrale ; **textes longs** → résumé détaillé
5. **Honnêteté scientifique** : datations débattues présentées avec leurs DEUX thèses (ex. P64 : 40-60 vs 150-200) ; parallèles non consensuels signalés comme « hypothèse » (ex. papyrus Ipuwer) ; **Codex H : « PAS de textes inédits »** explicitement affiché
6. Site **exclusivement en français** (hébreu/grec autorisés avec traduction immédiate)

## 🔬 Faits marquants intégrés
- **Ketef Hinnom** (≈ −1250) : bénédiction de Nombres 6:24-26, plus ancien fragment biblique
- **Qumrân** : 11 grottes, 900+ manuscrits, 1QIsa ≈ −125, ~95 % identique au texte massorétique
- **P52** (Jean 18, Manchester) · **P64 Matthieu** : Thiede 40-60 **et** consensus 150-200
- **Alep** (≈ 920, 195 feuillets sauvés en 1947) · **Leningradensis** (1008, base BHS/BHQ)
- **Codex H** (2026) : Garrick Allen/Glasgow, 42 pages ressuscitées, multispectral + C14 Sorbonne
- **Preuves archéologiques** : Merneptah, Mésha, Tel Dan (« Maison de David »), cylindre de Cyrus, inscription de Pilate

## 🛠️ Architecture
```
verbum/
├── index.html · frise.html · robots.txt · sitemap.xml
├── galeries/          (10 pages)
├── css/               tokens · base · layout · components · animations
│                      musee · galeries · qumran · codexh · grande-frise
├── js/                app · particles · timeline · carte · audio-player
│                      grottes · codexh · grande-frise(-data)
├── data/              timeline.json · timeline-data.js
└── assets/            icons/ (SVG codés main) · images/ (121 JPG) · audio/ (71 MP3)
```

## ✅ Audit final (E30)
- 33 pages HTML · liens locaux vérifiés — **0 cassé**
- 0 croix · `lang="fr"` partout · meta description partout · 0 image sans `alt`
- 150 fichiers images = 150 JPG (aucun PNG/SVG généré) · 113 MP3
- SEO : JSON-LD `WebSite` + `WebPage`/`BreadcrumbList` par page, sitemap.xml (32 URL), robots.txt, Open Graph partout
- Accessibilité : skip-link « Aller au contenu », `:focus-visible` global, `lang` sur passages hébreu/grec, alt sur 100 % des images
- Recherche plein texte · quiz · lightbox clavier · comparateur multilingue · parcours jeunesse mémorisé · FAQ · confort de lecture universel · débats à double thèse · 2 dossiers hors-série · colophon · atlas interactif · livre d'or · lumière des lettres · science du texte · vrai ou faux · jardin des psaumes · voix du monde · énigmes du texte

---
*Projet éducatif et culturel — VERBUM 2026. États E01→E30 terminés et validés.*
