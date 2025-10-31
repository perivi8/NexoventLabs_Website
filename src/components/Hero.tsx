import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
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
    const particleCount = isMobile.current ? 100 : 200;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth rotation interpolation - slower for less blur
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.02;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.02;

      particles.forEach((particle, i) => {
        // Apply rotation based on mouse position
        const rotatedX = particle.x * Math.cos(currentRotation.current.y) - particle.z * Math.sin(currentRotation.current.y);
        const rotatedZ = particle.x * Math.sin(currentRotation.current.y) + particle.z * Math.cos(currentRotation.current.y);
        const rotatedY = particle.y * Math.cos(currentRotation.current.x) - rotatedZ * Math.sin(currentRotation.current.x);
        const finalZ = particle.y * Math.sin(currentRotation.current.x) + rotatedZ * Math.cos(currentRotation.current.x);

        // Perspective projection
        const perspective = 800;
        const scale = perspective / (perspective + finalZ);
        const x2d = rotatedX * scale + canvas.width / 2;
        const y2d = rotatedY * scale + canvas.height / 2;

        // Draw particle
        const alpha = Math.max(0, Math.min(1, (1000 - Math.abs(finalZ)) / 1000));
        ctx.fillStyle = `rgba(106, 47, 232, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((particle2, j) => {
          if (i < j) {
            const rotatedX2 = particle2.x * Math.cos(currentRotation.current.y) - particle2.z * Math.sin(currentRotation.current.y);
            const rotatedZ2 = particle2.x * Math.sin(currentRotation.current.y) + particle2.z * Math.cos(currentRotation.current.y);
            const rotatedY2 = particle2.y * Math.cos(currentRotation.current.x) - rotatedZ2 * Math.sin(currentRotation.current.x);
            const finalZ2 = particle2.y * Math.sin(currentRotation.current.x) + rotatedZ2 * Math.cos(currentRotation.current.x);

            const scale2 = perspective / (perspective + finalZ2);
            const x2d2 = rotatedX2 * scale2 + canvas.width / 2;
            const y2d2 = rotatedY2 * scale2 + canvas.height / 2;

            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 200) {
              const lineAlpha = (1 - distance / 200) * alpha * 0.3;
              ctx.strokeStyle = `rgba(106, 47, 232, ${lineAlpha})`;
              ctx.lineWidth = 1;
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
        if (Math.abs(particle.x) > canvas.width / 2) particle.vx *= -1;
        if (Math.abs(particle.y) > canvas.height / 2) particle.vy *= -1;
        if (Math.abs(particle.z) > 500) particle.vz *= -1;
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
