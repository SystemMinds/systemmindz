import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Layers, Zap, Shield, Users, Globe, Award, Clock, Server, Smartphone, Cloud } from 'lucide-react'
import { Link } from 'react-router-dom'
import Polytope from '@components/Polytope/Polytope'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }
  }),
}

const stats = [
  { value: '18+',  label: 'Projects Delivered',    icon: <Layers size={20} /> },
  { value: '1+',   label: 'Year of Excellence',     icon: <Clock size={20} /> },
  { value: '100%', label: 'Client Satisfaction',    icon: <Award size={20} /> },
  { value: '10+',  label: 'Technologies Mastered',  icon: <Code2 size={20} /> },
]

const values = [
  {
    number: '01',
    title: 'Engineering First',
    desc: 'We lead with clean architecture, scalable code, and industry-standard practices. Every line we write is built to last.',
    icon: <Code2 size={24} />,
  },
  {
    number: '02',
    title: 'Client Partnership',
    desc: 'We treat every project as a long-term partnership. Your success is our success — from kick-off to post-launch support.',
    icon: <Users size={24} />,
  },
  {
    number: '03',
    title: 'Speed & Quality',
    desc: 'Agile methodology lets us move fast without cutting corners. We deliver working software in weeks, not months.',
    icon: <Zap size={24} />,
  },
  {
    number: '04',
    title: 'Security by Design',
    desc: 'Security is never an afterthought. We embed best practices — encryption, compliance, and testing — from day one.',
    icon: <Shield size={24} />,
  },
]

