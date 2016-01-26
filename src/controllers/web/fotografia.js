'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

// Rutas que terminan en /fotografia
// POST /fotografia
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var foto = req.body.foto;
  var codArchivoFotografico = req.body.codArchivoFotografico;
  var numRollo = req.body.numRollo;
  var numFoto = req.body.numFoto;
  var fotografo = req.body.fotografo;
  var fecha = req.body.fecha;

  var fotografias = Museo.Fotografia.build({
    foto: foto,
    codArchivoFotografico: codArchivoFotografico,
    numRollo: numRollo,
    numFoto: numFoto,
    fotografo: fotografo,
    fecha: fecha
  });

  fotografia.add(function (success) {
    res.render( 'web/fotografia/list',{ message: 'Fotografia creada!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todas las fotografias)
// GET /fotografias
router.get('/', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.retrieveAll(function (fotografias) {
    if (fotografias) {
      res.render('web/fotografia/list.ejs', { fotografias: fotografias});
    } else {
      res.send(401, 'No se encontraron fotografias');
    }
  }, function (error) {
    res.send('Fotografia no encontrada');
  });
});
// Rutas que terminan en /fotografia/:fotografiaId
// PUT /fotografia/:fotografiaId
// Actualiza fotografia
router.put('/:fotografiaId', function (req, res) {
  var fotografia = Museo.Fotografia.build();
  console.log('ingresa al put');
  fotografia.id = req.body.id;
  fotografia.foto = req.body.foto;
  fotografia.codArchivoFotografico = req.body.codArchivoFotografico;
  fotografia.numRollo = req.body.numRollo;
  fotografia.numFoto = req.body.numFoto;
  fotografia.fotografo = req.body.fotografo;
  fotografia.fecha = req.body.fecha;

  console.log('ingresa al put: pre update');

  fotografia.updateById(fotografia.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/fotografia');
    } else {
      console.log(success);
      res.send(401, 'Fotografia no encontrada');
    }
  }, function (error) {
    console.log(error);
    res.send('Fotografia no encontrada');
  });
});
// GET /fotografia/:fotografiaId
// Toma una fotografia por id
router.get('/:fotografiaId', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.retrieveById(req.params.fotografiaId, function (fotografiaq) {
    if (fotografiaq) {
      res.render('web/fotografia/edit', {fotografia:fotografiaq});
    } else {
      res.send(401, 'Fotografia no encontrada');
    }
  }, function (error) {
    res.send('Fotografia no encontrada');
  });
});
// DELETE /fotografia/fotografiaId
// Borra el fotografiaId
router.delete('/:fotografiaId', function (req, res) {
  var fotografia = Museo.Fotografia.build();

  fotografia.removeById(req.params.fotografiaId, function (fotografia) {
    if (fotografia) {
      res.json({ message: 'Fotografia borrada!' });
    } else {
      res.send(401, 'Fotografia no encontrada');
    }
  }, function (error) {
    res.send('Fotografia no encontrada');
  });
});

module.exports = router;
