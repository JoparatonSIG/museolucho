'use strict';

// ACCESORIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo');

/* Rutas que terminan en /adquisiciones
// router.route('/adquisicion') */

// POST /adquisiciones
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var tipoAdquisicion = req.body.tipoAdquisicion;
  var tipoCompra = req.body.tipoCompra;

  var adquisicion = Museo.Adquisicion.build({
    tipoAdquisicion: tipoAdquisicion,
    tipoCompra: tipoCompra

  });

  adquisicion.add(function (success) {
    res.json({ message: 'Adquisicion creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los adquisiciones)
// GET /adquisicion */
router.get('/', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.retrieveAll(function (adquisiciones) {
    if (adquisiciones) {
      res.json(adquisiciones);
    } else {
      res.send(401, 'No se encontraron Adquisiciones');
    }
  }, function (error) {
    res.send('Adquisicion no encontrado');
  });
});

/* Rutas que terminan en /adquisiciones/:adquisicionesId
// router.route('/adquisicion/:adquisicionId')
// PUT /adquisiciones/:adquisicionId
// Actualiza adquisicion */

router.put('/:adquisicionId', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.tipoAdquisicion = req.body.tipoAdquisicion;
  adquisicion.tipoCompra = req.body.tipoCompra;
  adquisicion.updateById(req.params.adquisicionId, function (success) {
    if (success) {
      res.json({ message: 'Adquisicion actualizado!' });
    } else {
      res.send(401, 'Adquisicion no encontrado');
    }
  }, function (error) {
    res.send('Adquisicion no encontrado');
  });
});

// GET /adquisicion/:adquisicionId
// Toma un adquisicion por id
router.get('/:adquisicionId', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.retrieveById(req.params.adquisicionId, function (adquisicion) {
    if (adquisicion) {
      res.json(adquisicion);
    } else {
      res.send(401, 'Adquisicion no encontrado');
    }
  }, function (error) {
    res.send('Adquisicion no encontrado');
  });
});

// DELETE /adquisicion/adquisicionId
// Borra el adquisicionId
router.delete('/:adquisicionId', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.removeById(req.params.adquisicionId, function (adquisicion) {
    if (adquisicion) {
      res.json({ message: 'Adquisicion borrado!' });
    } else {
      res.send(401, 'Adquisicion no encontrado');
    }
  }, function (error) {
    res.send('Adquisicion no encontrado');
  });
});

module.exports = router;
