import React from 'react';

/**
 * AccountSettings Component
 * Component hiển thị các tùy chọn cài đặt tài khoản
 */
export default function AccountSettings({
  onChangePassword,
  onNotificationSettings,
  onPrivacySettings,
  onDeleteAccount
}) {
  const settings = [
    {
      label: 'Đổi Mật Khẩu',
      onClick: onChangePassword,
      className: 'w-full btn btn-secondary text-left py-2'
    },
    {
      label: 'Cài Đặt Thông Báo',
      onClick: onNotificationSettings,
      className: 'w-full btn btn-secondary text-left py-2'
    },
    {
      label: 'Cài Đặt Riêng Tư',
      onClick: onPrivacySettings,
      className: 'w-full btn btn-secondary text-left py-2'
    },
    {
      label: 'Xóa Tài Khoản',
      onClick: onDeleteAccount,
      className: 'w-full btn btn-secondary text-left py-2 text-red-600'
    }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">⚙️ Cài Đặt Tài Khoản</h2>
      <div className="space-y-2">
        {settings.map((setting, index) => (
          <button
            key={index}
            onClick={setting.onClick}
            className={setting.className}
          >
            {setting.label}
          </button>
        ))}
      </div>
    </div>
  );
}

