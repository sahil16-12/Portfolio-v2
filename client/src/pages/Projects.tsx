import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronRight } from 'react-icons/fa';
import { MdExpandMore } from 'react-icons/md';

// Define colors object to match your existing theme
const colors = {
  cherry: '#DC143C',
  cherryDark: '#8B0000',
  offWhite: '#FAF9F6',
  offWhiteDark: '#E8E6E1',
  accent: '#FF4D6D'
};

// Enhanced projects data with more detailed information
const projectsData = [
  {
    id: 1,
    title: "Neural Code Assistant",
    shortDescription: "AI-powered code completion tool using transformer models for intelligent code predictions.",
    fullDescription: "An AI-powered code assistant built with state-of-the-art transformer models to provide intelligent code completion, bug detection, and refactoring suggestions. The system learns from millions of code repositories to understand context and deliver accurate, production-ready suggestions across multiple programming languages.\n\nFeatures include real-time syntax highlighting, support for over 20 programming languages, and integration with popular IDEs including VS Code, IntelliJ, and more. The assistant uses a fine-tuned model architecture based on GPT with specialized tokenization for code.",
    image: "/project-neural-code.webp", 
    mockupImages: [
      "/neural-code-screenshot1.webp",
      "/neural-code-screenshot2.webp",
      "/neural-code-screenshot3.webp"
    ],
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    technologies: ["Python", "TensorFlow", "PyTorch", "React", "TypeScript", "FastAPI", "Docker", "AWS"],
    githubUrl: "https://github.com/yourusername/neural-code-assistant",
    liveUrl: "https://neural-code-assistant.demo",
    color: "#DC143C",
    year: "2024",
    category: "Machine Learning"
  },
  {
    id: 2,
    title: "Cloud Finance Dashboard",
    shortDescription: "Financial analytics platform with real-time data visualization and predictive forecasting.",
    fullDescription: "A comprehensive financial analytics platform designed for enterprise users that provides real-time data visualization, predictive forecasting, and integrated budget management tools. The system pulls data from multiple sources including financial APIs, user-uploaded spreadsheets, and connected banking institutions.\n\nThe dashboard features customizable widgets for different financial metrics, an AI-powered forecasting system that predicts future trends based on historical data, and an alerting system that notifies users of significant changes or anomalies in their financial data. The backend uses a microservices architecture for scalability and reliability.",
    image: "/project-finance.webp",
    mockupImages: [
      "/finance-dashboard-screenshot1.webp",
      "/finance-dashboard-screenshot2.webp",
      "/finance-dashboard-screenshot3.webp"
    ],
    tags: ["TypeScript", "React", "D3.js", "Express", "MongoDB"],
    technologies: ["TypeScript", "React", "Redux", "D3.js", "Express.js", "MongoDB", "Node.js", "AWS Lambda"],
    githubUrl: "https://github.com/yourusername/finance-dashboard",
    liveUrl: "https://finance-dashboard.demo",
    color: "#8B0000",
    year: "2023",
    category: "Web Application"
  },
  {
    id: 3,
    title: "GeoSpatial Analysis System",
    shortDescription: "Platform for analyzing and visualizing geospatial data with interactive 3D terrain visualization.",
    fullDescription: "A powerful geospatial analysis platform that enables researchers and organizations to analyze and visualize complex geographical data. The system supports custom data layers, heat maps, and interactive 3D terrain visualization with real-time data overlays.\n\nBuilt with a modular architecture, the platform can ingest data from various sources including satellite imagery, sensor networks, GPS tracking systems, and government data portals. Advanced features include custom polygon creation, distance calculations, density analysis, and temporal data animations. The backend utilizes optimized geospatial databases for handling large datasets efficiently.",
    image: "/project-geospatial.webp",
    mockupImages: [
      "/geo-analysis-screenshot1.webp",
      "/geo-analysis-screenshot2.webp",
      "/geo-analysis-screenshot3.webp"
    ],
    tags: ["JavaScript", "Three.js", "MapboxGL", "Flask", "PostgreSQL"],
    technologies: ["JavaScript", "Three.js", "MapboxGL", "WebGL", "Flask", "PostgreSQL", "PostGIS", "Python"],
    githubUrl: "https://github.com/yourusername/geo-analysis",
    liveUrl: "https://geo-analysis.demo",
    color: "#FF4D6D",
    year: "2023",
    category: "Data Visualization"
  },
  {
    id: 4,
    title: "Flutter Health Tracker",
    shortDescription: "Cross-platform mobile application for comprehensive health tracking with analytics.",
    fullDescription: "A cross-platform mobile application built with Flutter for comprehensive health and fitness tracking. The app provides users with tools to log exercises, track nutrition, monitor vital health metrics, and receive personalized health insights based on their data.\n\nKey features include workout plans with video demonstrations, barcode scanning for automatic nutritional information, integration with wearable devices for tracking heart rate and sleep patterns, and social features for sharing achievements with friends. The backend is built with Node.js and uses Firebase for real-time data synchronization across devices, with specialized algorithms to analyze health trends and provide actionable recommendations.",
    image: "/project-health.webp",
    mockupImages: [
      "/health-tracker-screenshot1.webp",
      "/health-tracker-screenshot2.webp",
      "/health-tracker-screenshot3.webp"
    ],
    tags: ["Dart", "Flutter", "Firebase", "Node.js"],
    technologies: ["Dart", "Flutter", "Firebase", "Node.js", "Express.js", "TensorFlow Lite", "Google Fit API", "Apple HealthKit"],
    githubUrl: "https://github.com/yourusername/health-tracker",
    liveUrl: "https://health-tracker.demo",
    color: "#DC143C",
    year: "2024",
    category: "Mobile Application"
  }
];

