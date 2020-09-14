const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');
const multer = require('multer');
let upload = require('../middlewares/multerProductsMW');
const createValidations = require('../validations/createValidations');



// General products render 
router.get('/index/:id?', productsController.productsIndex);

// Product CRUD routes
router.get('/upload/:id?', productsController.upload);


router.get('/create', productsController.create);
router.get('/edit/:id', productsController.editViewer);
router.get('/delete/:id', productsController.deleteViewer);
// router.post('/create', productsController.upload);

router.post('/create', upload.any(), createValidations, productsController.createNew);
router.put('/edit/:id', upload.any(), productsController.edit);
router.delete('/delete/:id', productsController.delete);

// Product details 
router.get('/detail/:id', productsController.detail);
// router.get('/:id', productsController.productsIndex);






module.exports = router;

