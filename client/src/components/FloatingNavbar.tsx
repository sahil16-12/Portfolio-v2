import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

// Use the existing color palette
const colors = {
    cherry: '#DC143C',
    cherryDark: '#8B0000',
    offWhite: '#FAF9F6',
    offWhiteDark: '#E8E6E1',
    accent: '#FF4D6D'
};

const FloatingNavbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Update active section based on scroll position
            if (currentScrollY < window.innerHeight / 2) {
                setActiveSection('home');
            } else {
                const sections = navItems.map(item => item.href.slice(1));
                const currentSection = sections.find(section => {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return rect.top <= 100 && rect.bottom >= 100;
                    }
                    return false;
                });

                if (currentSection) {
                    setActiveSection(currentSection);
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { 
            icon: <FaHome size={20} />, 
            label: 'Home', 
            href: '#home',  // Changed from '#landing-page'
            color: '#4CAF50'
        },
        { 
            icon: <FaUser size={20} />, 
            label: 'About', 
            href: '#about-me',
            color: '#2196F3'
        },
        { 
            icon: <FaCode size={20} />, 
            label: 'Tech Stack', 
            href: '#tech-stack',
            color: '#9C27B0'
        },
        { 
            icon: <FaProjectDiagram size={20} />, 
            label: 'Projects', 
            href: '#projects',
            color: '#FF9800'
        },
        { 
            icon: <FaEnvelope size={20} />, 
            label: 'Contact', 
            href: '#contact',
            color: colors.cherry
        }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto"
                >
                    <motion.div 
                        className="flex items-center justify-center gap-4 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10"
                        style={{
                            backgroundColor: 'rgba(18, 18, 18, 0.8)',
                            boxShadow: `0 0 20px ${colors.cherry}30`
                        }}
                        whileHover={{
                            boxShadow: `0 0 30px ${colors.cherry}50`,
                            borderColor: `${colors.cherry}30`
                        }}
                    >
                        {navItems.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative flex flex-col items-center justify-center py-2"
                                onMouseEnter={() => setHoveredItem(item.href)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <motion.div 
                                    className={`p-2 rounded-full transition-all duration-300 relative ${
                                        activeSection === item.href.slice(1) ? 'bg-white/10' : ''
                                    }`}
                                    style={{ color: activeSection === item.href.slice(1) ? item.color : colors.offWhite }}
                                    whileHover={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: item.color
                                    }}
                                >
                                    {item.icon}
                                    {activeSection === item.href.slice(1) && (
                                        <motion.div
                                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                            layoutId="activeIndicator"
                                        />
                                    )}
                                </motion.div>

                                <AnimatePresence>
                                    {hoveredItem === item.href && (
                                        <motion.span 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute -bottom-8 text-xs whitespace-nowrap px-3 py-1.5 rounded-full backdrop-blur-md"
                                            style={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                                border: `1px solid ${item.color}40`,
                                                color: item.color,
                                                boxShadow: `0 0 10px ${item.color}30`
                                            }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default FloatingNavbar;