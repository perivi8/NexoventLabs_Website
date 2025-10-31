import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Cpu, Database, Globe, Sparkles, Zap } from 'lucide-react';

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
      icon: Globe,
      title: 'Website Development',
      description: 'Modern, responsive websites built with cutting-edge technologies.',
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
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Our Services</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business objectives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
