var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: '?',
  password: '?',
  database: '?'
});

connection.connect(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
})


/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Movie Buff' });
});

module.exports = router;
