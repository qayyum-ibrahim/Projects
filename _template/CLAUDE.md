# Demo website: project rules

Read this file first in every session. Then read `BRIEF.md` (what this site is) and `PROGRESS.md` (where we stopped).

## What this is
One of 13 demo websites for the owner's portfolio. It will appear in the owner's gallery with a live link.
- It is a front-end demo. No backend, no database, no real payments, no real login.
- The business is fictional. Forms work on the front end only: they validate and then show a success message.
- The goal is a site that looks like a real, expensive, professionally designed site on mobile and on desktop.

## Source of truth
- `BRIEF.md` decides the name, mood, colors, fonts, pages, features and images.
- Do not invent business facts, names, prices or copy that are not in `BRIEF.md`. If the brief is silent, write short, believable, fictional copy that fits the brief. Record it in `PROGRESS.md` under Decisions.
- If `IMAGE-PROMPTS.md` exists, its "Fixed content" section is part of the brief. Use those exact names, order and categories in the data files, so the images match.
- Never use real brand names, real logos, real people or real phone numbers. Use `.example` email domains and `+234 800 000 0000` style phone numbers.
- Put a small line in the footer: "Demo project. This is not a real business."

## Stack (do not change it)
- Vite + React + React Router. Plain JavaScript. Plain CSS with CSS variables. No UI library. No Tailwind.
- Allowed packages: `react`, `react-dom`, `react-router-dom`, the `@fontsource/*` font packages named in `BRIEF.md`, and what `npm create vite@latest` (React, JavaScript) installs. Nothing else. If you think you need another package, do not install it. Write it under Blockers in `PROGRESS.md` and stop.
- Fonts: install the `@fontsource/*` packages named under Fonts in `BRIEF.md` and import the weights you use in `src/main.jsx`. If a package name does not exist on npm, pick the closest font and log it in Decisions. No Google Fonts links.
- Hosting: Vercel. `vercel.json` rewrites all paths to `index.html`.

## Images (important: never invent image URLs)
- Do not hotlink or invent any image URL.
- Image files live in `public/images/` with the exact file names listed under "Images" in `BRIEF.md`. The owner adds the real files later.
- Build an `Img` component. It uses `loading="lazy"`, fixed `width`/`height` or an aspect-ratio box, and a good `alt`. If the file is missing or fails to load (`onError`), it shows a designed fallback: a gradient or pattern block using the brand colors. The site must look good with no photos at all.
- Use inline SVG for icons and simple shapes. Do not add an icon package.

## Design quality bar
- Follow the Mood, Colors and Fonts in `BRIEF.md` closely. This site must not look like the owner's other demo sites.
- Strong type hierarchy, generous spacing, a clear grid, one accent color used with care.
- Mobile first. Test the layout at 360px, 768px, 1280px and 1920px.
- Header: sticky, with a mobile menu that opens and closes with keyboard and touch.
- Animations: small and smooth (fade, slide, hover). Respect `prefers-reduced-motion`.
- Accessibility: visible focus styles, real buttons and links, labels on form fields, good contrast, one `h1` per page, alt text.
- SEO basics: page `<title>` per route, meta description, Open Graph title and description, inline SVG favicon.
- Performance: no large unused code, lazy images, no layout shift.

## How to work (anti-mistake rules)
1. Work on ONE phase at a time. The phases are in `PLAN.md`. The state is in `PROGRESS.md`.
2. Do only what the current phase says. Do not start the next phase. Do not add features that are not in the brief.
3. If you are not sure how an API works, check the installed package. Do not guess.
4. Before every commit run `npm run build`. If it fails, fix it. Never push a broken build.
5. Update `PROGRESS.md` in the same commit.
6. Do not ask the owner questions. Take the most reasonable choice and write it in `PROGRESS.md` under Decisions. Stop and ask only for a hard blocker (no git remote, push fails, something only the owner has). Write it under Blockers, say exactly what the owner must do, and stop.
7. Keep replies short. Do not print whole files back.
8. Every push to `main` goes live on Vercel.

## Git
- Branch `main`. One commit per phase. Message: `phase N: short title`.
- After the commit run `git push origin main`.
- No force push. No history rewrite. Never commit `.env*`, `node_modules` or `dist`.

## Commands
- `/next-phase` runs the next unfinished phase.
- If the owner types plain text like "do the next phase", do the same steps as in `.claude/commands/next-phase.md`.
