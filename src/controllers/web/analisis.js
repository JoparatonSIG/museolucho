'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Model = require('../../models/model');

// (para agregar un nuevo analisis)
// GET /analisis
router.get('/add', function (req, res) {
  var analisis = Model.Analisis.build();
  res.render('web/analisis/add', { analisis: analisis});
});


// Rutas que terminan en /analisis
// POST /analisis
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var analisis = req.body.analisis;
  var ObraId = req.body.ObraId;

  var analisis = Model.Analisis.build({
    analisis: analisis,
    ObraId: ObraId
  });

  analisis.add(function (success) {
    res.redirect( '/web/analisis');
  },
  function (err) {
    res.redirect( '/web/analisis');
    // res.send(err);
  });
});
// (trae todos los analisis)
// GET /analisis
router.get('/', function (req, res) {
  var analisis = Model.Analisis.build();
  console.log('GET pre Select');

  analisis.retrieveAll(function (analisis) {
    if (analisis) {
      res.render('web/analisis/list.ejs', { analisiss: analisis});
    } else {
      res.send(401, 'No se encontraron Analisis');
    }
  }, function (error) {
    console.log(error);
    res.send('Analisis no encontrado');
  });
});
// Rutas que terminan en /analisis/:analisisId
// PUT /analisis/:analisisId
// Actualiza analisis
router.put('/:analisisId', function (req, res) {
  var analisis = Model.Analisis.build();
  console.log('ingresa al put');

  analisis.id = req.body.id;
  analisis.analisis = req.body.analisis;
  analisis.ObraId = req.body.ObraId;
  analisis.TipoAnalisisId = req.body.tipoAnalisisSele;
  console.log('ingresa al put: pre update');

  analisis.updateById(req.params.analisisId, function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/analisis');
    } else {
      res.send(401, 'Analisis no encontrado');
    }
  }, function (error) {
    res.send('Analisis no encontrado');
  });
});
// GET /analisis/:analisisId
// Toma un analisis por id
router.get('/:analisisId', function (req, res) {
  var tipoAnalisis = Model.TipoAnalisis.build();
  var analisis = Model.Analisis.build();

  tipoAnalisis.retrieveAll(function (tipoanalisis) {
    if (tipoanalisis) {
      analisis.retrieveById(req.params.analisisId, function (analisisq) {
        if (analisisq) {
          res.render('web/analisis/edit', {
                      analisis:analisisq,
                      select: tipoanalisis
                    });
        } else {
          res.send(401, 'Analisis no encontrado');
        }
      }, function (error) {
        res.send('Analisis no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Analisis');
    }
  }, function (error) {
    console.log(error);
    res.send('Analisis no encontrado');
  });

});
// DELETE /analisis/analisisId
// Borra el analisisId
router.delete('/:analisisId', function (req, res) {
  var analisis = Model.Analisis.build();

  analisis.removeById(req.params.analisisId, function (analisis) {
    if (analisis) {
    res.redirect( '/web/analisis');
    } else {
      res.send(401, 'Analisis no encontrado');
    }
  }, function (error) {
    res.send('Analisis no encontrado');
  });
});

module.exports = router;
