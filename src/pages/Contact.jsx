import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'

const SOCIAL = [
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/systemmindz', logo: '/social/linkedin.svg' },
  { name: 'Twitter',   href: 'https://twitter.com/systemmindz',               logo: '/social/twitter.svg' },
  { name: 'Instagram', href: 'https://www.instagram.com/systemmindz',         logo: '/social/instagram.svg' },
  { name: 'Facebook',  href: 'https://www.facebook.com/systemmindz',          logo: '/social/facebook.svg' },
  { name: 'YouTube',   href: 'https://www.youtube.com/@systemmindz',          logo: '/social/youtube.svg' },
  { name: 'GitHub',    href: 'https://github.com/systemmindz',                logo: '/social/github.svg' },
]
import Polytope from '@components/Polytope/Polytope'

const SERVICES = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Cloud & DevOps',
  'AI & Automation',
  'Other',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '', services: [] })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const toggleService = s => setForm(f => ({
    ...f,
    services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
  }))

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
    <div data-navtheme="light" className="bg-white min-h-screen">

      {/* ── CENTERED HEADER ── */}
      <section className="relative pt-32 pb-6 px-5 sm:px-10 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <Polytope size={600} speed={0.06} opacity={0.3} />
        </div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-5"
        >
          <span className="font-bold text-gray-900">Contact Our</span>{' '}<span className="font-bold text-orange-500">Team</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="max-w-xl mx-auto text-gray-500 text-[14px] leading-relaxed font-light"
        >
          Got any questions about the product or scaling on our platform? We&apos;re here to help.
          Chat to our friendly team 24/7 and get onboard in less than 12 hours.
        </motion.p>
      </section>

      {/* ── BODY: Form + Info ── */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-20 xl:px-28 pb-24">
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-10 xl:gap-16 items-start">

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-start gap-5 border border-gray-200 rounded-2xl p-8">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Send size={20} className="text-black" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-900">Message sent!</h3>
                <p className="text-gray-500 text-[13px] font-light leading-relaxed">`n                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ firstName: '', lastName: '', email: '', phone: '', message: '', services: [] }) }}
                  className="text-[11px] uppercase tracking-widest font-bold text-orange-500 hover:text-orange-400 transition-colors duration-300"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* First + Last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-gray-700">First name</label>
                    <input
                      type="text" name="firstName" value={form.firstName} onChange={handleChange} required
                      placeholder="First name"
                      className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-orange-500 transition-colors duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-gray-700">Last name</label>
                    <input
                      type="text" name="lastName" value={form.lastName} onChange={handleChange} required
                      placeholder="Last name"
                      className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-orange-500 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-gray-700">Email</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="you@company.com"
                    className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-orange-500 transition-colors duration-300"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-gray-700">Phone number</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-orange-500 transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-gray-700">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Leave us a message..."
                    className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-orange-500 transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Services */}
                <div className="flex flex-col gap-3">
                  <label className="text-[12px] font-medium text-gray-700">Services</label>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {SERVICES.map(s => (
                      <button
                        key={s} type="button"
                        onClick={() => toggleService(s)}
                        className="flex items-center gap-2.5 group text-left"
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200 ${
                          form.services.includes(s)
                            ? 'bg-orange-500 border-orange-500'
                            : 'bg-transparent border-gray-300 group-hover:border-gray-500'
                        }`}>
                          {form.services.includes(s) && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span className="text-[13px] text-gray-500 font-light group-hover:text-gray-900 transition-colors duration-200">
                          {s}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {status === 'error' && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400 font-light">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-black text-white text-[12px] font-bold uppercase tracking-[0.15em] rounded-lg hover:bg-orange-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── RIGHT: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="space-y-0"
          >
            {/* Follow us */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h3 className="text-[16px] font-bold text-gray-900 mb-1.5">Follow us</h3>
              <p className="text-gray-500 text-[13px] font-light mb-4 leading-relaxed">
                Connect with us on social media.
              </p>
              <div className="flex items-center gap-5 flex-wrap">
                {SOCIAL.map(({ name, href, logo }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                    className="opacity-75 hover:opacity-100 transition-opacity duration-200" aria-label={name}>
                    <img src={logo} alt={name} width={22} height={22} />
                  </a>
                ))}
              </div>
            </div>

            {/* Chat with us */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h3 className="text-[16px] font-bold text-gray-900 mb-1.5">Chat with us</h3>
              <p className="text-gray-500 text-[13px] font-light mb-4 leading-relaxed">
                Reach us instantly — we reply fast.
              </p>
              <div className="space-y-3">
                <a href="https://wa.me/919713848000"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-gray-700 text-[13px] font-medium hover:text-green-500 transition-colors duration-200">
                  <img src="/social/whatsapp.svg" alt="WhatsApp" width={16} height={16} />
                  WhatsApp us
                </a>
                <a href="mailto:hello@systemmindz.com"
                  className="flex items-center gap-2.5 text-gray-700 text-[13px] font-medium hover:text-orange-500 transition-colors duration-200">
                  <Mail size={15} className="shrink-0 text-orange-500" />
                  hello@systemmindz.com
                </a>
              </div>
            </div>

            {/* Visit us */}
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-1.5">Visit us</h3>
              <p className="text-gray-500 text-[13px] font-light mb-4 leading-relaxed">
                Come say hello at our India office.
              </p>
              <div className="flex items-start gap-2.5 text-orange-500 text-[13px] font-medium">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Bengaluru, Karnataka, India
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}



