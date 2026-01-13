import { FiHome, FiShoppingCart, FiPackage, FiUser, FiSettings, FiUsers, FiBarChart3, FiLogOut } from 'react-icons/fi';

/**
 * Navigation Menu Configuration
 */

export const CUSTOMER_MENU = [
  {
    id: 'home',
    label: 'Trang Chủ',
    path: '/',
    icon: FiHome,
    requireAuth: false,
  },
  {
    id: 'products',
    label: 'Sản Phẩm',
    path: '/products',
    icon: FiPackage,
    requireAuth: false,
  },
  {
    id: 'cart',
    label: 'Giỏ Hàng',
    path: '/cart',
    icon: FiShoppingCart,
    requireAuth: false,
    badge: 'cartCount', // Will show badge with cart count
  },
  {
    id: 'orders',
    label: 'Đơn Hàng',
    path: '/orders',
    icon: FiPackage,
    requireAuth: true,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: FiUser,
    requireAuth: true,
  },
];

export const ADMIN_MENU = [
  {
    id: 'dashboard',
    label: 'Tổng Quan',
    path: '/admin',
    icon: FiBarChart3,
  },
  {
    id: 'products',
    label: 'Sản Phẩm',
    path: '/admin/products',
    icon: FiPackage,
  },
  {
    id: 'orders',
    label: 'Đơn Hàng',
    path: '/admin/orders',
    icon: FiShoppingCart,
  },
  {
    id: 'users',
    label: 'Người Dùng',
    path: '/admin/users',
    icon: FiUsers,
  },
  {
    id: 'settings',
    label: 'Cài Đặt',
    path: '/admin/settings',
    icon: FiSettings,
  },
];

export const MOBILE_BOTTOM_NAV = [
  {
    id: 'home',
    label: 'Trang Chủ',
    path: '/',
    icon: FiHome,
  },
  {
    id: 'search',
    label: 'Tìm Kiếm',
    path: '/search',
    icon: FiPackage,
  },
  {
    id: 'cart',
    label: 'Giỏ Hàng',
    path: '/cart',
    icon: FiShoppingCart,
    badge: 'cartCount',
  },
  {
    id: 'account',
    label: 'Tài Khoản',
    path: '/account',
    icon: FiUser,
  },
];

export const USER_DROPDOWN_MENU = [
  {
    id: 'profile',
    label: 'Hồ Sơ',
    path: '/profile',
    icon: FiUser,
  },
  {
    id: 'orders',
    label: 'Đơn Hàng',
    path: '/orders',
    icon: FiShoppingCart,
  },
  {
    id: 'settings',
    label: 'Cài Đặt',
    path: '/settings',
    icon: FiSettings,
  },
  {
    id: 'logout',
    label: 'Đăng Xuất',
    path: null,
    icon: FiLogOut,
    action: 'logout',
  },
];

export const FOOTER_LINKS = {
  about: [
    { label: 'Về Chúng Tôi', path: '/about' },
    { label: 'Tin Tức', path: '/news' },
    { label: 'Sự Kiện', path: '/events' },
    { label: 'Tuyển Dụng', path: '/careers' },
  ],
  support: [
    { label: 'Hỗ Trợ Khách Hàng', path: '/support' },
    { label: 'Hướng Dẫn', path: '/guide' },
    { label: 'Liên Hệ', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ],
  policy: [
    { label: 'Chính Sách Bảo Mật', path: '/privacy' },
    { label: 'Điều Khoản Dịch Vụ', path: '/terms' },
    { label: 'Chính Sách Hoàn Trả', path: '/refund' },
    { label: 'Chính Sách Giao Hàng', path: '/shipping' },
  ],
  social: [
    { label: 'Facebook', url: 'https://facebook.com', icon: 'FiFacebook' },
    { label: 'Twitter', url: 'https://twitter.com', icon: 'FiTwitter' },
    { label: 'Instagram', url: 'https://instagram.com', icon: 'FiInstagram' },
    { label: 'YouTube', url: 'https://youtube.com', icon: 'FiYoutube' },
  ],
};

export const BREADCRUMB_CONFIG = {
  '/': { label: 'Trang Chủ' },
  '/products': { label: 'Sản Phẩm' },
  '/cart': { label: 'Giỏ Hàng' },
  '/checkout': { label: 'Thanh Toán' },
  '/orders': { label: 'Đơn Hàng' },
  '/admin': { label: 'Admin' },
  '/admin/products': { label: 'Quản Lý Sản Phẩm' },
  '/admin/orders': { label: 'Quản Lý Đơn Hàng' },
  '/admin/users': { label: 'Quản Lý Người Dùng' },
};

/**
 * Get menu based on user role
 */
export const getMenuByRole = (userRole) => {
  if (userRole === 'admin') {
    return ADMIN_MENU;
  }
  return CUSTOMER_MENU;
};

/**
 * Check if menu item is active
 */
export const isMenuItemActive = (currentPath, menuPath) => {
  if (menuPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(menuPath);
};
