const jwt = require('jsonwebtoken');
const JWT_SECRET = 'listeupsecret';
const ERRORS = require('../lib/errors');

const authTokenCheck = (req, res, next) => {
  console.log(req.headers['authorization']);
  const token = req.headers['authorization'].split('Bearer ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      next(new ERRORS.ServerError());
    } else {
      console.log('in');
      next();
    }
  });
}

module.exports = authTokenCheck;