import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import SimilarPhones from './SimilarPhones'

const phones = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 999,
    imageUrl: 'a.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    basePrice: 899,
    imageUrl: 'b.jpg',
  },
]

function renderSimilar() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<SimilarPhones phones={phones} />} />
        <Route path="/phones/:id" element={<div>Detail page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

function fireMouse(node, type, pageX) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true })
  if (pageX !== undefined) {
    Object.defineProperty(event, 'pageX', { value: pageX })
  }
  fireEvent(node, event)
}

describe('SimilarPhones', () => {
  it('renders a card for each phone', () => {
    renderSimilar()

    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('navigates to the phone detail on a plain click', () => {
    renderSimilar()

    fireEvent.click(screen.getByText('iPhone 15'))

    expect(screen.getByText('Detail page')).toBeInTheDocument()
  })

  it('does not navigate when the click follows a drag', () => {
    const { container } = renderSimilar()
    const track = container.querySelector('.similar-phones__track')

    fireMouse(track, 'mousedown', 0)
    fireMouse(track, 'mousemove', 50)
    fireMouse(track, 'mouseup')
    fireEvent.click(screen.getByText('iPhone 15'))

    expect(screen.queryByText('Detail page')).not.toBeInTheDocument()
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
  })
})
