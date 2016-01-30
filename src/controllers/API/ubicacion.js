'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /ubicacion
// router.route('/ubicacion') */

// POST /ubicacion
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var espacio = req.body.espacio;
  var inmueble = req.body.inmueble;
  var propietario = req.body.propietario;

  var ubicacion = Museo.Ubicacion.build({
    espacio: espacio,
    inmueble: inmueble,
    propietario: propietario
  });

  ubicacion.add(function (success) {
    res.json({ message: 'Ubicacion creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los ubicacion)
// GET /ubicacion */
exports.list = function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.retrieveAll(function (ubicaciones) {
    if (ubicaciones) {
      res.json(ubicaciones);
    } else {
      res.send(401, 'No se encontraron Ubicacion');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
};

/* Rutas que terminan en /ubicacion/:ubicacionId
// router.route('/ubicacion/:ubicacionId')
// PUT /ubicacion/:ubicacionId
// Actualiza ubicacion */

exports.update = function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.espacio = req.body.espacio;
  ubicacion.inmueble = req.body.inmueble;
  ubicacion.propietario = req.body.propietario;

  ubicacion.updateById(req.params.ubicacionId, function (success) {
    if (success) {
      res.json({ message: 'Ubicacion actualizado!' });
    } else {
      res.send(401, 'Ubicacion no encontrado');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
};

// GET /ubicacion/:ubicacionId
// Toma un ubicacion por id
exports.read = function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.retrieveById(req.params.ubicacionId, function (ubicacion) {
    if (ubicacion) {
      res.json(ubicacion);
    } else {
      res.send(401, 'Ubicacion no encontrado');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
};

// DELETE /ubicacion/ubicacionId
// Borra el ubicacionId
exports.delete = function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.removeById(req.params.ubicacionId, function (ubicacion) {
    if (ubicacion) {
      res.json({ message: 'Ubicacion borrado!' });
    } else {
      res.send(401, 'Ubicacion no encontrado');
    }
  }, function (error) {
    res.send('Ubicacion no encontrado');
  });
};
