import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import StorageSelector from './StorageSelector'

const options = [
  { capacity: '128GB' },
  { capacity: '256GB' },
  { capacity: '512GB' },
]

function renderSelector(props) {
  const onChange = vi.fn()
  render(
    <StorageSelector
      options={options}
      selected={null}
      onChange={onChange}
      {...props}
    />,
  )
  return { onChange }
}

describe('StorageSelector', () => {
  it('renders a button for each option', () => {
    renderSelector()

    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(screen.getByRole('button', { name: '128GB' })).toBeInTheDocument()
  })

  it('marks the selected option as pressed', () => {
    renderSelector({ selected: { capacity: '256GB' } })

    expect(screen.getByRole('button', { name: '256GB' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '128GB' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('calls onChange with the option when a button is clicked', () => {
    const { onChange } = renderSelector()

    fireEvent.click(screen.getByRole('button', { name: '512GB' }))

    expect(onChange).toHaveBeenCalledWith({ capacity: '512GB' })
  })
})
