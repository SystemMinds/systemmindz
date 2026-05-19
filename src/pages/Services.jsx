import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Brain, Smartphone, Cloud, Shield, BarChart3 } from 'lucide-react'
import Polytope from '@components/Polytope/Polytope'

const services = [
  {
    icon: Code2,
    number: '01',
    title: 'Full-Stack Development',
    desc: 'End-to-end web applications built with React, Spring Boot, and Python. From architecture to deployment — we own the entire lifecycle.',
    stack: ['React.js', 'Spring Boot', 'PostgreSQL', 'Docker'],
  },
  {
    icon: Brain,
    number: '02',
    title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP pipelines, and predictive systems that automate decisions and extract intelligence from your data.',
    stack: ['Python', 'TensorFlow', 'OpenAI', 'LangChain'],
  },
  {
    icon: Smartphone,
    number: '03',
    title: 'Mobile Applications',
    desc: 'Cross-platform mobile apps with native performance, smooth UX, and deep integrations for iOS and Android.',
    stack: ['React Native', 'Flutter', 'Firebase', 'REST APIs'],
  },
  {
    icon: Cloud,
    number: '04',
    title: 'Cloud & DevOps',
    desc: 'Scalable cloud infrastructure, CI/CD pipelines, and automated deployments that keep your product always available.',
    stack: ['AWS', 'GCP', 'Kubernetes', 'Terraform'],
  },
  {
    icon: Shield,
    number: '05',
    title: 'Cybersecurity & Compliance',
    desc: 'Security audits, penetration testing, and compliance implementation to protect your data and meet regulatory standards.',
    stack: ['OWASP', 'GDPR', 'ISO 27001', 'SOC 2'],
  },
  {
    icon: BarChart3,
    number: '06',
    title: 'Digital Transformation',
    desc: 'Strategic consulting and technical execution to modernise legacy systems and accelerate your digital roadmap.',
    stack: ['Architecture', 'Migration', 'Integration', 'Training'],
  },
]

const process = [
  { step: '01', title: 'Discovery', desc: 'We map your goals, users, and constraints through structured workshops and stakeholder interviews.' },
  { step: '02', title: 'Architecture', desc: 'We design a scalable technical blueprint aligned to your business trajectory and team capabilities.' },
  { step: '03', title: 'Build', desc: "Agile sprints with weekly demos — you always know what's shipped and what's next." },
  { step: '04', title: 'Launch & Support', desc: 'Smooth deployment, monitoring, and continued iteration so your product keeps improving.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function ServicesPage() {
  return (
    <div data-navtheme="dark" className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pb-24 overflow-hidden px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 pt-48">
        <div className="absolute top-[-60px] right-[-100px] opacity-20 pointer-events-none">
          <Polytope size={500} speed={0.1} opacity={0.4} />
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8"
        >
          What We Do
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.02] tracking-tight text-white mb-10"
        >
          <span className="font-bold">Services</span>{' '}
          <span className="font-extralight text-white/30">Built</span>
          <br />
          <span className="font-extralight text-white/30">For </span>
          <span className="font-bold">Scale.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="max-w-xl text-white/40 text-[14px] leading-relaxed font-light"
        >
          From a single feature to a full platform — we deliver technology solutions
          that are robust, maintainable, and designed to grow with your business.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="border-t border-white/10">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.number}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
              className="group border-b border-white/10 px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 py-14 flex flex-col md:flex-row items-start md:items-center gap-10 hover:bg-white/[0.02] transition-all duration-500 cursor-pointer"
            >
              <span className="text-[11px] text-white/20 font-bold tracking-widest uppercase w-8 shrink-0">{service.number}</span>

              <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/30 group-hover:border-orange-500 group-hover:text-orange-500 transition-all duration-500 shrink-0">
                <Icon size={22} />
              </div>

              <div className="flex-1">
                <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/40 text-[14px] leading-relaxed font-light max-w-2xl">{service.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2 md:w-64 shrink-0">
                {service.stack.map(s => (
                  <span key={s} className="text-[10px] uppercase tracking-wider font-bold text-white/30 border border-white/10 px-3 py-1 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-300">
                    {s}
                  </span>
                ))}
              </div>

              <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/20 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition-all duration-500 shrink-0">
                <ArrowRight size={16} />
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* Process */}
      <section data-navtheme="light" className="bg-white py-32 px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
        >
          Our Process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-black mb-24"
        >
          <span className="font-bold">How We</span>{' '}
          <span className="font-extralight text-black/30">Work.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black/10">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="p-10 border-b md:border-b-0 border-black/10 lg:border-r last:border-r-0 group hover:bg-black transition-all duration-500"
            >
              <span className="text-[11px] text-orange-500 font-bold tracking-widest uppercase block mb-8">{p.step}</span>
              <h4 className="text-[22px] font-bold text-black mb-4 group-hover:text-white transition-colors duration-500">{p.title}</h4>
              <p className="text-black/50 text-[13px] leading-relaxed font-light group-hover:text-white/50 transition-colors duration-500">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-32 px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <Polytope size={400} speed={0.08} opacity={0.3} />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-white mb-10"
        >
          <span className="font-extralight text-white/30">Ready to </span>
          <span className="font-bold">get started?</span>
        </motion.h2>
        <a
          href="/contact"
          className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">Talk to us</span>
          <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
            <ArrowRight size={18} />
          </div>
        </a>
      </section>

    </div>
  )
}
