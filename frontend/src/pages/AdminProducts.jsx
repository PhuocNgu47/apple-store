import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';

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
    category: 'Electronics',
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
      if (editingId) {
        await productAPI.update(editingId, formData);
        alert('Product updated successfully');
      } else {
        await productAPI.create(formData);
        alert('Product created successfully');
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      image: product.image || '',
      stock: product.stock
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Electronics',
      image: '',
      stock: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              step="0.01"
              required
            />

            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price (optional)"
              value={formData.originalPrice}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              step="0.01"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg"
              rows="4"
            />

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 btn btn-primary"
              >
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-right">Price</th>
              <th className="border p-3 text-right">Stock</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="border p-3">{product.name}</td>
                <td className="border p-3">{product.category}</td>
                <td className="border p-3 text-right">${product.price.toFixed(2)}</td>
                <td className="border p-3 text-right">{product.stock}</td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-secondary px-3 py-1 mr-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-secondary px-3 py-1 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found. Create your first product!</p>
        </div>
      )}
    </div>
  );
}
