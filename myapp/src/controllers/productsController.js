const fs = require('fs');
const path = require('path');
const { create } = require('domain');


let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));

// Este bloque arma una array productsCategories con todas las categorias que existen en el json... resultado esperado: [taza, remera, mochila...]
let productsCategories = [];
for (let i = 0; i < products.length; i++) {
        if (productsCategories.indexOf(products[i].category) == -1) {
                productsCategories.push(products[i].category);
        };
};

// Esta funcion es utilizada en create, para devolver el ID siguiente al maximo id del JSON productos 
let maxId = function () {

        idAcumulator = 0;
        for (let i = 0; i < products.length; i++) {
                if (products[i].id > idAcumulator) {
                        idAcumulator = products[i].id;
                };
        };
        return idAcumulator + 1;
// TENER CUIDADO QUE NO ES EL MÁXIMO ID DE LOS PRODUCTOS ACTUALES, SINO EL SIGUIENTE LIBRE, DADO QUE ESTA PENSADO PARA LA CARGA DE PRODUCTOS NUEVOS
};


let productNew = { sizes: [], colors: [], others: [], qtySold: 0};

module.exports = {
        productsIndex: function (req, res, next) {

                // Este bloque se encarga de la previsualizacion en el index de productos. Si no elegiste ninguno aun, muestra el primero del JSON. Si entra uno por params, te muestra ese...
                let preDetail = products[0];
                if (req.params.id) {
                        // validacion 
                        for (let i = 0; i < products.length; i++) {
                                if (products[i].id == req.params.id) {
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
                for (let i = 0; i < products.length; i++) {
                        if (products[i].id == req.params.id) {
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

                let productsSearch = [];

                // console.log(req.query.nameOfProduct)

                //        Aca la idea es lograr que si llega ID, se muestre solo ID. Si llega name, se muestre solo el name, y si llega category, que se muestren todos los de esa category
                for (let i = 0; i < products.length; i++) {

                        if (req.query.idOfProduct == products[i].id || req.query.category == products[i].category || req.query.nameOfProduct == products[i].name) {
                                productsSearch.push(products[i]);
                        };
                }

                res.render('upload', {
                        title: 'Carga de productos',
                        productsSearch: productsSearch,
                        productsCategories: productsCategories,
                        // preDetail: preDetail
                }); //SACAR EL TITLE DEL HEAD!!!!
        },

        create: function (req, res, next) {
                
                res.render('create', {
                        title: 'Nuevo producto',
                        lastId: maxId(),
                        productsCategories: productsCategories,
                }); //SACAR EL TITLE DEL HEAD!!!!
        },

        createNew: function (req, res, next) {

                productNew.id = maxId();
                if (req.body.productNewName != undefined) { productNew.name = req.body.productNewName };
                if (req.body.productNewDescription != undefined) { productNew.description = req.body.productNewDescription };
                if (req.body.productNewCategory != undefined && req.body.typeAddInput == undefined) { productNew.category = req.body.productNewCategory };
                if (req.body.productNewCategory != undefined && req.body.typeAddInput != undefined) { productNew.category = req.body.typeAddInput };
                if (req.body.productNewPrice != undefined) { productNew.price = req.body.productNewPrice };

                // busco unidad de medida segun la categoria ingresada
                let unitNew;
                for (let i = 0; i < products.length; i++) {
                        if (products[i].category == req.body.productNewCategory) {
                                unitNew = products[i].sizes[0].unit;
                                break;
                        };
                };
                
                productNew.image = "iconoImagenBordesIguales.png";

                // si existen dichos campos, pego en productNew - Tamaños
                if (req.body.xs != undefined && req.body.sizeXsValue != "") { productNew.sizes.push({ tag: req.body.xs, size: req.body.sizeXsValue, unit: unitNew }) };
                if (req.body.s != undefined && req.body.sizeSValue != "") { productNew.sizes.push({ tag: req.body.s, size: req.body.sizeSValue, unit: unitNew }) };
                if (req.body.m != undefined && req.body.sizeMValue != "") { productNew.sizes.push({ tag: req.body.m, size: req.body.sizeMValue, unit: unitNew }) };
                if (req.body.l != undefined && req.body.sizeLValue != "") { productNew.sizes.push({ tag: req.body.l, size: req.body.sizeLValue, unit: unitNew }) };
                if (req.body.xl != undefined && req.body.sizeXlValue != "") { productNew.sizes.push({ tag: req.body.xl, size: req.body.sizeXlValue, unit: unitNew }) };
                // Colores 
                if (req.body.colorBlack != undefined) { productNew.colors.push({ colorName: req.body.colorBlack, colorCode: "#000000" }) };
                if (req.body.colorRed != undefined) { productNew.colors.push({ colorName: req.body.colorRed, colorCode: "#FF0000" })  };
                if (req.body.colorBlue != undefined) { productNew.colors.push({ colorName: req.body.colorBlue, colorCode: "#0000FF" }) };
                if (req.body.colorGreen != undefined) { productNew.colors.push({ colorName: req.body.colorGreen, colorCode: "#008000" }) };
                if (req.body.colorWhite != undefined) { productNew.colors.push({ colorName: req.body.colorWhite, colorCode: "#ffffff" }) };
                if (req.body.colorYellow != undefined) { productNew.colors.push({ colorName: req.body.colorYellow, colorCode: "#ffff00" }) };
                if (req.body.colorGray != undefined) { productNew.colors.push({ colorName: req.body.colorGray, colorCode: "#808080" })  };
                if (req.body.colorPink != undefined) { productNew.colors.push({ colorName: req.body.colorPink, colorCode: "#ffc0cb" }) };
                if (req.body.colorBrown != undefined) { productNew.colors.push({ colorName: req.body.colorBrown, colorCode: "#a52a2a" }) };

                products.push(productNew);

                let productsJSON = JSON.stringify(products);

                fs.writeFileSync(path.join(__dirname,'../data/products.json'), productsJSON);

                res.redirect('/products/upload');
        },

        editViewer: function (req, res, next) {

                let productDetail;
                for (let i = 0; i < products.length; i++) {
                        if (products[i].id == req.params.id) {
                                productDetail = products[i];
                        };
                };
                res.render('edit', {
                        title: 'Editar producto',
                        productDetail: productDetail,
                        productsCategories: productsCategories
                }); 
        },

        edit: function (req, res, next) {


// indexOf seria mas elegante y seguramente aplique!

                function findIndex () { 
                        let Index;
                        for (let i=0; i< products.length; i++) {
                                if (products[i].id == req.body.productEditId) {
                                Index = i;
                                };
                        }; return Index
                };

// indexOf seria mas elegante y seguramente aplique!

                let indexToEdit = findIndex();

                products[indexToEdit].id = req.body.productEditId;
                products[indexToEdit].name = req.body.productEditName;
                products[indexToEdit].description = req.body.productEditDescription;

                if (req.body.productEditCategoryAlternative != undefined) {
                        products[indexToEdit].category = req.body.productEditCategoryAlternative;
                } else {
                products[indexToEdit].category = req.body.productEditCategory;}

                products[indexToEdit].price = req.body.productEditPrice;
                products[indexToEdit].image = "iconoImagenBordesIguales.png";

                products[indexToEdit].sizes = [];
                products[indexToEdit].colors = [];
                products[indexToEdit].others = [];

                if (req.body.xs != undefined) { products[indexToEdit].sizes.push({ tag: req.body.xs, size: 150, unit: "ml" }) };
                if (req.body.s != undefined) { products[indexToEdit].sizes.push({ tag: req.body.s, size: 200, unit: "ml" }) };
                if (req.body.m != undefined) { products[indexToEdit].sizes.push({ tag: req.body.m, size: 300, unit: "ml" }) };
                if (req.body.l != undefined) { products[indexToEdit].sizes.push({ tag: req.body.l, size: 500, unit: "ml" }) };
                if (req.body.xl != undefined) { products[indexToEdit].sizes.push({ tag: req.body.xl, size: 700, unit: "ml" }) };

                if (req.body.colorBlack != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorBlack, colorCode: "#000000" }) };
                if (req.body.colorRed != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorRed, colorCode: "#FF0000" })  };
                if (req.body.colorBlue != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorBlue, colorCode: "#0000FF" }) };
                if (req.body.colorGreen != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorGreen, colorCode: "#008000" }) };
                if (req.body.colorWhite != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorWhite, colorCode: "#ffffff" }) };
                if (req.body.colorYellow != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorYellow, colorCode: "#ffff00" }) };
                if (req.body.colorGray != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorGray, colorCode: "#808080" })  };
                if (req.body.colorPink != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorPink, colorCode: "#ffc0cb" }) };
                if (req.body.colorBrown != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorBrown, colorCode: "#a52a2a" }) };

                let productsJSON = JSON.stringify(products);

                fs.writeFileSync(path.join(__dirname,'../data/products.json'), productsJSON);

                res.redirect('/products/upload');
        },

        deleteViewer: function (req, res, next) {
                let productToDelete;
                for (let i = 0; i < products.length; i++) {
                        if (products[i].id == req.params.id) {
                                productToDelete = products[i];
                        };
                };
                res.render('delete', {
                        title: 'Eliminar producto',
                        productToDelete: productToDelete,
                        productsCategories: productsCategories
                });
        },

        delete: function (req, res, next) {

                products = products.filter(function(element) {
                        return element.id != req.params.id
                });

                let productsJSON = JSON.stringify(products);

                fs.writeFileSync(path.join(__dirname,'../data/products.json'), productsJSON);

                res.redirect('/products/upload');
        }
};