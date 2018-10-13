const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wrongAnswerSchema = new Schema({
  answer: {
    type: String,
  },
  liked: [[Schema.Types.ObjectId]]
});

const WrongAnswer = mongoose.model('User', wrongAnswerSchema);

module.exports = WrongAnswer;
