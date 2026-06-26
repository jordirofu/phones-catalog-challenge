import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns data when fetch resolves', async () => {
    const data = [{ id: '1', name: 'Phone' }]
    const fetchFn = vi.fn().mockResolvedValue(data)

    const { result } = renderHook(() => useFetch(fetchFn, 'param'))

    await waitFor(() => expect(result.current.data).toEqual(data))
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('sets loading to true while fetching', async () => {
    const fetchFn = vi.fn().mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useFetch(fetchFn, 'param'))

    await waitFor(() => expect(result.current.loading).toBe(true))
  })

  it('sets error when fetch rejects', async () => {
    const error = new Error('Network error')
    const fetchFn = vi.fn().mockRejectedValue(error)

    const { result } = renderHook(() => useFetch(fetchFn, 'param'))

    await waitFor(() => expect(result.current.error).toEqual(error))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
  })

  it('re-fetches when param changes', async () => {
    const fetchFn = vi.fn().mockResolvedValue('data')

    const { rerender } = renderHook(({ param }) => useFetch(fetchFn, param), {
      initialProps: { param: 'first' },
    })

    await waitFor(() => expect(fetchFn).toHaveBeenCalledWith('first'))

    rerender({ param: 'second' })

    await waitFor(() => expect(fetchFn).toHaveBeenCalledWith('second'))
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })
})
