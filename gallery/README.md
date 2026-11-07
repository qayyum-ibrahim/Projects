# Work Gallery

A small site that shows only my work. Each project is a card with a full-page screenshot that slowly scrolls inside it. Built with Vite, React and React Router. Hosted on Vercel.

Routes: `/` (everything), `/websites`, `/animations`.

## Run it locally

You need Node.js (version 20 or newer).

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build at http://localhost:4173
```

## Add a project

All projects live in `src/data/projects.js`. Adding a work means adding one entry to the list. No other code changes.

```js
{
  id: 'univibe',
  title: 'UniVibe',
  type: 'Ticketing Platform',
  category: 'websites',
  liveUrl: 'https://univibe.ng',
},
```

| Field | Required | What it is |
| --- | --- | --- |
| `id` | yes | Unique name, lowercase with dashes (for example `harbor-inn`). Also the image file name. |
| `title` | yes | Project name shown on the card. |
| `type` | yes | Short label under the title (for example "Ticketing Platform"). |
| `category` | yes | Exactly `websites` or `animations`. Decides which page shows it. |
| `liveUrl` | yes | Full link to the live site. Opens in a new tab. |

Cards show in the order of the list.

In Claude Code you can also run:

```
/add-project Title | Type | websites | https://live-url.com
```

## Add the full-page image

1. Take a full-page screenshot of the site (for example Chrome DevTools > Cmd+Shift+P > "Capture full size screenshot"). A desktop width around 1440px works best.
2. Name it after the project `id` (any format, for example `harbor-inn.png`) and put it in `public/images/`.
3. Run `npm run images`. It resizes new images to at most 1440px wide, saves them as `harbor-inn.jpg` and deletes the original. Images it already compressed are listed in `public/images/.compressed` and are never touched again. It uses `sips`, which comes with macOS.
4. Commit and push the `.jpg` and `.compressed` files.

Without an image the card shows a colored block with the title. The image is pinned to the top of the card, scrolls to the bottom and back up on a loop, and only moves while the card is on screen. Visitors who turn off motion see the top of the page, still.

To replace an image, drop a new file with the same name in a format other than `.jpg` (for example `.png`) and run the script again, or remove its line from `.compressed` first.

## Sample data

`src/data/projects.sample.js` holds fake projects for development. They only show when **both** are true:

- you run `npm run dev` (they never ship in a production build), and
- `.env.local` contains `VITE_SHOW_SAMPLES=true`.

To hide them locally, set `VITE_SHOW_SAMPLES=false` or delete `.env.local`. To remove them for good, delete `src/data/projects.sample.js` and replace `src/data/getProjects.js` with:

```js
import projects from './projects.js'

export function getProjects(category) {
  return category ? projects.filter((p) => p.category === category) : projects
}
```

## Deploys (Vercel)

- Vercel watches the `main` branch on GitHub. Every push to `main` builds and goes live in about a minute.
- The git repo root is the `projects` folder, so in Vercel the Root Directory must be `gallery`. Framework preset: Vite.
- `vercel.json` sends every path to `index.html`, so `/websites` and `/animations` work on direct open and on refresh.
- Always run `npm run build` before pushing. A broken build does not deploy, and the site stays on the last good version.
