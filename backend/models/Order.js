import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    zipCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash_on_delivery', 'qr_transfer'],
    default: 'cash_on_delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  // New payment fields for SePay integration
  paidAt: {
    type: Date
  },
  paymentDetails: {
    method: String,
    gateway: String,
    transactionId: String,
    referenceCode: String,
    amount: Number,
    content: String,
    paidAt: Date
  },
  paymentNote: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate order number (số dễ nhớ cho chuyển khoản)
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    // Format: timestamp cuối (dễ copy vào nội dung chuyển khoản)
    this.orderNumber = `${Date.now()}`;
  }
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Order', orderSchema);
