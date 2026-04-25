import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  // Rotate the text based on scroll progress (0 to 90 degrees for a very slow, subtle feel)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center select-none cursor-pointer group">
      {/* Scroll-Driven Rotating Text */}
      <motion.div 
        style={{ rotate }}
        className="absolute w-full h-full"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              fill="transparent"
            />
          </defs>
          <text className="text-[7px] fill-white/40 tracking-[0.25em] font-bold uppercase transition-colors group-hover:fill-white">
            <textPath href="#circlePath">
              Scroll Down — Scroll Down — Scroll Down —
            </textPath>
          </text>
        </svg>
      </motion.div>
      
      {/* Exact Center Circle Design per Reference */}
      <div className="relative w-14 h-14 rounded-full bg-orange-500 shadow-xl shadow-orange-500/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {/* Inner Black Circle */}
        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-orange-500 transition-colors duration-300 group-hover:text-white">
             <ArrowDown size={18} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
