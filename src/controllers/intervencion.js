'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /intervencion
// router.route('/intervencion') */

// POST /usuarios

router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var metodologia = req.body.metodologia;
  var fechaRestauracion = req.body.fechaRestauracion;
  var apellidoRestaurador = req.body.apellidoRestaurador;
  var descripcion = req.body.descripcion;

  var usuario = Museo.Intervencion.build({ metodologia: metodologia, fechaRestauracion: fechaRestauracion, descripcion: descripcion });

  intervencion.add(function (success) {
    res.json({ message: 'Intervencion creada!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos las intervenciones)
// GET /intervencion */

router.get('/', function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.retrieveAll(function (intervenciones) {
    if (intervenciones) {
      res.json(intervenciones);
    } else {
      res.send(401, 'No se encontraron Intervenciones');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
});

/* Rutas que terminan en /intervenciones/:IntervencionesId
// router.route('/intervenciones/:intervencioneId')
// PUT /intervenciones/:intervencioneId
// Actualiza intervencion */

router.put('/:intervencionId', function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.metodologia = req.body.metodologia;
  intervencion.fechaRestauracion = req.body.fechaRestauracion;
  intervencion.apellidoRestaurador = req.body.apellidoRestaurador;
  intervencion.descripcion = req.body.descripcion;

  intervencion.updateById(req.params.intervencionId, function (success) {
    if (success) {
      res.json({ message: 'Intervencion actualizada!' });
    } else {
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
});

// GET /intervencion/:intervencionId
// Toma un intervencion por id
router.get('/:intervencionId', function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.retrieveById(req.params.intervencionId, function (usuario) {
    if (intervencion) {
      res.json(intervencion);
    } else {
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
});

// DELETE /intervencion/intervencionId
// Borra el intervencionId
router.delete('/:intervencionId', function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.removeById(req.params.intervencionId, function (usuario) {
    if (intervencion) {
      res.json({ message: 'Intervencion borrada!' });
    } else {
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
});

module.exports = router;
