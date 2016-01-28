'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');


// (para agregar un nuevo conservacion)
// GET /conservacion
router.get('/add', function (req, res) {
  var conservacion = Model.Conservacion.build();
  res.render('web/conservacion/add', { conservacion: conservacion});
});

// Rutas que terminan en /conservacion
// POST /conservacion
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var conservacion = req.body.conservacion;
  var condicionesSeguridad = req.body.condicionesSeguridad;

  var conservacion = Model.Conservacion.build({
    conservacion: conservacion,
   condicionesSeguridad: condicionesSeguridad
  });

  conservacion.add(function (success) {
    res.redirect( '/web/conservacion');
  },
  function (err) {
    res.redirect( '/web/conservacion');
    // res.send(err);
  });
});
// (trae todos los conservacion)
// GET /conservacion
router.get('/', function (req, res) {
  var conservacion = Model.Conservacion.build();
  console.log('GET Paginado pre Select');

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

  conservacion.retrievePag(initial, offset, limitPage, currentPage, function (conservacion) {
    if (conservacion) {
      var totalPage = conservacion.count/limitPage;
      var count = conservacion.count
      res.render('web/conservacion/list.ejs', {
        conservaciones: conservacion.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    } else {
      res.send(401, 'No se encontraron Conservaciones');
    }
  }, function (error) {
    console.log(error);
    res.send('Conservacion no encontrado');
  });
});
// Rutas que terminan en /conservacion/:conservacionId
// PUT /conservacion/:conservacionId
// Actualiza conservacion
router.put('/:conservacionId', function (req, res) {
  var conservacion = Model.Conservacion.build();
  conservacion.id = req.body.id;
  conservacion.conservacion = req.body.conservacion;
  conservacion.condicionesSeguridad = req.body.condicionesSeguridad;

  conservacion.updateById(conservacion.id,  function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/conservacion');
    } else {
      console.log(success);
      res.send(401, 'Conservacion no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Conservacion no encontrado');
  });
});
// GET /conservacion/:conservacionId
// Toma un conservacion por id
router.get('/:conservacionId', function (req, res) {
  var conservacion = Model.Conservacion.build();

  conservacion.retrieveById(req.params.conservacionId, function (conservacionq) {
    if (conservacionq) {
      res.render('web/conservacion/edit', {conservacion:conservacionq});
    } else {
      res.send(401, 'Conservacion no encontrado');
    }
  }, function (error) {
    res.send('Conservacion no encontrado');
  });
});
// DELETE /conservacion/conservacionId
// Borra el conservacionId
router.delete('/:conservacionId', function (req, res) {
  var conservacion = Model.Conservacion.build();

  conservacion.removeById(req.params.conservacionId, function (conservacion) {
    if (conservacion) {
      res.redirect( '/web/conservacion');
    } else {
      res.send(401, 'Conservacion no encontrado');
    }
  }, function (error) {
    res.send('Conservacion no encontrado');
  });
});

module.exports = router;