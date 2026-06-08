import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Brain, Smartphone, Cloud, Shield, BarChart3 } from 'lucide-react'
import Polytope from '@components/Polytope/Polytope'

const allSkills = [
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    size: "large",
    color: "#FF6C37",
  },
  {
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/000000",
    size: "small",
    color: "#000000",
  },
  {
    name: "Framer",
    icon: "https://cdn.simpleicons.org/framer/0055FF",
    size: "small",
    color: "#0055FF",
  },
  {
    name: "Jira",
    icon: "https://cdn.simpleicons.org/jira/0052CC",
    size: "small",
    color: "#0052CC",
  },
  {
    name: "ChatGPT",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    size: "small",
    color: "#000000",
  },
  {
    name: "Google Meet",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg",
    size: "small",
    color: "#00897B",
  },
  {
    name: "Zoho Mail",
    icon: "https://www.vectorlogo.zone/logos/zoho/zoho-icon.svg",
    size: "small",
    color: "#E2231A",
  },
  {
    name: "Google Calendar",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    size: "small",
    color: "#4285F4",
  },
  {
    name: "Slack",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg",
    size: "small",
    color: "#4A154B",
  },
  {
    name: "React JS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    size: "small",
    color: "#61DAFB",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    size: "small",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    size: "small",
    color: "#1572B6",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    size: "small",
    color: "#06B6D4",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    size: "small",
    color: "#7952B3",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    size: "small",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    size: "small",
    color: "#3178C6",
  },
  {
    name: "Node JS",
    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
    size: "small",
    color: "#339933",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    size: "small",
    color: "#4479A1",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    size: "small",
    color: "#4169E1",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    size: "small",
    color: "#47A248",
  },
  {
    name: "Redis",
    icon: "https://cdn.simpleicons.org/redis/DC382D",
    size: "small",
    color: "#DC382D",
  },
  {
    name: "Claude AI",
    icon: "https://cdn.simpleicons.org/claude/D97757",
    size: "small",
    color: "#D97757",
  },
  {
    name: "REST API",
    icon: "https://cdn.simpleicons.org/swagger/85EA2D",
    size: "small",
    color: "#85EA2D",
  },
  {
    name: "Redux",
    icon: "https://cdn.simpleicons.org/redux/764ABC",
    size: "small",
    color: "#764ABC",
  },
  {
    name: "AssemblyAI",
    icon: "https://cdn.simpleicons.org/assemblyscript/007AAC",
    size: "small",
    color: "#007AAC",
  },
  {
    name: "Deepgram",
    icon: "/images/skills/deepgram-icon.svg",
    size: "small",
    color: "#000000",
  },
  {
    name: "Cursor AI",
    icon: "https://www.cursor.com/assets/images/logo.svg",
    size: "large",
    color: "#1E1E1F",
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/F24E1E",
    size: "small",
    color: "#F24E1E",
  },
  {
    name: "Groq",
    icon: "/images/skills/groq-icon.svg",
    size: "small",
    color: "#FE4300",
  },
  {
    name: "RESTful APIs",
    icon: "https://cdn.simpleicons.org/openapiinitiative/6B509F",
    size: "small",
    color: "#FE4300",
  },
  {
    name: "WebSockets",
    icon: "https://cdn.simpleicons.org/socketdotio/010101",
    size: "small",
    color: "#010101",
  },
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032",
    size: "small",
    color: "#F05032",
  },
  {
    name: "Vite",
    icon: "https://cdn.simpleicons.org/vite/646CFF",
    size: "small",
    color: "#646CFF",
  },
  {
    name: "LinkedIn",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
    size: "small",
    color: "#0077B5",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    size: "large",
    color: "#ED8B00",
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    size: "large",
    color: "#6DB33F",
  },
  {
    name: "Spring Security",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    size: "small",
    color: "#6DB33F",
  },
  {
    name: "Gemini AI",
    icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg",
    size: "small",
    color: "#8E75FF",
  },
  {
    name: "JPA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    size: "small",
    color: "#59666C",
  },
  {
    name: "Hibernate",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg",
    size: "small",
    color: "#59666C",
  },
  {
    name: "JUnit",
    icon: "https://cdn.simpleicons.org/junit5/25A190",
    size: "small",
    color: "#25A190",
  },
  {
    name: "Spring Cloud",
    icon: "https://cdn.simpleicons.org/spring/6DB33F",
    size: "small",
    color: "#6DB33F",
  },
  {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    size: "small",
    color: "#3776AB",
  },
  {
    name: "JWT",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/jwt-io.png",
    size: "small",
    color: "#000000",
  },
  {
    name: "Google Alerts",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/google-alerts.png",
    size: "small",
    color: "#4285F4",
  },
  {
    name: "npm",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/npm.png",
    size: "small",
    color: "#CB3837",
  },
  {
    name: "Spring MVC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    size: "small",
    color: "#6DB33F",
  },
  {
    name: "Naukri",
    icon: "https://www.google.com/s2/favicons?domain=naukri.com&sz=128",
    size: "small",
    color: "#004899",
  },
  {
    name: "JSON",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/json.png",
    size: "small",
    color: "#000000",
  },
  {
    name: "Docker",
    icon: "https://cdn.simpleicons.org/docker/2496ED",
    size: "large",
    color: "#2496ED",
  },
  {
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github/181717",
    size: "large",
    color: "#181717",
  },
  {
    name: "Google GCP",
    icon: "https://cdn.simpleicons.org/googlecloud/4285F4",
    size: "large",
    color: "#4285F4",
  },
  {
    name: "Linux",
    icon: "https://cdn.simpleicons.org/linux/FCC624",
    size: "small",
    color: "#FCC624",
  },
  {
    name: "Kubernetes",
    icon: "https://cdn.simpleicons.org/kubernetes/326CE5",
    size: "small",
    color: "#326CE5",
  },
  {
    name: "Render",
    icon: "https://cdn.simpleicons.org/render/46E3B7",
    size: "small",
    color: "#46E3B7",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/sqlitebrowser.png",
    size: "small",
    color: "#003B57",
  },
  {
    name: "Sass",
    icon: "https://cdn.simpleicons.org/sass/CC6699",
    size: "small",
    color: "#CC6699",
  },
  {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/000000",
    size: "small",
    color: "#000000",
  },
  {
    name: "Netlify",
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/netlify.png",
    size: "small",
    color: "#00C8C8",
  },
  {
    name: "pnpm",
    icon: "https://cdn.simpleicons.org/pnpm/F69220",
    size: "small",
    color: "#F69220",
  },
  {
    name: "Babel",
    icon: "https://cdn.simpleicons.org/babel/F9DC3E",
    size: "small",
    color: "#F9DC3E",
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
      <section className="relative min-h-screen flex flex-col justify-end pb-24 overflow-hidden px-8 sm:px-12 md:px-20 lg:pl-64 xl:pl-72 pt-48">
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

      {/* Tools & Technologies Bento Grid */}
      <section data-navtheme="light" className="bg-[#F5F5F7] py-20 sm:py-24 border-t border-black/10">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-black mb-20 md:mb-24"
          >
            <span className="font-bold">Services We</span>{' '}
            <span className="font-extralight text-black/30">Provide.</span>
          </motion.h2>

          <div className="grid grid-cols-7 gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-4 w-full">
            {allSkills.map((skill, index) => {
              const isFirstLargeCard = index === 0;
              const isCursorAI = index === 26;
              const isJava = index === 34;
              const isSpringBoot = index === 35;
              const isDocker = index === 49;
              const isGitHub = index === 50;
              const isGCP = index === 51;

              const isLarge = isFirstLargeCard || isCursorAI || isJava || isSpringBoot || isDocker || isGitHub || isGCP;

              let spanClass = "col-span-1 row-span-1 aspect-square";
              if (isFirstLargeCard || isCursorAI) {
                spanClass = "col-span-4 row-span-3 aspect-[4/3]";
              } else if (isJava || isSpringBoot || isDocker || isGitHub || isGCP) {
                spanClass = "col-span-2 row-span-2 aspect-square";
              }

              return (
                <div
                  key={`skill-${skill.name}-${index}`}
                  className={`group flex flex-col items-center justify-center bg-white border border-neutral-200/60 shadow-[0_6px_20px_rgba(0,0,0,0.01)] transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.07)] cursor-pointer overflow-hidden ${spanClass} ${
                    isLarge
                      ? "rounded-[6px] xs:rounded-[8px] sm:rounded-[16px] md:rounded-[24px] lg:rounded-[36px] p-1 xs:p-2 sm:p-4 md:p-6 lg:p-8"
                      : "rounded-[3px] xs:rounded-[4px] sm:rounded-[8px] md:rounded-[14px] lg:rounded-[22px] p-0.5 xs:p-1 sm:p-2 md:p-3 lg:p-4"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full text-center">
                    <div
                      className={`flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105 ${
                        isFirstLargeCard || isCursorAI
                          ? "w-9 h-9 xs:w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
                          : isJava || isSpringBoot || isDocker || isGitHub || isGCP
                          ? "w-6 h-6 xs:w-10 h-10 sm:w-12 sm:h-12 md:w-18 md:h-18 lg:w-20 lg:h-20"
                          : "w-4 h-4 xs:w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                      />
                    </div>
                    <span
                      className={`text-neutral-800 font-bold tracking-wide transition-colors duration-300 ${
                        isFirstLargeCard || isCursorAI
                          ? "mt-0.5 xs:mt-1 sm:mt-4 text-[7px] xs:text-[9px] sm:text-xs md:text-sm lg:text-base font-extrabold"
                          : isJava || isSpringBoot || isDocker || isGitHub || isGCP
                          ? "mt-0.5 xs:mt-1 sm:mt-3 text-[6px] xs:text-[8px] sm:text-xs md:text-sm lg:text-sm font-extrabold"
                          : "mt-0.5 xs:mt-1 sm:mt-2 text-[5px] xs:text-[7px] sm:text-[9px] md:text-xs leading-none truncate max-w-full px-0.5"
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section data-navtheme="dark" className="bg-black py-32">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-orange-500 font-bold mb-6"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[40px] md:text-[70px] leading-[1.05] tracking-tight text-white mb-24"
          >
            <span className="font-bold">How We</span>{' '}
            <span className="font-extralight text-white/30">Work.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="p-10 border-b md:border-b-0 border-white/10 lg:border-r last:border-r-0 group hover:bg-white transition-all duration-500"
              >
                <span className="text-[11px] text-orange-500 font-bold tracking-widest uppercase block mb-8">{p.step}</span>
                <h4 className="text-[22px] font-bold text-white mb-4 group-hover:text-black transition-colors duration-500">{p.title}</h4>
                <p className="text-white/50 text-[13px] leading-relaxed font-light group-hover:text-black/50 transition-colors duration-500">{p.desc}</p>
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
            <span className="font-extralight text-black/30">Ready to </span>
            <span className="font-bold">get started?</span>
          </motion.h2>
          <a
            href="/contact"
            className="group inline-flex items-center gap-6 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-black transition-all duration-500"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">Talk to us</span>
            <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
              <ArrowRight size={18} />
            </div>
          </a>
        </div>
      </section>

    </div>
  )
}
