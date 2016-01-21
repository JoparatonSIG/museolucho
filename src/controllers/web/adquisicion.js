'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

// Rutas que terminan en /adquisicion
// POST /adquisicion
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var tipoAdquisicion = req.body.tipoAdquisicion;
  var tipoCompra = req.body.tipoCompra;
  var fecha = req.body.fecha;

  var adquisicion = Museo.Adquisicion.build({
    tipoAdquisicion: tipoAdquisicion,
    tipoCompra: tipoCompra,
    fecha: fecha
  });

  adquisicion.add(function (success) {
    res.render( 'web/adquisicion/list',{ message: 'Adquisicion creada!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todas las adquisiciones)
// GET /adquisiciones
router.get('/', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.retrieveAll(function (adquisiciones) {
    if (adquisiciones) {
      res.render('web/adquisicion/list.ejs', { adquisiciones: adquisiciones});
    } else {
      res.send(401, 'No se encontraron Adquisiciones');
    }
  }, function (error) {
    res.send('Adquisicion no encontrada');
  });
});
// Rutas que terminan en /adquisicion/:adquisicionId
// PUT /adquisicion/:adquisicionId
// Actualiza adquisicion
router.put('/:adquisicionId', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();
  console.log('ingresa al put');

  tipoAdquisicion = req.body.tipoAdquisicion;
  tipoCompra = req.body.tipoCompra;
  fecha = req.body.fecha;

  console.log('ingresa al put: pre update');

  adquisicion.updateById(req.params.adquisicionId, function (success) {
    console.log(success);
    if (success) {
      res.json({ message: 'Adquisicion actualizada!' });
    } else {
      res.send(401, 'Adquisicion no encontrada');
    }
  }, function (error) {
    res.send('Adquisicion no encontrada');
  });
});
// GET /adquisicion/:adquisicionId
// Toma una adquisicion por id
router.get('/:adquisicionId', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.retrieveById(req.params.adquisicionId, function (adquisicionq) {
    if (adquisicionq) {
      res.render('web/adquisicion/edit', {adquisicion:adquisicionq});
    } else {
      res.send(401, 'Adquisicion no encontrada');
    }
  }, function (error) {
    res.send('Adquisicion no encontrada');
  });
});
// DELETE /adquisicion/adquisicionId
// Borra el adquisicionId
router.delete('/:adquisicionId', function (req, res) {
  var adquisicion = Museo.Adquisicion.build();

  adquisicion.removeById(req.params.adquisicionId, function (adquisicion) {
    if (adquisicion) {
      res.json({ message: 'Adquisicion borrada!' });
    } else {
      res.send(401, 'Adquisicion no encontrada');
    }
  }, function (error) {
    res.send('Adquisicion no encontrada');
  });
});

module.exports = router;
