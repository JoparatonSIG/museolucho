'use strict';


var Model = require('../../models/model');


exports.getForm = function (req, res) {
  var relevamiento = Model.Relevamiento.build();
  res.render('web/relevamiento/add', { relevamiento: relevamiento });
};

// Rutas que terminan en /relevamiento
// POST /relevamiento
exports.create = function (req, res) {
    // bodyParser debe hacer la magia
  var fechaRelev = req.body.fechaRelev;
  var fechaCatalog = req.body.fechaCatalog;
  var fechaRevision = req.body.fechaRevision;

  var quienRelevo = req.body.quienRelevo;

  var quienCatalogo = req.body.quienCatalogo;
  var quienReviso = req.body.quienReviso;
  var observaciones = req.body.observaciones;

  var relevamiento = Model.Relevamiento.build({
    fechaRelev: fechaRelev,
    fechaCatalog: fechaCatalog,
    fechaRevision: fechaRevision,

    quienRelevo: quienRelevo,
  quienCatalogo: quienCatalogo,
    quienReviso: quienReviso,

    observaciones: observaciones
  });

  relevamiento.add(function (success) {
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
rexports.listPag = function (req, res) {
  var relevamiento = Model.Relevamiento.build();

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

  relevamiento.retrievePag(initial, offset, limitPage, currentPage, function (relevamiento) {
    if (relevamiento) {
      var totalPage = relevamiento.count/limitPage;
      var count = relevamiento.count
      res.render('web/relevamiento/list.ejs', {
        relevamientos: relevamiento.rows,
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
  var relevamiento = Model.Relevamiento.build();
  console.log('ingresa al put');
  relevamiento.id = req.body.id;
  relevamiento.fechaRelev= req.body.fechaRelev;
  relevamiento.fechaCatalog= req.body.fechaCatalog;
  relevamiento.fechaRevision= req.body.fechaRevision;

  relevamiento.quienRelevo= req.body.quienRelevo;
relevamiento.quienCatalogo= req.body.quienCatalogo;
  relevamiento.quienReviso= req.body.quienReviso;

  relevamiento.observaciones= req.body.observaciones;

  console.log('ingresa al put: pre update');

  //adquisicion.updateById(adquisicion.id, adquisicion.tipoAdquisicion, adquisicion.tipoCompra, adquisicion.fecha, function (success) {
  relevamiento.updateById(relevamiento.id, function (success) {

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
  var relevamiento = Model.Relevamiento.build();

  relevamiento.retrieveById(req.params.relevamientoId, function (relevamientoq) {
    if (relevamientoq) {
      res.render('web/relevamiento/edit', {relevamiento:relevamientoq});
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
  var relevamiento = Model.Relevamiento.build();
  relevamiento.id=req.body.id;
  relevamiento.removeById(
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
