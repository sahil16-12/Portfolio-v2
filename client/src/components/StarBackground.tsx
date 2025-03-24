import React from 'react';

interface StarBackgroundProps {
  density?: number;  // Number of stars per section
  opacity?: number;  // Base opacity for stars
}

export const StarBackground: React.FC<StarBackgroundProps> = ({ 
  density = 50,
  opacity = 1 
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {[...Array(density)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: '#FAF9F6',
              opacity: (Math.random() * 0.7 + 0.3) * opacity,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
};