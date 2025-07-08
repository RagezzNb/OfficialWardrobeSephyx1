import { useState, useEffect } from 'react';
import { RANKS } from '../types';
import { useAuth } from './use-auth';

export function useUserStats() {
  const { user, updateUser } = useAuth();
  const [sessionStart] = useState(Date.now());

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const sessionTime = Math.floor((Date.now() - sessionStart) / 1000);
      const newTotalTime = user.timeSpent + sessionTime;
      updateUser({ timeSpent: newTotalTime });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [user, sessionStart, updateUser]);

  const addXP = (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newRank = getCurrentRank(newXP);
    updateUser({ xp: newXP, rank: newRank });
  };

  const solvePuzzle = () => {
    if (!user) return;
    addXP(50);
    updateUser({ puzzlesSolved: user.puzzlesSolved + 1 });
  };

  const getCurrentRank = (xp: number) => {
    const rank = RANKS.slice().reverse().find(r => xp >= r.minXP);
    return rank?.name || 'INITIATE';
  };

  const getRankColor = (rankName: string) => {
    const rank = RANKS.find(r => r.name === rankName);
    return rank?.color || 'text-cyber-purple';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    stats: user ? {
      xp: user.xp,
      rank: user.rank,
      timeSpent: user.timeSpent,
      puzzlesSolved: user.puzzlesSolved,
      vaultUnlocked: user.vaultUnlocked
    } : null,
    addXP,
    solvePuzzle,
    getCurrentRank,
    getRankColor,
    formatTime
  };
}
