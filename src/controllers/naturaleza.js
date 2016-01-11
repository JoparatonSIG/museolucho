'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /naturalezaes
// router.route('/naturaleza') */

// POST /naturalezaes
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var naturalezareq = req.body.naturaleza;
  var codigoNaturaleza = req.body.codigoNaturaleza;

  var naturaleza = Museo.Naturaleza.build({
    naturaleza: naturalezareq,
    codigoNaturaleza: codigoNaturaleza
  });

  naturaleza.add(function (success) {
    res.json({ message: 'Naturaleza creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los naturalezaes)
// GET /naturaleza */
router.get('/', function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.retrieveAll(function (naturalezaes) {
    if (naturalezaes) {
      res.json(naturalezaes);
    } else {
      res.send(401, 'No se encontraron Naturalezaes');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
});

/* Rutas que terminan en /naturalezaes/:naturalezaesId
// router.route('/naturaleza/:naturalezaId')
// PUT /naturalezaes/:naturalezaId
// Actualiza naturaleza */

router.put('/:naturalezaId', function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.naturaleza = req.body.naturaleza;
  naturaleza.codigoNaturaleza = req.body.codigoNaturaleza;

  naturaleza.updateById(req.params.naturalezaId, function (success) {
    if (success) {
      res.json({ message: 'Naturaleza actualizado!' });
    } else {
      res.send(401, 'Naturaleza no encontrado');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
});

// GET /naturaleza/:naturalezaId
// Toma un naturaleza por id
router.get('/:naturalezaId', function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.retrieveById(req.params.naturalezaId, function (naturaleza) {
    if (naturaleza) {
      res.json(naturaleza);
    } else {
      res.send(401, 'Naturaleza no encontrado');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
});

// DELETE /naturaleza/naturalezaId
// Borra el naturalezaId
router.delete('/:naturalezaId', function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.removeById(req.params.naturalezaId, function (naturaleza) {
    if (naturaleza) {
      res.json({ message: 'Naturaleza borrado!' });
    } else {
      res.send(401, 'Naturaleza no encontrado');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
});

module.exports = router;
