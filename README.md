# movie-bluff-collection-backend
database currently being developed in Sqlectron by cwmusicman 20191205
making this README.md file and "Commit directly to the database-edits branch"
making/using database-edits branch thanx, cw
20191220 cw working on database in VSC 
attempting to use MySQL

20200102 by cw
notes and code on associations for the database:
lines 12-121 modified from https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/

Side note: Where I work, we have a convention of attaching all Sequelize models to a single db object and injecting this object into all routes and controllers. It's a convenient way to have access to everything. Using this convention, here's what the db.js file in the repo looks like: 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/users.js')(sequelize, Sequelize);
db.users_movies = require('../models/users_movies .js')(sequelize, Sequelize);
db.movies = require('../models/movies.js')(sequelize, Sequelize);
********************************************
1. Declaring associations in a config file
...
The complete db.js file should look like this: 

const Sequelize = require('sequelize'); 
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/users.js')(sequelize, Sequelize);
db.users_movies = require('../models/users_movies .js')(sequelize, Sequelize);
db.movies = require('../models/movies.js')(sequelize, Sequelize);

//Relations
db.users_movies.belongsTo(db.movies);
db.movies.hasMany(db.users_movies );
db.movies.belongsTo(db.users);
db.users.hasMany(db.movies );

module.exports = db;
********************************************
Do I need any of the following?
I’m not sure what to do with ‘commenter’ in the last section ‘//tidy up the users_movies data’

2. Declaring includes in our actions
…


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
                        commenter: user_movie.commenter_username,
                        commenter_email: user_movie.commenter_email,
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

