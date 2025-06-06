
const User = require('../models/user');
const addUser = async (req, res)=>{
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
    
        // Basic validation (you can enhance this)
        if (!firstName || !lastName || !email || !password || !mobile) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists with this email' });
        }
    
        // Create user instance
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          mobile,
          address,
          pincode,
          isDeleted: isDeleted || false,
          isActive: isActive !== undefined ? isActive : true,
          image,
        });

        await newUser.save();
        const userToReturn = newUser.toObject();
        delete userToReturn.password;
    
        res.status(201).json(userToReturn);
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error' });
      }
}





module.exports = {
    addUser:addUser
}