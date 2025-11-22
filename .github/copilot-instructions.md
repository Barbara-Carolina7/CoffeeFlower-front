<!-- Project: CoffeeFlower-front - Copilot instructions for AI coding agents -->

# Quick orientation

- Framework: React 19 + Vite (see `vite.config.js`).
- Dev commands: `npm run dev` (vite), `npm run build`, `npm run preview`, `npm run lint` (ESLint).
- App is a single-page app with components organized by atomic -> molecules -> organisms -> templates under `src/components/`.

# Big picture (what to know up front)

- Routing & pages: routes are defined under `src/routes/` (see `config.jsx` and `ProtectedRoute.jsx`). User and admin pages live in `src/pages/` (e.g., `pages/user`, `pages/admin`).
- State & auth: `src/context/AuthContext.jsx` holds authentication state (keeps user in `localStorage` and exposes `login`/`logout`). Many UI flows expect `useAuth()` to be present.
- Service layer: API calls are centralized in `src/services/*.jsx` and expect an axios instance at `src/api/axios` (imported as `api`). That axios instance is expected to handle base URL and JWT interceptors. Note: this axios file is not present in the repo — add `src/api/axios.js` when implementing or mock it in tests.
- Public assets: static images and files are in `public/` and are referenced directly (see `src/App.jsx` which maps product names to images in `public/`).

# Important project-specific conventions

- Component hierarchy: follow the existing atoms/molecules/organisms/templates split.
  - atoms: single-purpose small components (e.g., `src/components/atoms/Button.jsx`).
  - molecules: composed small components (e.g., `DynamicInput.jsx`, `DynamicTable.jsx`).
  - organisms/templates: larger composition and page layout (e.g., `AdminLayout.jsx`, `CreateModal.jsx`).
- Services use an `api` axios instance (imported like `import api from '../api/axios'`) and return `response.data`. Services log errors and re-throw for UI handling — follow that pattern.
- Naming: files use PascalCase for React components and camelCase for utilities and services.

# Integration points & gotchas

- Backend endpoints: code shows multiple endpoint conventions.
  - `src/services/ProductService.jsx` expects `API_PRODUCTOS_URL = '/api/products'` (English plural).
  - `src/App.jsx` (example UI) fetches `http://localhost:8080/api/productos` (Spanish). Be careful: endpoints differ — confirm backend route names before wiring.
- Axios instance missing: `src/services/*` import `../api/axios` but `src/api/axios` is not in the repo. When implementing, create `src/api/axios.js` that:
  - sets baseURL from env (e.g., `import.meta.env.VITE_API_BASE_URL || ''`),
  - attaches Authorization header via interceptor using token from `localStorage` or `useAuth`,
  - handles common 401/refresh behavior.
- CORS/dev proxy: backend runs separately (likely port 8080). To avoid cross-origin issues in dev either:
  - start backend on same host/port or
  - set `VITE_API_BASE_URL` and/or add a Vite dev proxy in `vite.config.js`.

# Concrete examples (where to look)

- Auth pattern: `src/context/AuthContext.jsx` — localStorage-based user, `login(user)` stores under key `'user'`.
- Service example: `src/services/ProductService.jsx` — wraps axios calls and throws readable Error messages for the UI.
- Route protection: `src/routes/ProtectedRoute.jsx` integrates with `useAuth()` to guard admin routes.
- Static image mapping: `src/App.jsx` demonstrates mapping product names to `public/` images (used by product list / modal UI).

# What Copilot should do here (concise rules)

- Prefer editing existing components following the atoms->molecules->organisms structure.
- When changing API endpoints, update both service files under `src/services/` and any direct `fetch` usages (e.g., `src/App.jsx`).
- If adding or changing network logic, create/modify `src/api/axios.js` and use `VITE_API_BASE_URL` for runtime configuration.
- For auth changes, prefer updating `src/context/AuthContext.jsx` (the app relies on that shape: `{ user, login, logout, loading }`).
- Preserve existing export shapes: services return `response.data` and components receive plain JS objects (not wrappers).

# Dev & debugging notes

- Start dev server: `npm run dev` (Vite provides fast HMR).
- Backend default used in code: `http://localhost:8080` — run backend or set `VITE_API_BASE_URL` in `.env` (e.g., `VITE_API_BASE_URL=http://localhost:8080`).
- Lint: `npm run lint` (ESLint). Fixes should follow existing ESLint config in `eslint.config.js`.

# If something is missing

- Add a minimal `src/api/axios.js` when implementing API-layer work. Example to follow (base + interceptor + export default api).
- Verify spelling/locale of backend routes (Spanish vs English) before mass-replacing endpoints.

---
If any of these areas are unclear or you'd like me to include a suggested `src/api/axios.js` template or add a dev proxy in `vite.config.js`, tell me and I'll update this file. 
