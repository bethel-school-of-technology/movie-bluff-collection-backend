var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var cors = require("cors");

var usersRouter = require('./routes/users');
var ownedMoviesRouter = require('./routes/owned-movies');
var watchedMoviesRouter = require('./routes/watched-movies');
var wishListRouter = require('./routes/wish-list');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4200", credentials: true })); 
app.use('/users', usersRouter);
app.use('/owned-movies', ownedMoviesRouter);
app.use('/watched-movies', watchedMoviesRouter);
app.use('/wish-list', wishListRouter);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

models.sequelize.sync().then(function () {
  console.log("DB Sync'd up")
});

module.exports = app;