// Tag component for project technologies
const Tag = ({ name }: { name: string }) => (
  <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm shadow-sm">
    {name}
  </span>
);

// Button component for consistent styling
const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "", 
  style = {} 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: "primary" | "secondary" | "outline" | "icon", 
  className?: string, 
  style?: React.CSSProperties 
}) => {
  let baseStyles = "flex items-center gap-2 font-medium transition-all duration-300 rounded-full";
  let variantStyles = "";
  
  switch (variant) {
    case "primary":
      variantStyles = "px-5 py-2.5 bg-gradient-to-r from-cherry to-cherryDark text-white hover:shadow-lg hover:shadow-cherry/20";
      break;
    case "secondary":
      variantStyles = "px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white";
      break;
    case "outline":
      variantStyles = "px-5 py-2.5 border-2 border-cherry text-white hover:bg-cherry/20";
      break;
    case "icon":
      variantStyles = "p-2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md rounded-full";
      break;
  }
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Project card component
const ProjectCard = ({ 
  project, 
  index, 
  onOpenModal 
}: { 
  project: typeof projectsData[0], 
  index: number,
  onOpenModal: (projectId: number) => void
}) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      viewport={{ once: true, amount: 0.3 }}
      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cherry/10"
      style={{ background: `linear-gradient(145deg, rgba(40,40,45,0.4), rgba(20,20,25,0.7))` }}
    >
      {/* Project image with aspect ratio control */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent 50%, ${project.color}99)` }}
        ></div>
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/api/placeholder/600/340";
          }}
        />
        
        {/* Floating category label */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-black/30 text-white/90 border border-white/10">
          {project.category}
        </div>
        
        {/* Year tag */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-black/30 text-white/90 border border-white/10">
          {project.year}
        </div>
      </div>

      {/* Project info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cherry transition-colors duration-300">
          {project.title}
        </h3>
        
        <motion.div 
          className="text-white/80 mb-4 overflow-hidden relative"
          animate={{ height: isDescExpanded ? "auto" : "4.5rem" }}
          transition={{ duration: 0.3 }}
        >
          <p className={`leading-relaxed ${!isDescExpanded && "line-clamp-3"}`}>
            {isDescExpanded ? project.fullDescription : project.shortDescription}
          </p>
          
          {!isDescExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
          )}
        </motion.div>
        
        {/* Expand/collapse description button */}
        <Button 
          variant="secondary" 
          onClick={() => setIsDescExpanded(!isDescExpanded)}
          className="mb-4 text-sm"
        >
          {isDescExpanded ? "Show Less" : "Show More"} 
          <MdExpandMore className={`transform transition-transform ${isDescExpanded ? "rotate-180" : ""}`} />
        </Button>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, i) => (
            <Tag key={i} name={tag} />
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button 
            variant="secondary"
            onClick={() => window.open(project.githubUrl, "_blank")}
          >
            <FaGithub size={16} />
            <span>Code</span>
          </Button>
          
          <Button 
            variant="primary"
            onClick={() => window.open(project.liveUrl, "_blank")}
            className="bg-gradient-to-r"
            style={{ backgroundImage: `linear-gradient(135deg, ${project.color}, #8B0000)` }}
          >
            <FaExternalLinkAlt size={14} />
            <span>Live Demo</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onOpenModal(project.id)}
            className="ml-auto"
          >
            <span>Details</span>
            <FaChevronRight size={12} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Project detail modal component
const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: typeof projectsData[0] | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  // Early return if no project
  if (!project) return null;

  // Current image state for the gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Scroll to top when modal opens
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-y-auto overflow-x-hidden"
            style={{ boxShadow: `0 25px 50px -12px ${project.color}40` }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button 
              variant="icon" 
              onClick={onClose}
              className="absolute top-4 right-4 z-20"
            >
              <FaTimes size={18} />
            </Button>
            
            {/* Project header with main image */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-800">
              <img 
                src={project.mockupImages[currentImageIndex] || project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/1200/675";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              
              {/* Image navigation if multiple images */}
              {project.mockupImages && project.mockupImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {project.mockupImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentImageIndex === idx 
                          ? 'bg-white scale-110' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-2" style={{ color: colors.offWhite }}>
                {project.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-cherry/80 text-white">
                  {project.category}
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90">
                  {project.year}
                </div>
              </div>
              
              {/* Full description with proper formatting */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{ color: colors.offWhite }}>Overview</h3>
                <div className="text-white/80 space-y-4">
                  {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Technologies used */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{ color: colors.offWhite }}>Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Tag key={idx} name={tech} />
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  variant="secondary"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <FaGithub size={18} />
                  <span>View Source Code</span>
                </Button>
                
                <Button 
                  variant="primary"
                  onClick={() => window.open(project.liveUrl, "_blank")}
                  className="bg-gradient-to-r"
                  style={{ backgroundImage: `linear-gradient(135deg, ${project.color}, #8B0000)` }}
                >
                  <FaExternalLinkAlt size={16} />
                  <span>View Live Demo</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Category filter buttons
const CategoryFilter = ({ categories, activeFilter, setFilter }: {
  categories: string[],
  activeFilter: string,
  setFilter: (filter: string) => void
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => setFilter(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === category 
              ? 'bg-gradient-to-r from-cherry to-cherryDark text-white shadow-lg shadow-cherry/30' 
              : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + (index * 0.05) }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

// Main Projects component
const Projects: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get all categories
  const allCategories = ["All", ...Array.from(new Set(projectsData.map(project => project.category)))];
  
  // Filter projects based on selected category
  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  // Open modal with selected project
  const openProjectModal = (projectId: number) => {
    const project = projectsData.find(p => p.id === projectId) || null;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FAF9F6] to-[#DC143C] text-transparent bg-clip-text">
              Portfolio
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-xl max-w-2xl mx-auto" 
            style={{ color: colors.offWhiteDark }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A showcase of my recent projects spanning full-stack development,
            machine learning, and interactive experiences.
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <CategoryFilter 
          categories={allCategories} 
          activeFilter={filter} 
          setFilter={setFilter} 
        />

        {/* Projects grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              layout
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onOpenModal={openProjectModal}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Show message if no projects match filter */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-white/70">No projects found in this category.</p>
            <Button 
              variant="outline" 
              onClick={() => setFilter('All')}
              className="mt-4 mx-auto"
            >
              Show All Projects
            </Button>
          </motion.div>
        )}

        {/* View more projects button */}
        {filteredProjects.length > 0 && (
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/DanishVahora"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-medium text-white border-2 border-cherry hover:bg-cherry/20 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={20} />
              <span>View More Projects</span>
            </motion.a>
          </motion.div>
        )}

        {/* Project detail modal */}
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Projects;