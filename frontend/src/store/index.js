import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  
  addToCart: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(items));
    set({ items });
  },

  removeFromCart: (productId) => {
    const items = get().items.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(items));
    set({ items });
  },

  updateQuantity: (productId, quantity) => {
    const items = get().items;
    const item = items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        set({ items: items.filter(item => item.id !== productId) });
      } else {
        set({ items });
      }
    }
    localStorage.setItem('cart', JSON.stringify(get().items));
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
