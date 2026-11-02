import ProjectGrid from '../components/ProjectGrid.jsx'
import { getProjects } from '../data/getProjects.js'
import './pages.css'

// Shared layout for /websites and /animations.
export default function CategoryPage({ title, category }) {
  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      <ProjectGrid projects={getProjects(category)} headingLevel={2} />
    </div>
  )
}
