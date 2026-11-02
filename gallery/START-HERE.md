# Start here (for you, not for Claude Code)

## One-time setup
1. Make the folder `projects` on your desktop. Put this whole `gallery` folder inside it.
2. Open a terminal in `projects/gallery` and run:
   - `git init`
   - `git branch -M main`
3. On GitHub, make a new empty repo (no README). Then run:
   - `git remote add origin <your-repo-url>`
   - `git add . && git commit -m "add project instructions" && git push -u origin main`
4. On Vercel, click Add New > Project, import that GitHub repo, and pick the Vite preset. Every push to `main` will deploy from now on.
5. Open Claude Code in the folder: `claude`

## Every session
- Type `/next-phase`. It reads the progress file and does the next phase.
- When a phase finishes, it commits, pushes, and stops. Start a new session (`/clear` or a new terminal) before the next phase to save tokens.

## Add an existing project
- Type: `/add-project UniVibe | Ticketing Platform | websites | https://univibe.ng`
- With a video: add `| <cloudinary video url>` at the end.
  (UniVibe is already in the instructions, so you do not need to add it.)

## Notes
- The file `.claude/settings.json` lets Claude Code run npm and git commands without asking. Check that it works for you. If it still asks, choose "always allow" for those commands.
- Samples show only on your computer (`.env.local`). The live site shows only real projects.
