'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/model');

/* Rutas que terminan en /descripciones
// router.route('/descripcion') */

// POST /descripciones
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var marcasInscripciones = req.body.marcasInscripciones;
  var alto = req.body.alto;
  var ancho = req.body.ancho;
  var longitud = req.body.longitud;
  var profundidad = req.body.profundidad;
  var diametro = req.body.diametro;
  var espesor = req.body.espesor;
  var peso = req.body.peso;
  var observaciones = req.body.observaciones;
  var descripcionreq = req.body.descripcion;

  var descripcion = Museo.Descripcion.build({
    marcasInscripciones: marcasInscripciones,
    alto: alto,
    ancho: ancho,
    longitud: longitud,
    profundidad: profundidad,
    diametro: diametro,
    espesor: espesor,
    peso: peso,
    observaciones: observaciones,
    descripcion: descripcionreq
  });

  descripcion.add(function (success) {
    res.json({ message: 'Descripcion creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los descripciones)
// GET /descripcion */
router.get('/', function (req, res) {
  var descripcion = Museo.Descripcion.build();

  descripcion.retrieveAll(function (descripciones) {
    if (descripciones) {
      res.json(descripciones);
    } else {
      res.send(401, 'No se encontraron Descripciones');
    }
  }, function (error) {
    res.send('Descripcion no encontrado');
  });
});

/* Rutas que terminan en /descripciones/:descripcionesId
// router.route('/descripcion/:descripcionId')
// PUT /descripciones/:descripcionId
// Actualiza descripcion */

router.put('/:descripcionId', function (req, res) {
  var descripcion = Museo.Descripcion.build();

  descripcion.marcasInscripciones = req.body.marcasInscripciones;
  descripcion.alto = req.body.alto;
  descripcion.ancho = req.body.ancho;
  descripcion.longitud = req.body.longitud;
  descripcion.profundidad = req.body.profundidad;
  descripcion.diametro = req.body.diametro;
  descripcion.espesor = req.body.espesor;
  descripcion.peso = req.body.peso;
  descripcion.observaciones = req.body.observaciones;
  descripcion.descripcion = req.body.descripcion;

  descripcion.updateById(req.params.descripcionId, function (success) {
    if (success) {
      res.json({ message: 'Descripcion actualizado!' });
    } else {
      res.send(401, 'Descripcion no encontrado');
    }
  }, function (error) {
    res.send('Descripcion no encontrado');
  });
});

// GET /descripcion/:descripcionId
// Toma un descripcion por id
router.get('/:descripcionId', function (req, res) {
  var descripcion = Museo.Descripcion.build();

  descripcion.retrieveById(req.params.descripcionId, function (descripcion) {
    if (descripcion) {
      res.json(descripcion);
    } else {
      res.send(401, 'Descripcion no encontrado');
    }
  }, function (error) {
    res.send('Descripcion no encontrado');
  });
});

// DELETE /descripcion/descripcionId
// Borra el descripcionId
router.delete('/:descripcionId', function (req, res) {
  var descripcion = Museo.Descripcion.build();

  descripcion.removeById(req.params.descripcionId, function (descripcion) {
    if (descripcion) {
      res.json({ message: 'Descripcion borrado!' });
    } else {
      res.send(401, 'Descripcion no encontrado');
    }
  }, function (error) {
    res.send('Descripcion no encontrado');
  });
});

module.exports = router;
