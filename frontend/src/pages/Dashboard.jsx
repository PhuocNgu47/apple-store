import React, { useState } from 'react';
import {
  UserStats,
  ProfileCard,
  ProfileForm,
  QuickStats,
  AccountSettings,
  ProfileLoading,
  useProfile,
  useUserStats
} from '../features/user';

export default function Dashboard() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  
  const { profile, loading, updateProfile } = useProfile();
  const { stats } = useUserStats();

  // Initialize formData when profile loads
  React.useEffect(() => {
    if (profile && !editing) {
      setFormData(profile);
    }
  }, [profile, editing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      // Error đã được xử lý trong hook
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(profile);
  };

  const handleSettingsAction = (action) => {
    // TODO: Implement các action này sau
    console.log(`Action: ${action}`);
    alert(`Tính năng "${action}" đang được phát triển`);
  };

  if (loading) {
    return <ProfileLoading />;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">🍎 Dashboard Của Bạn</h1>
      <p className="text-gray-600 mb-8">Quản lý thông tin cá nhân và đơn hàng</p>

      {/* Stats Cards */}
      <UserStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Profile Card/Form */}
        {!editing ? (
          <ProfileCard profile={profile} onEdit={() => setEditing(true)} />
        ) : (
          <ProfileForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        )}

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Account Settings */}
        <AccountSettings
          onChangePassword={() => handleSettingsAction('Đổi Mật Khẩu')}
          onNotificationSettings={() => handleSettingsAction('Cài Đặt Thông Báo')}
          onPrivacySettings={() => handleSettingsAction('Cài Đặt Riêng Tư')}
          onDeleteAccount={() => handleSettingsAction('Xóa Tài Khoản')}
        />
      </div>
    </div>
  );
}
