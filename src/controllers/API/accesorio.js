'use strict';

// ACCESORIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

/* Rutas que terminan en /accesorios
// router.route('/accesorio') */

// POST /accesorios
router.post('/', function (req, res) {
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
});

/* (trae todos los accesorios)
// GET /accesorio */
router.get('/', function (req, res) {
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
});

/* Rutas que terminan en /accesorios/:accesoriosId
// router.route('/accesorio/:accesorioId')
// PUT /accesorios/:accesorioId
// Actualiza accesorio */

router.put('/:accesorioId', function (req, res) {
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
});

// GET /accesorio/:accesorioId
// Toma un accesorio por id
router.get('/:accesorioId', function (req, res) {
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
