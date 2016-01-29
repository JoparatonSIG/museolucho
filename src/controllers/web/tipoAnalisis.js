'use strict';

// NIVEL CRUD
var Model = require('../../models/model');

// (trae todos los museos)
// GET /museo


exports.getForm = function (req, res) {
  var tipoanalisis = Model.TipoAnalisis.build();
  res.render('web/tipoanalisis/add', { tipoanalisis: tipoanalisis});
};

exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var tipo = req.body.tipo;
  var subTipo = req.body.subTipo;
  var valorPredeterminado = req.body.valorPredeterminado;

  var tipoanalisis = Model.TipoAnalisis.build({
    tipo: tipo,
    subTipo: subTipo,
    valorPredeterminado:valorPredeterminado
  });

  tipoanalisis.add(function (success) {
    res.redirect( '/web/tipoanalisis');
  },
  function (err) {
    res.redirect( '/web/tipoanalisis');
    // res.send(err);
  });
};
// (trae todos los museos)
// GET /museo
exports.getId = function (req, res) {
  res.render('web/tipoanalisis/ask');
};

exports.getDetails = function (req, res) {
  var tipoAnalisisDB = Model.TipoAnalisis.build();
  tipoAnalisisDB.id = req.body.id;

  tipoAnalisisDB.retrieveRelatedById(function (tipoAnalisisQ) {
    if (tipoAnalisisQ) {
      res.render('web/tipoanalisis/details', {tipoAnalisisEJS:tipoAnalisisQ});
    } else {
      console.log(success);
      res.send(401, 'Tipo de analisis no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Tipo de analisis no encontrado');
  });
};
// (trae todos los museos)
// GET /museo
exports.listPag = function (req, res) {
  var tipoanalisis = Model.TipoAnalisis.build();

  tipoanalisis.retrieveAll(function (tipoanalisis) {
    if (tipoanalisis) {
      res.render('web/tipoanalisis/list', { tipoanalisis: tipoanalisis});
    } else {
      res.send(401, 'No se encontraron tipos de analisis');
    }
  }, function (error) {
    res.send('Tipo de analisis no encontrado');
  });
};
// Rutas que terminan en /museo/:museoId
// PUT /museo/:museoId
// Actualiza museo
exports.update = function (req, res) {
  var tipoanalisis = Model.TipoAnalisis.build();
  tipoanalisis.id = req.body.id;
  tipoanalisis.tipo = req.body.tipo;
  tipoanalisis.subTipo = req.body.subTipo;
  tipoanalisis.valorPredeterminado = req.body.valorPredeterminado;

  tipoanalisis.updateById(tipoanalisis.id,  function (success) {
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
};
// GET /museo/:museoId
// Toma un museo por id
exports.read = function (req, res) {
  var tipoanalisis = Model.TipoAnalisis.build();

  tipoanalisis.retrieveById(req.params.tipoanalisisId, function (tipoanalisisq) {
    if (tipoanalisisq) {
      res.render('web/tipoanalisis/edit', {tipoanalisis:tipoanalisisq});
    } else {
      res.send(401, 'Tipo de analisis no encontrado');
    }
  }, function (error) {
    res.send('Tipo de analisis no encontrado');
  });
};
// DELETE /museo/museoId
// Borra el museoId
exports.delete = function (req, res) {
  var tipoanalisis = Model.TipoAnalisis.build();
  console.log(req.params);
  tipoanalisis.removeById(req.params.tipoanalisisId, function (tipoanalisis) {
    if (tipoanalisis) {
      res.redirect('/web/tipoanalisis');
    } else {
      res.send(401, 'Tipo de analisis no encontrado');
    }
  }, function (error) {
    res.send('Tipo de analisis no encontrado');
  });
};
