const mongoose = require('mongoose');

const NotebookSchema = new mongoose.Schema({
  records: {
    type: Array,
    default: [],
  },
  research: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
}, { collection: 'notebooks' });

module.exports = mongoose.model('Notebook', NotebookSchema);