import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import videoBg from '../video/155718-810722623.mp4';

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden font-outfit bg-black text-white">

            {/* Background Video */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                >
                    <source src={videoBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Dark Overlay/Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 z-10" />
            </div>

            {/* Main Content Container - Decentralized Layout */}
            <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 pt-24 md:pt-32">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start w-full relative">
                    {/* Top-Left: Massive Heading */}
                    <motion.div
                        className="flex flex-col z-20 mt-8 md:mt-16"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-abril leading-[1.0] tracking-wide text-white uppercase">
                            SYSTEM <br />
                            <span className="text-white">MINDZ</span>
                        </h1>
                    </motion.div>

                    {/* Middle-Right: Description (Positioned absolutely on desktop to match reference) */}
                    <motion.div
                        className="mt-8 md:mt-0 md:absolute md:top-[40vh] md:right-0 max-w-sm md:max-w-md text-left z-20"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: "circOut" }}
                    >
                        <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed font-outfit border-l-2 border-[#4B54F8] pl-6">
                            We deliver end-to-end application development, transforming ideas into scalable, high-performance solutions through Agile full-stack engineering.
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-0">

                    {/* Bottom-Left: Tagline/Action */}
                    <motion.div
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
                    >
                        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/50 hidden md:block mb-4" />
                        <div className="flex items-center gap-4">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20"
                            >
                                <ArrowDown size={16} />
                            </motion.div>
                            <span className="text-sm font-space tracking-[0.2em] text-gray-400 uppercase">
                                Your Vision. Our Code. Real Results.
                            </span>
                        </div>
                    </motion.div>

                    {/* Bottom-Right: Service Tags */}
                    <motion.div
                        className="flex flex-wrap justify-start md:justify-end gap-3 max-w-xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.6
                                }
                            }
                        }}
                    >
                        {['Web Development', 'Mobile Apps', 'AI Solutions', 'Cloud Infrastructure'].map((tag, index) => (
                            <motion.span
                                key={tag}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.5, y: 20 },
                                    visible: { opacity: 1, scale: 1, y: 0 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-xs md:text-sm text-gray-300 font-outfit transition-colors whitespace-nowrap"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
