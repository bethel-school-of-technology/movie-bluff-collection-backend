'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled']
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  });

  //I picked this convention up from https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
  // const db = {};

  // db.Sequelize = Sequelize;
  // db.sequelize = sequelize;

  // db.users = require('../models/users.js')(sequelize, Sequelize);
  
  //There's more in the Read.me file in GitHub
  
  users.associate = function (models) {
    // associations can be defined here
  };
  return user;
};