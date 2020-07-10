var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.usersIndex);
router.get('/register', usersController.register);


module.exports = router;
