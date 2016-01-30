'use strict';

// NIVEL CRUD

var Model = require('../../models/model');

// (trae todos los fotografias)
// GET /fotografia
exports.getForm = function (req, res) {
  var fotografia = Model.Fotografia.build();
  res.render('web/fotografia/add', { fotografiass: fotografia});
};

// Rutas que terminan en /fotografia
// POST /fotografia
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var foto = req.body.foto;
  var codArchivoFotografico = req.body.codArchivoFotografico;
  var numRollo = req.body.numRollo;
  var numFoto = req.body.numFoto;
  var fotografo = req.body.fotografo;
  var fecha = req.body.fecha;

  var fotografia = Model.Fotografia.build({
    foto: foto,
    codArchivoFotografico: codArchivoFotografico,
    numRollo:numRollo,
    numFoto:numFoto,
    fotografo:fotografo,
    fecha:fecha
  });

  fotografia.add(function (success) {
    res.redirect( '/web/fotografia');
  },
  function (err) {
    res.redirect( '/web/fotografia');
    // res.send(err);
  });
};
// (trae todos los fotografias)
// GET /fotografia
exports.listPag = function (req, res) {
  var fotografia = Model.Fotografia.build();

  fotografia.retrieveAll(function (fotografias) {
    if (fotografias) {
      res.render('web/fotografia/list', { fotografiass: fotografias});
    } else {
      res.send(401, 'No se encontraron Fotografias');
    }
  }, function (error) {
    res.send('Fotografia no encontrada');
  });
};
// Rutas que terminan en /fotografia/:fotografiaId
// PUT /fotografia/:fotografiaId
// Actualiza fotografia
exports.update = function (req, res) {
  var fotografia = Model.Fotografia.build();
  fotografia.id = req.body.id;
  fotografia.foto = req.body.foto;
  fotografia.codArchivoFotografico = req.body.codArchivoFotografico;
  fotografia.numRollo = req.body.numRollo;
  fotografia.numFoto = req.body.numFoto;
  fotografia.fotografo = req.body.fotografo;
  fotografia.fecha = req.body.fecha;

  fotografia.updateById(fotografia.id,  function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/fotografia');
    } else {
      console.log(success);
      res.send(401, 'Fotografia no encontrada');
    }
  }, function (error) {
    console.log(error);
    res.send('Fotografia no encontrada');
  });
};
// GET /fotografia/:fotografiaId
// Toma un fotografia por id
exports.read = function (req, res) {
  var fotografia = Model.Fotografia.build();

  fotografia.retrieveById(req.params.fotografiaId, function (fotografiaq) {
    if (fotografiaq) {
      res.render('web/fotografia/edit', {fotografias:fotografiaq});
    } else {
      res.send(401, 'Fotografia no encontrada');
    }
  }, function (error) {
    res.send('Fotografia no encontrada');
  });
};
// DELETE /fotografia/fotografiaId
// Borra el fotografia
exports.delete = function (req, res) {
  var fotografia = Model.Fotografia.build();
  console.log(req.params);
  fotografia.removeById(req.params.fotografiaId, function (fotografia) {
    if (fotografia) {
      res.redirect('/web/fotografia');
    } else {
      res.send(401, 'Fotografia no encontrada');
    }
  }, function (error) {
    res.send('Fotografia no encontrada');
  });
};
