//import the models (as noted above use a db object)
//import express and instantiate your app object
//cw 20200104 found more code at https://github.com/lorenseanstewart/sequelize-associations/blob/master/server/router/routes/routes.js
//his repo was for users, comments, posts for which I used users, users_movies, movies
module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    db.users.findAll({
      include: [
        {
          model: db.movies,
          include: [
            {
              model: db.users_movies
            }
          ]
        }
      ]
    }).then(users => {
      const resObj = users.map(user => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            user_id: user.id,
            username: user.username,
            role: user.role,
            movies: user.movies.map(movie => {

              //tidy up the movie data
              return Object.assign(
                {},
                {
                  movie_id: movie.id,
                  user_id: movie.user_id,
                  content: movie.content,
                  users_movies: movie.users_movies.map(user_movie => {

                    //tidy up the users_movies data
                    return Object.assign(
                      {},
                      {
                        user_movie_id: user_movie.id,
                        movie_id: user_movie.movie_id,
                        user: user_movie.user_username,
                        user_email: user_movie.user_email,
                        content: user_movie.content
                      }
                    )
                  })
                }
              )
            })
          }
        )
      });
      res.json(resObj)
    });
  });


  app.post('/users', (req, res) => {
    const created_at = new Date();
    const newUser = req.body.user;
    db.users.create({
      username: newUser.username,
      role: newUser.role,
      created_at: created_at
    })
      .then(user => {
        res.json(user);
      });
  });

  app.post('/movie', (req, res) => {
    const created_at = new Date();
    const newMovie = req.body.movie;
    db.movies.create({
      user_id: newMovie.user_id,
      content: newMovie.content,
      created_at: created_at
    })
      .then(movie => {
        res.json(movie);
      });
  });

  app.post('/users_movie', (req, res) => {
    const created_at = new Date();
    const newUsers_Movie = req.body.users_movie;
    db.users_movies.create({
      post_id: newUsers_Movie.post_id,
      content: newUsers_Movie.content,
      user_username: newUsers_Movie.user_username,
      user_email: newUsers_Movie.user_email,
      created_at: created_at
    })
      .then(users_movie => {
        res.json(users_movie);
      });
  });

};
