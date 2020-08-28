'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "categories", deps: []
 * createTable "colors", deps: []
 * createTable "images", deps: []
 * createTable "products", deps: []
 * createTable "product_color", deps: []
 * createTable "sizes", deps: []
 * createTable "users", deps: []
 * addIndex "colors_name" to table "colors"
 * addIndex "products_name" to table "products"
 * addIndex "users_username_email" to table "users"
 *
 **/

var info = {
    "revision": 1,
    "name": "products",
    "created": "2020-08-16T18:32:30.424Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "categories",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "colors",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "images",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "products",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "product_color",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "sizes",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {

            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "colors",
            ["name"],
            {
                "indexName": "colors_name",
                "indicesType": "UNIQUE"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "products",
            ["name"],
            {
                "indexName": "products_name",
                "indicesType": "UNIQUE"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "users",
            ["username", "email"],
            {
                "indexName": "users_username_email",
                "indicesType": "UNIQUE"
            }
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
