const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notebooks: [    {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    name: String
  }],
  premium: {
    type: Boolean,
    default: false,
  }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
