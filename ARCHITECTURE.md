# 🏛️ VERBUM — Architecture du Projet

## Arborescence complète

```
verbum/
├── index.html                  # 🏠 Page d'accueil — entrée épique du musée
├── README.md                   # Documentation projet
├── ARCHITECTURE.md             # Ce fichier
├── WORKFLOW.md                 # Machine à états E01→E14
├── css/
│   ├── tokens.css              # Design tokens (couleurs, typo, espacements, easing)
│   ├── base.css                # Reset, typographie, fondations
│   ├── layout.css              # Navigation, sections, grille, footer
│   ├── components.css          # Cards, badges, boutons, frise, compteurs, lecteur audio
│   └── animations.css          # Keyframes, loader, reveals, parallaxe
├── js/
│   ├── app.js                  # Orchestrateur (nav, reveal, compteurs, frise, curseur)
│   ├── particles.js            # Particules dorées (canvas hero)
│   ├── timeline.js             # [E13] Frise chronologique géante
│   ├── audio-player.js         # [E02+] Lecteur MP3 custom
│   └── search.js               # [E14] Recherche interne
├── assets/
│   ├── images/                 # Toutes les images JPG haute qualité
│   │   ├── hero-qumran.jpg
│   │   ├── parchemin-deroule.jpg
│   │   ├── scribe-hebreu.jpg
│   │   ├── scriptorium-moine.jpg
│   │   ├── atelier-gutenberg.jpg
│   │   ├── rouleaux-argent.jpg
│   │   ├── desert-judee.jpg
│   │   ├── bibliotheque-antique.jpg
│   │   └── logo-verbum.jpg
│   ├── audio/                  # Narrations MP3 (visite guidée, commentaires)
│   └── icons/
│       └── favicon.svg         # Monogramme V doré
├── galeries/
│   ├── origines.html                 # [E03] ✅ Galerie I — Moïse, Ketef Hinnom
│   ├── copistes.html                 # [E04] Galerie II — Scribes & massorètes
│   ├── qumran.html                   # [E05] Galerie III ⭐ section phare
│   ├── codex-grecs.html              # [E06] Galerie IV
│   ├── codex-h.html                  # [E07] Galerie V 🔥 actualité 2026
│   ├── apocryphes.html               # [E08] Galerie VI
│   ├── traductions.html              # [E09] Galerie VII
│   ├── gutenberg.html                # [E10] Galerie VIII
│   ├── preuves.html                  # [E11] Galerie IX
│   ├── destructions.html             # [E12] Galerie X
│   └── frise.html                    # [E13] Grande frise
└── data/
    ├── timeline.json           # Événements de la frise (source de vérité)
    ├── manuscrits.json         # [E03+] Registre des manuscrits
    └── recherche-index.json    # [E14] Index de recherche
```

## Charte graphique (Design Tokens)

| Jeton | Valeur | Usage |
|-------|--------|-------|
| `--or-sacre` | `#C9A84C` | Titres, accents, bordures de manuscrits |
| `--or-clair` | `#E8D48B` | Survol, dégradés, lueurs |
| `--parchemin` | `#F5E6C8` | Fonds de cartes |
| `--blanc-parchemin` | `#F0E8D5` | Textes sur fond sombre |
| `--noir-profond` | `#0A0A0F` | Fond général |
| `--bleu-nuit` | `#0D1B2A` | Sections secondaires |
| `--rouge-antique` | `#8B1A1A` | Badge APOCRYPHE, accents dramatiques |
| `--vert-canon` | `#3E7C4F` | Badge CANONIQUE |
| `--gris-pierre` | `#4A4A5A` | Métadonnées, textes secondaires |

**Typographies** : Cinzel Decorative (galeries) · Cormorant Garamond (titres) · EB Garamond (corps) · Inter (UI) · Noto Sans Hebrew / Noto Sans Greek (textes originaux).

## Conventions éditoriales absolues

1. **Tétragramme יהוה ➜ « Jéhovah »** dans toute traduction et tout commentaire.
2. Tout texte original (hébreu/grec) est **toujours** accompagné de sa traduction française.
3. Badge **CANONIQUE** (vert doré) ou **APOCRYPHE** (rouge antique) sur chaque document.
4. Textes courts ➜ **texte intégral** traduit ; textes longs ➜ **résumé détaillé**.
5. **Aucune croix** dans aucun visuel du site.
6. Site **100 % en français** (y compris navigation, UI, métadonnées).
7. Images : JPG hyperréalistes cinématographiques · Audios : MP3.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Structure | HTML5 sémantique |
| Style | CSS3 + variables (design tokens) + animations natives |
| Logique | JavaScript ES6+ vanilla (cœur 100 % autonome, hors-ligne capable) |
| Particules | Canvas 2D (léger) — Three.js possible en option E02+ |
| Cartes | Leaflet.js (E02/E05) |
| Audio | Lecteur custom (Howler.js optionnel) |
| Perf. | Lazy loading, `loading="lazy"`, `content-visibility`, Service Worker (E14) |
| Hébergement | GitHub Pages / Netlify / Vercel (E14) |

## Conventions de code

- Classes CSS en `kebab-case`, préfixées par composant (`carte-manuscrit`, `badge-canonique`).
- Data-attributes pour l'interactivité (`data-reveal`, `data-count`, `data-audio`).
- `prefers-reduced-motion` respecté sur toutes les animations.
- JS sans dépendance obligatoire : le site fonctionne même si les CDN sont absents.
