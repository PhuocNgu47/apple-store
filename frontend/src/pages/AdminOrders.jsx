import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { orderAPI } from '../api';
import Loader from '../components/UI/Loader';
import { OrdersTable, OrderDetailsSidebar } from '../features/admin';

export default function AdminOrders() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data.orders || response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      alert('Cập nhật trạng thái thành công!');
      fetchOrders();
      // Update selected order
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Cập nhật trạng thái thất bại');
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
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/admin" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            ← Quay lại
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">📦 Quản Lý Đơn Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <OrdersTable
              orders={orders}
              selectedOrderId={selectedOrder?._id}
              onOrderSelect={setSelectedOrder}
            />

            {/* Summary */}
            <div className="mt-4 text-gray-600 text-sm">
              Tổng cộng: <strong>{orders.length}</strong> đơn hàng
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="lg:col-span-1">
            <OrderDetailsSidebar
              order={selectedOrder}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
