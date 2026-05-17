import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Facebook, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Team = () => {
    const teamMembers = [
        {
            url: "https://miller.bslthemes.com/ashley-demo/img/faces/1.jpg",
            name: "Anna Oldman",
            role: "Art Director",
            socials: [<Instagram size={14} />, <Facebook size={14} />, <Linkedin size={14} />, <Github size={14} />]
        },
        {
            url: "https://miller.bslthemes.com/ashley-demo/img/faces/2.jpg",
            name: "John Doe",
            role: "Fullstack Developer",
            socials: [<Instagram size={14} />, <Facebook size={14} />, <Linkedin size={14} />, <Github size={14} />]
        },
        {
            url: "https://miller.bslthemes.com/ashley-demo/img/faces/3.jpg",
            name: "Jane Smith",
            role: "UI/UX Designer",
            socials: [<Instagram size={14} />, <Facebook size={14} />, <Linkedin size={14} />, <Github size={14} />]
        },
        {
            url: "https://miller.bslthemes.com/ashley-demo/img/faces/4.jpg",
            name: "Mike Ross",
            role: "Project Manager",
            socials: [<Instagram size={14} />, <Facebook size={14} />, <Linkedin size={14} />, <Github size={14} />]
        }
    ];

    return (
        <section className="relative bg-white py-32 md:py-40 overflow-hidden">
            {/* Background Grid/Circles */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] border border-black rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Left Content */}
                    <div className="space-y-10 max-w-xl">
                        <div className="space-y-6">
                            <motion.h2 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="text-[60px] md:text-[85px] font-bold text-black leading-[1.1]"
                            >
                                Meet <br /> Our Team
                            </motion.h2>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <p className="text-black/50 text-[16px] leading-relaxed font-light">
                                    We are talented individuals who are passionate about bringing ideas to life. With a diverse range of backgrounds and skill sets, we collaborate to produce effective solutions for our clients.
                                </p>
                                <p className="text-black/50 text-[16px] leading-relaxed font-light">
                                    Together, our creative team is committed to delivering impactful work that exceeds expectations.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link to="/our-clients" className="group relative flex items-center gap-7 bg-orange-500 rounded-full pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Read More</span>
                                <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:bg-orange-500">
                                    <ArrowRight size={18} />
                                </div>
                            </Link>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="pt-4 text-[20px] md:text-[24px] text-black/80 font-light max-w-xs"
                        >
                            We <span className="font-bold text-black">delivering</span> exceptional <span className="font-bold text-black">results.</span>
                        </motion.div>
                    </div>

                    {/* Right Image Grid */}
                    <div className="grid grid-cols-2 gap-8 lg:gap-12 items-start relative">
                        {/* Column 1 */}
                        <div className="space-y-8 lg:space-y-12">
                            {[teamMembers[0], teamMembers[1]].map((member, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 + (i * 0.2) }}
                                    className="group relative aspect-[1/1.1] bg-gray-100 overflow-hidden cursor-pointer"
                                >
                                    <img src={member.url} alt={member.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-6 pb-12">
                                        <h3 className="text-white text-[24px] font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{member.name}</h3>
                                        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{member.role}</p>
                                        
                                        <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                            {member.socials.map((icon, idx) => (
                                                <a key={idx} href="/contact" className="text-white hover:text-orange-500 transition-colors">
                                                    {icon}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Orange Line on Hover */}
                                    <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-orange-500 group-hover:w-full transition-all duration-500 z-20" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-8 lg:space-y-12 pt-16 md:pt-24 lg:pt-32">
                            {[teamMembers[2], teamMembers[3]].map((member, i) => (
                                <div key={i} className="relative">
                                    {i === 0 && (
                                        <div className="absolute -top-10 left-0 text-[12px] tracking-[0.05em] text-black/40 flex items-center gap-2 z-10 w-max">
                                            <span className="text-orange-500 font-bold text-[18px] leading-none transition-transform duration-500 group-hover:rotate-45">*</span> The founders of our agency
                                        </div>
                                    )}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 + (i * 0.2) }}
                                        className="group relative aspect-[1/1.1] bg-gray-100 overflow-hidden cursor-pointer"
                                    >
                                        <img src={member.url} alt={member.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-6 pb-12">
                                            <h3 className="text-white text-[24px] font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{member.name}</h3>
                                            <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{member.role}</p>
                                            
                                            <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                                {member.socials.map((icon, idx) => (
                                                    <div key={idx} className="text-white hover:text-orange-500 transition-colors">
                                                        {icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom Orange Line on Hover */}
                                        <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-orange-500 group-hover:w-full transition-all duration-500 z-20" />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Team;
