'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /tecnicass
// router.route('/tecnicas') */

// POST /tecnicass
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var tecnicareq = req.body.tecnica;

  var tecnicas = Museo.Tecnicas.build({
    tecnicareq: tecnicareq
  });

  tecnicas.add(function (success) {
    res.json({ message: 'Tecnicas creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los tecnicass)
// GET /tecnicas */
router.get('/', function (req, res) {
  var tecnicas = Museo.Tecnicas.build();

  tecnicas.retrieveAll(function (tecnicass) {
    if (tecnicass) {
      res.json(tecnicass);
    } else {
      res.send(401, 'No se encontraron Tecnicass');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
});

/* Rutas que terminan en /tecnicass/:tecnicassId
// router.route('/tecnicas/:tecnicasId')
// PUT /tecnicass/:tecnicasId
// Actualiza tecnicas */

router.put('/:tecnicasId', function (req, res) {
  var tecnicas = Museo.Tecnicas.build();

  tecnicas.tecnica = req.body.tecnica;

  tecnicas.updateById(req.params.tecnicasId, function (success) {
    if (success) {
      res.json({ message: 'Tecnicas actualizado!' });
    } else {
      res.send(401, 'Tecnicas no encontrado');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
});

// GET /tecnicas/:tecnicasId
// Toma un tecnicas por id
router.get('/:tecnicasId', function (req, res) {
  var tecnicas = Museo.Tecnicas.build();

  tecnicas.retrieveById(req.params.tecnicasId, function (tecnicas) {
    if (tecnicas) {
      res.json(tecnicas);
    } else {
      res.send(401, 'Tecnicas no encontrado');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
});

// DELETE /tecnicas/tecnicasId
// Borra el tecnicasId
router.delete('/:tecnicasId', function (req, res) {
  var tecnicas = Museo.Tecnicas.build();

  tecnicas.removeById(req.params.tecnicasId, function (tecnicas) {
    if (tecnicas) {
      res.json({ message: 'Tecnicas borrado!' });
    } else {
      res.send(401, 'Tecnicas no encontrado');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
});

module.exports = router;
