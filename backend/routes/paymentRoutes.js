const express = require('express');
const router = express.Router();
const { processPayment, getPaymentHistory } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware'); // Protect routes with JWT

// POST /api/payment/pay - Process test payment
router.post('/pay', auth, processPayment);

// GET /api/payment/history - Get payment history
router.get('/history', auth, getPaymentHistory);

module.exports = router;