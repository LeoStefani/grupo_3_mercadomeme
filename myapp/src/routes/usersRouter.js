var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const registerValidations = require("../validations/registerValidations");
const loginValidations = require('../validations/loginValidations')

let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

router.get('/', usersController.usersIndex);
router.get('/register', usersController.register);

router.post('/register', registerValidations, usersController.createUser);

router.get('/login', usersController.loginView);
router.post('/login', loginValidations, usersController.login);

router.get('/cart', usersController.cart);

module.exports = router;
