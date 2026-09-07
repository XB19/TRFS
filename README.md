# TRFS — Site vitrine React + backend Carrière

Site vitrine en React (Vite + React Router) pour TRFS : Accueil, À propos,
Services, Bon plans, Contact, Carrière. Pas d'espace client — mais un vrai
backend Django + PostgreSQL pour la partie Carrière (offres d'emploi,
candidatures), gérable depuis l'admin Django.

## Frontend — démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173. Par défaut le frontend appelle l'API sur
`http://localhost:8000` (voir `VITE_API_URL` dans `.env`).

## Backend — démarrer (sans Docker)

Prérequis : Python 3.12+, PostgreSQL en cours d'exécution.

```bash
cd backend
python -m venv .venv
./.venv/Scripts/activate          # Windows
# source .venv/bin/activate       # macOS/Linux

pip install -r requirements.txt

cp .env.example .env              # puis renseigne tes propres valeurs
python manage.py migrate
python manage.py createsuperuser  # crée TON propre compte admin
python manage.py runserver 8000
```

Admin : http://localhost:8000/admin/ — API : http://localhost:8000/api/careers/

## Docker (frontend + backend + PostgreSQL)

```bash
cp .env.example .env              # puis renseigne tes propres valeurs
docker compose up --build
```

- Site : http://localhost:8080
- API : http://localhost:8000/api/careers/
- Admin : http://localhost:8000/admin/

Si `DJANGO_SUPERUSER_USERNAME`/`DJANGO_SUPERUSER_PASSWORD` sont renseignés
dans `.env`, ton compte admin est créé automatiquement au premier démarrage
(idempotent). Sinon, crée-le toi-même :

```bash
docker compose exec backend python manage.py createsuperuser
```

**Important** : `.env` (racine et `backend/.env`) est gitignoré — chacun
renseigne ses propres identifiants (mot de passe PostgreSQL, admin) en local,
rien n'est codé en dur dans le dépôt. Voir `.env.example` et
`backend/.env.example` pour la liste des variables.

## Gérer le site (dashboard admin)

**http://localhost:5173/admin/login** — connecte-toi avec ton compte admin
(celui créé via `createsuperuser` ou les `DJANGO_SUPERUSER_*`). C'est un vrai
tableau de bord React, même design que le site public (mêmes couleurs, même
police), pas l'admin Django brut :

- **Tableau de bord** — vue d'ensemble (offres publiées, candidatures par statut)
- **Offres d'emploi** — créer, modifier, dépublier ou supprimer une offre
  (le slug de l'URL publique se génère automatiquement à partir du titre)
- **Candidatures** — chaque candidature reçue (offre visée ou spontanée),
  lien vers le CV, changement de statut (Reçue / En cours d'examen / Retenue /
  Refusée), filtrable par statut

L'admin Django classique (`/admin/`, sur le port du backend) reste disponible
en secours — les deux pointent vers les mêmes données.

Côté site public : menu **Carrière** → *Offres d'emploi* (liste + détail +
formulaire de candidature) et *Candidature spontanée*.

## Build de production (frontend seul)

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/` — Accueil, À propos, Services, Contact, Bon plans
- `src/pages/career/` — Offres d'emploi, détail d'une offre, candidature spontanée
- `src/pages/admin/` — dashboard admin (login, vue d'ensemble, offres, candidatures)
- `src/components/` — Navbar (avec menu déroulant Carrière), Footer, layout,
  `Reveal` (animation au scroll), `ApplicationForm`, `AdminLayout`
- `src/context/AdminAuthContext.jsx` — session admin (token) en localStorage
- `src/api/careers.js` — client API public vers le backend Django
- `src/api/admin.js` — client API admin (authentifié par token)
- `src/hooks/useReveal.js` — hook IntersectionObserver derrière `Reveal`
- `src/styles/style.css` — feuille de style globale du site
- `src/styles/animations.css` — animations au scroll, effets hover, micro-interactions
- `public/images`, `public/videos` — assets statiques
- `backend/careers/` — app Django : modèles `JobOffer`/`Application`, API REST
  publique + admin (Django REST Framework, auth par token), admin Django
- `backend/config/` — settings Django (lit `backend/.env`), CORS, PostgreSQL
