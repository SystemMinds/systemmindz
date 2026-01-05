import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, ChevronRight } from 'lucide-react';
import iconImage from '../img/icon.png';
import logoFullImage from '../img/logo with icon.png';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'whyus', label: 'Features' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'services', label: 'Services' },
];

const Navbar = ({ isScrolled, isNavCollapsed, setIsNavCollapsed }) => {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState(true);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest < 100) {
            setIsVisible(true); // Always show at the top
        } else if (latest > previous) {
            setIsVisible(false); // Hide on scroll down
        } else if (latest < previous) {
            setIsVisible(true); // Show on scroll up
        }
    });

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'whyus', 'about', 'projects', 'contact', 'services'];
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleArrowClick = (e) => {
        e.stopPropagation();
        handleMenuClick();
    };

    const handleNavClick = (item, e) => {
        if (e) e.preventDefault(); // Only prevent default if event object is passed
        let targetId;

        if (item === 'Home') targetId = 'home';
        else if (item === 'Features') targetId = 'whyus'; // Features scrolls to WHY CHOOSE US section
        else targetId = item.toLowerCase();

        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`flex items-center justify-between gap-6 m-0 px-5 md:px-12 fixed top-0 left-0 right-0 w-full z-[1000] py-3 transition-all duration-300 ${isScrolled ? 'bg-black/40 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] border-b border-white/10 py-2' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between w-full md:w-auto transition-all duration-300 opacity-100">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick('home')}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                >
                    <motion.div
                        layout
                        className="relative flex items-center justify-start h-10 overflow-hidden"
                        transition={{ duration: 0.3, ease: "circOut" }}
                        style={{ borderRadius: '8px' }}
                    >
                        <AnimatePresence mode='popLayout' initial={false}>
                            {isLogoHovered ? (
                                <motion.img
                                    key="full"
                                    layout
                                    src={logoFullImage}
                                    alt="SystemMindz Logo"
                                    className="h-8 w-auto object-contain"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ) : (
                                <motion.img
                                    key="icon"
                                    layout
                                    src={iconImage}
                                    alt="SystemMindz Icon"
                                    className="h-8 w-auto object-contain"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Mobile Menu Button Removed as per request */}
            </div>

            <motion.nav
                initial={false}
                animate={!isNavCollapsed ? "open" : "closed"}
                variants={{
                    open: {
                        width: "auto",
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delayChildren: 0.05,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        width: "50px",
                        transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }
                    }
                }}
                className="hidden md:flex items-center justify-end gap-2 bg-black/80 border border-white/10 p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] w-fit flex-nowrap whitespace-nowrap min-h-[50px] box-border relative overflow-hidden backdrop-blur-md"
            >
                <AnimatePresence>
                    {isNavCollapsed ? (
                        <motion.button
                            key="menu-icon"
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90, transition: { duration: 0.15 } }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            onClick={() => setIsNavCollapsed(false)}
                            className="w-[34px] h-[34px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors absolute left-2"
                        >
                            <Menu size={20} className="text-white" />
                        </motion.button>
                    ) : (
                        <motion.div
                            key="nav-items"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                visible: {
                                    opacity: 1,
                                    transition: { delayChildren: 0.1, staggerChildren: 0.05 }
                                },
                                hidden: {
                                    opacity: 0,
                                    transition: { duration: 0.1 }
                                }
                            }}
                            className="flex items-center gap-1 pl-2 pr-1"
                        >
                            <button
                                onClick={() => setIsNavCollapsed(true)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2 group"
                                title="Collapse menu"
                            >
                                <ChevronRight size={18} className="text-white/70 group-hover:text-white transition-colors" />
                            </button>

                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    variants={{
                                        visible: { opacity: 1, y: 0 },
                                        hidden: { opacity: 0, y: 10 }
                                    }}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium font-outfit transition-all duration-300 relative ${activeSection === item.id
                                        ? 'text-black bg-white shadow-sm'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item.label}
                                </motion.button>
                            ))}

                            <motion.button
                                variants={{
                                    visible: { opacity: 1, y: 0, scale: 1 },
                                    hidden: { opacity: 0, y: 10, scale: 0.95 }
                                }}
                                onClick={() => handleNavClick('contact')}
                                className="ml-2 px-6 py-2 bg-white text-black rounded-full text-sm font-bold font-outfit hover:bg-gray-200 transition-colors shadow-sm"
                            >
                                Start Project
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.nav >
        </motion.div >
    );
};

export default Navbar;
