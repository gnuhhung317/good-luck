import React, { useEffect, useState } from 'react';

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Create 30 particles
    setParticles(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((i) => {
        const left = Math.random() * 100;
        const size = Math.random() * 20 + 5;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        return (
          <div
            key={i}
            className="particle absolute bg-white/20 rounded-full blur-[1px]"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleBackground;