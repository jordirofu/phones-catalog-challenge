import { Link } from 'react-router-dom'

export default function BackBar({ to, label }) {
  return (
    <div className="back-bar">
      <Link to={to} className="back-bar__link">
        &lt; {label}
      </Link>
    </div>
  )
}
