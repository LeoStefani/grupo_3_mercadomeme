const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body} = require("express-validator");


let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

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
    usersIndex: function (req,res,next) {
        res.send("Acá no se bien que va a ir, deberíamos esperar a ver que pasa con eso de session en clase");
    },
    register: function(req,res,next) {
        res.render('register', { title: "Registro" });
    },
    createUser: function(req,res,next) {

        let newUser = {};

        let errors = validationResult(req);
        
        if (errors.isEmpty()) {

            newUser.id = maxId();
            newUser.user_name = req.body.userName;
            newUser.last_name = "";
            newUser.email = req.body.userEmail;
            newUser.password = bcrypt.hashSync(req.body.userPassword, 10) ;
            newUser.category = "user";
            newUser.image = "user_"+newUser.id+".jpg";
    
            users.push(newUser);
    
            fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(users));

        }else{

            return res.render("register" , {errors: errors.mapped(), title: "Registro", old: req.body})


        };

    res.redirect("/");
},
    cart: function (req,res,next) {
        res.render("cart", { title: "Carrito" });
    }
};