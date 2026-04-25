import { useState, useCallback } from 'react'

/**
 * Simple toggle hook.
 * const [isOpen, toggle, setIsOpen] = useToggle(false)
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle, setValue]
}
