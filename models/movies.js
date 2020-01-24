'use strict';

module.exports = (sequelize, DataTypes) => {
  var movies = sequelize.define('movies', {

    imdbId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

  }, {});

  movies.associate = function (models) {
    // associations can be defined here
    movies.belongsToMany(models.users, {
      through: models.userMovies,
      foreignKey: 'imdbId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return movies;
};
