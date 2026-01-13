/**
 * Authentication Routes
 * Xử lý đăng ký, đăng nhập và xác thực token
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới
 * 
 * Body: { name, email, password, confirmPassword }
 */
router.post('/register', async (req, res) => {
  try {
    // Lấy và chuẩn hóa dữ liệu đầu vào
    let { name, email, password, confirmPassword } = req.body;
    name = typeof name === 'string' ? name.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password : '';
    confirmPassword = typeof confirmPassword === 'string' ? confirmPassword : '';
    
    // Validation: Kiểm tra các trường bắt buộc
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đủ họ tên, email và mật khẩu'
      });
    }
    
    // Validation: Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu phải có ít nhất 6 ký tự'
      });
    }

    // Validation: Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu xác nhận không khớp'
      });
    }
    
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email này đã được sử dụng. Vui lòng dùng email khác.'
      });
    }
    
    // Tạo user mới
    // Password sẽ tự động được hash trong User model (pre-save hook)
    const user = new User({ name, email, password });
    await user.save();
    
    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    // Trả về kết quả thành công
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    
    // Xử lý lỗi duplicate email từ MongoDB
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email này đã được sử dụng'
      });
    }

    // Lỗi khác
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ. Vui lòng thử lại sau.'
    });
  }
});

/**
 * POST /api/auth/login
 * Đăng nhập với email và password
 * 
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    // Lấy và chuẩn hóa dữ liệu đầu vào
    let { email, password } = req.body;
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password : '';
    
    // Validation: Kiểm tra các trường bắt buộc
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }
    
    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      // Không tiết lộ email có tồn tại hay không (bảo mật)
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }
    
    // So sánh mật khẩu (đã được hash)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      });
    }
    
    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    // Trả về kết quả thành công
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ. Vui lòng thử lại sau.'
    });
  }
});

/**
 * POST /api/auth/verify
 * Xác thực token JWT
 * Dùng để kiểm tra token còn hợp lệ không khi reload trang
 */
router.post('/verify', (req, res) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Không có token xác thực'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token không hợp lệ'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({
      success: true,
      valid: true,
      user: decoded
    });
  } catch (error) {
    // Token hết hạn hoặc không hợp lệ
    res.status(401).json({
      success: false,
      valid: false,
      message: error.name === 'TokenExpiredError' 
        ? 'Token đã hết hạn' 
        : 'Token không hợp lệ'
    });
  }
});

export default router;
