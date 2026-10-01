const Payment = require('../models/Payment');
const User = require('../models/User');

// Process Sandbox Payment
const processPayment = async (req, res) => {
  try {
    const { plan, amount } = req.body;
    const userId = req.user.id; // Extracted from JWT auth middleware

    // Generate a secure Sandbox Test Payment ID
    const paymentId = 'PAY_SANDBOX_' + Math.random().toString(36).substring(2, 9).toUpperCase() + Date.now();

    // 1. Store payment record in MongoDB
    const newPayment = await Payment.create({
      userId,
      plan,
      amount,
      paymentId,
      status: 'SUCCESS'
    });

    // 2. Update user's active broadband plan subscription
    await User.findByIdAndUpdate(userId, { plan: plan });

    res.status(201).json({
      success: true,
      message: 'Sandbox Payment Successful & Subscription Activated!',
      payment: {
        paymentId: newPayment.paymentId,
        plan: newPayment.plan,
        amount: newPayment.amount,
        date: newPayment.date
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment processing failed', error: error.message });
  }
};

// Get Payment History for logged-in user
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch payment history' });
  }
};

module.exports = { processPayment, getPaymentHistory };