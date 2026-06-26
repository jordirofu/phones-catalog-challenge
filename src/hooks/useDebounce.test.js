import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('does not update the value before the delay passes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    )
    rerender({ value: 'new' })
    vi.advanceTimersByTime(299)
    expect(result.current).toBe('initial')
  })

  it('updates the value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    )
    rerender({ value: 'new' })
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('new')
  })

  it('cancels the previous timer if the value changes before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    )
    rerender({ value: 'second' })
    vi.advanceTimersByTime(200)
    rerender({ value: 'third' })

    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('initial')
  })
})
