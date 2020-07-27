const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require("express-validator");

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
    register: function (req, res, next) {
        res.render('register', {
            title: "Registro"
        });
    },
    createUser: function (req, res, next) {
        // Setea variable newUser inicialmente vacia.
        let newUser = {};
        // Setea variable errors con aplicar validationResult a lo que viene por el request.
        let errors = validationResult(req);
        // Aca hace el IF grande, en el cual si viene sin errores, (errors.isEmpty()), se crea el usuario y sino manda los errores a la vista.
        if (errors.isEmpty()) {
            // Dado que la estructura del JSON estaba, deje el last_name vacio por defecto.
            newUser.id = maxId();
            newUser.user_name = req.body.userName;
            newUser.last_name = "";
            newUser.email = req.body.userEmail;
            newUser.password = bcrypt.hashSync(req.body.userPassword, 10);
            newUser.category = "user";
            newUser.image = "user_" + newUser.id + ".jpg";
            // Aca pushea el nuevo usuario a lo existente.
            users.push(newUser);
            // Acá resscribe el nuevo array de usuarios.
            fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users));
        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el register
            // pero esta vez enviando que errores hubo al llenar los campos. Tambien con OLD retiene lo que habian enviado bien
            return res.render("register", {
                errors: errors.mapped(),
                title: "Registro",
                old: req.body
            })
        };
        // Si se creó todo bien, te redirige al HOME. Si habría errores, el ELSE te hubiese pateado al register de nuevo.
        res.redirect("/");
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

        // Setea variable errors con aplicar validationResult a lo que viene por el request.
        let errors = validationResult(req);

        // Aca hace el IF grande, en el cual si viene sin errores, (errors.isEmpty()), se loggea el usuario y sino manda los errores a la vista.
        if (errors.isEmpty()) {
            // inicializo la variable userToLogin
            let userToLogin;
            // recorre todos los usuarios para ver si el email puesto en el body del login coincide con alguno guardado en el JSON.
            // Si coincide alguno, revisa que la contraseña hasheada sea comparable.
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.loginEmail) {
                    if (bcrypt.compareSync(req.body.loginPassword, users[i].password)) {
                        userToLogin = users[i];
                        break;
                    }
                }
            };

            // si llego al final del for y no encontro ninguno, entonces userToLogin sigue indefinido, y por lo tanto manda mensaje que 
            // o usuario o contraseña estan mal. Tambien con OLD retiene lo que habian enviado bien
            if (userToLogin == undefined) {
                return res.render("login",{
                    title: 'Login',
                    errors: errors.mapped(),
                    error: "Usuario o contraseña inválidos",
                    old: req.body
                })
            };

            // Dado que si userToLogin quedo indefinido se ejecutó el IF anterior que tiene return, esta parte no se ejecuta al menos que si
            // se encuentre el usuario. En ese caso, todos los datos del mismo se guardan en session.
            req.session.loggedUser = userToLogin;

            // Ademas, si no hay cookie guardada, en este momento se genera guardando los datos del usuario matcheado.
            if (req.body.rememberMe != undefined) {
                res.cookie('rememberMe', userToLogin.email, { maxAge:60*1000})
            }
            // Por ultimo te redirige al home.
            res.redirect('/');
        } else {
            // Este ELSE viene de si habia errores en el ingreso de datos, para lo cual renderiza de nuevo el login
            // pero esta vez enviando que errores hubo al llenar los campos.
            res.render("login", {
                title: 'Login',
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    logout: function (req,res,next){
        // Cuando se entra a la ruta /users/logout hace un session destroy y manda un mensaje.
        req.session.destroy();
        res.send('Session destruida!');
    },
    check: function (req, res, next){
        // Cuando se entra a la ruta /users/check manda un mensaje de quien esta loggeado en session.
        res.send("El usuario loggeado es " + req.session.loggedUser.user_name);
    },
    purchaseSettings: function (req,res,next){
           res.render("purchaseSettings", {
            title: "Configuración de compra"
        });
    }
};