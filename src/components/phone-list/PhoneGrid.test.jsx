import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PhoneGrid from './PhoneGrid'

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

function renderGrid(props) {
  return render(
    <MemoryRouter>
      <PhoneGrid
        phones={[]}
        loading={false}
        error={null}
        searchTerm=""
        {...props}
      />
    </MemoryRouter>,
  )
}

describe('PhoneGrid', () => {
  it('shows a loading message while loading', () => {
    renderGrid({ loading: true })

    expect(screen.getByRole('status')).toHaveTextContent('Loading...')
  })

  it('shows an error message when there is an error', () => {
    renderGrid({ error: new Error('Network down') })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Something went wrong loading the phones. Please try again. Network down',
    )
  })

  it('shows an empty message with the search term when there are no results', () => {
    renderGrid({ phones: [], searchTerm: 'nokia' })

    expect(screen.getByText('No results for "nokia"')).toBeInTheDocument()
  })

  it('renders a card for each phone', () => {
    renderGrid({ phones })

    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})
