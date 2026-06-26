import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

export default function CartPage() {
  const { state } = useCart()
  const count = state.cartItems.length

  return (
    <div className="cart">
      <div className="cart__bar">
        <h1 className="cart__title">Cart ({count})</h1>
      </div>

      <ul className="cart__list">
        {state.cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <CartSummary total={state.totalAmount} isEmpty={count === 0} />
    </div>
  )
}
