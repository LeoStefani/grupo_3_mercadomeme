var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.productsIndex);
router.get('/detail', productsController.detail);
router.get('/upload', productsController.upload);


module.exports = router;

