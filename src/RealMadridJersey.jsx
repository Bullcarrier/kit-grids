import React, { useState, useRef, useEffect, useCallback } from 'react';
import './RealMadridJersey.css';

const RealMadridJersey = () => {
  const [selectedJersey, setSelectedJersey] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previewJersey, setPreviewJersey] = useState(null);
  const jerseyRef = useRef(null);
  const containerRef = useRef(null);

  const jerseys = {
    home: {
      src: './la_liga_jerseys/real_madrid/home_2025.webp',
      alt: 'Real Madrid Home Jersey 2025',
      color: 'white',
      name: 'Home'
    },
    away: {
      src: './la_liga_jerseys/real_madrid/away_2025.webp',
      alt: 'Real Madrid Away Jersey 2025',
      color: 'black',
      name: 'Away'
    },
    third: {
      src: './la_liga_jerseys/real_madrid/third_2025.webp',
      alt: 'Real Madrid Third Jersey 2025',
      color: 'blue',
      name: 'Third'
    }
  };

  const handleJerseyChange = useCallback((jerseyType) => {
    if (jerseyType === selectedJersey || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Change jersey instantly
    setSelectedJersey(jerseyType);
    
    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  }, [selectedJersey, isTransitioning]);

  const handleSquareHover = useCallback((jerseyType) => {
    if (jerseyType !== selectedJersey && !isTransitioning) {
      setPreviewJersey(jerseyType);
    }
  }, [selectedJersey, isTransitioning]);

  const handleSquareLeave = useCallback(() => {
    setPreviewJersey(null);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!jerseyRef.current || !containerRef.current || isTransitioning) return;

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
      const rotationY = (deltaX / window.innerWidth) * 15 * proximity;
      const rotationX = -(deltaY / window.innerHeight) * 15 * proximity;
      const translateZ = proximity * 20;
      
      jersey.style.transform = `
        rotateY(${rotationY}deg) 
        rotateX(${rotationX}deg) 
        translateZ(${translateZ}px)
        scale(1)
      `;
    } else {
      jersey.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
    }
  }, [isTransitioning]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (jerseyRef.current && !isTransitioning) {
      jerseyRef.current.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
    }
  }, [isTransitioning]);

  useEffect(() => {
    const handleMouseMoveThrottled = throttle(handleMouseMove, 16);
    
    if (isHovered && !isTransitioning) {
      document.addEventListener('mousemove', handleMouseMoveThrottled);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveThrottled);
    };
  }, [handleMouseMove, isHovered, isTransitioning]);

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

  return (
    <div className="real-madrid-jersey-container">
      <div 
        ref={containerRef}
        className="jersey-display-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          ref={jerseyRef}
          src={jerseys[previewJersey || selectedJersey].src}
          alt={jerseys[previewJersey || selectedJersey].alt}
          className={`jersey-image ${isHovered ? 'hovered' : ''} ${isTransitioning ? 'transitioning' : ''}`}
        />
        <div className="jersey-shadow" />
        
        {/* Color selector squares - only show on hover */}
        {isHovered && (
          <div className="color-selector">
            <button
              className={`color-square home ${selectedJersey === 'home' ? 'active' : ''}`}
              onClick={() => handleJerseyChange('home')}
              onMouseEnter={() => handleSquareHover('home')}
              onMouseLeave={handleSquareLeave}
              title="Home Jersey"
            />
            <button
              className={`color-square away ${selectedJersey === 'away' ? 'active' : ''}`}
              onClick={() => handleJerseyChange('away')}
              onMouseEnter={() => handleSquareHover('away')}
              onMouseLeave={handleSquareLeave}
              title="Away Jersey"
            />
            <button
              className={`color-square third ${selectedJersey === 'third' ? 'active' : ''}`}
              onClick={() => handleJerseyChange('third')}
              onMouseEnter={() => handleSquareHover('third')}
              onMouseLeave={handleSquareLeave}
              title="Third Jersey"
            />
          </div>
        )}
      </div>
      
      <div className="jersey-info">
        <h3>Real Madrid {jerseys[previewJersey || selectedJersey].name} Jersey 2025</h3>
        <p>Official {jerseys[previewJersey || selectedJersey].name.toLowerCase()} kit</p>
      </div>
    </div>
  );
};

export default RealMadridJersey;
