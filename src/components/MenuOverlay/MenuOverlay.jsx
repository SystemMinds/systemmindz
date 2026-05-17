import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Polytope from '../Polytope/Polytope';

const MenuOverlay = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(null);
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
    { name: 'Homepage',    to: '/'            },
    { name: 'Portfolio',   to: '/portfolio'   },
    { name: 'Services',    to: '/services'    },
    { name: 'Projects',    to: '/projects'    },
    { name: 'Our Clients', to: '/our-clients' },
    { name: 'Contact',     to: '/contact'     },
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

          {/* Header */}
          <div className="w-full px-6 sm:px-10 lg:pl-32 xl:pl-48 py-8 flex items-center justify-between xl:pr-32 relative z-20 shrink-0">
            <Link to="/" onClick={onClose} className="text-xl font-bold text-white select-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SystemMindz</Link>
            <button
              onClick={onClose}
              className="text-white flex flex-col items-center justify-center p-2"
              aria-label="Close menu"
            >
              <X size={30} strokeWidth={1} />
            </button>
          </div>

          {/* Main Layout */}
          <div className="flex-1 flex flex-col lg:flex-row items-stretch px-6 sm:px-10 lg:pl-32 xl:pl-48 xl:pr-32 min-h-0">

            {/* Left Nav Column */}
            <div className="w-full lg:w-[36%] flex flex-col justify-center py-8 lg:py-0 lg:pr-12">
              <div className="flex flex-col gap-2 lg:gap-3">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.to;
                  const isHovered = hovered === item.name;
                  return (
                    <div key={item.name} className="overflow-hidden">
                      <motion.div custom={i} variants={linkVariants} className="inline-block">
                        <Link
                          to={item.to}
                          onClick={onClose}
                          onMouseEnter={() => setHovered(item.name)}
                          onMouseLeave={() => setHovered(null)}
                          style={{ fontStyle: isHovered ? 'italic' : 'normal' }}
                          className={`text-[28px] md:text-[32px] lg:text-[38px] leading-[1.15] font-bold tracking-tight transition-all duration-300 block
                            ${isActive ? 'text-orange-500' : isHovered ? 'text-white' : 'text-white/60'}`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-[1px] bg-white/20 mx-12 self-stretch my-8" />

            {/* Right Content */}
            <div className="flex-1 flex flex-col justify-center gap-8 py-8 lg:py-0 relative">

              {/* Top Grids */}
              <motion.div variants={extraInfoVariants} className="grid grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-4 uppercase tracking-widest">Projects</h4>
                  <ul className="space-y-1.5">
                    {['Interior design studio', 'Home Security Camera', 'Kemia Honest Skincare', 'Cascade of Lava', 'Air Pro by Molekule', "Tony's Chocolonely"].map(link => (
                      <li key={link}>
                        <Link to="/projects" onClick={onClose} className="text-[12px] font-bold text-white/35 hover:text-white transition-all duration-300">{link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-4 uppercase tracking-widest">Useful links</h4>
                  <ul className="space-y-1.5">
                    {['Privacy Policy', 'Terms and conditions', 'Cookie Policy', 'Careers'].map(link => (
                      <li key={link}>
                        <Link to="/contact" onClick={onClose} className="text-[12px] font-bold text-white/35 hover:text-white transition-all duration-300">{link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={extraInfoVariants} className="h-[1px] bg-white/10 w-full" />

              {/* Locations */}
              <motion.div variants={extraInfoVariants} className="grid grid-cols-2 gap-x-12 relative z-10">
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-3 uppercase tracking-widest">Canada</h4>
                  <div className="text-[12px] font-bold text-white/30 leading-relaxed">
                    71 South Los Carneros Road, California
                    <span className="text-white/50 mt-1 block">+51 174 705 812</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-3 uppercase tracking-widest">Germany</h4>
                  <div className="text-[12px] font-bold text-white/30 leading-relaxed">
                    Leehove 40, 2678 MC De Lier, Netherlands
                    <span className="text-white/50 mt-1 block">+31 174 705 811</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Polytope */}
          <div className="absolute top-[-10%] left-[58%] -translate-x-1/2 opacity-[0.25] pointer-events-none z-0">
            <Polytope size={320} speed={0.1} opacity={0.6} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
