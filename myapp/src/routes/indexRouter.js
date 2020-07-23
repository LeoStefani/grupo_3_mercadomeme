var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/error', indexController.error);

module.exports = router;
