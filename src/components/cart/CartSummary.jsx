import { Link } from 'react-router-dom'

export default function CartSummary({ total, isEmpty }) {
  return (
    <div className="cart-summary">
      <Link to="/" className="cart-summary__continue">
        Continue shopping
      </Link>

      {!isEmpty && (
        <>
          <div className="cart-summary__total">
            <span>Total</span>
            <span>{total} EUR</span>
          </div>
          <button className="cart-summary__pay">Pay</button>
        </>
      )}
    </div>
  )
}
