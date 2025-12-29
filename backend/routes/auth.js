import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Đăng ký tài khoản
// Ghi chú (VI):
// - Chuẩn hoá input (trim/lowercase email)
// - Kiểm tra dữ liệu tối thiểu và trùng email
// - Mật khẩu được hash bên trong User model (pre('save'))
router.post('/register', async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;

    // Chuẩn hoá input
    name = typeof name === 'string' ? name.trim() : '';
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password : '';
    confirmPassword = typeof confirmPassword === 'string' ? confirmPassword : '';
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ họ tên, email và mật khẩu' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải từ 6 ký tự trở lên' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' });
    }
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'Email đã được sử dụng' });
    }
    
    user = new User({ name, email, password });
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' });
  }
});

// Đăng nhập
// Ghi chú (VI):
// - Luôn trả về thông báo tổng quát khi sai để tránh lộ thông tin
// - Chuẩn hoá email để tránh lỗi hoa/thường và khoảng trắng
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = typeof email === 'string' ? email.trim().toLowerCase() : '';
    password = typeof password === 'string' ? password : '';
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' });
  }
});

// Xác thực token (dùng khi khởi động app để kiểm tra phiên đăng nhập)
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Không có token xác thực' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token không hợp lệ' });
  }
});

export default router;
