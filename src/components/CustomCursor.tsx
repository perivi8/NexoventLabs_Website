import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(false);
      }
    };

    // Smooth cursor animation using requestAnimationFrame
    const animateCursor = () => {
      // Smooth interpolation for lag-free movement
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      currentPosition.current.x = lerp(currentPosition.current.x, mousePosition.current.x, 1);
      currentPosition.current.y = lerp(currentPosition.current.y, mousePosition.current.y, 1);

      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${currentPosition.current.x - 16}px, ${currentPosition.current.y - 16}px, 0)`;
      }

      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate3d(${currentPosition.current.x - 4}px, ${currentPosition.current.y - 4}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorOuterRef}
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          left: 0,
          top: 0,
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        ref={cursorInnerRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 glow-violet hidden md:block"
        style={{
          left: 0,
          top: 0,
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );
};

export default CustomCursor;
