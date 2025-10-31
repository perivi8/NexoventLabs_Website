import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Cpu, Database, Shield, Sparkles, Zap } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Advanced ML models that learn and adapt to your business needs.',
    },
    {
      icon: Cpu,
      title: 'Neural Networks',
      description: 'Deep learning solutions for complex pattern recognition.',
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable business intelligence.',
    },
    {
      icon: Sparkles,
      title: 'AI Automation',
      description: 'Streamline operations with intelligent automation systems.',
    },
    {
      icon: Shield,
      title: 'AI Security',
      description: 'Protect your systems with AI-powered security solutions.',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Lightning-fast AI inference for real-time applications.',
    },
  ];

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Our Services</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business objectives
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="glass-card p-8 rounded-2xl shine cursor-pointer group"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center glow-violet group-hover:glow-violet-intense transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
