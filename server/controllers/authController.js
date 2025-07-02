// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// In a real app, you'd import your User model/database functions here
// const User = require('../models/User'); // Will be used when integrating with database

// --- MVP Mock Data (In-memory "database" for quick testing) ---
const users = []; // This array will store user objects (id, email, hashedPassword, balance)
// --- END MVP Mock Data ---


exports.signup = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Check if user already exists (using mock data)
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password (salt rounds: 10)
    const newUser = { id: users.length + 1, email, password: hashedPassword, balance: 0.00 }; // Initialize balance
    users.push(newUser); // Add to mock "database"
    console.log('New user signed up:', newUser.email); // Log without password
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Find user (using mock data)
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with hashed password
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token (Payload: userId, email; Secret: from .env; Expiry: 1 hour)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_fallback', // Use fallback if .env is not loaded
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};