const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notebooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notebook',
  }],
  premium: {
    type: Boolean,
    default: false,
  }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
