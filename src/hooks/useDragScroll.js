import { useRef, useState } from 'react'

const DRAG_THRESHOLD = 5

export function useDragScroll() {
  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const moved = useRef(false)

  const onMouseDown = (e) => {
    e.preventDefault() 
    setIsDragging(true)
    moved.current = false
    startX.current = e.pageX - ref.current.offsetLeft
    startScrollLeft.current = ref.current.scrollLeft
  }

  const onMouseMove = (e) => {
    if (!isDragging) {
      return
    }
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    const walk = x - startX.current
    if (Math.abs(walk) > DRAG_THRESHOLD) {
      moved.current = true
    }
    ref.current.scrollLeft = startScrollLeft.current - walk
  }

  const stopDragging = () => setIsDragging(false)

  const onClickCapture = (e) => {
    if (moved.current) {
      e.preventDefault()
      e.stopPropagation()
      moved.current = false
    }
  }

  return {
    ref,
    isDragging,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: stopDragging,
      onMouseLeave: stopDragging,
      onClickCapture,
      onDragStart: (e) => e.preventDefault(),
    },
  }
}
