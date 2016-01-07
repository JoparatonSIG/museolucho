'use strict';

var models = require('../models/models.js');

// USUARIOS CRUD

// GET /usuario
exports.index = function (req, res, next) {
  models.Usuarios.findAll({
  }).then(
    function (usuarios) {
      res.render('usuarios/index', { title: 'Usuarios', usuarios: usuarios, errors: [] });
    }
  ).catch(function (error) {next(error);});
};
