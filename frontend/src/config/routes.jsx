import { ProtectedRoute, AdminRoute } from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import OrderSuccess from '../pages/OrderSuccess';
import ProductDetail from '../pages/ProductDetail';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminUsers from '../pages/AdminUsers';
import AdminOrders from '../pages/AdminOrders';
import PaymentQR from '../pages/PaymentQR';

/**
 * Routes Configuration
 */

// Public routes - Dùng MainLayout
export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/product/:id', element: <ProductDetail /> },
  { path: '/cart', element: <Cart /> },
  { path: '/order-success', element: <OrderSuccess /> },
];

// Auth routes - Dùng AuthLayout
export const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

// Protected routes - Dùng MainLayout + ProtectedRoute
export const protectedRoutes = [
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: '/payment/:orderId',
    element: (
      <ProtectedRoute>
        <PaymentQR />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

// Admin routes - Dùng AdminLayout + AdminRoute
export const adminRoutes = [
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <AdminRoute>
        <AdminProducts />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminRoute>
        <AdminUsers />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <AdminRoute>
        <AdminOrders />
      </AdminRoute>
    ),
  },
];

export const routesByLayout = {
  main: {
    routes: [...publicRoutes, ...protectedRoutes],
  },
  auth: {
    routes: authRoutes,
  },
  admin: {
    routes: adminRoutes,
  },
};
