import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Newman",
        role: "ENVATO MARKET",
        content: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.",
        avatar: "https://miller.bslthemes.com/ashley-demo/img/faces/1.jpg"
    },
    {
        id: 2,
        name: "Jason Smith",
        role: "THEMEFOREST",
        content: "Working with this team has been a complete game-changer for our brand. They transformed our vision into a digital reality that surpassed all our expectations. Truly world-class developers.",
        avatar: "https://miller.bslthemes.com/ashley-demo/img/faces/2.jpg"
    },
    {
        id: 3,
        name: "Emma Wilson",
        role: "CODECANYON",
        content: "They delivered the project on time and within budget, but more importantly, the quality was top-notch. I highly recommend them for any complex full-stack development work.",
        avatar: "https://miller.bslthemes.com/ashley-demo/img/faces/3.jpg"
    },
    {
        id: 4,
        name: "Robert Fox",
        role: "CREATIVE MARKET",
        content: "The level of professionalism and the eye for design this agency possesses is rare. They didn't just build a website; they built an experience for our users.",
        avatar: "https://miller.bslthemes.com/ashley-demo/img/faces/4.jpg"
    },
    {
        id: 5,
        name: "Linda Blair",
        role: "SHUTTERSTOCK",
        content: "Absolutely stunning results. They have an incredible ability to capture the essence of a brand and translate it into high-performance visual assets.",
        avatar: "https://miller.bslthemes.com/ashley-demo/img/faces/2.jpg"
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="bg-[#f9f9f9] min-h-screen py-16 sm:py-20 flex flex-col justify-center relative overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative z-10 w-full">

                {/* Top descriptor row */}
                <div className="flex items-center mb-10 sm:mb-12 md:mb-16 gap-6">
                    <div className="flex-1" />
                    <div className="text-right pr-4 sm:pr-8">
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-widest leading-relaxed font-light text-black/50">
                            Customer reviews are a valuable source <br className="hidden sm:block" /> of information for both businesses and consumers.
                        </p>
                    </div>
                    <div className="h-[1px] bg-black/10 w-12 sm:w-20 md:w-32 lg:flex-1 lg:min-w-[100px] lg:mr-[-300px]" />
                </div>

                {/* Title */}
                <div className="text-center mb-10 sm:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-[28px] sm:text-[42px] md:text-[55px] lg:text-[65px] leading-[1.1] text-black"
                    >
                        <span className="font-bold">Customer</span> <span className="font-light text-black/40 italic">Voices:</span> <br />
                        <span className="font-bold">Hear What</span> <span className="font-light text-black/40 italic">They Say!</span>
                    </motion.h2>
                </div>

                {/* Avatar Row */}
                <div className="relative flex justify-center items-center h-28 sm:h-32 mb-6">
                    {/* Prev — hidden on xs, shown sm+ */}
                    <button
                        onClick={prev}
                        className="hidden sm:flex absolute left-0 lg:left-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/5 items-center justify-center hover:bg-black group/btn transition-all duration-500 z-20"
                    >
                        <ArrowLeft size={20} className="text-black group-hover/btn:text-orange-500 transition-colors" />
                    </button>

                    <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8">
                        {testimonials.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                onClick={() => setActiveIndex(idx)}
                                className={`relative cursor-pointer transition-transform duration-500 ${idx % 2 === 0 ? '-translate-y-3' : 'translate-y-3'}`}
                            >
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-sm">
                                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <motion.div
                                    className="absolute -inset-2 rounded-full border-2 border-orange-500 pointer-events-none"
                                    initial={false}
                                    animate={{ opacity: idx === activeIndex ? 1 : 0, scale: idx === activeIndex ? 1 : 0.8 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Next — hidden on xs */}
                    <button
                        onClick={next}
                        className="hidden sm:flex absolute right-0 lg:right-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/5 items-center justify-center hover:bg-black group/btn transition-all duration-500 z-20"
                    >
                        <ArrowRight size={20} className="text-black group-hover/btn:text-orange-500 transition-colors" />
                    </button>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto text-center relative pt-0">
                    <div className="flex justify-center mb-4">
                        <Quote className="text-orange-500 opacity-80" size={28} fill="currentColor" />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h4 className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-black mb-1">{testimonials[activeIndex].name}</h4>
                            <p className="text-[10px] sm:text-[11px] tracking-[0.3em] font-light text-black/40 uppercase mb-6 sm:mb-8">{testimonials[activeIndex].role}</p>

                            <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed text-black/60 font-light max-w-2xl mx-auto italic">
                                "{testimonials[activeIndex].content}"
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile nav arrows */}
                <div className="flex justify-center gap-8 mt-10 sm:hidden">
                    <button onClick={prev} className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300">
                        <ArrowLeft size={18} className="text-black/50 hover:text-white" />
                    </button>
                    <button onClick={next} className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300">
                        <ArrowRight size={18} className="text-black/50 hover:text-white" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
