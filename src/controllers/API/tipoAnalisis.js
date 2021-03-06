'use strict';

// USUARIOS CRUD

var Museo = require('../../models/model');

/* Rutas que terminan en /tipoAnalisis
// router.route('/tipoAnalisis') */

// POST /tipoAnalisis
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var tipo = req.body.tipo;
  var subTipo = req.body.subTipo;
  var valorPredeterminado = req.body.valorPredeterminado;

  var tipoAnalisis = Museo.TipoAnalisis.build({
    tipo: tipo,
    subTipo: subTipo,
    valorPredeterminado: valorPredeterminado
  });

  tipoAnalisis.add(function (success) {
    res.json({ message: 'TipoAnalisis creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los tipoAnalisis)
// GET /tipoAnalisis */
exports.list = function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.retrieveAll(function (tipoAnalisis) {
    if (tipoAnalisis) {
      res.json(tipoAnalisis);
    } else {
      res.send(401, 'No se encontraron TipoAnalisis');
    }
  }, function (error) {
    res.send('TipoAnalisis no encontrado');
  });
};

/* Rutas que terminan en /tipoAnalisis/:tipoAnalisisId
// router.route('/tipoAnalisis/:tipoAnalisisId')
// PUT /tipoAnalisis/:tipoAnalisisId
// Actualiza tipoAnalisis */

exports.update = function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.tipo = req.body.tipo;
  tipoAnalisis.subTipo = req.body.subTipo;
  tipoAnalisis.valorPredeterminado = req.body.valorPredeterminado;

  tipoAnalisis.updateById(req.params.tipoAnalisisId, function (success) {
    if (success) {
      res.json({ message: 'TipoAnalisis actualizado!' });
    } else {
      res.send(401, 'TipoAnalisis no encontrado');
    }
  }, function (error) {
    res.send('TipoAnalisis no encontrado');
  });
};

// GET /tipoAnalisis/:tipoAnalisisId
// Toma un tipoAnalisis por id
exports.read = function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.retrieveById(req.params.tipoAnalisisId, function (tipoAnalisis) {
    if (tipoAnalisis) {
      res.json(tipoAnalisis);
    } else {
      res.send(401, 'TipoAnalisis no encontrado');
    }
  }, function (error) {
    res.send('TipoAnalisis no encontrado');
  });
};

// DELETE /tipoAnalisis/tipoAnalisisId
// Borra el tipoAnalisisId
exports.delete = function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.removeById(req.params.tipoAnalisisId, function (tipoAnalisis) {
    if (tipoAnalisis) {
      res.json({ message: 'TipoAnalisis borrado!' });
    } else {
      res.send(401, 'TipoAnalisis no encontrado');
    }
  }, function (error) {
    res.send('TipoAnalisis no encontrado');
  });
};
