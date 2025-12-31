import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

// Mapping categories từ DummyJSON sang Apple categories
const categoryMapping = {
  'smartphones': 'iPhone',
  'laptops': 'MacBook',
  'tablets': 'iPad',
  'mobile-accessories': 'Accessories',
  'womens-watches': 'Apple Watch',
  'mens-watches': 'Apple Watch',
  'sunglasses': 'Accessories',
  'default': 'Accessories'
};

async function fetchProductsFromAPI() {
  console.log('🌐 Fetching products from DummyJSON API...');
  
  try {
    // Fetch smartphones, laptops, tablets
    const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories', 'mens-watches'];
    let allProducts = [];
    
    for (const cat of categories) {
      const response = await fetch(`https://dummyjson.com/products/category/${cat}?limit=10`);
      const data = await response.json();
      allProducts = [...allProducts, ...data.products];
      console.log(`  ✓ Fetched ${data.products.length} products from ${cat}`);
    }
    
    return allProducts;
  } catch (error) {
    console.error('Failed to fetch from API:', error);
    return [];
  }
}

async function seedFromAPI() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products\n');

    // Fetch from API
    const apiProducts = await fetchProductsFromAPI();
    
    if (apiProducts.length === 0) {
      console.log('No products fetched. Using fallback data...');
      return;
    }

    // Transform API data to our schema
    const products = apiProducts.map(p => ({
      name: p.title,
      description: p.description,
      price: p.price,
      originalPrice: Math.round(p.price * 1.2), // 20% higher original price
      category: categoryMapping[p.category] || categoryMapping.default,
      image: p.thumbnail,
      images: p.images || [p.thumbnail],
      stock: p.stock || 50,
      rating: p.rating || 4.5,
      brand: p.brand || 'Apple',
      sku: `SKU-${p.id}`,
      specs: {
        screen: p.dimensions ? `${p.dimensions.width}x${p.dimensions.height}` : null,
        weight: p.weight ? `${p.weight}g` : null
      },
      tags: p.tags || [],
      reviews: []
    }));

    // Insert products
    await Product.insertMany(products);
    console.log(`\n✅ Imported ${products.length} products from API!\n`);

    // Create default users if not exist
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      await User.create([
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin'
        },
        {
          name: 'Test User',
          email: 'user@example.com',
          password: 'password123',
          role: 'user'
        }
      ]);
      console.log('✓ Created default users');
    }

    // Show summary
    console.log('\n📊 Import Summary:');
    const categoryCounts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    categoryCounts.forEach(c => console.log(`  - ${c._id}: ${c.count} products`));

    console.log('\n🎉 Database seeded successfully from API!');
    console.log('\nTest Accounts:');
    console.log('  - Admin: admin@example.com / admin123');
    console.log('  - User: user@example.com / password123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedFromAPI();
