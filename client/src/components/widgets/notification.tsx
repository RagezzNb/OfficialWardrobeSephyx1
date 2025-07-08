import { useState, useEffect } from 'react';
import { SYSTEM_MESSAGES } from '../../lib/constants';

export function NotificationWidget() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showNotification = (text?: string) => {
    const notificationText = text || SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)];
    setMessage(notificationText);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    // Show initial notification
    setTimeout(() => showNotification(), 2000);
    
    // Show random notifications
    const interval = setInterval(() => showNotification(), 15000);
    return () => clearInterval(interval);
  }, []);

  // Expose showNotification globally for other components
  useEffect(() => {
    (window as any).showNotification = showNotification;
  }, []);

  return (
    <div className={`fixed top-20 right-4 z-50 terminal-window p-4 font-space text-sm max-w-xs transition-transform duration-500 ${
      visible ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-cyber-green text-xs">SYSTEM_MSG</span>
        <button 
          onClick={() => setVisible(false)}
          className="text-cyber-red hover:text-cyber-pink text-xs"
        >
          &times;
        </button>
      </div>
      <div className="text-cyber-cyan">{message}</div>
    </div>
  );
}
