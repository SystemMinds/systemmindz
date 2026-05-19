import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MenuOverlay from '../MenuOverlay/MenuOverlay'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navColor, setNavColor] = useState('black')
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const updateNavColor = () => {
      const sections = document.querySelectorAll('[data-navtheme]')

      // No themed sections on this page — use the page background color
      if (!sections.length) {
        const bg = document.body.style.backgroundColor ||
          getComputedStyle(document.documentElement).backgroundColor
        const isDark = bg.includes('0, 0, 0') || bg === '#000000' || bg === 'black'
        setNavColor(isDark ? 'white' : 'black')
        return
      }

      const viewportMid = window.scrollY + window.innerHeight * 0.4
      let current = null
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= viewportMid) current = section
      })

      if (current) {
        const theme = current.getAttribute('data-navtheme')
        setNavColor(theme === 'dark' ? 'white' : 'black')
      }
    }

    // Small delay so the new page's DOM is ready
    const timer = setTimeout(updateNavColor, 50)
    window.addEventListener('scroll', updateNavColor, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', updateNavColor)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      if (currentY < 10) {
        setVisible(true)
      } else if (delta > 6) {
        setVisible(false)
        lastScrollY.current = currentY
      } else if (delta < -6) {
        setVisible(true)
        lastScrollY.current = currentY
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isWhite = navColor === 'white'
  const navColorClass = isWhite ? 'text-white' : 'text-black'
  const barColorClass = isWhite ? 'bg-white' : 'bg-black'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-5 sm:py-7 md:py-10 lg:py-12 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="w-full flex justify-center px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <div className="w-full max-w-5xl flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            <span className={`transition-colors duration-500 ${navColorClass}`}>System</span>
            <span className="text-orange-500">Mindz</span>
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`hover:opacity-70 transition-all duration-500 ${navColorClass}`}
            aria-label="Open Menu"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`w-8 h-0.5 transition-colors duration-500 ${barColorClass}`}></span>
              <span className={`w-5 h-0.5 transition-colors duration-500 ${barColorClass}`}></span>
            </div>
          </button>
          </div>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
