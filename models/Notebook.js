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
}, { collection: 'notebooks' });

module.exports = mongoose.model('Notebook', NotebookSchema);