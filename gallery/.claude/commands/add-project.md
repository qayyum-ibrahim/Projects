---
description: Add an existing project to the gallery (title, type, category, live link, optional video)
argument-hint: <title> | <type> | <websites or animations> | <live url> | <video url optional>
---

The owner gives the details in this format, separated by `|`:

`$ARGUMENTS`

Do this. Do not ask questions.

1. Read the "Data" section of `CLAUDE.md`.
2. Split the arguments into: title, type, category, live URL, and an optional video URL.
3. Check the category is exactly `websites` or `animations`. Check the live URL starts with `http`. If something is wrong, say what is wrong in one sentence and stop.
4. Open `src/data/projects.js`. Add one new entry at the end of the list with a unique `id` (lowercase, dashes). Add `videoUrl` only if the owner gave one. Never invent a URL.
5. If the entry already exists (same live URL), update it instead of adding a duplicate.
6. Run `npm run build`. Fix errors until it passes.
7. Commit with the message `add project: <title>`, then run `git push origin main`.
8. Reply in one line: the project was added and pushed.
