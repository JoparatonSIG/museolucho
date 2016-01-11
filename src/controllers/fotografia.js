'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /fotografias
// router.route('/fotografia') */

// POST /fotografias
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var email = req.body.email;
  var nombre = req.body.nombre;
  var password = req.body.password;

  var fotografia = Museo.Fotografia.build({ email: email, password: password });

  fotografia.add(function (success) {
    res.json({ message: 'Fotografia creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los fotografias)
// GET /fotografia */
router.get('/', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.retrieveAll(function (fotografias) {
    if (fotografias) {
      res.json(fotografias);
    } else {
      res.status(401).send('No se encontraron Fotografias');
    }
  }, function (error) {
    res.send('Fotografia no encontrado');
  });
});

/* Rutas que terminan en /fotografias/:fotografiasId
// router.route('/fotografia/:fotografiaId')
// PUT /fotografias/:fotografiaId
// Actualiza fotografia */

router.put('/:fotografiaId', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.email = req.body.email;
  fotografia.nombre = req.body.nombre;
  fotografia.password = req.body.password;

  fotografia.updateById(req.params.fotografiaId, function (success) {
    if (success) {
      res.json({ message: 'Fotografia actualizado!' });
    } else {
      res.send(401, 'Fotografia no encontrado');
    }
  }, function (error) {
    res.send('Fotografia no encontrado');
  });
});

// GET /fotografia/:fotografiaId
// Toma un fotografia por id
router.get('/:fotografiaId', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.retrieveById(req.params.fotografiaId, function (fotografia) {
    if (fotografia) {
      res.json(fotografia);
    } else {
      res.status(401).send('Fotografia no encontrada');
    }
  }, function (error) {
    res.send('Fotografia no encontrado');
  });
});

// DELETE /fotografia/fotografiaId
// Borra el fotografiaId
router.delete('/:fotografiaId', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.removeById(req.params.fotografiaId, function (fotografia) {
    if (fotografia) {
      res.json({ message: 'Fotografia borrado!' });
    } else {
      res.send(401, 'Fotografia no encontrado');
    }
  }, function (error) {
    res.send('Fotografia no encontrado');
  });
});

module.exports = router;
