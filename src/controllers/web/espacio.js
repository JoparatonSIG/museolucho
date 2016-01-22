'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

// Rutas que terminan en /espacio
// POST /espacio
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var espacio = req.body.espacio;
  var codigoEspacio = req.body.codigoEspacio;
  var inmuebles = req.body.inmuebles;
  var codigoInmueble = req.body.codigoInmueble;
  var ubicacionInmueble = req.body.ubicacionInmueble;

  var espacio = Museo.Espacio.build({
    codigoEspacio: codigoEspacio,
    inmuebles: inmuebles,
    codigoInmueble: codigoInmueble,
    ubicacionInmueble : ubicacionInmueble
  });

  espacio.add(function (success) {
    res.render( 'web/espacio/list',{ message: 'Espacio creado!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todos los espacios)
// GET /espacio
router.get('/', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.retrieveAll(function (espacios) {
    if (espacios) {
      res.render('web/espacio/list', { espacios: espacios});
    } else {
      res.send(401, 'No se encontraron Espacios');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});
// Rutas que terminan en /espacio/:espacioId
// PUT /espacio/:espacioId
// Actualiza espacio
router.put('/:espacioId', function (req, res) {
  var espacio = Museo.Espacio.build();
  espacio.id = req.body.id;
  espacio.espacio = req.body.espacio;
  espacio.codigoEspacio = req.body.codigoEspacio;
  espacio.inmuebles = req.body.inmuebles;
  espacio.codigoInmueble = req.body.codigoInmueble;
  espacio.ubicacionInmueble = req.body.ubicacionInmueble;

  espacio.updateById(espacio.id, espacio.espacio, espacio.codigoEspacio, espacio.inmuebles, espacio.codigoInmueble, espacio.ubicacionInmueble, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/espacio');
    } else {
      console.log(success);
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Espacio no encontrado');
  });
});
// GET /espacio/:espacioId
// Toma un espacio por id
router.get('/:espacioId', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.retrieveById(req.params.espacioId, function (espacioq) {
    if (espacioq) {
      res.render('web/espacio/edit', {espacio:espacioq});
    } else {
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});
// DELETE /espacio/espacioId
// Borra el espacioId
router.delete('/:espacioId', function (req, res) {
  var espacio = Museo.Espacio.build();

  espacio.removeById(req.params.espacioId, function (espacio) {
    if (espacio) {
      res.json({ message: 'Espacio borrado!' });
    } else {
      res.send(401, 'Espacio no encontrado');
    }
  }, function (error) {
    res.send('Espacio no encontrado');
  });
});

module.exports = router;