import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { useUserStats } from '../hooks/use-user-stats';
import { GlitchText } from '../components/ui/glitch-text';
import { TerminalWindow } from '../components/ui/terminal-window';
import { storage } from '../lib/storage';

export default function Home() {
  const { user } = useAuth();
  const { stats, formatTime, solvePuzzle } = useUserStats();
  const [sessionTime, setSessionTime] = useState(0);
  const [konamiCode, setKonamiCode] = useState<number[]>([]);

  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑ ↑ ↓ ↓ ← → ← → B A

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newCode = [...konamiCode, e.keyCode];
      if (newCode.length > konamiSequence.length) {
        newCode.shift();
      }
      setKonamiCode(newCode);

      if (newCode.length === konamiSequence.length && 
          newCode.every((code, index) => code === konamiSequence[index])) {
        // Unlock vault
        storage.setVaultUnlocked(true);
        solvePuzzle();
        (window as any).showNotification?.("KONAMI_CODE_ACCEPTED: VAULT_UNLOCKED");
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode, solvePuzzle]);

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center relative">
      <div className="text-center space-y-12 px-4 animate-fade-in-up">
        {/* Main Title */}
        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-orbitron font-black text-gradient-cyber neon-glow animate-float">
            <GlitchText>SEPHYX</GlitchText>
          </h1>
          <p className="text-2xl md:text-3xl font-space text-gradient-neon uppercase tracking-[0.3em] animate-flicker font-bold">
            UNDERGROUND_VAULT.EXE
          </p>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto animate-pulse-glow"></div>
        </div>
        
        {/* Terminal Window */}
        <TerminalWindow className="max-w-3xl mx-auto text-left animate-slide-in-right" title="CRYPTIC_DRIP_TERMINAL.sh">
          <div className="space-y-3 text-base">
            <div className="flex">
              <span className="text-cyber-green font-bold">root@sephyx:~$</span>
              <span className="text-cyber-cyan ml-3 font-mono">access_vault --rank=initiate</span>
            </div>
            <div className="text-cyber-pink font-mono">
              &gt; SCANNING BIOMETRICS...
            </div>
            <div className="text-cyber-cyan font-mono">
              &gt; RANK_REQUIRED: <span className="text-cyber-purple font-bold">INITIATE+</span>
            </div>
            <div className="text-cyber-green font-mono">
              &gt; ACCESS_GRANTED
            </div>
            <div className="flex items-center mt-6">
              <span className="text-cyber-green font-bold">root@sephyx:~$</span>
              <span className="text-cyber-cyan ml-3 animate-terminal-cursor font-mono">_</span>
            </div>
          </div>
        </TerminalWindow>
        
        {/* Action Button */}
        <div className="flex justify-center">
          <Link href={storage.getVaultUnlocked() ? "/vault" : "/shop"}>
            <button className="modern-button bg-gradient-cyber hover:bg-gradient-neon text-white px-12 py-6 text-xl font-space font-bold uppercase tracking-[0.2em] group relative overflow-hidden">
              <span className="relative z-10">
                {storage.getVaultUnlocked() ? 'ENTER_VAULT' : 'EXPLORE_COLLECTION'}
              </span>
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
        
        {/* Stats Display */}
        {stats && (
          <div className="grid grid-cols-3 gap-12 max-w-2xl mx-auto">
            <div className="card-modern p-6 text-center">
              <div className="text-4xl font-orbitron font-black text-gradient-cyber mb-2">{stats.xp}</div>
              <div className="text-sm font-space uppercase tracking-wider text-gray-400">Experience Points</div>
            </div>
            <div className="card-modern p-6 text-center">
              <div className="text-4xl font-orbitron font-black text-gradient-neon mb-2">
                {formatTime(stats.timeSpent + sessionTime)}
              </div>
              <div className="text-sm font-space uppercase tracking-wider text-gray-400">Session Time</div>
            </div>
            <div className="card-modern p-6 text-center">
              <div className="text-4xl font-orbitron font-black text-gradient-digital mb-2">{stats.puzzlesSolved}</div>
              <div className="text-sm font-space uppercase tracking-wider text-gray-400">Puzzles Solved</div>
            </div>
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 space-y-4 animate-slide-in-right">
        {/* Status Indicator */}
        <TerminalWindow className="p-4 text-sm">
          <div className="text-cyber-green mb-2 font-bold">SYSTEM_STATUS</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Network:</span>
              <span className="text-cyber-cyan">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Vault:</span>
              <span className={storage.getVaultUnlocked() ? 'text-cyber-green' : 'text-cyber-red'}>
                {storage.getVaultUnlocked() ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
          </div>
        </TerminalWindow>
        
        {/* Quick Access */}
        <div className="space-y-3">
          <Link href="/shop">
            <button className="modern-button w-full bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 text-cyber-purple px-4 py-3 text-sm font-space font-semibold uppercase tracking-wider">
              COLLECTION
            </button>
          </Link>
          <button className="modern-button w-full bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan px-4 py-3 text-sm font-space font-semibold uppercase tracking-wider">
            CHRONICLES
          </button>
          <Link href="/admin">
            <button className="modern-button w-full bg-cyber-pink/10 hover:bg-cyber-pink/20 border border-cyber-pink/30 text-cyber-pink px-4 py-3 text-sm font-space font-semibold uppercase tracking-wider">
              ADMIN_PANEL
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
