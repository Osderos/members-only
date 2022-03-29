var express = require('express');
var router = express.Router();

const checkAuth = require('../middleware/checkAuth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members-Only', user: req.user });
});

module.exports = router;
