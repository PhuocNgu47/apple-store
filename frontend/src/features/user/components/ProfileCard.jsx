import React from 'react';

/**
 * ProfileCard Component
 * Component hiển thị thông tin profile của user (read-only)
 */
export default function ProfileCard({ profile, onEdit }) {
  const fields = [
    { label: 'Họ Tên', value: profile?.name },
    { label: 'Email', value: profile?.email },
    { label: 'Số Điện Thoại', value: profile?.phone || 'Chưa cập nhật' },
    { label: 'Địa Chỉ', value: profile?.address || 'Chưa cập nhật' },
    { label: 'Thành Phố', value: profile?.city || 'Chưa cập nhật' },
    { label: 'Quốc Gia', value: profile?.country || 'Chưa cập nhật' }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">👤 Thông Tin Cá Nhân</h2>
      
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={index}>
            <p className="text-gray-600 text-sm">{field.label}</p>
            <p className="font-semibold">{field.value}</p>
          </div>
        ))}
        
        {onEdit && (
          <button
            onClick={onEdit}
            className="w-full btn btn-primary mt-4"
          >
            Chỉnh Sửa Profile
          </button>
        )}
      </div>
    </div>
  );
}

