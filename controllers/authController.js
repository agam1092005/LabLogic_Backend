const User = require('../models/User');
const Notebook = require('../models/Notebook');
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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15d' });

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

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete all notebooks associated with the user
    await Notebook.deleteMany({ _id: { $in: user.notebooks.map(notebook => notebook._id) } });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Clear the JWT cookie
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });

    return res.status(200).json({ message: 'User and all associated notebooks deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { verifyUser, getUserInfo, deleteUserAccount };
