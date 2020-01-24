'use strict';

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      firstName: DataTypes.STRING,

      lastName: DataTypes.STRING,

      email: {
        type: DataTypes.STRING,
        unique: true
      },

      password: DataTypes.STRING,

      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
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
        allowNull: false,
        defaultValue: false
      },
    }, {});

  users.associate = function (models) {
    // associations can be defined here
    users.belongsToMany(models.movies, {
      through: models.userMovies,
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return users;
};
