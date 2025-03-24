import React from 'react';
import { motion } from 'framer-motion';

// Define color palette to match LandingPage.tsx
const colors = {
    cherry: '#DC143C',
    cherryDark: '#8B0000',
    offWhite: '#FAF9F6',
    offWhiteDark: '#E8E6E1',
    accent: '#FF4D6D',
};

// Achievements data
const achievements = [
    {
        title: "HackOut'24",
        description: "Our team 'Digital Dreamers' made it to the top 10 amongst 1200+ participants at HackOut'24, hosted by DA-IICT, Gandhinagar.",
    },
    {
        title: "DU-HACKS'23",
        description: "Certified by DU-HACKS'23 (Hackathon-2023)",
    },
    {
        title: "DU-HACKS'25",
        description: "Finished in TOP-15 in DU-HACKS'25 (Hackathon-2024)",
    },
];

const AboutMe: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen flex items-center justify-center px-4 snap-start"
        >
            <div className="max-w-5xl w-full mx-auto">
                {/* Enhanced Heading with Gradient */}
                <h1
                    className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#FAF9F6] to-[#DC143C] text-transparent bg-clip-text"
                >
                    About Me
                </h1>

                {/* Photo and Introduction */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-64 w-64 rounded-full overflow-hidden border-4 cursor-pointer"
                        style={{
                            borderColor: colors.cherry,
                            boxShadow: `0 0 20px ${colors.cherry}40`,
                        }}
                    >
                        <img
                            src="/DSV.jpg"
                            alt="Danish Vahora"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-xl max-w-lg text-center md:text-left"
                        style={{ color: colors.offWhiteDark }}
                    >
                        I'm a computer engineering student at Dharmsinh Desai University, Nadiad, with a passion for creating innovative solutions through code. My journey in tech has been marked by several achievements in hackathons, where I've collaborated with talented peers to push the boundaries of technology.
                    </motion.p>
                </div>

                {/* Achievements Timeline */}
                <div className="relative mb-16">
                    <div
                        className="absolute top-0 bottom-0 left-1/2 w-0.5 transform -translate-x-1/2"
                        style={{ background: colors.cherry }}
                    />
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, boxShadow: `0 10px 20px ${colors.cherry}20` }}
                                className="w-full md:w-5/12 p-4"
                            >
                                <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                                    <h3
                                        className="text-2xl font-semibold"
                                        style={{ color: colors.offWhite }}
                                    >
                                        {achievement.title}
                                    </h3>
                                    <p
                                        className="text-lg"
                                        style={{ color: colors.offWhiteDark }}
                                    >
                                        {achievement.description}
                                    </p>
                                </div>
                            </motion.div>
                            <div className="hidden md:flex w-2/12 justify-center">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ background: colors.cherry }}
                                />
                            </div>
                            <div className="w-full md:w-5/12" />
                        </div>
                    ))}
                </div>

                {/* Education Section */}
                <div className="mt-16">
                    <h2
                        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#FAF9F6] to-[#DC143C] text-transparent bg-clip-text"
                    >
                        Education
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white/10 p-6 rounded-lg shadow-lg max-w-2xl mx-auto backdrop-blur-sm space-y-8"
                    >
                        {/* SSC */}
                        <div className="border-l-4 pl-4" style={{ borderColor: colors.cherry }}>
                            <h3 className="text-xl font-semibold" style={{ color: colors.offWhite }}>
                                Knowledge High School
                            </h3>
                            <p className="text-lg" style={{ color: colors.offWhiteDark }}>
                                S.S.C Board (2020)<br />
                                Anand, Gujarat<br />
                                Percentage: 89.33%
                            </p>
                        </div>

                        {/* HSC */}
                        <div className="border-l-4 pl-4" style={{ borderColor: colors.cherry }}>
                            <h3 className="text-xl font-semibold" style={{ color: colors.offWhite }}>
                                Knowledge High School
                            </h3>
                            <p className="text-lg" style={{ color: colors.offWhiteDark }}>
                                H.S.C Board (2022)<br />
                                Anand, Gujarat<br />
                                Percentage: 84.76%
                            </p>
                        </div>

                        {/* B.Tech */}
                        <div className="border-l-4 pl-4" style={{ borderColor: colors.cherry }}>
                            <h3 className="text-xl font-semibold" style={{ color: colors.offWhite }}>
                                Dharmsinh Desai University
                            </h3>
                            <p className="text-lg" style={{ color: colors.offWhiteDark }}>
                                B.Tech Computer Engineering (2022-2026)<br />
                                Nadiad, India<br />
                                Current CPI: 8.31
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutMe;