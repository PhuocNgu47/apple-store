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
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="text-4xl">🍎</span>
            <span className="hidden text-2xl font-bold text-gray-900 font-poppins sm:inline">
              Apple Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 md:flex">
            <Link 
              to="/" 
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              📱 Sản Phẩm
            </Link>

            <Link to="/cart" className="relative group">
              <span className="font-medium text-gray-700 transition hover:text-blue-600">
                🛒 Giỏ Hàng
              </span>
              {cartItems.length > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-3">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {token ? (
              <>
                <Link 
                  to="/orders" 
                  className="font-medium text-gray-700 transition hover:text-blue-600"
                >
                  📦 Đơn Hàng
                </Link>

                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="px-3 py-1 font-semibold text-yellow-700 transition bg-yellow-100 rounded-full hover:bg-yellow-200"
                  >
                    ⚙️ Admin
                  </Link>
                )}

                <div className="flex items-center gap-3 pl-6 border-l">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
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
            className="text-3xl text-gray-700 transition md:hidden hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="p-4 space-y-3 border-t md:hidden bg-gray-50 animate-slide-up">
            <Link 
              to="/" 
              className="block py-2 font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              📱 Sản Phẩm
            </Link>

            <Link 
              to="/cart" 
              className="block py-2 font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              🛒 Giỏ Hàng ({cartItems.length})
            </Link>

            {token ? (
              <>
                <Link 
                  to="/orders" 
                  className="block py-2 font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📦 Đơn Hàng
                </Link>

                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 font-semibold text-yellow-700 bg-yellow-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}

                <div className="py-2 pt-3 border-t">
                  <p className="mb-2 font-medium text-gray-900">{user?.name}</p>
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
              <div className="pt-3 space-y-2 border-t">
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
