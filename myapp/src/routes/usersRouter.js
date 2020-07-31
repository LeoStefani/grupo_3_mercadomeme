var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
// const registerValidations = require("../validations/registerValidations");
// const loginValidations = require('../validations/loginValidations')

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

router.get('/', usersController.usersIndex);
router.get('/check', usersController.check);
router.get('/register', usersController.register);

// HABIA SACADO LAS VALIDACIONES EN UN ARCHIVO APARTE PERO EN CIERTAS OCASIONES NO ANDABA DEL TODO BIEN Y NO SE POR QUE
// Chequeo que email sea valido, que user no venga vacio, que passord tenga 8 caracteres y que tanto email como user no existan en la base de datos.
router.post('/register', [   
    check("userEmail").isEmail().withMessage("El email no puede estar vacío"),
    check("userName").isLength({min:1}).withMessage("El nombre de usuario no puede quedar vacío"),
    check("userPassword").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("userEmail").custom(
        function (value) {
            for (let i=0; i<users.length ; i++) {
                if (users[i].email == value) {
                return false;}
            } return true;
        }
    ).withMessage("El email ya se encuentra registrado"),
    body("userName").custom(
        function (value) {
            for (let i=0; i<users.length ; i++) {
                if (users[i].user_name == value) {
                return false;}
            } return true;
        }
    ).withMessage("El username ya se encuentra registrado")
], usersController.createUser);

router.get('/login', usersController.loginView);

// HABIA SACADO LAS VALIDACIONES EN UN ARCHIVO APARTE PERO EN CIERTAS OCASIONES NO ANDABA DEL TODO BIEN Y NO SE POR QUE
// Chequeo que el email sea un email y que el password tenga 8 caracteres.
router.post('/login', [
    check("loginEmail").isEmail().withMessage("El email no puede estar vacío"),
    check("loginPassword").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres")
], usersController.login);

// ruta para destruir la session.
router.get('/logout', usersController.logout);

router.get('/cart', usersController.cart);

router.get('/cart/settings', usersController.purchaseSettings);

router.get('/profile', usersController.usersProfile);
// Aca despues quedara seteado por :id


module.exports = router;
