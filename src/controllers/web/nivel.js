'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/model');

/* Rutas que terminan en /nivel
// router.route('/nivel') */
exports.getForm = function (req, res) {
  console.log('estoy dentro de getform**************');
  var nivelDB = Model.Nivel.build();
  res.render('web/nivel/index',{nivelesEJS: nivelDB});
};

// POST /nivel
exports.create = function (req, res) {
  console.log('estoy dentro de create****************',req.body);
  // bodyParser debe hacer la magia
  //var categoria = req.body.categoria;

  var nivelDB = Model.Nivel.build({
    categoria: req.body.categoria
  });

  nivelDB.add(function (success) {
    res.redirect('/web/nivel');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los nivel)
// GET /nivel */

//HACE BIEN
exports.listPag = function (req, res) {
  var nivelDB = Model.Nivel.build();
  console.log(req.body);
  nivelDB.retrieveAll(function (nivelesQ) {
    if (nivelesQ) {
      res.render('web/nivel/list', { nivelesEJS: nivelesQ});
    } else {
      res.send(401, 'No se encontraron Niveles');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};
/* Rutas que terminan en /nivel/:nivelId
// router.route('/nivel/:nivelId')
// PUT /nivel/:nivelId
// Actualiza nivel */
//HACE BIEN
exports.update = function (req, res) {
  var nivelDB = Model.Nivel.build();
  nivelDB.categoria = req.body.categoria;
  console.log('soy categoria',nivelDB.categoria);
  nivelDB.updateById(req.params.nivelId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/nivel');
      res.redirect('/web/nivel');
    } else {
      console.log('dentro de else');
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    console.log('error');
    res.send('Nivel no encontrado');
  });
};

// GET /nivel/:nivelId
// Toma un nivel por id
//HACE BIEN
exports.read = function (req, res) {
  var nivelDB = Model.Nivel.build();

  nivelDB.retrieveById(req.params.nivelId, function (nivelq) {
    if (nivelq) {
      console.log('dentro de editar:*****************');
      res.render('web/nivel/edit', {nivelesEJS:nivelq});
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// DELETE /nivel/nivelId
// Borra el nivelId
//HACE BIEN
exports.delete = function (req, res) {
  var nivelDB = Model.Nivel.build();
  nivelDB.removeById(req.params.nivelId, function (nivelQ) {
      if (nivelQ) {
        console.log('dentro de borrar:*****************');
        res.redirect('/web/nivel');
      } else {
        res.send(401, 'Nivel no encontrado');
      }
    }, function (error) {
      res.send('Nivel no encontrado');
    });
};
