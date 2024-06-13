// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notebooks: {
    type: Number,
    default: 5,
  },
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
