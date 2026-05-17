import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Polytope from '@components/Polytope/Polytope'

const projects = [
  {
    id: 1,
    title: 'AI-Powered CRM Platform',
    category: 'AI',
    tag: 'Enterprise SaaS',
    year: '2024',
    desc: 'End-to-end CRM with predictive analytics, lead scoring, and automated workflows built on Spring Boot + React.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 2,
    title: 'E-Commerce Marketplace',
    category: 'Web',
    tag: 'Full-Stack',
    year: '2024',
    desc: 'Multi-vendor marketplace with real-time inventory, payment gateway integration, and admin dashboard.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  },
  {
    id: 3,
    title: 'Healthcare Management System',
    category: 'Web',
    tag: 'Healthcare',
    year: '2023',
    desc: 'HIPAA-compliant patient portal with appointment scheduling, telemedicine, and EMR integration.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    id: 4,
    title: 'Smart Logistics Dashboard',
    category: 'AI',
    tag: 'Logistics',
    year: '2024',
    desc: 'Real-time fleet tracking with AI route optimization, reducing delivery time by 38%.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    id: 5,
    title: 'FinTech Mobile App',
    category: 'Mobile',
    tag: 'Finance',
    year: '2023',
    desc: 'Cross-platform banking app with biometric auth, instant transfers, and AI-driven spend insights.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    id: 6,
    title: 'EdTech Learning Platform',
    category: 'Web',
    tag: 'Education',
    year: '2023',
    desc: 'Adaptive learning platform with video streaming, live classes, and progress analytics for 10k+ students.',
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
  },
]

const categories = ['All', 'Web', 'AI', 'Mobile']

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-24 overflow-hidden px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 pt-48">
        <div className="absolute top-[-80px] right-[-80px] opacity-20 pointer-events-none">
          <Polytope size={500} speed={0.1} opacity={0.4} />
        </div>
        <div className="absolute bottom-0 left-[20%] opacity-10 pointer-events-none">
          <Polytope size={300} speed={0.08} opacity={0.3} />
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8"
        >
          Our Work
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.02] tracking-tight text-white mb-10"
        >
          <span className="font-bold">Selected</span>{' '}
          <span className="font-extralight text-white/30">Projects</span>
          <br />
          <span className="font-extralight text-white/30">We&apos;ve </span>
          <span className="font-bold">Built.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="max-w-xl text-white/40 text-[14px] leading-relaxed font-light"
        >
          A showcase of digital products that blend technical precision with purposeful design —
          from AI platforms to full-stack enterprise solutions.
        </motion.p>
      </section>

      {/* Filter */}
      <section className="px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 pb-16 flex gap-4 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[11px] uppercase tracking-widest font-bold px-6 py-2.5 border transition-all duration-300 ${
              active === cat
                ? 'bg-orange-500 border-orange-500 text-black'
                : 'border-white/20 text-white/50 hover:border-white/60 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Projects Grid */}
      <section className="px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.1}
            >
            <Link to="/projects" className="group relative border border-white/10 overflow-hidden cursor-pointer block">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute top-6 right-6 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/40 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={16} />
                </div>
                <span className="absolute top-6 left-6 text-[10px] uppercase tracking-widest font-bold text-orange-400 bg-black/60 px-3 py-1">
                  {project.tag}
                </span>
              </div>
              <div className="p-8 bg-black">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[20px] font-bold text-white leading-tight group-hover:text-orange-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-[11px] text-white/30 font-light shrink-0 ml-4 mt-1">{project.year}</span>
                </div>
                <p className="text-white/40 text-[13px] leading-relaxed font-light">{project.desc}</p>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-32 px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
        >
          Start a Project
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-black mb-10"
        >
          <span className="font-bold">Have an idea?</span><br />
          <span className="font-extralight text-black/30">Let&apos;s build it together.</span>
        </motion.h2>
        <motion.a
          href="/contact"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-black transition-all duration-500"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">Get in touch</span>
          <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
            <ArrowRight size={18} />
          </div>
        </motion.a>
      </section>

    </div>
  )
}
