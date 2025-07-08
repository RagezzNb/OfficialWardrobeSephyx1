export const PRODUCT_CATEGORIES = [
  'hoodies',
  'masks',
  'accessories',
  'jackets',
  'pants'
];

export const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080'
];

export const SYSTEM_MESSAGES = [
  "VAULT ACCESS DETECTED",
  "GLITCHWAVE SYNCED", 
  "ERROR: REALITY BREACHED",
  "INITIATE PROTOCOL ACTIVATED",
  "NEURAL LINK ESTABLISHED",
  "ENCRYPTION BYPASSED",
  "UNDERGROUND ACCESS GRANTED"
];

export const CHATBOT_RESPONSES = {
  default: [
    "The underground runs deeper than you think, initiate.",
    "Style is rebellion. Fashion is resistance.",
    "Ready to ascend the ranks?",
    "The vault holds secrets for those worthy.",
    "What brings you to the shadows?"
  ],
  fashion: [
    "Our latest drop features quantum-encrypted hoodies.",
    "Cybermasks provide anonymity in the digital realm.",
    "Each piece carries the energy of the underground.",
    "Rare items unlock only for proven initiates."
  ],
  vault: [
    "The vault requires INITIATE+ rank or higher.",
    "Solve the terminal puzzles to gain access.",
    "Hidden codes unlock exclusive content.",
    "↑↑↓↓←→←→BA - some say this opens doors."
  ],
  rank: [
    "XP comes from time spent and puzzles solved.",
    "Higher ranks unlock exclusive vault access.",
    "NEON_THIEF status grants special privileges.",
    "Prove your worth in the digital underground."
  ]
};

export const INITIAL_PRODUCTS: Omit<import('../types').Product, 'id'>[] = [
  {
    title: "NEON GHOST HOODIE",
    price: 89,
    rarity: "rare",
    stock: 5,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Digital camouflage hoodie with reactive neon fibers",
    category: "hoodies"
  },
  {
    title: "CYBER INFILTRATOR MASK",
    price: 45,
    rarity: "common",
    stock: 12,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Tactical face covering with built-in voice modulator",
    category: "masks"
  },
  {
    title: "QUANTUM GLOVES",
    price: 67,
    rarity: "legendary",
    stock: 3,
    image: "https://images.unsplash.com/photo-1544966503-7cc536d4fa75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Enhanced dexterity gloves with haptic feedback",
    category: "accessories"
  },
  {
    title: "SHADOW RUNNER JACKET",
    price: 125,
    rarity: "legendary",
    stock: 2,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Stealth jacket with thermal regulation",
    category: "jackets"
  },
  {
    title: "CIRCUIT BREAKER PANTS",
    price: 78,
    rarity: "rare",
    stock: 7,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Cargo pants with integrated tech compartments",
    category: "pants"
  },
  {
    title: "VOID WALKER BOOTS",
    price: 95,
    rarity: "rare",
    stock: 4,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Silent step boots with shock absorption",
    category: "accessories"
  },
  {
    title: "NEURAL LINK HEADSET",
    price: 156,
    rarity: "mythic",
    stock: 1,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Direct neural interface headset (experimental)",
    category: "accessories"
  },
  {
    title: "PLASMA EDGE HOODIE",
    price: 112,
    rarity: "legendary",
    stock: 3,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Energy-infused hoodie with reactive patterns",
    category: "hoodies"
  },
  {
    title: "DIGITAL PHANTOM HOODIE",
    price: 94,
    rarity: "rare",
    stock: 6,
    image: "https://images.unsplash.com/photo-1556821840-3a9fbc6339b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Holographic pattern hoodie with smart fabric technology",
    category: "hoodies"
  },
  {
    title: "CYBER PUNK BOMBER",
    price: 148,
    rarity: "legendary",
    stock: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "LED-embedded bomber jacket with reactive lighting",
    category: "jackets"
  },
  {
    title: "NEON STREET PANTS",
    price: 85,
    rarity: "rare",
    stock: 8,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Reflective stripe pants with flex technology",
    category: "pants"
  },
  {
    title: "HACKER ELITE MASK",
    price: 72,
    rarity: "rare",
    stock: 9,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    description: "Anonymous style mask with digital display",
    category: "masks"
  }
];
