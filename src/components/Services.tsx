import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Cpu, Database, Globe, Sparkles, Zap, Monitor, Smartphone, MessageSquare, Cloud, Settings, Wrench } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Monitor,
      title: 'Web Development',
      items: [
        'Custom Website Development (React, Angular, Vite)',
        'Full-Stack Web Apps (Frontend + Backend)',
        'Portfolio, Business, and E-Commerce Websites',
        'API Integration & Development (Node.js, Flask)',
      ],
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      items: [
        'Cross-Platform App Development (React Native)',
        'Backend-Powered Mobile Apps (Supabase, SQL)',
        'App Maintenance & Updates',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Chatbot & AI Integration',
      items: [
        'Website Chatbots (Custom AI / OpenAI API)',
        'Customer Support Chatbots',
        'Lead Generation Chatbots',
        'Workflow Automation (automated responses, form handling, etc.)',
      ],
    },
    {
      icon: Brain,
      title: 'Machine Learning & AI Solutions',
      items: [
        'Predictive Analytics & Data Modeling',
        'Computer Vision (YOLO, TensorFlow)',
        'Natural Language Processing (NLP)',
        'Model Deployment & Integration',
      ],
    },
    {
      icon: Database,
      title: 'Database & Backend Solutions',
      items: [
        'Database Design (MongoDB, PostgreSQL, MySQL)',
        'Cloud Backend Setup (Supabase)',
        'API Development & Integration',
      ],
    },
    {
      icon: Cloud,
      title: 'Deployment & DevOps',
      items: [
        'Website & App Deployment (Render, Vercel, Netlify)',
        'Continuous Integration / Continuous Deployment (CI/CD)',
        'Git & GitHub Version Control Setup',
      ],
    },
    {
      icon: Settings,
      title: 'Automation & Workflow Tools',
      items: [
        'Website Chatbots with Auto-Trigger',
        'WhatsApp Bots with Automated Responses',
        'Automated Business Workflows',
        'Custom Dashboards and Admin Panels',
      ],
    },
    {
      icon: Wrench,
      title: 'Maintenance & Support',
      items: [
        'Bug Fixes & Performance Optimization',
        'Security & Backup Services',
        'Regular Updates & Feature Enhancements',
      ],
    },
  ];

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-7xl" style={{ padding: '0px' }} ref={ref}>
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Our Services</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive development and AI solutions tailored to your business needs
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
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="text-foreground/70 leading-relaxed text-sm flex items-start">
                    <span className="mr-2 text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
