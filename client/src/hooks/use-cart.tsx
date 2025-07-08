import { useState, useEffect } from 'react';
import { CartItem, Product, Order } from '../types';
import { storage } from '../lib/storage';
import { generateId } from '../lib/crypto';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = storage.getCart();
    setCart(savedCart);
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity }];
    }

    setCart(newCart);
    storage.saveCart(newCart);

    // Update product stock
    storage.updateProductStock(product.id, product.stock - quantity);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    setCart(newCart);
    storage.saveCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    setCart(newCart);
    storage.saveCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    storage.saveCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = (username: string): string => {
    if (cart.length === 0) return '';

    const order: Order = {
      id: generateId(),
      items: [...cart],
      total: getTotal(),
      timestamp: Date.now(),
      username
    };

    storage.saveOrder(order);
    clearCart();

    // Generate order message
    let orderMessage = 'ORDER DETAILS:\n';
    order.items.forEach(item => {
      orderMessage += `- ${item.product.title} (${item.quantity}x) – $${item.product.price * item.quantity}\n`;
    });
    orderMessage += `TOTAL: $${order.total}\n\n`;
    orderMessage += 'Send this + your name & address to us on Instagram: @sephyxofficial';

    return orderMessage;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    checkout
  };
}
