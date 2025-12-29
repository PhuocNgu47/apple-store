import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { userAPI } from '../api';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userAPI.updateProfile(formData);
      setProfile(response.data.user);
      setEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">🍎 Dashboard Của Bạn</h1>
      <p className="text-gray-600 mb-8">Quản lý thông tin cá nhân và đơn hàng</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <p className="text-sm opacity-90">Tổng Đơn Hàng</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <p className="text-sm opacity-90">Tổng Chi Tiêu</p>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <p className="text-sm opacity-90">Trạng Thái Thành Viên</p>
          <p className="text-xl font-bold">Khách Hàng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">👤 Thông Tin Cá Nhân</h2>
          
          {!editing ? (
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Họ Tên</p>
                <p className="font-semibold">{profile?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold">{profile?.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Số Điện Thoại</p>
                <p className="font-semibold">{profile?.phone || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Địa Chỉ</p>
                <p className="font-semibold">{profile?.address || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Thành Phố</p>
                <p className="font-semibold">{profile?.city || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Country</p>
                <p className="font-semibold">{profile?.country || 'Not set'}</p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="w-full btn btn-primary mt-4"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 btn btn-primary"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData(profile);
                  }}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-600">Completed Orders</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-yellow-600">$0.00</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-2">
            <button className="w-full btn btn-secondary text-left py-2">
              Change Password
            </button>
            <button className="w-full btn btn-secondary text-left py-2">
              Notification Settings
            </button>
            <button className="w-full btn btn-secondary text-left py-2">
              Privacy Settings
            </button>
            <button className="w-full btn btn-secondary text-left py-2 text-red-600">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
