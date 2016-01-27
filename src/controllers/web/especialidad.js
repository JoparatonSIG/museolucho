'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

// (para agregar un nuevo especialidad)
// GET /especialidad
router.get('/add', function (req, res) {
  var especialidad = Model.Especialidad.build();
  res.render('web/especialidad/add', { especialidad: especialidad});
});

// Rutas que terminan en /especialidad
// POST /especialidad
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var especialidad = req.body.especialidad;

  var especialidad = Model.Especialidad.build({
    especialidad: especialidad
  });

  especialidad.add(function (success) {
    res.redirect( '/web/especialidad');
  },
  function (err) {
    res.redirect( '/web/especialidad');
    // res.send(err);
  });
});

// (trae todas las especialidades)
// GET /especialidades
router.get('/', function (req, res) {
  var especialidad = Model.Especialidad.build();

  var limitPage = 10;
  if (currentPage == null ) {
    var currentPage = 1;
    var initial = 0;
    var offset = initial+limitPage;
  } else {
    var currentPage = req.params.currentPage;
    var initial = currentPage*limitPage;
    var offset = initial+limitPage;
  }

  especialidad.retrievePag(initial, offset, limitPage, currentPage, function (especialidad) {
    if (especialidad) {
      var totalPage = especialidad.count/limitPage;
      var count = especialidad.count
      res.render('web/especialidad/list.ejs', {
        especialidades: especialidad.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });


    } else {
      res.send(401, 'No se encontraron Especialidades');
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
      res.redirect( '/web/especialidad');
    } else {
      res.send(401, 'Especialidad no encontrada');
    }
  }, function (error) {
    res.send('Especialidad no encontrada');
  });
});

module.exports = router;
