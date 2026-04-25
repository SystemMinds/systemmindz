import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="relative min-h-screen bg-white py-32 overflow-hidden">
            {/* Background Decoration Circles - Matching the reference image style */}
            <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] border border-black/5 rounded-full pointer-events-none" />
            <div className="absolute top-[40%] left-[-150px] w-[600px] h-[600px] border border-black/5 rounded-full pointer-events-none" />

            {/* Side Label removed to avoid duplication */}

            <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 flex flex-col lg:flex-row items-center gap-32">

                {/* Left Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Header with Discover Our Studio styling */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-3"
                    >
                        <h2 className="text-[45px] md:text-[60px] lg:text-[70px] leading-[1.1] tracking-tight text-black mb-12">
                            <span className="font-bold">Digital Transformation</span><br />
                            <span className="font-extralight text-black/40 italic">Solutions</span>
                        </h2>

                        <h3 className="text-[20px] font-bold text-black inline-block mt-16">
                            Build Scalable Solutions that Drive Growth
                        </h3>
                    </motion.div>

                    {/* Description Paragraphs */}
                    <div className="max-w-2xl -mt-1">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="text-[15px] md:text-[16px] text-black/60 leading-relaxed font-light mt-1"
                        >
                            From concept to deployment, we deliver enterprise-grade applications using cutting-edge technologies. Our full-stack expertise in React.js, Spring Boot, Python, and AI enables us to create robust, future-ready platforms that scale with your business. We combine technical excellence with innovative thinking to transform your business challenges into powerful digital solutions.
                        </motion.p>
                    </div>

                    {/* Results / Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="grid grid-cols-2 gap-12 pt-10"
                    >
                        <div className="space-y-2">
                            <h3 className="text-[42px] font-bold text-black leading-none">1<span className="text-orange-500">+</span></h3>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-black">Year of Experience</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-[42px] font-bold text-black leading-none">18<span className="text-orange-500">+</span></h3>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-black">Project Delivered</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Image Container - Matching Reference Aspect Ratio */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full lg:w-[35%] h-[600px] relative shrink-0"
                >
                    <div className="absolute inset-0 bg-black/5 -translate-x-4 translate-y-4 -z-10" />
                    <img
                        src="/about.png"
                        alt="Our Studio"
                        className="w-full h-full object-cover shadow-2xl"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default About;
