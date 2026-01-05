
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SystemFlowAnimation = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-purple-900/20 blur-[100px] rounded-full" />

            {/* Central Core */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.5)] z-10 relative"
            >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center border border-white/10">
                    <span className="text-2xl md:text-3xl">⚡</span>
                </div>
            </motion.div>

            {/* Orbiting Satellites */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                    style={{ width: `${200 + i * 80}px`, height: `${200 + i * 80}px` }}
                >
                    <motion.div
                        className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 shadow-[0_0_15px_white]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <div className="w-full h-full rounded-full border border-white/5" />
                </motion.div>
            ))}

            {/* Connecting Data Particles */}
            {[0, 1, 2, 3].map((i) => {
                const angle = (i * 90) * (Math.PI / 180);
                const x = Math.cos(angle) * 100;
                const y = Math.sin(angle) * 100;
                return (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                        initial={{ x: 0, y: 0, opacity: 0 }}
                        animate={{
                            x: [0, x],
                            y: [0, y],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut"
                        }}
                    />
                );
            })}
        </div>
    );
};

const ChatDemoSection = () => {
    return (
        <section className="bg-black py-12 md:py-20 px-5 flex items-center justify-center min-h-screen">
            <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-8 md:gap-[clamp(20px,5vw,60px)] items-center px-4 md:px-[6vw]">
                {/* Left Column - Text and Buttons */}
                <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
                    <p className="text-xs sm:text-sm font-semibold text-[#4B54F8] uppercase tracking-widest mb-4 md:mb-6 font-montserrat">DIGITAL TRANSFORMATION SOLUTIONS</p>
                    <h1 className="text-[clamp(24px,5vw,48px)] font-bold text-white leading-[1.2] mb-6 md:mb-8 font-oswald">
                        Build <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-blue-500">Scalable</span> Solutions That Drive Growth
                    </h1>
                    <p className="text-sm md:text-base text-gray-400 leading-[1.6] mb-6 md:mb-8 font-montserrat font-normal max-w-[540px] mx-auto lg:mx-0">
                        From concept to deployment, we deliver enterprise-grade applications using cutting-edge technologies. Our full-stack expertise in React.js, Spring Boot, and Python enables us to create robust, future-ready platforms that scale with your business. We combine technical excellence with innovative thinking to transform your business challenges into powerful digital solutions.
                    </p>
                    <div className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
                        <button
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-white text-black border-none py-3 px-6 md:py-3.5 md:px-7 rounded-full text-sm md:text-base font-semibold cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-[0_4px_6px_rgba(255,255,255,0.1)] font-montserrat hover:translate-y-[-2px] hover:shadow-[0_8px_15px_rgba(255,255,255,0.2)] group w-auto justify-center"
                        >
                            Get Started
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">→</span>
                            </span>
                        </button>
                    </div>
                </div>


                <div className="col-span-12 lg:col-span-6 mt-8 lg:mt-0">
                    <SystemFlowAnimation />
                </div>
            </div>
        </section>
    );
};

export default ChatDemoSection;
