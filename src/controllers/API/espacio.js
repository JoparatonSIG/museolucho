'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

/* Rutas que terminan en /espacios
// router.route('/espacio') */

// POST /espacios
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var espacioreq = req.body.espacio;
  var codigoEspacio = req.body.codigoEspacio;
  var inmuebles = req.body.inmuebles;
  var codigoInmueble = req.body.codigoInmueble;
  var ubicacionInmueble = req.body.ubicacionInmueble;

  var espacio = Museo.Espacio.build({
    espacio: espacioreq,
    codigoEspacio: codigoEspacio,
    inmuebles: inmuebles,
    codigoInmueble: codigoInmueble,
    ubicacionInmueble: ubicacionInmueble
  });

  espacio.add(function (success) {
    res.json({ message: 'Espacio creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los espacios)
// GET /espacio */
router.get('/', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.retrieveAll(function (espacios) {
    if (espacios) {
      res.json(espacios);
    } else {
      res.send(401, 'No se encontraron Espacios');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});

/* Rutas que terminan en /espacios/:espaciosId
// router.route('/espacio/:espacioId')
// PUT /espacios/:espacioId
// Actualiza espacio */

router.put('/:espacioId', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.espacio = req.body.espacio;
  espacio.codigoEspacio = req.body.codigoEspacio;
  espacio.inmuebles = req.body.inmuebles;
  espacio.codigoInmueble = req.body.codigoInmueble;
  espacio.ubicacionInmueble = req.body.ubicacionInmueble;

  espacio.updateById(req.params.espacioId, function (success) {
    if (success) {
      res.json({ message: 'Espacio actualizado!' });
    } else {
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});

// GET /espacio/:espacioId
// Toma un espacio por id
router.get('/:espacioId', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.retrieveById(req.params.espacioId, function (espacio) {
    if (espacio) {
      res.json(espacio);
    } else {
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});

// DELETE /espacio/espacioId
// Borra el espacioId
router.delete('/:espacioId', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.removeById(req.params.espacioId, function (espacio) {
    if (espacio) {
      res.json({ message: 'Espacio borrado!' });
    } else {
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});

module.exports = router;
