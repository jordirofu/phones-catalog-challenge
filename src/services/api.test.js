import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPhones, getPhoneById } from './api'

const rawPhone = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'img.jpg',
}
const mappedPhone = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imageUrl: 'img.jpg',
}

function mockFetch(data) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  })
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getPhoneById', () => {
  it('fetches the correct URL for the given id', async () => {
    mockFetch({
      id: '1',
      brand: 'Apple',
      name: 'iPhone 15',
      basePrice: 999,
      imageUrl: 'img.jpg',
      description: 'desc',
      rating: 4.5,
      specs: {},
      colorOptions: [],
      storageOptions: [],
      similarProducts: [],
    })

    await getPhoneById('1')

    expect(fetch).toHaveBeenCalledWith(
      'https://prueba-tecnica-api-tienda-moviles.onrender.com/products/1',
      expect.any(Object),
    )
  })

  it('throws when the API returns an error status', async () => {
    window.fetch = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' })

    await expect(getPhoneById('999')).rejects.toThrow(
      'API error 404: Not Found',
    )
  })
})

describe('getPhones', () => {
  it('returns mapped phones when first batch has 20 unique items', async () => {
    const batch = Array.from({ length: 20 }, (_, i) => ({
      ...rawPhone,
      id: String(i + 1),
    }))
    mockFetch(batch)

    const result = await getPhones()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(20)
    expect(result[0]).toEqual({ ...mappedPhone, id: '1' })
  })

  it('makes a second fetch when first batch has fewer than 20 unique items', async () => {
    const firstBatch = Array.from({ length: 18 }, (_, i) => ({
      ...rawPhone,
      id: String(i + 1),
    }))
    const secondBatch = Array.from({ length: 5 }, (_, i) => ({
      ...rawPhone,
      id: String(i + 19),
    }))

    window.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(firstBatch),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(secondBatch),
      })

    const result = await getPhones()

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(result).toHaveLength(20)
  })

  it('deduplicates phones with the same id when searching', async () => {
    const duplicates = [rawPhone, rawPhone, { ...rawPhone, id: '2' }]
    mockFetch(duplicates)

    const result = await getPhones('iPhone')

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('2')
  })
})
