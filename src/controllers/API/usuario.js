'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /usuarios
// router.route('/usuario') */

// POST /usuarios

exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var email = req.body.email;
  var nombre = req.body.nombre;
  var password = req.body.password;

  var usuario = Museo.Usuario.build({ email: email, password: password });

  usuario.add(function (success) {
    res.json({ message: 'Usuario creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los usuarios)
// GET /usuario */

exports.list = function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.retrieveAll(function (usuarios) {
    if (usuarios) {
      res.json(usuarios);
    } else {
      res.send(401, 'No se encontraron Usuarios');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};

/* Rutas que terminan en /usuarios/:usuariosId
// router.route('/usuario/:usuarioId')
// PUT /usuarios/:usuarioId
// Actualiza usuario */

exports.update = function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.email = req.body.email;
  usuario.nombre = req.body.nombre;
  usuario.password = req.body.password;

  usuario.updateById(req.params.usuarioId, function (success) {
    if (success) {
      res.json({ message: 'Usuario actualizado!' });
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};

// GET /usuario/:usuarioId
// Toma un usuario por id
exports.read = function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.retrieveById(req.params.usuarioId, function (usuario) {
    if (usuario) {
      res.json(usuario);
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};

// DELETE /usuario/usuarioId
// Borra el usuarioId
exports.delete = function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.removeById(req.params.usuarioId, function (usuario) {
    if (usuario) {
      res.json({ message: 'Usuario borrado!' });
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};
