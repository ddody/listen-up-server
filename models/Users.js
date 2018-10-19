const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
