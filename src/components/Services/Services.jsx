import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Polytope from '@components/Polytope/Polytope';

const Services = () => {
    const navigate = useNavigate();
    const services = [
        { 
            title: "Branding and Identity Design",
            description: "Our creative agency is a team of professionals focused on helping your brand grow."
        },
        { 
            title: "Website Design and Development",
            description: "We build high-performance websites that combine stunning design with robust code."
        },
        { 
            title: "Advertising and Marketing Campaigns",
            description: "Data-driven marketing strategies that amplify your reach and drive real growth."
        },
        { 
            title: "Creative Consulting and Development",
            description: "Expert guidance to transform your business vision into powerful digital realities."
        }
    ];

    return (
        <section className="relative bg-black pt-32 pb-0 overflow-hidden">
            {/* Background 3D Deco */}
            <div className="absolute top-10 left-[-100px] opacity-20 pointer-events-none">
                <Polytope size={300} speed={0.1} opacity={0.3} />
            </div>
            <div className="absolute bottom-20 right-[-150px] opacity-20 pointer-events-none">
                <Polytope size={450} speed={0.08} opacity={0.3} />
            </div>

            <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24">

                {/* Professionals Description (Top Right with Line) */}
                <div className="flex items-center mb-24 gap-6">
                    <div className="flex-1" />
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-right text-white text-[11px] uppercase tracking-widest leading-relaxed font-light whitespace-nowrap"
                    >
                        Professionals focused on helping your brand <br />
                        <span className="block text-right">grow and move forward.</span>
                    </motion.p>
                    <div className="h-[1px] bg-white/20 flex-1 min-w-[100px] mr-[-300px]" />
                </div>

                {/* Main Headline Rows - Centered Layout */}
                <div className="flex flex-col items-center space-y-2 mb-32">
                    {/* Row 1: Capsule + Unique Ideas */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "200px", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-[#D9D9D9] h-16 md:h-20 rounded-full overflow-hidden origin-left shrink-0"
                        >
                            <img 
                                src="https://miller.bslthemes.com/ashley-demo/img/photo/2.jpg" 
                                alt="Team" 
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-[35px] md:text-[60px] lg:text-[80px] leading-none tracking-tight text-white whitespace-nowrap"
                        >
                            <span className="font-extrabold">Unique</span> <span className="font-thin text-white/40 ml-4">Ideas</span>
                        </motion.h2>
                    </div>

                    {/* Row 2: For Your Business + Button */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-[35px] md:text-[60px] lg:text-[80px] leading-none tracking-tight text-white whitespace-nowrap"
                        >
                            <span className="font-extrabold">For Your</span> <span className="font-thin text-white/30 ml-4">Business.</span>
                        </motion.h2>

                        {/* Orange Pill Button → /services */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link to="/services" className="group relative flex items-center gap-4 md:gap-6 bg-orange-500 rounded-full pl-5 md:pl-7 pr-1.5 py-1.5 hover:bg-white transition-all duration-500">
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-black">What we do</span>
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-45">
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Services Grid (4 Columns with Enclosed Row) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-x border-t border-white/40 mt-20">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 * index }}
                            className={`group relative p-8 py-16 h-[380px] flex flex-col justify-between border-white/40 overflow-hidden
                                ${index % 4 !== 3 ? 'lg:border-r' : ''}
                                ${index % 2 === 0 ? 'md:border-r' : ''}
                                transition-all duration-500 cursor-pointer`
                            }
                            onClick={() => navigate('/services')}
                        >
                            {/* Orange Hover Top Line - 100% Reliable Trigger */}
                            <motion.div 
                                className="absolute top-0 left-0 w-full h-[3px] bg-orange-500 z-10 pointer-events-none"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                            
                            {/* We also add a CSS fallback for the bar to be sure */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-orange-500 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-20 pointer-events-none" />

                            <div className="relative flex-1">
                                <h4 className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] text-left text-[20px] md:text-[22px] font-bold text-white transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:top-0 group-hover:left-0 group-hover:translate-x-0 group-hover:translate-y-0">
                                    {service.title}
                                </h4>
                                
                                <p className="absolute top-16 left-0 text-white/40 text-[14px] leading-relaxed line-clamp-3 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-200 text-left w-full">
                                    {service.description}
                                </p>
                            </div>
                            
                            {/* Interactive Icon Transition */}
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                {/* Default Gray Icon (Subtle) */}
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/20 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0"> 
                                    <ArrowRight size={14} />
                                </div>
                                
                                {/* Hover Orange Button */}
                                <div className="absolute inset-0 bg-orange-500 rounded-full flex items-center justify-center text-black opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 ease-[0.34,1.56,0.64,1] shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                    <ArrowRight size={20} strokeWidth={3} className="transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:rotate-0" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
