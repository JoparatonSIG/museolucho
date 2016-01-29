'use strict';


var Model = require('../../models/model');

exports.getForm = function (req, res) {
  var estructura = Model.Estructura.build();
  res.render('web/estructura/add', { estructura: estructura });
};
// Rutas que terminan en /estructura
// POST /espacio
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var estructuraR = req.body.estructura;

  var estructura = Model.Estructura.build({
    estructura: estructuraR
  });

  estructura.add(function (success) {
    res.redirect( '/web/estructura');
  },
  function (err) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
  });
});
};
// (trae todos las estructuras)
// GET /estructura
exports.listPag = function (req, res) {
  var estructura = Model.Estructura.build();

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

  estructura.retrievePag(initial, offset, limitPage, currentPage, function (estructura) {
    if (estructura) {
      var totalPage = estructura.count/limitPage;
      var count = estructura.count
      res.render('web/estructura/list.ejs', {
        estructuras: estructura.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });


    }

  else {
      res.send(401, 'No se encontraron Estructuras');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
};
// Rutas que terminan en /estructura/:estructuraId
// PUT /estructura/:estructuraId
// Actualiza estructura
exports.update = function (req, res) {
  var estructura = Model.Estructura.build();
  estructura.id = req.body.id;
  estructura.estructura = req.body.estructura;

  estructura.updateById(estructura.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/estructura');
    } else {
      console.log(success);
      res.send(401, 'Estructura no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Estrucutra no encontrado');
  });
};
// GET /estructura/:estructuraId
// Toma una estructura por id
exports.read = function (req, res) {
  var estructura = Model.Estructura.build();

  estructura.retrieveById(req.params.estructuraId, function (estructuraq) {
    if (estructuraq) {
      res.render('web/estructura/edit', {estructura:estructuraq});
    } else {
      res.send(401, 'Estructura no encontrado');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
};
// DELETE /estructura/estructuraId
// Borra el estructuraId
exports.delete = function (req, res) {
  var estructura = Model.Estructura.build();
  estructura.id=req.body.id;
  estructura.removeById(
  function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/estructura');
    } else {
      console.log(success);
      res.send(401, 'Estructura no encontrada');
    }
  }

  , function (error) {
    res.send('Estructura no encontrada');
  });
};
