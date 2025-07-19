const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // A good practice to enforce a minimum password length
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;