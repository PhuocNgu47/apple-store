import React from 'react';

/**
 * ProfileForm Component
 * Component form để chỉnh sửa profile của user
 */
export default function ProfileForm({ formData, onChange, onSubmit, onCancel, loading }) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">✏️ Chỉnh Sửa Thông Tin</h2>
      
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="city"
          placeholder="Thành phố"
          value={formData.city || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="country"
          placeholder="Quốc gia"
          value={formData.country || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn btn-primary"
          >
            {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 btn btn-secondary"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

