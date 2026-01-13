import { useState, useEffect } from 'react';
import { orderAPI } from '../../../api';

/**
 * useUserStats Hook
 * Custom hook để fetch thống kê của user (số đơn hàng, tổng chi tiêu, etc.)
 */
export function useUserStats() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    memberStatus: 'Khách Hàng'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await orderAPI.getAll();
        const orders = response.data.orders || response.data || [];
        
        const totalOrders = orders.length;
        const completedOrders = orders.filter(o => o.status === 'delivered').length;
        const totalSpent = orders
          .filter(o => o.status === 'delivered')
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        setStats({
          totalOrders,
          completedOrders,
          totalSpent: totalSpent.toFixed(2),
          memberStatus: totalSpent > 1000 ? 'VIP' : totalSpent > 500 ? 'Thành Viên' : 'Khách Hàng'
        });
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}

