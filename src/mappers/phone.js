export function createPhone(apiData) {
  return {
    id: apiData.id,
    brand: apiData.brand,
    name: apiData.name,
    basePrice: apiData.basePrice,
    imageUrl: apiData.imageUrl,
  }
}

export function createPhoneDetail(apiData) {
  return {
    id: apiData.id,
    brand: apiData.brand,
    name: apiData.name,
    description: apiData.description,
    basePrice: apiData.basePrice,
    rating: apiData.rating,
    specs: apiData.specs,
    colorOptions: apiData.colorOptions,
    storageOptions: apiData.storageOptions,
    similarProducts: (apiData.similarProducts ?? []).map(createPhone),
  }
}
