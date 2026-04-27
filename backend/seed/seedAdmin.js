require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for admin seeding');

    const adminExists = await User.findOne({ username: 'admin' });
    if (adminExists) {
      adminExists.password = 'admin';
      await adminExists.save();
      console.log('Admin user password updated to "admin"');
    } else {
      const admin = new User({
        username: 'admin',
        password: 'admin', // Simple password for testing
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created successfully');
      console.log('Username: admin');
      console.log('Password: adminpassword123');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedAdmin();
