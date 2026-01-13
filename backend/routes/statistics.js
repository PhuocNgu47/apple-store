/**
 * Statistics Routes
 * API endpoints cho Admin Dashboard statistics
 */

import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/statistics/overview
 * Lấy thống kê tổng quan
 */
router.get('/overview', protect, admin, async (req, res) => {
  try {
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      lowStockProducts
    ] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      Order.countDocuments({ status: 'pending' }),
      Product.countDocuments({ stock: { $lt: 10 } })
    ]);

    const revenue = totalRevenue[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue: revenue,
        pendingOrders,
        lowStockProducts
      }
    });
  } catch (error) {
    console.error('Get overview stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê'
    });
  }
});

/**
 * GET /api/statistics/revenue
 * Thống kê doanh thu theo thời gian
 */
router.get('/revenue', protect, admin, async (req, res) => {
  try {
    const { period = '30days' } = req.query; // 7days, 30days, 90days, year
    
    let startDate = new Date();
    if (period === '7days') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === '30days') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === '90days') {
      startDate.setDate(startDate.getDate() - 90);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const revenueData = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data: revenueData
    });
  } catch (error) {
    console.error('Get revenue stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê doanh thu'
    });
  }
});

/**
 * GET /api/statistics/orders
 * Thống kê đơn hàng theo trạng thái
 */
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    const statusLabels = {
      'pending': 'Đang Chờ',
      'confirmed': 'Đã Xác Nhận',
      'shipped': 'Đã Gửi',
      'delivered': 'Đã Giao',
      'cancelled': 'Đã Hủy'
    };

    const formattedStats = orderStats.map(stat => ({
      status: stat._id,
      label: statusLabels[stat._id] || stat._id,
      count: stat.count,
      totalAmount: stat.totalAmount
    }));

    res.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê đơn hàng'
    });
  }
});

/**
 * GET /api/statistics/products
 * Thống kê sản phẩm theo category và top sellers
 */
router.get('/products', protect, admin, async (req, res) => {
  try {
    const [categoryStats, topProducts] = await Promise.all([
      // Thống kê theo category
      Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            totalStock: { $sum: '$stock' }
          }
        },
        { $sort: { count: -1 } }
      ]),
      // Top sản phẩm bán chạy (dựa trên số lượng trong orders)
      Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.productId',
            totalSold: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        {
          $project: {
            productId: '$_id',
            productName: '$product.name',
            productImage: '$product.image',
            totalSold: 1,
            totalRevenue: 1
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        categories: categoryStats,
        topProducts
      }
    });
  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê sản phẩm'
    });
  }
});

/**
 * GET /api/statistics/recent-orders
 * Lấy đơn hàng gần đây
 */
router.get('/recent-orders', protect, admin, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId', 'name image')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      orders: recentOrders
    });
  } catch (error) {
    console.error('Get recent orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy đơn hàng gần đây'
    });
  }
});

export default router;

