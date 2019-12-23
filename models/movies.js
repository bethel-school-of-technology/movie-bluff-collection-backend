'use strict';
module.exports = (sequelize, DataTypes) => {
    const movie = sequelize.define('movie', {
        IMdb_id: {
            type: DataTypes.VARCHAR(15).UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        last_update: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    });
    return movies;
};