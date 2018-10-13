const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  user: Schema.Types.ObjectId,
  lyrics: {
    type: String,
    required: true
  },
  wrongAnswer: [Schema.Types.ObjectId]
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
