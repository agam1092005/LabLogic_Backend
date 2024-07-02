// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyUser = async (req, res) => {
  const { email } = req.body;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('jwt', `"${token}"`, { httpOnly: true });

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      notebooks: user.notebooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      notebooks: user.notebooks,
      premium: user.premium,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { verifyUser, getUserInfo };
