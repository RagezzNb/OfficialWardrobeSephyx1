import { Link, useLocation } from 'wouter';
import { useAuth } from '../../hooks/use-auth';
import { useCart } from '../../hooks/use-cart';
import { useUserStats } from '../../hooks/use-user-stats';
import { GlitchText } from '../ui/glitch-text';
import { MusicPlayer } from '../widgets/music-player';

interface NavbarProps {
  onLoginClick: () => void;
  onCartClick: () => void;
}

export function Navbar({ onLoginClick, onCartClick }: NavbarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const { stats, getRankColor } = useUserStats();

  const navItems = [
    { path: '/shop', label: 'COLLECTION' },
    { path: '/vault', label: 'VAULT' },
    { path: '/about', label: 'ABOUT' },
    { path: '/', label: 'DROPS' },
    { path: '/', label: 'RANKS' },
    { path: '/', label: 'HIDDEN', disabled: true }
  ];

  return (
    <nav className="fixed top-0 w-full z-40 glass-morphism border-b border-cyber-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 animate-float">
            <Link href="/">
              <h1 className="text-3xl font-orbitron font-black text-gradient-cyber neon-glow cursor-pointer hover:scale-105 transition-transform duration-300">
                <GlitchText>SEPHYX</GlitchText>
              </h1>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link key={item.label} href={item.path}>
                  <button className={`
                    modern-button px-4 py-3 text-sm font-space font-semibold uppercase tracking-wider
                    ${item.disabled ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-cyber-cyan hover:text-cyber-purple'}
                    ${location === item.path ? 'text-cyber-pink bg-cyber-pink/10 border-cyber-pink/30' : ''}
                  `} style={{animationDelay: `${index * 0.1}s`}}>
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Music Toggle */}
            <div className="modern-button p-2">
              <MusicPlayer />
            </div>
            
            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="modern-button relative px-4 py-3 text-cyber-cyan hover:text-cyber-green transition-all duration-300 group"
            >
              <span className="text-sm font-space font-semibold uppercase tracking-wider">VAULT</span>
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-neon text-cyber-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse-glow">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            {/* Login/Profile */}
            {user ? (
              <button 
                onClick={logout}
                className="modern-button bg-gradient-neon hover:bg-gradient-digital text-cyber-black px-6 py-3 text-sm font-space font-bold uppercase tracking-wider"
              >
                LOGOUT
              </button>
            ) : (
              <button 
                onClick={onLoginClick}
                className="modern-button bg-gradient-cyber hover:bg-gradient-neon text-white px-6 py-3 text-sm font-space font-bold uppercase tracking-wider"
              >
                LOGIN
              </button>
            )}
            
            {/* Rank Display */}
            {stats && (
              <div className="modern-button px-4 py-3 text-sm font-space uppercase tracking-wider">
                <span className="text-gray-400">RANK:</span>
                <span className={`${getRankColor(stats.rank)} neon-glow ml-2 font-bold`}>
                  {stats.rank}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
