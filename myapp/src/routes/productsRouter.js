const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');
const multer = require('multer');

var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../../public/images/products'))
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
      })
       
      var upload = multer({ storage: storage })

// General products render 
router.get('/index/:id?', productsController.productsIndex);

// Product CRUD routes
router.get('/upload/:id?', productsController.upload);


router.get('/create', productsController.create);
router.get('/edit/:id', productsController.editViewer);
router.get('/delete/:id', productsController.deleteViewer);
// router.post('/create', productsController.upload);

router.post('/create', upload.any(), productsController.createNew);
router.put('/edit/:id', productsController.edit);
router.delete('/delete/:id', productsController.delete);

// Product details 
router.get('/detail/:id', productsController.detail);
// router.get('/:id', productsController.productsIndex);



module.exports = router;

