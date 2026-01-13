import React from 'react';

/**
 * ProductsTable Component
 * Component hiển thị bảng danh sách sản phẩm
 */
export default function ProductsTable({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">📦 Chưa có sản phẩm nào</p>
          <p className="text-gray-400">Nhấn "Thêm Sản Phẩm" để bắt đầu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hình</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tên Sản Phẩm</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Danh Mục</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Giá</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Kho</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img 
                    src={product.image || 'https://via.placeholder.com/50'} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{product.name}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="font-bold text-blue-600">${product.price}</p>
                  {product.originalPrice > product.price && (
                    <p className="text-sm text-gray-400 line-through">${product.originalPrice}</p>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

