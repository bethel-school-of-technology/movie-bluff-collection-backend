'use strict'

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
db.movies.hasMany(db.users_movies);
db.movies.belongsTo(db.users);
db.users.hasMany(db.movies);

module.exports = db;