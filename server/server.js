// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Will be implemented later
const walletRoutes = require('./routes/walletRoutes');   // Will be implemented later

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for parsing application/json

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('Cash App MVP Backend is running!');
});

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/payments', paymentRoutes); // Uncomment when ready to implement payments
// app.use('/api/wallet', walletRoutes);     // Uncomment when ready to implement wallet features

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});