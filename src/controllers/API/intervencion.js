'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /intervencion
// router.route('/intervencion') */

// POST /usuarios

exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var metodologia = req.body.metodologia;
  var fechaRestauracion = req.body.fechaRestauracion;
  var apellidoRestaurador = req.body.apellidoRestaurador;
  var descripcion = req.body.descripcion;

  var usuario = Museo.Intervencion.build({ metodologia: metodologia, fechaRestauracion: fechaRestauracion, descripcion: descripcion });

  intervencion.add(function (success) {
    res.json({ message: 'Intervencion creada!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos las intervenciones)
// GET /intervencion */

exports.list = function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.retrieveAll(function (intervenciones) {
    if (intervenciones) {
      res.json(intervenciones);
    } else {
      res.send(401, 'No se encontraron Intervenciones');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
};

/* Rutas que terminan en /intervenciones/:IntervencionesId
// router.route('/intervenciones/:intervencioneId')
// PUT /intervenciones/:intervencioneId
// Actualiza intervencion */

exports.update = function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.metodologia = req.body.metodologia;
  intervencion.fechaRestauracion = req.body.fechaRestauracion;
  intervencion.apellidoRestaurador = req.body.apellidoRestaurador;
  intervencion.descripcion = req.body.descripcion;

  intervencion.updateById(req.params.intervencionId, function (success) {
    if (success) {
      res.json({ message: 'Intervencion actualizada!' });
    } else {
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
};

// GET /intervencion/:intervencionId
// Toma un intervencion por id
exports.read = function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.retrieveById(req.params.intervencionId, function (usuario) {
    if (intervencion) {
      res.json(intervencion);
    } else {
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
};

// DELETE /intervencion/intervencionId
// Borra el intervencionId
exports.delete = function (req, res) {
  var intervencion = Museo.Intervencion.build();

  intervencion.removeById(req.params.intervencionId, function (usuario) {
    if (intervencion) {
      res.json({ message: 'Intervencion borrada!' });
    } else {
      res.send(401, 'Intervencion no encontrada');
    }
  }, function (error) {
    res.send('Intervencion no encontrada');
  });
};
