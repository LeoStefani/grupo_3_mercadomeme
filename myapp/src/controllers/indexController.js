const fs = require('fs');
const path = require('path');
const db = require("../database/models");
const { Op } = require("sequelize");


let controller = {
        index: function (req, res, next) {

            db.Product.findAll({
                include: [{
                    all: true
                }],
                where: {
                    status: {[Op.eq]: 1}
                },
                order: [ ['qty_sold', 'DESC'] ],
                limit: 4

            })
            .then(function (sortedProducts) {
                    res.render('index', {
                            title: 'Bienvenidos!',
                            sortedProducts: sortedProducts
                    });
                
            });
        },

        error: function (req, res, next) {
                res.render('error', {
                        title: "Error"
                });
        }
};


module.exports = controller;