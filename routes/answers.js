const express = require('express');
const router = express.Router();
const Answer = require('../models/Answers');
const Problem = require('../models/Problems');
const User = require('../models/Users');
const ERRORS = require('../lib/errors');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'listeupsecret';
const authTokenCheck = require('../middleware/authTokenCheck');

router.post('/', authTokenCheck, function (req, res, next) {
  const { uid, answer, problemId } = req.body;
  User.findOne({ uid })
    .then((result) => {
      const newAnswer = new Answer({
        answer,
        user: result._id,
        problemId
      });
      newAnswer.save((err, answer) => {
        if (err) {
          next(new ERRORS.ServerError());
        } else {
          res.status(201).json({
            message: 'new answer created',
          });
        }
      });
    });
});

router.put('/like', authTokenCheck, function (req, res, next) {
  const { uid, answerId } = req.body;
  Answer.findOne({ _id: answerId })
    .then((result) => {
      result.liked.push(uid);
      result.save((err, like) => {
        if (err) {
          next(new ERRORS.ServerError());
        } else {
          Answer.find({}).sort({ "liked": -1 })
            .then((result) => {
              res.status(200).json({
                message: 'Load answer success',
                result
              });
            })
            .catch((err) => {
              next(new ERRORS.ServerError());
            });
        }
      });
    })
    .catch((err) => {
      next(new ERRORS.ServerError());
    });
});

router.put('/unlike', authTokenCheck, function (req, res, next) {
  const { uid, answerId } = req.body;
  Answer.findOne({ _id: answerId })
    .then((result) => {
      result.liked.pop(uid);
      result.save((err, like) => {
        if (err) {
          next(new ERRORS.ServerError());
        } else {
          Answer.find({}).sort({ "liked": -1 })
            .then((result) => {
              res.status(200).json({
                message: 'Load answer success',
                result
              });
            })
            .catch((err) => {
              next(new ERRORS.ServerError());
            });
        }
      });
    })
    .catch((err) => {
      next(new ERRORS.ServerError());
    });
});

router.get('/', authTokenCheck, function (req, res, next) {
  if ((Object.keys(req.query)).length === 0 || req.query.sort === 'like') {
    Answer.find({}).sort({ "liked": -1 })
      .then((result) => {
        res.status(200).json({
          message: 'Load answer success',
          result
        });
      })
      .catch((err) => {
        next(new ERRORS.ServerError());
      });
  } else {
    Answer.find({}).sort({ "_id": -1 })
      .then((result) => {
        res.status(200).json({
          message: 'Load answer success',
          result
        });
      })
      .catch((err) => {
        next(new ERRORS.ServerError());
      });
  }
});

module.exports = router;
