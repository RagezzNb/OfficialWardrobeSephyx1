import { useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../lib/storage';
import { hashPassword, verifyPassword, generateId } from '../lib/crypto';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const existingUser = storage.getUserByUsername(username);
    if (!existingUser) {
      return false;
    }

    const isValid = await verifyPassword(password, existingUser.passwordHash);
    if (!isValid) {
      return false;
    }

    storage.setCurrentUser(existingUser.id);
    setUser(existingUser);
    return true;
  };

  const signup = async (username: string, password: string): Promise<boolean> => {
    const existingUser = storage.getUserByUsername(username);
    if (existingUser) {
      return false;
    }

    const passwordHash = await hashPassword(password);
    const newUser: User = {
      id: generateId(),
      username,
      passwordHash,
      xp: 0,
      rank: 'INITIATE',
      timeSpent: 0,
      puzzlesSolved: 0,
      vaultUnlocked: false,
      createdAt: Date.now()
    };

    storage.saveUser(newUser);
    storage.setCurrentUser(newUser.id);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    storage.setCurrentUser(null);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    storage.saveUser(updatedUser);
    setUser(updatedUser);
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user
  };
}
