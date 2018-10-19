const express = require('express');
const router = express.Router();
const Problem = require('../models/Problems');
const User = require('../models/Users');
const ERRORS = require('../lib/errors');
const authTokenCheck = require('../middleware/authTokenCheck');
const asyncMap = require('async/map');


router.post('/', authTokenCheck, function (req, res, next) {
  const { uid, link, startTime, endTime, lyrics, title } = req.body;
  User.findOne({ uid })
    .then((result) => {
      const newProblem = new Problem({
        title,
        link,
        startTime,
        endTime,
        lyrics,
        user: result._id
      });

      newProblem.save((err, user) => {
        if (err) {
          next(new ERRORS.ServerError());
        } else {
          res.status(201).json({
            message: 'new problem created',
          });
        }
      });
    })
    .catch((err) => {
      next(new ERRORS.ServerError());
    });
});

router.get('/random', authTokenCheck, function (req, res, next) {
  Problem.count({}, function (err, count) {
    if (err) {
      next(new ERRORS.ServerError());
    } else {

      let randomArr = [];
      const PROBLEM_NUMBER = 0;

      const randomNum = () => {
        let random = Math.floor(Math.random() * (count));
        if (randomArr.length > PROBLEM_NUMBER) {
          return;
        } else if (randomArr.length >= 0) {
          if (randomArr.indexOf(random) > -1) {
            randomNum();
          } else {
            randomArr.push(random);
            randomNum();
          }
        }
      }

      randomNum();

      const problemArr = randomArr.map(item => {
        return Problem.findOne().skip(item);
      });

      Promise.all(problemArr)
        .then(function (result) {
          res.status(200).json({
            result
          });
        })
        .catch((err) => {
          next(new ERRORS.ServerError());
        });
    }
  });
});

router.get('/:id', function (req, res, next) {
  Problem.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        result
      })
    })
    .catch((err) => {
      next(new ERRORS.ServerError());
    });
});

module.exports = router;
