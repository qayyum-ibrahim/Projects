---
description: Continue the gallery build from where the last session stopped
---

Do this in order. Do not ask questions.

1. Read `CLAUDE.md`, `PROGRESS.md` and `PLAN.md`.
2. Run `git status` and `git log --oneline -5`. If there are uncommitted changes from a stopped session, check them against the current phase. Finish that phase's work first.
3. Find the first phase in `PROGRESS.md` that is not checked. If "Blockers" has an open item, check if it is fixed now. If it is not fixed, repeat the instruction to the owner in one sentence and stop.
4. Do that phase and only that phase. Follow its checklist in `PLAN.md`.
5. Run `npm run build`. Fix errors until it passes.
6. Update `PROGRESS.md`: check the phase, set "Last completed phase" and "Next phase", add Decisions and short Notes.
7. Commit with the message `phase N: short title`, then run `git push origin main`.
8. Stop. Reply with three lines at most: what was done, whether the push worked, and what the next phase is.

If every phase is checked, reply: "Gallery complete." and stop.
