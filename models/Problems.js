const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
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
  user: [Schema.Types.ObjectId],
  lyrics: {
    type: String,
    required: true
  }
});

const Problem = mongoose.model('User', problemSchema);

Problem.Schema.path('link').validate(function (value) {

});

Problem.Schema.path('lyrics').validate(function (value) {

});

module.exports = Problem;
