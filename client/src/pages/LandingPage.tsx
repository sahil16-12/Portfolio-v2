import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';
import Projects from './Projects';
import TechStake from './TechStack';
import AboutMe from './AboutMe';
import FloatingNavbar from '../components/FloatingNavbar';
// Custom color palette
const colors = {
    cherry: '#DC143C',
    cherryDark: '#8B0000',
    offWhite: '#FAF9F6',
    offWhiteDark: '#E8E6E1',
    accent: '#FF4D6D'
};

const socialLinks = [
    {
        name: 'Resume',
        icon: <HiDocument size={24} />,
        url: '/Resume.pdf',
        style: { background: `linear-gradient(135deg, ${colors.cherry}, ${colors.cherryDark})` }
    },
    {
        name: 'GitHub',
        icon: <FaGithub size={24} />,
        url: 'https://github.com/DanishVahora',
        style: { background: '#333' }
    },
    {
        name: 'LinkedIn',
        icon: <FaLinkedin size={24} />,
        url: 'https://www.linkedin.com/in/danish-vahora-8b3b6b262/',
        style: { background: '#0077B5' }
    },
];

const LandingPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particles setup
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 3000;

        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.003,
            color: new THREE.Color(colors.cherry),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Torus setup
        const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 32, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(colors.cherry),
            wireframe: true,
            shininess: 100
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-3, 0, -5);
        scene.add(torus);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        // Resize handler
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;

            torus.rotation.x += 0.01;
            torus.rotation.y += 0.005;
            torus.rotation.z += 0.002;

            renderer.render(scene, camera);
        };

        animate();
        setIsLoaded(true);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            torusGeometry.dispose();
            torusMaterial.dispose();
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        const rotateX = (mouseY / containerRect.height - 0.5) * 20;
        const rotateY = (mouseX / containerRect.width - 0.5) * 20;

        if (containerRef.current) {
            containerRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };

    const handleMouseLeave = () => {
        if (containerRef.current) {
            containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            containerRef.current.style.transition = 'all 0.5s ease';
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-black">
            <FloatingNavbar/>
            <br /><br />
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

            {/* Main Landing Section */}
            <motion.div
                id="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex items-center justify-center min-h-screen px-4 snap-start"
            >
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="max-w-7xl w-full mx-auto p-12 backdrop-blur-xl bg-white/5 rounded-2xl transition-all duration-300 border border-white/10 shadow-2xl"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex justify-center lg:justify-start"
                        >
                            <div
                                className="relative h-96 w-96 rounded-full overflow-hidden border-4"
                                style={{
                                    borderColor: colors.cherry,
                                    boxShadow: `0 0 30px ${colors.cherry}40`,
                                    transform: 'translateZ(50px)'
                                }}
                            >
                                <img
                                    src="/DD.webp"
                                    alt="Danish Vahora"
                                    className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-center lg:text-left space-y-8"
                            style={{ transform: 'translateZ(30px)' }}
                        >
                            <h1 className="text-7xl font-bold">
                                <span className="bg-gradient-to-r from-[#FAF9F6] to-[#DC143C] text-transparent bg-clip-text">
                                    Danish Vahora
                                </span>
                            </h1>

                            <h2 className="text-3xl font-light" style={{ color: colors.offWhite }}>
                                Full Stack Developer & Creative Coder
                            </h2>

                            <p className="text-xl" style={{ color: colors.offWhiteDark }}>
                                Building exceptional digital experiences with modern technologies.
                                Specializing in scalable applications and interactive web experiences.
                            </p>

                            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium transition-all duration-300"
                                        style={{
                                            ...link.style,
                                            transform: `translateZ(${70 + index * 10}px)`,
                                            boxShadow: `0 0 20px ${colors.cherry}30`
                                        }}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </motion.a>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="pt-8"
                            >
                                
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <div id="about-me" className="min-h-screen snap-start">
                <AboutMe />
            </div>
            <div id="tech-stack" className="min-h-screen snap-start">
                <TechStake />
            </div>

            {/* Additional sections */}

            <div id="projects" className="min-h-screen snap-start">
                <Projects />
            </div>
            <div id="contact" className="min-h-screen snap-start">
                {/* Contact section placeholder */}
            </div>

            {/* Loading screen */}
            {!isLoaded && (
                <div className="fixed inset-0 bg-black flex items-center justify-center">
                    <div className="text-2xl font-light" style={{ color: colors.offWhite }}>
                        Loading...
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;