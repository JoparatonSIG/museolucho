'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /lugares
// router.route('/lugar') */

// POST /lugares
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var email = req.body.email;
  var nombre = req.body.nombre;
  var password = req.body.password;

  var lugar = Museo.Lugar.build({ email: email, password: password });

  lugar.add(function (success) {
    res.json({ message: 'Lugar creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los lugares)
// GET /lugar */
router.get('/', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.retrieveAll(function (lugares) {
    if (lugares) {
      res.json(lugares);
    } else {
      res.send(401, 'No se encontraron Lugares');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

/* Rutas que terminan en /lugares/:lugaresId
// router.route('/lugar/:lugarId')
// PUT /lugares/:lugarId
// Actualiza lugar */

router.put('/:lugarId', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.email = req.body.email;
  lugar.nombre = req.body.nombre;
  lugar.password = req.body.password;

  lugar.updateById(req.params.lugarId, function (success) {
    if (success) {
      res.json({ message: 'Lugar actualizado!' });
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

// GET /lugar/:lugarId
// Toma un lugar por id
router.get('/:lugarId', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.retrieveById(req.params.lugarId, function (lugar) {
    if (lugar) {
      res.json(lugar);
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

// DELETE /lugar/lugarId
// Borra el lugarId
router.delete('/:lugarId', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.removeById(req.params.lugarId, function (lugar) {
    if (lugar) {
      res.json({ message: 'Lugar borrado!' });
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

module.exports = router;
