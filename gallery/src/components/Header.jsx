import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Qayyum
      </Link>
      <ThemeToggle />
    </header>
  )
}
