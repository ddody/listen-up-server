var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({massage: 'success'});
});

module.exports = router;
