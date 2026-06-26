import { describe, it, expect } from 'vitest'
import { cartReducer, initialState } from './cart-reducer'

describe('cartReducer', () => {
  it('add-item adds the item and recalculates the total', () => {
    const itemToAdd = { id: '2', price: 200 }
    const initialState = {
      cartItems: [{ id: '1', price: 100 }],
      totalAmount: 100,
    }
    const result = cartReducer(initialState, {
      type: 'add-item',
      payload: itemToAdd,
    })
    expect(result.cartItems).toHaveLength(2)
    expect(result.cartItems[1]).toBe(itemToAdd)
    expect(result.totalAmount).toBe(300)
  })

  it('remove-item removes the correct item and recalculates the total', () => {
    const initialState = {
      cartItems: [
        { id: '1', price: 100 },
        { id: '2', price: 200 },
      ],
      totalAmount: 300,
    }
    const result = cartReducer(initialState, {
      type: 'remove-item',
      payload: '1',
    })
    expect(result.cartItems).toHaveLength(1)
    expect(result.cartItems[0].id).toBe('2')
    expect(result.totalAmount).toBe(200)
  })

  it('returns the same state for an unknown action', () => {
    const result = cartReducer(initialState, { type: 'unknown' })
    expect(result).toBe(initialState)
  })
})
