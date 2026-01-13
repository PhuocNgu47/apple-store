import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * AdminLayout - Layout chuyên biệt cho admin dashboard
 * Bao gồm: Admin header/sidebar, content area
 */
export default function AdminLayout() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect nếu không phải admin
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-white overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        {/* Sidebar content được thêm ở đây */}
      </aside>

      {/* Admin Content */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header */}
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <p className="text-gray-600">Welcome, {user?.name}</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
