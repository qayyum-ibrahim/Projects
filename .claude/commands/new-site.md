---
description: Create a new demo site folder from the template and its brief
argument-hint: <slug, for example restaurant>
---

The slug is: `$ARGUMENTS`

Do this in order. Do not ask questions.

1. Read `SITES.md` and check that the slug matches a row. Check that `BRIEFS.md` has a heading exactly `## <slug>`. Check that the folder `site-<slug>` does not exist yet. If any check fails, say what is wrong in one sentence and stop.
2. Run `cp -R _template site-<slug>`. This must copy the hidden `.claude` folder too. Check with `ls -A site-<slug>`.
3. Copy the section for the slug from `BRIEFS.md` into `site-<slug>/BRIEF.md`:
   - Take the lines after the `## <slug>` heading, up to (not including) the next line that starts with `## `.
   - Copy them word for word. Do not shorten or reword anything.
   - Start the file with the line `# Brief: <Type>` using the Type column from `SITES.md`, then a blank line, then the copied lines. Replace the old placeholder text of that file.
4. In `site-<slug>/PROGRESS.md`, replace the line starting with `- Site:` with `- Site: <Fictional name> (<Type>)`, using the values from `SITES.md`.
5. If the file `image-prompts/<slug>.md` exists, copy it to `site-<slug>/IMAGE-PROMPTS.md`. If it does not exist, skip this step.
6. In `SITES.md`, set the status of this row to `in progress`.
7. Make the first commit: `git init -b main site-<slug>`, then `cd site-<slug> && git add -A && git commit -m "init: instruction files"`.
8. Reply with only this, with the slug filled in:

   Created `site-<slug>`. Next:
   1. Create an empty GitHub repo called `site-<slug>`, then in `site-<slug>` run `git remote add origin <repo-url>` and `git push -u origin main`.
   2. Import the repo in Vercel (Vite preset).
   3. Start `claude` inside `site-<slug>` and type `/next-phase`.
   4. If `site-<slug>/IMAGE-PROMPTS.md` exists, use it to make the images (see the file).
