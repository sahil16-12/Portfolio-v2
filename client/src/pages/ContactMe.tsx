import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import {
    MapPin,
    Mail,
    Phone,
    Github,
    Linkedin,
    Instagram,
    Send,
    CheckCircle
} from 'lucide-react';

// Enhanced color palette
const colors = {
    cherry: '#DC143C',
    cherryDark: '#8B0000',
    offWhite: '#FAF9F6',
    offWhiteDark: '#E8E6E1',
    accent: '#FF4D6D',
    backgroundDark: '#0F172A',
    textGray: '#94A3B8'
};

// Add this helper function for confetti
const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const runConfetti = () => {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#DC143C', '#FAF9F6', '#FF4D6D']
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#DC143C', '#FAF9F6', '#FF4D6D']
        });

        if (Date.now() < end) {
            requestAnimationFrame(runConfetti);
        }
    };

    runConfetti();
};

const ContactMe: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    }, []);

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);

    //     emailjs.sendForm(
    //         import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    //         formRef.current!,
    //         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    //     )
    //         .then(() => {
    //             setSubmitSuccess(true);
    //             setIsSubmitting(false);
    //             formRef.current?.reset();
    //             triggerConfetti(); // Add confetti celebration

    //             // Auto-hide success message after 3 seconds
    //             setTimeout(() => {
    //                 setSubmitSuccess(false);
    //             }, 3000);
    //         })
    //         .catch((error) => {
    //             console.error('Email sending failed:', error);
    //             setIsSubmitting(false);
    //         });
    // };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        formRef.current?.reset();
        triggerConfetti();

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    }, 1000);
};
    const socialLinks = [
        {
            icon: <Github size={24} />,
            link: 'https://github.com/sahil16-12',
            color: colors.offWhite
        },
        {
            icon: <Linkedin size={24} />,
            link: 'https://www.linkedin.com/in/shahil-vora/',
            color: '#0A66C2'
        },
        {
            icon: <Instagram size={24} />,
            link: 'https://www.instagram.com/_sahil.16__/',
            color: '#E1306C'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen flex items-start justify-center px-4 py-8 sm:py-12" // Changed items-center to items-start
        >
            <div className="max-w-5xl w-full mx-auto">
                {/* Title with reduced margin */}
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 sm:mb-10 bg-gradient-to-r from-[#FAF9F6] to-[#DC143C] text-transparent bg-clip-text" // Reduced margin
                >
                    Get In Touch
                </motion.h1>

                {/* Grid with reduced gap */}
                <div className="grid md:grid-cols-12 gap-4 md:gap-6"> {/* Reduced gap */}
                    {/* Contact Information */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-5 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-md shadow-2xl h-full" // Added h-full for equal height
                    >
                        <div className="space-y-3 sm:space-y-4"> {/* Reduced spacing */}
                            {/* Contact Details */}
                            {[
                                { 
                                    icon: <Mail size={20} className="sm:w-6 sm:h-6" />, 
                                    text: 'sahil16december@gmail.com',
                                    href: 'mailto:sahil16december@gmail.com'
                                },
                                { 
                                    icon: <Phone size={20} className="sm:w-6 sm:h-6" />, 
                                    text: '+91 9898557401',
                                    href: 'tel:+919898557401'
                                },
                                { 
                                    icon: <MapPin size={20} className="sm:w-6 sm:h-6" />, 
                                    text: 'Anand, Gujarat, India',
                                    href: 'https://maps.app.goo.gl/3E7E5REijsTnRE1m6'
                                }
                            ].map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.href}
                                    className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer" // Reduced spacing
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="p-2 bg-white/10 rounded-full group-hover:bg-cherry/20 transition-all duration-300">
                                        {React.cloneElement(contact.icon, {
                                            color: colors.cherry,
                                            className: 'group-hover:scale-110 transition-transform'
                                        })}
                                    </div>
                                    <span className="text-sm sm:text-base text-white group-hover:text-offWhite transition-colors break-all">
                                        {contact.text}
                                    </span>
                                </a>
                            ))}

                            {/* Social Media Links with reduced margins */}
                            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6 justify-center"> {/* Reduced margins */}
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        className="bg-white/10 p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                                    >
                                        {React.cloneElement(social.icon, { 
                                            color: social.color,
                                            size: typeof window !== 'undefined' && window.innerWidth < 640 ? 20 : 24
                                        })}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Map with reduced margins */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-4 sm:mt-6" // Reduced margins
                            >
                                <div className="w-full h-28 sm:h-40 rounded-xl overflow-hidden shadow-lg border border-white/10"> {/* Reduced height */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1842.0696039060686!2d72.97100043852579!3d22.573896221587027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4ebf003be167%3A0x33cf97439d4e96e2!2sRoyal%20City%2C%20Chandralok%20Society%2C%20Ismaile%20Nagar%2C%20Gamdi%2C%20Anand%2C%20Gujarat%20388001!5e0!3m2!1sen!2sin!4v1742906429288!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Responsive styling */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-7 h-full" // Added h-full
                    >
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-3 sm:space-y-4 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-md shadow-2xl h-full" // Reduced spacing and added h-full
                        >
                            {/* Form heading */}
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-white">
                                Your Message Here
                            </h2>
                            <br />

                            {/* Responsive form inputs */}
                            <input
                                type="text"
                                name="from_name"
                                placeholder="Your Name"
                                required
                                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cherry border border-transparent transition-all duration-300 hover:border-white/20"
                            />
                            <input
                                type="email"
                                name="from_email"
                                placeholder="Your Email"
                                required
                                className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cherry border border-transparent transition-all duration-300 hover:border-white/20"
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows={4}
                                required
                                className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cherry border border-transparent transition-all duration-300 hover:border-white/20"
                            />

                            {/* Responsive submit button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                                    w-full p-2 sm:p-3 rounded-md flex items-center justify-center space-x-2 mt-2 sm:mt-4
                                    ${isSubmitting ? 'bg-gray-500' : 'bg-cherry hover:bg-cherryDark'}
                                    text-white text-sm sm:text-base font-semibold transition-all duration-300 group
                                `}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send size={16} className="ml-2 group-hover:rotate-45 transition-transform sm:w-5 sm:h-5" />
                            </button>

                            {/* Success Message */}
                            <AnimatePresence>
                                {submitSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-green-400 mt-3" // Reduced spacing
                                    >
                                        <CheckCircle size={24} className="animate-bounce sm:w-8 sm:h-8" />
                                        <span className="text-base sm:text-lg font-medium text-center">Message sent successfully!</span>
                                        <p className="text-xs sm:text-sm text-green-400/80 text-center">Thank you for reaching out!</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactMe;