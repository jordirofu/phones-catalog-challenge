import { describe, it, expect } from 'vitest'
import { createPhone, createPhoneDetail } from './phone'

const apiPhone = {
  id: 'SAM-G23',
  brand: 'Samsung',
  name: 'Galaxy S23',
  basePrice: 799,
  imageUrl: 'https://example.com/image.jpg',
  extraField: 'ignored',
}

const apiPhoneDetail = {
  id: 'SAM-G23',
  brand: 'Samsung',
  name: 'Galaxy S23',
  description: 'A great phone',
  basePrice: 799,
  rating: 4.5,
  specs: { screen: '6.1"', battery: '3900mAh' },
  colorOptions: [{ name: 'Black', hexCode: '#000', imageUrl: '...' }],
  storageOptions: [{ capacity: '128GB', price: 799 }],
  similarProducts: [
    {
      id: 'SAM-G23U',
      brand: 'Samsung',
      name: 'Galaxy S23 Ultra',
      basePrice: 999,
      imageUrl: '...',
    },
  ],
  extraField: 'ignored',
}

describe('createPhone', () => {
  it('maps the model fields correctly, ignoring extra fields', () => {
    const phone = createPhone(apiPhone)
    expect(phone).toEqual({
      id: 'SAM-G23',
      brand: 'Samsung',
      name: 'Galaxy S23',
      basePrice: 799,
      imageUrl: 'https://example.com/image.jpg',
    })
  })
})

describe('createPhoneDetail', () => {
  it('maps all the model fields correctly, ignoring extra fields', () => {
    const detail = createPhoneDetail(apiPhoneDetail)
    expect(detail).toEqual({
      id: 'SAM-G23',
      brand: 'Samsung',
      name: 'Galaxy S23',
      description: 'A great phone',
      basePrice: 799,
      rating: 4.5,
      specs: { screen: '6.1"', battery: '3900mAh' },
      colorOptions: [{ name: 'Black', hexCode: '#000', imageUrl: '...' }],
      storageOptions: [{ capacity: '128GB', price: 799 }],
      similarProducts: [
        {
          id: 'SAM-G23U',
          brand: 'Samsung',
          name: 'Galaxy S23 Ultra',
          basePrice: 999,
          imageUrl: '...',
        },
      ],
    })
  })

  it('returns an empty array when similarProducts is null', () => {
    const detail = createPhoneDetail({
      ...apiPhoneDetail,
      similarProducts: null,
    })
    expect(detail.similarProducts).toEqual([])
  })

  it('returns an empty array when similarProducts is undefined', () => {
    const detail = createPhoneDetail({
      ...apiPhoneDetail,
      similarProducts: undefined,
    })
    expect(detail.similarProducts).toEqual([])
  })
})
