/**
 * Product Routes
 * Xử lý CRUD operations cho sản phẩm
 */

import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/products
 * Lấy danh sách sản phẩm (có phân trang, tìm kiếm, filter)
 * 
 * Query params:
 * - page: Số trang (mặc định: 1)
 * - limit: Số sản phẩm mỗi trang (mặc định: 10)
 * - category: Lọc theo danh mục
 * - search: Tìm kiếm theo tên hoặc mô tả
 */
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      inStock,
      minRating,
      sort = 'newest',
      order = 'desc',
      page = 1, 
      limit = 12 
    } = req.query;
    
    // Xây dựng query filter
    let query = {};
    
    // Filter theo category
    if (category) {
      query.category = category;
    }
    
    // Tìm kiếm theo tên hoặc mô tả (không phân biệt hoa thường)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter theo giá
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Filter theo stock
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }
    
    // Filter theo rating
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }
    
    // Sort options
    let sortOptions = {};
    if (sort === 'price') {
      sortOptions.price = order === 'asc' ? 1 : -1;
    } else if (sort === 'rating') {
      sortOptions.rating = order === 'asc' ? 1 : -1;
    } else if (sort === 'name') {
      sortOptions.name = order === 'asc' ? 1 : -1;
    } else {
      // newest hoặc default
      sortOptions.createdAt = order === 'asc' ? 1 : -1;
    }
    
    // Tính toán skip cho pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);
    
    // Lấy sản phẩm với pagination
    const products = await Product.find(query)
      .select('-reviews') // Không trả về reviews để giảm payload
      .skip(skip)
      .limit(limitNum)
      .sort(sortOptions);
    
    // Đếm tổng số sản phẩm thỏa điều kiện
    const total = await Product.countDocuments(query);
    
    // Lấy danh sách categories có sản phẩm
    const categories = await Product.distinct('category', query);
    
    res.json({
      success: true,
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        currentPage: parseInt(page),
        limit: limitNum,
        hasNext: skip + limitNum < total,
        hasPrev: parseInt(page) > 1
      },
      filters: {
        categories,
        priceRange: {
          min: minPrice ? Number(minPrice) : null,
          max: maxPrice ? Number(maxPrice) : null
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm'
    });
  }
});

/**
 * GET /api/products/:id
 * Lấy thông tin chi tiết một sản phẩm
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name email')
      .populate('seller', 'name email');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    // Tính toán thống kê reviews
    const reviewStats = {
      total: product.reviews.length,
      average: product.rating || 0,
      distribution: {
        5: product.reviews.filter(r => r.rating === 5).length,
        4: product.reviews.filter(r => r.rating === 4).length,
        3: product.reviews.filter(r => r.rating === 3).length,
        2: product.reviews.filter(r => r.rating === 2).length,
        1: product.reviews.filter(r => r.rating === 1).length
      }
    };
    
    res.json({
      success: true,
      product,
      reviewStats
    });
  } catch (error) {
    console.error('Get product error:', error);
    
    // Kiểm tra nếu ID không hợp lệ
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID sản phẩm không hợp lệ'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin sản phẩm'
    });
  }
});

/**
 * POST /api/products
 * Tạo sản phẩm mới (Admin only)
 * 
 * Body: { name, description, price, originalPrice, category, image, stock }
 */
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, image, stock } = req.body;
    
    // Validation: Kiểm tra các trường bắt buộc
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đủ tên, giá và danh mục sản phẩm'
      });
    }
    
    // Validation: Giá phải là số dương
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Giá sản phẩm phải là số dương'
      });
    }
    
    // Tạo sản phẩm mới
    const product = new Product({
      name,
      description,
      price,
      originalPrice: originalPrice || price,
      category,
      image,
      stock: stock || 0,
      seller: req.user.id // Lưu ID của admin tạo sản phẩm
    });
    
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    // Xử lý lỗi validation từ Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm'
    });
  }
});

/**
 * PUT /api/products/:id
 * Cập nhật thông tin sản phẩm (Admin only)
 */
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Trả về document mới và chạy validation
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID sản phẩm không hợp lệ'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật sản phẩm'
    });
  }
});

/**
 * DELETE /api/products/:id
 * Xóa sản phẩm (Admin only)
 */
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa sản phẩm thành công'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID sản phẩm không hợp lệ'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm'
    });
  }
});

/**
 * POST /api/products/:id/reviews
 * Thêm đánh giá cho sản phẩm (Yêu cầu đăng nhập)
 * 
 * Body: { rating, comment }
 */
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Đánh giá phải từ 1 đến 5 sao'
      });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    // Kiểm tra xem user đã review chưa
    const existingReview = product.reviews.find(
      review => review.user.toString() === req.user.id
    );
    
    if (existingReview) {
      // Cập nhật review cũ
      existingReview.rating = parseInt(rating);
      existingReview.comment = comment || '';
      existingReview.createdAt = new Date();
    } else {
      // Thêm review mới
      product.reviews.push({
        user: req.user.id,
        rating: parseInt(rating),
        comment: comment || '',
        createdAt: new Date()
      });
    }
    
    // Tính lại điểm đánh giá trung bình (làm tròn 1 chữ số thập phân)
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = Math.round((totalRating / product.reviews.length) * 10) / 10;
    
    await product.save();
    
    // Populate user info để trả về
    await product.populate('reviews.user', 'name email');
    
    res.json({
      success: true,
      message: existingReview ? 'Cập nhật đánh giá thành công' : 'Thêm đánh giá thành công',
      product
    });
  } catch (error) {
    console.error('Add review error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID sản phẩm không hợp lệ'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi khi thêm đánh giá'
    });
  }
});

/**
 * GET /api/products/:id/reviews
 * Lấy danh sách reviews của sản phẩm (có phân trang)
 */
router.get('/:id/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name email')
      .select('reviews rating');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    let reviews = [...product.reviews];
    
    // Sort reviews
    if (sort === 'newest') {
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'highest') {
      reviews.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      reviews.sort((a, b) => a.rating - b.rating);
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedReviews = reviews.slice(skip, skip + limitNum);
    
    res.json({
      success: true,
      reviews: paginatedReviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: reviews.length,
        pages: Math.ceil(reviews.length / limitNum)
      },
      rating: product.rating,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy đánh giá'
    });
  }
});

export default router;
