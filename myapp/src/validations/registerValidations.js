const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const db = require("../database/models");


module.exports = [
    check("userEmail")
        .isLength({ min: 1 })
        .withMessage("El email no puede quedar vacío"),
    check("userEmail")
        .isEmail()
        .withMessage("El email ingresado es inválido"),
    check("userName")
        .isLength({ min: 1 })
        .withMessage("El nombre de usuario no puede quedar vacío"),
    check("userPassword")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body('userEmail')
        .custom(function (value) {
            return db.User.findOne(
                {
                    where: { email: value }
                })
                .then(function (result) {
                    if (result) {
                        return Promise.reject('El usuario está registrado')
                    }
                })
        }),
    body('userName')
        .custom(function (value) {
            return db.User.findOne(
                {
                    where: { username: value }
                })
                .then(function (result) {
                    if (result) {
                        return Promise.reject('El username ya se encuentra registrado')
                    }
                })
        })
];

