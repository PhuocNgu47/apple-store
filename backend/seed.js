/**
 * MongoDB Seed Data Script - Dữ Liệu Cơ Bản
 * 
 * Script này tạo dữ liệu mẫu để test tất cả tính năng của dự án
 * 
 * Cách chạy:
 *   npm run seed
 *   hoặc
 *   node seed.js
 * 
 * Dữ liệu được tạo:
 *   ✅ 10 Users (2 admin + 8 users)
 *   ✅ 50+ Products (iPhone, iPad, MacBook, Apple Watch, Accessories)
 *   ✅ 5 Sample Orders (các trạng thái khác nhau)
 * 
 * Lưu ý:
 *   - Script sẽ XÓA tất cả dữ liệu cũ trước khi seed mới
 *   - Chạy lại sẽ tạo lại từ đầu
 */

import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Address from './models/Address.js';
import Coupon from './models/Coupon.js';
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

// Generate a readable, unique-ish order number for seed data
const generateOrderNumber = () => {
  const now = Date.now();
  const rand = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  return `${now}${rand}`;
};

const PRODUCTS = [
  // iPhone Series
  {
    name: 'iPhone 15 Pro Max',
    description: 'Điện thoại flagship Apple với chip A17 Pro, camera 48MP, màn hình Super Retina XDR 6.7 inch. Tính năng nổi bật: USB-C, Action Button, Titanium design, Night mode camera, ProRAW video. Pin khỏe, hiệu năng vượt trội cho công việc và giải trí.',
    price: 1199,
    originalPrice: 1199,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max',
    images: [
      'https://via.placeholder.com/600x600?text=iPhone+15+Pro+Max+1',
      'https://via.placeholder.com/600x600?text=iPhone+15+Pro+Max+2',
      'https://via.placeholder.com/600x600?text=iPhone+15+Pro+Max+3'
    ],
    stock: 25,
    rating: 5,
    reviews: []
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Flagship iPhone với màn hình 6.1 inch Super Retina XDR. Chip A17 Pro siêu mạnh, camera ProMotion, thiết kế titanium bền bỉ. Hoàn hảo cho công việc & sáng tạo nội dung. Hỗ trợ USB-C, Action Button mới.',
    price: 999,
    originalPrice: 999,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
    images: [
      'https://via.placeholder.com/600x600?text=iPhone+15+Pro+1',
      'https://via.placeholder.com/600x600?text=iPhone+15+Pro+2'
    ],
    stock: 35,
    rating: 5,
    reviews: []
  },
  {
    name: 'iPhone 15',
    description: 'iPhone phổ thông với chip A16 Bionic mạnh mẽ. Màn hình 6.1 inch Liquid Retina, camera dual 48MP, sạc USB-C. Lựa chọn tốt cho người dùng bình thường. Thiết kế đẹp, nhiều màu sắc.',
    price: 799,
    originalPrice: 899,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15',
    images: [
      'https://via.placeholder.com/600x600?text=iPhone+15+1',
      'https://via.placeholder.com/600x600?text=iPhone+15+2'
    ],
    stock: 45,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'iPhone 15 Plus',
    description: 'Phiên bản Plus với màn hình 6.7 inch Liquid Retina lớn. Camera 48MP + 12MP Ultra Wide, A16 Bionic, pin khỏe. Dành cho người thích màn hình lớn. Trải nghiệm xem phim và chơi game tuyệt vời.',
    price: 899,
    originalPrice: 999,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Plus',
    images: [
      'https://via.placeholder.com/600x600?text=iPhone+15+Plus+1',
      'https://via.placeholder.com/600x600?text=iPhone+15+Plus+2'
    ],
    stock: 40,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'iPhone 14 Pro Max',
    description: 'iPhone 14 Pro Max với chip A16 Bionic, camera 48MP, màn hình Super Retina XDR 6.7 inch. Dynamic Island độc đáo, thiết kế premium. Giá tốt hơn so với thế hệ mới.',
    price: 1099,
    originalPrice: 1199,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+14+Pro+Max',
    images: [
      'https://via.placeholder.com/600x600?text=iPhone+14+Pro+Max+1'
    ],
    stock: 20,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'iPhone 14',
    description: 'iPhone 14 với chip A15 Bionic, camera 12MP dual, màn hình 6.1 inch. Pin tốt, hiệu năng ổn định. Lựa chọn hợp lý cho người dùng phổ thông.',
    price: 699,
    originalPrice: 799,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+14',
    images: [],
    stock: 50,
    rating: 4.7,
    reviews: []
  },
  
  // iPad Series
  {
    name: 'iPad Pro 12.9" (M2)',
    description: 'Máy tính bảng cao cấp với chip M2, màn hình Liquid Retina XDR 12.9 inch. Hỗ trợ Apple Pencil Pro, MagicKeyboard. Hoàn hảo cho design, video editing, và công việc chuyên nghiệp.',
    price: 1099,
    originalPrice: 1099,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Pro+12.9',
    images: [
      'https://via.placeholder.com/600x600?text=iPad+Pro+12.9+1',
      'https://via.placeholder.com/600x600?text=iPad+Pro+12.9+2'
    ],
    stock: 15,
    rating: 5,
    reviews: []
  },
  {
    name: 'iPad Pro 11" (M2)',
    description: 'iPad Pro 11 inch với chip M2 mạnh mẽ. Màn hình Liquid Retina đẹp, hỗ trợ Apple Pencil và MagicKeyboard. Kích thước vừa phải, dễ mang theo.',
    price: 799,
    originalPrice: 799,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Pro+11',
    images: [
      'https://via.placeholder.com/600x600?text=iPad+Pro+11+1'
    ],
    stock: 18,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'iPad Air 11" (M1)',
    description: 'iPad Air với chip M1 mạnh mẽ, màn hình 11 inch. Nhẹ, mỏng, hỗ trợ accessories Apple. Cân bằng hoàn hảo giữa performance và giá cả. Phù hợp cho học tập và làm việc.',
    price: 599,
    originalPrice: 599,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Air+11',
    images: [
      'https://via.placeholder.com/600x600?text=iPad+Air+11+1'
    ],
    stock: 20,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'iPad Air 13" (M2)',
    description: 'iPad Air phiên bản lớn với chip M2, màn hình 13 inch Liquid Retina. Không gian làm việc rộng rãi, hiệu năng mạnh mẽ. Hoàn hảo cho multitasking.',
    price: 799,
    originalPrice: 899,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Air+13',
    images: [],
    stock: 12,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'iPad (10th Gen)',
    description: 'iPad thế hệ 10 với chip A14 Bionic, màn hình 10.9 inch. Thiết kế hiện đại, hỗ trợ Apple Pencil và Magic Keyboard. Giá hợp lý cho học sinh, sinh viên.',
    price: 449,
    originalPrice: 499,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+10th',
    images: [],
    stock: 30,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'iPad mini 8.3"',
    description: 'iPad mini nhỏ gọn với chip A15 Bionic, màn hình 8.3 inch. Dễ mang theo, phù hợp cho đọc sách, xem phim. Thiết kế đẹp, nhiều màu sắc.',
    price: 499,
    originalPrice: 549,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+mini',
    images: [],
    stock: 25,
    rating: 4.7,
    reviews: []
  },

  // MacBook Series
  {
    name: 'MacBook Pro 16" (M3 Pro)',
    description: 'Laptop chuyên nghiệp với chip M3 Pro, màn hình Liquid Retina XDR 16.2 inch. Hiệu năng cực mạnh cho video editing, 3D rendering. Pin lâu, thiết kế đẹp.',
    price: 2499,
    originalPrice: 2499,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=MacBook+Pro+16',
    images: [
      'https://via.placeholder.com/600x600?text=MacBook+Pro+16+1',
      'https://via.placeholder.com/600x600?text=MacBook+Pro+16+2'
    ],
    stock: 10,
    rating: 5,
    reviews: []
  },
  {
    name: 'MacBook Pro 14" (M3)',
    description: 'MacBook Pro 14 inch với chip M3, màn hình Liquid Retina XDR. Cân bằng hoàn hảo giữa hiệu năng và kích thước. Phù hợp cho developer và designer.',
    price: 1999,
    originalPrice: 1999,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=MacBook+Pro+14',
    images: [
      'https://via.placeholder.com/600x600?text=MacBook+Pro+14+1'
    ],
    stock: 15,
    rating: 5,
    reviews: []
  },
  {
    name: 'MacBook Air 15" (M2)',
    description: 'MacBook Air màn hình lớn với chip M2, màn hình Liquid Retina 15.3 inch. Mỏng nhẹ, pin lâu, hiệu năng tốt. Hoàn hảo cho công việc văn phòng và học tập.',
    price: 1299,
    originalPrice: 1299,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=MacBook+Air+15',
    images: [
      'https://via.placeholder.com/600x600?text=MacBook+Air+15+1'
    ],
    stock: 20,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'MacBook Air 13" (M2)',
    description: 'MacBook Air cổ điển với chip M2, màn hình Liquid Retina 13.6 inch. Nhỏ gọn, nhẹ, pin lâu. Lựa chọn tốt cho sinh viên và người dùng phổ thông.',
    price: 1099,
    originalPrice: 1199,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=MacBook+Air+13',
    images: [],
    stock: 25,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'MacBook Pro 13" (M2)',
    description: 'MacBook Pro 13 inch với chip M2, màn hình Retina. Touch Bar, hiệu năng tốt. Phù hợp cho công việc văn phòng và lập trình.',
    price: 1299,
    originalPrice: 1399,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=MacBook+Pro+13',
    images: [],
    stock: 12,
    rating: 4.7,
    reviews: []
  },

  // Apple Watch Series
  {
    name: 'Apple Watch Series 9',
    description: 'Smartwatch Apple mới nhất với chip S9, màn hình Always-On. Tính năng health: ECG, SpO2, sleep tracking. Chống nước, pin 18 giờ. Nhiều dây đeo và màu sắc.',
    price: 399,
    originalPrice: 399,
    category: 'Apple Watch',
    image: 'https://via.placeholder.com/300x300?text=Apple+Watch+Series+9',
    images: [
      'https://via.placeholder.com/600x600?text=Apple+Watch+9+1'
    ],
    stock: 50,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Apple Watch Ultra 2',
    description: 'Apple Watch Ultra thế hệ 2 với chip S9, màn hình lớn nhất. Chống nước sâu, pin 36 giờ. Dành cho vận động viên và người thích thể thao ngoài trời.',
    price: 799,
    originalPrice: 799,
    category: 'Apple Watch',
    image: 'https://via.placeholder.com/300x300?text=Apple+Watch+Ultra+2',
    images: [],
    stock: 15,
    rating: 5,
    reviews: []
  },
  {
    name: 'Apple Watch SE (2nd Gen)',
    description: 'Apple Watch SE giá tốt với chip S8, màn hình Retina. Đầy đủ tính năng cơ bản: fitness tracking, notifications. Phù hợp cho người mới bắt đầu.',
    price: 249,
    originalPrice: 299,
    category: 'Apple Watch',
    image: 'https://via.placeholder.com/300x300?text=Apple+Watch+SE',
    images: [],
    stock: 40,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Apple Watch Series 8',
    description: 'Apple Watch Series 8 với chip S8, tính năng đo nhiệt độ cơ thể. ECG, SpO2, crash detection. Giá tốt hơn so với Series 9.',
    price: 329,
    originalPrice: 399,
    category: 'Apple Watch',
    image: 'https://via.placeholder.com/300x300?text=Apple+Watch+Series+8',
    images: [],
    stock: 30,
    rating: 4.7,
    reviews: []
  },

  // Accessories
  {
    name: 'AirPods Pro (2nd Gen)',
    description: 'Tai nghe AirPods Pro generation 2 với Adaptive Audio, Active Noise Cancellation. Âm thanh Spatial Audio, sạc USB-C. Pin 6 giờ đơn lẻ, 30 giờ với case.',
    price: 249,
    originalPrice: 249,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=AirPods+Pro',
    images: [
      'https://via.placeholder.com/600x600?text=AirPods+Pro+1'
    ],
    stock: 100,
    rating: 5,
    reviews: []
  },
  {
    name: 'AirPods (3rd Gen)',
    description: 'AirPods thế hệ 3 với Spatial Audio, Adaptive EQ. Thiết kế đẹp, pin tốt. Phù hợp cho người dùng phổ thông.',
    price: 179,
    originalPrice: 199,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=AirPods+3',
    images: [],
    stock: 80,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'AirPods Max',
    description: 'Tai nghe over-ear AirPods Max với Active Noise Cancellation, Spatial Audio. Chất lượng âm thanh cao cấp, thiết kế sang trọng.',
    price: 549,
    originalPrice: 549,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=AirPods+Max',
    images: [],
    stock: 25,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'Magic Keyboard',
    description: 'Bàn phím Magic Keyboard không dây với thiết kế mỏng nhẹ. Pin lâu, kết nối Bluetooth ổn định. Phù hợp cho Mac và iPad.',
    price: 99,
    originalPrice: 129,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Magic+Keyboard',
    images: [],
    stock: 60,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Magic Mouse',
    description: 'Chuột Magic Mouse không dây với cảm ứng đa điểm. Thiết kế đẹp, pin lâu. Tương thích với Mac và iPad.',
    price: 79,
    originalPrice: 99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Magic+Mouse',
    images: [],
    stock: 70,
    rating: 4.5,
    reviews: []
  },
  {
    name: 'Apple Pencil (2nd Gen)',
    description: 'Apple Pencil thế hệ 2 với độ nhạy cao, độ trễ thấp. Sạc không dây, hỗ trợ double-tap. Hoàn hảo cho iPad Pro và iPad Air.',
    price: 129,
    originalPrice: 129,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Apple+Pencil+2',
    images: [],
    stock: 50,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Apple Pencil (USB-C)',
    description: 'Apple Pencil USB-C với giá tốt hơn. Hỗ trợ iPad thế hệ mới, sạc qua USB-C. Phù hợp cho học sinh, sinh viên.',
    price: 79,
    originalPrice: 99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Apple+Pencil+USB-C',
    images: [],
    stock: 65,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'MagSafe Charger',
    description: 'Sạc MagSafe không dây cho iPhone. Tốc độ sạc nhanh, thiết kế đẹp. Tương thích với iPhone 12 trở lên.',
    price: 39,
    originalPrice: 49,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=MagSafe+Charger',
    images: [],
    stock: 120,
    rating: 4.5,
    reviews: []
  },
  {
    name: 'iPhone 15 Pro Case',
    description: 'Ốp lưng chính hãng Apple cho iPhone 15 Pro. Bảo vệ tốt, thiết kế đẹp, nhiều màu sắc. Tương thích với MagSafe.',
    price: 49,
    originalPrice: 59,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Case',
    images: [],
    stock: 90,
    rating: 4.4,
    reviews: []
  },
  {
    name: 'iPad Stand',
    description: 'Giá đỡ iPad chính hãng với khả năng điều chỉnh góc. Thiết kế đẹp, chắc chắn. Phù hợp cho làm việc và học tập.',
    price: 59,
    originalPrice: 79,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=iPad+Stand',
    images: [],
    stock: 40,
    rating: 4.3,
    reviews: []
  },
  {
    name: 'HomePod Mini',
    description: 'Loa thông minh HomePod Mini với Siri, chất lượng âm thanh tốt. Thiết kế nhỏ gọn, nhiều màu sắc. Tích hợp Apple Music và HomeKit.',
    price: 99,
    originalPrice: 99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=HomePod+Mini',
    images: [],
    stock: 55,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'HomePod (2nd Gen)',
    description: 'Loa thông minh HomePod thế hệ 2 với chất lượng âm thanh cao cấp. Siri, Spatial Audio, tích hợp Apple Music. Thiết kế đẹp, sang trọng.',
    price: 299,
    originalPrice: 299,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=HomePod+2',
    images: [],
    stock: 20,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Apple TV 4K (3rd Gen)',
    description: 'Apple TV 4K thế hệ 3 với chip A15 Bionic, hỗ trợ HDR10+, Dolby Vision. Remote mới, tích hợp Siri. Hoàn hảo cho giải trí tại nhà.',
    price: 129,
    originalPrice: 149,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Apple+TV+4K',
    images: [],
    stock: 35,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'iPhone 13 Pro',
    description: 'iPhone 13 Pro với chip A15 Bionic, camera 12MP Pro, màn hình Super Retina XDR 6.1 inch. Thiết kế đẹp, hiệu năng tốt. Giá tốt hơn so với thế hệ mới.',
    price: 899,
    originalPrice: 999,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+13+Pro',
    images: [],
    stock: 15,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'iPhone 13',
    description: 'iPhone 13 với chip A15 Bionic, camera dual 12MP, màn hình 6.1 inch. Pin tốt, hiệu năng ổn định. Lựa chọn hợp lý cho người dùng phổ thông.',
    price: 599,
    originalPrice: 699,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+13',
    images: [],
    stock: 30,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'iPhone SE (3rd Gen)',
    description: 'iPhone SE thế hệ 3 với chip A15 Bionic mạnh mẽ, thiết kế cổ điển. Màn hình 4.7 inch, Touch ID. Giá tốt, phù hợp cho người dùng cơ bản.',
    price: 429,
    originalPrice: 499,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+SE+3',
    images: [],
    stock: 25,
    rating: 4.5,
    reviews: []
  },
  {
    name: 'Mac Studio (M2 Ultra)',
    description: 'Mac Studio với chip M2 Ultra, hiệu năng cực mạnh. Thiết kế nhỏ gọn, phù hợp cho studio. Dành cho chuyên gia video editing và 3D rendering.',
    price: 3999,
    originalPrice: 3999,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=Mac+Studio',
    images: [],
    stock: 5,
    rating: 5,
    reviews: []
  },
  {
    name: 'Mac Studio (M2 Max)',
    description: 'Mac Studio với chip M2 Max, hiệu năng mạnh mẽ. Thiết kế compact, nhiều cổng kết nối. Phù hợp cho công việc chuyên nghiệp.',
    price: 1999,
    originalPrice: 1999,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=Mac+Studio+M2+Max',
    images: [],
    stock: 8,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'iMac 24" (M3)',
    description: 'iMac 24 inch với chip M3, màn hình Retina 4.5K đẹp mắt. Thiết kế mỏng, nhiều màu sắc. Hoàn hảo cho văn phòng và gia đình.',
    price: 1299,
    originalPrice: 1299,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=iMac+24+M3',
    images: [],
    stock: 12,
    rating: 4.8,
    reviews: []
  },
  {
    name: 'Mac mini (M2)',
    description: 'Mac mini với chip M2, thiết kế nhỏ gọn. Hiệu năng tốt, giá hợp lý. Phù hợp cho văn phòng và setup desktop tại nhà.',
    price: 599,
    originalPrice: 699,
    category: 'MacBook',
    image: 'https://via.placeholder.com/300x300?text=Mac+mini+M2',
    images: [],
    stock: 18,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'iPad Pro 11" (M4)',
    description: 'iPad Pro 11 inch với chip M4 mới nhất, màn hình Liquid Retina đẹp. Hiệu năng cực mạnh, hỗ trợ Apple Pencil Pro. Dành cho chuyên gia.',
    price: 999,
    originalPrice: 999,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Pro+11+M4',
    images: [],
    stock: 10,
    rating: 5,
    reviews: []
  },
  {
    name: 'iPad Pro 13" (M4)',
    description: 'iPad Pro 13 inch với chip M4, màn hình lớn nhất. Không gian làm việc rộng rãi, hiệu năng vượt trội. Hoàn hảo cho design và video editing.',
    price: 1299,
    originalPrice: 1299,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Pro+13+M4',
    images: [],
    stock: 8,
    rating: 5,
    reviews: []
  },
  {
    name: 'Studio Display',
    description: 'Màn hình Studio Display 27 inch 5K Retina của Apple. Webcam Center Stage, loa 6-speaker, micro array. Hoàn hảo cho Mac Studio và MacBook Pro.',
    price: 1599,
    originalPrice: 1599,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Studio+Display',
    images: [],
    stock: 15,
    rating: 4.9,
    reviews: []
  },
  {
    name: 'Pro Display XDR',
    description: 'Màn hình Pro Display XDR 32 inch 6K Retina chuyên nghiệp. Độ sáng cực cao, độ chính xác màu sắc tuyệt vời. Dành cho chuyên gia.',
    price: 4999,
    originalPrice: 4999,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Pro+Display+XDR',
    images: [],
    stock: 3,
    rating: 5,
    reviews: []
  },
  {
    name: 'Magic Trackpad',
    description: 'Magic Trackpad không dây với cảm ứng đa điểm. Thiết kế lớn, pin lâu. Tương thích với Mac và iPad. Trải nghiệm cảm ứng mượt mà.',
    price: 129,
    originalPrice: 149,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Magic+Trackpad',
    images: [],
    stock: 45,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'Magic Keyboard with Touch ID',
    description: 'Magic Keyboard với Touch ID tích hợp. Thiết kế đẹp, pin lâu. Hỗ trợ đăng nhập bằng vân tay. Dành cho Mac với chip Apple Silicon.',
    price: 149,
    originalPrice: 179,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Magic+Keyboard+Touch+ID',
    images: [],
    stock: 35,
    rating: 4.7,
    reviews: []
  },
  {
    name: 'iPhone 15 Silicone Case',
    description: 'Ốp lưng silicone chính hãng cho iPhone 15. Bảo vệ tốt, thiết kế đẹp, nhiều màu sắc. Tương thích với MagSafe, sạc không dây.',
    price: 49,
    originalPrice: 49,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Case',
    images: [],
    stock: 100,
    rating: 4.5,
    reviews: []
  },
  {
    name: 'iPhone 15 Pro Leather Case',
    description: 'Ốp lưng da chính hãng cho iPhone 15 Pro. Chất liệu cao cấp, bảo vệ tốt, thiết kế sang trọng. Tương thích với MagSafe.',
    price: 59,
    originalPrice: 69,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Leather',
    images: [],
    stock: 60,
    rating: 4.6,
    reviews: []
  },
  {
    name: 'AirTag',
    description: 'AirTag để theo dõi đồ vật. Kết nối với Find My app, độ chính xác cao. Pin CR2032, tuổi thọ pin lâu. Phù hợp cho ví, chìa khóa, túi xách.',
    price: 29,
    originalPrice: 29,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=AirTag',
    images: [],
    stock: 150,
    rating: 4.4,
    reviews: []
  },
  {
    name: 'AirTag 4-Pack',
    description: 'Bộ 4 AirTag với giá tốt hơn. Theo dõi nhiều đồ vật cùng lúc. Tích hợp Find My network, độ chính xác cao. Tiết kiệm khi mua số lượng.',
    price: 99,
    originalPrice: 116,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=AirTag+4Pack',
    images: [],
    stock: 80,
    rating: 4.5,
    reviews: []
  }
];

