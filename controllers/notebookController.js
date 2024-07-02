const Notebook = require('../models/Notebook');
const User = require('../models/User');

const createNotebook = async (req, res) => {
  const { records, research, name } = req.body;

  try {
    const newNotebook = new Notebook({ records, research, name });
    await newNotebook.save();

    // Update user's notebooks array with the new notebook's _id and name
    await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          notebooks: { _id: newNotebook._id, name: newNotebook.name },
        },
      }
    );

    return res.status(201).json(newNotebook);
  } catch (error) {
    console.log(error);
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

const getNotebookById = async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id);

    if (!notebook) {
      return res.status(404).json({ error: 'Notebook not found' });
    }

    return res.status(200).json(notebook);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createNotebook, getNotebooks, getNotebookById };
