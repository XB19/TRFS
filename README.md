# TRFS — Site vitrine React

Site vitrine en React (Vite + React Router) pour TRFS : Accueil, À propos,
Services, Bon plans, Contact. Pas d'espace client, pas de backend — un
formulaire de contact et une newsletter avec confirmation visuelle
(messages flash), c'est tout ce qu'il faut pour une vitrine.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173

## Build de production

```bash
npm run build
npm run preview
```

## Docker

```bash
docker compose up --build
```

Puis ouvrir http://localhost:8080. L'image compile le site (Node) puis le
sert en statique via nginx (`Dockerfile`, `nginx.conf`), avec le fallback
SPA nécessaire pour que les routes React Router (`/about`, `/services`...)
fonctionnent au rechargement de page.

## Structure

- `src/pages/` — Accueil, À propos, Services, Contact, Bon plans
- `src/components/` — Navbar, Footer, layout, `Reveal` (animation au scroll)
- `src/hooks/useReveal.js` — hook IntersectionObserver derrière `Reveal`
- `src/styles/style.css` — feuille de style globale du site
- `src/styles/animations.css` — animations au scroll, effets hover, micro-interactions
- `public/images`, `public/videos` — assets statiques
