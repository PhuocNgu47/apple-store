import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../api';
import { useAuthStore } from '../store';

export default function AdminProducts() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'iPhone',
    image: '',
    stock: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 100 });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
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
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      if (editingId) {
        await productAPI.update(editingId, data);
        alert('Cập nhật sản phẩm thành công!');
      } else {
        await productAPI.create(data);
        alert('Thêm sản phẩm thành công!');
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi khi lưu sản phẩm: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      image: product.image || '',
      stock: product.stock
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await productAPI.delete(id);
        alert('Xóa sản phẩm thành công!');
        fetchProducts();
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'iPhone',
      image: '',
      stock: ''
    });
    setEditingId(null);
    setShowForm(false);
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

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛍️ Quản Lý Sản Phẩm</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? '✕ Đóng' : '+ Thêm Sản Phẩm'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sản Phẩm *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="VD: iPhone 15 Pro Max"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh Mục *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô Tả Sản Phẩm</label>
                <textarea
                  name="description"
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                  value={formData.description}
                  onChange={handleChange}
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
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
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
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
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

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">📦 Chưa có sản phẩm nào</p>
              <p className="text-gray-400">Nhấn "Thêm Sản Phẩm" để bắt đầu</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 text-gray-600 text-sm">
          Tổng cộng: <strong>{products.length}</strong> sản phẩm
        </div>
      </div>
    </div>
  );
}
