var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const fs = require('fs');
const path = require('path');
const registerValidations = require("../validations/registerValidations");
const loginValidations = require('../validations/loginValidations');
const profileValidations = require('../validations/profileValidations');

const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
let upload = require('../middlewares/multerUsersMW');


let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));


router.get('/', usersController.usersIndex);
router.get('/check', usersController.check);

router.get('/registerDB', usersController.registerDB);
router.post('/registerDB', upload.any(), registerValidations, usersController.createUserDB);


router.get('/login', usersController.loginView);

// Chequeo que el email sea un email y que el password tenga 8 caracteres. Agrego loginValidations como middleware
router.post('/login', loginValidations, usersController.login);

// ruta para destruir la session.
router.get('/logout', usersController.logout);

router.get('/cart', authMiddleware, usersController.cart);

router.get('/cart/settings', authMiddleware, usersController.purchaseSettings);

router.get('/profile/:userId', authMiddleware, usersController.usersProfile);
router.post('/profile/:userId', upload.any(), profileValidations, authMiddleware, usersController.usersProfileEdit);





module.exports = router;
