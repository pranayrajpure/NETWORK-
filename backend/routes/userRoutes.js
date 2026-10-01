const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/user/profile
// @desc    Get logged-in user's profile (Protected)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Find user by ID from JWT payload, exclude password field
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/user/plan
// @desc    Get logged-in user's active internet plan details (Protected)
router.get('/plan', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email plan');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ISP Plans mapping dictionary
    const plansDetails = {
      'Basic': { speed: '50 Mbps', price: '₹499/month' },
      'Smart': { speed: '100 Mbps', price: '₹699/month' },
      'Pro': { speed: '200 Mbps', price: '₹999/month' },
      'Ultra': { speed: '500 Mbps', price: '₹1499/month' }
    };

    const activePlan = user.plan || 'Basic';

    res.json({
      success: true,
      customer: user.name,
      activePlan: activePlan,
      details: plansDetails[activePlan]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;