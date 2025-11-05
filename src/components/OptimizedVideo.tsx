import { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  fallbackGif?: string;
  alt: string;
  className?: string;
  poster?: string;
  lazy?: boolean;
}

/**
 * OptimizedVideo component that uses video format instead of GIF for better performance
 * Falls back to GIF if video format is not supported
 */
const OptimizedVideo = ({ 
  src, 
  fallbackGif, 
  alt, 
  className = '', 
  poster,
  lazy = true 
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useGif, setUseGif] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Check if video format is supported
  useEffect(() => {
    const video = document.createElement('video');
    const canPlayWebM = video.canPlayType('video/webm').replace(/no/, '');
    const canPlayMP4 = video.canPlayType('video/mp4').replace(/no/, '');
    
    if (!canPlayWebM && !canPlayMP4 && fallbackGif) {
      setUseGif(true);
    }
  }, [fallbackGif]);

  // If browser doesn't support video or we haven't loaded yet, show GIF fallback
  if (useGif && fallbackGif) {
    return (
      <img 
        src={fallbackGif} 
        alt={alt} 
        className={className}
        loading={lazy ? "lazy" : "eager"}
      />
    );
  }

  // For now, until videos are created, use GIF with lazy loading
  if (fallbackGif && !isInView) {
    return <div ref={videoRef as any} className={className} />;
  }

  if (fallbackGif) {
    return (
      <img 
        src={fallbackGif} 
        alt={alt} 
        className={className}
        loading={lazy ? "lazy" : "eager"}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      aria-label={alt}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
      {/* Fallback for browsers that don't support video */}
      {fallbackGif && <img src={fallbackGif} alt={alt} className={className} />}
    </video>
  );
};

export default OptimizedVideo;
