import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 px-6 relative animated-gradient">
      <div className="container mx-auto max-w-6xl" style={{ padding: '0px' }} ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 gradient-text">About Us</h2>
            <div className="glass-card p-8 rounded-2xl">
              <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                We offer exceptional web development services to create responsive, intuitive, 
                and visually stunning websites. We specialize in seamless navigation, optimized 
                performance, and innovative designs tailored to your brand.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Whether you need dynamic e-commerce platforms, corporate websites, or creative 
                portfolios, our cutting-edge solutions bring your vision to life. Empower your 
                online presence and captivate your audience with our expertise.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 rounded-2xl glow-violet aspect-square flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="mb-6"
                >
                  <svg
                    className="w-48 h-48 mx-auto"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="100" cy="100" r="80" stroke="url(#gradient)" strokeWidth="2" />
                    <circle cx="100" cy="100" r="60" stroke="url(#gradient)" strokeWidth="2" />
                    <circle cx="100" cy="100" r="40" stroke="url(#gradient)" strokeWidth="2" />
                    <circle cx="100" cy="100" r="5" fill="#6A2FE8" />
                    <circle cx="100" cy="40" r="5" fill="#8B5CF6" />
                    <circle cx="100" cy="160" r="5" fill="#8B5CF6" />
                    <circle cx="40" cy="100" r="5" fill="#8B5CF6" />
                    <circle cx="160" cy="100" r="5" fill="#8B5CF6" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6A2FE8" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text">AI-Powered Innovation</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
