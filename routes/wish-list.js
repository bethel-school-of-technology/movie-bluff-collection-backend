var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


//view user wish list
router.get('/', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                models.userMovies
                    .findAll({
                        where: { userId: user.userId, wishList: true, Deleted: false }
                    })
                    .then(result => res.json(result));
            } else {
                res.status(401).json('Invalid authentication token');
            }
        });
    } else {
        res.status(401).json('Must be logged in');
    }
});

//save list
router.post('/', function (req, res, next) {
    console.log(req.body);
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
                    .spread((result, created) => res.status(200).json('Successful'));
            } else {
                res.status(401).json('Sorry, please log in');
            }
        });
    } else {
        res.status(401).json('Must be logged in');
    }
});

//edit list
router.get('/:id', function (req, res, next) {
    let imdbId = (req.params.id);
    models.userMovies.findOne({ where: { imdbId: imdbId }, raw: true }).then(imdbId => {
        console.log(imdbId);
        res.status(200).json(imbdId);
    });
});

//update list
router.put('/editWish-list/:id', function (req, res, next) {
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
                    .spread((result, created) => res.status(200).json('Edit successful'));
            } else {
                res.status(401).json('Sorry, please log in');
            }
        });
    } else {
        res.status(401).json('Must be logged in');
    }

});
router.put('/editWish-list/:id', function (req, res, next) {
    let imdbId = (req.params.id);
    console.log(req.body);
    console.log(imdbId);
    models.userMovies
        .update(req.body, { where: { imdbId: imdbId } })
        .then(() => res.status(200).json('Successful'));
});

//delete list
router.delete('/:id', function (req, res, next) {
    let imdbId = (req.params.id);
    models.userMovies
        .update(
            { Deleted: true },
            {
                where: { imdbId: imdbId }
            }
        )
        .then(() => res.status(200).json('Delete successful'));
});

module.exports = router;