const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://pradeepmeandev:Deep1992@cluster0.qhfvfea.mongodb.net/mydbNew?retryWrites=true&w=majority";

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
