var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const productsController = require('../controllers/productsController');
const memesController = require('../controllers/memesController');

/* GET home page. */
router.get('/', indexController.index);

router.get('/products', productsController.productsIndex);
router.get('/memes', memesController.memesIndex);


module.exports = router;
