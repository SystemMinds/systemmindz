import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone, Send } from 'lucide-react'
import Polytope from '@components/Polytope/Polytope'

const offices = [
  {
    city: 'India',
    address: 'Bengaluru, Karnataka, India',
    phone: '+91 98765 43210',
    email: 'india@systemmindz.com',
  },
]

const budgets = ['< $10k', '$10k – $50k', '$50k – $150k', '$150k+']

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.sent) {
        setStatus('sent')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pb-20 overflow-hidden px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 pt-48">
        <div className="absolute top-[-40px] right-[-60px] opacity-20 pointer-events-none">
          <Polytope size={480} speed={0.09} opacity={0.4} />
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.02] tracking-tight text-white mb-10"
        >
          <span className="font-bold">Let&apos;s</span>{' '}
          <span className="font-extralight text-white/30">Build</span>
          <br />
          <span className="font-extralight text-white/30">Something </span>
          <span className="font-bold">Great.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="max-w-xl text-white/40 text-[14px] leading-relaxed font-light"
        >
          Tell us about your project. We respond to every enquiry within 24 hours
          and always with a real human on the other side.
        </motion.p>
      </section>

      {/* Form + Info */}
      <section className="px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 pb-32">
        <div className="border-t border-white/10 pt-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20 xl:gap-32">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-start gap-6 py-20">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Send size={24} className="text-black" />
                </div>
                <h3 className="text-[32px] font-bold text-white">Message sent!</h3>
                <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-md">
                  Thank you for reaching out. A member of our team will get back to you within 24 hours.
                  A confirmation has been sent to your email.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', budget: '', message: '' }) }}
                  className="text-[11px] uppercase tracking-widest font-bold text-orange-500 hover:text-orange-400 transition-colors duration-300 mt-4"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0">

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10">
                  <div className="p-0 border-r border-white/10">
                    <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold px-6 pt-6 pb-2">
                      Full Name
                    </label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="John Doe"
                      className="w-full bg-transparent px-6 pb-6 text-white text-[15px] font-light placeholder-white/15 outline-none"
                    />
                  </div>
                  <div className="p-0">
                    <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold px-6 pt-6 pb-2">
                      Email Address
                    </label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="john@company.com"
                      className="w-full bg-transparent px-6 pb-6 text-white text-[15px] font-light placeholder-white/15 outline-none"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="border border-t-0 border-white/10">
                  <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold px-6 pt-6 pb-2">
                    Company / Organisation
                  </label>
                  <input
                    type="text" name="company" value={form.company} onChange={handleChange}
                    placeholder="Your company name (optional)"
                    className="w-full bg-transparent px-6 pb-6 text-white text-[15px] font-light placeholder-white/15 outline-none"
                  />
                </div>

                {/* Budget */}
                <div className="border border-t-0 border-white/10 px-6 py-6">
                  <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">
                    Project Budget
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map(b => (
                      <button
                        key={b} type="button"
                        onClick={() => setForm(f => ({ ...f, budget: b }))}
                        className={`text-[11px] uppercase tracking-wider font-bold px-5 py-2 border transition-all duration-300 ${
                          form.budget === b
                            ? 'bg-orange-500 border-orange-500 text-black'
                            : 'border-white/15 text-white/40 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="border border-t-0 border-white/10">
                  <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold px-6 pt-6 pb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Describe your project, goals, timeline..."
                    className="w-full bg-transparent px-6 pb-6 text-white text-[15px] font-light placeholder-white/15 outline-none resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="border border-red-500/30 bg-red-500/10 px-5 py-3 text-[13px] text-red-400 font-light">
                    {errorMsg}
                  </div>
                )}

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </span>
                    <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
                      <ArrowRight size={18} />
                    </div>
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-16"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8">Our Offices</p>
              <div className="space-y-12">
                {offices.map(o => (
                  <div key={o.city} className="border-b border-white/10 pb-10 last:border-0">
                    <h4 className="text-[18px] font-bold text-white mb-5">{o.city}</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-white/40 text-[13px] font-light">
                        <MapPin size={14} className="mt-0.5 text-orange-500 shrink-0" />
                        {o.address}
                      </div>
                      <div className="flex items-center gap-3 text-white/40 text-[13px] font-light">
                        <Phone size={14} className="text-orange-500 shrink-0" />
                        {o.phone}
                      </div>
                      <div className="flex items-center gap-3 text-white/40 text-[13px] font-light">
                        <Mail size={14} className="text-orange-500 shrink-0" />
                        {o.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6">Response Time</p>
              <p className="text-white/50 text-[14px] leading-relaxed font-light">
                We respond to all project enquiries within <span className="text-white font-bold">24 hours</span>.
                For urgent requests, reach us directly via phone or email.
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6">General Enquiries</p>
              <a href="mailto:hello@systemmindz.com"
                className="text-white text-[18px] font-bold hover:text-orange-400 transition-colors duration-300">
                hello@systemmindz.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
