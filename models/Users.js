const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: String,
  name: String,
  point: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
