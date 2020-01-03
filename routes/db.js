//import the models (as noted above use a db object)
//import express and instantiate your app object

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
