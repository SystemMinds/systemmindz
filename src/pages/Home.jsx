import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp } from 'lucide-react'
import Polytope from '@components/Polytope/Polytope'
import ScrollIndicator from '@components/ScrollIndicator/ScrollIndicator'
import { motion } from 'framer-motion'
import About from '@components/About/About'
import Services from '@components/Services/Services'
import Team from '@components/Team/Team'
import Testimonials from '@components/Testimonials/Testimonials'
import BrandSlider from '@components/BrandSlider/BrandSlider'
import Blog from '@components/Blog/Blog'

export default function Home() {
  const [labelColor, setLabelColor] = useState('white') // 'white' or 'black'

  useEffect(() => {
    const sections = document.querySelectorAll('[data-navtheme]')
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
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
          setLabelColor(theme === 'dark' ? 'white' : 'black')
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7], rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const isWhite = labelColor === 'white'
  const textColorClass = isWhite ? 'text-white' : 'text-black'
  const lineBgClass = isWhite ? 'bg-white/20' : 'bg-black/20'
  const opacityClass = isWhite ? 'text-white/40' : 'text-black/40'


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black">
      {/* Hero Section — dark bg */}
      <div data-navtheme="dark" className="relative min-h-screen overflow-hidden flex flex-col justify-center">

        {/* Sidebar Label (Rotated) - Left */}
        <div className={`fixed left-8 bottom-32 hidden xl:flex items-center gap-4 origin-left -rotate-90 select-none z-20 transition-all duration-500 ${textColorClass}`}>
          <div className={`w-8 h-[1px] transition-colors duration-500 ${lineBgClass}`} />
          <span className={`text-[10px] tracking-[0.5em] uppercase font-bold transition-colors duration-500 ${opacityClass}`}>Homepage</span>
        </div>

        {/* Sidebar Label - Right (Back to top) */}
        <div className="fixed right-8 bottom-32 hidden xl:flex flex-col items-center select-none z-20 transition-all duration-500">
          <button
            onClick={scrollToTop}
            className={`group flex flex-col items-center gap-6 transition-all duration-500 ${textColorClass}`}
          >
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 
              ${isWhite ? 'border-white/10 group-hover:bg-white group-hover:text-black' : 'border-black/10 group-hover:bg-black group-hover:text-white'}
            `}>
              <ArrowUp size={16} />
            </div>
            <span className={`text-[10px] tracking-[0.5em] uppercase font-bold origin-center rotate-90 whitespace-nowrap mt-10 transition-colors duration-500 ${opacityClass}`}>Back to top</span>
          </button>
        </div>

        {/* 3D Polytope Background Elements — Pattern matching the reference image */}

        {/* Top Left Polytope (Behind Logo - Matching Right Hand Opacity) */}
        <div className="absolute top-[-100px] left-[15%] md:left-[22%] opacity-[0.35] pointer-events-none">
          <Polytope size={280} speed={0.12} opacity={0.4} />
        </div>

        {/* Main Right Polytope (Smaller & Higher) */}
        <div className="absolute top-[0%] -right-20 md:-right-16 lg:-right-12 opacity-[0.3] mix-blend-screen pointer-events-none">
          <Polytope size={500} speed={0.2} opacity={0.4} />
        </div>

        {/* Bottom Center Polytope (Partial - More Visible) */}
        <div className="absolute -bottom-48 left-[50%] -translate-x-1/2 opacity-[0.35] pointer-events-none">
          <Polytope size={400} speed={0.15} opacity={0.5} />
        </div>

        {/* Hero Content Main Block */}
        <div className="w-full relative z-10 px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72">
          <div className="max-w-6xl">
            {/* Animated Headline with staggered line reveal */}
            <div className="mb-14">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 3.2, ease: [0.215, 0.61, 0.355, 1] }}
                className="space-y-0"
              >
                <h1 className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.05] tracking-tight text-white mb-2">
                  <span className="font-bold">Turn Your</span> <span className="font-extralight text-white/40">Vision Into</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 3.4, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <h1 className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.05] tracking-tight text-white">
                  <span className="font-bold">Scalable</span> <span className="font-extralight text-white/40">Solutions</span>
                </h1>
              </motion.div>
            </div>

            {/* Subtext Reveal - Intersection Observer Triggered */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 3.6, ease: "easeOut" }}
              className="max-w-xl text-white/40 text-[13px] md:text-[14px] leading-relaxed font-light mb-14"
            >
              We bring your dream project from scratch to live with robustness and success.
              As expert full-stack developers, we craft high-performance applications
              using optimized code and strictly follow Agile methodology.
              We handle the entire lifecycle, ensuring your vision is executed perfectly.
            </motion.p>

            {/* Buttons Group - Intersection Observer Triggered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 3.8, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-10"
            >
              {/* Orange Pill Button → Services */}
              <Link to="/services" className="group relative flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">What we do</span>
                <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45">
                  <ArrowRight size={18} />
                </div>
              </Link>

              {/* Outline Text Button → Portfolio */}
              <Link to="/portfolio" className="group flex items-center gap-6 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors duration-300">View Works</span>
                <div className="w-11 h-11 border border-white/10 rounded-full flex items-center justify-center text-white/30 group-hover:border-white/60 group-hover:text-white transition-all duration-500 group-hover:-rotate-45">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Right Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4.5 }}
          className="absolute right-12 md:right-32 bottom-12 scale-90 md:scale-110"
        >
          <ScrollIndicator />
        </motion.div>

      </div>

      {/* About Section — light bg */}
      <div data-navtheme="light"><About /></div>

      {/* Services Section — dark bg */}
      <div data-navtheme="dark"><Services /></div>

      {/* Team Section — light bg */}
      <div data-navtheme="light"><Team /></div>

      {/* Testimonials Section — light bg */}
      <div data-navtheme="light"><Testimonials /></div>

      {/* Partners Slider — light bg */}
      <div data-navtheme="light"><BrandSlider /></div>

      {/* Blog Section — light bg */}
      <div data-navtheme="light"><Blog /></div>
    </div>
  )
}
