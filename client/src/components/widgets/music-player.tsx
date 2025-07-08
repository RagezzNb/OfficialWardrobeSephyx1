import { useState, useEffect } from 'react';
import { storage } from '../../lib/storage';

export function MusicPlayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(storage.getMusicEnabled());
  }, []);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    storage.setMusicEnabled(newState);
    // TODO: Implement actual music playback
  };

  return (
    <button 
      onClick={toggle}
      className="p-2 rounded border border-cyber-purple hover:border-cyber-pink transition-colors duration-300 group"
    >
      <div className="music-visualizer">
        {[0, 200, 400, 600].map((delay, index) => (
          <div 
            key={index}
            className={`visualizer-bar ${enabled ? '' : 'opacity-50'}`}
            style={{ animationDelay: `${delay}ms`, animationPlayState: enabled ? 'running' : 'paused' }}
          />
        ))}
      </div>
    </button>
  );
}
