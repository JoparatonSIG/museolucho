'use strict';


var Model = require('../../models/model');

exports.getForm = function (req, res) {
  var estructuraDB = Model.Estructura.build();
  res.render('web/estructura/add', { estructuraEJS: estructuraDB });
};
// Rutas que terminan en /estructura
// POST /espacio
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var estructuraDB = Model.Estructura.build({
    estructura: req.body.estructura
  });

  estructuraDB.add(function (success) {
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
  var estructuraDB = Model.Estructura.build();

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

  estructuraDB.retrievePag(initial, offset, limitPage, currentPage, function (estructuraQ) {
    if (estructuraQ) {
      var totalPage = estructuraQ.count/limitPage;
      var count = estructuraQ.count
      res.render('web/estructura/list.ejs', {
        estructuraEJS: estructuraQ.rows,
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
  var estructuraDB = Model.Estructura.build();
  estructuraDB.id = req.body.id;
  estructuraDB.estructura = req.body.estructura;

  estructuraDB.updateById(estructuraDB.id, function (success) {
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
  var estructuraDB = Model.Estructura.build();

  estructuraDB.retrieveById(req.params.estructuraId, function (estructuraQ) {
    if (estructuraQ) {
      res.render('web/estructura/edit', {estructuraEJS:estructuraQ});
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
  var estructuraDB = Model.Estructura.build();
  estructuraDB.id=req.body.id;
  estructuraDB.removeById(
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
