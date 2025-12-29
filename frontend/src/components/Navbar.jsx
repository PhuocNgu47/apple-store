import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../store';

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const cartItems = useCartStore(state => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-blue-600">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-4xl">🍎</span>
          <span className="text-gray-900">Apple Store</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            📱 Sản Phẩm
          </Link>
          <Link to="/cart" className="relative">
            <span className="text-gray-700 hover:text-blue-600 font-medium transition">
              🛒 Giỏ Hàng
            </span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {token ? (
            <>
              <Link to="/orders" className="text-gray-700 hover:text-blue-600 font-medium transition">
                📦 Đơn Hàng
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="text-gray-700 hover:text-blue-600 font-semibold bg-yellow-100 px-3 py-1 rounded-full transition">
                  ⚙️ Admin Panel
                </Link>
              )}
              <div className="flex items-center gap-3 border-l pl-6">
                <div>
                  <p className="text-gray-700 font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="btn btn-secondary px-4 py-2 text-sm"
                >
                  Đăng Xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Đăng Nhập
              </Link>
              <Link to="/register" className="btn btn-primary">
                Đăng Ký
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t p-4 space-y-2">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
            📱 Sản Phẩm
          </Link>
          <Link to="/cart" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
            🛒 Giỏ Hàng ({cartItems.length})
          </Link>
          {token ? (
            <>
              <Link to="/orders" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                📦 Đơn Hàng
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="block py-2 text-gray-700 hover:text-blue-600 font-semibold bg-yellow-100 rounded">
                  ⚙️ Admin Panel
                </Link>
              )}
              <div className="py-2 border-t mt-2 pt-2">
                <p className="text-gray-700 font-medium mb-1">{user?.name}</p>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn btn-secondary text-left py-2 text-sm"
                >
                  Đăng Xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="block btn btn-secondary py-2 text-center">
                Đăng Nhập
              </Link>
              <Link to="/register" className="block btn btn-primary py-2 text-center">
                Đăng Ký
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
