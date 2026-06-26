import { useReducer, useEffect } from 'react'
import { cartReducer, initialState } from '../reducers/cart-reducer'
import { CartContext } from './cart-context'

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('phoneCart', JSON.stringify(state.cartItems))
  }, [state.cartItems])

  const addItem = (phone) => dispatch({ type: 'add-item', payload: phone })
  const removeItem = (id) => dispatch({ type: 'remove-item', payload: id })

  return (
    <CartContext.Provider value={{ state, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}
