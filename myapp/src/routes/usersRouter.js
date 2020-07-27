var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const registerValidations = require("../validations/registerValidations");
const loginValidations = require('../validations/loginValidations');

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

router.get('/', usersController.usersIndex);
router.get('/check', usersController.check);
router.get('/register', usersController.register);

// HABIA SACADO LAS VALIDACIONES EN UN ARCHIVO APARTE PERO EN CIERTAS OCASIONES NO ANDABA DEL TODO BIEN Y NO SE POR QUE
// Chequeo que email sea valido, que user no venga vacio, que passord tenga 8 caracteres y que tanto email como user no existan en la base de datos.
router.post('/register', registerValidations, usersController.createUser);

router.get('/login', usersController.loginView);

// HABIA SACADO LAS VALIDACIONES EN UN ARCHIVO APARTE PERO EN CIERTAS OCASIONES NO ANDABA DEL TODO BIEN Y NO SE POR QUE
// Chequeo que el email sea un email y que el password tenga 8 caracteres. Agrego loginValidations como middleware
router.post('/login', loginValidations, usersController.login);

// ruta para destruir la session.
router.get('/logout', usersController.logout);

router.get('/cart', usersController.cart);

router.get('/cart/settings', usersController.purchaseSettings);

module.exports = router;
