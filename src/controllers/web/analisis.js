'use strict';

// NIVEL CRUD
var Model = require('../../models/model');

// (para agregar un nuevo analisis)
// GET /analisis
exports.getForm = function (req, res) {
  var tipoAnalisisDB = Model.TipoAnalisis.build();
  var analisisDB = Model.Analisis.build();

  tipoAnalisisDB.retrieveAll(function (tipoanalisisQ) {
    if (tipoanalisisQ) {
        res.render('web/analisis/add', {
            analisisJ: analisisDB,
            selectJ: tipoanalisisQ
          });
    }
  }, function (error) {
    res.send('Analisis no encontrado');
    }
  );
};
// Rutas que terminan en /analisis
// POST /analisis
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  console.log(req.body);
  var analisisDB = Model.Analisis.build({
    analisis: req.body.analisis,
    TipoAnalisisId: req.body.selectJ,
    ObraId: req.body.ObraId
  });

  analisisDB.add(function (success) {
    res.redirect( '/web/analisis');
  },
  function (err) {
    res.redirect( '/web/analisis');
    // res.send(err);
  });
};
// (trae todos los analisis)
// GET /analisis
exports.listPag = function (req, res) {
  var analisis = Model.Analisis.build();
  console.log('GET Paginado pre Select');

  var limitPage = 10;
  if (currentPage == null ) {
    var currentPage = 1;
    var initial = 0;
    var offset = initial+limitPage;
  } else {
    var currentPage = req.params.currentPage;
    var initial = currentPage*limitPage;
    var offset = initial+limitPage;
  }

  analisis.retrievePag(initial, offset, limitPage, currentPage, function (analisis) {
    if (analisis) {
      var totalPage = analisis.count/limitPage;
      var count = analisis.count
      res.render('web/analisis/list.ejs', {
        analisiss: analisis.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    } else {
      res.send(401, 'No se encontraron Analisis');
    }
  }, function (error) {
    console.log(error);
    res.send('Analisis no encontrado');
  });
};
// Rutas que terminan en /analisis/:analisisId
// PUT /analisis/:analisisId
// Actualiza analisis
exports.update = function (req, res) {
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
};
// GET /analisis/:analisisId
// Toma un analisis por id
exports.read = function (req, res) {
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

};
// DELETE /analisis/analisisId
// Borra el analisisId
exports.delete = function (req, res) {
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
};
