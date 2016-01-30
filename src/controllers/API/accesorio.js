'use strict';

// ACCESORIOS CRUD
var Model = require('../../models/model');

// POST /accesorios
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var objetoCodigo = req.body.objetoCodigo;
  var relacion = req.body.relacion;

  var accesorio = Model.Accesorio.build({ objetoCodigo: objetoCodigo, relacion: relacion });

  accesorio.add(function (success) {
    res.json({ message: 'Accesorio creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los accesorios)
// GET /accesorio */
exports.list = function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.retrieveAll(function (accesorios) {
    if (accesorios) {
      res.json(accesorios);
    } else {
      res.send(401, 'No se encontraron Accesorios');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
};

/* Rutas que terminan en /accesorios/:accesoriosId
// router.route('/accesorio/:accesorioId')
// PUT /accesorios/:accesorioId
// Actualiza accesorio */

exports.update = function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.objetoCodigo = req.body.objetoCodigo;
  accesorio.relacion = req.body.relacion;

  accesorio.updateById(req.params.accesorioId, function (success) {
    if (success) {
      res.json({ message: 'Accesorio actualizado!' });
    } else {
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
};

// GET /accesorio/:accesorioId
// Toma un accesorio por id
exports.read = function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.retrieveById(req.params.accesorioId, function (accesorio) {
    if (accesorio) {
      res.json(accesorio);
    } else {
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
};

// DELETE /accesorio/accesorioId
// Borra el accesorioId
exports.delete = function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.removeById(req.params.accesorioId, function (accesorio) {
    if (accesorio) {
      res.json({ message: 'Accesorio borrado!' });
    } else {
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
};
