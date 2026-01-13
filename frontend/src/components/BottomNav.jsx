import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../store';
import { FiHome, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const cartItems = useCartStore(state => state.items);

  const navItems = [
    { icon: FiHome, label: 'Trang chủ', path: '/', visible: true },
    { icon: FiShoppingCart, label: 'Giỏ hàng', path: '/cart', visible: true, badge: cartItems.length },
    { icon: FiUser, label: token ? 'Tài khoản' : 'Đăng nhập', path: token ? '/dashboard' : '/login', visible: true },
    { icon: FiMenu, label: 'Menu', path: '#menu', visible: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-16 h-16 transition ${
                isActive(item.path)
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon className="text-2xl" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
