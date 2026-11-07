---
description: Mark a site as done and print the line to add it to the gallery
argument-hint: <slug> <live-url>
---

The arguments are: `$ARGUMENTS`

The first word is the slug. The second word is the live URL.

Do this. Do not ask questions.

1. Read `SITES.md`.
2. Check the slug matches a row, and the URL starts with `http`. If not, say what is wrong in one sentence and stop.
3. In that row, set status to `done` and put the URL in the "Live URL" column.
4. Reply with only this, filled in from the row:

   Open Claude Code in `projects/gallery` and paste:
   `/add-project <Fictional name> | <Type> | websites | <live url>`

   Card image: save a full-page screenshot as `gallery/public/images/<gallery id>.<any format>`, where the gallery id is the fictional name in lowercase with dashes (for example `kora-goods`). Then run `npm run images` in `projects/gallery`, commit and push. Then set "In gallery" to yes in `SITES.md` yourself, or run this command again after.
