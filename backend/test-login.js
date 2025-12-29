import mongoose from 'mongoose';
import User from './models/User.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB\n');

    // Find admin user
    const user = await User.findOne({ email: 'admin@example.com' });
    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    console.log('User found:', user.email);
    console.log('Password hash length:', user.password.length);
    console.log('Password hash:', user.password);

    // Test password comparison
    const testPassword = 'admin123';
    console.log('\n--- Testing password comparison ---');
    console.log('Testing password:', testPassword);
    
    const isMatch = await user.comparePassword(testPassword);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('\n❌ Password mismatch!');
      console.log('This could mean:');
      console.log('1. Password was not hashed correctly during seed');
      console.log('2. comparePassword method has an issue');
    } else {
      console.log('\n✅ Password matches!');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

test();
