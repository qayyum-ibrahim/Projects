import { Link } from 'react-router-dom'
import './pages.css'

export default function NotFound() {
  return (
    <div className="page page-not-found">
      <h1 className="page-title">Page not found</h1>
      <p className="page-text">This page does not exist.</p>
      <Link className="page-section-link" to="/">
        Back to home
      </Link>
    </div>
  )
}
