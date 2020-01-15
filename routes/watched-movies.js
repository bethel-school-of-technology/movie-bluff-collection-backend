var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


//view user watched movies list
router.get('/', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                models.userMovies
                    .findAll({
                        where: { userId: user.userId, watchedList: true, Deleted: false }
                    })
                    .then(userMovies => res.json(userMovies));
            } else {
                res.status(401);
                res.json('Invalid authentication token');
            }
        });
    } else {
        res.status(401);
        res.json('Must be logged in');
    }
});

//save watched movies
router.post('/', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                models.userMovies
                    .findOrCreate({
                        where: {
                            userId: user.userId,
                            imdbId: req.body.imdbId,
                            ownedList: req.body.ownedList,
                            watchedList: req.body.watchedList,
                            wishList: req.body.wishList,
                        }
                    })
                    .spread((result, created) => res.json('Continue'));
            } else {
                res.status(401);
                res.json('Sorry, please log in');
            }
        });
    } else {
        res.status(401);
        res.json('Must be logged in');
    }
});
//edit watched movies
router.get('/:id', function (req, res, next) {
    let imdbId = (req.params.id);
    models.userMovies.findOne({ where: { imdbId: imdbId }, raw: true }).then(imdbId => {
        console.log(imdbId);
        res.json(imdbId);
    });
});
//update watched movies
router.put('/editWatched-movies/:id', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                models.userMovies
                    .findOrCreate({
                        where: {
                            userId: user.userId,
                            imdbId: req.body.imdbId,
                            ownedList: req.body.ownedList,
                            watchedList: req.body.watchedList,
                            wishList: req.body.wishList
                        }
                    })
                    .spread((result, created) => res.redirect('/watched-movies'));
            } else {
                res.status(401);
                res.json('Sorry, please log in');
            }
        });
    } else {
        res.status(401);
        res.json('Must be logged in');
    }

});
router.put('/editWatched-movies/:id', function (req, res, next) {
    let imdbId = (req.params.id);
    console.log(req.body);
    console.log(imdbId);
    models.userMovies
        .update(req.body, { where: { imdbId: imdbId } })
        .then(result => res.json(result));
});


//delete watched movies
router.delete('/:id', function (req, res, next) {
    let imdbId = (req.params.id);
    models.userMovies
        .update(
            { Deleted: true },
            {
                where: { imdbId: imdbId }
            }
        )
    req.flash('success', 'Watched Movie deleted successfully! id = ' + req.params.id)
        .then(result => res.json(result));
    // .then(userMovies => res.json(userMovies));

});
module.exports = router;