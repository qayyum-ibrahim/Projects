import projects from './projects.js'
import sampleProjects from './projects.sample.js'

// DEV check keeps samples out of production builds even if .env.local exists.
const showSamples =
  import.meta.env.DEV && import.meta.env.VITE_SHOW_SAMPLES === 'true'

// Returns real projects (plus samples in dev when enabled).
// Pass a category ('websites' | 'animations') to filter, or nothing for all.
export function getProjects(category) {
  const all = showSamples ? [...projects, ...sampleProjects] : projects
  return category ? all.filter((p) => p.category === category) : all
}
