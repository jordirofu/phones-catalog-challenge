import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartProvider'
import { useCart } from '../../hooks/useCart'
import CartIcon from './CartIcon'


function AddButton({ phone }) {
  const { addItem } = useCart()
  return <button onClick={() => addItem(phone)}>add</button>
}

function renderCartIcon() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <CartIcon />
        <AddButton phone={{ id: 'x1', price: 999 }} />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('CartIcon', () => {
  it('shows 0 when the cart is empty', () => {
    renderCartIcon()

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('updates the badge when an item is added to the cart', () => {
    renderCartIcon()

    fireEvent.click(screen.getByRole('button', { name: 'add' }))

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('exposes the count in the link aria-label', () => {
    renderCartIcon()

    fireEvent.click(screen.getByRole('button', { name: 'add' }))

    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      'View cart, 1 items'
    )
  })
})
