import { Link } from 'react-router-dom'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { getProjects } from '../data/getProjects.js'
import './pages.css'

// How many cards each category shows on the home page.
const PREVIEW_COUNT = 6

const sections = [
  { title: 'Websites', category: 'websites', path: '/websites' },
  { title: 'Animations', category: 'animations', path: '/animations' },
]

export default function Home() {
  return (
    <div className="page">
      <h1 className="visually-hidden">Work</h1>
      {sections.map(({ title, category, path }) => {
        const projects = getProjects(category)
        return (
          <section
            key={category}
            className="page-section"
            aria-labelledby={`${category}-heading`}
          >
            <div className="page-section-header">
              <h2 id={`${category}-heading`} className="page-section-title">
                {title}
              </h2>
              {projects.length > 0 && (
                <Link className="page-section-link" to={path}>
                  View all<span className="visually-hidden"> {title.toLowerCase()}</span>
                </Link>
              )}
            </div>
            <ProjectGrid projects={projects.slice(0, PREVIEW_COUNT)} />
          </section>
        )
      })}
    </div>
  )
}
