const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// Initialize MongoDB Connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes')); // <-- ADDED: Protected user routes

// Root Endpoint
app.get('/', (req, res) => {
  res.send('NETCONNECT ISP Backend API Server Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[NETCONNECT Server]: Running on http://localhost:${PORT}`);
});