import { useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import { useUserStats } from '../hooks/use-user-stats';
import { TerminalWindow } from '../components/ui/terminal-window';
import { GlitchText } from '../components/ui/glitch-text';

export default function Vault() {
  const [hasAccess, setHasAccess] = useState(false);
  const [secretCodes] = useState([
    { code: 'NEON_DREAMS', description: 'Unlock exclusive hoodie colorway', reward: 'Exclusive Color Variant' },
    { code: 'GLITCH_MATRIX', description: 'Access to limited mask collection', reward: '20% Discount Code' },
    { code: 'CYBER_PUNK_2077', description: 'Legendary jacket unlock', reward: 'VIP Early Access' }
  ]);
  const { solvePuzzle } = useUserStats();

  useEffect(() => {
    setHasAccess(storage.getVaultUnlocked());
  }, []);

  const handleCodeRedeem = (code: string) => {
    solvePuzzle();
    (window as any).showNotification?.(`CODE_REDEEMED: ${code}`);
  };

  if (!hasAccess) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <TerminalWindow className="max-w-2xl text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-orbitron font-black text-cyber-red">
              <GlitchText>ACCESS_DENIED</GlitchText>
            </h1>
            <div className="text-cyber-cyan font-space">
              VAULT_LOCKED: Insufficient clearance level
            </div>
            <div className="text-gray-400 text-sm">
              Solve puzzles and gain XP to unlock vault access
            </div>
            <div className="text-cyber-purple text-xs">
              Hint: Try the Konami code on the homepage...
            </div>
          </div>
        </TerminalWindow>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-black text-cyber-green neon-glow mb-4">
            <GlitchText>VAULT_ACCESS_GRANTED</GlitchText>
          </h1>
          <p className="text-cyber-cyan font-space uppercase tracking-wider">
            Welcome to the Inner Circle
          </p>
        </div>

        <div className="grid gap-8">
          {/* Hidden Items */}
          <TerminalWindow title="CLASSIFIED_ITEMS.db">
            <div className="space-y-4">
              <h3 className="text-cyber-purple font-space uppercase">Vault Exclusives</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-cyber-cyan/30 p-4 rounded">
                  <div className="text-cyber-green font-space">Shadow Cloak</div>
                  <div className="text-gray-400 text-sm">Legendary stealth gear</div>
                  <div className="text-cyber-cyan">$199 - VAULT ONLY</div>
                </div>
                <div className="border border-cyber-cyan/30 p-4 rounded">
                  <div className="text-cyber-green font-space">Neural Interface</div>
                  <div className="text-gray-400 text-sm">Direct brain-computer link</div>
                  <div className="text-cyber-cyan">$299 - VAULT ONLY</div>
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* Discount Codes */}
          <TerminalWindow title="DISCOUNT_CODES.enc">
            <div className="space-y-4">
              <h3 className="text-cyber-purple font-space uppercase">Active Discount Codes</h3>
              <div className="space-y-3">
                {secretCodes.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-cyber-cyan/20 rounded">
                    <div>
                      <div className="text-cyber-green font-space">{item.code}</div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                    <button
                      onClick={() => handleCodeRedeem(item.code)}
                      className="bg-cyber-purple hover:bg-cyber-pink text-cyber-black px-3 py-1 text-xs font-space uppercase"
                    >
                      REDEEM
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TerminalWindow>

          {/* Lore */}
          <TerminalWindow title="SEPHYX_LORE.txt">
            <div className="space-y-4">
              <h3 className="text-cyber-purple font-space uppercase">The Underground Chronicles</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  In the neon-soaked streets of Neo Tokyo, where corporate towers pierce the digital sky,
                  a resistance was born. SEPHYX emerged from the shadows of the underground fashion scene,
                  creating garments that serve as both style statements and tools of rebellion.
                </p>
                <p>
                  Each piece is crafted with quantum-encrypted fibers that shimmer with otherworldly energy.
                  The founders, known only by their handles - N30N_K1NG and GL1TCH_QU33N - remain hidden
                  in the depths of the dark web, communicating only through coded messages and limited drops.
                </p>
                <p>
                  Those who wear SEPHYX don't just wear clothes - they become part of a digital collective,
                  a network of cyber-rebels working to disrupt the corporate fashion monopoly.
                  Every purchase is a vote for freedom, every piece worn is an act of defiance.
                </p>
                <div className="text-cyber-cyan font-space mt-4">
                  "Fashion is the weapon. Style is the revolution." - N30N_K1NG
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* Achievement Badges */}
          <TerminalWindow title="ACHIEVEMENTS.log">
            <div className="space-y-4">
              <h3 className="text-cyber-purple font-space uppercase">Unlocked Achievements</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-cyber-green/30 rounded">
                  <div className="text-2xl mb-2">🔓</div>
                  <div className="text-cyber-green font-space text-sm">VAULT_ACCESS</div>
                  <div className="text-gray-400 text-xs">Unlocked the vault</div>
                </div>
                <div className="text-center p-4 border border-cyber-cyan/30 rounded opacity-50">
                  <div className="text-2xl mb-2">👑</div>
                  <div className="text-cyber-cyan font-space text-sm">CYBER_LORD</div>
                  <div className="text-gray-400 text-xs">Reach maximum rank</div>
                </div>
                <div className="text-center p-4 border border-cyber-pink/30 rounded opacity-50">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-cyber-pink font-space text-sm">LEGENDARY</div>
                  <div className="text-gray-400 text-xs">Complete all challenges</div>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </div>
  );
}
