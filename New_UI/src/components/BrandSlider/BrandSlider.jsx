import React from 'react';
import { motion } from 'framer-motion';

const brands = [
    { name: 'Partner 1', logo: 'https://miller.bslthemes.com/ashley-demo/img/partners/1.svg' },
    { name: 'Partner 2', logo: 'https://miller.bslthemes.com/ashley-demo/img/partners/2.svg' },
    { name: 'Accenture', logo: 'https://cdn.simpleicons.org/accenture' },
    { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta' },
    { name: 'Netflix', logo: 'https://cdn.simpleicons.org/netflix' },
];

const BrandSlider = () => {
    // Large duplication for seamless loop
    const duplicatedBrands = [...brands, ...brands, ...brands, ...brands, ...brands];

    return (
        <div className="bg-[#f9f9f9] py-10 md:py-12 border-t border-black/[0.03] overflow-hidden">
            <div className="flex w-max">
                <motion.div 
                    className="flex items-center gap-16 md:gap-24 whitespace-nowrap px-10"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        }
                    }}
                >
                    {duplicatedBrands.map((brand, idx) => (
                        <div key={idx} className="flex items-center gap-4 px-4 opacity-100 transition-all duration-500 cursor-pointer">
                            <img 
                                src={brand.logo} 
                                alt={brand.name} 
                                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default BrandSlider;
