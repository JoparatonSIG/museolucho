'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /tecnicass
// router.route('/tecnicas') */

// POST /tecnicass
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var tecnicareq = req.body.tecnica;

  var tecnicas = Museo.Tecnicas.build({
    tecnicareq: tecnicareq
  });

  tecnicas.add(function (success) {
    res.json({ message: 'Tecnicas creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los tecnicass)
// GET /tecnicas */
exports.list = function (req, res) {
  var tecnica = Museo.Tecnica.build();

  tecnica.retrieveAll(function (tecnicas) {
    if (tecnicas) {
      res.json(tecnicas);
    } else {
      res.send(401, 'No se encontraron Tecnicass');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
};

/* Rutas que terminan en /tecnicass/:tecnicassId
// router.route('/tecnicas/:tecnicasId')
// PUT /tecnicass/:tecnicasId
// Actualiza tecnicas */

exports.update = function (req, res) {
  var tecnicas = Museo.Tecnicas.build();

  tecnicas.tecnica = req.body.tecnica;

  tecnicas.updateById(req.params.tecnicasId, function (success) {
    if (success) {
      res.json({ message: 'Tecnicas actualizado!' });
    } else {
      res.send(401, 'Tecnicas no encontrado');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
};

// GET /tecnicas/:tecnicasId
// Toma un tecnicas por id
exports.read = function (req, res) {
  var tecnica = Museo.Tecnica.build();

  tecnica.retrieveById(req.params.tecnicasId, function (tecnicas) {
    if (tecnicas) {
      res.json(tecnicas);
    } else {
      res.send(401, 'Tecnicas no encontrado');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
};

// DELETE /tecnicas/tecnicasId
// Borra el tecnicasId
exports.delete = function (req, res) {
  var tecnicas = Museo.Tecnicas.build();

  tecnicas.removeById(req.params.tecnicasId, function (tecnicas) {
    if (tecnicas) {
      res.json({ message: 'Tecnicas borrado!' });
    } else {
      res.send(401, 'Tecnicas no encontrado');
    }
  }, function (error) {
    res.send('Tecnicas no encontrado');
  });
};
