import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'AI Vision System',
      category: 'Computer Vision',
      description: 'Real-time object detection and classification for autonomous systems.',
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      title: 'NLP Engine',
      category: 'Natural Language',
      description: 'Advanced language understanding for customer service automation.',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Predictive Analytics',
      category: 'Data Science',
      description: 'ML-powered forecasting system for enterprise decision making.',
      gradient: 'from-cyan-600 to-purple-600',
    },
    {
      title: 'Neural Optimization',
      category: 'Deep Learning',
      description: 'Optimizing complex systems using reinforcement learning.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Smart Automation',
      category: 'Process Intelligence',
      description: 'Intelligent workflow automation powered by machine learning.',
      gradient: 'from-pink-600 to-purple-600',
    },
    {
      title: 'Data Pipeline',
      category: 'Big Data',
      description: 'Scalable data processing infrastructure for real-time analytics.',
      gradient: 'from-purple-600 to-indigo-600',
    },
    {
      title: 'Recommendation Engine',
      category: 'Personalization',
      description: 'AI-driven personalization for enhanced user experiences.',
      gradient: 'from-indigo-600 to-blue-600',
    },
    {
      title: 'Anomaly Detection',
      category: 'Security AI',
      description: 'Real-time threat detection using advanced machine learning.',
      gradient: 'from-blue-600 to-purple-600',
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 relative animated-gradient">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Featured Projects</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Showcasing our most impactful AI implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer shine glow-violet group-hover:glow-violet-intense hover:scale-105 transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                <motion.div
                  className="text-white text-5xl font-bold opacity-20"
                  whileHover={{ scale: 1.2, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  AI
                </motion.div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">{project.category}</span>
                  <ExternalLink className="w-4 h-4 text-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
