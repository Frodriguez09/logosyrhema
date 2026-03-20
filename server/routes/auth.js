const express = require('express');
const router = express.Router();
const { loginLimiter } = require('../middleware/rateLimiter');
const {login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.get('/verify', authMiddleware, (req, res) => res.json({ valid: true }));
router.post('/login', loginLimiter, login);

module.exports = router;


