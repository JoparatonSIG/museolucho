'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /relevamientos
// router.route('/relevamiento') */

// POST /relevamientos
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var fechaRelev = req.body.fechaRelev;
  var fechaCatalog = req.body.fechaCatalog;
  var fechaRevision = req.body.fechaRevision;
  var quienRelevo = req.body.quienRelevo;
  var quienCatalogo = req.body.quienCatalogo;
  var quienReviso = req.body.quienReviso;
  var observaciones = req.body.observaciones;

  var relevamiento = Museo.Relevamiento.build({
    fechaRelev: fechaRelev,
    fechaCatalog: fechaCatalog,
    fechaRevision: fechaRevision,
    quienRelevo: quienRelevo,
    quienCatalogo: quienCatalogo,
    quienReviso: quienReviso,
    observaciones: observaciones
  });

  relevamiento.add(function (success) {
    res.json({ message: 'Relevamiento creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los relevamientos)
// GET /relevamiento */
exports.list = function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.retrieveAll(function (relevamientos) {
    if (relevamientos) {
      res.json(relevamientos);
    } else {
      res.send(401, 'No se encontraron Relevamientos');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
};

/* Rutas que terminan en /relevamientos/:relevamientosId
// router.route('/relevamiento/:relevamientoId')
// PUT /relevamientos/:relevamientoId
// Actualiza relevamiento */

exports.update = function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.fechaRelev = req.body.fechaRelev;
  relevamiento.fechaCatalog = req.body.fechaCatalog;
  relevamiento.fechaRevision = req.body.fechaRevision;
  relevamiento.quienRelevo = req.body.quienRelevo;
  relevamiento.quienCatalogo = req.body.quienCatalogo;
  relevamiento.quienReviso = req.body.quienReviso;
  relevamiento.observaciones = req.body.observaciones;

  relevamiento.updateById(req.params.relevamientoId, function (success) {
    if (success) {
      res.json({ message: 'Relevamiento actualizado!' });
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
};

// GET /relevamiento/:relevamientoId
// Toma un relevamiento por id
exports.read = function (req, res) {
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.retrieveById(req.params.relevamientoId, function (relevamiento) {
    if (relevamiento) {
      res.json(relevamiento);
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
  var relevamiento = Museo.Relevamiento.build();

  relevamiento.removeById(req.params.relevamientoId, function (relevamiento) {
    if (relevamiento) {
      res.json({ message: 'Relevamiento borrado!' });
    } else {
      res.send(401, 'Relevamiento no encontrado');
    }
  }, function (error) {
    res.send('Relevamiento no encontrado');
  });
};
