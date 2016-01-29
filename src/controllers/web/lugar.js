'use strict';
// Importar rutas
// =============================================================================


var Museo = require('../../models/model');

/* Rutas que terminan en /lugares
// router.route('/lugar') */
exports.getForm = function (req, res) {
  var lugar = Museo.Lugar.build();
  res.render('web/lugar/add',{lugar: lugar});
};
// POST /lugares
exports.create = function (req, res) {
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
    res.redirect('/web/lugar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los lugares)
// GET /lugar */
exports.listPag = function (req, res) {
  var lugar = Museo.Lugar.build();

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

  lugar.retrievePag(initial, offset, limitPage, currentPage, function (lugar) {
    if (lugar) {
      var totalPage = lugar.count/limitPage;
      var count = lugar.count
      res.render('web/lugar/list.ejs', {
        lugar: lugar.rows,
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
  var lugar = Museo.Lugar.build();

  lugar.localidad = req.body.localidad;
  lugar.codigoLocalidad = req.body.codigoLocalidad;
  lugar.municipio = req.body.municipio;
  lugar.provincia = req.body.provincia;
  lugar.codigoProvincia = req.body.codigoProvincia;
  lugar.departamento = req.body.departamento;

  lugar.updateById(req.params.lugarId, function (success) {
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
  var lugar = Museo.Lugar.build();

  lugar.retrieveById(req.params.lugarId, function (lugarq) {
    if (lugarq) {
      res.render('web/lugar/edit', {lugar:lugarq});
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
  var lugar = Museo.Lugar.build();

  lugar.removeById(req.params.lugarId, function (lugar) {
    if (lugar) {
      res.redirect('/web/lugar');
    } else {
      res.send(401, 'Lugar no encontrado');
    }
  }, function (error) {
    res.send('Lugar no encontrado');
  });
};
