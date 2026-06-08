import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import Polytope from '@components/Polytope/Polytope'

const clients = [
  { name: 'ValidProfile', industry: 'Profile Verification & AI', country: 'India' },
  { name: 'WalkinSoftware', industry: 'Enterprise Workflow Solutions', country: 'India' },
  { name: 'ApexSkills Technology', industry: 'Skill Assessment & EdTech', country: 'India' },
]

const testimonials = [
  {
    quote: 'The profile verification platform they built handles thousands of queries with absolute precision. Their team delivered advanced AI modules that exceeded our expectations.',
    name: 'Sarah Newman',
    title: 'Product Head, ValidProfile',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    quote: 'SystemMindz developed our core interview automation workflows with incredible speed and robustness. The engineering standards of the team are truly top-notch.',
    name: 'Jason Smith',
    title: 'CTO, WalkinSoftware',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    quote: 'Their full-stack adaptive learning and assessment engine has been a game-changer for our users. We highly recommend them for any enterprise engineering work.',
    name: 'Emma Wilson',
    title: 'Director, ApexSkills Technology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
]

const stats = [
  { value: '18+', label: 'Projects Delivered' },
  { value: '3+', label: 'Primary Partners' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '1', label: 'Core Mission' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function OurClients() {
  return (
    <div data-navtheme="dark" className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-36 bg-black">
        <div className="absolute top-[-40px] right-[-80px] opacity-20 pointer-events-none">
          <Polytope size={500} speed={0.09} opacity={0.4} />
        </div>
        <div className="absolute bottom-[-80px] left-[30%] opacity-10 pointer-events-none">
          <Polytope size={300} speed={0.06} opacity={0.3} />
        </div>

        <div className="w-full relative z-10 flex justify-center px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 flex-1 flex flex-col justify-center">
          <div className="w-full max-w-5xl">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8"
            >
              Trusted By
            </motion.p>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.02] tracking-tight text-white mb-10"
            >
              <span className="font-bold">Clients Who</span>
              <br />
              <span className="font-extralight text-white/30">Trust Our</span>{' '}
              <span className="font-bold">Work.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="max-w-xl text-white/40 text-[14px] leading-relaxed font-light"
            >
              From early-stage startups to enterprise organisations across four continents —
              our clients choose us for precision, reliability, and long-term partnership.
            </motion.p>
          </div>
        </div>

        {/* Stats Block at the bottom end line of Hero, edge-to-edge */}
        <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full">
            {stats.map((s, i) => {
              const match = s.value.match(/^(\d+)(.*)$/)
              const number = match ? match[1] : s.value
              const suffix = match ? match[2] : ''
              return (
                <div
                  key={s.label}
                  className="py-14 px-6 border-r border-white/10 last:border-r-0 text-center"
                >
                  <div className="text-[44px] sm:text-[56px] font-bold text-white leading-none mb-2">
                    {number}<span className="text-orange-500">{suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section data-navtheme="light" className="bg-white min-h-screen flex flex-col justify-center py-24 sm:py-32">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
          >
            Our Partners
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[40px] md:text-[60px] leading-[1.05] tracking-tight text-black mb-20"
          >
            <span className="font-bold">Companies We&apos;ve</span>
            <br />
            <span className="font-extralight text-black/30">Partnered With.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/10">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group p-10 border-b border-r border-black/10 hover:bg-black transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 bg-black/5 group-hover:bg-orange-500 rounded-full transition-all duration-500 flex items-center justify-center">
                    <span className="text-[12px] font-black text-black/40 group-hover:text-black transition-colors duration-500">
                      {client.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-black/30 group-hover:text-white/30 transition-colors duration-500">
                    {client.country}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-black group-hover:text-white transition-colors duration-500 mb-1">
                  {client.name}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-black/40 group-hover:text-white/40 transition-colors duration-500 font-bold">
                  {client.industry}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-black min-h-screen flex flex-col justify-center py-24 sm:py-32">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[40px] md:text-[60px] leading-[1.05] tracking-tight text-white mb-20"
          >
            <span className="font-extralight text-white/30">What Our</span>{' '}
            <span className="font-bold">Clients Say.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-0 flex flex-col justify-between gap-10"
              >
                <div>
                  <Quote size={28} className="text-orange-500/50 mb-6" />
                  <p className="text-white/60 text-[15px] leading-relaxed font-light">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name}
                    className="w-12 h-12 rounded-full object-cover grayscale" />
                  <div>
                    <div className="text-white font-bold text-[14px]">{t.name}</div>
                    <div className="text-white/40 text-[12px] font-light">{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-navtheme="light" className="bg-white py-32 px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute bottom-0 right-0 opacity-[0.04] pointer-events-none">
          <Polytope size={400} speed={0.08} opacity={0.3} />
        </div>
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-black mb-10 text-center"
          >
            <span className="font-bold">Become our</span>
            <br />
            <span className="font-extralight text-black/30 italic">next success story.</span>
          </motion.h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-black transition-all duration-500"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">Work with us</span>
            <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </section>

    </div>
  )
}
