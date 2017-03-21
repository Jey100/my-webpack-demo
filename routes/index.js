var express = require('express');
var router = express.Router();
var hello = require("./hello.js")
/* GET home page. */
router.get('/', function(req, res, next) {
  hello.getNames()
  res.render('index', { title: 'Express' });
});

module.exports = router;
