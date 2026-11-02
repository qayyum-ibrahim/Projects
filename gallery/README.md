# Work Gallery

A small site that shows only my work. Each project is a card with a short looping video. Built with Vite, React and React Router. Hosted on Vercel.

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
  videoUrl: 'https://res.cloudinary.com/<cloud>/video/upload/<file>.mp4', // optional
  posterUrl: 'https://res.cloudinary.com/<cloud>/video/upload/<file>.jpg', // optional
},
```

| Field | Required | What it is |
| --- | --- | --- |
| `id` | yes | Unique name, lowercase with dashes (for example `harbor-inn`). |
| `title` | yes | Project name shown on the card. |
| `type` | yes | Short label under the title (for example "Ticketing Platform"). |
| `category` | yes | Exactly `websites` or `animations`. Decides which page shows it. |
| `liveUrl` | yes | Full link to the live site. Opens in a new tab. |
| `videoUrl` | no | Link to the preview video. Without it the card shows a colored block with the title. |
| `posterUrl` | no | Still image shown before the video plays and for visitors who turn off motion. |

Cards show in the order of the list.

In Claude Code you can also run:

```
/add-project Title | Type | websites | https://live-url.com | https://video-url (optional)
```

## Add the Cloudinary video link

1. Upload the recording to Cloudinary (Media Library > Upload).
2. Open the video and copy its URL (it ends in `.mp4`). Paste it as `videoUrl`.
3. Optional: smaller files load faster. Add `q_auto,f_auto,w_960` after `/upload/` in the URL, for example `.../video/upload/q_auto,f_auto,w_960/my-video.mp4`.
4. Optional poster: use the same URL but change the ending from `.mp4` to `.jpg`. Cloudinary turns the first frame into an image. Paste it as `posterUrl`.

Keep videos short (5–15 seconds) and without sound. They play muted on a loop, and only when the card is near the screen.

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
