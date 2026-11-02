import ProjectCard from './ProjectCard.jsx'
import './ProjectGrid.css'

// Grid of project cards, or a "Coming soon" message when there are none.
// headingLevel keeps the card titles one level under the page heading.
export default function ProjectGrid({ projects, headingLevel }) {
  if (projects.length === 0) {
    return (
      <div className="project-grid-empty">
        <p>Coming soon</p>
      </div>
    )
  }

  return (
    <ul className="project-grid">
      {projects.map((project, index) => (
        <li key={project.id} style={{ '--i': index }}>
          <ProjectCard project={project} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
