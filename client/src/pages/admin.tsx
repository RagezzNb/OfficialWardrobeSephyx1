import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { storage } from '../lib/storage';
import { User, Order } from '../types';
import { type Product, type InsertProduct } from '@shared/schema';
import { apiRequest } from '../lib/queryClient';
import { TerminalWindow } from '../components/ui/terminal-window';
import { GlitchText } from '../components/ui/glitch-text';
import { generateId } from '../lib/crypto';

export default function Admin() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<InsertProduct>({
    title: '',
    price: 0,
    rarity: 'common',
    stock: 0,
    image: '',
    description: '',
    category: 'hoodies'
  });

  useEffect(() => {
    setIsAuthenticated(storage.getAdminSession());
    if (storage.getAdminSession()) {
      loadData();
    }
  }, []);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      return await apiRequest('/api/products', 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setNewProduct({
        title: '',
        price: 0,
        rarity: 'common',
        stock: 0,
        image: '',
        description: '',
        category: 'hoodies'
      });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProduct> }) => {
      return await apiRequest(`/api/products/${id}`, 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setEditingProduct(null);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/products/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    }
  });

  const loadData = () => {
    setUsers(storage.getUsers());
    setOrders(storage.getOrders());
  };

  const handleLogin = () => {
    if (username === 'admin1' && password === 'mash123') {
      storage.setAdminSession(true);
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    storage.setAdminSession(false);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleAddProduct = () => {
    if (newProduct.title.trim() === '' || newProduct.price <= 0) {
      alert('Please fill in all required fields');
      return;
    }
    createProductMutation.mutate(newProduct);
  };

  const handleUpdateProduct = (id: number, data: Partial<InsertProduct>) => {
    updateProductMutation.mutate({ id, data });
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const exportData = () => {
    const data = {
      users: storage.getUsers(),
      products: storage.getProducts(),
      orders: storage.getOrders(),
      timestamp: Date.now()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sephyx_backup.json';
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <TerminalWindow className="max-w-md w-full" title="ADMIN_LOGIN.exe">
          <div className="space-y-4">
            <h1 className="text-2xl font-orbitron font-black text-cyber-red text-center">
              <GlitchText>RESTRICTED_ACCESS</GlitchText>
            </h1>
            
            <div>
              <label className="block text-cyber-cyan text-sm font-space mb-1">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-cyber-dark border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 focus:outline-none focus:border-cyber-purple"
              />
            </div>
            
            <div>
              <label className="block text-cyber-cyan text-sm font-space mb-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-cyber-dark border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 focus:outline-none focus:border-cyber-purple"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-cyber-green hover:bg-cyber-cyan text-cyber-black py-2 font-space font-bold uppercase transition-all duration-300"
            >
              ACCESS_ADMIN
            </button>
          </div>
        </TerminalWindow>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-orbitron font-black text-cyber-green neon-glow">
            <GlitchText>ADMIN_PANEL</GlitchText>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-cyber-red hover:bg-cyber-pink text-cyber-black px-4 py-2 font-space font-bold uppercase"
          >
            LOGOUT
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          {['overview', 'products', 'users', 'orders', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-space uppercase text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-cyber-purple text-cyber-black'
                  : 'text-cyber-cyan hover:text-cyber-pink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <TerminalWindow title="STATS.log">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-cyber-cyan">Total Users:</span>
                  <span className="text-cyber-green">{users.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-cyan">Total Products:</span>
                  <span className="text-cyber-green">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-cyan">Total Orders:</span>
                  <span className="text-cyber-green">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-cyan">Revenue:</span>
                  <span className="text-cyber-green">
                    ${orders.reduce((sum, order) => sum + order.total, 0)}
                  </span>
                </div>
              </div>
            </TerminalWindow>

            <TerminalWindow title="QUICK_ACTIONS.exe">
              <div className="space-y-3">
                <button
                  onClick={addProduct}
                  className="w-full bg-cyber-purple hover:bg-cyber-pink text-cyber-black py-2 font-space uppercase"
                >
                  ADD_PRODUCT
                </button>
                <button
                  onClick={exportData}
                  className="w-full bg-cyber-cyan hover:bg-cyber-green text-cyber-black py-2 font-space uppercase"
                >
                  EXPORT_DATA
                </button>
                <button
                  onClick={() => storage.setVaultUnlocked(false)}
                  className="w-full bg-cyber-red hover:bg-cyber-pink text-cyber-black py-2 font-space uppercase"
                >
                  RESET_VAULT
                </button>
              </div>
            </TerminalWindow>

            <TerminalWindow title="SYSTEM_STATUS.log">
              <div className="space-y-2 text-sm">
                <div className="text-cyber-green">SYSTEM: ONLINE</div>
                <div className="text-cyber-cyan">VAULT: {storage.getVaultUnlocked() ? 'UNLOCKED' : 'LOCKED'}</div>
                <div className="text-cyber-purple">MUSIC: {storage.getMusicEnabled() ? 'ENABLED' : 'DISABLED'}</div>
                <div className="text-cyber-pink">ADMIN: ACTIVE</div>
              </div>
            </TerminalWindow>
          </div>
        )}

        {activeTab === 'products' && (
          <TerminalWindow title="PRODUCT_MANAGER.db">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-cyber-purple font-space uppercase">Product Inventory</h3>
                <button
                  onClick={handleAddProduct}
                  className="bg-cyber-green hover:bg-cyber-cyan text-cyber-black px-4 py-2 font-space uppercase"
                >
                  ADD_PRODUCT
                </button>
              </div>
              
              {/* Add Product Form */}
              <div className="mb-6 p-4 bg-cyber-black/30 border border-cyber-cyan/20">
                <h4 className="text-cyber-cyan font-space uppercase mb-3">Add New Product</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Title"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    className="bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                    className="bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                    className="bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                  />
                  <select
                    value={newProduct.rarity}
                    onChange={(e) => setNewProduct({...newProduct, rarity: e.target.value})}
                    className="bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                  >
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="legendary">Legendary</option>
                    <option value="mythic">Mythic</option>
                  </select>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                  >
                    <option value="hoodies">Hoodies</option>
                    <option value="masks">Masks</option>
                    <option value="jackets">Jackets</option>
                    <option value="pants">Pants</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows={3}
                  className="w-full mt-3 bg-cyber-black/40 border border-cyber-cyan/30 text-cyber-cyan px-3 py-2 text-sm"
                />
                <button
                  onClick={handleAddProduct}
                  disabled={createProductMutation.isPending}
                  className="mt-3 bg-cyber-green hover:bg-cyber-cyan text-cyber-black px-4 py-2 font-space uppercase disabled:opacity-50"
                >
                  {createProductMutation.isPending ? 'ADDING...' : 'ADD_PRODUCT'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyber-cyan/30">
                      <th className="text-left text-cyber-cyan py-2">TITLE</th>
                      <th className="text-left text-cyber-cyan py-2">PRICE</th>
                      <th className="text-left text-cyber-cyan py-2">STOCK</th>
                      <th className="text-left text-cyber-cyan py-2">RARITY</th>
                      <th className="text-left text-cyber-cyan py-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-cyber-cyan/10">
                        <td className="py-2 text-cyber-green">{product.title}</td>
                        <td className="py-2">${product.price}</td>
                        <td className="py-2">
                          <input
                            type="number"
                            value={product.stock}
                            onChange={(e) => updateProductStock(product.id, parseInt(e.target.value))}
                            className="w-20 bg-cyber-dark border border-cyber-cyan/30 text-cyber-cyan px-2 py-1"
                          />
                        </td>
                        <td className="py-2">{product.rarity}</td>
                        <td className="py-2">
                          <button className="text-cyber-red hover:text-cyber-pink">DELETE</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TerminalWindow>
        )}

        {activeTab === 'users' && (
          <TerminalWindow title="USER_MONITOR.db">
            <div className="space-y-4">
              <h3 className="text-cyber-purple font-space uppercase">Registered Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyber-cyan/30">
                      <th className="text-left text-cyber-cyan py-2">USERNAME</th>
                      <th className="text-left text-cyber-cyan py-2">XP</th>
                      <th className="text-left text-cyber-cyan py-2">RANK</th>
                      <th className="text-left text-cyber-cyan py-2">TIME_SPENT</th>
                      <th className="text-left text-cyber-cyan py-2">PUZZLES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-cyber-cyan/10">
                        <td className="py-2 text-cyber-green">{user.username}</td>
                        <td className="py-2">{user.xp}</td>
                        <td className="py-2">{user.rank}</td>
                        <td className="py-2">{Math.floor(user.timeSpent / 60)}m</td>
                        <td className="py-2">{user.puzzlesSolved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TerminalWindow>
        )}

        {activeTab === 'orders' && (
          <TerminalWindow title="ORDER_LOG.db">
            <div className="space-y-4">
              <h3 className="text-cyber-purple font-space uppercase">Order History</h3>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="border border-cyber-cyan/30 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-cyber-green font-space">ORDER #{order.id.slice(0, 8)}</div>
                        <div className="text-gray-400 text-sm">User: {order.username}</div>
                        <div className="text-gray-400 text-sm">
                          Date: {new Date(order.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-cyber-cyan font-orbitron">${order.total}</div>
                    </div>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.product.title} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TerminalWindow>
        )}

        {activeTab === 'settings' && (
          <TerminalWindow title="SYSTEM_CONFIG.ini">
            <div className="space-y-6">
              <div>
                <h3 className="text-cyber-purple font-space uppercase mb-4">Site Controls</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-cyan">Vault Access</span>
                    <button
                      onClick={() => storage.setVaultUnlocked(!storage.getVaultUnlocked())}
                      className={`px-4 py-2 font-space uppercase text-sm ${
                        storage.getVaultUnlocked() 
                          ? 'bg-cyber-green text-cyber-black' 
                          : 'bg-cyber-red text-white'
                      }`}
                    >
                      {storage.getVaultUnlocked() ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-cyber-purple font-space uppercase mb-4">Data Management</h3>
                <div className="space-y-3">
                  <button
                    onClick={exportData}
                    className="bg-cyber-cyan hover:bg-cyber-green text-cyber-black px-4 py-2 font-space uppercase"
                  >
                    EXPORT_BACKUP
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Clear all data? This cannot be undone.')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    className="bg-cyber-red hover:bg-cyber-pink text-cyber-black px-4 py-2 font-space uppercase ml-4"
                  >
                    CLEAR_ALL_DATA
                  </button>
                </div>
              </div>
            </div>
          </TerminalWindow>
        )}
      </div>
    </div>
  );
}
