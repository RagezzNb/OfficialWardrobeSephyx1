import { useState } from 'react';
import { useAuth } from '../../hooks/use-auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async () => {
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    let success: boolean;
    if (isSignup) {
      success = await signup(username, password);
      if (!success) {
        setError('Username already exists');
        return;
      }
    } else {
      success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
        return;
      }
    }

    if (success) {
      onClose();
      setUsername('');
      setPassword('');
      setError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black/80 backdrop-blur-sm">
      <div className="glass-morphism p-8 max-w-lg w-full mx-4 border border-cyber-cyan/30 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyber-cyan/20">
          <span className="text-cyber-green font-orbitron text-xl font-bold neon-glow">AUTHENTICATION_REQUIRED</span>
          <button 
            onClick={onClose}
            className="text-cyber-red hover:text-cyber-pink text-2xl transition-colors duration-300"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-cyber-cyan text-sm font-space font-semibold mb-3 uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full glass-morphism border border-cyber-cyan/30 text-cyber-cyan px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/20 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-cyber-cyan text-sm font-space font-semibold mb-3 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full glass-morphism border border-cyber-cyan/30 text-cyber-cyan px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/20 transition-all duration-300"
            />
          </div>
          
          {error && (
            <div className="glass-morphism border border-cyber-red/30 p-4 text-cyber-red text-sm font-space font-semibold">
              ERROR: {error}
            </div>
          )}
          
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="modern-button flex-1 bg-gradient-cyber hover:bg-gradient-neon text-white py-4 font-space font-bold uppercase tracking-wider"
            >
              {isSignup ? 'CREATE_ACCOUNT' : 'ACCESS_SYSTEM'}
            </button>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="modern-button flex-1 bg-gradient-neon hover:bg-gradient-digital text-white py-4 font-space font-bold uppercase tracking-wider"
            >
              {isSignup ? 'LOGIN_MODE' : 'REGISTER_MODE'}
            </button>
          </div>
          
          <div className="glass-morphism border border-cyber-green/20 p-4 text-xs text-cyber-green font-space text-center">
            <div className="text-cyber-cyan mb-1">ADMIN ACCESS:</div>
            <div>admin1 / mash123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
