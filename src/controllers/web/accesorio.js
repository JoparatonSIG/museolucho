'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

// Rutas que terminan en /accesorio
// POST /accesorio
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var objetoCodigo = req.body.objetoCodigo;
  var relacion = req.body.relacion;

  var accesorio = Model.Accesorio.build({
    objetoCodigo: objetoCodigo,
    relacion: relacion
  });

  accesorio.add(function (success) {
    res.render( 'web/accesorio/list',{ message: 'Accesorio creado!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todos los accesorios)
// GET /accesorio
router.get('/', function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.retrieveAll(function (accesorios) {
    if (accesorios) {
      res.render('web/accesorio/list', { accesorios: accesorios});
    } else {
      res.send(401, 'No se encontraron Accesorios');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
});
// Rutas que terminan en /accesorio/:accesorioId
// PUT /accesorio/:accesorioId
// Actualiza accesorio
router.put('/:accesorioId', function (req, res) {
  var accesorio = Model.Accesorio.build();
  accesorio.id = req.body.id;
  accesorio.objetoCodigo = req.body.objetoCodigo;
  accesorio.relacion = req.body.relacion;

  accesorio.updateById(accesorio.id,  function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/accesorio');
    } else {
      console.log(success);
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Accesorio no encontrado');
  });
});
// GET /accesorio/:accesorioId
// Toma un accesorio por id
router.get('/:accesorioId', function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.retrieveById(req.params.accesorioId, function (accesorioq) {
    if (accesorioq) {
      res.render('web/accesorio/edit', {accesorio:accesorioq});
    } else {
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
});
// DELETE /accesorio/accesorioId
// Borra el accesorioId
router.delete('/:accesorioId', function (req, res) {
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
});

module.exports = router;
