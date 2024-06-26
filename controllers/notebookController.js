const Notebook = require('../models/Notebook');
const User = require('../models/User');

const createNotebook = async (req, res) => {
  const { records, research } = req.body;

  try {
    const newNotebook = new Notebook({ records, research });
    await newNotebook.save();

    // Update user's notebooks array
    await User.findByIdAndUpdate(req.userId, {
      $push: { notebooks: newNotebook._id }
    });

    return res.status(201).json(newNotebook);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const getNotebooks = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('notebooks');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user.notebooks);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createNotebook, getNotebooks };
