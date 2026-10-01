const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, mobile, plan } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      mobile,
      plan
    });

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        plan: user.plan
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    // Safely check email, username, or emailOrUsername from frontend request body
    const loginIdentifier = req.body.email || req.body.username || req.body.emailOrUsername;
    const { password } = req.body;

    console.log("➔ Login attempt for identifier:", loginIdentifier);

    if (!loginIdentifier || !password) {
      return res.status(400).json({ message: 'Please provide email/username and password' });
    }

    // Find user by matching either email or username in MongoDB
    const user = await User.findOne({
      $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
    });

    if (!user) {
      console.log("❌ User not found:", loginIdentifier);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password incorrect for:", loginIdentifier);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log("✅ Login successful for:", loginIdentifier);
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        plan: user.plan
      }
    });
  } catch (error) {
    console.error("🔥 Login Error:", error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };