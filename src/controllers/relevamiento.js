'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /relevamientos
// router.route('/relevamiento') */

// POST /relevamientos
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var email = req.body.email;
  var nombre = req.body.nombre;
  var password = req.body.password;

  var relevamiento = Museo.Relevamiento.build({ email: email, password: password });

  relevamiento.add(function (success) {
    res.json({ message: 'Relevamiento creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los relevamientos)
// GET /relevamiento */
router.get('/', function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.retrieveAll(function (relevamientos) {
    if (relevamientos) {
      res.json(relevamientos);
    } else {
      res.send(401, 'No se encontraron Relevamientos');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

/* Rutas que terminan en /relevamientos/:relevamientosId
// router.route('/relevamiento/:relevamientoId')
// PUT /relevamientos/:relevamientoId
// Actualiza relevamiento */

router.put('/:relevamientoId', function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.email = req.body.email;
  relevamiento.nombre = req.body.nombre;
  relevamiento.password = req.body.password;

  relevamiento.updateById(req.params.relevamientoId, function (success) {
    if (success) {
      res.json({ message: 'Relevamiento actualizado!' });
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

// GET /relevamiento/:relevamientoId
// Toma un relevamiento por id
router.get('/:relevamientoId', function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.retrieveById(req.params.relevamientoId, function (relevamiento) {
    if (relevamiento) {
      res.json(relevamiento);
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

// DELETE /relevamiento/relevamientoId
// Borra el relevamientoId
router.delete('/:relevamientoId', function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.removeById(req.params.relevamientoId, function (relevamiento) {
    if (relevamiento) {
      res.json({ message: 'Relevamiento borrado!' });
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
});

module.exports = router;
