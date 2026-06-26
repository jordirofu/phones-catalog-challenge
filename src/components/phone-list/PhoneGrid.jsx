import PhoneCard from '../common/PhoneCard'

export default function PhoneGrid({ phones, loading, error, searchTerm }) {
  if (loading) {
    return (
      <p className="phone-grid__loading" role="status">
        Loading...
      </p>
    )
  }
  if (error) {
    return (
      <p className="phone-grid__error" role="alert">
        Something went wrong loading the phones. Please try again.{' '}
        {error.message}
      </p>
    )
  }

  if (phones.length === 0) {
    return <p className="phone-grid__empty">No results for "{searchTerm}"</p>
  }

  return (
    <ul className="phone-grid__list">
      {phones.map((phone) => (
        <li key={phone.id}>
          <PhoneCard phone={phone} />
        </li>
      ))}
    </ul>
  )
}
