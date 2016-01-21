'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();

/*
Rutas que terminan en /web
GET /
*/
router.get('/', function (req, res) {
  res.render('publico/home/index',{ title: 'Bienvenidos' });
});

router.get('/historia', function (req, res) {
  res.render('publico/museo/historia',{ title: 'Bienvenidos' });
});

router.get('/fundacion', function (req, res) {
  res.render('publico/museo/fundacion',{ title: 'Bienvenidos' });
});

router.get('/informacion-practica', function (req, res) {
  res.render('./publico/informacion/informacion-practica',{ title: 'Bienvenidos' });
});

router.get('/horarios-tarifas', function (req, res) {
  res.render('./publico/informacion/horarios-tarifas',{ title: 'Bienvenidos' });
});

router.get('/visitas-guiadas', function (req, res) {
  res.render('./publico/informacion/visitas-guiadas',{ title: 'Bienvenidos' });
});

router.get('/planos', function (req, res) {
  res.render('./publico/informacion/planos',{ title: 'Bienvenidos' });
});

router.get('/normas', function (req, res) {
  res.render('./publico/informacion/normas',{ title: 'Bienvenidos' });
});
/* (trae todos los usuarios)
// GET /usuario */

router.get('/', function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.retrieveAll(function (usuarios) {
    if (usuarios) {
      res.json(usuarios);
    } else {
      res.send(401, 'No se encontraron Usuarios');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
});

module.exports = router;
