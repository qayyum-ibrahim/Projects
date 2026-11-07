# Projects folder: master rules

This folder holds the owner's portfolio work.
- `gallery/` is the gallery site (done). Do not change it from here.
- Gallery cards use a scrolling full-page screenshot, not a video: `gallery/public/images/<gallery id>.jpg`, compressed with `npm run images` inside `gallery/`. `videos/` and `scripts/compress-videos.mjs` are no longer used by the gallery.
- `site-<slug>/` folders are the 13 demo websites. Each one is its own git repo and its own Vercel deploy.
- `SITES.md` is the master tracker. `BRIEFS.md` holds the design brief of each site. `_template/` holds the starting instruction files.

## Rules
1. Sites are created only with `/new-site <slug>`. Do not create them by hand.
2. Never edit `_template/` or `BRIEFS.md` unless the owner asks.
3. Never work inside a `site-` folder from here. The build happens in that site's own folder, with its own session.
4. Do not ask the owner questions. Take the most reasonable choice. Stop only for a hard blocker and say exactly what the owner must do.
5. Keep replies short.

## Commands
- `/new-site <slug>` creates a new site folder from the template and the brief.
- `/site-done <slug> <live-url>` marks a site done in `SITES.md` and prints the gallery line.
