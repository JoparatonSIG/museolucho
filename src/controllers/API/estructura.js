'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /estructuras
// router.route('/estructura') */

// POST /estructuras
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var estructurareq = req.body.estructura;

  var estructura = Museo.Estructura.build({
    estructura: estructurareq
  });

  estructura.add(function (success) {
    res.json({ message: 'Estructura creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los estructuras)
// GET /estructura */
exports.list = function (req, res) {
  var estructura = Museo.Estructura.build();

  estructura.retrieveAll(function (estructuras) {
    if (estructuras) {
      res.json(estructuras);
    } else {
      res.send(401, 'No se encontraron Estructuras');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
};

/* Rutas que terminan en /estructuras/:estructurasId
// router.route('/estructura/:estructuraId')
// PUT /estructuras/:estructuraId
// Actualiza estructura */

exports.update = function (req, res) {
  var estructura = Museo.Estructura.build();

  estructura.estructura = req.body.estructura;

  estructura.updateById(req.params.estructuraId, function (success) {
    if (success) {
      res.json({ message: 'Estructura actualizado!' });
    } else {
      res.send(401, 'Estructura no encontrado');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
};

// GET /estructura/:estructuraId
// Toma un estructura por id
exports.read = function (req, res) {
  var estructura = Museo.Estructura.build();

  estructura.retrieveById(req.params.estructuraId, function (estructura) {
    if (estructura) {
      res.json(estructura);
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
  var estructura = Museo.Estructura.build();

  estructura.removeById(req.params.estructuraId, function (estructura) {
    if (estructura) {
      res.json({ message: 'Estructura borrado!' });
    } else {
      res.send(401, 'Estructura no encontrado');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
};
