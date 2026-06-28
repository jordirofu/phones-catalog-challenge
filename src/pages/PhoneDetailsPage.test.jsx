import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../context/CartProvider'
import PhoneDetailsPage from './PhoneDetailsPage'
import CartIcon from '../components/layout/CartIcon'
import { getPhoneById } from '../services/api'

vi.mock('../services/api', () => ({
  getPhoneById: vi.fn(),
}))

const phoneDetail = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  description: 'A great phone',
  specs: { screen: '6.1 inch' },
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'black.jpg' },
    { name: 'Blue', hexCode: '#0000ff', imageUrl: 'blue.jpg' },
  ],
  storageOptions: [
    { capacity: '128GB', price: 999 },
    { capacity: '256GB', price: 1099 },
  ],
  similarProducts: [],
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/phones/1']}>
      <CartProvider>
        <CartIcon />
        <Routes>
          <Route path="/phones/:id" element={<PhoneDetailsPage />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  getPhoneById.mockResolvedValue(phoneDetail)
})

describe('PhoneDetailsPage', () => {
  it('shows a loading state and then the phone details', async () => {
    renderPage()

    expect(screen.getByRole('status')).toHaveTextContent('Loading...')
    expect(
      await screen.findByRole('heading', { name: 'iPhone 15' })
    ).toBeInTheDocument()
  })

  it('keeps the ADD button disabled until storage and color are selected', async () => {
    renderPage()

    const addButton = await screen.findByRole('button', { name: 'ADD' })
    expect(addButton).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: '128GB' }))
    expect(addButton).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Black' }))
    expect(addButton).toBeEnabled()
  })

  it('adds the phone to the cart when ADD is clicked', async () => {
    renderPage()
    await screen.findByRole('button', { name: 'ADD' })

    fireEvent.click(screen.getByRole('button', { name: '128GB' }))
    fireEvent.click(screen.getByRole('button', { name: 'Black' }))
    fireEvent.click(screen.getByRole('button', { name: 'ADD' }))

    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
