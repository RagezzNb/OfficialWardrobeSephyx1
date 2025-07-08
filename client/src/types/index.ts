export interface User {
  id: string;
  username: string;
  passwordHash: string;
  xp: number;
  rank: string;
  timeSpent: number;
  puzzlesSolved: number;
  vaultUnlocked: boolean;
  createdAt: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  rarity: 'common' | 'rare' | 'legendary' | 'mythic';
  stock: number;
  size?: string;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: number;
  username: string;
}

export interface UserStats {
  xp: number;
  rank: string;
  timeSpent: number;
  puzzlesSolved: number;
  vaultUnlocked: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

export interface Notification {
  id: string;
  text: string;
  timestamp: number;
}

export const RANKS = [
  { name: 'INITIATE', minXP: 0, color: 'text-cyber-purple' },
  { name: 'NEON_THIEF', minXP: 100, color: 'text-cyber-cyan' },
  { name: 'GLITCH_RUNNER', minXP: 500, color: 'text-cyber-pink' },
  { name: 'VAULT_KEEPER', minXP: 1500, color: 'text-cyber-green' },
  { name: 'CYBER_LORD', minXP: 5000, color: 'text-cyber-red' }
];
