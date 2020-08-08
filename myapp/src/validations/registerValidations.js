const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const db = require("../database/models");

module.exports = [   
    check("userEmail")
        .isEmail()
        .withMessage("El email no puede estar vacío"),
    check("userName")
        .isLength({min:1})
        .withMessage("El nombre de usuario no puede quedar vacío"),
    check("userPassword")
        .isLength({min:8})
        .withMessage("La contraseña debe tener al menos 8 caracteres")
    // body("userEmail")
    //     .custom(           
    //         function (value) {

    //             let verify = true;

    //             db.User.findOne({where: {email: value}})
    //             .then(function(user){
    //                 console.log(user);
    //                 if (user.id != null) { 
    //                      verify = false}
    //                      return verify
    //                 })
    //                 return verify }
    //     )
    //     .withMessage("El email ya se encuentra registrado")
    // body("userName")
    //     .custom(async function (value) {

    //             var user = await db.User.findOne({where: {username: value}})

    //             console.log("sdfasdfafdafdasda    " + user.id)

    //             if (user.id != null) {return true} 
                
    //             return false
    //     }
             
    //     ).withMessage("El username ya se encuentra registrado")
];