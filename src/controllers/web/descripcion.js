'use strict';

// NIVEL CRUD

var Model = require('../../models/model');

// (para agregar un nuevo descripcion)
// GET /descripcion
exports.getForm = function (req, res) {
  var descripcion = Model.Descripcion.build();
  res.render('web/descripcion/add', { descripcion: descripcion});
};
// Rutas que terminan en /descripcion
// POST /descripcion
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var marcasInscripciones = req.body.marcasInscripciones;
  var alto = req.body.alto;
  var ancho = req.body.ancho;
  var longitud = req.body.longitud;
  var profundidad = req.body.profundidad;
  var diametro = req.body.diametro;
  var espesor = req.body.espesor;
  var peso = req.body.peso;
  var observaciones = req.body.observaciones;
  var descripcion = req.body.descripcion;
  var ObraId = req.body.ObraId;

  var descripcion = Model.Descripcion.build({
    marcasInscripciones: marcasInscripciones,
    alto: alto,
    ancho: ancho,
    longitud: longitud,
    profundidad: profundidad,
    diametro: diametro,
    espesor: espesor,
    peso: peso,
    observaciones: observaciones,
    descripcion: descripcion,
    ObraId: ObraId
  });

  descripcion.add(function (success) {
    res.redirect( '/web/descripcion');
  },
  function (err) {
    res.redirect( '/web/descripcion');
    // res.send(err);
  });
};
// (trae todas descripciones)
// GET /descripcion
exports.list = function (req, res) {
  // bodyParser debe hacer la magia
  console.log(req.body);
  var descripcionDB = Model.Descripcion.build({
    descripcion: req.body.descripcion,
    ObraId: req.body.ObraId
  });

  descripcionDB.add(function (success) {
    res.redirect( '/web/descripcion');
  },
  function (err) {
    res.redirect( '/web/descripcion');
    // res.send(err);
  });
};
// (trae todos los descripcion)
// GET /descripcion
exports.listPag = function (req, res) {
  var descripcion = Model.Descripcion.build();
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

  descripcion.retrievePag(initial, offset, limitPage, currentPage, function (descripcion) {
    if (descripcion) {
      var totalPage = descripcion.count/limitPage;
      var count = descripcion.count
      res.render('web/descripcion/list.ejs', {
        descripciones: descripcion.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    } else {
      res.send(401, 'No se encontraron Descripcion');
    }
  }, function (error) {
    console.log(error);
    res.send('Descripcion no encontrado');
  });
};
// Rutas que terminan en /descripcion/:descripcionId
// PUT /descripcion/:descripcionId
// Actualiza descripcion
exports.update = function (req, res) {
  var descripcion = Model.Descripcion.build();
  console.log('ingresa al put');

  descripcion.marcasInscripciones = req.body.marcasInscripciones;
  descripcion.alto = req.body.alto;
  descripcion.ancho = req.body.ancho;
  descripcion.longitud = req.body.longitud;
  descripcion.profundidad = req.body.profundidad;
  descripcion.diametro = req.body.diametro;
  descripcion.espesor = req.body.espesor;
  descripcion.peso = req.body.peso;
  descripcion.observaciones = req.body.observaciones;
  descripcion.descripcion = req.body.descripcion;
  descripcion.ObraId = req.body.ObraId;
  console.log('ingresa al put: pre update');

  descripcion.updateById(req.params.descripcionId, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/descripcion');
    } else {
      res.send(401, 'Descripcion no encontrada');
    }
  }, function (error) {
    res.send('Descripcion no encontrada');
  });
};
// GET /descripcion/:descripcionId
// Toma un descripcion por id
exports.read = function (req, res) {
  var descripcion = Model.Descripcion.build();

  descripcion.retrieveById(req.params.descripcionId, function (descripcionq) {
    if (descripcionq) {
      res.render('web/descripcion/edit', {descripcion:descripcionq});
    } else {
      res.send(401, 'Descripcion no encontrada');
    }
  }, function (error) {
    res.send('Descripcion no encontrada');
  });
};
// DELETE /descripcion/descripcionId
// Borra el descripcionId
exports.delete = function (req, res) {
  var descripcion = Model.Descripcion.build();

  descripcion.removeById(req.params.descripcionId, function (descripcion) {
    if (descripcion) {
      res.redirect( '/web/descripcion');
    } else {
      res.send(401, 'Descripcion no encontrada');
    }
  }, function (error) {
    res.send('Descripcion no encontrada');
  });
};
