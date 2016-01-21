'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

// Rutas que terminan en /museo

// POST /museo
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var museo = req.body.museo;
  var direccion = req.body.direccion;
  var telefono = req.body.telefono;

  var museo = Museo.Museo.build({
    museo: museo,
    direccion: direccion,
    telefono:telefono
  });

  museo.add(function (success) {
    res.json( { message: 'Museo creado!' } );
  },
  function (err) {
    res.send(err);
  });
});

// (trae todos los museos)
// GET /museo
router.get('/', function (req, res) {
  var museo = Museo.Museo.build();

  museo.retrieveAll(function (museos) {
    if (museos) {
      res.json(museos);
    } else {
      res.send(401, 'No se encontraron Museos');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
});

// Rutas que terminan en /museo/:museoId

// PUT /museo/:museoId
// Actualiza museo
router.put('/:museoId', function (req, res) {
  var museo = Museo.Museo.build();

  museo.museo = req.body.museo;
  museo.direccion = req.body.direccion;
  museo.telefono = req.body.telefono;

  museo.updateById(req.params.museoId, function (success) {
    console.log(success);
    if (success) {
      res.json({ message: 'Museo actualizado!' });
    } else {
      res.send(401, 'Museo no encontrado');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
});

// GET /museo/:museoId
// Toma un museo por id
router.get('/:museoId', function (req, res) {
  var museo = Museo.Museo.build();

  museo.retrieveById(req.params.museoId, function (museo) {
    if (museo) {
      res.json(museo);
    } else {
      res.send(401, 'Museo no encontrado');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
});

// DELETE /museo/museoId
// Borra el museoId
router.delete('/:museoId', function (req, res) {
  var museo = Museo.Museo.build();

  museo.removeById(req.params.museoId, function (museo) {
    if (museo) {
      res.json({ message: 'Museo borrado!' });
    } else {
      res.send(401, 'Museo no encontrado');
    }
  }, function (error) {
    res.send('Museo no encontrado');
  });
});

module.exports = router;
