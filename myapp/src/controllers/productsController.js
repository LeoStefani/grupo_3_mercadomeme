const db = require("../database/models");
const { Op } = require("sequelize");
const { check, validationResult, body } = require("express-validator");

let stringRegEx =  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
let numberRegEx = /^[0-9]+([,.][0-9]+)?$/g;

module.exports = {
    productsIndex: function (req, res, next) {
        // recupero productos con db
        db.Product.findAll({
            include: [{
                all: true
            }],
            where: {
                status: { [Op.eq]: 1 }
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
                    productDetail: productDetail, 
                    session: req.session.memeCreated
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
                status: { [Op.eq]: 1 }
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
    
        let VRerrors = validationResult(req);

        let newProductSizes = [];
        let sizeValidator = [false, false, false, false, false];

        if (req.body.xs == 'XS') {
            if ((typeof req.body.sizeXsValue != "undefined") && req.body.sizeXsValue.match(numberRegEx)) { 
            newProductSizes.push({ tag: req.body.xs, size_main: parseFloat(req.body.sizeXsValue) });
            sizeValidator[0] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño XS", "param": "sizeXs" })
            };
        };

        if (req.body.s == 'S') {
            if ((typeof req.body.sizeSValue != "undefined") && req.body.sizeSValue.match(numberRegEx)) { 
            newProductSizes.push({ tag: req.body.s, size_main: parseFloat(req.body.sizeSValue) });
            sizeValidator[1] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño S", "param": "sizeS" })
            };
        };

        if (req.body.m == 'M') {
            if ((typeof req.body.sizeMValue != "undefined") && req.body.sizeMValue.match(numberRegEx)) { 
            newProductSizes.push({ tag: req.body.m, size_main: parseFloat(req.body.sizeMValue) });
            sizeValidator[2] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño M", "param": "sizeM" })
            };
        };

        if (req.body.l == 'L') {
            if ((typeof req.body.sizeLValue != "undefined") && req.body.sizeLValue.match(numberRegEx)) { 
            newProductSizes.push({ tag: req.body.l, size_main: parseFloat(req.body.sizeLValue) });
            sizeValidator[3] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño L", "param": "sizeL" })
            };
        };

        if (req.body.xl == 'XL') {
            if ((typeof req.body.sizeXlValue != "undefined") && req.body.sizeXlValue.match(numberRegEx)) { 
            newProductSizes.push({ tag: req.body.xl, size_main: parseFloat(req.body.sizeXlValue) });
            sizeValidator[4] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño XL", "param": "sizeXl" })
            };
        };

        if (!sizeValidator.includes(true)) {
            VRerrors.errors.push({'msg': "Debes seleccionar al menos un tamaño", "param": "size" })
        };
        
        let colorValidator = false;
        for (let key in req.body) {
            if (key.includes('color')) {
                colorValidator = true;
                break;
            };
        }; 
        
        if(colorValidator === false) {
            VRerrors.errors.push({'msg': "Debes seleccionar al menos un color", "param": "color" })
        };        
            
        let newProductImages = [];
        for (let i=0; i<req.files.length; i++) {
            newProductImages[i] = { name: req.files[i].filename };
        };

        if (VRerrors.isEmpty()) {
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
                    for (let key in req.body) {
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
        } else {
            res.render('error', {
                title: 'Errores - carga de producto',
                errors: VRerrors.mapped()
            });
        };

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

        let VRerrors = validationResult(req);


        let editProductSizes = [];
        let sizeValidator = [false, false, false, false, false];

        if (req.body.xs == 'XS') {
            if ((typeof req.body.sizeXsValue != "undefined") && req.body.sizeXsValue.match(numberRegEx)) { 
            editProductSizes.push({ tag: req.body.xs, size_main: parseFloat(req.body.sizeXsValue) });
            sizeValidator[0] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño XS", "param": "sizeXs" })
            };
        };

        if (req.body.s == 'S') {
            if ((typeof req.body.sizeSValue != "undefined") && req.body.sizeSValue.match(numberRegEx)) { 
            editProductSizes.push({ tag: req.body.s, size_main: parseFloat(req.body.sizeSValue) });
            sizeValidator[1] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño S", "param": "sizeS" })
            };
        };

        if (req.body.m == 'M') {
            if ((typeof req.body.sizeMValue != "undefined") && req.body.sizeMValue.match(numberRegEx)) { 
            editProductSizes.push({ tag: req.body.m, size_main: parseFloat(req.body.sizeMValue) });
            sizeValidator[2] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño M", "param": "sizeM" })
            };
        };

        if (req.body.l == 'L') {
            if ((typeof req.body.sizeLValue != "undefined") && req.body.sizeLValue.match(numberRegEx)) { 
            editProductSizes.push({ tag: req.body.l, size_main: parseFloat(req.body.sizeLValue) });
            sizeValidator[3] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño L", "param": "sizeL" })
            };
        };

        if (req.body.xl == 'XL') {
            if ((typeof req.body.sizeXlValue != "undefined") && req.body.sizeXlValue.match(numberRegEx)) { 
            editProductSizes.push({ tag: req.body.xl, size_main: parseFloat(req.body.sizeXlValue) });
            sizeValidator[4] = true; 
            } else {
            VRerrors.errors.push({'msg': "Debes agregar un valor numérico para el tamaño XL", "param": "sizeXl" })
            };
        };

        if (!sizeValidator.includes(true)) {
            VRerrors.errors.push({'msg': "Debes seleccionar al menos un tamaño", "param": "size" })
        };

        let colorValidator = false;
        for (let key in req.body) {
            if (key.includes('color')) {
                colorValidator = true;
                break;
            };
        }; 
        
        if(colorValidator === false) {
            VRerrors.errors.push({'msg': "Debes seleccionar al menos un color", "param": "color" })
        };        

        let editedProductImages = [];
        if(!Array.isArray(req.body.oldImgEdition)) {
            editedProductImages.push(req.body.oldImgEdition);
        } else {
            editedProductImages = req.body.oldImgEdition;
        };

        //Armamos una array con las imagenes viejas. Luego recorremos el req.files para ver si alguna se actualizo. De ser asi, la reemplazamos.
        for (let i=0 ; i<5; i++) {
            for (let j=0; j<req.files.length; j++) {
                if (req.files[j].fieldname == 'imgProduct' + i) {
                    editedProductImages[i] = req.files[j].filename;
                };
            };
        };

        // Formateamos la data para pasarsela a la base de datos.
        let editedProductImagesMapped = editedProductImages.map(function(element) { 
                let obj = {};
                obj.name = element;
                return obj
            });

        if (VRerrors.isEmpty()) {
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
                                    images: editedProductImagesMapped,
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

                                        db.Product_Color.bulkCreate(colorScope) });
                                        // Por ahora pondremos las mismas imagenes que tenia el producto anterior
                                    
            // Redirijo a products/upload otra vez.
            Promise.all([deletedProduct, deletedProCol, editCreation])
                .then((values) => {
                    res.redirect('/products/upload');
                })
                .catch(function (error) { console.log(error) });    
        } else {
            res.render('error', {
                title: 'Errores - edición de producto',
                errors: VRerrors.mapped()
            });
        };
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