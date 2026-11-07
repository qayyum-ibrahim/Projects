---
description: Add an existing project to the gallery (title, type, category, live link)
argument-hint: <title> | <type> | <websites or animations> | <live url>
---

The owner gives the details in this format, separated by `|`:

`$ARGUMENTS`

Do this. Do not ask questions.

1. Read the "Data" section of `CLAUDE.md`.
2. Split the arguments into: title, type, category, and live URL.
3. Check the category is exactly `websites` or `animations`. Check the live URL starts with `http`. If something is wrong, say what is wrong in one sentence and stop.
4. Open `src/data/projects.js`. Add one new entry at the end of the list with a unique `id` (lowercase, dashes). Never invent a URL.
5. If the entry already exists (same live URL), update it instead of adding a duplicate.
6. Run `npm run images` to compress any new image in `public/images/`. The image for this entry must be named `<id>.jpg` after compression; if no file with that slug exists, say so in the reply (the card shows the colored block until it is added).
7. Run `npm run build`. Fix errors until it passes.
8. Commit (including `public/images/`) with the message `add project: <title>`, then run `git push origin main`.
9. Reply in one line: the project was added and pushed, and its id (the image must be named `<id>` in `public/images/`).
