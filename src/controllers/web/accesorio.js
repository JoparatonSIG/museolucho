'use strict';

// NIVEL CRUD
var Model = require('../../models/model');


// (para agregar un nuevo accesorio)
// GET /accesorio
exports.getForm = function (req, res) {
  var accesorio = Model.Accesorio.build();
  res.render('web/accesorio/add', { accesorio: accesorio});
};

// Rutas que terminan en /accesorio
// POST /accesorio
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var objetoCodigo = req.body.objetoCodigo;
  var relacion = req.body.relacion;

  var accesorio = Model.Accesorio.build({
    objetoCodigo: objetoCodigo,
    relacion: relacion
  });

  accesorio.add(function (success) {
    res.redirect( '/web/accesorio');
  },
  function (err) {
    res.redirect( '/web/accesorio');
    // res.send(err);
  });
};
// (trae todos los accesorio)
// GET /accesorio
exports.listPag = function (req, res) {
  var accesorio = Model.Accesorio.build();
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

  accesorio.retrievePag(initial, offset, limitPage, currentPage, function (accesorio) {
    if (accesorio) {
      var totalPage = accesorio.count/limitPage;
      var count = accesorio.count
      res.render('web/accesorio/list.ejs', {
        accesorios: accesorio.rows,
        activePage: currentPage,
        totalPage: totalPage,
        count: count,
        limitPage: limitPage
      });
    } else {
      res.send(401, 'No se encontraron Accesorio');
    }
  }, function (error) {
    console.log(error);
    res.send('Accesorio no encontrado');
  });
};
// Rutas que terminan en /accesorio/:accesorioId
// PUT /accesorio/:accesorioId
// Actualiza accesorio
exports.update = function (req, res) {
  var accesorio = Model.Accesorio.build();
  accesorio.id = req.body.id;
  accesorio.objetoCodigo = req.body.objetoCodigo;
  accesorio.relacion = req.body.relacion;

  accesorio.updateById(accesorio.id,  function (success) {
    console.log(success);
    if (success) {
      res.redirect('/web/accesorio');
    } else {
      console.log(success);
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Accesorio no encontrado');
  });
};
// GET /accesorio/:accesorioId
// Toma un accesorio por id
exports.read = function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.retrieveById(req.params.accesorioId, function (accesorioq) {
    if (accesorioq) {
      res.render('web/accesorio/edit', {accesorio:accesorioq});
    } else {
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
};
// DELETE /accesorio/accesorioId
// Borra el accesorioId
exports.delete = function (req, res) {
  var accesorio = Model.Accesorio.build();

  accesorio.removeById(req.params.accesorioId, function (accesorio) {
    if (accesorio) {
      res.redirect( '/web/accesorio');
    } else {
      res.send(401, 'Accesorio no encontrado');
    }
  }, function (error) {
    res.send('Accesorio no encontrado');
  });
};
