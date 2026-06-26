import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPhoneById } from '../services/api'
import BackBar from '../components/common/BackBar'
import PhoneSpecs from '../components/phone-details/PhoneSpecs'
import StorageSelector from '../components/phone-details/StorageSelector'
import ColorSelector from '../components/phone-details/ColorSelector'
import { useCart } from '../hooks/useCart'
import { useFetch } from '../hooks/useFetch'
import SimilarPhones from '../components/phone-details/SimilarPhones'

const buildSpecsTable = (phone) => ({
  brand: phone.brand,
  name: phone.name,
  description: phone.description,
  ...phone.specs,
})

export default function PhoneDetailsPage() {
  const { id } = useParams()

  const { data: phoneDetails, loading, error } = useFetch(getPhoneById, id)
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  const { addItem } = useCart()
  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      phoneId: phoneDetails.id,
      name: phoneDetails.name,
      imageUrl,
      storage: selectedStorage.capacity,
      color: selectedColor.name,
      price,
    })
  }

  if (loading) {
    return <p role="status">Loading...</p>
  }
  if (error) {
    return <p role="alert">Error loading phone.</p>
  }
  if (!phoneDetails) {
    return null
  }

  const price = selectedStorage?.price ?? phoneDetails.basePrice
  const imageUrl =
    selectedColor?.imageUrl ?? phoneDetails.colorOptions[0].imageUrl
  const specs = buildSpecsTable(phoneDetails)

  return (
    <>
      <BackBar to="/" label="Back" />
      <div className="phone-details">
        <div className="phone-details__main">
          <div className="phone-details__image">
            <img src={imageUrl} alt={phoneDetails.name} />
          </div>

          <div className="phone-details__info">
            <div className="phone-details__heading">
              <h1 className="phone-details__name">{phoneDetails.name}</h1>
              <p className="phone-details__price">
                {selectedStorage ? `${price} EUR` : `From ${price} EUR`}
              </p>
            </div>

            <div className="phone-details__selectors">
              <StorageSelector
                options={phoneDetails.storageOptions}
                selected={selectedStorage}
                onChange={setSelectedStorage}
              />
              <ColorSelector
                options={phoneDetails.colorOptions}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            <button
              className="phone-details__add-btn"
              disabled={!selectedStorage || !selectedColor}
              onClick={handleAddToCart}
            >
              ADD
            </button>
          </div>
        </div>

        <PhoneSpecs specs={specs} />
        <SimilarPhones phones={phoneDetails.similarProducts} />
      </div>
    </>
  )
}
