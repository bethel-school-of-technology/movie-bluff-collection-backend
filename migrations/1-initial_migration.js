'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "movies", deps: []
 * createTable "users", deps: []
 * createTable "userMovies", deps: [users, movies]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-01-14T23:01:14.719Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "movies",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "imdbId": {
                    "type": Sequelize.STRING,
                    "field": "imdbId",
                    "primaryKey": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "allowNull": false,
                    "defaultValue": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName"
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "admin",
                    "allowNull": false,
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "userMovies",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "unique": "userMovies_userId_imdbId_unique",
                    "field": "userId"
                },
                "imdbId": {
                    "type": Sequelize.STRING,
                    "unique": "userMovies_userId_imdbId_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "movies",
                        "key": "imdbId"
                    },
                    "primaryKey": true,
                    "field": "imdbId"
                },
                "ownedList": {
                    "type": Sequelize.BOOLEAN,
                    "field": "ownedList",
                    "allowNull": false,
                    "defaultValue": false
                },
                "watchedList": {
                    "type": Sequelize.BOOLEAN,
                    "field": "watchedList",
                    "allowNull": false,
                    "defaultValue": false
                },
                "wishList": {
                    "type": Sequelize.BOOLEAN,
                    "field": "wishList",
                    "allowNull": false,
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "allowNull": false,
                    "defaultValue": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
