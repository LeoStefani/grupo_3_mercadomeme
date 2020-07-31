const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');


module.exports = [
    check("loginEmail")
    .isEmail()
    .withMessage("El email no puede estar vacío"),
    check("loginPassword")
    .isLength({min:8})
    .withMessage("La contraseña debe tener al menos 8 caracteres")
]