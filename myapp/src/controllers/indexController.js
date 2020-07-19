const fs = require('fs');
const path = require('path');

let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));

function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    };  

let sortedProducts = products.sort(GetSortOrder("qtySold"));
let fourBestSellers;


// console.log(fourBestSellers);


let controller = {
    index: function(req, res, next) {
        res.render('index', {title: "Bienvenidos!"});
      },
    error: function(req, res, next) {
        res.render('error', {title: "Error"});
      }
};

module.exports = controller;