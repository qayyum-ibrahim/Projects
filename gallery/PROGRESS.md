# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Last completed phase: Phase 3
- Next phase: Phase 4
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold and first deploy
- [x] Phase 2: Theme and header
- [x] Phase 3: Data and filter bar
- [ ] Phase 4: Project card
- [ ] Phase 5: Pages and grid
- [ ] Phase 6: Polish
- [ ] Phase 7: Docs and final check

## Decisions
(Write each choice you made without asking. One line each, with the phase number.)
- P1: Scaffolded with `npm create vite@latest` (react template) in a temp folder and copied files in, so project docs were not touched.
- P1: Kept the Vite scaffold's oxlint setup and default favicon (favicon is replaced in Phase 6). Skipped the scaffold README (Phase 7 writes one).
- P1: Page title set to "Qayyum · Work".
- P1: Included the owner's pending `/continue` → `/next-phase` command rename in the Phase 1 commit.
- P2: Dark theme is the CSS default (`:root`) so the page is dark if the inline script cannot run.
- P2: localStorage key is `theme`; values `dark` or `light`. Any other stored value falls back to the device setting.
- P2: Components live in `src/components/` with a CSS file next to each. Header logo links to `/`.
- P2: Theme color transitions are turned off under `prefers-reduced-motion`.
- P3: `getProjects(category)` lives in `src/data/getProjects.js`; no argument returns all. Real entries come first, then samples.
- P3: Samples also require `import.meta.env.DEV`, so they never ship even if `.env.local` exists during a local `npm run build` (verified: not in bundle).
- P3: Sample set skips "personal" (12 of 13 website types) plus 3 animations; all use `https://example.com`.
- P3: FilterBar is a pill row rendered in `App.jsx` under the header; active pill is filled with `--text`. "All" uses `end` so it is only active on `/`.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Git repo root is the parent `projects` folder; the app lives in `gallery/`. In Vercel, set Root Directory to `gallery`.
- Pages are placeholders in `src/pages/`. Router is in `src/App.jsx`, `BrowserRouter` in `src/main.jsx`.
- `App.jsx` renders `<Header />`, `<FilterBar />`, then `<main>` with the routes.
- Use `getProjects('websites' | 'animations')` from `src/data/getProjects.js` in cards/pages. Entries have no `videoUrl` yet, so the fallback block will show.
- Theme variables: `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--accent` (in `src/styles/theme.css`).
