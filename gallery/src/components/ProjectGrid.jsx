import ProjectCard from './ProjectCard.jsx'
import './ProjectGrid.css'

// Grid of project cards, or a "Coming soon" message when there are none.
export default function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="project-grid-empty">
        <p>Coming soon</p>
      </div>
    )
  }

  return (
    <ul className="project-grid">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}