const USERS = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '0123456789',
    address: '123 Admin Street, District 1',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'admin'
  },
  {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    password: 'password123',
    phone: '0987654321',
    address: '456 Nguyễn Huệ, Quận 1',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Trần Thị Bình',
    email: 'tranthibinh@example.com',
    password: 'password123',
    phone: '0912345678',
    address: '789 Lê Lợi, Quận 3',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Lê Văn Cường',
    email: 'levancuong@example.com',
    password: 'password123',
    phone: '0901234567',
    address: '321 Trần Hưng Đạo, Hoàn Kiếm',
    city: 'Hanoi',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Phạm Thị Dung',
    email: 'phamthidung@example.com',
    password: 'password123',
    phone: '0908765432',
    address: '654 Nguyễn Văn Linh, Hải Châu',
    city: 'Da Nang',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Hoàng Văn Em',
    email: 'hoangvanem@example.com',
    password: 'password123',
    phone: '0909876543',
    address: '987 Lý Thường Kiệt, Ninh Kiều',
    city: 'Can Tho',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Vũ Thị Phương',
    email: 'vuthiphuong@example.com',
    password: 'password123',
    phone: '0907654321',
    address: '147 Võ Văn Tần, Quận 3',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Đỗ Văn Giang',
    email: 'dovangiang@example.com',
    password: 'password123',
    phone: '0906543210',
    address: '258 Điện Biên Phủ, Bình Thạnh',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Test Admin',
    email: 'admin2@example.com',
    password: 'admin123',
    phone: '0905432109',
    address: '369 Cầu Giấy',
    city: 'Hanoi',
    country: 'Vietnam',
    role: 'admin'
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    phone: '0904321098',
    address: '741 Nguyễn Trãi, Thanh Xuân',
    city: 'Hanoi',
    country: 'Vietnam',
    role: 'user'
  }
];

