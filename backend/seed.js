/**
 * MongoDB Seed Data Script
 * Chạy script này để thêm dữ liệu mẫu vào MongoDB
 * 
 * Cách chạy:
 * 1. Đảm bảo MongoDB đang chạy
 * 2. chạy: node seed.js
 */

import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const PRODUCTS = [
  {
    name: 'iPhone 15 Pro Max',
    description: 'Điện thoại flagship Apple với chip A17 Pro, camera 48MP, màn hình Super Retina XDR 6.7 inch. Tính năng nổi bật: USB-C, Action Button, Titanium design, Night mode camera, ProRAW video',
    price: 1199,
    originalPrice: 1199,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max',
    stock: 25,
    rating: 5,
    specs: {
      screen: '6.7" Super Retina XDR',
      processor: 'Apple A17 Pro',
      camera: '48MP Wide + 12MP Ultra Wide + 12MP Telephoto',
      battery: '4685 mAh',
      storage: '256GB/512GB/1TB',
      color: 'Black, Silver, Gold, Deep Purple'
    }
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Flagship iPhone với màn hình 6.1 inch Super Retina XDR. Chip A17 Pro siêu mạnh, camera ProMotion, thiết kế titanium bền bỉ. Hoàn hảo cho công việc & sáng tạo nội dung',
    price: 999,
    originalPrice: 999,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
    stock: 35,
    rating: 5,
    specs: {
      screen: '6.1" Super Retina XDR',
      processor: 'Apple A17 Pro',
      camera: '48MP Wide + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3582 mAh',
      storage: '256GB/512GB/1TB',
      color: 'Black, Silver, Gold, Deep Purple'
    }
  },
  {
    name: 'iPhone 15',
    description: 'iPhone phổ thông với chip A16 Bionic mạnh mẽ. Màn hình 6.1 inch Liquid Retina, camera dual 48MP, sạc USB-C. Lựa chọn tốt cho người dùng bình thường',
    price: 799,
    originalPrice: 899,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15',
    stock: 45,
    rating: 4.8,
    specs: {
      screen: '6.1" Liquid Retina',
      processor: 'Apple A16 Bionic',
      camera: '48MP Wide + 12MP Ultra Wide',
      battery: '3582 mAh',
      storage: '128GB/256GB/512GB',
      color: 'Black, Pink, Yellow, Blue, Green'
    }
  },
  {
    name: 'iPhone 15 Plus',
    description: 'Phiên bản Plus với màn hình 6.7 inch Liquid Retina lớn. Camera 48MP + 12MP Ultra Wide, A16 Bionic, pin khỏe. Dành cho người thích màn hình lớn',
    price: 899,
    originalPrice: 999,
    category: 'iPhone',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Plus',
    stock: 40,
    rating: 4.8,
    specs: {
      screen: '6.7" Liquid Retina',
      processor: 'Apple A16 Bionic',
      camera: '48MP Wide + 12MP Ultra Wide',
      battery: '4325 mAh',
      storage: '128GB/256GB/512GB',
      color: 'Black, Pink, Yellow, Blue, Green'
    }
  },
  {
    name: 'iPad Pro 12.9" (M2)',
    description: 'Máy tính bảng cao cấp với chip M2, màn hình Liquid Retina XDR 12.9 inch. Hỗ trợ Apple Pencil Pro, MagicKeyboard. Hoàn hảo cho design, video editing',
    price: 1099,
    originalPrice: 1099,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Pro+12.9',
    stock: 15,
    rating: 5,
    specs: {
      screen: '12.9" Liquid Retina XDR',
      processor: 'Apple M2',
      camera: '12MP Wide + 10MP Ultra Wide',
      battery: 'Up to 10 hours',
      storage: '128GB/256GB/512GB/1TB/2TB',
      color: 'Space Black, Silver'
    }
  },
  {
    name: 'iPad Air 11" (M1)',
    description: 'iPad Air với chip M1 mạnh mẽ, màn hình 11 inch. Nhẹ, mỏng, hỗ trợ accessories Apple. Cân bằng hoàn hảo giữa performance và giá cả',
    price: 599,
    originalPrice: 599,
    category: 'iPad',
    image: 'https://via.placeholder.com/300x300?text=iPad+Air+11',
    stock: 20,
    rating: 4.9,
    specs: {
      screen: '11" Liquid Retina',
      processor: 'Apple M1',
      camera: '12MP Wide + 8MP Ultra Wide',
      battery: 'Up to 10 hours',
      storage: '64GB/256GB/512GB',
      color: 'Space Gray, Purple, Blue, Pink, Starlight'
    }
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Smartwatch Apple mới nhất với chip S9, màn hình Always-On. Tính năng health: ECG, SpO2, sleep tracking. Chống nước, pin 18 giờ',
    price: 399,
    originalPrice: 399,
    category: 'Apple Watch',
    image: 'https://via.placeholder.com/300x300?text=Apple+Watch+Series+9',
    stock: 50,
    rating: 4.8,
    specs: {
      screen: '1.9" LTPO OLED',
      processor: 'Apple S9',
      battery: '~18 hours',
      features: 'ECG, Blood Oxygen, Always-On Display, Fitness Tracking',
      color: 'Silver, Midnight, Gold, Starlight'
    }
  },
  {
    name: 'AirPods Pro (2nd Gen)',
    description: 'Tai nghe AirPods Pro generation 2 với Adaptive Audio, Active Noise Cancellation. Âm thanh Spatial Audio, sạc USB-C. Pin 6 giờ đơn lẻ',
    price: 249,
    originalPrice: 249,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=AirPods+Pro',
    stock: 100,
    rating: 5,
    specs: {
      features: 'ANC, Adaptive Audio, Spatial Audio, USB-C',
      battery: '6 hours (+ 30 hours case)',
      color: 'White',
      weight: '5.3g each'
    }
  }
];

const USERS = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '0123456789',
    address: '123 Admin St',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    phone: '0987654321',
    address: '456 Main St',
    city: 'Hanoi',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'jane123',
    phone: '0912345678',
    address: '789 Oak Ave',
    city: 'Da Nang',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    phone: '0901234567',
    address: '321 Test St',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    role: 'user'
  },
  {
    name: 'Test Admin',
    email: 'admin2@example.com',
    password: 'admin123',
    phone: '0908765432',
    address: '654 Admin Ave',
    city: 'Hanoi',
    country: 'Vietnam',
    role: 'admin'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert users (use create instead of insertMany to trigger pre('save') middleware)
    console.log('Creating users...');
    for (const userData of USERS) {
      const user = new User(userData);
      console.log('Before save - password:', user.password);
      await user.save();
      console.log('After save - password length:', user.password.length);
    }
    console.log(`✓ Created ${USERS.length} users`);

    // Insert products
    console.log('Creating products...');
    await Product.insertMany(PRODUCTS);
    console.log(`✓ Created ${PRODUCTS.length} products`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Accounts:');
    USERS.forEach(user => {
      console.log(`- ${user.name}: ${user.email} / ${user.password}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
