const fs = require('fs');
const path = require('path');
const db = require("../database/models");


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


let productNew = { sizes: [], colors: [], others: [], qtySold: 0 };

module.exports = {
    productsIndex: function (req, res, next) {
        // recupero productos con db
        db.Product.findAll({
            include: [{
                all: true
            }]
        }).then(function (products) {
            db.Category.findAll()
                .then(function (categories) {
                    // Este bloque se encarga de la previsualizacion en el index de productos. Si no elegiste ninguno aun, muestra el primero de lo que traiga en products. Si entra uno por params, te muestra ese...
                    let preDetail = products[0];
                    if (req.params.id) {
                        for (let i = 0; i < products.length; i++) {
                            if (products[i].id == req.params.id) {
                                preDetail = products[i];
                                break;
                            };
                        };
                    };
                    // Renderizado de la vista. Paso el JSON completo parseado, el array de categorias y la previsualizacion...
                    res.render("products", {
                        title: 'productos',
                        products: products,
                        categories: categories,
                        preDetail: preDetail
                    })
                })
        })
            .catch(function (error) { console.log(error) });
    },

    detail: function (req, res, next) {
        // DATABASE - Este bloque se encarga de buscar el producto segun el id recibido, y guardarlo en productDetail
        db.Product.findByPk(req.params.id, {
            include: [{
                all: true
            }]
        }).then(function (productDetail) {
            res.render("detail", {
                title: 'Detalle de productos',
                productDetail: productDetail
            })
        })
            .catch(function (error) { console.log(error) });
    },

    upload: function (req, res, next) {

        db.Product.findAll({
            include: [{ all: true }]
        })
            .then((products) => {
                // Aca la idea es lograr que si llega ID, se muestre solo ID. Si llega name, se muestre solo el name, y si llega category, que se muestren todos los de esa category
                if (Object.keys(req.query).length !== 0) {
                    products = products.filter((element) => {
                        return (element.id == req.query.idOfProduct || element.name == req.query.nameOfProduct || element.categories.name == req.query.category);
                    });
                }
                db.Category.findAll()
                    .then(function (categories) {
                        res.render('upload', {
                            title: 'Carga de productos',
                            products: products,
                            categories: categories
                        });
                    })
                    .catch(function (error) { console.log(error) });
            });
    },

    create: function (req, res, next) {

        db.Category.findAll()
            .then(function (categories) {
                res.render('create', {
                    title: 'Nuevo producto',
                    categories: categories
                });
            })
            .catch(function (error) { console.log(error) });
    },

    createNew: function (req, res, next) {

        productNew.id = maxId();
        if (req.body.productNewName != undefined) { productNew.name = req.body.productNewName };
        if (req.body.productNewDescription != undefined) { productNew.description = req.body.productNewDescription };
        if (req.body.productNewCategory != undefined && req.body.typeAddInput == undefined) { productNew.category = req.body.productNewCategory };
        if (req.body.productNewCategory != undefined && req.body.typeAddInput != undefined) { productNew.category = req.body.typeAddInput };
        if (req.body.productNewPrice != undefined) { productNew.price = parseFloat(req.body.productNewPrice) };

        // busco unidad de medida segun la categoria ingresada
        let unitNew;
        for (let i = 0; i < products.length; i++) {
            if (products[i].category == req.body.productNewCategory) {
                unitNew = products[i].sizes[0].unit;
                break;
            };
        };

        productNew.image = req.files[0].filename;

        // si existen dichos campos, pego en productNew - Tamaños
        if (req.body.xs != undefined && req.body.sizeXsValue != "") { productNew.sizes.push({ tag: req.body.xs, size: parseFloat(req.body.sizeXsValue), unit: unitNew }) };
        if (req.body.s != undefined && req.body.sizeSValue != "") { productNew.sizes.push({ tag: req.body.s, size: parseFloat(req.body.sizeSValue), unit: unitNew }) };
        if (req.body.m != undefined && req.body.sizeMValue != "") { productNew.sizes.push({ tag: req.body.m, size: parseFloat(req.body.sizeMValue), unit: unitNew }) };
        if (req.body.l != undefined && req.body.sizeLValue != "") { productNew.sizes.push({ tag: req.body.l, size: parseFloat(req.body.sizeLValue), unit: unitNew }) };
        if (req.body.xl != undefined && req.body.sizeXlValue != "") { productNew.sizes.push({ tag: req.body.xl, size: parseFloat(req.body.sizeXlValue), unit: unitNew }) };
        // Colores 
        if (req.body.colorBlack != undefined) { productNew.colors.push({ colorName: req.body.colorBlack, colorCode: "#000000" }) };
        if (req.body.colorRed != undefined) { productNew.colors.push({ colorName: req.body.colorRed, colorCode: "#FF0000" }) };
        if (req.body.colorBlue != undefined) { productNew.colors.push({ colorName: req.body.colorBlue, colorCode: "#0000FF" }) };
        if (req.body.colorGreen != undefined) { productNew.colors.push({ colorName: req.body.colorGreen, colorCode: "#008000" }) };
        if (req.body.colorWhite != undefined) { productNew.colors.push({ colorName: req.body.colorWhite, colorCode: "#ffffff" }) };
        if (req.body.colorYellow != undefined) { productNew.colors.push({ colorName: req.body.colorYellow, colorCode: "#ffff00" }) };
        if (req.body.colorGray != undefined) { productNew.colors.push({ colorName: req.body.colorGray, colorCode: "#808080" }) };
        if (req.body.colorPink != undefined) { productNew.colors.push({ colorName: req.body.colorPink, colorCode: "#ffc0cb" }) };
        if (req.body.colorBrown != undefined) { productNew.colors.push({ colorName: req.body.colorBrown, colorCode: "#a52a2a" }) };

        products.push(productNew);

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsJSON);

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

        function findIndex() {
            let Index;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == req.body.productEditId) {
                    Index = i;
                };
            }; return Index
        };

        // indexOf seria mas elegante y seguramente aplique!

        let indexToEdit = findIndex();

        products[indexToEdit].id = parseInt(req.body.productEditId);
        products[indexToEdit].name = req.body.productEditName;
        products[indexToEdit].description = req.body.productEditDescription;

        if (req.body.productEditCategoryAlternative != undefined) {
            products[indexToEdit].category = req.body.productEditCategoryAlternative;
        } else {
            products[indexToEdit].category = req.body.productEditCategory;
        }

        products[indexToEdit].price = parseFloat(req.body.productEditPrice);
        products[indexToEdit].image = "iconoImagenBordesIguales.png";

        products[indexToEdit].sizes = [];
        products[indexToEdit].colors = [];
        products[indexToEdit].others = [];

        if (req.body.xs != undefined && req.body.sizeXsValue != "") { products[indexToEdit].sizes.push({ tag: req.body.xs, size: parseFloat(req.body.sizeXsValue) }) };
        if (req.body.s != undefined && req.body.sizeSValue != "") { products[indexToEdit].sizes.push({ tag: req.body.s, size: parseFloat(req.body.sizeSValue) }) };
        if (req.body.m != undefined && req.body.sizeMValue != "") { products[indexToEdit].sizes.push({ tag: req.body.m, size: parseFloat(req.body.sizeMValue) }) };
        if (req.body.l != undefined && req.body.sizeLValue != "") { products[indexToEdit].sizes.push({ tag: req.body.l, size: parseFloat(req.body.sizeLValue) }) };
        if (req.body.xl != undefined && req.body.sizeXlValue != "") { products[indexToEdit].sizes.push({ tag: req.body.xl, size: parseFloat(req.body.sizeXlValue) }) };

        if (req.body.colorBlack != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorBlack, colorCode: "#000000" }) };
        if (req.body.colorRed != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorRed, colorCode: "#FF0000" }) };
        if (req.body.colorBlue != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorBlue, colorCode: "#0000FF" }) };
        if (req.body.colorGreen != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorGreen, colorCode: "#008000" }) };
        if (req.body.colorWhite != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorWhite, colorCode: "#ffffff" }) };
        if (req.body.colorYellow != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorYellow, colorCode: "#ffff00" }) };
        if (req.body.colorGray != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorGray, colorCode: "#808080" }) };
        if (req.body.colorPink != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorPink, colorCode: "#ffc0cb" }) };
        if (req.body.colorBrown != undefined) { products[indexToEdit].colors.push({ colorName: req.body.colorBrown, colorCode: "#a52a2a" }) };

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsJSON);

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

        products = products.filter(function (element) {
            return element.id != req.params.id
        });

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsJSON);

        res.redirect('/products/upload');
    }
};