import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Basic info
  product_id: String,        // optional external id
  sku: String,
  name: { type: String, required: true },
  brand: String,
  description: String,
  category: { type: String, required: true },

  // Pricing & inventory
  price: { type: Number, required: true },
  originalPrice: Number,
  discountPercentage: Number,
  currency: { type: String, default: 'VND' },
  stockStatus: String,
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },

  // Media
  image: String,          // main image / thumbnail
  thumbnail: String,      // explicit thumbnail if provided
  images: [String],

  // Product details
  specifications: mongoose.Schema.Types.Mixed,
  variants: [{
    color: String,
    hexCode: String,
    sku_variant: String
  }],
  promotions: [String],
  tags: [String],
  warranty: String,
  returnPolicy: String,

  // Ratings & reviews
  rating: { type: Number, default: 0 },
  reviews: [{
    user: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],

  // Relations
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
