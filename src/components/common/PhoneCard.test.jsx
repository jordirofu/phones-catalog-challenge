import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PhoneCard from './PhoneCard'

const phone = {
  id: '42',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'iphone.jpg',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <PhoneCard phone={phone} />
    </MemoryRouter>,
  )
}

describe('PhoneCard', () => {
  it('renders brand, name and price', () => {
    renderCard()

    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
    expect(screen.getByText('999 EUR')).toBeInTheDocument()
  })

  it('links to the phone detail page', () => {
    renderCard()

    expect(screen.getByRole('link')).toHaveAttribute('href', '/phones/42')
  })
})
