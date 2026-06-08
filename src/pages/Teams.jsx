import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Github, Globe, ArrowRight } from 'lucide-react'
import Polytope from '@components/Polytope/Polytope'

const teamMembers = [
  {
    url: "/teams/Sharan1.jpg",
    name: "Sharan M Neeli",
    role: "Founder & CEO",
    bio: "Visionary leader driving business strategy, client partnerships, and technological expansion at SystemMindz.",
    socials: [
      { icon: <Instagram size={16} />, url: "https://www.instagram.com/sharan._09/" },
      { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/sharanm09/" },
      { icon: <Globe size={16} />, url: "https://sharan.systemmindz.com/" }
    ],
    objectPosition: "center 20%",
    scale: 1.15
  },
  {
    url: "/teams/Mallikarjun.png",
    name: "Mallikarjun Danduba",
    role: "Co-Founder & COO",
    bio: "Operations master coordinating engineering execution, project delivery pipelines, and resource management.",
    socials: [
      { icon: <Instagram size={16} />, url: "https://www.instagram.com/mallikarjun_danduba" },
      { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/mallikarjuna2002/" },
      { icon: <Globe size={16} />, url: "https://mallikarjundanduba.netlify.app/" }
    ]
  },
  {
    url: "/teams/Vidya.png",
    name: "Vidya Manjunath",
    role: "Full Stack Developer",
    bio: "Skilled engineer developing scalable client dashboards, database schemas, and responsive user interfaces.",
    socials: [
      { icon: <Instagram size={16} />, url: "https://www.instagram.com/vid_yamanjunath/" },
      { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/vidya-manjunath/" },
      { icon: <Github size={16} />, url: "https://github.com/VidyaManjunath-17" }
    ],
    objectPosition: "center -10%",
    scale: 1.4
  },
  {
    url: "https://miller.bslthemes.com/ashley-demo/img/faces/4.jpg",
    name: "Mike Ross",
    role: "Project Manager",
    bio: "Client success manager handling Agile sprints, scoping sessions, and timeline verification across projects.",
    socials: [
      { icon: <Instagram size={16} />, url: "https://instagram.com" },
      { icon: <Linkedin size={16} />, url: "https://linkedin.com" },
      { icon: <Github size={16} />, url: "https://github.com" }
    ]
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] } }),
}

export default function Teams() {
  return (
    <div data-navtheme="dark" className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-36 pb-20">
        <div className="absolute top-[-40px] right-[-80px] opacity-20 pointer-events-none">
          <Polytope size={500} speed={0.09} opacity={0.4} />
        </div>
        <div className="absolute bottom-[-80px] left-[30%] opacity-10 pointer-events-none">
          <Polytope size={300} speed={0.06} opacity={0.3} />
        </div>

        <div className="w-full relative z-10 flex justify-center px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <div className="w-full max-w-5xl">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-8"
            >
              Our Company
            </motion.p>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="text-[55px] md:text-[90px] lg:text-[110px] leading-[1.02] tracking-tight text-white mb-10"
            >
              <span className="font-bold">Meet Our</span>
              <br />
              <span className="font-extralight text-white/30">Creative</span>{' '}
              <span className="font-bold">Team.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="max-w-xl text-white/40 text-[14px] leading-relaxed font-light"
            >
              We are a team of passionate engineers, designers, and managers based in Bengaluru.
              Combining technical precision with product expertise, we bring your digital projects to life.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Showcase Grid */}
      <section data-navtheme="light" className="bg-white py-24 sm:py-32">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
          >
            Creative Brains
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[40px] md:text-[60px] leading-[1.05] tracking-tight text-black mb-20"
          >
            <span className="font-bold">People Who</span>{' '}
            <span className="font-extralight text-black/30">Make It Happen.</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex flex-col"
              >
                {/* Profile Photo Wrapper */}
                <div className="group relative aspect-[1/1.1] bg-gray-100 overflow-hidden mb-6 cursor-pointer">
                  <img
                    src={member.url}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 [transform:scale(var(--img-scale,1))] group-hover:[--img-scale:var(--hover-scale,1.1)]"
                    style={{
                      objectPosition: member.objectPosition || 'center',
                      '--img-scale': member.scale || 1,
                      '--hover-scale': (member.scale || 1) * 1.1
                    }}
                  />

                  {/* Social links hover overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-6">
                    <div className="flex gap-4">
                      {member.socials.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-orange-500 hover:border-orange-500 transition-all duration-300"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-orange-500 group-hover:w-full transition-all duration-500 z-20" />
                </div>

                {/* Profile Details */}
                <h3 className="text-black font-bold text-[20px] mb-1">{member.name}</h3>
                <p className="text-orange-500 text-[11px] uppercase tracking-widest font-bold mb-4">{member.role}</p>
                <p className="text-black/50 text-[13px] font-light leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-navtheme="light" className="bg-white py-32 px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-black/5">
        <div className="absolute bottom-0 right-0 opacity-[0.04] pointer-events-none">
          <Polytope size={400} speed={0.08} opacity={0.3} />
        </div>
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-black mb-10 text-center"
          >
            <span className="font-bold">Ready to build</span>
            <br />
            <span className="font-extralight text-black/30 italic">something together?</span>
          </motion.h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-black transition-all duration-500"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">Get in touch</span>
            <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </section>

    </div>
  )
}
