'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');


router.get('/add', function (req, res) {
  var adquisicion = Model.Adquisicion.build();
  res.render('web/adquisicion/add', { adquisicion: adquisicion });
});

// Rutas que terminan en /adquisicion
// POST /adquisicion
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var tipoAdquisicion = req.body.tipoAdquisicion;
  var tipoCompra = req.body.tipoCompra;
  var fecha = req.body.fecha;

  var adquisicion = Model.Adquisicion.build({
    tipoAdquisicion: tipoAdquisicion,
    tipoCompra: tipoCompra,
    fecha: fecha
  });

  adquisicion.add(function (success) {
    res.redirect('/web/adquisicion');
  },
  function (err) {
    //res.redirect('/web/adquisicion');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  //  res.send('Adquisicion no encontrada');
  });
});
// (trae todas las adquisiciones)
// GET /adquisiciones
router.get('/', function (req, res) {
  var adquisicion = Model.Adquisicion.build();

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

  adquisicion.retrievePag(initial, offset, limitPage, currentPage, function (adquisicion) {
    if (adquisicion) {
      var totalPage = adquisicion.count/limitPage;
      var count = adquisicion.count
      res.render('web/adquisicion/list.ejs', {
        adquisiciones: adquisicion.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });


    } else {
      res.send(401, 'No se encontraron Adquisiciones');
    }
  }, function (error) {
    res.send('Adquisicion no encontrada');
  });
});
// Rutas que terminan en /adquisicion/:adquisicionId
// PUT /adquisicion/:adquisicionId
// Actualiza adquisicion
router.put('/:adquisicionId', function (req, res) {
  var adquisicion = Model.Adquisicion.build();
  console.log('ingresa al put');
  adquisicion.id = req.body.id;
  adquisicion.tipoAdquisicion = req.body.tipoAdquisicion;
  adquisicion.tipoCompra = req.body.tipoCompra;
  adquisicion.fecha = req.body.fecha;

  console.log('ingresa al put: pre update');

  //adquisicion.updateById(adquisicion.id, adquisicion.tipoAdquisicion, adquisicion.tipoCompra, adquisicion.fecha, function (success) {
  adquisicion.updateById(adquisicion.id, function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/adquisicion');
    } else {
      console.log(success);
      res.send(401, 'Adquisicion no encontrada');
    }
  }, function (error) {
    console.log(error);
    res.send('Adquisicion no encontrada');
  });
});
// GET /adquisicion/:adquisicionId
// Toma una adquisicion por id
router.get('/:adquisicionId', function (req, res) {
  var adquisicion = Model.Adquisicion.build();

  adquisicion.retrieveById(req.params.adquisicionId, function (adquisicionq) {
    if (adquisicionq) {
      res.render('web/adquisicion/edit', {adquisicion:adquisicionq});
    } else {
      res.send(401, 'Adquisicion no encontrada');
    }
  }, function (error) {
    res.send('Adquisicion no encontrada');
  });
});
// DELETE /adquisicion/adquisicionId
// Borra el adquisicionId
router.delete('/:adquisicionId', function (req, res) {
  var adquisicion = Model.Adquisicion.build();
  adquisicion.id=req.body.id;
  adquisicion.removeById(
  function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/adquisicion');
    } else {
      console.log(success);
      res.send(401, 'Adquisicion no encontrada');
    }
  }

  , function (error) {
    res.send('Adquisicion no encontrada');
  });
});

module.exports = router;
