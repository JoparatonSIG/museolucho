'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

// Rutas que terminan en /estructura
// POST /espacio
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var estructuraR = req.body.estructura;

  var estructura = Model.Espacio.build({
    estructura: estructuraR
  });

  espacio.add(function (success) {
    res.render( 'web/estructura/list',{ message: 'Esctructura creada!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todos las estructuras)
// GET /estructura
router.get('/', function (req, res) {
  var estructura = Model.Estructura.build();

  estructura.retrieveAll(function (estructuras) {
    if (estructuras) {
      res.render('web/estructura/list', { estructuras: estructuras});
    } else {
      res.send(401, 'No se encontraron Estructuras');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
});
// Rutas que terminan en /estructura/:estructuraId
// PUT /estructura/:estructuraId
// Actualiza estructura
router.put('/:estructuraId', function (req, res) {
  var estructura = Model.Estructura.build();
  estructura.id = req.body.id;
  estructura.estructura = req.body.estructura;

  estructura.updateById(estructura.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/estructura');
    } else {
      console.log(success);
      res.send(401, 'Estructura no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Estrucutra no encontrado');
  });
});
// GET /estructura/:estructuraId
// Toma una estructura por id
router.get('/:estructuraId', function (req, res) {
  var estructura = Model.Estructura.build();

  estructura.retrieveById(req.params.estructuraId, function (estructuraq) {
    if (estructuraq) {
      res.render('web/estructura/edit', {estructura:estructuraq});
    } else {
      res.send(401, 'Estructura no encontrado');
    }
  }, function (error) {
    res.send('Estructura no encontrado');
  });
});
// DELETE /estructura/estructuraId
// Borra el estructuraId
router.delete('/:estructuraId', function (req, res) {
  var estructura = Model.Estructura.build();
  estructura.id=req.body.id;
  estructura.removeById(
  function (success) {

    console.log(success);
    if (success) {
      res.redirect('/web/estructura');
    } else {
      console.log(success);
      res.send(401, 'Estructura no encontrada');
    }
  }

  , function (error) {
    res.send('Estructura no encontrada');
  });
});




module.exports = router;
}