async function seedDatabase() {
  try {
    console.log('🚀 Starting database seeding...\n');
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Xóa dữ liệu cũ (để seed lại từ đầu)
    console.log('🗑️  Xóa dữ liệu cũ...');
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Address.deleteMany({});
    await Coupon.deleteMany({});
    console.log('✅ Đã xóa dữ liệu cũ\n');

    // Insert users (use create instead of insertMany to trigger pre('save') middleware)
    console.log('Creating users...');
    const createdUsers = [];
    for (const userData of USERS) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`✅ Created ${createdUsers.length} users\n`);

    // Get admin and regular users for orders
    const adminUsers = createdUsers.filter(u => u.role === 'admin');
    const regularUsers = createdUsers.filter(u => u.role === 'user');

    // Insert products
    console.log('Creating products...');
    const createdProducts = await Product.insertMany(PRODUCTS);
    console.log(`✅ Created ${createdProducts.length} products\n`);

    // Create sample orders
    console.log('Creating sample orders...');
    const orders = [];
    
    // Order 1: Pending order
    if (regularUsers[0] && createdProducts[0] && createdProducts[1]) {
      orders.push({
        orderNumber: generateOrderNumber(),
        userId: regularUsers[0]._id,
        items: [
          { productId: createdProducts[0]._id, quantity: 1, price: createdProducts[0].price },
          { productId: createdProducts[1]._id, quantity: 2, price: createdProducts[1].price }
        ],
        totalAmount: createdProducts[0].price + (createdProducts[1].price * 2),
        shippingAddress: {
          name: regularUsers[0].name,
          phone: regularUsers[0].phone,
          address: regularUsers[0].address,
          city: regularUsers[0].city,
          country: regularUsers[0].country,
          zipCode: '700000'
        },
        paymentMethod: 'qr_transfer',
        paymentStatus: 'pending',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      });
    }

    // Order 2: Confirmed order
    if (regularUsers[1] && createdProducts[2] && createdProducts[15]) {
      orders.push({
        orderNumber: generateOrderNumber(),
        userId: regularUsers[1]._id,
        items: [
          { productId: createdProducts[2]._id, quantity: 1, price: createdProducts[2].price },
          { productId: createdProducts[15]._id, quantity: 1, price: createdProducts[15].price }
        ],
        totalAmount: createdProducts[2].price + createdProducts[15].price,
        shippingAddress: {
          name: regularUsers[1].name,
          phone: regularUsers[1].phone,
          address: regularUsers[1].address,
          city: regularUsers[1].city,
          country: regularUsers[1].country,
          zipCode: '700000'
        },
        paymentMethod: 'bank_transfer',
        paymentStatus: 'completed',
        status: 'confirmed',
        paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      });
    }

    // Order 3: Shipped order
    if (regularUsers[2] && createdProducts[5]) {
      orders.push({
        orderNumber: generateOrderNumber(),
        userId: regularUsers[2]._id,
        items: [
          { productId: createdProducts[5]._id, quantity: 1, price: createdProducts[5].price }
        ],
        totalAmount: createdProducts[5].price,
        shippingAddress: {
          name: regularUsers[2].name,
          phone: regularUsers[2].phone,
          address: regularUsers[2].address,
          city: regularUsers[2].city,
          country: regularUsers[2].country,
          zipCode: '100000'
        },
        paymentMethod: 'credit_card',
        paymentStatus: 'completed',
        status: 'shipped',
        paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        shippedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      });
    }

    // Order 4: Delivered order
    if (regularUsers[3] && createdProducts[8] && createdProducts[20]) {
      orders.push({
        orderNumber: generateOrderNumber(),
        userId: regularUsers[3]._id,
        items: [
          { productId: createdProducts[8]._id, quantity: 1, price: createdProducts[8].price },
          { productId: createdProducts[20]._id, quantity: 1, price: createdProducts[20].price }
        ],
        totalAmount: createdProducts[8].price + createdProducts[20].price,
        shippingAddress: {
          name: regularUsers[3].name,
          phone: regularUsers[3].phone,
          address: regularUsers[3].address,
          city: regularUsers[3].city,
          country: regularUsers[3].country,
          zipCode: '550000'
        },
        paymentMethod: 'qr_transfer',
        paymentStatus: 'completed',
        status: 'delivered',
        paidAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        shippedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
      });
    }

    // Order 5: Another pending order
    if (regularUsers[4] && createdProducts[12]) {
      orders.push({
        orderNumber: generateOrderNumber(),
        userId: regularUsers[4]._id,
        items: [
          { productId: createdProducts[12]._id, quantity: 1, price: createdProducts[12].price }
        ],
        totalAmount: createdProducts[12].price,
        shippingAddress: {
          name: regularUsers[4].name,
          phone: regularUsers[4].phone,
          address: regularUsers[4].address,
          city: regularUsers[4].city,
          country: regularUsers[4].country,
          zipCode: '940000'
        },
        paymentMethod: 'cash_on_delivery',
        paymentStatus: 'pending',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      });
    }

    if (orders.length > 0) {
      const createdOrders = await Order.insertMany(orders);
      console.log(`✅ Created ${createdOrders.length} sample orders\n`);
    } else {
      console.log('⚠️  No orders created (insufficient users or products)\n');
    }

    // Tạo Addresses mẫu cho users
    console.log('📍 Creating sample addresses...');
    const addresses = [];
    for (let i = 0; i < Math.min(regularUsers.length, 5); i++) {
      const user = regularUsers[i];
      addresses.push({
        userId: user._id,
        name: user.name,
        phone: user.phone,
        address: user.address,
        district: 'Quận 1',
        city: user.city,
        country: user.country,
        zipCode: '700000',
        isDefault: i === 0, // User đầu tiên có địa chỉ mặc định
        label: i === 0 ? 'Nhà riêng' : 'Công ty'
      });
    }
    let createdAddresses = [];
    if (addresses.length > 0) {
      createdAddresses = await Address.insertMany(addresses);
      console.log(`✅ Created ${createdAddresses.length} addresses\n`);
    }

    // Tạo Coupons mẫu
    console.log('🎫 Creating sample coupons...');
    const coupons = [
      {
        code: 'WELCOME10',
        name: 'Giảm 10% cho khách hàng mới',
        description: 'Áp dụng cho đơn hàng đầu tiên',
        discountType: 'percentage',
        discountValue: 10,
        minPurchaseAmount: 0,
        maxDiscountAmount: 100,
        usageLimit: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 ngày
        isActive: true
      },
      {
        code: 'SALE20',
        name: 'Giảm 20% cho đơn hàng trên $500',
        description: 'Áp dụng cho đơn hàng từ $500 trở lên',
        discountType: 'percentage',
        discountValue: 20,
        minPurchaseAmount: 500,
        maxDiscountAmount: 200,
        usageLimit: 50,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 ngày
        isActive: true,
        applicableCategories: ['iPhone', 'iPad', 'MacBook']
      },
      {
        code: 'FIXED50',
        name: 'Giảm $50 cố định',
        description: 'Giảm $50 cho đơn hàng bất kỳ',
        discountType: 'fixed',
        discountValue: 50,
        minPurchaseAmount: 100,
        usageLimit: 20,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 ngày
        isActive: true
      }
    ];
    const createdCoupons = await Coupon.insertMany(coupons);
    console.log(`✅ Created ${createdCoupons.length} coupons\n`);

    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ Database seeded successfully!');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('📊 Tổng Kết:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Products: ${createdProducts.length}`);
    console.log(`   • Orders: ${orders.length}`);
    console.log(`   • Addresses: ${createdAddresses.length}`);
    console.log(`   • Coupons: ${createdCoupons.length}\n`);

    console.log('👤 Test Accounts:');
    USERS.forEach(user => {
      const roleIcon = user.role === 'admin' ? '🔑' : '👤';
      console.log(`   ${roleIcon} ${user.name}`);
      console.log(`      Email: ${user.email}`);
      console.log(`      Password: ${user.password}`);
      console.log(`      Role: ${user.role}\n`);
    });

    console.log('📦 Product Categories:');
    const categories = [...new Set(createdProducts.map(p => p.category))];
    categories.forEach(cat => {
      const count = createdProducts.filter(p => p.category === cat).length;
      console.log(`   • ${cat}: ${count} products`);
    });

    console.log('\n🎫 Coupons:');
    createdCoupons.forEach(coupon => {
      const discount = coupon.discountType === 'percentage' 
        ? `${coupon.discountValue}%` 
        : `$${coupon.discountValue}`;
      console.log(`   • ${coupon.code}: Giảm ${discount} - ${coupon.name}`);
    });

    console.log('\n💡 Bạn có thể test tất cả tính năng với dữ liệu này!');
    console.log('📚 Xem thêm: HUONG_DAN_SEED_CO_BAN.md\n');

    await mongoose.disconnect();
    console.log('✅ Đã ngắt kết nối MongoDB');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
