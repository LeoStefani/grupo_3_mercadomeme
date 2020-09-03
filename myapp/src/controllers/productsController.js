const fs = require('fs');
const path = require('path');
const db = require("../database/models");
const { Op } = require("sequelize");


module.exports = {
    productsIndex: function (req, res, next) {
        // recupero productos con db
        db.Product.findAll({
                include: [{
                    all: true
                }],
                where: {
                    status: {[Op.eq]: 1}
                }
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
                        categories: categories, //Deberiamos asegurarnos que la categoria tenga al menos un producto.
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
            if (productDetail.status == 1) {
                res.render("detail", {
                    title: 'Detalle de productos',
                    productDetail: productDetail
                });
            } else {
                res.redirect('/');
            }
            
        })
            .catch(function (error) { console.log(error) });
    },

    upload: function (req, res, next) {

        db.Product.findAll({
            include: [{
                all: true
            }],
            where: {
                status: {[Op.eq]: 1}
            }
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

        let categories = db.Category.findAll();
        let colors = db.Color.findAll();
            
        Promise.all([categories, colors])
            .then((values) => {
                res.render('create', {
                    title: 'Nuevo producto',
                    categories: values[0],
                    colors: values[1]
                });
            })
            .catch(function (error) { console.log(error) });
        
    },

    createNew: function (req, res, next) {
        // Tendriamos que validar el caso donde no llegue ningun size.
        let newProductSizes = [];
        if (req.body.xs != undefined && req.body.sizeXsValue != "") { newProductSizes.push({ tag: req.body.xs, size_main: parseFloat(req.body.sizeXsValue) }) };
        if (req.body.s != undefined && req.body.sizeSValue != "") { newProductSizes.push({ tag: req.body.s, size_main: parseFloat(req.body.sizeSValue) }) };
        if (req.body.m != undefined && req.body.sizeMValue != "") { newProductSizes.push({ tag: req.body.m, size_main: parseFloat(req.body.sizeMValue) }) };
        if (req.body.l != undefined && req.body.sizeLValue != "") { newProductSizes.push({ tag: req.body.l, size_main: parseFloat(req.body.sizeLValue) }) };
        if (req.body.xl != undefined && req.body.sizeXlValue != "") { newProductSizes.push({ tag: req.body.xl, size_main: parseFloat(req.body.sizeXlValue) }) };

        // Tendriamos que dar la opcion de subir muchas img
        let newProductImages = [];
        (req.files[0]) ? newProductImages.push({ name: req.files[0].filename }) : 'buzo_azul.jpg';

        db.Product.create({
            name: req.body.productNewName,
            description: req.body.productNewDescription,
            price: parseFloat(req.body.productNewPrice),
            qty_sold: 0,
            id_category: req.body.productNewCategory,
            status: 1,
            sizes: newProductSizes,
            images: newProductImages,
            }
            , { include: [{ all: true }] }
            )
        .then((protoProduct) => {
            let colorScope = []; //inicializo una array.
            for(let key in req.body) {
                if (key.includes('color')) {
                    colorScope.push({
                        id_product: protoProduct.id, 
                        id_color: req.body[key],
                        status: 1
                    });
                }; //Si el campo del req.body contiene la palabra color, pushea en la array un {} con las propiedades id_product: el id del producto que estamos creando, y id_color: el valor del campo del req.body que representa al id del color.
            };
            db.Product_Color.bulkCreate(colorScope) // Este bulkcreate, admite como parametro una array con {} con cada fila de la tabla que quiera crear.
            .then(result => {
                res.redirect("/products/upload")
            })
            .catch(function (error) { console.log(error) });
        });
            
    },

    editViewer: function (req, res, next) {

        let productDetail = db.Product.findByPk(req.params.id, {
            include: [{
                all: true
            }]
        });

        let productsCategories = db.Category.findAll();
        let colors = db.Color.findAll();
            
        Promise.all([productDetail, productsCategories, colors])
            .then((values) => {
                // res.send(values) })
                res.render('edit', {
                    title: 'Editar producto',
                    productDetail: values[0],
                    productsCategories: values[1],
                    colors: values[2]
                });
            })
            .catch(function (error) { console.log(error) });
        
    },

    edit: function (req, res, next) {

        // Tendriamos que validar el caso donde no llegue ningun size.
        let editProductSizes = [];
        if (req.body.xs != undefined && req.body.sizeXsValue != "") { editProductSizes.push({ tag: req.body.xs, size_main: parseFloat(req.body.sizeXsValue) }) };
        if (req.body.s != undefined && req.body.sizeSValue != "") { editProductSizes.push({ tag: req.body.s, size_main: parseFloat(req.body.sizeSValue) }) };
        if (req.body.m != undefined && req.body.sizeMValue != "") { editProductSizes.push({ tag: req.body.m, size_main: parseFloat(req.body.sizeMValue) }) };
        if (req.body.l != undefined && req.body.sizeLValue != "") { editProductSizes.push({ tag: req.body.l, size_main: parseFloat(req.body.sizeLValue) }) };
        if (req.body.xl != undefined && req.body.sizeXlValue != "") { editProductSizes.push({ tag: req.body.xl, size_main: parseFloat(req.body.sizeXlValue) }) };

        // // Tendriamos que dar la opcion de modificar las imagenes...
        // let newProductImages = [];
        // (req.files[0]) ? newProductImages.push({ name: req.files[0].filename }) : 'buzo_azul.jpg';


        // Asigno: name compuesto por el id + "deleted" y status 0 al producto pasado por id.    
        let deletedProduct = db.Product.update({
                                status: 0,
                                name: req.params.id + 'deleted',
                            }, {
                                where: {
                                    id: req.params.id
                                }
                            }); 

        // Voy a la tabla intermedia y le doy status 0 a todos las filas que tengan como producto al del id.
        let deletedProCol = db.Product_Color.update({
                                status: 0   
                            }, {
                                where: {
                                    id_product: req.params.id
                                }
                            });


        let editCreation = db.Product.create({
                                name: req.body.productEditName,
                                description: req.body.productEditDescription,
                                price: parseFloat(req.body.productEditPrice),
                                qty_sold: 0, //Resetea qty_sold. Debemos mejorar este manejo.
                                id_category: req.body.productEditCategory,
                                status: 1,
                                sizes: editProductSizes,
                                // images: newProductImages,
                                }
                                , { include: [{ all: true }] }
                                )
                                .then((protoProduct) => {
                                    let colorScope = []; //inicializo una array.
                                    for(let key in req.body) {
                                        if (key.includes('color')) {
                                            colorScope.push({
                                                id_product: protoProduct.id, 
                                                id_color: req.body[key],
                                                status: 1
                                            });
                                        }; //Si el campo del req.body contiene la palabra color, pushea en la array un {} con las propiedades id_product: el id del producto que estamos creando, y id_color: el valor del campo del req.body que representa al id del color.
                                    };
                                    db.Product_Color.bulkCreate(colorScope)
                                    // Por ahora pondremos las mismas imagenes que tenia el producto anterior
                                    .then(results => db.Image.update({
                                                    id_product_image: protoProduct.id   
                                                }, {
                                                    where: {
                                                        id_product_image: req.params.id
                                                    }
                                                })   
                                    )});

                                
        // Redirijo a products/upload otra vez.
        Promise.all([deletedProduct, deletedProCol, editCreation])
        .then((values) => {
        res.redirect('/products/upload');
        })
        .catch(function (error) { console.log(error) });

    },

    deleteViewer: function (req, res, next) {

        db.Product.findByPk(req.params.id, {
            include: [{
                all: true
            }]
        }).then(function (productToDelete) {
            // res.send(productToDelete)});
            res.render("delete", {
                title: 'Eliminar producto',
                productToDelete: productToDelete,
            });
        })
            .catch(function (error) { console.log(error) });
    },

    delete: function (req, res, next) {
        // Asigno status 0 al producto pasado por id. Reemplazo el nombre por si en algun momento se da de alta un producto con el mismo nombre...
        let productResult = db.Product.update({
                                status: 0,
                                name: req.params.id + 'deleted',
                            }, {
                                where: {
                                    id: req.params.id
                                }
                            });

        // Voy a la tabla intermedia y le doy status 0 a todos las filas que tengan como producto al del id.
        let proColResult = db.Product_Color.update({
                                status: 0
                            }, {
                                where: {
                                    id_product: req.params.id
                                }
                            });
        // Redirijo a products/upload otra vez.
        Promise.all([productResult, proColResult])
            .then((values) => {
                res.redirect('/products/upload');
            })
            .catch(function (error) { console.log(error) });
        
    }
};