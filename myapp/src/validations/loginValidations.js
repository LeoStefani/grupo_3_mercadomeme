const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');


module.exports = [
    check("loginEmail")
    .isLength({min:1})
    .withMessage("El email no puede quedar vacío"),
    check("loginEmail")
    .isEmail()
    .withMessage("El email ingresado es inválido"),
    check("loginPassword")
    .isLength({min:8})
    .withMessage("La contraseña debe tener al menos 8 caracteres")
]