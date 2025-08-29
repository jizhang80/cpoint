const express = require('express');
const rateLimit = require('express-rate-limit');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later'
    }
});

router.post('/register', authLimiter, AuthController.register);

router.post('/login', authLimiter, AuthController.login);

router.get('/me', authenticateToken, AuthController.getMe);

router.put('/profile', authenticateToken, AuthController.updateProfile);

router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;