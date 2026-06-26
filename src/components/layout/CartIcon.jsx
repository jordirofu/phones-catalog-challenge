import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

export default function CartIcon() {
  const { state } = useCart()
  const count = state.cartItems.length

  return (
    <div className="cart-container">
      <Link to="/cart" aria-label={`View cart, ${count} items`}>
        <img src="/cartIcon.png" alt="" />
      </Link>
      <span className="badge-count" aria-hidden="true">
        {count}
      </span>
    </div>
  )
}
