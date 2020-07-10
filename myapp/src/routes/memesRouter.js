var express = require('express');
var router = express.Router();
const memesController = require('../controllers/memesController');

router.get('/', memesController.memesIndex);

module.exports = router;
