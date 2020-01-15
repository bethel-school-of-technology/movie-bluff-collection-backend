var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');



// Create new user if one doesn't exist

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.json('User successfully created')
      } else {
        res.json('This user already exists');
      }
    });
});

// Login user and return JWT as cookie

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json("Login Failed");
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.json('Login successful');
      } else {
        console.log('Wrong password');
        res.json('Wrong password');
      }
    }
  });
});
// //show homepage, but movies are not showing
// router.get('/homepage', function (req, res, next) {
//   let token = req.cookies.jwt;
//   if (token) {
//     authService.verifyUser(token)
//       .then(user => {
//         if (user) {
//           models.users
//             .findAll({
//               where: { userId: user.userId },
//               // include: [{ model: userMovies }],


//             })
//             .then(result =>
//               res.render('homepage', {
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 userMovies: result,
//                 user: result[0],
//               }));
//         } else {
//           res.status(401);
//           res.json('User not found');
//         }
//       });
//   } else {
//     res.status(401);
//     res.json('Must be logged in');
//   }
// });

// logout

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.json('Logged out')
});

router.get('/admin', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.admin) {
        models.users
          .findAll({ where: { Deleted: false }, raw: true })
          .then(usersFound => res.json(usersFound));
      } else {
        res.json('Sorry, unauthorized');
      }
    });
  }
});

router.get('/admin/editUser/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.admin) {
        models.users
          .findOne({ where: { userId: userId }, raw: true })
          .then(user => res.json(user));
      } else {
        res.status(401).json('Sorry, unauthorized');
      }
    });
  }
});

router.delete('/admin/editUser/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.admin) {
        models.users
          .update({ Deleted: true }, { where: { userId: userId }, raw: true })
          .then(user => res.json(user));
      } else {
        res.status(401).json('Sorry, unauthorized');
      }
    });
  }
});



module.exports = router;