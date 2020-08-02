var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const registerValidations = require("../validations/registerValidations");
const loginValidations = require('../validations/loginValidations');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
let upload = require('../middlewares/multerUsersMW');


let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));


router.get('/', usersController.usersIndex);
router.get('/check', usersController.check);
router.get('/register', usersController.register);

// Chequeo que email sea valido, que user no venga vacio, que passord tenga 8 caracteres y que tanto email como user no existan en la base de datos.
router.post('/register', upload.any(), registerValidations, usersController.createUser);

router.get('/login', usersController.loginView);

// Chequeo que el email sea un email y que el password tenga 8 caracteres. Agrego loginValidations como middleware
router.post('/login', loginValidations, usersController.login);

// ruta para destruir la session.
router.get('/logout', usersController.logout);

router.get('/cart', authMiddleware, usersController.cart);

router.get('/cart/settings', authMiddleware, usersController.purchaseSettings);

router.get('/profile/:userId', authMiddleware, usersController.usersProfile);
// Aca despues quedara seteado por :id


module.exports = router;
