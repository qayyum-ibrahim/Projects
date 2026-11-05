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
3. Record a short video of the site, upload it to Cloudinary, and add the video link to the gallery entry.
   You can do this at any time. Without a video the card shows a colored block.

## Notes
- Every site is a fictional demo brand with fake data. The footer says so. This keeps the sites honest.
- If a command does not show up, you started Claude Code in the wrong folder.
  `/new-site` and `/site-done` work in `projects`. `/next-phase` works inside a `site-` folder.
- The file `.claude/settings.json` lets Claude Code run npm and git commands without asking. If it still asks, choose "always allow".

<!-- TO UPDATE VIDEO -->
In src/data/projects.js, set videoUrl for the project "Saffron & Smoke" to https://res.cloudinary.com/dlxovrmtr/video/upload/q_auto,f_auto/v1793746940/projects/site-restaurant/Saffron_Smoke.mkv . Change nothing else. Run npm run build, then commit with the message "add video: Saffron & Smoke" and push to main.