'use strict';


var Model = require('../../models/model');


exports.getForm = function (req, res) {
  var relevamientoDB = Model.Relevamiento.build();
  res.render('web/relevamiento/add', { relevamientoEJS: relevamientoDB });
};

// Rutas que terminan en /relevamiento
// POST /relevamiento
exports.create = function (req, res) {
    // bodyParser debe hacer la magia
    var relevamientoDB = Model.Relevamiento.build({
    fechaRelev: req.body.fechaRelev,
    fechaCatalog: req.body.fechaCatalog,
    fechaRevision: req.body.fechaRevision,

    quienRelevo: req.body.quienRelevo,
  quienCatalogo: req.body.quienCatalogo,
    quienReviso: req.body.quienReviso,

    observaciones: req.body.observaciones
  });

  relevamientoDB.add(function (success) {
    res.redirect('/web/relevamiento');
  },
  function (err) {
    //res.redirect('/web/relevamiento');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  //  res.send('relevamiento no encontrada');
  });
};
// (trae todos los relevamientos)
// GET /relevamientos
exports.listPag = function (req, res) {
  var relevamientoDB = Model.Relevamiento.build();

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

  relevamientoDB.retrievePag(initial, offset, limitPage, currentPage, function (relevamientoQ) {
    if (relevamientoQ) {
      var totalPage = relevamientoQ.count/limitPage;
      var count = relevamientoQ.count
      res.render('web/relevamiento/list.ejs', {
        relevamientoEJS: relevamientoQ.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });


    } else {
      res.send(401, 'No se encontraron Relevamientos');
    }
  }, function (error) {
    res.send('Relevamiento no encontrada');
  });
};
// Rutas que terminan en /relevamiento/:relevamientoId
// PUT /relevamiento/:relevamientoId
// Actualiza relevamiento
exports.update = function (req, res) {
  var relevamientoDB = Model.Relevamiento.build();
  console.log('ingresa al put');
  relevamientoDB.id = req.body.id;
  relevamientoDB.fechaRelev= req.body.fechaRelev;
  relevamientoDB.fechaCatalog= req.body.fechaCatalog;
  relevamientoDB.fechaRevision= req.body.fechaRevision;

  relevamientoDB.quienRelevo= req.body.quienRelevo;
relevamientoDB.quienCatalogo= req.body.quienCatalogo;
  relevamientoDB.quienReviso= req.body.quienReviso;

  relevamientoDB.observaciones= req.body.observaciones;

  console.log('ingresa al put: pre update');

  //adquisicion.updateById(adquisicion.id, adquisicion.tipoAdquisicion, adquisicion.tipoCompra, adquisicion.fecha, function (success) {
  relevamientoDB.updateById(relevamientoDB.id, function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/relevamiento');
    } else {
      console.log(success);
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Relevamiento no encontrado');
  });
};
// GET /relevamiento/:relevamientoId
// Toma un relevamiento por id
exports.read = function (req, res) {
  var relevamientoDB = Model.Relevamiento.build();

  relevamientoDB.retrieveById(req.params.relevamientoId, function (relevamientoQ) {
    if (relevamientoQ) {
      res.render('web/relevamiento/edit', {relevamientoEJS:relevamientoQ});
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
};
// DELETE /relevamiento/relevamientoId
// Borra el relevamientoId
exports.delete = function (req, res) {
  var relevamientoDB = Model.Relevamiento.build();
  relevamientoDB.id=req.body.id;
  relevamientoDB.removeById(
  function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/relevamiento');
    } else {
      console.log(success);
      res.send(401, 'Relevamiento no encontrado');
    }
  }

  , function (error) {
    res.send('Relevamiento no encontrado');
  });
};
