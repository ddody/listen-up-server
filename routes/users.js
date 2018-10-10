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
                token: "Bearer " + token
              });
            }
          }
        );
      } else {
        const { uid, name } = req.body;
        const newUser = new User({
          uid,
          name,
          point: 0
        });

        newUser.save((err, user) => {
          if (err) {
            next(new ERRORS.serverError());
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
                    token: "Bearer " + token
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

router.post('/logout', function (req, res) {
  res.send('logout');
});

router.post('/auth', function(){}, function (req, res) {
  const token = req.headers['Authorization'];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      console.log(decoded);
    }
  });

  res.send('logout');
});

module.exports = router;
