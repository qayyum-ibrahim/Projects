# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Last completed phase: Phase 2
- Next phase: Phase 3
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold and first deploy
- [x] Phase 2: Theme and header
- [ ] Phase 3: Data and filter bar
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

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Git repo root is the parent `projects` folder; the app lives in `gallery/`. In Vercel, set Root Directory to `gallery`.
- Pages are placeholders in `src/pages/`. Router is in `src/App.jsx`, `BrowserRouter` in `src/main.jsx`.
- `App.jsx` renders `<Header />` then `<main>` with the routes. Put `FilterBar` under the header in Phase 3.
- Theme variables: `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--accent` (in `src/styles/theme.css`).
