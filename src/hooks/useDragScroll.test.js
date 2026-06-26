import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDragScroll } from './useDragScroll'

function mouseEvent(pageX) {
  return { pageX, preventDefault: vi.fn() }
}

function clickEvent() {
  return { preventDefault: vi.fn(), stopPropagation: vi.fn() }
}

describe('useDragScroll', () => {
  it('starts without dragging', () => {
    const { result } = renderHook(() => useDragScroll())
    expect(result.current.isDragging).toBe(false)
  })

  it('sets isDragging on mouse down and clears it on mouse up', () => {
    const { result } = renderHook(() => useDragScroll())
    result.current.ref.current = { offsetLeft: 0, scrollLeft: 0 }

    act(() => result.current.dragHandlers.onMouseDown(mouseEvent(0)))
    expect(result.current.isDragging).toBe(true)

    act(() => result.current.dragHandlers.onMouseUp())
    expect(result.current.isDragging).toBe(false)
  })

  it('updates scrollLeft when dragging horizontally', () => {
    const { result } = renderHook(() => useDragScroll())
    const track = { offsetLeft: 0, scrollLeft: 100 }
    result.current.ref.current = track

    act(() => result.current.dragHandlers.onMouseDown(mouseEvent(200)))
    act(() => result.current.dragHandlers.onMouseMove(mouseEvent(150)))

    expect(track.scrollLeft).toBe(150)
  })

  it('does not scroll on mouse move when not dragging', () => {
    const { result } = renderHook(() => useDragScroll())
    const track = { offsetLeft: 0, scrollLeft: 100 }
    result.current.ref.current = track

    act(() => result.current.dragHandlers.onMouseMove(mouseEvent(150)))

    expect(track.scrollLeft).toBe(100)
  })

  it('suppresses the click after dragging past the threshold', () => {
    const { result } = renderHook(() => useDragScroll())
    result.current.ref.current = { offsetLeft: 0, scrollLeft: 0 }

    act(() => result.current.dragHandlers.onMouseDown(mouseEvent(0)))
    act(() => result.current.dragHandlers.onMouseMove(mouseEvent(20)))

    const click = clickEvent()
    act(() => result.current.dragHandlers.onClickCapture(click))

    expect(click.preventDefault).toHaveBeenCalled()
    expect(click.stopPropagation).toHaveBeenCalled()
  })

  it('does not suppress the click for movement below the threshold', () => {
    const { result } = renderHook(() => useDragScroll())
    result.current.ref.current = { offsetLeft: 0, scrollLeft: 0 }

    act(() => result.current.dragHandlers.onMouseDown(mouseEvent(0)))
    act(() => result.current.dragHandlers.onMouseMove(mouseEvent(3)))

    const click = clickEvent()
    act(() => result.current.dragHandlers.onClickCapture(click))

    expect(click.preventDefault).not.toHaveBeenCalled()
    expect(click.stopPropagation).not.toHaveBeenCalled()
  })
})
