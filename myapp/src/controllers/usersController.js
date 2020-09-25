const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require("express-validator");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
    usersIndex: function (req, res, next) {
        res.send("Acá no se bien que va a ir, deberíamos esperar a ver que pasa con eso de session en clase");
    },
    usersProfile: function (req, res, next) {

        //     let userProfile;
        //     for (let i = 0; i < users.length; i++) {
        //         if (users[i].id == req.params.userId) {
        //                 userProfile = users[i];
        //                 break;
        //         };
        // };

        db.User.findByPk(req.params.userId).then(function (users) {
            res.render("usersProfile", {
                title: "Mi Perfil",
                user: users,
                old: req.body
            })
        })
            .catch(function (error) { res.send(error) });

        // res.render("usersProfile", {
        //         title: "Mi Perfil",


        // });
    },
    registerDB: function (req, res, next) {
        res.render('registerDB', {
            title: "Registro"
        });
    },
    createUserDB: function (req, res, next) {

        // let errors = validationResult(req);
        // Aca hace el IF grande, en el cual si viene sin errores, (errors.isEmpty()), se crea el usuario y sino manda los errores a la vista.
        // if (errors.isEmpty() && db.User.Errors == undefined) {
        let VRerrors = validationResult(req);
        // Aca hace el IF grande, en el cual si viene sin errores, (errors.isEmpty()), se crea el usuario y sino manda los errores a la vista.
        if (VRerrors.isEmpty()) {


            db.User.create({
                username: req.body.userName,
                email: req.body.userEmail,
                password: bcrypt.hashSync(req.body.userPassword, 10),
                avatar: (req.files[0]) ? req.files[0].filename : 'usuario.png'
            })
                .then(function (user) {
                    res.redirect("/users/login")
                })
                .catch(function (errors) {
                    res.send(errors)
                    // res.render("registerDB", {
                    //     errors: errors,
                    //     title: "Registro - Error",
                    //     old: req.body
                    // })
                })
        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el register
            // pero esta vez enviando que errores hubo al llenar los campos. Tambien con OLD retiene lo que habian enviado bien
            return res.render("registerDB", {
                errors: VRerrors.mapped(),
                title: "Registro - Error",
                old: req.body
            })
        };

    },
    cart: function (req, res, next) {

        if (Object.keys(req.session.userCart).length === 0) {
            res.render("cart", {
                title: "Carrito",
                message: "Tu carrito esta vacío :(",
                products: req.session.userCart,
            });
        } else {
            //Mapeamos en idsArray para obtener todos los ids que vinieron.
            let idsArray = req.session.userCart.map(element => element.id);
            //Buscamos todos los productos con esos ids de la base de datos.
            db.Product.findAll({
                include: [{
                    all: true
                }],
                where: {
                    id: { [Op.or]: idsArray }
                }
                }).then(function (productsData) {
                    req.session.userCart = req.session.userCart.map(element => {
                        for(let i=0; i<productsData.length; i++) {
                            if(productsData[i].id === element.id) {
                                return {
                                    ...element,
                                    name: productsData[i].name,
                                    price: productsData[i].price,
                                    image: productsData[i].images[0].name
                                };
                            };
                        };
                    });
                    res.render("cart", {
                            title: "Carrito",
                            message: "",
                            products: req.session.userCart
                        });
                })
        };

    },
    dataCart: function (req, res, next) {

        req.session.userCart = req.body;
        res.send('okPost');

    },
    loginView: function (req, res, next) {

        // cada vez que alguien renderiza el login, se guarda de que dirección vino ese request. 

        if (req.header("Referer") != "http://localhost:3000/users/registerDB" && req.header("Referer") != "http://localhost:3000/users/registerdb") {

            req.session.lastRef = req.header("Referer");
        }         

        res.render('login', {
            title: 'Login'
        });
    },
    login: function (req, res, next) {

        // defino una variable auxiliar para almacenar de donde vino el request cuando se fue al login por GET
        let lastHref ;

        // si vino, la seteo en con lo que vino, y sino queda al home

        if (req.session.lastRef) {
            lastHref = req.session.lastRef
        }
        else {
        lastHref = "/"
        }
       
        // Setea variable VRerrors con aplicar validationResult a lo que viene por el request.
        let VRerrors = validationResult(req);

        // Aca hace el IF grande, en el cual si viene sin errores, (VRerrors.isEmpty()), se loggea el usuario y sino manda los errores a la vista.
        if (VRerrors.isEmpty()) {

            // Busco con findOne si el email ingresado es correcto. 
            db.User.findOne({ where: { email: req.body.loginEmail } })
                .then(function (user) {

                    if (user != null) {

                        if (bcrypt.compareSync(req.body.loginPassword, user.password)) {

                            // En caso de que haya encontrado algo, lo guardo en session
                            req.session.loggedUser = user;
                            // Ademas, si no hay cookie guardada, en este momento se genera guardando los datos del usuario matcheado.
                            if (req.body.rememberMe != undefined) {
                                res.cookie('rememberMe', user.id, { maxAge: 120 * 1000 * 20 })
                            }
                            // Por úlitmo se lo redirigiria al último sitio de donde haya venido el request.   

                            res.redirect(lastHref)
                        } else {
                            res.render("login", {
                                title: "login - Error",
                                old: req.body,
                                errormsg: "Mail o contraseña inválidos",
                                errors: VRerrors.mapped()
                            })
                        }


                    } else {
                        res.render("login", {
                            title: "login - Error",
                            old: req.body,
                            errormsg: "Mail o contraseña inválidos",
                            errors: VRerrors.mapped()
                        })
                    }
                    ;
                }).catch(function (error) {
                    // console.log(error)
                })

        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el register
            // pero esta vez enviando que errores hubo al llenar los campos. Tambien con OLD retiene lo que habian enviado bien
            return res.render("login", {
                errors: VRerrors.mapped(),
                title: "login - Error",
                old: req.body
            })
        }
    },
    logout: function (req, res, next) {
        // Cuando se entra a la ruta /users/logout hace un session destroy y manda un mensaje.
        req.session.destroy();
        res.cookie('rememberMe', '', { maxAge: -1 });
        res.redirect('/users/login');
    },
    check: function (req, res, next) {
        // Cuando se entra a la ruta /users/check manda un mensaje de quien esta loggeado en session.
        res.send("El usuario loggeado es " + req.session.loggedUser.username);
    },
    purchaseSettings: function (req, res, next) {
        res.render("purchaseSettings", {
            title: "Configuración de compra"
        });
    },
    usersProfileEdit: function (req, res, next) {

        // let errors = validationResult(req);
        // Aca hace el IF grande, en el cual si viene sin errores, (errors.isEmpty()), se crea el usuario y sino manda los errores a la vista.
        // if (errors.isEmpty() && db.User.Errors == undefined) {
        let VRerrors = validationResult(req);

        // Aca hace el IF grande, en el cual si viene sin errores, (errors.isEmpty()), se crea el usuario y sino manda los errores a la vista.
        if (VRerrors.isEmpty()) {

            if (req.files) {

                db.User.update({
                    avatar: req.files[0].filename
                },
                    { where: { id: req.params.userId } })
                    .then(function (users) { res.redirect("/users/profile/" + req.params.userId) })
                    .catch(function (error) { console.log(error) })

            } else {

                db.User.update({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    dni: req.body.dni,
                    phone_0: req.body.phone_0,
                    phone_1: req.body.phone_1,
                    credit_card_0: req.body.credit_card_0,
                    credit_card_1: req.body.credit_card_1,
                    address_0: req.body.address_0,
                    address_1: req.body.address_1
                },
                    { where: { id: req.params.userId } })
                    .then(function (result) {

                        res.redirect("/users/profile/" + req.params.userId)
                    })
                    .catch(function (errors) {
                        // res.send(errors)
                        res.render("usersProfile", {
                            errorsDB: errors,
                            user: users,
                            title: "Mi Perfil - Error",
                        })
                    })

                    ;
            }

        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el register
            // pero esta vez enviando que errores hubo al llenar los campos.
            return db.User.findByPk(req.params.userId).then(function (users) {

                // res.send(VRerrors.mapped())
                res.render("usersProfile", {
                    title: "Mi Perfil",
                    user: users,
                    errors: VRerrors.mapped()
                })
            })
                .catch(function (error) { res.send(error) })

        }


    }
}