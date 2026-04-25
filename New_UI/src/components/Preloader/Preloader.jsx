import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState('text1'); // 'text1' | 'boxReveal'
  const [boxState, setBoxState] = useState('initial'); // 'initial' | 'expanding' | 'collapsing'
  
  const text1 = "Turn your ideas into Reality";
  const words = text1.split(" ");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Stage 1: Text 1 (Vanishes 0.5s after final word appears)
    // Stagger (0.4s * 5) + Delay (0.5s) = 2.5s logic
    const toBoxStage = setTimeout(() => {
      setStage('boxReveal');
      setBoxState('expanding');
    }, 2800); 

    // Box Collapse Stage (starts 1s after expansion completes)
    const toCollapse = setTimeout(() => {
      setBoxState('collapsing');
    }, 4800);

    // Final Exit 
    const toDone = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 7000);

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(toBoxStage);
      clearTimeout(toCollapse);
      clearTimeout(toDone);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35, // Slightly faster stagger
        delayChildren: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      }
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {stage === 'text1' ? (
              <motion.div
                key="text1-stage"
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-wrap items-center justify-center px-10 text-center"
              >
                {words.map((word, index) => {
                  const isEmphasized = word.toLowerCase() === 'ideas';
                  return (
                    <motion.span
                      key={index}
                      variants={wordVariants}
                      className={`
                        inline-block mx-[0.15em] text-2xl md:text-3xl lg:text-4xl 
                        ${isEmphasized 
                          ? 'font-bold text-white tracking-tight' 
                          : 'font-light text-white/80 tracking-wide'
                        }
                      `}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="box-reveal-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex items-center justify-center w-[320px] md:w-[500px] h-12 md:h-16"
              >
                {/* Reveal text */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: boxState === 'collapsing' ? 1 : 0 }}
                  transition={{ duration: 0.05 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal lowercase relative z-0 text-center"
                >
                  systemmindz.com
                </motion.div>

                {/* The wiper box: Strictly anchored left/right movement */}
                <motion.div
                  initial={{ left: '0%', right: '100%' }}
                  animate={{ 
                    left: boxState === 'collapsing' ? '100%' : '0%',
                    right: (boxState === 'expanding' || boxState === 'collapsing') ? '0%' : '100%'
                  }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.65, 0, 0.35, 1] 
                  }}
                  className="absolute inset-y-0 bg-gradient-to-r from-orange-500 to-yellow-500 z-10"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
