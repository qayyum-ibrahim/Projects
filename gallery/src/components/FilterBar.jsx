import { NavLink } from 'react-router-dom'
import './FilterBar.css'

const links = [
  { to: '/', label: 'All', end: true },
  { to: '/websites', label: 'Websites' },
  { to: '/animations', label: 'Animations' },
]

export default function FilterBar() {
  return (
    <nav className="filter-bar" aria-label="Project categories">
      <ul className="filter-bar-list">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className="filter-bar-link">
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
