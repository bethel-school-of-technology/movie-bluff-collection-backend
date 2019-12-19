'use strict';
module.exports = (sequelize, DataTypes) => {
  const movies = sequelize.define('movies', {
    name: DataTypes.STRING
  }, {});
  movies.associate = function(models) {
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


  };
  return movies;
};