var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

// General products render 
router.get('/index/:id?', productsController.productsIndex);

// Product CRUD routes
router.get('/upload', productsController.upload);

router.get('/create', productsController.create);
// router.post('/create', productsController.upload);

router.get('/:id/edit', productsController.upload);
router.put('/:id', productsController.upload);
router.delete('/:id', productsController.upload);

// Product details 
router.get('/detail/:id', productsController.detail);
// router.get('/:id', productsController.productsIndex);



module.exports = router;

