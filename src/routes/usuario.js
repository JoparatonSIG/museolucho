var express = require('express');
var router = express.Router();

var usuariosController = require('../controllers/usuarios');

/* GET users listing. */
router.get('/', usuariosController.index);

module.exports = router;
