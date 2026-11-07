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
  imageUrl: 'https://res.cloudinary.com/<cloud>/image/upload/<file>.png', // optional
},
```

| Field | Required | What it is |
| --- | --- | --- |
| `id` | yes | Unique name, lowercase with dashes (for example `harbor-inn`). |
| `title` | yes | Project name shown on the card. |
| `type` | yes | Short label under the title (for example "Ticketing Platform"). |
| `category` | yes | Exactly `websites` or `animations`. Decides which page shows it. |
| `liveUrl` | yes | Full link to the live site. Opens in a new tab. |
| `imageUrl` | no | Link to a full-page screenshot of the site. Without it the card shows a colored block with the title. |

Cards show in the order of the list.

In Claude Code you can also run:

```
/add-project Title | Type | websites | https://live-url.com | https://image-url (optional)
```

## Add the full-page image

1. Take a full-page screenshot of the site (for example Chrome DevTools > Cmd+Shift+P > "Capture full size screenshot"). A desktop width around 1440px works best.
2. Upload it to Cloudinary (Media Library > Upload), open it and copy its URL. Paste it as `imageUrl`.
3. Recommended: add `q_auto,f_auto,w_1200` after `/upload/` so it loads fast, for example `.../image/upload/q_auto,f_auto,w_1200/my-site.png`.

The image is pinned to the top of the card, scrolls to the bottom and back up on a loop, and only moves while the card is on screen. Visitors who turn off motion see the top of the page, still.

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
