const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    trim: true,
  },
  role: {
    type: Number,
    enum: [1, 2, 3], // 1: admin, 2: associate, 3: customer
    required: true,
    default: 3, // default role as customer
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String, // could be a URL or file path
  },

  associatedWith: [{
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',   // optional, if you want references inside objects
        required: true
      },   
  }]
}, {
  timestamps: true, // automatically adds createdAt and updatedAt fields
});


const User = mongoose.model('User', userSchema);

module.exports = User;
