const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: String,
  name: String,
  point: {
    type: Number,
    default: 0
  }
});

// point default

const User = mongoose.model('User', userSchema);

module.exports = User;
