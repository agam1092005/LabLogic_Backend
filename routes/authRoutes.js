const express = require('express');
const { verifyUser, getUserInfo, deleteUserAccount } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/verify', verifyUser);
router.get('/user', authenticate, getUserInfo);
router.delete('/user', authenticate, deleteUserAccount);

module.exports = router;
