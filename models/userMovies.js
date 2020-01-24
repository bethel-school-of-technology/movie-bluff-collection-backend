'use strict';

module.exports = (sequelize, DataTypes) => {
  var userMovies = sequelize.define(
    'userMovies',
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      imdbId: {
        type: DataTypes.STRING,
      },
      ownedList: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      watchedList: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      wishList: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
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

  return userMovies;
};
