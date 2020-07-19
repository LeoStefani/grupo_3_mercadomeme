const fs = require('fs');
const path = require('path');


let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));


module.exports = {
        productsIndex: function (req, res, next) {

                // Este bloque arma una array productsCategories con todas las categorias que existen en el json... resultado esperado: [taza, remera, mochila...] HAY QUE CORREGIR!!!!!
                let productsCategories = [];
                for (let i = 0; i < products.length; i++) {
                        if (productsCategories.indexOf(products[i].category) == -1) {
                                productsCategories.push(products[i].category);
                        };
                };
                console.log(productsCategories);

                // Este bloque se encarga de la previsualizacion en el index de productos. Si no elegiste ninguno aun, muestra el primero del JSON. Si entra uno por params, te muestra ese...
                let preDetail = products[0];
                if(req.params.id) {
                        // validacion 
                        for(let i = 0; i < products.length; i++) {
                                if(products[i].id == req.params.id) {
                                        preDetail = products[i];
                                };
                        };
                };

                // Renderizado de la vista. Paso el JSON completo parseado, el array de categorias y la previsualizacion...
                res.render('products', {
                        title: 'Productos',
                        products: products,
                        productsCategories: productsCategories,
                        preDetail: preDetail
                });
        },

        detail: function (req, res, next) {
                // Este bloque se encarga de buscar el producto segun el id recibido, y guardarlo en productDetail
                let productDetail;
                for(let i = 0; i < products.length; i++) {
                        if(products[i].id == req.params.id) {
                                productDetail = products[i];
                        };
                };
                // Renderizado de la vista. Paso el productDetail
                res.render('detail', { 
                        title: 'Detalle de productos',
                        productDetail: productDetail
                 });
        },

        upload: function (req, res, next) {
                res.render('upload', { title: 'Carga de productos' }); //SACAR EL TITLE DEL HEAD!!!!
        }
};