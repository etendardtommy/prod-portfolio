# prod-portfolio

Site portfolio personnel. Consomme l'API FastAPI partagée (`prod-api`) via `site_id = 1`.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **React Router** — navigation SPA
- **react-markdown** + **remark-gfm** + **DOMPurify** — rendu Markdown sécurisé
- **lucide-react** — icônes

## Structure

```
prod-portfolio/
├── src/
│   ├── assets/       # Images et icônes
│   ├── components/   # Composants réutilisables
│   ├── lib/          # Utilitaires, client API, helpers
│   ├── pages/        # Pages associées aux routes
│   ├── App.tsx       # Composant racine + routing
│   └── main.tsx      # Point d'entrée React
├── public/           # Assets statiques
├── dist/             # Build de production (committé)
├── .env.production   # Variables d'environnement de production
└── deploy.sh         # Script de déploiement
```

## Démarrage

```bash
npm install
npm run dev      # Serveur de développement (http://localhost:5173)
npm run build    # Vérification TypeScript + build → dist/
npm run lint     # ESLint
npm run preview  # Prévisualisation du build de production
```

## Variables d'environnement

```env
VITE_API_URL=https://api.t-etendard.fr
```

`.env.production` est committé. `.env.local` et `.env.development` sont ignorés par git.

## Points clés

- **Design brutaliste** — monochrome, hachures — à ne pas modifier sans raison.
- **`AnalyticsTracker`** — composant qui envoie les pages vues en POST à `/api/analytics/`.
- Le contenu des articles et projets est rendu en Markdown avec `react-markdown` et sanitisé via `DOMPurify`.
- Pas de framework de tests.

## Déploiement

Le `dist/` est committé dans git. Le déploiement consiste en un simple `git pull` sur le serveur, qui sert les fichiers statiques via le conteneur Docker `nginx-static`.

**Production :** `https://portfolio.t-etendard.fr`
