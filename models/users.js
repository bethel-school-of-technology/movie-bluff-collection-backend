'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
  }, 
    designation: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  });
//  users.associate = function(models) {
    // associations can be defined here

  //  there will also be an id but it is NOT NULL AUTO_INCREMENT PRIMARY KEY  
  // firstName
  // lastName
  // email
  // password
//  };
  return user;
};