const techStack = [
  { category: 'Frontend',  number: '01', icon: <Code2 size={24} />, items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend',   number: '02', icon: <Server size={24} />, items: ['Spring Boot', 'Node.js', 'Python', 'REST / GraphQL'] },
  { category: 'Mobile',    number: '03', icon: <Smartphone size={24} />, items: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { category: 'Cloud & AI',number: '04', icon: <Cloud size={24} />, items: ['AWS', 'Azure', 'OpenAI', 'TensorFlow'] },
]

const timeline = [
  { year: '2025', title: 'Founded', desc: 'SystemMindz was born with a single mission — build technology that actually solves business problems.' },
  { year: '2025', title: 'KareerGrowth Launched', desc: 'Got a new product KareerGrowth launched for our company, introducing intelligent talent development solutions.' },
  { year: '2026', title: 'First Enterprise Client', desc: 'Delivered a full-stack CRM platform for our first enterprise client within 3 months.' },
  { year: '2026', title: 'Team Expansion', desc: 'Grew to a cross-functional team of engineers, designers, and product strategists to support our growing operations.' },
]

export default function AboutUs() {
  return (
    <div className="bg-black">

      {/* ── Hero ── */}
      <section data-navtheme="dark" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-32 pb-20">
        <div className="absolute top-[-80px] right-[-60px] opacity-20 pointer-events-none">
          <Polytope size={480} speed={0.1} opacity={0.4} />
        </div>
        <div className="absolute bottom-0 left-[10%] opacity-10 pointer-events-none">
          <Polytope size={280} speed={0.08} opacity={0.3} />
        </div>

        <div className="max-w-5xl mx-auto w-full">
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6">
          Who We Are
        </motion.p>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-[38px] sm:text-[52px] md:text-[66px] lg:text-[80px] xl:text-[88px] leading-[1.05] tracking-tight text-white mb-8">
          <span className="block whitespace-nowrap">
            <span className="font-bold">We Build</span>{' '}
            <span className="font-extralight text-white/30">Digital Products</span>
          </span>
          <span className="block whitespace-nowrap">
            <span className="font-extralight text-white/30">That</span>{' '}
            <span className="font-bold">Matter.</span>
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="max-w-lg text-white/40 text-[14px] sm:text-[15px] leading-relaxed font-light mb-12">
          SystemMindz is a technology company headquartered in Bengaluru, India.
          We specialise in engineering enterprise-grade digital solutions — from AI-powered platforms
          to full-stack web and mobile applications — that drive real, measurable growth.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <Link to="/contact"
            className="group inline-flex items-center gap-5 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Work With Us</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45">
              <ArrowRight size={17} />
            </div>
          </Link>
        </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section data-navtheme="light" className="bg-white min-h-screen flex flex-col justify-center py-20 sm:py-24">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full flex flex-col gap-16">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
                className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-4">
                Our Impact
              </motion.p>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="text-[36px] sm:text-[48px] md:text-[58px] font-bold text-black leading-[1.1] tracking-tight">
                Numbers That<br />
                <span className="font-extralight text-black/30 italic">Define Us.</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
              className="max-w-sm text-black/40 text-[13px] sm:text-[14px] leading-relaxed font-light">
              Since 2025, we&apos;ve been turning ambitious ideas into production-grade digital products. Every number here represents a real project, a real team, and a real outcome.
            </motion.p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-black/10">
            {stats.map((s, i) => (
              <motion.div key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.1}
                className={`flex flex-col gap-4 p-8 sm:p-10 md:p-12 border-black/10
                  ${i < 3 ? 'border-r' : ''}
                  ${i < 2 ? 'border-b lg:border-b-0' : ''}`}>
                <div className="text-orange-500">{s.icon}</div>
                <h3 className="text-[44px] sm:text-[52px] md:text-[60px] font-bold text-black leading-none">{s.value}</h3>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/40">{s.label}</p>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* ── Our Story ── */}
      <section data-navtheme="dark" className="bg-black min-h-screen flex flex-col justify-center py-20 sm:py-24">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left */}
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
                className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6">
                Our Story
              </motion.p>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="text-[36px] sm:text-[48px] md:text-[58px] font-bold text-white leading-[1.1] tracking-tight mb-8">
                Built by engineers,<br />
                <span className="font-extralight text-white/30 italic">for ambitious ideas.</span>
              </motion.h2>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
                className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed font-light mb-6">
                SystemMindz was founded in 2025 with a straightforward belief: great software changes businesses.
                We started as a small team of full-stack engineers tired of seeing companies settle for mediocre digital products.
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={3}
                className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed font-light">
                Today, we partner with startups and enterprises across industries — from FinTech and HealthTech
                to EdTech and Logistics — delivering solutions that are scalable, secure, and built to evolve.
              </motion.p>
            </div>

            {/* Right — Timeline */}
            <div className="flex flex-col gap-0 border-l border-white/10 pl-8 sm:pl-10">
              {timeline.map((item, i) => (
                <motion.div key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.15}
                  className="relative pb-10 last:pb-0">
                  <div className="absolute -left-[41px] sm:-left-[43px] top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-black" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-500 mb-2 block">{item.year}</span>
                  <h4 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/35 text-[13px] sm:text-[14px] leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section data-navtheme="light" className="bg-white min-h-screen flex flex-col justify-center py-20 sm:py-24">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
                className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-4">
                What We Stand For
              </motion.p>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="text-[36px] sm:text-[48px] md:text-[56px] font-bold text-black leading-[1.1] tracking-tight">
                Our Core<br />
                <span className="font-extralight text-black/30 italic">Values.</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
              className="max-w-sm text-black/40 text-[13px] sm:text-[14px] leading-relaxed font-light">
              These principles guide every decision we make — from how we architect systems to how we communicate with clients.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-black/10">
            {values.map((v, i) => (
              <motion.div key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.12}
                className={`group p-8 sm:p-10 border-black/10 transition-all duration-500 hover:bg-black cursor-default hover:shadow-2xl hover:z-10 overflow-hidden
                  ${i < 3 ? 'border-b' : ''}
                  ${i % 2 === 0 ? 'sm:border-r' : 'sm:border-r-0'}
                  ${i < 2 ? 'sm:border-b' : 'sm:border-b-0'}
                  ${i < 3 ? 'lg:border-r' : 'lg:border-r-0'}
                  lg:border-b-0`}>
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.05] origin-center flex flex-col gap-6 w-full h-full">
                  <div className="flex items-start justify-between">
                    <div className="text-orange-500">{v.icon}</div>
                    <span className="text-[11px] font-bold text-orange-500 tracking-widest">{v.number}</span>
                  </div>
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-black group-hover:text-white transition-colors duration-500 leading-tight">{v.title}</h4>
                  <p className="text-[13px] text-black/50 group-hover:text-white/40 transition-colors duration-500 leading-relaxed font-light">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section data-navtheme="dark" className="bg-[#0a0a0a] min-h-screen flex flex-col justify-center py-20 sm:py-24">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-4">
                Technology
              </motion.p>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="text-[32px] sm:text-[44px] md:text-[52px] font-bold text-white leading-tight tracking-tight">
                Our Tech Stack
              </motion.h2>
            </div>
            <Globe size={36} className="text-white/10 shrink-0 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/[0.08]">
            {techStack.map((col, i) => (
              <motion.div key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.1}
                className={`group p-8 sm:p-10 border-white/[0.08] transition-all duration-500 hover:bg-white/[0.03] cursor-default hover:shadow-2xl hover:z-10 overflow-hidden
                  ${i < 3 ? 'border-b' : ''}
                  ${i % 2 === 0 ? 'sm:border-r' : 'sm:border-r-0'}
                  ${i < 2 ? 'sm:border-b' : 'sm:border-b-0'}
                  ${i < 3 ? 'lg:border-r' : 'lg:border-r-0'}
                  lg:border-b-0`}>
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.05] origin-center flex flex-col w-full h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-orange-500">{col.icon}</div>
                    <span className="text-[11px] font-bold text-orange-500 tracking-widest">{col.number}</span>
                  </div>
                  <h4 className="text-[15px] sm:text-[17px] font-bold text-white mb-6 uppercase tracking-[0.2em]">{col.category}</h4>
                  <ul className="space-y-3">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[14px] font-light text-white/50 hover:text-white transition-colors duration-200">
                        <span className="w-1 h-1 rounded-full bg-orange-500/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section data-navtheme="light" className="bg-white min-h-screen flex flex-col justify-between px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-20 sm:py-24">
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col flex-1 gap-16">

          {/* Top label */}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold">
            Let's Collaborate
          </motion.p>

          {/* Heading */}
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[36px] sm:text-[52px] md:text-[72px] lg:text-[86px] leading-[1.05] tracking-tight text-black max-w-5xl">
            <span className="font-bold">Ready to build</span><br />
            <span className="font-extralight text-black/30 italic">something extraordinary?</span>
          </motion.h2>

          {/* Mid — value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-black/10 pt-12">
            {[
              { num: '01', title: 'Free Discovery Call', desc: 'We start with a 30-minute scoping session — no commitment, no cost. Just honest technical advice.' },
              { num: '02', title: 'Proposal in 48 hrs', desc: 'After the call you get a detailed scope, timeline and fixed-price quote within two business days.' },
              { num: '03', title: 'Kick-off in a Week', desc: 'Once aligned, we set up the workspace, assign the team, and begin Sprint 1 within 5 business days.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}>
                <span className="text-[11px] font-bold text-black/15 tracking-widest block mb-3">{item.num}</span>
                <h4 className="text-[17px] font-bold text-black mb-2">{item.title}</h4>
                <p className="text-[13px] text-black/45 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4">
            <Link to="/contact"
              className="group inline-flex items-center gap-5 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-black transition-all duration-500">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">Start a Project</span>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                <ArrowRight size={17} />
              </div>
            </Link>
            <Link to="/services"
              className="group inline-flex items-center gap-5 border border-black/20 rounded-full pl-7 pr-1.5 py-1.5 hover:border-black transition-all duration-500">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Our Services</span>
              <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:rotate-45">
                <ArrowRight size={17} />
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

    </div>
  )
}
