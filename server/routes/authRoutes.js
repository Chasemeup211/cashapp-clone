// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/signup - Create user
router.post('/signup', authController.signup);

// POST /api/auth/login - Authenticate user
router.post('/login', authController.login);

module.exports = router;