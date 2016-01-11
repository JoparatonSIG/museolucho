'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /tecnicaArtes
// router.route('/tecnicaArte') */

// POST /tecnicaArtes
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var tecnicaArtereq = req.body.tecnicaArte;

  var tecnicaArte = Museo.TecnicaArte.build({
    tecnicaArte: tecnicaArtereq
  });

  tecnicaArte.add(function (success) {
    res.json({ message: 'TecnicaArte creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los tecnicaArtes)
// GET /tecnicaArte */
router.get('/', function (req, res) {
  var tecnicaArte = Museo.TecnicasArte.build();

  tecnicaArte.retrieveAll(function (tecnicaArtes) {
    if (tecnicaArtes) {
      res.json(tecnicaArtes);
    } else {
      res.send(401, 'No se encontraron TecnicaArtes');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
});

/* Rutas que terminan en /tecnicaArtes/:tecnicaArtesId
// router.route('/tecnicaArte/:tecnicaArteId')
// PUT /tecnicaArtes/:tecnicaArteId
// Actualiza tecnicaArte */

router.put('/:tecnicaArteId', function (req, res) {
  var tecnicaArte = Museo.TecnicaArte.build();

  tecnicaArte.tecnicaArte = req.body.tecnicaArte;

  tecnicaArte.updateById(req.params.tecnicaArteId, function (success) {
    if (success) {
      res.json({ message: 'TecnicaArte actualizado!' });
    } else {
      res.send(401, 'TecnicaArte no encontrado');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
});

// GET /tecnicaArte/:tecnicaArteId
// Toma un tecnicaArte por id
router.get('/:tecnicaArteId', function (req, res) {
  var tecnicaArte = Museo.TecnicasArte.build();

  tecnicaArte.retrieveById(req.params.tecnicaArteId, function (tecnicaArte) {
    if (tecnicaArte) {
      res.json(tecnicaArte);
    } else {
      res.send(401, 'TecnicaArte no encontrado');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
});

// DELETE /tecnicaArte/tecnicaArteId
// Borra el tecnicaArteId
router.delete('/:tecnicaArteId', function (req, res) {
  var tecnicaArte = Museo.TecnicaArte.build();

  tecnicaArte.removeById(req.params.tecnicaArteId, function (tecnicaArte) {
    if (tecnicaArte) {
      res.json({ message: 'TecnicaArte borrado!' });
    } else {
      res.send(401, 'TecnicaArte no encontrado');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
});

module.exports = router;
