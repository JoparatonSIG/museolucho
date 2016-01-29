'use strict';



var Model = require('../../models/model');

exports.getForm = function (req, res) {
  var espacio = Model.Espacio.build();
  res.render('web/espacio/add', { espacio: espacio });
};
// Rutas que terminan en /espacio
// POST /espacio
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var espacioR = req.body.espacio;
  var codigoEspacio = req.body.codigoEspacio;
  var inmuebles = req.body.inmuebles;
  var codigoInmueble = req.body.codigoInmueble;
  var ubicacionInmueble = req.body.ubicacionInmueble;

  var espacio = Model.Espacio.build({
    espacio: espacioR,
    codigoEspacio: codigoEspacio,
    inmuebles: inmuebles,
    codigoInmueble: codigoInmueble,
    ubicacionInmueble : ubicacionInmueble
  });

  espacio.add(function (success) {
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
  var espacio = Model.Espacio.build();

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

  espacio.retrievePag(initial, offset, limitPage, currentPage, function (espacio) {
    if (espacio) {
      var totalPage = espacio.count/limitPage;
      var count = espacio.count
      res.render('web/espacio/list.ejs', {
        espacios: espacio.rows,
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
  var espacio = Model.Espacio.build();
  espacio.id = req.body.id;
  espacio.espacio = req.body.espacio;
  espacio.codigoEspacio = req.body.codigoEspacio;
  espacio.inmuebles = req.body.inmuebles;
  espacio.codigoInmueble = req.body.codigoInmueble;
  espacio.ubicacionInmueble = req.body.ubicacionInmueble;

  espacio.updateById(espacio.id, function (success) {
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
  var espacio = Model.Espacio.build();

  espacio.retrieveById(req.params.espacioId, function (espacioq) {
    if (espacioq) {
      res.render('web/espacio/edit', {espacio:espacioq});
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
  var espacio = Model.Espacio.build();
  espacio.id=req.body.id;
  espacio.removeById(
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
