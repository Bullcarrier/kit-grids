import React, { useRef, useEffect, useState } from 'react';
import InteractiveJersey from './InteractiveJersey';
import './JerseyGrid.css';

const JerseyGrid = ({ 
  jerseys = [], 
  maxJerseys = 20, 
  enablePerformanceMode = true,
  className = "" 
}) => {
  const gridRef = useRef(null);
  const [performanceStats, setPerformanceStats] = useState({
    fps: 60,
    jerseyCount: 0,
    isOptimized: enablePerformanceMode
  });

  // Generate demo jerseys if none provided
  const demoJerseys = jerseys.length > 0 ? jerseys : Array.from({ length: maxJerseys }, (_, i) => ({
    id: i + 1,
    src: `https://via.placeholder.com/200x240/${getRandomColor()}/FFFFFF?text=Jersey+${i + 1}`,
    alt: `Football Jersey ${i + 1}`,
    name: `Jersey ${i + 1}`
  }));

  function getRandomColor() {
    const colors = [
      'E74C3C', '3498DB', '2ECC71', 'F39C12', '9B59B6',
      '1ABC9C', 'E67E22', '34495E', 'E91E63', '2196F3',
      '4CAF50', 'FF9800', '673AB7', '00BCD4', 'FF5722',
      '795548', '607D8B', '3F51B5', '009688', 'FFC107'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Performance monitoring
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const monitorPerformance = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        setPerformanceStats(prev => ({
          ...prev,
          fps,
          jerseyCount: demoJerseys.length
        }));
        frameCount = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(monitorPerformance);
    };

    requestAnimationFrame(monitorPerformance);
  }, [demoJerseys.length]);

  return (
    <div className={`jersey-grid-container ${className}`}>
      {performanceStats.isOptimized && (
        <div className="performance-panel">
          <div className="performance-stat">
            <span className="label">Jerseys:</span>
            <span className="value">{performanceStats.jerseyCount}</span>
          </div>
          <div className="performance-stat">
            <span className="label">FPS:</span>
            <span className="value">{performanceStats.fps}</span>
          </div>
          <div className="performance-stat">
            <span className="label">Mode:</span>
            <span className="value">Optimized</span>
          </div>
        </div>
      )}
      
      <div ref={gridRef} className="jerseys-grid">
        {demoJerseys.map((jersey) => (
          <div key={jersey.id} className="jersey-item">
            <InteractiveJersey
              src={jersey.src}
              alt={jersey.alt}
              className={enablePerformanceMode ? "multiple" : ""}
              intensity={enablePerformanceMode ? 0.7 : 1}
              enableScroll={true}
              enableMouse={true}
            >
              <div className="jersey-info">
                <h3>{jersey.name}</h3>
                {jersey.description && <p>{jersey.description}</p>}
              </div>
            </InteractiveJersey>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JerseyGrid;
