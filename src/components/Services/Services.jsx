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
        <section className="relative bg-black min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-0 overflow-hidden flex flex-col justify-center">
            {/* Background 3D Deco */}
            <div className="absolute top-10 left-[-100px] opacity-20 pointer-events-none">
                <Polytope size={300} speed={0.1} opacity={0.3} />
            </div>
            <div className="absolute bottom-20 right-[-150px] opacity-20 pointer-events-none">
                <Polytope size={450} speed={0.08} opacity={0.3} />
            </div>

            <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 w-full">

                {/* Top descriptor row */}
                <div className="flex items-center mb-8 sm:mb-12 md:mb-16 lg:mb-24 gap-6">
                    <div className="flex-1" />
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-right text-white text-[10px] sm:text-[11px] uppercase tracking-widest leading-relaxed font-light"
                    >
                        Professionals focused on helping your brand <br className="hidden sm:block" />
                        <span className="block text-right">grow and move forward.</span>
                    </motion.p>
                    <div className="h-[1px] bg-white/20 w-16 sm:w-24 md:w-32 lg:flex-1 lg:min-w-[100px] lg:mr-[-300px]" />
                </div>

                {/* Main Headline */}
                <div className="flex flex-col items-center space-y-2 mb-10 sm:mb-16 md:mb-20 lg:mb-28">
                    {/* Row 1 */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "160px", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-[#D9D9D9] h-12 sm:h-14 md:h-16 lg:h-20 rounded-full overflow-hidden origin-left shrink-0"
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
                            className="text-[32px] sm:text-[48px] md:text-[62px] lg:text-[75px] leading-none tracking-tight text-white text-center"
                        >
                            <span className="font-extrabold">Unique</span> <span className="font-thin text-white/40 ml-2 md:ml-4">Ideas</span>
                        </motion.h2>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-[32px] sm:text-[48px] md:text-[62px] lg:text-[75px] leading-none tracking-tight text-white text-center"
                        >
                            <span className="font-extrabold">For Your</span> <span className="font-thin text-white/30 ml-2 md:ml-4">Business.</span>
                        </motion.h2>

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

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x border-t border-white/40">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 * index }}
                            className={`group relative p-6 sm:p-8 py-10 sm:py-14 lg:py-16 min-h-[240px] sm:min-h-[300px] lg:h-[360px] flex flex-col justify-between border-white/40 overflow-hidden
                                ${index % 4 !== 3 ? 'lg:border-r' : ''}
                                ${index % 2 === 0 ? 'sm:border-r' : ''}
                                transition-all duration-500 cursor-pointer border-b lg:border-b-0`
                            }
                            onClick={() => navigate('/services')}
                        >
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-orange-500 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-20 pointer-events-none" />

                            <div className="relative flex-1">
                                <h4 className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] text-left text-[17px] sm:text-[19px] md:text-[21px] font-bold text-white transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:top-0 group-hover:left-0 group-hover:translate-x-0 group-hover:translate-y-0">
                                    {service.title}
                                </h4>
                                <p className="absolute top-16 left-0 text-white/40 text-[13px] leading-relaxed line-clamp-3 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-200 text-left w-full">
                                    {service.description}
                                </p>
                            </div>

                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                                <div className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/20 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                                    <ArrowRight size={14} />
                                </div>
                                <div className="absolute inset-0 bg-orange-500 rounded-full flex items-center justify-center text-black opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 ease-[0.34,1.56,0.64,1] shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                    <ArrowRight size={18} strokeWidth={3} />
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
