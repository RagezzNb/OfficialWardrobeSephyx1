import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../hooks/use-cart';
import { type Product } from '@shared/schema';
import { PRODUCT_CATEGORIES } from '../lib/constants';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const { addToCart } = useCart();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const rarityMatch = selectedRarity === 'all' || product.rarity === selectedRarity;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && rarityMatch && priceMatch;
    });
  }, [products, selectedCategory, selectedRarity, priceRange]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-cyber-cyan';
      case 'legendary': return 'text-cyber-purple';
      case 'mythic': return 'text-cyber-pink';
      default: return 'text-gray-400';
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return;
    addToCart(product);
    (window as any).showNotification?.(`${product.title} added to vault`);
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-purple-400 font-space">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-space">Error loading products. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-orbitron font-black text-gradient-cyber neon-glow mb-6">
            COLLECTION_ACCESS
          </h1>
          <p className="text-xl text-gradient-neon font-space uppercase tracking-[0.3em] font-bold">
            Digital Fashion for the Underground
          </p>
          <div className="w-48 h-1 bg-gradient-cyber mx-auto mt-4 animate-pulse-glow"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-12 p-8 glass-morphism border border-cyber-cyan/20 animate-slide-in-left">
          <div className="flex-1 min-w-64">
            <label className="block text-cyber-cyan text-sm font-space font-semibold mb-3 uppercase tracking-wider">Category Filter</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full glass-morphism border border-cyber-cyan/30 text-cyber-cyan px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/20 transition-all duration-300"
            >
              <option value="all">ALL_CATEGORIES</option>
              {PRODUCT_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-64">
            <label className="block text-cyber-cyan text-sm font-space font-semibold mb-3 uppercase tracking-wider">Rarity Level</label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="w-full glass-morphism border border-cyber-cyan/30 text-cyber-cyan px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/20 transition-all duration-300"
            >
              <option value="all">ALL_RARITIES</option>
              <option value="common">COMMON</option>
              <option value="rare">RARE</option>
              <option value="legendary">LEGENDARY</option>
              <option value="mythic">MYTHIC</option>
            </select>
          </div>

          <div className="flex-1 min-w-64">
            <label className="block text-cyber-cyan text-sm font-space font-semibold mb-3 uppercase tracking-wider">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-cyber-dark rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="card-modern p-6 group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-square mb-6 overflow-hidden rounded-xl relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-space font-bold uppercase tracking-wider rounded-full ${getRarityColor(product.rarity)} bg-cyber-black/60 backdrop-blur-sm`}>
                  {product.rarity}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-space text-cyber-cyan text-xl font-bold">{product.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-orbitron text-cyber-green text-2xl font-black">${product.price}</span>
                  <span className="text-sm text-gray-400">
                    Stock: <span className={product.stock > 0 ? 'text-cyber-green' : 'text-cyber-red'}>
                      {product.stock > 0 ? product.stock : 'SOLD OUT'}
                    </span>
                  </span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                  className={`modern-button w-full py-4 text-sm font-space font-bold uppercase tracking-wider transition-all duration-300 ${
                    product.stock > 0
                      ? 'bg-gradient-cyber hover:bg-gradient-neon text-white'
                      : 'bg-gray-600/50 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  {product.stock > 0 ? 'ADD_TO_VAULT' : 'SOLD_OUT'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="glass-morphism p-12 max-w-md mx-auto">
              <div className="text-cyber-red font-space text-2xl font-bold mb-4">NO_ITEMS_FOUND</div>
              <div className="text-gray-400">Adjust your filters and try again</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
