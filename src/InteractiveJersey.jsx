import React, { useRef, useEffect, useCallback, useState } from 'react';
import './InteractiveJersey.css';

const InteractiveJersey = ({ 
  src, 
  alt = "Football Jersey", 
  className = "", 
  intensity = 1,
  enableScroll = true,
  enableMouse = true,
  children 
}) => {
  const jerseyRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!enableMouse || !jerseyRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const jersey = jerseyRef.current;
    const rect = container.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 300;
    const proximity = Math.max(0, 1 - (distance / maxDistance));
    
    if (proximity > 0.1) {
      const rotationY = (deltaX / window.innerWidth) * 15 * proximity * intensity;
      const rotationX = -(deltaY / window.innerHeight) * 15 * proximity * intensity;
      const translateZ = proximity * 20 * intensity;
      
      jersey.style.transform = `
        rotateY(${rotationY}deg) 
        rotateX(${rotationX}deg) 
        translateZ(${translateZ}px)
      `;
    } else {
      jersey.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
  }, [enableMouse, intensity]);

  const handleScroll = useCallback(() => {
    if (!enableScroll || !jerseyRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const jersey = jerseyRef.current;
    const rect = container.getBoundingClientRect();
    const scrollY = window.scrollY;
    
    const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
    
    if (isVisible) {
      const parallaxOffset = (scrollY - rect.top) * 0.1 * intensity;
      const rotationZ = parallaxOffset * 0.1;
      
      // Only apply scroll transform if not already transformed by mouse
      if (!jersey.style.transform.includes('rotateY') && !jersey.style.transform.includes('rotateX')) {
        jersey.style.transform = `rotateZ(${rotationZ}deg) translateY(${parallaxOffset}px)`;
      }
    }
  }, [enableScroll, intensity]);

  useEffect(() => {
    const handleMouseMoveThrottled = throttle(handleMouseMove, 16);
    const handleScrollThrottled = throttle(handleScroll, 16);

    if (enableMouse) {
      document.addEventListener('mousemove', handleMouseMoveThrottled);
    }
    
    if (enableScroll) {
      window.addEventListener('scroll', handleScrollThrottled);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveThrottled);
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, [handleMouseMove, handleScroll, enableMouse, enableScroll]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (jerseyRef.current) {
      jerseyRef.current.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`jersey-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        ref={jerseyRef}
        src={src}
        alt={alt}
        className={`jersey ${isHovered ? 'hovered' : ''}`}
      />
      <div className="jersey-shadow" />
      {children}
    </div>
  );
};

// Throttle utility function
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default InteractiveJersey;
