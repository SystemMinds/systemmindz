import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Force synchronous scroll to top before browser paint to prevent layout flashes and premature animations
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
