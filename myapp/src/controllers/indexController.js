const fs = require('fs');
const path = require('path');

let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));


// funcion para ordenar los productos segun cantidad vendida 
function GetSortOrder(prop) {
        return function (a, b) {
                if (a[prop] > b[prop]) {
                        return 1;
                } else if (a[prop] < b[prop]) {
                        return -1;
                }
                return 0;
        }
};
// orden de los productos en sortedProducts (ATENCION! Estan de menor a mayor!)
let sortedProducts = products.sort(GetSortOrder("qtySold"));


let controller = {
        index: function (req, res, next) {
                res.render('index', {
                        title: 'Bienvenidos!',
                        sortedProducts: sortedProducts,
                });
        },
        error: function (req, res, next) {
                res.render('error', { title: "Error" });
        },
        
        login: function (req, res, next) {
                res.render('login', { title: 'Login' });
        }
};


module.exports = controller;