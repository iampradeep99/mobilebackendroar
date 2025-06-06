const bcrypt = require('bcryptjs');
const User = require('../models/user');

const addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      address,
      pincode,
      isDeleted,
      isActive,
      image,
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !mobile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // 🔐 Hash the password
    const salt = await bcrypt.genSalt(10); // you can use 12 for stronger hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user instance with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
      mobile,
      address,
      pincode,
      isDeleted: isDeleted || false,
      isActive: isActive !== undefined ? isActive : true,
      image,
    });

    // Save the user
    await newUser.save();

    // Remove password before returning user object
    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addUser
};
