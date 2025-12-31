import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { productAPI, userAPI, orderAPI } from '../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      setError(null);
      const [productsRes, usersRes, ordersRes] = await Promise.all([
        productAPI.getAll({ limit: 1000 }).catch(() => ({ data: { products: [] } })),
        userAPI.getAll().catch(() => ({ data: [] })),
        orderAPI.getAll().catch(() => ({ data: { orders: [] } }))
      ]);

      const products = productsRes.data?.products || [];
      const users = usersRes.data || [];
      const orders = ordersRes.data?.orders || ordersRes.data || [];
      
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: products.length,
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🎛️ Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Xin chào, {user?.name}!</p>
          </div>
          <Link 
            to="/" 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Về Trang Chủ
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button onClick={fetchStats} className="ml-4 underline">Thử lại</button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng Sản Phẩm</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProducts}</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Người Dùng</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Đơn Hàng</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
                {stats.pendingOrders > 0 && (
                  <p className="text-xs text-orange-600 mt-1">⏳ {stats.pendingOrders} chờ xử lý</p>
                )}
              </div>
              <div className="text-4xl">🛒</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Doanh Thu</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Quản Lý Nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition">
                🛍️
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Quản Lý Sản Phẩm</h3>
                <p className="text-gray-500 text-sm">Thêm, sửa, xóa sản phẩm</p>
              </div>
            </div>
            <div className="mt-4 text-blue-600 text-sm font-medium group-hover:translate-x-1 transition">
              Xem tất cả →
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition">
                👥
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Quản Lý Người Dùng</h3>
                <p className="text-gray-500 text-sm">Phân quyền và quản lý tài khoản</p>
              </div>
            </div>
            <div className="mt-4 text-green-600 text-sm font-medium group-hover:translate-x-1 transition">
              Xem tất cả →
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group border border-gray-100 relative"
          >
            {stats.pendingOrders > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {stats.pendingOrders} mới
              </span>
            )}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition">
                📦
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Quản Lý Đơn Hàng</h3>
                <p className="text-gray-500 text-sm">Xử lý và cập nhật đơn hàng</p>
              </div>
            </div>
            <div className="mt-4 text-purple-600 text-sm font-medium group-hover:translate-x-1 transition">
              Xem tất cả →
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🍎 Apple Store Admin Panel | Đăng nhập với tài khoản: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}
