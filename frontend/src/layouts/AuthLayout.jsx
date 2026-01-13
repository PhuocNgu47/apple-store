import { Outlet } from 'react-router-dom';

/**
 * AuthLayout - Layout cho trang login/register
 * Chỉ hiển thị content, không có navbar/footer
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Outlet />
    </div>
  );
}
