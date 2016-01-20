'use strict';

// ACCESORIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/model');

/* Rutas que terminan en /analisiss
// router.route('/analisis') */

// POST /analisiss
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var analisisreq = req.body.analisis;

  var analisis = Museo.Analisis.build({ analisis: analisisreq });

  analisis.add(function (success) {
    res.json({ message: 'Analisis creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los analisiss)
// GET /analisis */
router.get('/', function (req, res) {
  var analisis = Museo.Analisis.build();

  analisis.retrieveAll(function (analisis) {
    if (analisis) {
      res.json(analisis);
    } else {
      res.send(401, 'No se encontraron Analisis');
    }
  }, function (error) {
    res.send('Analisis no encontrado');
  });
});

/* Rutas que terminan en /analisis/:analisisId
// router.route('/analisis/:analisisId')
// PUT /analisis/:analisisId
// Actualiza analisis */

router.put('/:analisisId', function (req, res) {
  var analisis = Museo.Analisis.build();

  analisis.analisis = req.body.analisis;

  analisis.updateById(req.params.analisisId, function (success) {
    if (success) {
      res.json({ message: 'Analisis actualizado!' });
    } else {
      res.send(401, 'Analisis no encontrado');
    }
  }, function (error) {
    res.send('Analisis no encontrado');
  });
});

// GET /analisis/:analisisId
// Toma un analisis por id
router.get('/:analisisId', function (req, res) {
  var analisis = Museo.Analisis.build();

  analisis.retrieveById(req.params.analisisId, function (analisis) {
    if (analisis) {
      res.json(analisis);
    } else {
      res.send(401, 'Analisis no encontrado');
    }
  }, function (error) {
    res.send('Analisis no encontrado');
  });
});

// DELETE /analisis/analisisId
// Borra el analisisId
router.delete('/:analisisId', function (req, res) {
  var analisis = Museo.Analisis.build();

  analisis.removeById(req.params.analisisId, function (analisis) {
    if (analisis) {
      res.json({ message: 'Analisis borrado!' });
    } else {
      res.send(401, 'Analisis no encontrado');
    }
  }, function (error) {
    res.send('Analisis no encontrado');
  });
});

module.exports = router;
