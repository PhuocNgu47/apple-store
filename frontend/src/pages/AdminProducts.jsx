import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../api';
import { useAuthStore } from '../store';
import Loader from '../components/UI/Loader';
import { ProductForm, ProductsTable } from '../features/admin';

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
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader size="lg" text="Đang tải..." fullScreen={false} />
      </div>
    );
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
          <ProductForm
            formData={formData}
            editingId={editingId}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        )}

        {/* Products Table */}
        <ProductsTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Summary */}
        <div className="mt-4 text-gray-600 text-sm">
          Tổng cộng: <strong>{products.length}</strong> sản phẩm
        </div>
      </div>
    </div>
  );
}
