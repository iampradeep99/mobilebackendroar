const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

const addUser = async (req, res) => {
    try {
      let {
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
        role,
        associatedWith // expect array of IDs from client
      } = req.body;
      if (Array.isArray(associatedWith)) {
        associatedWith = associatedWith.map(item => {
          if (typeof item.relatedId === 'string') {
            return {
              ...item,
              relatedId: new mongoose.Types.ObjectId(item.relatedId)
            };
          }
          return item;
        });
      }
      
  
      // Basic validation (add role validation if needed)
      if (!firstName || !lastName || !email || !password || !mobile) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists with this email' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user instance with hashed password, role, associatedWith
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobile,
        address,
        pincode,
        isDeleted: isDeleted || false,
        isActive: isActive !== undefined ? isActive : true,
        image,
        role: role || 'user', // default role if not provided
        associatedWith: associatedWith || [] // default empty array
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
  


  const listAssociates = async (req, res) => {
    try {
      const { role } = req.body;
  
      let query = {
        isDeleted: false,
        role: { $in: [2, 3] } 
      };
  
      if (role && [2, 3].includes(Number(role))) {
        query.role = Number(role);
      }
  
      const associates = await User.find(query).select('-password');
  
      res.status(200).json({
        success: true,
        count: associates.length,
        data: associates
      });
    } catch (err) {
      console.error('Error fetching associates:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

module.exports = {
  addUser,
  listAssociates
};
