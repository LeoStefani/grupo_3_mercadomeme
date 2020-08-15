const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');

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
        .withMessage("La contraseña debe tener al menos 8 caracteres")
];