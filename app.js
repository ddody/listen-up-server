const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const problemsRouter = require('./routes/problems');
const answerRouter = require('./routes/answers');

const app = express();

mongoose.connect(`mongodb://admin:admin1234@ds057224.mlab.com:57224/listen-up`);

const db = mongoose.connection;
db.once('open', function () {
  console.log('Connected....');
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/problems', problemsRouter);
app.use('/answers', answerRouter);

app.use(function (err, req, res, next) {
  res.status(err.status).json({
    message: err.message
  });
});

module.exports = app;
