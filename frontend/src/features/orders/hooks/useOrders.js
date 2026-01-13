import { useState, useEffect } from 'react';
import { orderAPI } from '../../../api';

/**
 * useOrders Hook
 * Custom hook để fetch và quản lý danh sách đơn hàng của user
 */
export function useOrders(token) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await orderAPI.getAll();
      // Backend trả về { orders: [...] }
      const ordersData = response.data.orders || response.data || [];
      setOrders(ordersData);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Không thể tải đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
}

