var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

// General products render 
router.get('/index/:id?', productsController.productsIndex);

// Product CRUD routes
router.get('/upload/:id?', productsController.upload);


router.get('/create', productsController.create);
router.get('/edit/:id', productsController.editViewer);
router.get('/delete/:id', productsController.deleteViewer);
// router.post('/create', productsController.upload);

router.post('/create', productsController.createNew);
router.put('/edit/:id', productsController.edit);
router.delete('/delete/:id', productsController.delete);

// Product details 
router.get('/detail/:id', productsController.detail);
// router.get('/:id', productsController.productsIndex);



module.exports = router;

