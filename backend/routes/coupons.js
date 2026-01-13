import express from 'express';
import Coupon from '../models/Coupon.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/coupons/validate
 * Validate và tính discount của coupon
 * Public endpoint - không cần đăng nhập
 */
router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập mã giảm giá'
      });
    }

    if (!subtotal || subtotal <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Tổng tiền không hợp lệ'
      });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Mã giảm giá không tồn tại'
      });
    }

    if (!coupon.isValid()) {
      const now = new Date();
      if (!coupon.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Mã giảm giá đã bị vô hiệu hóa'
        });
      }
      if (coupon.validFrom > now) {
        return res.status(400).json({
          success: false,
          message: `Mã giảm giá chưa có hiệu lực. Có hiệu lực từ ${coupon.validFrom.toLocaleDateString('vi-VN')}`
        });
      }
      if (coupon.validUntil < now) {
        return res.status(400).json({
          success: false,
          message: 'Mã giảm giá đã hết hạn'
        });
      }
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({
          success: false,
          message: 'Mã giảm giá đã hết lượt sử dụng'
        });
      }
    }

    if (subtotal < coupon.minPurchaseAmount) {
      return res.status(400).json({
        success: false,
        message: `Đơn hàng tối thiểu ${coupon.minPurchaseAmount.toLocaleString('vi-VN')}đ để sử dụng mã này`
      });
    }

    const discount = coupon.calculateDiscount(subtotal);

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        name: coupon.name,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue
      },
      discount,
      subtotal,
      finalAmount: subtotal - discount
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi kiểm tra mã giảm giá'
    });
  }
});

/**
 * GET /api/coupons
 * Lấy danh sách coupon (Admin only)
 */
router.get('/', protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      coupons
    });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách mã giảm giá'
    });
  }
});

/**
 * POST /api/coupons
 * Tạo coupon mới (Admin only)
 */
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      discountType,
      discountValue,
      minPurchaseAmount,
      maxDiscountAmount,
      usageLimit,
      validFrom,
      validUntil,
      applicableCategories,
      applicableProducts
    } = req.body;

    // Validation
    if (!code || !name || !discountType || !discountValue) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin: code, name, discountType, discountValue'
      });
    }

    if (discountType === 'percentage' && (discountValue < 0 || discountValue > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Phần trăm giảm giá phải từ 0 đến 100'
      });
    }

    if (discountType === 'fixed' && discountValue <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Số tiền giảm giá phải lớn hơn 0'
      });
    }

    const coupon = new Coupon({
      code: code.toUpperCase().trim(),
      name: name.trim(),
      description: description?.trim() || '',
      discountType,
      discountValue: Number(discountValue),
      minPurchaseAmount: Number(minPurchaseAmount) || 0,
      maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      validFrom: validFrom ? new Date(validFrom) : new Date(),
      validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
      applicableCategories: applicableCategories || [],
      applicableProducts: applicableProducts || []
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: 'Tạo mã giảm giá thành công',
      coupon
    });
  } catch (error) {
    console.error('Create coupon error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Mã giảm giá đã tồn tại'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo mã giảm giá'
    });
  }
});

/**
 * PUT /api/coupons/:id
 * Cập nhật coupon (Admin only)
 */
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy mã giảm giá'
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật mã giảm giá thành công',
      coupon
    });
  } catch (error) {
    console.error('Update coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật mã giảm giá'
    });
  }
});

/**
 * DELETE /api/coupons/:id
 * Xóa coupon (Admin only)
 */
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy mã giảm giá'
      });
    }

    res.json({
      success: true,
      message: 'Xóa mã giảm giá thành công'
    });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa mã giảm giá'
    });
  }
});

export default router;

