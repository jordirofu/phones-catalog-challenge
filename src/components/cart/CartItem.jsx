import { useCart } from '../../hooks/useCart'

export default function CartItem({ item }) {
  const { removeItem } = useCart()

  return (
    <li className="cart-item">
      <div className="cart-item__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <div className="cart-item__info">
        <span className="cart-item__name">{item.name}</span>
        <span className="cart-item__specs">
          {item.storage} | {item.color}
        </span>
        <span className="cart-item__price">{item.price} EUR</span>
        <button
          className="cart-item__remove"
          aria-label={`Remove ${item.name}`}
          onClick={() => removeItem(item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  )
}
