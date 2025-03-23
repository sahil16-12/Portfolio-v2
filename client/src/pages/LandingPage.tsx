import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';
import Projects from './Projects';

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
    url: '/Resume.pdf', // Add your resume PDF path
    style: { background: `linear-gradient(135deg, ${colors.cherry}, ${colors.cherryDark})` }
  },
  { 
    name: 'GitHub',
    icon: <FaGithub size={24} />,
    url: 'https://github.com/DanishVahora', // Your GitHub URL
    style: { background: '#333' }
  },
  { 
    name: 'LinkedIn',
    icon: <FaLinkedin size={24} />,
    url: 'https://www.linkedin.com/in/danish-vahora-8b3b6b262/', // Your LinkedIn URL
    style: { background: '#0077B5' }
  },
];

// Tech stack data
const techStack = {
  languages: [
    { name: 'C', badge: 'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white' },
    { name: 'C#', badge: 'https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white' },
    { name: 'C++', badge: 'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white' },
    { name: 'Dart', badge: 'https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white' },
    { name: 'HTML5', badge: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' },
    { name: 'CSS3', badge: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' },
    { name: 'JavaScript', badge: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' },
    { name: 'TypeScript', badge: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' },
    { name: 'Java', badge: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white' },
    { name: 'Python', badge: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54' },
    { name: 'PHP', badge: 'https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white' },
  ],
  frontend: [
    { name: 'React', badge: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
    { name: 'Angular', badge: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white' },
    { name: 'Flutter', badge: 'https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white' },
    { name: 'React Router', badge: 'https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' },
    { name: 'React Query', badge: 'https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white' },
    { name: 'Redux', badge: 'https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white' },
    { name: 'RxJS', badge: 'https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white' },
    { name: 'Vite', badge: 'https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white' },
  ],
  backend: [
    { name: '.NET', badge: 'https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white' },
    { name: 'Django', badge: 'https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white' },
    { name: 'Express.js', badge: 'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB' },
    { name: 'Flask', badge: 'https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white' },
    { name: 'FastAPI', badge: 'https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi' },
    { name: 'Spring', badge: 'https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white' },
    { name: 'Socket.io', badge: 'https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101' },
    { name: 'MySQL', badge: 'https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white' },
    { name: 'MongoDB', badge: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white' },
    { name: 'Firebase', badge: 'https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34' },
    { name: 'SQLite', badge: 'https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white' },
    { name: 'Supabase', badge: 'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white' },
  ],
  devops: [
    { name: 'AWS', badge: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white' },
    { name: 'Azure', badge: 'https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white' },
    { name: 'Render', badge: 'https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white' },
    { name: 'Vercel', badge: 'https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white' },
    { name: 'NPM', badge: 'https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white' },
    { name: 'Nodemon', badge: 'https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD' },
  ],
  ml: [
    { name: 'TensorFlow', badge: 'https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white' },
    { name: 'PyTorch', badge: 'https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white' },
    { name: 'scikit-learn', badge: 'https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white' },
    { name: 'Keras', badge: 'https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white' },
    { name: 'NumPy', badge: 'https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white' },
    { name: 'Pandas', badge: 'https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white' },
    { name: 'Matplotlib', badge: 'https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black' },
    { name: 'OpenCV', badge: 'https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white' },
  ]
};

// Tech stack icons with 3D effect for visualization
const TechIcon = ({ badge, name, delay, index }: { badge: string, name: string, delay: number, index: number }) => {
  return (
    <motion.div 
      className="tech-icon"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + (index * 0.05), duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        rotateX: -10,
        y: -5,
        transition: { duration: 0.2 }
      }}
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d",
        margin: "0.35rem",
        display: "inline-block"
      }}
    >
      <img src={badge} alt={name} />
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('languages');

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

    // Enhanced particles
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

    // Enhanced torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 32, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: new THREE.Color(colors.cherry),
      wireframe: true,
      shininess: 100
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 0, -5);
    scene.add(torus);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Enhanced animation
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

  const techCategories = [
    { id: 'languages', name: 'Languages', icon: '🔤' },
    { id: 'frontend', name: 'Frontend', icon: '🖥️' },
    { id: 'backend', name: 'Backend & DB', icon: '⚙️' },
    { id: 'devops', name: 'DevOps & Cloud', icon: '☁️' },
    { id: 'ml', name: 'ML & Data Science', icon: '🧠' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-black">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Main Landing Section */}
      <motion.div 
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full text-lg font-medium text-white border-2 border-cherry hover:bg-cherry/20 transition-all duration-300"
                  onClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ borderColor: colors.cherry }}
                >
                  Explore Tech Stack →
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div 
        id="tech-stack"
        className="relative z-10 min-h-screen px-4 py-20 snap-start"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FAF9F6] to-[#DC143C] text-transparent bg-clip-text">
              Tech Stack
            </h2>
            <p className="text-xl" style={{ color: colors.offWhiteDark }}>
              A collection of technologies I work with to build amazing applications
            </p>
          </motion.div>

          {/* Tech Categories Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {techCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveSection(category.id)}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeSection === category.id 
                    ? 'bg-gradient-to-r from-cherry to-cherryDark text-white shadow-lg shadow-cherry/30' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Tech Badges Display */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 p-8 lg:p-12 rounded-2xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="overflow-hidden relative min-h-[200px] flex flex-wrap justify-center"
              layout
              transition={{ duration: 0.4 }}
            >
              {techStack[activeSection as keyof typeof techStack].map((tech, index) => (
                <TechIcon 
                  key={tech.name} 
                  badge={tech.badge} 
                  name={tech.name} 
                  delay={0.5}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive 3D Tech Objects */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 text-center"
              whileHover={{ 
                scale: 1.03, 
                rotateY: 5, 
                boxShadow: `0 20px 30px -10px ${colors.cherry}30`
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.offWhite }}>Full Stack Development</h3>
              <p style={{ color: colors.offWhiteDark }}>
                Building scalable applications from front to back, with a focus on performance and user experience.
              </p>
            </motion.div>

            <motion.div 
              className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 text-center"
              whileHover={{ 
                scale: 1.03, 
                rotateY: 5, 
                boxShadow: `0 20px 30px -10px ${colors.cherry}30`
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.offWhite }}>Machine Learning</h3>
              <p style={{ color: colors.offWhiteDark }}>
                Integrating intelligent solutions leveraging cutting-edge ML frameworks to solve complex problems.
              </p>
            </motion.div>

            <motion.div 
              className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 text-center"
              whileHover={{ 
                scale: 1.03, 
                rotateY: 5, 
                boxShadow: `0 20px 30px -10px ${colors.cherry}30`
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.offWhite }}>Cloud & DevOps</h3>
              <p style={{ color: colors.offWhiteDark }}>
                Deploying and scaling applications with modern cloud infrastructure and CI/CD pipelines.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Additional sections placeholders */}
      <div id="about" className="min-h-screen snap-start">
        {/* About section will go here */}
      </div>
      <div id="projects" className="min-h-screen snap-start">
        <Projects></Projects>
      </div>
      <div id="contact" className="min-h-screen snap-start">
        {/* Contact section will go here */}
      </div>

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