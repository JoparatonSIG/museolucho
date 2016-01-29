'use strict';

var Model = require('../../models/model');

exports.getForm = function (req, res) {
  var intervencion = Model.Intervencion.build();
  res.render('web/intervencion/add', { intervencion: intervencion });
};
// Rutas que terminan en /intervencion
// POST /intervencion
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var metodologia = req.body.metodologia;
  var fechaRestauracion = req.body.fechaRestauracion;
  var apellidoRestaurador = req.body.apellidoRestaurador;
  var descripcion = req.body.descripcion;

  var intervencion = Model.Intervencion.build({
    metodologia: metodologia,
    fechaRestauracion: fechaRestauracion,
    apellidoRestaurador: apellidoRestaurador,
    descripcion: descripcion
  });

  intervencion.add(function (success) {
    res.redirect('/web/intervencion');
  },
  function (err) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
};
// (trae todas las intervenciones)
// GET /intervencion
exports.limitPage = function (req, res) {
  var intervencion = Model.Intervencion.build();

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

  intervencion.retrievePag(initial, offset, limitPage, currentPage, function (intervencion) {
    if (intervencion) {
      var totalPage = intervencion.count/limitPage;
      var count = intervencion.count
      res.render('web/intervencion/list.ejs', {
        intervenciones: intervencion.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    }

   else {
      res.send(401, 'No se encontraron Intervenciones');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
};
// Rutas que terminan en /intervencion/:intervencionId
// PUT /intervencion/:intervencionId
// Actualiza intervencion
exports.update = function (req, res) {
  var intervencion = Model.Intervencion.build();


  intervencion.id=req.body.id;
  intervencion.metodologia = req.body.metodologia;
  intervencion.fechaRestauracion = req.body.fechaRestauracion;
  intervencion.apellidoRestaurador = req.body.apellidoRestaurador;
  intervencion.descripcion = req.body.descripcion;

  intervencion.updateById(intervencion.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/intervencion');
    } else {
      console.log(success);
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    console.log(error);
    res.send('Intervencion no encontrada');
  });
};
// GET /intervencion/:intervencionId
// Toma una intervencion por id
exports.read = function (req, res) {
  var intervencion = Model.Intervencion.build();

  intervencion.retrieveById(req.params.intervencionId, function (intervencionq) {
    if (intervencionq) {
      res.render('web/intervencion/edit', {intervencion:intervencionq});
    } else {
      res.send(401, 'Intervencion no encontrado');
    }
  }, function (error) {
    res.send('Intervencion no encontrado');
  });
};
// DELETE /intervencion/intervencionId
// Borra el intervencionId
exports.delete = function (req, res) {
  var intervencion = Model.Intervencion.build();
  intervencion.id=req.body.id;
  console.log("id"+intervencion.id);
  intervencion.removeById(
  function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/intervencion');
    } else {
      console.log(success);
      res.send(401, 'Intervencion no encontrada');
    }
  }

  , function (error) {
    res.send('Intervencion no encontrada');
  });
};
