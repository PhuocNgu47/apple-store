import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../store';
import { Button, FlexBetween, Container } from './UI';

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const cartItems = useCartStore(state => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-blue-600 shadow-md">
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-4xl">🍎</span>
            <span className="text-2xl font-poppins font-bold text-gray-900 hidden sm:inline">
              Apple Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              📱 Sản Phẩm
            </Link>

            <Link to="/cart" className="relative group">
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
                <Link 
                  to="/orders" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  📦 Đơn Hàng
                </Link>

                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/products" 
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold hover:bg-yellow-200 transition"
                  >
                    ⚙️ Admin
                  </Link>
                )}

                <div className="flex items-center gap-3 border-l pl-6">
                  <div>
                    <p className="text-gray-900 font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {user?.role === 'admin' ? 'Administrator' : 'Khách hàng'}
                    </p>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="secondary" 
                  size="md"
                  onClick={() => navigate('/login')}
                >
                  Đăng Nhập
                </Button>
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={() => navigate('/register')}
                >
                  Đăng Ký
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-3xl text-gray-700 hover:text-blue-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t p-4 space-y-3 animate-slide-up">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              📱 Sản Phẩm
            </Link>

            <Link 
              to="/cart" 
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              🛒 Giỏ Hàng ({cartItems.length})
            </Link>

            {token ? (
              <>
                <Link 
                  to="/orders" 
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📦 Đơn Hàng
                </Link>

                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/products" 
                    className="block py-2 px-3 bg-yellow-100 text-yellow-700 rounded font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}

                <div className="py-2 border-t pt-3">
                  <p className="text-gray-900 font-medium mb-2">{user?.name}</p>
                  <Button 
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2 border-t pt-3">
                <Button 
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Đăng Nhập
                </Button>
                <Button 
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                >
                  Đăng Ký
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
}
