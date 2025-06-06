const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace the following with your actual MongoDB connection string
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {connectDB};
