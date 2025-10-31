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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="rounded-2xl overflow-hidden group cursor-pointer bg-card border border-border hover:border-primary/40 transition-all duration-300"
            >
              <div className={`h-64 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                <motion.div
                  className="text-white text-6xl font-bold opacity-20"
                  whileHover={{ scale: 1.2, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  AI
                </motion.div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-primary font-semibold">{project.category}</span>
                  <ExternalLink className="w-5 h-5 text-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
