'use strict';
// Importar rutas
// =============================================================================


var Model = require('../../models/model');

/* Rutas que terminan en /lugares
// router.route('/lugar') */
exports.getForm = function (req, res) {
  var lugarDB = Model.Lugar.build();
  res.render('web/lugar/add',{lugarEJS: lugarDB});
};
// POST /lugares
exports.create = function (req, res) {
  // bodyParser debe hacer la magia

  var lugarDB = Model.Lugar.build({
    localidad: req.body.localidad,
    codigoLocalidad: req.body.codigoLocalidad,
    municipio: req.body.municipio,
    provincia: req.body.provincia,
    codigoProvincia: req.body.codigoProvincia,
    departamento: req.body.departamento
  });

  lugarDB.add(function (success) {
    res.redirect('/web/lugar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los lugares)
// GET /lugar */
exports.listPag = function (req, res) {
  var lugarDB = Model.Lugar.build();

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

  lugarDB.retrievePag(initial, offset, limitPage, currentPage, function (lugarQ) {
    if (lugarQ) {
      var totalPage = lugarQ.count/limitPage;
      var count = lugarQ.count
      res.render('web/lugar/list.ejs', {
        lugarEJS: lugarQ.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    } else {
      console.log('else',error);
      res.send(401, 'No se encontraron Lugares');
    }
  }, function (error) {
    console.log('error',error);
    res.send('Lugar no encontrado');
  });
};

/* Rutas que terminan en /lugares/:lugaresId
// router.route('/lugar/:lugarId')
// PUT /lugares/:lugarId
// Actualiza lugar */

exports.update = function (req, res) {
  var lugarDB = Model.Lugar.build();

  lugarDB.localidad = req.body.localidad;
  lugarDB.codigoLocalidad = req.body.codigoLocalidad;
  lugarDB.municipio = req.body.municipio;
  lugarDB.provincia = req.body.provincia;
  lugarDB.codigoProvincia = req.body.codigoProvincia;
  lugarDB.departamento = req.body.departamento;

  lugarDB.updateById(req.params.lugarId, function (success) {
    if (success) {
      res.redirect('/web/lugar');
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
};

// GET /lugar/:lugarId
// Toma un lugar por id
exports.read = function (req, res) {
  var lugarDB = Model.Lugar.build();

  lugarDB.retrieveById(req.params.lugarId, function (lugarQ) {
    if (lugarQ) {
      res.render('web/lugar/edit', {lugarEJS:lugarQ});
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
};

// DELETE /lugar/lugarId
// Borra el lugarId
exports.delete = function (req, res) {
  var lugarDB = Model.Lugar.build();

  lugarDB.removeById(req.params.lugarId, function (lugarQ) {
    if (lugarQ) {
      res.redirect('/web/lugar');
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
};
