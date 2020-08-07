const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

module.exports = [   
    check("userEmail")
    .isLength({min:1})
    .withMessage("El email no puede quedar vacío"),
    check("userEmail")
        .isEmail()
        .withMessage("El email ingresado es inválido"),
    check("userName")
        .isLength({min:1})
        .withMessage("El nombre de usuario no puede quedar vacío"),
    check("userPassword")
        .isLength({min:8})
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("userEmail")
        .custom(
                function (value) {
                for (let i=0; i<users.length ; i++) {
                        if (users[i].email == value) {
                        return false;}
                } return true;
                }
        )
        .withMessage("El email ya se encuentra registrado"),
    body("userName")
        .custom(
                function (value) {
                for (let i=0; i<users.length ; i++) {
                        if (users[i].user_name == value) {
                        return false;}
                } return true;
                }
        )
        .withMessage("El username ya se encuentra registrado")
];