var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require('express-validator');

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

router.get('/', usersController.usersIndex);
router.get('/register', usersController.register);

router.post('/register', [

    check("userEmail").isEmail().withMessage("El email no puede estar vacío"),
    check("userName").isLength({min:0}).withMessage("El nombre de usuario no puede quedar vacío"),
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
router.post('/login', [
    check("loginEmail").isEmail().withMessage("El email no puede estar vacío"),
    check("loginPassword").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres")
], 
usersController.login);

router.get('/cart', usersController.cart);

module.exports = router;
