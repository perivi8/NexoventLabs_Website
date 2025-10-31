import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }> = [];

    // Create particle network - fewer particles on mobile for better performance
    const particleCount = isMobile.current ? 150 : 300;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.75,
        y: Math.random() * canvas.height * 1.5 - canvas.height * 0.75,
        z: Math.random() * 1500 - 250,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      targetRotation.current = {
        x: mousePos.current.y * 0.1,
        y: mousePos.current.x * 0.1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.current = {
          x: (touch.clientX / window.innerWidth - 0.5) * 2,
          y: (touch.clientY / window.innerHeight - 0.5) * 2,
        };
        targetRotation.current = {
          x: mousePos.current.y * 0.1,
          y: mousePos.current.x * 0.1,
        };
      }
    };

    const handleScroll = () => {
      scrollOffset.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth rotation interpolation - slower for less blur
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.02;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.02;

      // Apply scroll-based offset to the network
      // Calculate scroll progress relative to hero section height
      const heroHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollOffset.current / heroHeight, 1);
      const scrollInfluence = scrollOffset.current * 0.3;
      
      // Smooth transition factor - network moves away when leaving hero, returns when back
      const transitionFactor = scrollProgress;

      particles.forEach((particle, i) => {
        // Apply rotation based on mouse position and scroll
        const scrollRotation = scrollOffset.current * 0.0005 * (1 - transitionFactor);
        const totalRotationY = currentRotation.current.y + scrollRotation;
        const totalRotationX = currentRotation.current.x + scrollRotation * 0.5;

        const rotatedX = particle.x * Math.cos(totalRotationY) - particle.z * Math.sin(totalRotationY);
        const rotatedZ = particle.x * Math.sin(totalRotationY) + particle.z * Math.cos(totalRotationY);
        const rotatedY = particle.y * Math.cos(totalRotationX) - rotatedZ * Math.sin(totalRotationX);
        const finalZ = particle.y * Math.sin(totalRotationX) + rotatedZ * Math.cos(totalRotationX);

        // Perspective projection with scroll offset
        const perspective = 800;
        const scale = perspective / (perspective + finalZ);
        
        // Add displacement effect when scrolling - moves away and returns smoothly
        const displacementX = transitionFactor * 100 * Math.sin(scrollInfluence * 0.01);
        const displacementY = transitionFactor * 150;
        
        const x2d = rotatedX * scale + canvas.width / 2 + Math.sin(scrollInfluence * 0.01) * 20 + displacementX;
        const y2d = rotatedY * scale + canvas.height / 2 - scrollInfluence - displacementY;

        // Draw particle with fade effect based on scroll
        const alpha = Math.max(0, Math.min(1, (1500 - Math.abs(finalZ)) / 1500));
        const scrollFade = 1 - (transitionFactor * 0.5); // Fade to 50% when fully scrolled
        ctx.fillStyle = `rgba(106, 47, 232, ${alpha * 0.9 * scrollFade})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((particle2, j) => {
          if (i < j) {
            const rotatedX2 = particle2.x * Math.cos(totalRotationY) - particle2.z * Math.sin(totalRotationY);
            const rotatedZ2 = particle2.x * Math.sin(totalRotationY) + particle2.z * Math.cos(totalRotationY);
            const rotatedY2 = particle2.y * Math.cos(totalRotationX) - rotatedZ2 * Math.sin(totalRotationX);
            const finalZ2 = particle2.y * Math.sin(totalRotationX) + rotatedZ2 * Math.cos(totalRotationX);

            const scale2 = perspective / (perspective + finalZ2);
            const x2d2 = rotatedX2 * scale2 + canvas.width / 2 + Math.sin(scrollInfluence * 0.01) * 20 + displacementX;
            const y2d2 = rotatedY2 * scale2 + canvas.height / 2 - scrollInfluence - displacementY;

            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 250) {
              const lineAlpha = (1 - distance / 250) * alpha * 0.45 * scrollFade;
              ctx.strokeStyle = `rgba(106, 47, 232, ${lineAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(x2d2, y2d2);
              ctx.stroke();
            }
          }
        });

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Boundary check
        if (Math.abs(particle.x) > canvas.width * 0.75) particle.vx *= -1;
        if (Math.abs(particle.y) > canvas.height * 0.75) particle.vy *= -1;
        if (Math.abs(particle.z) > 750) particle.vz *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile.current = window.innerWidth < 768;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#000000' }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Innovation Meets Intelligence.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/70 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Empowering businesses with next-generation AI solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="glass-card glow-violet-intense hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg shine"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Solutions
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
