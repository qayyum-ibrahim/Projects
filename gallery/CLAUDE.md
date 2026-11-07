# Work Gallery: project rules

Read this file first in every session. Keep it short in your head. Follow it exactly.

## What this project is
A gallery site that only shows the owner's work. Nothing else.
- No about page, no contact form, no blog.
- Each project is a card with a full-page screenshot that slowly scrolls inside it.
- Desktop: hover on a card shows the project title, its type and a "Visit live site" button.
- Mobile: first tap on a card shows the same overlay. The button inside opens the live site.
- The owner takes the full-page screenshots and hosts them (for example on Cloudinary). We only use the links. No videos.

## Routes
- `/` shows both categories. Each has a heading and a link to its page.
- `/websites` shows only website projects.
- `/animations` shows only animation projects. Empty state: a "Coming soon" message.
- A filter bar (All, Websites, Animations) links to `/`, `/websites`, `/animations`.
- Unknown route: simple not-found page with a link home.
- The owner sends `/websites` or `/animations` to different clients. Both must work on direct open and on refresh.

## Stack (do not change it)
- Vite + React + React Router. Plain CSS. No UI library. No Tailwind.
- Plain JavaScript (not TypeScript).
- Hosting: Vercel. `vercel.json` rewrites all routes to `index.html`.
- Folder of this project: the `gallery` folder inside `projects`.

## Theme
- Dark and light theme using CSS variables on `<html data-theme="dark|light">`.
- A sun/moon icon button in the header toggles the theme.
- First visit follows the device setting. The choice is saved in localStorage (use try/catch).
- A small inline script in `index.html` sets the theme before React loads, so there is no flash.
- Every component must look right in both themes.

## Data
- All projects live in `src/data/projects.js`. Adding a work means adding one entry. No other code change.
- Entry fields: `id`, `title`, `type` (for example "Ticketing Platform"), `category` ("websites" or "animations"), `liveUrl`, `imageUrl` (optional, full-page screenshot).
- No image yet? The card shows a clean colored block with the title. It must still look good.
- Sample entries for development live in `src/data/projects.sample.js`. They show only when `VITE_SHOW_SAMPLES=true` in `.env.local`. Never show samples in production.
- Never invent a real URL. Never invent a project. Only the owner supplies real entries.
- Real entries so far: UniVibe, type "Ticketing Platform", websites, `https://univibe.ng`.

## Cards
- Image: full width, pinned to the top. It scrolls down to the bottom and back up on a loop, at a steady speed, with a short rest at each end. Load it only when near the screen and pause the scroll when off screen (IntersectionObserver).
- Respect `prefers-reduced-motion`: show the top of the image, no scroll.
- The overlay must work with the keyboard (focus shows it) and with touch (tap shows it, tap outside hides it).
- The live link opens in a new tab with `rel="noopener noreferrer"`.

## Design
- Minimal. The work is the focus. Clean grid: 1 column on phones, 2 on tablets, 3 on desktop.
- Header has only a small logo text (placeholder: "Qayyum" unless the owner changes it) and the theme toggle plus the filter bar.
- Smooth, small animations only.

## How to work (anti-mistake rules)
1. Work on ONE phase at a time. The phase list is in `PLAN.md`. The state is in `PROGRESS.md`.
2. Do only what the current phase says. Do not start the next phase. Do not add features that are not listed.
3. Use only packages listed in `PLAN.md`. If you think you need another one, do not install it. Note it in `PROGRESS.md` under Blockers and stop.
4. If you are not sure how an API works, check the installed package or its docs. Do not guess.
5. Before every commit run `npm run build`. If it fails, fix it. Do not commit a broken build.
6. Commit and push at the end of every phase (see Git below).
7. Update `PROGRESS.md` in the same commit.
8. Do not ask the owner questions. Take the most reasonable choice and write it in `PROGRESS.md` under Decisions. The only reason to stop and ask is a hard blocker (for example: no git remote, push fails, missing file only the owner has). Then write it in `PROGRESS.md` under Blockers, tell the owner exactly what to do, and stop.
9. Keep replies short. Do not print whole files back. Do not repeat the plan.
10. The site is deployed on Vercel from the first push. Every push to `main` goes live. Never push code that does not build.

## Git
- Branch: `main`.
- One commit per phase. Message format: `phase N: short title`.
- After the commit run `git push origin main`.
- Do not force push. Do not rewrite history.
- Never commit `.env.local` or `node_modules`.

## Commands
- `/next-phase` runs the next unfinished phase.
- `/add-project` adds an existing project to the gallery (see `.claude/commands/add-project.md`).
