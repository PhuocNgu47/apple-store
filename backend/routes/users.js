import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users (admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, address, city, country } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, city, country },
      { new: true }
    ).select('-password');
    
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role (admin only)
router.put('/:id/role', protect, admin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    res.json({ message: 'Role updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
