import React from 'react';

/**
 * ProfileLoading Component
 * Component hiển thị trạng thái loading khi tải profile
 */
export default function ProfileLoading() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Đang tải thông tin...</p>
      </div>
    </div>
  );
}

