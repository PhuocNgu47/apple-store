/**
 * Protected Route Components
 * Các component để bảo vệ routes, yêu cầu authentication
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';

/**
 * ProtectedRoute Component
 * Bảo vệ route - chỉ cho phép truy cập khi đã đăng nhập
 * 
 * Cách sử dụng:
 * <Route path="/protected" element={
 *   <ProtectedRoute>
 *     <YourComponent />
 *   </ProtectedRoute>
 * } />
 * 
 * @param {React.ReactNode} children - Component con cần được bảo vệ
 * @returns {React.ReactNode} - Component hoặc redirect đến login
 */
export function ProtectedRoute({ children }) {
  const token = useAuthStore(state => state.token);
  const isLoading = useAuthStore(state => state.isLoading);

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Đang xác thực phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  // Nếu chưa có token (chưa đăng nhập) -> redirect đến trang login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập -> hiển thị component
  return children;
}

/**
 * AdminRoute Component
 * Bảo vệ route admin - chỉ cho phép truy cập khi đã đăng nhập VÀ có role admin
 * 
 * Cách sử dụng:
 * <Route path="/admin" element={
 *   <AdminRoute>
 *     <AdminComponent />
 *   </AdminRoute>
 * } />
 * 
 * @param {React.ReactNode} children - Component con cần được bảo vệ
 * @returns {React.ReactNode} - Component hoặc redirect
 */
export function AdminRoute({ children }) {
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Đang xác thực quyền admin...</p>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập -> redirect đến trang login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu không phải admin -> redirect về trang chủ
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Đã đăng nhập và là admin -> hiển thị component
  return children;
}
