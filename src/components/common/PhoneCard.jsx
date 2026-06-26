import { Link } from 'react-router-dom'

export default function PhoneCard({ phone }) {
  return (
    <Link to={`/phones/${phone.id}`} className="phone-card">
      <div className="phone-card__image">
        <img src={phone.imageUrl} alt="" />
      </div>
      <div className="phone-card__info">
        <div className="phone-card__model">
          <span className="phone-card__brand">{phone.brand}</span>
          <span className="phone-card__name">{phone.name}</span>
        </div>
        <span className="phone-card__price">{phone.basePrice} EUR</span>
      </div>
    </Link>
  )
}
