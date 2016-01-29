'use strict';



var Model = require('../../models/model');

exports.getForm = function (req, res) {
  var espacioDB = Model.Espacio.build();
  res.render('web/espacio/add', { espacioEJS: espacioDB });
};
// Rutas que terminan en /espacio
// POST /espacio
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var espacioR = req.body.espacio;
  var codigoEspacioR = req.body.codigoEspacio;
  var inmueblesR = req.body.inmuebles;
  var codigoInmuebleR = req.body.codigoInmueble;
  var ubicacionInmuebleR = req.body.ubicacionInmueble;

  var espacioDB = Model.Espacio.build({
    espacio: espacioR,
    codigoEspacio: codigoEspacioR,
    inmuebles: inmueblesR,
    codigoInmueble: codigoInmuebleR,
    ubicacionInmueble : ubicacionInmuebleR
  });

  espacioDB.add(function (success) {
    res.redirect('/web/espacio');
  },
  function (err) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
};
// (trae todos los espacios)
// GET /espacio
exports.listPag = function (req, res) {
  var espacioDB = Model.Espacio.build();

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

  espacioDB.retrievePag(initial, offset, limitPage, currentPage, function (espacioQ) {
    if (espacioQ) {
      var totalPage = espacioDB.count/limitPage;
      var count = espacioDB.count
      res.render('web/espacio/list.ejs', {
        espacios: espacioDB.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    }

   else {
      res.send(401, 'No se encontraron Espacios');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
};
// Rutas que terminan en /espacio/:espacioId
// PUT /espacio/:espacioId
// Actualiza espacio
exports.update = function (req, res) {
  var espacioDB = Model.Espacio.build();
  espacioDB.id = req.body.id;
  espacioDB.espacio = req.body.espacio;
  espacioDB.codigoEspacio = req.body.codigoEspacio;
  espacioDB.inmuebles = req.body.inmuebles;
  espacioDB.codigoInmueble = req.body.codigoInmueble;
  espacioDB.ubicacionInmueble = req.body.ubicacionInmueble;

  espacioDB.updateById(espacio.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/espacio');
    } else {
      console.log(success);
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Espacio no encontrado');
  });
};
// GET /espacio/:espacioId
// Toma un espacio por id
exports.read = function (req, res) {
  var espacioDB = Model.Espacio.build();

  espacioDB.retrieveById(req.params.espacioId, function (espacioQ) {
    if (espacioQ) {
      res.render('web/espacio/edit', {espacioEJS:espacioQ});
    } else {
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
};
// DELETE /espacio/espacioId
// Borra el espacioId
exports.delete = function (req, res) {
  var espacioDB = Model.Espacio.build();
  espacioDB.id=req.body.id;
  espacioDB.removeById(
  function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/espacio');
    } else {
      console.log(success);
      res.send(401, 'Espacio no encontrada');
    }
  }

  , function (error) {
    res.send('Espacio no encontrada');
  });
};
