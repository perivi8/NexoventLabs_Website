import { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const lastHoverCheck = useRef<number>(0);

  // Throttled hover check to reduce performance overhead
  const checkHoverState = useCallback((target: HTMLElement) => {
    const now = Date.now();
    if (now - lastHoverCheck.current < 50) return; // Throttle to 20fps
    lastHoverCheck.current = now;

    const isInteractive = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         target.closest('button') || 
                         target.closest('a');
    setIsHovering(!!isInteractive);
  }, []);

  useEffect(() => {
    // Direct style manipulation for maximum performance
    const updateMousePosition = (e: MouseEvent) => {
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
      
      // Check hover state with throttling
      checkHoverState(e.target as HTMLElement);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [checkHoverState]);

  return (
    <>
      <div
        ref={cursorOuterRef}
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block transition-transform duration-200 ease-out"
        style={{
          left: 0,
          top: 0,
          willChange: 'transform',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      <div
        ref={cursorInnerRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 hidden md:block transition-transform duration-200 ease-out"
        style={{
          left: 0,
          top: 0,
          willChange: 'transform',
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          boxShadow: '0 0 20px rgba(106, 47, 232, 0.3), 0 0 40px rgba(106, 47, 232, 0.2)',
        }}
      />
    </>
  );
};

export default CustomCursor;
