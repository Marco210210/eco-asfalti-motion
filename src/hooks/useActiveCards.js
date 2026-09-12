import { useCallback, useEffect, useRef, useState } from 'react'

export default function useActiveCards(count) {
  const nodes = useRef([])
  const frame = useRef(0)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [interactionIndex, setInteractionIndex] = useState(null)

  useEffect(() => {
    setScrollIndex(0)
    nodes.current = nodes.current.slice(0, count)
  }, [count])

  useEffect(() => {
    const touchLayout = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)')

    const update = () => {
      frame.current = 0
      if (!touchLayout.matches) {
        setScrollIndex(0)
        return
      }

      const viewportCenter = window.innerHeight * 0.52
      let closestIndex = null
      let closestDistance = Number.POSITIVE_INFINITY

      nodes.current.forEach((node, index) => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== null) setScrollIndex(closestIndex)
    }

    const schedule = () => {
      if (!frame.current) frame.current = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    touchLayout.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      touchLayout.removeEventListener('change', update)
      if (frame.current) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  const setNode = useCallback((index, node) => {
    nodes.current[index] = node
  }, [])

  const propsFor = useCallback((index) => ({
    ref: node => setNode(index, node),
    onMouseEnter: () => setInteractionIndex(index),
    onMouseLeave: () => setInteractionIndex(null),
    onFocus: () => setInteractionIndex(index),
    onBlur: event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setInteractionIndex(null)
    },
  }), [setNode])

  return { activeIndex: interactionIndex ?? scrollIndex, propsFor }
}
