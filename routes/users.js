var express = require('express');
var router = express.Router();
var models = require("../models");
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'movie-buff-database'
});
//Do I need this connection?
connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;

  }
  //Do I need to change the 'comment'?
  console.log('Yay! You are connected to the database!');
})
//Do I need any of this GET home page.
/* GET home page. */
router.get("/", function(req, res, next) {
  models.movies.findAll().then(movies => res.json(movies));
});

router.post("/", function(req, res, next) {
  console.log(req.body);
  let newMovie = new models.movies();
  newMovie.name = req.body.name;
  newMovie.save().then(movies => res.json(movies));
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
