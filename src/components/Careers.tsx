import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

const Careers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const jobs = [
    {
      title: 'Senior ML Engineer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Build cutting-edge ML models for real-world applications.',
    },
    {
      title: 'AI Research Scientist',
      location: 'Remote',
      type: 'Full-time',
      description: 'Push the boundaries of AI research and innovation.',
    },
    {
      title: 'Data Engineer',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Design and maintain scalable data infrastructure.',
    },
    {
      title: 'AI Product Manager',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Lead product strategy for AI-powered solutions.',
    },
  ];

  return (
    <section id="careers" className="py-32 px-6 relative animated-gradient">
      <div className="container mx-auto max-w-6xl" style={{ padding: '0px' }} ref={ref}>
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Join Our Team</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Be part of the next generation of AI innovation
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div
              key={job.title}
              className="glass-card p-8 rounded-2xl shine group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {job.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {job.type}
                    </div>
                  </div>
                </div>
                <Button
                  className="glass glow-violet hover:glow-violet-intense transition-all duration-300 group"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
