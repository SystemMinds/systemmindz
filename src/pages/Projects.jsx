import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Polytope from '@components/Polytope/Polytope'

const featured = {
  title: 'AI-Powered Supply Chain Intelligence',
  tag: 'Enterprise AI',
  year: '2026',
  desc: 'A machine-learning platform that predicts demand fluctuations, optimises stock levels, and reduces waste across a 200-warehouse network. Delivered a 42% reduction in overstock and a 31% improvement in on-time delivery.',
  metrics: [
    { value: '42%', label: 'Overstock Reduction' },
    { value: '31%', label: 'On-Time Delivery' },
    { value: '200+', label: 'Warehouses Managed' },
  ],
  img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80',
}

const projects = [
  {
    id: 1, num: '001',
    title: 'Neural Document Processor',
    tag: 'AI / NLP',
    year: '2026',
    desc: 'Automated extraction and classification of 50,000+ legal documents daily using transformer models.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
  },
  {
    id: 2, num: '002',
    title: 'Real-Time Fraud Detection',
    tag: 'FinTech',
    year: '2026',
    desc: 'Event-driven fraud detection system processing 2M+ transactions per hour with sub-50ms latency.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80',
  },
  {
    id: 3, num: '003',
    title: 'Telemedicine Platform',
    tag: 'Healthcare',
    year: '2025',
    desc: 'HIPAA-compliant video consultation platform serving 80,000 monthly active patients.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80',
  },
  {
    id: 4, num: '004',
    title: 'Multi-Tenant SaaS ERP',
    tag: 'Enterprise',
    year: '2025',
    desc: 'Modular ERP system with role-based access, multi-currency, and 40+ third-party integrations.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80',
  },
  {
    id: 5, num: '005',
    title: 'EdTech Adaptive Engine',
    tag: 'Education',
    year: '2025',
    desc: 'Personalised learning paths powered by AI that improved student completion rates by 67%.',
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&q=80',
  },
  {
    id: 6, num: '006',
    title: 'Smart Energy Dashboard',
    tag: 'IoT',
    year: '2025',
    desc: 'IoT dashboard aggregating sensor data from 5,000+ devices for real-time energy optimisation.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function Projects() {
  return (
    <div data-navtheme="dark" className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[65vh] flex flex-col justify-end pb-20 overflow-hidden px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 pt-48">
        <div className="absolute top-0 right-[-60px] opacity-20 pointer-events-none">
          <Polytope size={520} speed={0.09} opacity={0.4} />
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8"
        >
          Case Studies
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.02] tracking-tight text-white mb-10"
        >
          <span className="font-extralight text-white/30">Work We&apos;re</span>
          <br />
          <span className="font-bold">Proud Of.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="max-w-xl text-white/40 text-[14px] leading-relaxed font-light"
        >
          Deep-dive into the projects that shaped industries, solved real problems,
          and delivered measurable results for our clients.
        </motion.p>
      </section>

      {/* Featured Project */}
      <section className="px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 pb-0">
        <Link to="/contact">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden group cursor-pointer"
        >
          <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
            <img src={featured.img} alt={featured.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
            <div className="flex items-end justify-between gap-8 flex-wrap">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-widest font-bold text-orange-400 mb-4 block">{featured.tag} — {featured.year}</span>
                <h2 className="text-[28px] md:text-[44px] font-bold text-white leading-tight mb-4">{featured.title}</h2>
                <p className="text-white/50 text-[14px] leading-relaxed font-light max-w-xl">{featured.desc}</p>
              </div>

              <div className="flex gap-12">
                {featured.metrics.map(m => (
                  <div key={m.label} className="text-center">
                    <div className="text-[36px] md:text-[48px] font-bold text-white leading-none">{m.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-2">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/30 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition-all duration-500">
            <ExternalLink size={18} />
          </div>
        </motion.div>
        </Link>
      </section>

      {/* Projects List */}
      <section className="px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 py-4">
        <div className="border-t border-white/10 mt-0">
          {projects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
              <Link
                to="/contact"
                className="group border-b border-white/10 py-10 flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-white/[0.02] transition-all duration-500 cursor-pointer px-2"
              >
                <span className="text-[11px] text-white/15 font-bold tracking-widest uppercase w-10 shrink-0">{project.num}</span>

                <div className="w-20 h-14 overflow-hidden shrink-0">
                  <img src={project.img} alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                </div>

                <div className="flex-1">
                  <h3 className="text-[20px] md:text-[24px] font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-[13px] leading-relaxed font-light max-w-2xl">{project.desc}</p>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-orange-400/70 border border-orange-500/20 px-3 py-1">
                    {project.tag}
                  </span>
                  <span className="text-[12px] text-white/25 font-light">{project.year}</span>
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/20 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition-all duration-500">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-white mb-10"
        >
          <span className="font-extralight text-white/30">Your project could</span>
          <br />
          <span className="font-bold">be next.</span>
        </motion.h2>
        <a
          href="/contact"
          className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">Start a project</span>
          <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
            <ArrowRight size={18} />
          </div>
        </a>
      </section>

    </div>
  )
}
