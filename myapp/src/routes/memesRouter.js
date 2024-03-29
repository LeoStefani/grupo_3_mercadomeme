var express = require('express');
var router = express.Router();
let upload = require('../middlewares/multerMemesMW');


const memesController = require('../controllers/memesController');

router.get('/', memesController.memesIndex);

router.post('/', upload.any(), memesController.memeSave);

router.post('/rename', memesController.memeRename);

    

module.exports = router;
