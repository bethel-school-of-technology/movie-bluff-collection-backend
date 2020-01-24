module.exports = function (models) {
    models.movies.belongsToMany(models.users, {
        through: models.userMovies,
        foreignKey: 'imdbId',
    });
    models.users.belongsToMany(models.movies, {
        through: models.userMovies,
        foreignKey: 'userId',
    });
    // models.userMovies.belongsToMany(models.movies,
    //     {
    //         through: models.userMovies,
    //         foreignKey: 'imdbId'
    //     });
    // models.movies.hasMany(models.userMovies,
    //     {
    //         foreignKey: 'imdbId',
    //         targetKey: 'imdbId'
    //     }
    // ),
    // models.movies.belongsToMany(models.users,
    //         {
    //             through: models.users,
    //             foreignKey: 'userId'
    //         });
    // models.users.hasMany(models.movies,
    //     {
    //         foreignKey: 'userId',
    //         targetKey: 'userId'
    //     }
    // )

    //     models.userMovies.belongsTo(models.movies);
    // models.movies.hasMany(models.userMovies);
    // models.movies.belongsTo(models.users);
    // models.users.hasMany(models.movies);
}


