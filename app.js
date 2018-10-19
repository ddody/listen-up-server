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

const DB_URL = process.env.NODE_ENV !== 'production' ?
`mongodb://admin:${process.env.DB_PASSWORD}@ds143211.mlab.com:43211/listen-up-development` :
`mongodb://admin:${process.env.DB_PASSWORD}@ds057224.mlab.com:57224/listen-up`;

mongoose.connect(DB_URL);

const db = mongoose.connection;
db.once('open', function () {
  console.log('Connected....', DB_URL);
});

const whitelist = [
  'https://listenup.kr',
  'https://www.listenup.kr',
  'https://dev.listenup.kr'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else if (process.env.NODE_ENV === 'production') {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS Security'));
      }
    }
  }
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/problems', problemsRouter);
app.use('/answers', answerRouter);

app.use(function (err, req, res, next) {
  res.status(err.status ? err.status : 500).json({
    message: err.message
  });
});

module.exports = app;
