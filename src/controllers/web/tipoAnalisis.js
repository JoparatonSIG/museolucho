'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

// Rutas que terminan en /tipoAnalisis
// POST /tipoAnalisis
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var tipo = req.body.tipo;
  var subTipo = req.body.subTipo;
  var valorPredeterminado = req.body.valorPredeterminado;

  var tipoAnalisis = Museo.TipoAnalisis.build({
    tipo: tipo,
    subTipo: subTipo,
    valorPredeterminado: valorPredeterminado
  });

  tipoAnalisis.add(function (success) {
    res.render( 'web/tipoanalisis/list',{ message: 'Tipo de analisis creado!' } );
  },
  function (err) {
    res.send(err);
  });
});
// (trae todas las tipos Analisis)
// GET /tipoAnalisis
router.get('/', function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.retrieveAll(function (tipoAnalisis) {
    if (tipoAnalisis) {
      res.render('web/tipoanalisis/list.ejs', { tipoAnalisis: tipoAnalisis});
    } else {
      res.send(401, 'No se encontraron Tipos de analisis');
    }
  }, function (error) {
    res.send('Tipo de analisis no encontrado');
  });
});
// Rutas que terminan en /tipoAnalisis/:tipoAnalisisId
// PUT /tipoAnalisis/:tipoAnalisisId
// Actualiza tipoAnalisis
router.put('/:tipoAnalisisId', function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();
  console.log('ingresa al put');
  tipoAnalisis.id = req.body.id;
  tipoAnalisis.tipo = req.body.tipo;
  tipoAnalisis.subTipo = req.body.subTipo;
  tipoAnalisis.valorPredeterminado = req.body.valorPredeterminado;

  console.log('ingresa al put: pre update');

  tipoAnalisis.updateById(tipoAnalisis.id, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/tipoanalisis');
    } else {
      console.log(success);
      res.send(401, 'Tipo de analisis no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Tipo de analisis no encontrado');
  });
});
// GET /tipoAnalisis/:tipoAnalisisId
// Toma una tipoAnalisis por id
router.get('/:tipoAnalisisId', function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.retrieveById(req.params.tipoAnalisisId, function (tipoAnalisisq) {
    if (tipoAnalisisq) {
      res.render('web/tipoanalisis/edit', {tipoAnalisis:tipoAnalisisq});
    } else {
      res.send(401, 'Tipo de analisis no encontrado');
    }
  }, function (error) {
    res.send('Tipo de analisis no encontrado');
  });
});
// DELETE /tipoAnalisis/tipoAnalisisIs
// Borra el tipoAnalisisId
router.delete('/:tipoAnalisisId', function (req, res) {
  var tipoAnalisis = Museo.TipoAnalisis.build();

  tipoAnalisis.removeById(req.params.tipoAnalisisId, function (tipoAnalisis) {
    if (tipoAnalisis) {
      res.json({ message: 'Tipo de analisis borrado!' });
    } else {
      res.send(401, 'Tipo de analisis no encontrado');
    }
  }, function (error) {
    res.send('Tipo de analisis no encontrado');
  });
});

module.exports = router;
