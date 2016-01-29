'use strict';

// NIVEL CRUD
var Museo = require('../../models/model');

// Rutas que terminan en /nivel

// POST /nivel
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var categoria = req.body.categoria;
  var nivel = Museo.Nivel.build({ categoria: categoria });

  nivel.add(function (success) {
    res.json( { message: 'Nivel creado!' } );
  },
  function (err) {
    res.send(err);
  });
};

// (trae todos los niveles)
// GET /nivel
exports.list = function (req, res) {
  var nivel = Museo.Nivel.build();

  nivel.retrieveAll(function (niveles) {
    if (niveles) {
      res.json(niveles);
    } else {
      res.send(401, 'No se encontraron Niveles');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// Rutas que terminan en /nivel/:nivelId

// PUT /nivel/:nivelId
// Actualiza nivel
exports.update = function (req, res) {
  var nivel = Museo.Nivel.build();
  nivel.categoria = req.body.categoria;

  nivel.updateById(req.params.nivelId, function (success) {
    console.log(success);
    if (success) {
      res.json({ message: 'Nivel actualizado!' });
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// GET /nivel/:nivelId
// Toma un nivel por id
exports.read = function (req, res) {
  var nivel = Museo.Nivel.build();

  nivel.retrieveById(req.params.nivelId, function (nivel) {
    if (nivel) {
      res.json(nivel);
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// DELETE /nivel/nivelId
// Borra el nivelId
exports.delete = function (req, res) {
  var nivel = Museo.Nivel.build();

  nivel.removeById(req.params.nivelId, function (nivel) {
    if (nivel) {
      res.json({ message: 'Nivel borrado!' });
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};
