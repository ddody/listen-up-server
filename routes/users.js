const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const ERRORS = require('../lib/errors');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'listeupsecret';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  User.findOne({ uid: req.body.uid })
    .then((result) => {
      if (result !== null) {
        const token = jwt.sign(
          {
            uid: result.uid
          },
          JWT_SECRET,
          {
            expiresIn: '1h'
          },
          (err, token) => {
            if (err) {
              next(new ERRORS.serverError());
            } else {
              res.status(201).json({
                message: "created token",
                token
              });
            }
          }
        );
      } else {
        const { uid, name } = req.body;
        const newUser = new User({
          uid,
          name
        });

        newUser.save((err, user) => {
          if (err) {
            next(new ERRORS.ServerError());
          } else {
            const token = jwt.sign(
              { uid },
              JWT_SECRET,
              { expiresIn: '1h' },
              (err, token) => {
                if (err) {
                  next(new ERRORS.serverError());
                } else {
                  res.status(201).json({
                    message: "new user created",
                    token
                  });
                }
              }
            );
          }
        });
      }
    })
    .catch((err) => {
      next(new ERRORS.serverError());
    });
});

// users/:user_id/points

module.exports = router;
