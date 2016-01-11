'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /especialidads
// router.route('/especialidad') */

// POST /especialidads
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var especialidadreq = req.body.especialidad;

  var especialidad = Museo.Especialidad.build({
    especialidad: especialidadreq
  });

  especialidad.add(function (success) {
    res.json({ message: 'Especialidad creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los especialidads)
// GET /especialidad */
router.get('/', function (req, res) {
  var especialidad = Museo.Especialidad.build();

  especialidad.retrieveAll(function (especialidades) {
    if (especialidades) {
      res.json(especialidads);
    } else {
      res.send(401, 'No se encontraron Especialidads');
    }
  }, function (error) {
    res.send('Especialidad no encontrado');
  });
});

/* Rutas que terminan en /especialidads/:especialidadsId
// router.route('/especialidad/:especialidadId')
// PUT /especialidads/:especialidadId
// Actualiza especialidad */

router.put('/:especialidadId', function (req, res) {
  var especialidad = Museo.Especialidad.build();

  especialidad.especialidad = req.body.especialidad;

  especialidad.updateById(req.params.especialidadId, function (success) {
    if (success) {
      res.json({ message: 'Especialidad actualizado!' });
    } else {
      res.send(401, 'Especialidad no encontrado');
    }
  }, function (error) {
    res.send('Especialidad no encontrado');
  });
});

// GET /especialidad/:especialidadId
// Toma un especialidad por id
router.get('/:especialidadId', function (req, res) {
  var especialidad = Museo.Especialidad.build();

  especialidad.retrieveById(req.params.especialidadId, function (especialidad) {
    if (especialidad) {
      res.json(especialidad);
    } else {
      res.send(401, 'Especialidad no encontrado');
    }
  }, function (error) {
    res.send('Especialidad no encontrado');
  });
});

// DELETE /especialidad/especialidadId
// Borra el especialidadId
router.delete('/:especialidadId', function (req, res) {
  var especialidad = Museo.Especialidad.build();

  especialidad.removeById(req.params.especialidadId, function (especialidad) {
    if (especialidad) {
      res.json({ message: 'Especialidad borrado!' });
    } else {
      res.send(401, 'Especialidad no encontrado');
    }
  }, function (error) {
    res.send('Especialidad no encontrado');
  });
});

module.exports = router;
