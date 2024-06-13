// routes/authRoutes.js
const express = require('express');
const { verifyUser, getUserInfo } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/verify', verifyUser);
router.get('/user', authenticate, getUserInfo);

module.exports = router;
