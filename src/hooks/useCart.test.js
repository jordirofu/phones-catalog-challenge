import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCart } from './useCart'
import { CartProvider } from '../context/CartProvider'

describe('useCart', () => {
  it('throws when used outside a CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider',
    )
  })

  it('returns the cart context when used inside a CartProvider', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    expect(result.current.state).toBeDefined()
    expect(result.current.addItem).toBeTypeOf('function')
    expect(result.current.removeItem).toBeTypeOf('function')
  })
})
