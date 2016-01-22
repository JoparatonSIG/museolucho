'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

// Rutas que terminan en /ubicacion
// POST /ubicacion
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var espacio = req.body.espacio;
  var inmueble = req.body.inmueble;
  var propietario = req.body.propietario;

  var ubicaciones = Museo.Ubicacion.build({
    espacio: espacio,
    inmueble: inmueble,
    propietario: propietario,
  });

  ubicacion.add(function (success) {
    res.render( 'web/ubicacion/list',{ message: 'Ubicacion creada!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todas las ubicaciones)
// GET /ubicaciones
router.get('/', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.retrieveAll(function (ubicaciones) {
    if (ubicaciones) {
      res.render('web/ubicacion/list.ejs', { ubicaciones: ubicaciones});
    } else {
      res.send(401, 'No se encontraron ubicaciones');
    }
  }, function (error) {
    res.send('Ubicacion no encontrada');
  });
});
// Rutas que terminan en /ubicacion/:ubicacionId
// PUT /ubicacion/:ubicacionId
// Actualiza ubicacion
router.put('/:ubicacionId', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();
  console.log('ingresa al put');
  ubicacion.id = req.body.id;
  ubicacion.espacio = req.body.espacio;
  ubicacion.inmueble = req.body.inmueble;
  ubicacion.propietario = req.body.propietario;


  console.log('ingresa al put: pre update');

  ubicacion.updateById(ubicacion.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/ubicacion');
    } else {
      console.log(success);
      res.send(401, 'Ubicacion no encontrada');
    }
  }, function (error) {
    console.log(error);
    res.send('Ubicacion no encontrada');
  });
});
// GET /ubicacion/:ubicacionId
// Toma una ubicacion por id
router.get('/:ubicacionId', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.retrieveById(req.params.ubicacionId, function (ubicacionq) {
    if (ubicacionq) {
      res.render('web/ubicacion/edit', {ubicacion:ubicacionq});
    } else {
      res.send(401, 'Ubicacion no encontrada');
    }
  }, function (error) {
    res.send('Ubicacion no encontrada');
  });
});
// DELETE /ubicacion/ubicacionId
// Borra el ubicacionId
router.delete('/:ubicacionId', function (req, res) {
  var ubicacion = Museo.Ubicacion.build();

  ubicacion.removeById(req.params.ubicacionId, function (ubicacion) {
    if (ubicacion) {
      res.json({ message: 'Ubicacion borrada!' });
    } else {
      res.send(401, 'Ubicacion no encontrada');
    }
  }, function (error) {
    res.send('Ubicacion no encontrada');
  });
});

module.exports = router;
