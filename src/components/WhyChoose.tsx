import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatCardProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatCard = ({ end, label, suffix = '+', prefix = '', duration = 2 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
    >
      <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">
        {prefix}{count}{suffix}
      </div>
      <div className="text-lg md:text-xl text-foreground/70 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { end: 250, label: 'Total Projects', suffix: '+' },
    { end: 98, label: 'Success Rate', suffix: '%' },
    { end: 150, label: 'Trusted Clients', suffix: '+' },
  ];

  return (
    <section id="why-choose" className="pt-32 pb-0 px-6 relative bg-background">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Why Choose Us</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us to deliver exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix}
              duration={2.5}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
