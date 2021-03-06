'use strict';

// NIVEL CRUD
var Model = require('../../models/model');

// (trae todos los museos)
// GET /museo
exports.getForm = function (req, res) {
  var museo = Model.Museo.build();
  res.render('web/museo/add', { museo: museo});
};

// Rutas que terminan en /museo
// POST /museo
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var museo = req.body.museo;
  var direccion = req.body.direccion;
  var telefono = req.body.telefono;

  var museo = Model.Museo.build({
    museo: museo,
    direccion: direccion,
    telefono:telefono
  });

  museo.add(function (success) {
    res.redirect( '/web/museo');
  },
  function (err) {
    res.redirect( '/web/museo');
    // res.send(err);
  });
};
// (trae todos los museos)
// GET /museo
exports.list = function (req, res) {
  var museo = Model.Museo.build();

  museo.retrieveAll(function (museos) {
    if (museos) {
      res.render('web/museo/list', { museos: museos});
    } else {
      res.send(401, 'No se encontraron Museos');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
};
// Rutas que terminan en /museo/:museoId
// PUT /museo/:museoId
// Actualiza museo
exports.update = function (req, res) {
  var museo = Model.Museo.build();
  museo.id = req.body.id;
  museo.museo = req.body.museo;
  museo.direccion = req.body.direccion;
  museo.telefono = req.body.telefono;

  museo.updateById(museo.id,  function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/museo');
    } else {
      console.log(success);
      res.send(401, 'Museo no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Museo no encontrado');
  });
};
// GET /museo/:museoId
// Toma un museo por id
exports.read = function (req, res) {
  var museo = Model.Museo.build();

  museo.retrieveById(req.params.museoId, function (museoq) {
    if (museoq) {
      res.render('web/museo/edit', {museo:museoq});
    } else {
      res.send(401, 'Museo no encontrado');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
};
// DELETE /museo/museoId
// Borra el museoId
exports.delete = function (req, res) {
  var museo = Model.Museo.build();
  console.log(req.params);
  museo.removeById(req.params.museoId, function (museo) {
    if (museo) {
      res.redirect('/web/museo');
    } else {
      res.send(401, 'Museo no encontrado');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
};
