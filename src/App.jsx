import React, { useState } from 'react';
import JerseyGrid from './JerseyGrid';
import InteractiveJersey from './InteractiveJersey';
import RealMadridJersey from './RealMadridJersey';
import RealMadridGrid from './RealMadridGrid';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('real-madrid-grid'); // 'single', 'grid', 'real-madrid', or 'real-madrid-grid'

  const demoJerseys = [
    {
      id: 1,
      src: 'https://via.placeholder.com/250x300/E74C3C/FFFFFF?text=Team+A',
      alt: 'Team A Jersey',
      name: 'Team A',
      description: 'Home Kit'
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/250x300/3498DB/FFFFFF?text=Team+B',
      alt: 'Team B Jersey',
      name: 'Team B',
      description: 'Away Kit'
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/250x300/2ECC71/FFFFFF?text=Team+C',
      alt: 'Team C Jersey',
      name: 'Team C',
      description: 'Third Kit'
    }
  ];

  return (
    <div className="app">
      <header className="app-header">
        {/* Header removed as requested */}
      </header>

      <main className="app-main">
        {viewMode === 'real-madrid-grid' ? (
          <RealMadridGrid />
        ) : viewMode === 'real-madrid' ? (
          <RealMadridJersey />
        ) : viewMode === 'single' ? (
          <div className="single-jersey-demo">
            <InteractiveJersey
              src="https://via.placeholder.com/250x300/9B59B6/FFFFFF?text=Demo+Jersey"
              alt="Demo Football Jersey"
              intensity={1}
              enableScroll={true}
              enableMouse={true}
            >
              <div className="jersey-info">
                <h3>Demo Jersey</h3>
                <p>Interactive 3D Effect</p>
              </div>
            </InteractiveJersey>
          </div>
        ) : (
          <JerseyGrid 
            jerseys={demoJerseys}
            maxJerseys={20}
            enablePerformanceMode={true}
            className="optimized"
          />
        )}
      </main>

      {/* Footer removed as requested */}
      <Analytics />
    </div>
  );
}

export default App;
