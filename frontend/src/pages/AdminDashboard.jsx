import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { statisticsAPI } from '../api';
import { formatCurrency } from '../utils';
import Loader from '../components/UI/Loader';
import {
  StatsCard,
  OrderStatusChart,
  RecentOrdersList,
  QuickActions,
  LowStockAlert
} from '../features/admin';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    orderStats: [],
    productStats: {},
    recentOrders: []
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
      const [overviewRes, ordersRes, productsRes, recentOrdersRes] = await Promise.all([
        statisticsAPI.getOverview().catch(() => ({ data: { stats: {} } })),
        statisticsAPI.getOrders().catch(() => ({ data: { data: [] } })),
        statisticsAPI.getProducts().catch(() => ({ data: { data: {} } })),
        statisticsAPI.getRecentOrders(5).catch(() => ({ data: { orders: [] } }))
      ]);

      const overview = overviewRes.data?.stats || {};
      const orderStats = ordersRes.data?.data || [];
      const productStats = productsRes.data?.data || {};
      const recentOrders = recentOrdersRes.data?.orders || [];

      setStats({
        totalProducts: overview.totalProducts || 0,
        totalUsers: overview.totalUsers || 0,
        totalOrders: overview.totalOrders || 0,
        totalRevenue: overview.totalRevenue || 0,
        pendingOrders: overview.pendingOrders || 0,
        lowStockProducts: overview.lowStockProducts || 0,
        orderStats,
        productStats,
        recentOrders
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
        <Loader size="lg" text="Đang tải..." fullScreen={false} />
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
          <StatsCard
            title="Tổng Sản Phẩm"
            value={stats.totalProducts}
            icon="📦"
            borderColor="border-blue-500"
          />
          <StatsCard
            title="Người Dùng"
            value={stats.totalUsers}
            icon="👥"
            borderColor="border-green-500"
          />
          <StatsCard
            title="Đơn Hàng"
            value={stats.totalOrders}
            icon="🛒"
            borderColor="border-purple-500"
            subtitle={stats.pendingOrders > 0 ? `⏳ ${stats.pendingOrders} chờ xử lý` : null}
          />
          <StatsCard
            title="Doanh Thu"
            value={formatCurrency(stats.totalRevenue, 'VND')}
            icon="💰"
            borderColor="border-orange-500"
          />
        </div>

        {/* Low Stock Alert */}
        <LowStockAlert lowStockCount={stats.lowStockProducts} />

        {/* Order Status Chart */}
        <OrderStatusChart orderStats={stats.orderStats} />

        {/* Recent Orders */}
        <RecentOrdersList orders={stats.recentOrders} limit={5} />

        {/* Quick Actions */}
        <QuickActions pendingOrders={stats.pendingOrders} />

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🍎 Apple Store Admin Panel | Đăng nhập với tài khoản: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}
