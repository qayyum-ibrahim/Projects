# Start here (for you, not for Claude Code)

## What is in this folder
- `SITES.md`: the master list of all 13 sites, their status and live links.
- `BRIEFS.md`: the design brief for each site (name, colors, fonts, pages, features, images).
- `_template/`: the instruction files every new site starts from.
- `.claude/commands/`: two commands that work when you start Claude Code in THIS folder.

## One-time setup
1. Unzip this into your `projects` folder, next to the `gallery` folder.
   You should have `projects/gallery` and the new files in `projects/` itself.
   If the unzip makes a second `projects` folder inside, move its contents up one level.
2. Open a terminal in `projects` and run: `claude`

## Start a new site (example: restaurant)
1. In `projects`, start Claude Code and type: `/new-site restaurant`
   It makes the folder `site-restaurant` with all instruction files filled in, and a first local commit.
2. Create an empty GitHub repo called `site-restaurant` (no README).
3. In a terminal:
   - `cd site-restaurant`
   - `git remote add origin <your-repo-url>`
   - `git push -u origin main`
4. On Vercel: Add New > Project, import `site-restaurant`, pick the Vite preset.
   (Do this before the first phase finishes, so the first push already deploys.)
5. Still in `site-restaurant`, start Claude Code: `claude`
6. Type `/next-phase`. When a phase ends, it commits and pushes. Start a fresh session and type `/next-phase` again.
   (Do not use `/continue`. It is a built-in Claude Code command.)

## Images
- Claude Code cannot make or download photos. Each brief lists the image file names the site expects.
- For each site there is a prompt file in `image-prompts/` (for example `image-prompts/restaurant.md`). Paste its prompts into ChatGPT, save the images as JPG with the exact file names. `/new-site` also copies the file into the site folder as `IMAGE-PROMPTS.md`.
- Put your images in `site-<name>/public/images/` with those exact names. Any image that is missing shows a styled placeholder, so the site still works.
- You can add images at any time. The site picks them up on the next push.

## When a site is finished
1. Back in `projects`, start Claude Code and type: `/site-done restaurant https://your-live-link`
   It updates `SITES.md` and prints the exact `/add-project` line for the gallery.
2. Open Claude Code in `projects/gallery` and paste that line.
3. Take a full-page screenshot of the site (Chrome DevTools > Cmd+Shift+P > "Capture full size screenshot", about 1440px wide).
   Name it after the gallery id (the fictional name in lowercase with dashes, for example `kora-goods.png`) and put it in `gallery/public/images/`.
   In `projects/gallery` run `npm run images`, then commit and push. The script compresses it to `<id>.jpg` and deletes the original.
   You can do this at any time. Without an image the card shows a colored block. The gallery no longer uses videos.

## Notes
- Every site is a fictional demo brand with fake data. The footer says so. This keeps the sites honest.
- If a command does not show up, you started Claude Code in the wrong folder.
  `/new-site` and `/site-done` work in `projects`. `/next-phase` works inside a `site-` folder.
- The file `.claude/settings.json` lets Claude Code run npm and git commands without asking. If it still asks, choose "always allow".
