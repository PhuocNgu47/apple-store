import jwt from 'jsonwebtoken';

// Middleware bảo vệ route: yêu cầu có token hợp lệ (Bearer <token>)
export const protect = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Thiếu token xác thực' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lưu payload vào req.user để các route sau sử dụng
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

// Chỉ cho phép người dùng có vai trò admin
export const admin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền admin' });
  }
  next();
};
