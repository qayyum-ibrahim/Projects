# Build plan

Rules are in `CLAUDE.md`. State is in `PROGRESS.md`.
Allowed packages: `react`, `react-dom`, `react-router-dom`, and what `npm create vite@latest` (React, JavaScript) installs. Nothing else.

Each phase ends with: `npm run build` passes, `PROGRESS.md` updated, commit, push.

---

## Phase 1: Scaffold and first deploy
Goal: an empty but working site is live on Vercel.
- [ ] Check `git remote -v` shows an `origin`. If not, this is a hard blocker (see `CLAUDE.md` rule 8).
- [ ] Create the Vite + React (JavaScript) app in the current folder. Do not overwrite `CLAUDE.md`, `PLAN.md`, `PROGRESS.md`, or `.claude/`.
- [ ] Install `react-router-dom`.
- [ ] Remove the Vite demo content (logo, counter, demo CSS).
- [ ] Add `vercel.json` that rewrites every path to `/index.html`.
- [ ] Add a `.gitignore` that includes `node_modules`, `dist`, `.env.local`.
- [ ] Set up React Router with three routes (`/`, `/websites`, `/animations`) and a catch-all. Each page only shows its name for now.
- [ ] Set the page `<title>` and `lang="en"`.
- [ ] Build, commit, push.

## Phase 2: Theme and header
Goal: dark/light theme with a toggle, and the header.
- [ ] Create `src/styles/theme.css` with CSS variables for both themes (background, surface, text, muted text, border, accent).
- [ ] Add the inline script in `index.html` that sets `data-theme` before React loads (saved choice, else device setting).
- [ ] Create `ThemeToggle` component: icon button, sun in dark mode, moon in light mode, with an `aria-label`. Save the choice in localStorage with try/catch.
- [ ] Create `Header` component: logo text on the left, theme toggle on the right.
- [ ] Add a smooth color transition on theme change.
- [ ] Build, commit, push.

## Phase 3: Data and filter bar
Goal: the data file and the category navigation.
- [ ] Create `src/data/projects.js` with the real entry: UniVibe (see `CLAUDE.md`).
- [ ] Create `src/data/projects.sample.js` with 12 sample website entries (business, e-commerce, portfolio, SaaS, blog, booking, membership, entertainment, personal, real estate, hotel, restaurant, wedding: use any 12 of the 13) and 3 sample animation entries. Use `https://example.com` as the live URL. No video URLs.
- [ ] Create a helper `getProjects(category)` that merges samples only when `import.meta.env.VITE_SHOW_SAMPLES === 'true'`.
- [ ] Create `.env.local` with `VITE_SHOW_SAMPLES=true` (it is git-ignored).
- [ ] Create `FilterBar` component with three links (All, Websites, Animations) using `NavLink`. The active link is clearly marked. Put it under the header.
- [ ] Build, commit, push.

## Phase 4: Project card
Goal: the card with the video and the hover/tap overlay.
- [ ] Create `ProjectCard` component.
- [ ] Video behavior as in `CLAUDE.md` (lazy load with IntersectionObserver, muted loop, reduced motion, fallback block when there is no video or it fails).
- [ ] Overlay with title, type and a "Visit live site" button. Desktop: hover. Keyboard: focus. Touch: first tap shows it, tap outside hides it.
- [ ] Use `@media (hover: hover)` to tell desktop from touch devices.
- [ ] Build, commit, push.

## Phase 5: Pages and grid
Goal: all routes show real content.
- [ ] Create `ProjectGrid` component (1 / 2 / 3 columns).
- [ ] `/websites` and `/animations` show their projects with the filter bar.
- [ ] `/` shows both categories: heading, a few cards or all cards, and a "View all" link to each page.
- [ ] Empty state: "Coming soon" message when a category has no projects.
- [ ] Not-found page with a link home.
- [ ] Build, commit, push.

## Phase 6: Polish
Goal: it feels finished on every device.
- [ ] Check layout at 360px, 768px, 1280px and 1920px widths. Fix issues.
- [ ] Check both themes on every page. Fix contrast issues.
- [ ] Accessibility: focus styles, alt/aria labels, correct headings, keyboard flow.
- [ ] Add a favicon, meta description and Open Graph tags (title, description). Leave the OG image as a TODO in `PROGRESS.md` if no image exists.
- [ ] Add a short fade-in when cards appear.
- [ ] Build, commit, push.

## Phase 7: Docs and final check
Goal: the owner knows how to use the site.
- [ ] Write `README.md`: how to run locally, how to add a project (fields explained), how to add the Cloudinary video link, how to remove the sample data, how Vercel deploys.
- [ ] Run a final check of every route on a production build (`npm run build` then `npm run preview`). Note results in `PROGRESS.md`.
- [ ] Mark the project as "Gallery complete" in `PROGRESS.md`.
- [ ] Build, commit, push.
