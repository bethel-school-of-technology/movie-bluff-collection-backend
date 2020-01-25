module.exports = function (models) {
    models.movies.belongsToMany(models.users, {
        through: models.userMovies,
        foreignKey: 'imdbId',
    });
    models.users.belongsToMany(models.movies, {
        through: models.userMovies,
        foreignKey: 'userId',
    });
}


