import { db } from '../server/db';
import { products } from '../shared/schema';

const seedProducts = [
  {
    title: "VOID HOODIE",
    price: 149.99,
    rarity: "legendary",
    stock: 15,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    description: "Premium heavyweight hoodie with embedded LED fiber optics. Responds to sound and movement with dynamic light patterns.",
    category: "hoodies"
  },
  {
    title: "REBEL MASK",
    price: 89.99,
    rarity: "rare",
    stock: 25,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Cyberpunk-inspired face mask with integrated air filtration and holographic display.",
    category: "masks"
  },
  {
    title: "NEON JACKET",
    price: 249.99,
    rarity: "mythic",
    stock: 5,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Limited edition jacket with reactive neon strips and temperature regulation system.",
    category: "jackets"
  },
  {
    title: "CYBER PANTS",
    price: 119.99,
    rarity: "common",
    stock: 50,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
    description: "Tactical cargo pants with built-in device charging ports and hidden pockets.",
    category: "pants"
  },
  {
    title: "GLITCH GLOVES",
    price: 69.99,
    rarity: "rare",
    stock: 30,
    image: "https://images.unsplash.com/photo-1586985289906-406988974504?w=400&h=400&fit=crop",
    description: "Haptic feedback gloves with fingerprint scanner and gesture control capabilities.",
    category: "accessories"
  },
  {
    title: "STREET HOODIE",
    price: 99.99,
    rarity: "common",
    stock: 75,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    description: "Classic streetwear hoodie with graffiti-inspired artwork and premium cotton blend.",
    category: "hoodies"
  },
  {
    title: "HACKER MASK",
    price: 129.99,
    rarity: "legendary",
    stock: 12,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
    description: "Anonymous-style mask with voice modulation and identity protection features.",
    category: "masks"
  },
  {
    title: "PUNK JACKET",
    price: 199.99,
    rarity: "rare",
    stock: 20,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    description: "Distressed leather jacket with studs, patches, and customizable LED strips.",
    category: "jackets"
  }
];

async function seedDatabase() {
  try {
    console.log('Seeding database with products...');
    
    // Insert products
    await db.insert(products).values(seedProducts);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();