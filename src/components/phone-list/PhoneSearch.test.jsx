import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PhoneSearch from './PhoneSearch'

function renderSearch(props) {
  const onChange = vi.fn()
  render(
    <PhoneSearch
      searchTerm=""
      onChange={onChange}
      count={0}
      loading={false}
      error={null}
      {...props}
    />,
  )
  return { onChange }
}

describe('PhoneSearch', () => {
  it('renders the input with the current search term', () => {
    renderSearch({ searchTerm: 'iphone' })

    expect(screen.getByRole('searchbox')).toHaveValue('iphone')
  })

  it('calls onChange with the typed value', () => {
    const { onChange } = renderSearch()

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'samsung' },
    })

    expect(onChange).toHaveBeenCalledWith('samsung')
  })

  it('shows the results count when not loading or error', () => {
    renderSearch({ count: 5 })

    expect(screen.getByText('5 results')).toBeInTheDocument()
  })

  it('hides the results count while loading', () => {
    renderSearch({ loading: true, count: 5 })

    expect(screen.queryByText('5 results')).not.toBeInTheDocument()
  })
})
