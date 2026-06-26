const getInitialCartItems = () => {
  const localStorageContent = localStorage.getItem('phoneCart')
  return localStorageContent ? JSON.parse(localStorageContent) : []
}

const savedItems = getInitialCartItems()

function calcTotalAmount(cartItems) {
  return cartItems.reduce((acc, item) => acc + item.price, 0)
}

export const initialState = {
  cartItems: savedItems,
  totalAmount: calcTotalAmount(savedItems),
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add-item': {
      const updatedItems = [...state.cartItems, action.payload]
      return {
        cartItems: updatedItems,
        totalAmount: calcTotalAmount(updatedItems),
      }
    }
    case 'remove-item': {
      const updatedItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      )
      return {
        cartItems: updatedItems,
        totalAmount: calcTotalAmount(updatedItems),
      }
    }
    default:
      return state
  }
}
