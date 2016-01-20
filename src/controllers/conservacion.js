'use strict';

// ACCESORIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/model');

/* Rutas que terminan en /conservacions
// router.route('/conservacion') */

// POST /conservacions
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var conservacionreq = req.body.conservacion;
  var condicionesSeguridad = req.body.condicionesSeguridad;

  var conservacion = Museo.Conservacion.build({
    conservacion: conservacionreq, condicionesSeguridad: condicionesSeguridad
  });

  conservacion.add(function (success) {
    res.json({ message: 'Conservacion creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los conservacions)
// GET /conservacion */
router.get('/', function (req, res) {
  var conservacion = Museo.Conservacion.build();

  conservacion.retrieveAll(function (conservacion) {
    if (conservacion) {
      res.json(conservacion);
    } else {
      res.send(401, 'No se encontraron Conservacion');
    }
  }, function (error) {
    res.send('Conservacion no encontrado');
  });
});

/* Rutas que terminan en /conservacion/:conservacionId
// router.route('/conservacion/:conservacionId')
// PUT /conservacion/:conservacionId
// Actualiza conservacion */

router.put('/:conservacionId', function (req, res) {
  var conservacion = Museo.Conservacion.build();

  conservacion.conservacion = req.body.conservacion;
  conservacion.condicionesSeguridad = req.body.condicionesSeguridad;

  conservacion.updateById(req.params.conservacionId, function (success) {
    if (success) {
      res.json({ message: 'Conservacion actualizado!' });
    } else {
      res.send(401, 'Conservacion no encontrado');
    }
  }, function (error) {
    res.send('Conservacion no encontrado');
  });
});

// GET /conservacion/:conservacionId
// Toma un conservacion por id
router.get('/:conservacionId', function (req, res) {
  var conservacion = Museo.Conservacion.build();

  conservacion.retrieveById(req.params.conservacionId, function (conservacion) {
    if (conservacion) {
      res.json(conservacion);
    } else {
      res.send(401, 'Conservacion no encontrado');
    }
  }, function (error) {
    res.send('Conservacion no encontrado');
  });
});

// DELETE /conservacion/conservacionId
// Borra el conservacionId
router.delete('/:conservacionId', function (req, res) {
  var conservacion = Museo.Conservacion.build();

  conservacion.removeById(req.params.conservacionId, function (conservacion) {
    if (conservacion) {
      res.json({ message: 'Conservacion borrado!' });
    } else {
      res.send(401, 'Conservacion no encontrado');
    }
  }, function (error) {
    res.send('Conservacion no encontrado');
  });
});

module.exports = router;
