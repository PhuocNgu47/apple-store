import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from '../services/emailService.js';

const router = express.Router();

// Get user orders
router.get('/', protect, async (req, res) => {
  try {
    // If admin, get all orders; if user, get only their orders
    let query = {};
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }
    
    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 });
    
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('items.productId', 'name price image')
      .populate('statusHistory.updatedBy', 'name email');
    
    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy đơn hàng' 
      });
    }
    
    // Check if user owns this order or is admin
    if (order.userId && order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Không có quyền truy cập' 
      });
    }
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Create order (authenticated or guest)
router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, guestEmail, couponCode, discountAmount } = req.body;
    
    // Validation: Items required
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.' 
      });
    }

    // Validation: Shipping address required
    if (!shippingAddress) {
      return res.status(400).json({ 
        success: false,
        message: 'Vui lòng nhập địa chỉ giao hàng' 
      });
    }

    // Validate shipping address fields
    const requiredAddressFields = ['name', 'phone', 'address', 'city', 'district', 'ward'];
    const missingFields = requiredAddressFields.filter(field => !shippingAddress[field]?.trim());
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: `Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}` 
      });
    }

    // Validate phone number (Vietnamese format)
    const phoneRegex = /^(0|\+84)[1-9][0-9]{8,9}$/;
    const cleanPhone = shippingAddress.phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ 
        success: false,
        message: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (VD: 0912345678)' 
      });
    }

    // Check if user is authenticated or has guest email
    const userId = req.user?.id;
    const contactEmail = guestEmail || req.user?.email;

    // Guest checkout: Email is REQUIRED
    if (!userId && !guestEmail) {
      return res.status(400).json({ 
        success: false,
        message: 'Email là bắt buộc để nhận thông tin đơn hàng. Vui lòng đăng nhập hoặc nhập email.' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (guestEmail && !emailRegex.test(guestEmail.trim())) {
      return res.status(400).json({ 
        success: false,
        message: 'Email không hợp lệ. Vui lòng kiểm tra lại.' 
      });
    }

    if (!userId && !req.user?.email && !guestEmail) {
      return res.status(400).json({ 
        success: false,
        message: 'Email là bắt buộc' 
      });
    }
    
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);

    if (totalAmount <= 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Tổng tiền đơn hàng không hợp lệ' 
      });
    }
    
    // Apply coupon discount if provided
    const finalDiscount = discountAmount ? Number(discountAmount) : 0;
    const finalAmount = totalAmount - finalDiscount;

    // Create order
    const order = new Order({
      userId: userId || null,
      guestEmail: guestEmail ? guestEmail.trim() : null,
      items: items.map(item => ({
        productId: item.productId,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0
      })),
      totalAmount: finalAmount,
      discountAmount: finalDiscount,
      couponCode: couponCode || null,
      shippingAddress: {
        name: shippingAddress.name.trim(),
        phone: cleanPhone,
        address: shippingAddress.address.trim(),
        ward: shippingAddress.ward?.trim() || '',
        district: shippingAddress.district?.trim() || '',
        city: shippingAddress.city.trim(),
        country: shippingAddress.country?.trim() || 'Vietnam',
        zipCode: shippingAddress.zipCode?.trim() || ''
      },
      paymentMethod: paymentMethod || 'cash_on_delivery',
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    await order.save();

    // Send confirmation email
    const customerName = shippingAddress.name.trim() || 'Khách hàng';
    const emailAddress = contactEmail;
    
    // Send email asynchronously (don't wait for it)
    if (emailAddress) {
      sendOrderConfirmationEmail(emailAddress, order, customerName).catch(err => {
        console.error('Email send error:', err);
      });
    }

    res.status(201).json({ 
      success: true,
      message: 'Đơn hàng đã được tạo thành công! Email xác nhận đã được gửi.',
      order 
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Lỗi khi tạo đơn hàng. Vui lòng thử lại.' 
    });
  }
});

// Get guest order
router.get('/guest/:email/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({
      guestEmail: req.params.email,
      orderNumber: req.params.orderNumber
    }).populate('items.productId', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only)
router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Trạng thái không hợp lệ' 
      });
    }
    
    const order = await Order.findById(req.params.id)
      .populate('userId', 'email name');
    
    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy đơn hàng' 
      });
    }
    
    const oldStatus = order.status;
    
    // Update status
    order.status = status;
    if (note) {
      if (!order.statusHistory) {
        order.statusHistory = [];
      }
      const lastHistory = order.statusHistory[order.statusHistory.length - 1];
      if (lastHistory) {
        lastHistory.note = note;
      }
    }
    
    await order.save();
    
    // Send email notification if status changed
    if (oldStatus !== status) {
      const recipientEmail = order.userId?.email || order.guestEmail;
      if (recipientEmail) {
        sendOrderStatusUpdateEmail(recipientEmail, order, oldStatus, status)
          .catch(err => console.error('Email send error:', err));
      }
    }
    
    res.json({ 
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công', 
      order 
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Update order (admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
