const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require("express-validator");
const db = require("../database/models");

// Si llega a leer el JSON y no hay nadie registrado, lo inicializa como array vacio.
let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users;
if (usersJSON == "") {
    users = [];
} else {
    users = JSON.parse(usersJSON)
};

let maxId = function () {

    idAcumulator = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id > idAcumulator) {
            idAcumulator = users[i].id;
        };
    };
    return idAcumulator + 1;
    // TENER CUIDADO QUE NO ES EL MÁXIMO ID DE LOS PRODUCTOS ACTUALES, SINO EL SIGUIENTE LIBRE, DADO QUE ESTA PENSADO PARA LA CARGA DE PRODUCTOS NUEVOS
};

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
            .catch(function (error) { console.log(error) });

        // res.render("usersProfile", {
        //         title: "Mi Perfil",


        // });
    },
    registerDB: function (req, res, next) {
        res.render('registerDB', {
            title: "RegistroDB"
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
                    // res.send(errors);
                    res.render("registerDB", {
                        errors: errors,
                        title: "RegistroDBError",
                        old: req.body
                    })
                })
        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el register
            // pero esta vez enviando que errores hubo al llenar los campos. Tambien con OLD retiene lo que habian enviado bien
            return res.render("registerDB", {
                errors: VRerrors.mapped(),
                title: "Registro",
                old: req.body
            })
        };

    },
    cart: function (req, res, next) {
        res.render("cart", {
            title: "Carrito"
        });
    },
    loginView: function (req, res, next) {
        res.render('login', {
            title: 'Login'
        });
    },
    login: function (req, res, next) {

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
                            // Por úlitmo se lo redirigiria al HOME.
                            res.redirect('/')
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
                    .then(function (users) { res.redirect("/users/profile/" + req.params.userId) })
                    .catch(function (errors) { 
                        res.render("usersProfile", {
                        errors: errors,
                        title: "Mi Perfil - Error",
                        old: req.body })
                    })

            }

        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el register
            // pero esta vez enviando que errores hubo al llenar los campos. Tambien con OLD retiene lo que habian enviado bien
            return db.User.findByPk(req.params.userId).then(function (users) {
                res.render("usersProfile", {
                    title: "Mi Perfil",
                    user: users,
                    errors: VRerrors.mapped(),
                                   })
            })
                .catch(function (error) { console.log(error) })   

        }


    }
}