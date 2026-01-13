import React, { useState } from 'react';

export default function ProductComparison() {
  const [showComparison, setShowComparison] = useState(false);

  // iPhone Pro Models Comparison Data
  const comparison = {
    'iPhone 15 Pro Max': {
      price: '$1,199',
      screen: '6.7" Super Retina XDR',
      processor: 'A17 Pro',
      camera: '48MP + 12MP + 12MP Telephoto',
      battery: '4,685 mAh',
      weight: '225g',
      colors: 'Space Black, Silver, Gold, Deep Purple',
      storage: '256GB, 512GB, 1TB'
    },
    'iPhone 15 Pro': {
      price: '$999',
      screen: '6.1" Super Retina XDR',
      processor: 'A17 Pro',
      camera: '48MP + 12MP + 12MP Telephoto',
      battery: '3,349 mAh',
      weight: '187g',
      colors: 'Space Black, Silver, Gold, Deep Purple',
      storage: '256GB, 512GB, 1TB'
    },
    'iPhone 15': {
      price: '$799',
      screen: '6.1" Liquid Retina',
      processor: 'A16 Bionic',
      camera: '48MP + 12MP',
      battery: '3,082 mAh',
      weight: '171g',
      colors: 'Black, Pink, Yellow, Blue, Green',
      storage: '128GB, 256GB, 512GB'
    }
  };

  const specs = [
    { label: 'Giá', key: 'price' },
    { label: 'Màn Hình', key: 'screen' },
    { label: 'Bộ Xử Lý', key: 'processor' },
    { label: 'Camera', key: 'camera' },
    { label: 'Pin', key: 'battery' },
    { label: 'Trọng Lượng', key: 'weight' },
    { label: 'Màu Sắc', key: 'colors' },
    { label: 'Dung Lượng', key: 'storage' }
  ];

  return (
    <div className="my-8">
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="mb-6 btn btn-primary"
      >
        {showComparison ? '✕ Đóng So Sánh' : '🔄 So Sánh iPhone Pro'}
      </button>

      {showComparison && (
        <div className="p-4 overflow-x-auto rounded-lg bg-gray-50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="p-3 font-bold text-left">Thông Số</th>
                {Object.keys(comparison).map(model => (
                  <th key={model} className="p-3 font-bold text-blue-600">
                    {model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(spec => (
                <tr key={spec.key} className="border-b border-gray-200 hover:bg-white">
                  <td className="p-3 font-semibold text-gray-700">{spec.label}</td>
                  {Object.entries(comparison).map(([model, data]) => (
                    <td key={`${model}-${spec.key}`} className="p-3 text-gray-600">
                      {data[spec.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
