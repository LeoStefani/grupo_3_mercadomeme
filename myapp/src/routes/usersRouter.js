const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerValidations = require("../validations/registerValidations");
const loginValidations = require('../validations/loginValidations');
const profileValidations = require('../validations/profileValidations');

const authMiddleware = require('../middlewares/authMiddleware');
const profileAuthMW = require('../middlewares/profileAuthMW');
let upload = require('../middlewares/multerUsersMW');


router.get('/', usersController.usersIndex);
router.get('/check', usersController.check);
router.get('/exist', usersController.exist);

router.get('/registerDB', usersController.registerDB);
router.post('/registerDB', upload.any(), registerValidations, usersController.createUserDB);


router.get('/login', usersController.loginView);

// Chequeo que el email sea un email y que el password tenga 8 caracteres. Agrego loginValidations como middleware
router.post('/login', loginValidations, usersController.login);

// ruta para destruir la session.
router.get('/logout', usersController.logout);

router.get('/cart', authMiddleware, usersController.cart);
router.post('/cart', usersController.dataCart);

router.get('/cart/settings', authMiddleware, usersController.purchaseSettings);

router.get('/profile/:userId', authMiddleware, usersController.usersProfile);
router.post('/profile/:userId', upload.any(), profileValidations, authMiddleware, usersController.usersProfileEdit);

router.delete('/profile/:userId', authMiddleware, usersController.usersProfileDelete)





module.exports = router;
