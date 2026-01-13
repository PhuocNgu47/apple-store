/**
 * App Component
 * Component chính của ứng dụng, setup routing và authentication
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout, AuthLayout, AdminLayout } from './layouts';
import {
  publicRoutes,
  authRoutes,
  protectedRoutes,
  adminRoutes,
} from './config/routes';
import { authAPI, userAPI } from './api';
import { useAuthStore } from './store';

function App() {
  // Lấy các actions và state từ auth store
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  const setLoading = useAuthStore(state => state.setLoading);

  /**
   * Hydrate user từ token khi app khởi động
   * Kiểm tra token có hợp lệ không và load thông tin user
   * Giúp user không bị logout khi refresh trang
   */
  useEffect(() => {
    const hydrateUser = async () => {
      // Nếu không có token, không cần làm gì
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Verify token với server
        await authAPI.verify();
        
        // Lấy thông tin profile của user
        const profileResponse = await userAPI.getProfile();
        setUser(profileResponse.data);
      } catch (error) {
        // Token không hợp lệ hoặc hết hạn -> logout
        console.error('Hydrate user error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, [token, setUser, logout, setLoading]);

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Routes với Main Layout (Navbar + Footer) */}
          <Route element={<MainLayout />}>
            {/* Public routes - không cần đăng nhập */}
            {publicRoutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} 
              />
            ))}
            {/* Protected routes - cần đăng nhập */}
            {protectedRoutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} 
              />
            ))}
          </Route>

          {/* Routes với Auth Layout (Form login/register) */}
          <Route element={<AuthLayout />}>
            {authRoutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} 
              />
            ))}
          </Route>

          {/* Routes với Admin Layout (Dashboard admin) */}
          <Route element={<AdminLayout />}>
            {adminRoutes.map(route => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} 
              />
            ))}
          </Route>
        </Routes>

        {/* Toast Notifications - Hiển thị thông báo */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#fff' },
            },
          }}
        />
      </Router>
    </HelmetProvider>
  );
}

export default App;
