import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { userAPI } from '../api';

export default function AdminUsers() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userAPI.updateRole(userId, newRole);
      alert('Cập nhật vai trò thành công!');
      fetchUsers();
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Cập nhật vai trò thất bại');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === user._id) {
      alert('Bạn không thể xóa chính mình!');
      return;
    }
    if (window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
      try {
        await userAPI.deleteUser(userId);
        alert('Xóa người dùng thành công!');
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Xóa người dùng thất bại');
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Đang tải...</div>;
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

        <h1 className="text-3xl font-bold mb-8">👥 Quản Lý Người Dùng</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tên</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Vai Trò</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ngày Tạo</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{u._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{u.name}</p>
                      {u._id === user._id && (
                        <span className="text-xs text-blue-600">(Bạn)</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        disabled={u._id === user._id}
                        className={`px-3 py-1 text-sm border rounded ${
                          u.role === 'admin' 
                            ? 'bg-yellow-50 border-yellow-300 text-yellow-700' 
                            : 'bg-gray-50 border-gray-300'
                        } ${u._id === user._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <option value="user">👤 User</option>
                        <option value="admin">👑 Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={u._id === user._id}
                        className={`px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm ${
                          u._id === user._id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không có người dùng nào</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 text-gray-600 text-sm">
          Tổng cộng: <strong>{users.length}</strong> người dùng | 
          Admin: <strong>{users.filter(u => u.role === 'admin').length}</strong> | 
          User: <strong>{users.filter(u => u.role === 'user').length}</strong>
        </div>
      </div>
    </div>
  );
}
