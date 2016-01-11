'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /ubicacion
// router.route('/ubicacion') */

// POST /ubicacion
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var espacio = req.body.espacio;
  var inmueble = req.body.inmueble;
  var propietario = req.body.propietario;

  var ubicacion = Museo.Ubicacion.build({
    espacio: espacio,
    inmueble: inmueble,
    propietario: propietario
  });

  ubicacion.add(function (success) {
    res.json({ message: 'Ubicacion creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los ubicacion)
// GET /ubicacion */
router.get('/', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.retrieveAll(function (ubicaciones) {
    if (ubicaciones) {
      res.json(ubicaciones);
    } else {
      res.send(401, 'No se encontraron Ubicacion');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
});

/* Rutas que terminan en /ubicacion/:ubicacionId
// router.route('/ubicacion/:ubicacionId')
// PUT /ubicacion/:ubicacionId
// Actualiza ubicacion */

router.put('/:ubicacionId', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.espacio = req.body.espacio;
  ubicacion.inmueble = req.body.inmueble;
  ubicacion.propietario = req.body.propietario;

  ubicacion.updateById(req.params.ubicacionId, function (success) {
    if (success) {
      res.json({ message: 'Ubicacion actualizado!' });
    } else {
      res.send(401, 'Ubicacion no encontrado');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
});

// GET /ubicacion/:ubicacionId
// Toma un ubicacion por id
router.get('/:ubicacionId', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.retrieveById(req.params.ubicacionId, function (ubicacion) {
    if (ubicacion) {
      res.json(ubicacion);
    } else {
      res.send(401, 'Ubicacion no encontrado');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
});

// DELETE /ubicacion/ubicacionId
// Borra el ubicacionId
router.delete('/:ubicacionId', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.removeById(req.params.ubicacionId, function (ubicacion) {
    if (ubicacion) {
      res.json({ message: 'Ubicacion borrado!' });
    } else {
      res.send(401, 'Ubicacion no encontrado');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
});

module.exports = router;
