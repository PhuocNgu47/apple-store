import React from 'react';

/**
 * ProductForm Component
 * Component form thêm/sửa sản phẩm
 */
export default function ProductForm({ 
  formData, 
  editingId, 
  onChange, 
  onSubmit, 
  onCancel 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
      </h2>
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sản Phẩm *</label>
          <input
            type="text"
            name="name"
            placeholder="VD: iPhone 15 Pro Max"
            value={formData.name}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh Mục *</label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="iPhone">iPhone</option>
            <option value="iPad">iPad</option>
            <option value="Mac">Mac</option>
            <option value="Apple Watch">Apple Watch</option>
            <option value="AirPods">AirPods</option>
            <option value="Accessories">Phụ Kiện</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giá Bán ($) *</label>
          <input
            type="number"
            name="price"
            placeholder="999"
            value={formData.price}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giá Gốc ($)</label>
          <input
            type="number"
            name="originalPrice"
            placeholder="1099 (để trống nếu không giảm giá)"
            value={formData.originalPrice}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số Lượng Tồn Kho *</label>
          <input
            type="number"
            name="stock"
            placeholder="100"
            value={formData.stock}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình Ảnh</label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô Tả Sản Phẩm</label>
          <textarea
            name="description"
            placeholder="Nhập mô tả chi tiết về sản phẩm..."
            value={formData.description}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
          />
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {editingId ? '💾 Cập Nhật' : '✓ Thêm Sản Phẩm'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

