'use strict';
module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    movieId: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    IMdb_id: {
      type: DataTypes.VARCHAR(15),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    own: {
      type: DataTypes.STRING(3),
      allowNull: true,
    }, 
    watched: {
      type: DataTypes.STRING(3),
      allowNull: true,
    }, 
    wishList: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },

    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
  // movies.associate = function (models) {
    // associations can be defined here
    // there will also be an id but it is NOT NULL AUTO_INCREMENT PRIMARY KEY
    //title
    // director
    // yearReleased
    // leadActors
    // lengthInMinutes
    // genre
    // MPAA
    // own
    // watched
    // wishList

    // other websites included other items for personal entry, such as:
    // comments
    // personal rating
    // etc


  // };
  return movies;
};