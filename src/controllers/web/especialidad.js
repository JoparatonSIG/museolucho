'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

// Rutas que terminan en /especialidad
// POST /especialidad
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var especialidad = req.body.especialidad;

  var especialidad = Model.Especialdad.build({
    especialidad: especialidad
  });

  especialidad.add(function (success) {
    res.render( 'web/especialidad/list',{ message: 'Especialdiad creada!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todas las especialidades)
// GET /especialidad
router.get('/', function (req, res) {
  var especialidad = Model.Especialidad.build();

  especialidad.retrieveAll(function (especialidades) {
    if (especialidades) {
      res.render('web/especialidad/list.ejs', { especialidades: especialidades});
    } else {
      res.send(401, 'No se encontraron Especialidades');
    }
  }, function (error) {
    res.send('Especialidad no encontrada');
  });
});
// Rutas que terminan en /especialidad/:especialidadId
// PUT /especialidad/:especialidadId
// Actualiza especialidad
router.put('/:especialidadId', function (req, res) {
  var especialidad = Model.Especialidad.build();
  console.log('ingresa al put');

  especialidad.especialidad = req.body.especialidad;
  console.log('ingresa al put: pre update');

  especialidad.updateById(req.params.especialidadId, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/especialidad');
    } else {
      res.send(401, 'Especialidad no encontrada');
    }
  }, function (error) {
    res.send('Especialidad no encontrada');
  });
});
// GET /especialidad/:especialidadId
// Toma un especialidad por id
router.get('/:especialidadId', function (req, res) {
  var especialidad = Model.Especialidad.build();

  especialidad.retrieveById(req.params.especialidadId, function (especialidadq) {
    if (especialidadq) {
      res.render('web/especialidad/edit', {especialidad:especialidadq});
    } else {
      res.send(401, 'Especialidad no encontrada');
    }
  }, function (error) {
    res.send('Especialidad no encontrada');
  });
});
// DELETE /especialidad/especialidadId
// Borra el especialidadId
router.delete('/:especialidadId', function (req, res) {
  var especialidad = Model.Especialidad.build();

  especialidad.removeById(req.params.especialidadId, function (especialidad) {
    if (especialidad) {
      res.json({ message: 'Especialidad borrada!' });
    } else {
      res.send(401, 'Especialidad no encontrada');
    }
  }, function (error) {
    res.send('Especialidad no encontrada');
  });
});

module.exports = router;
