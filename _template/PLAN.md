# Build plan (same for every demo site)

Rules are in `CLAUDE.md`. Content and design are in `BRIEF.md` (Name, Mood, Colors, Fonts, Pages, Features, Images). State is in `PROGRESS.md`.
Each phase ends with: `npm run build` passes, `PROGRESS.md` updated, commit, push.

How to split the Pages list in `BRIEF.md`:
- "Home" is the first page in the list. It is Phase 2.
- The other pages keep the order of the list. The first half (round up) is Phase 3. The rest is Phase 4.
- Each feature under Features is built in the phase of the page that uses it. Features that belong to the whole site (header, animations) are built in Phase 1 or 2.
- Write the split under Decisions in `PROGRESS.md` in Phase 1, so later sessions use the same split.

---

## Phase 1: Scaffold, deploy and design system
Goal: an empty but styled shell is live on Vercel.
- [ ] Check `git remote -v` shows `origin`. If not, this is a hard blocker.
- [ ] Create the Vite + React (JavaScript) app in the current folder. Do not overwrite `CLAUDE.md`, `PLAN.md`, `PROGRESS.md`, `BRIEF.md` or `.claude/`.
- [ ] Install `react-router-dom` and the `@fontsource/*` packages from the brief. Remove the Vite demo content.
- [ ] Add `vercel.json` (rewrite all paths to `/index.html`) and a `.gitignore` (`node_modules`, `dist`, `.env*`).
- [ ] Add the inline SVG favicon, meta description and Open Graph tags to `index.html`.
- [ ] Create `src/styles/tokens.css` with the brand colors, fonts, spacing scale, radius and shadow from the brief. Create `src/styles/base.css` with the reset and global type styles.
- [ ] Build shared components: `Header` (sticky, mobile menu), `Footer` (with the demo line), `Img` (with fallback), `Button`, `Section`, `PageTitle` (sets document title).
- [ ] Set up routes for every page in the brief. Each page shows only its name for now.
- [ ] Write the Phase 3 / Phase 4 page split under Decisions.
- [ ] Build, commit, push.

## Phase 2: Home page
Goal: the home page is complete and polished.
- [ ] Build the Home page exactly as described under Pages in the brief.
- [ ] Put all copy and data in `src/data/` files, not inside components.
- [ ] Make it responsive and add the small animations from the brief.
- [ ] Build, commit, push.

## Phase 3: Main pages
Goal: the first group of pages is complete.
- [ ] Build the Phase 3 pages from the split in `PROGRESS.md`, with their features.
- [ ] Build, commit, push.

## Phase 4: Remaining pages
Goal: every route has real content.
- [ ] Build the Phase 4 pages from the split in `PROGRESS.md`, with their features.
- [ ] Add a not-found page that matches the brand.
- [ ] Forms: validate on the front end, show clear errors, show a success state. No network calls.
- [ ] Build, commit, push.

## Phase 5: Polish and hand-off
Goal: it feels finished and the owner can add it to the gallery.
- [ ] Check every page at 360px, 768px, 1280px and 1920px. Fix problems.
- [ ] Check keyboard use, focus styles, headings, labels, contrast and alt text.
- [ ] Check page titles, meta tags and the favicon on every route.
- [ ] Check there is no broken link, no console error and no layout shift when images are missing.
- [ ] Run `npm run build` then `npm run preview` and check every route.
- [ ] Write `README.md`: how to run, how to add real photos (file names from Images in the brief), how to edit the content files.
- [ ] In `PROGRESS.md` under Notes, write: "Owner: run `/site-done <slug> <live url>` in the projects folder."
- [ ] Mark the site as "Site complete" in `PROGRESS.md`.
- [ ] Build, commit, push.
