'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

/* Rutas que terminan en /lugares
// router.route('/lugar') */

// POST /lugares
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var localidad = req.body.localidad;
  var codigoLocalidad = req.body.codigoLocalidad;
  var municipio = req.body.municipio;
  var provincia = req.body.provincia;
  var codigoProvincia = req.body.codigoProvincia;
  var departamento = req.body.departamento;

  var lugar = Museo.Lugar.build({
    localidad: localidad,
    codigoLocalidad: codigoLocalidad,
    municipio: municipio,
    provincia: provincia,
    codigoProvincia: codigoProvincia,
    departamento: departamento
  });

  lugar.add(function (success) {
    res.json({ message: 'Lugar creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los lugares)
// GET /lugar */
router.get('/', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.retrieveAll(function (lugares) {
    if (lugares) {
      res.json(lugares);
    } else {
      res.send(401, 'No se encontraron Lugares');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

/* Rutas que terminan en /lugares/:lugaresId
// router.route('/lugar/:lugarId')
// PUT /lugares/:lugarId
// Actualiza lugar */

router.put('/:lugarId', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.localidad = req.body.localidad;
  lugar.codigoLocalidad = req.body.codigoLocalidad;
  lugar.municipio = req.body.municipio;
  lugar.provincia = req.body.provincia;
  lugar.codigoProvincia = req.body.codigoProvincia;
  lugar.departamento = req.body.departamento;

  lugar.updateById(req.params.lugarId, function (success) {
    if (success) {
      res.json({ message: 'Lugar actualizado!' });
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

// GET /lugar/:lugarId
// Toma un lugar por id
router.get('/:lugarId', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.retrieveById(req.params.lugarId, function (lugar) {
    if (lugar) {
      res.json(lugar);
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

// DELETE /lugar/lugarId
// Borra el lugarId
router.delete('/:lugarId', function (req, res) {
  var lugar = Museo.Lugar.build();

  lugar.removeById(req.params.lugarId, function (lugar) {
    if (lugar) {
      res.json({ message: 'Lugar borrado!' });
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
});

module.exports = router;
