import { createPhone, createPhoneDetail } from '../mappers/phone'
import { uniqueBy } from '../utils/array'

const baseurl =
  'https://prueba-tecnica-api-tienda-moviles.onrender.com/products'
const apiKey = import.meta.env.VITE_PHONEAPI_KEY
const headers = { 'x-api-key': apiKey }
const limit = 20

export async function getPhones(searchText = '') {
  const params = new URLSearchParams({ limit })
  if (searchText) {
    params.append('search', searchText)
  }
  const data = await apiFetch(`${baseurl}?${params}`)

  const rawPhones = searchText
    ? uniqueBy(data, 'id')
    : await collectRawPhonesUntilLimit(data)

  return rawPhones.map(createPhone)
}

export async function getPhoneById(id) {
  const data = await apiFetch(`${baseurl}/${id}`)
  return createPhoneDetail(data)
}

async function apiFetch(endpoint = baseurl) {
  const response = await fetch(endpoint, { headers })
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

async function collectRawPhonesUntilLimit(initialData) {
  const unique = uniqueBy(initialData, 'id')
  if (unique.length === limit) {
    return unique
  }

  const params = new URLSearchParams({ offset: limit })
  const batch = await apiFetch(`${baseurl}?${params}`)

  return uniqueBy([...unique, ...batch], 'id').slice(0, limit)
}
