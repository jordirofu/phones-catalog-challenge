import { useState } from 'react'

export default function ColorSelector({ options, selected, onChange }) {
  const [hovered, setHovered] = useState(null)
  const displayName = hovered?.name ?? selected?.name

  return (
    <div className="color-selector">
      <p className="color-selector__label">COLOR. PICK YOUR FAVOURITE.</p>
      <div className="color-selector__options" role="group" aria-label="Color">
        {options.map((option) => {
          const isSelected = selected?.name === option.name
          return (
            <button
              key={option.name}
              className={`color-selector__swatch${isSelected ? ' color-selector__swatch--selected' : ''}`}
              style={{ backgroundColor: option.hexCode }}
              aria-label={option.name}
              aria-pressed={isSelected}
              onClick={() => onChange(option)}
              onMouseEnter={() => setHovered(option)}
              onMouseLeave={() => setHovered(null)}
            />
          )
        })}
      </div>
      <p className="color-selector__name">{displayName}</p>
    </div>
  )
}
