import express from 'express';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';

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
      .populate('items.productId', 'name price image');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order or is admin
    if (order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    });
    
    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only)
router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'shipped', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
