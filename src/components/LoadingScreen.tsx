import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedVideo from './OptimizedVideo';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide scrollbar while loading
    document.body.style.overflow = 'hidden';

    // Ensure loading screen shows for minimum 1 second
    const minLoadTime = 1000;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
        // Restore scrollbar after loading
        document.body.style.overflow = '';
      }, remainingTime);
    };

    // If page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        // Cleanup: restore scrollbar if component unmounts
        document.body.style.overflow = '';
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, hsl(264, 71%, 5%) 0%, hsl(264, 50%, 8%) 50%, hsl(264, 71%, 5%) 100%)'
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 px-4">
            <OptimizedVideo
              src="/send"
              fallbackGif="/send.gif"
              alt="Loading..."
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
              lazy={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
