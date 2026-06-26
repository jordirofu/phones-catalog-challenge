import { describe, it, expect } from 'vitest'
import { uniqueBy } from './array'

describe('uniqueBy', () => {
  it('returns all items when there are no duplicates', () => {
    const arr = [{ id: '1' }, { id: '2' }, { id: '3' }]
    expect(uniqueBy(arr, 'id')).toHaveLength(3)
  })

  it('removes duplicate items keeping the first occurrence', () => {
    const first = { id: '1', name: 'first' }
    const duplicate = { id: '1', name: 'duplicate' }
    const result = uniqueBy([first, duplicate], 'id')
    expect(result).toHaveLength(1)
    expect(result[0]).toBe(first)
  })

  it('returns an empty array when given an empty array', () => {
    expect(uniqueBy([], 'id')).toEqual([])
  })
})
