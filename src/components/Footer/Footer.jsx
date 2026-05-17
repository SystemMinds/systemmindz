import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Dribbble, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer data-navtheme="dark" className="relative bg-black text-white pt-32 pb-20 overflow-hidden">

            <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32">

                    {/* Brand & Newsletter Section (Span 4) */}
                    <div className="lg:col-span-4 space-y-12">
                        <h2 className="text-[40px] font-bold tracking-tight">SystemMindz</h2>
                        <div className="space-y-6">
                            <p className="text-[13px] text-white/40 font-light">Subscribe our newsletter:</p>
                            <div className="relative max-w-sm">
                                <input
                                    type="email"
                                    placeholder="ENTER YOUR EMAIL"
                                    className="w-full bg-white/5 border-none rounded-full py-4 pl-8 pr-16 text-[12px] tracking-widest focus:ring-1 focus:ring-orange-500 transition-all outline-none"
                                />
                                <button className="absolute right-1.5 top-1.5 w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-500">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Section (Span 4) */}
                    <div className="lg:col-span-4 lg:pl-12">
                        <ul className="space-y-4">
                            <li><Link to="/"            className="text-[22px] md:text-[26px] font-bold text-orange-500 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/portfolio"   className="text-[22px] md:text-[26px] font-bold text-white hover:text-orange-500 transition-colors">Portfolio</Link></li>
                            <li><Link to="/services"    className="text-[22px] md:text-[26px] font-bold text-white hover:text-orange-500 transition-colors">Services</Link></li>
                            <li><Link to="/projects"    className="text-[22px] md:text-[26px] font-bold text-white hover:text-orange-500 transition-colors">Projects</Link></li>
                            <li><Link to="/our-clients" className="text-[22px] md:text-[26px] font-bold text-white hover:text-orange-500 transition-colors">Our Clients</Link></li>
                            <li><Link to="/contact"     className="text-[22px] md:text-[26px] font-bold text-white hover:text-orange-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Policy Section (Span 4) */}
                    <div className="lg:col-span-4">
                        <ul className="space-y-4 text-[14px] text-white/40 font-light pt-4 leading-relaxed">
                            <li><Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Terms and conditions</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Info Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 pt-12 border-t border-white/5">
                    {/* Socials & Copyright (Span 4) */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="flex items-center gap-6 text-white/40">
                            <a href="https://systemmindz.com"   target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe size={18} /></a>
                            <a href="https://dribbble.com"      target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Dribbble size={18} /></a>
                            <a href="https://twitter.com"       target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter size={18} /></a>
                            <a href="https://github.com"        target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={18} /></a>
                        </div>
                        <p className="text-[11px] text-white/20 tracking-widest uppercase">
                            © Copyright 2025 - SystemMindz. <br className="hidden md:block" /> All Rights Reserved.
                        </p>
                    </div>

                    {/* India (Span 4) */}
                    <div className="lg:col-span-4 lg:pl-12 space-y-6">
                        <h4 className="text-[14px] font-bold uppercase tracking-widest">India</h4>
                        <p className="text-[13px] text-white/40 leading-loose font-light">
                            Bengaluru, Karnataka, India<br />
                            +91 98765 43210
                        </p>
                    </div>

                    {/* Contact (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-[14px] font-bold uppercase tracking-widest">Get In Touch</h4>
                        <p className="text-[13px] text-white/40 leading-loose font-light">
                            hello@systemmindz.com<br />
                            india@systemmindz.com
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
