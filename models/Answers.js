const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  user: Schema.Types.ObjectId,
  problemId: Schema.Types.ObjectId,
  problem: {},
  liked: {
    type: [String],
    default: []
  }
}, {
  timestamps: {
    createdAt: 'create_at'
  }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
