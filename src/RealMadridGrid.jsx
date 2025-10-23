import React, { useState, useRef, useEffect, useCallback } from 'react';
import './RealMadridGrid.css';

const RealMadridGrid = () => {
  // Create state for each jersey (20 jerseys total)
  const [jerseyStates, setJerseyStates] = useState(
    Array.from({ length: 20 }, () => ({
      selectedJersey: 'home',
      isHovered: false,
      isTransitioning: false,
      previewJersey: null
    }))
  );

  // League selector state
  const [selectedLeague, setSelectedLeague] = useState('es1'); // La Liga by default

  const jerseys = {
    home: {
      src: '/jerseys/home_2025.webp',
      alt: 'Real Madrid Home Jersey 2025',
      color: 'white',
      name: 'Home'
    },
    away: {
      src: '/jerseys/away_2025.webp',
      alt: 'Real Madrid Away Jersey 2025',
      color: 'black',
      name: 'Away'
    },
    third: {
      src: '/jerseys/third_2025.webp',
      alt: 'Real Madrid Third Jersey 2025',
      color: 'blue',
      name: 'Third'
    }
  };

  const leagues = {
    gb1: { name: 'Premier League', country: 'England', logo: '/leagues/logos/gb1_logo.png', flag: '/leagues/flags/gb1_flag.png' },
    es1: { name: 'La Liga', country: 'Spain', logo: '/leagues/logos/es1_logo.png', flag: '/leagues/flags/es1_flag.png' },
    l1: { name: 'Bundesliga', country: 'Germany', logo: '/leagues/logos/l1_logo.png', flag: '/leagues/flags/l1_flag.png' },
    it1: { name: 'Serie A', country: 'Italy', logo: '/leagues/logos/it1_logo.png', flag: '/leagues/flags/it1_flag.png' },
    fr1: { name: 'Ligue 1', country: 'France', logo: '/leagues/logos/fr1_logo.png', flag: '/leagues/flags/fr1_flag.png' },
    nl1: { name: 'Eredivisie', country: 'Netherlands', logo: '/leagues/logos/nl1_logo.png', flag: '/leagues/flags/nl1_flag.png' },
    tr1: { name: 'Süper Lig', country: 'Turkey', logo: '/leagues/logos/tr1_logo.png', flag: '/leagues/flags/tr1_flag.png' },
    sa1: { name: 'Saudi Pro League', country: 'Saudi Arabia', logo: '/leagues/logos/sa1_logo.png', flag: '/leagues/flags/sa1_flag.png' },
    cl: { name: 'UEFA Champions League', country: 'UEFA', logo: '/leagues/logos/cl_logo.png', flag: '/leagues/flags/cl_flag.png' },
    el: { name: 'UEFA Europa League', country: 'UEFA', logo: '/leagues/logos/el_logo.png', flag: '/leagues/flags/el_flag.png' },
    ucol: { name: 'UEFA Conference League', country: 'UEFA', logo: '/leagues/logos/ucol_logo.png', flag: '/leagues/flags/ucol_flag.png' }
  };

  const handleJerseyChange = useCallback((jerseyIndex, jerseyType) => {
    const currentState = jerseyStates[jerseyIndex];
    if (jerseyType === currentState.selectedJersey || currentState.isTransitioning) return;
    
    setJerseyStates(prev => {
      const newStates = [...prev];
      newStates[jerseyIndex] = {
        ...newStates[jerseyIndex],
        isTransitioning: true,
        selectedJersey: jerseyType
      };
      return newStates;
    });
    
    // Reset transition state
    setTimeout(() => {
      setJerseyStates(prev => {
        const newStates = [...prev];
        newStates[jerseyIndex] = {
          ...newStates[jerseyIndex],
          isTransitioning: false
        };
        return newStates;
      });
    }, 100);
  }, [jerseyStates]);

  const handleSquareHover = useCallback((jerseyIndex, jerseyType) => {
    const currentState = jerseyStates[jerseyIndex];
    if (jerseyType !== currentState.selectedJersey && !currentState.isTransitioning) {
      setJerseyStates(prev => {
        const newStates = [...prev];
        newStates[jerseyIndex] = {
          ...newStates[jerseyIndex],
          previewJersey: jerseyType
        };
        return newStates;
      });
    }
  }, [jerseyStates]);

  const handleSquareLeave = useCallback((jerseyIndex) => {
    setJerseyStates(prev => {
      const newStates = [...prev];
      newStates[jerseyIndex] = {
        ...newStates[jerseyIndex],
        previewJersey: null
      };
      return newStates;
    });
  }, []);

  const handleMouseMove = useCallback((e, jerseyIndex) => {
    const currentState = jerseyStates[jerseyIndex];
    if (currentState.isTransitioning) return;

    const jerseyElement = document.getElementById(`jersey-${jerseyIndex}`);
    const containerElement = document.getElementById(`container-${jerseyIndex}`);
    
    if (!jerseyElement || !containerElement) return;

    const rect = containerElement.getBoundingClientRect();
    
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
      
      jerseyElement.style.transform = `
        rotateY(${rotationY}deg) 
        rotateX(${rotationX}deg) 
        translateZ(${translateZ}px)
        scale(1)
      `;
    } else {
      jerseyElement.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
    }
  }, [jerseyStates]);

  const handleMouseEnter = useCallback((jerseyIndex) => {
    setJerseyStates(prev => {
      const newStates = [...prev];
      newStates[jerseyIndex] = {
        ...newStates[jerseyIndex],
        isHovered: true
      };
      return newStates;
    });
  }, []);

  const handleMouseLeave = useCallback((jerseyIndex) => {
    setJerseyStates(prev => {
      const newStates = [...prev];
      newStates[jerseyIndex] = {
        ...newStates[jerseyIndex],
        isHovered: false,
        previewJersey: null
      };
      return newStates;
    });
    
    const jerseyElement = document.getElementById(`jersey-${jerseyIndex}`);
    if (jerseyElement) {
      jerseyElement.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
    }
  }, []);

  useEffect(() => {
    const handleMouseMoveThrottled = (e) => {
      // Find which jersey is being hovered and apply 3D effect
      jerseyStates.forEach((state, index) => {
        if (state.isHovered && !state.isTransitioning) {
          handleMouseMove(e, index);
        }
      });
    };
    
    const throttledHandler = throttle(handleMouseMoveThrottled, 16);
    document.addEventListener('mousemove', throttledHandler);

    return () => {
      document.removeEventListener('mousemove', throttledHandler);
    };
  }, [handleMouseMove, jerseyStates]);

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

  // Create 5x4 grid (20 jerseys total)
  const gridJerseys = Array.from({ length: 20 }, (_, index) => index);

  return (
    <div className="real-madrid-grid-container">
      <div className="logo-section">
        <div className="kit-grids-logo">KIT GRIDS</div>
        
        <div className="league-selector">
          <div className="league-selector-title">Select League</div>
          <div className="league-grid">
            {Object.entries(leagues).map(([code, league]) => (
              <div 
                key={code}
                className={`league-square ${selectedLeague === code ? 'active' : ''}`}
                onClick={() => setSelectedLeague(code)}
              >
                <img 
                  src={`./leagues/logos/${league.logo}`}
                  alt={`${league.name} Logo`}
                  className="league-square-logo"
                />
                <img 
                  src={`./leagues/flags/${league.flag}`}
                  alt={`${league.country} Flag`}
                  className="league-square-flag"
                />
                <div className="league-square-name">{league.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="jersey-grid">
        {gridJerseys.map((index) => {
          const currentState = jerseyStates[index];
          const displayJersey = currentState.previewJersey || currentState.selectedJersey;
          
          return (
            <div 
              key={index}
              id={`container-${index}`}
              className="jersey-display-container"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <img 
                id={`jersey-${index}`}
                src={jerseys[displayJersey].src}
                alt={jerseys[displayJersey].alt}
                className={`jersey-image ${currentState.isHovered ? 'hovered' : ''} ${currentState.isTransitioning ? 'transitioning' : ''}`}
              />
              <div className="jersey-shadow" />
              
              {/* Color selector squares - show on hover for each jersey */}
              {currentState.isHovered && (
                <div className="color-selector">
                  <button
                    className={`color-square home ${currentState.selectedJersey === 'home' ? 'active' : ''}`}
                    onClick={() => handleJerseyChange(index, 'home')}
                    onMouseEnter={() => handleSquareHover(index, 'home')}
                    onMouseLeave={() => handleSquareLeave(index)}
                    title="Home Jersey"
                  />
                  <button
                    className={`color-square away ${currentState.selectedJersey === 'away' ? 'active' : ''}`}
                    onClick={() => handleJerseyChange(index, 'away')}
                    onMouseEnter={() => handleSquareHover(index, 'away')}
                    onMouseLeave={() => handleSquareLeave(index)}
                    title="Away Jersey"
                  />
                  <button
                    className={`color-square third ${currentState.selectedJersey === 'third' ? 'active' : ''}`}
                    onClick={() => handleJerseyChange(index, 'third')}
                    onMouseEnter={() => handleSquareHover(index, 'third')}
                    onMouseLeave={() => handleSquareLeave(index)}
                    title="Third Jersey"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealMadridGrid;
