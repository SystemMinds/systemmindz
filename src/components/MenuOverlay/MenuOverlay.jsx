import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Polytope from '../Polytope/Polytope';

const MenuOverlay = ({ isOpen, onClose }) => {
  const menuVariants = {
    closed: { 
      clipPath: 'circle(0% at 95% 5%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    },
    opened: { 
      clipPath: 'circle(150% at 95% 5%)',
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  const linkVariants = {
    closed: { y: 30, opacity: 0 },
    opened: (i) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    })
  };

  const extraInfoVariants = {
    closed: { opacity: 0, y: 10 },
    opened: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8 } }
  };

  const navItems = [
    { name: 'Homepage', color: 'text-orange-500', active: true },
    { name: 'Portfolio', color: 'text-white/90' },
    { name: 'Services', color: 'text-white/90' },
    { name: 'Newsletter', color: 'text-white/90' },
    { name: 'Other pages', color: 'text-white/90' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="opened"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-y-auto"
        >

          {/* Header - Matching Navbar padding exactly */}
          <div className="w-full px-6 sm:px-10 lg:pl-32 xl:pl-48 py-16 flex items-center justify-between xl:pr-32 relative z-20 bg-black">
            <div className="text-3xl font-bold tracking-tighter select-none">A.</div>
            <button 
              onClick={onClose}
              className="text-white flex flex-col items-center justify-center p-2"
              aria-label="Close menu"
            >
              <X size={36} strokeWidth={1} />
            </button>
          </div>

          {/* Main Layout Grid - Centered Vertically */}
          <div className="flex-1 flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:pl-44 xl:pl-64 relative z-10 h-full">
            
            {/* Left Nav Column - Centered horizontally and slightly top of vertical center */}
            <div className="w-full lg:w-[38%] flex flex-col items-center lg:items-center justify-start mb-20 lg:mb-0 h-full pt-[18vh]">
                <div className="flex flex-col gap-4 lg:gap-6 text-center lg:text-left">
                    {navItems.map((item, i) => (
                        <div key={item.name} className="overflow-hidden">
                            <motion.div 
                                custom={i} 
                                variants={linkVariants}
                                className="inline-block"
                            >
                                <Link 
                                    to="#" 
                                    onClick={onClose}
                                    className={`text-[24px] md:text-[30px] lg:text-[36px] leading-[1.2] font-bold tracking-tighter hover:italic transition-all duration-300 block ${item.color}`}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vertical Divider Line - Darker/More visible (Matching Home style) */}
            <div className="hidden lg:block w-[1px] h-[80%] bg-white/30 opacity-80 ml-4 mr-20"></div>

            {/* Right Content Columns */}
            <div className="flex-1 space-y-16 lg:space-y-24 relative pb-20">
                {/* Top Grids */}
                <motion.div variants={extraInfoVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 relative z-10">
                    {/* Projects */}
                    <div>
                        <h4 className="text-[16px] font-bold text-white mb-6">Projects</h4>
                        <ul className="space-y-2">
                            {['Interior design studio', 'Home Security Camera', 'Kemia Honest Skincare', 'Cascade of Lava', 'Air Pro by Molekule', 'Tony\'s Chocolonely'].map(link => (
                                <li key={link}>
                                    <Link to="#" className="text-[13px] font-bold text-white/40 hover:text-white transition-all duration-300">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Useful links */}
                    <div>
                        <h4 className="text-[16px] font-bold text-white mb-6">Useful links</h4>
                        <ul className="space-y-2">
                            {['Privacy Policy', 'Terms and conditions', 'Cookie Policy', 'Careers'].map(link => (
                                <li key={link}>
                                    <Link to="#" className="text-[13px] font-bold text-white/40 hover:text-white transition-all duration-300">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Horizontal Divider */}
                <motion.div variants={extraInfoVariants} className="h-[1px] bg-white/10 w-full relative z-10"></motion.div>

                {/* Bottom Locations */}
                <motion.div variants={extraInfoVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 relative z-10">
                    {/* Canada */}
                    <div className="space-y-6">
                        <h4 className="text-[16px] font-bold text-white mb-4">Canada</h4>
                        <div className="text-[13px] font-bold text-white/30 leading-relaxed max-w-[220px]">
                            71 South Los Carneros Road, California <br/> 
                            <span className="text-white/50 mt-1 block">+51 174 705 812</span>
                        </div>
                    </div>

                    {/* Germany */}
                    <div className="space-y-6">
                        <h4 className="text-[16px] font-bold text-white mb-4">Germany</h4>
                        <div className="text-[13px] font-bold text-white/30 leading-relaxed max-w-[220px]">
                            Leehove 40, 2678 MC De Lier, Netherlands <br/> 
                            <span className="text-white/50 mt-1 block">+31 174 705 811</span>
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>

          {/* Background Polytope Decor - Full View - ON TOP */}
          <div className="absolute top-[-22%] left-[65%] -translate-x-1/2 opacity-[0.4] pointer-events-none z-[100]">
            <Polytope size={350} speed={0.1} opacity={0.6} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
