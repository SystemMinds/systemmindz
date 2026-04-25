import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuOverlay from '../MenuOverlay/MenuOverlay'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navColor, setNavColor] = useState('white')

  useEffect(() => {
    const sections = document.querySelectorAll('[data-navtheme]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null
        let maxRatio = 0
        entries.forEach(entry => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = entry
          }
        })
        if (mostVisible) {
          const theme = mostVisible.target.getAttribute('data-navtheme')
          setNavColor(theme === 'dark' ? 'white' : 'black')
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7], rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const isWhite = navColor === 'white'
  const navColorClass = isWhite ? 'text-white' : 'text-black'
  const barColorClass = isWhite ? 'bg-white' : 'bg-black'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-12 transition-colors duration-500">
        <div className="w-full px-6 sm:px-10 lg:pl-32 xl:pl-48 flex items-center justify-between xl:pr-32">
          {/* Logo */}
          <Link to="/" className={`text-3xl font-bold tracking-tighter transition-colors duration-500 ${navColorClass}`}>
            S.
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
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
