'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

// (trae todos las ubicaciones)
// GET /ubicacion
router.get('/add', function (req, res) {
  var ubicacion = Model.Ubicacion.build();
  res.render('web/ubicacion/add', { ubicacion: ubicacion});
});

// Rutas que terminan en /ubicacion
// POST /ubicacion
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var espacio = req.body.espacio;
  var inmueble = req.body.inmueble;
  var propietario = req.body.propietario;

  var ubicacion = Model.Ubicacion.build({
    espacio: espacio,
    inmueble: inmueble,
    propietario:propietario
  });

  ubicacion.add(function (success) {
    res.redirect( '/');
  },
  function (err) {
    res.redirect( '/');
    // res.send(err);
  });
});
// (trae todos los ubicaciones)
// GET /ubicacion
router.get('/', function (req, res) {
  var ubicacion = Model.Ubicacion.build();

  ubicacion.retrieveAll(function (ubicaciones) {
    if (ubicaciones) {
      res.render('web/ubicacion/list', { ubicaciones: ubicaciones});
    } else {
      res.send(401, 'No se encontraron ubicaciones');
    }
  }, function (error) {
    res.send('Ubicacion no encontrada');
  });
});
// Rutas que terminan en /ubicacion/:ubicacionId
// PUT /ubicacion/:ubicacionId
// Actualiza ubicacion
router.put('/:ubicacionId', function (req, res) {
  var ubicacion = Model.Ubicacion.build();
  ubicacion.id = req.body.id;
  ubicacion.espacio = req.body.espacio;
  ubicacion.inmueble = req.body.inmueble;
  ubicacion.propietario = req.body.propietario;

  ubicacion.updateById(ubicacion.id,  function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/ubicacion');
    } else {
      console.log(success);
      res.send(401, 'Ubicacion no encontrada');
    }
  }, function (error) {
    console.log(error);
    res.send('Ubicacion no encontrada');
  });
});
// GET /ubicacion/:ubicacionId
// Toma un ubicacion por id
router.get('/:ubicacionId', function (req, res) {
  var ubicacion = Model.Ubicacion.build();

  ubicacion.retrieveById(req.params.ubicacionId, function (ubicacionq) {
    if (ubicacionq) {
      res.render('web/ubicacion/edit', {ubicacion:ubicacionq});
    } else {
      res.send(401, 'Ubicacion no encontrada');
    }
  }, function (error) {
    res.send('Ubicacion no encontrada');
  });
});
// DELETE /ubicacion/ubicacionId
// Borra el ubicacionId
router.delete('/:ubicacionId', function (req, res) {
  var ubicacion = Model.Ubicacion.build();
  console.log(req.params);
  ubicacion.removeById(req.params.ubicacionId, function (ubicacion) {
    if (ubicacion) {
      res.redirect('/web/ubicacion');
    } else {
      res.send(401, 'Ubicacion no encontrada');
    }
  }, function (error) {
    res.send('Ubicacion no encontrada');
  });
});

module.exports = router;
