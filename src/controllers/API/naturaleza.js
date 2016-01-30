'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /naturalezaes
// router.route('/naturaleza') */

// POST /naturalezaes
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var naturalezareq = req.body.naturaleza;
  var codigoNaturaleza = req.body.codigoNaturaleza;

  var naturaleza = Museo.Naturaleza.build({
    naturaleza: naturalezareq,
    codigoNaturaleza: codigoNaturaleza
  });

  naturaleza.add(function (success) {
    res.json({ message: 'Naturaleza creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los naturalezaes)
// GET /naturaleza */
exports.list = function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.retrieveAll(function (naturaleza) {
    if (naturaleza) {
      res.json(naturaleza);
    } else {
      res.send(401, 'No se encontraron Naturalezaes');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
};

/* Rutas que terminan en /naturalezaes/:naturalezaesId
// router.route('/naturaleza/:naturalezaId')
// PUT /naturalezaes/:naturalezaId
// Actualiza naturaleza */

exports.update = function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.naturaleza = req.body.naturaleza;
  naturaleza.codigoNaturaleza = req.body.codigoNaturaleza;

  naturaleza.updateById(req.params.naturalezaId, function (success) {
    if (success) {
      res.json({ message: 'Naturaleza actualizado!' });
    } else {
      res.send(401, 'Naturaleza no encontrado');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
};

// GET /naturaleza/:naturalezaId
// Toma un naturaleza por id
exports.read = function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.retrieveById(req.params.naturalezaId, function (naturaleza) {
    if (naturaleza) {
      res.json(naturaleza);
    } else {
      res.send(401, 'Naturaleza no encontrado');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
};

// DELETE /naturaleza/naturalezaId
// Borra el naturalezaId
exports.delete = function (req, res) {
  var naturaleza = Museo.Naturaleza.build();

  naturaleza.removeById(req.params.naturalezaId, function (naturaleza) {
    if (naturaleza) {
      res.json({ message: 'Naturaleza borrado!' });
    } else {
      res.send(401, 'Naturaleza no encontrado');
    }
  }, function (error) {
    res.send('Naturaleza no encontrado');
  });
};
