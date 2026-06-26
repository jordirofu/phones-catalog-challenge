export default function StorageSelector({ options, selected, onChange }) {
  return (
    <div className="storage-selector">
      <p className="storage-selector__label">
        STORAGE: HOW MUCH SPACE DO YOU NEED?
      </p>
      <div
        className="storage-selector__options"
        role="group"
        aria-label="Storage"
      >
        {options.map((option) => {
          const isSelected = selected?.capacity === option.capacity
          return (
            <button
              key={option.capacity}
              className={`storage-selector__btn${isSelected ? ' storage-selector__btn--selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onChange(option)}
            >
              {option.capacity}
            </button>
          )
        })}
      </div>
    </div>
  )
}
