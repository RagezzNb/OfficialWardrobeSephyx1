import { User, Product, Order, CartItem } from '../types';
import { INITIAL_PRODUCTS } from './constants';
import { generateId } from './crypto';

export class LocalStorage {
  private static instance: LocalStorage;

  static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  // Users
  getUsers(): User[] {
    const users = localStorage.getItem('sephyx_users');
    return users ? JSON.parse(users) : [];
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('sephyx_users', JSON.stringify(users));
  }

  getUserByUsername(username: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.username === username) || null;
  }

  // Current session
  getCurrentUser(): User | null {
    const userId = localStorage.getItem('sephyx_current_user');
    if (!userId) return null;
    const users = this.getUsers();
    return users.find(u => u.id === userId) || null;
  }

  setCurrentUser(userId: string | null): void {
    if (userId) {
      localStorage.setItem('sephyx_current_user', userId);
    } else {
      localStorage.removeItem('sephyx_current_user');
    }
  }

  // Products
  getProducts(): Product[] {
    const products = localStorage.getItem('sephyx_products');
    if (!products) {
      // Initialize with default products
      const initialProducts = INITIAL_PRODUCTS.map(p => ({ ...p, id: generateId() }));
      this.saveProducts(initialProducts);
      return initialProducts;
    }
    return JSON.parse(products);
  }

  saveProducts(products: Product[]): void {
    localStorage.setItem('sephyx_products', JSON.stringify(products));
  }

  updateProductStock(productId: string, newStock: number): void {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
      this.saveProducts(products);
    }
  }

  // Cart
  getCart(): CartItem[] {
    const cart = localStorage.getItem('sephyx_cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem('sephyx_cart', JSON.stringify(cart));
  }

  // Orders
  getOrders(): Order[] {
    const orders = localStorage.getItem('sephyx_orders');
    return orders ? JSON.parse(orders) : [];
  }

  saveOrder(order: Order): void {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem('sephyx_orders', JSON.stringify(orders));
  }

  // Settings
  getMusicEnabled(): boolean {
    return localStorage.getItem('sephyx_music_enabled') === 'true';
  }

  setMusicEnabled(enabled: boolean): void {
    localStorage.setItem('sephyx_music_enabled', enabled.toString());
  }

  // Vault unlock
  getVaultUnlocked(): boolean {
    return localStorage.getItem('sephyx_vault_unlocked') === 'true';
  }

  setVaultUnlocked(unlocked: boolean): void {
    localStorage.setItem('sephyx_vault_unlocked', unlocked.toString());
  }

  // Admin session
  getAdminSession(): boolean {
    return localStorage.getItem('sephyx_admin_session') === 'true';
  }

  setAdminSession(active: boolean): void {
    if (active) {
      localStorage.setItem('sephyx_admin_session', 'true');
    } else {
      localStorage.removeItem('sephyx_admin_session');
    }
  }
}

export const storage = LocalStorage.getInstance();
