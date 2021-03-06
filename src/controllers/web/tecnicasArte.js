'use strict';

// USUARIOS CRUD
var Museo = require('../../models/model');

/* Rutas que terminan en /tecnicaArtes
// router.route('/tecnicaArte') */

// POST /tecnicaArtes
exports.create = function (req, res) {
  // bodyParser debe hacer la magia
  var tecnicaArtereq = req.body.tecnicaArte;

  var tecnicaArte = Museo.TecnicaArte.build({
    tecnicaArte: tecnicaArtereq
  });

  tecnicaArte.add(function (success) {
    res.render({ message: 'TecnicaArte creado!' });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los tecnicaArtes)
// GET /tecnicaArte */
exports.list = function (req, res) {
  var tecnicaArte = Museo.TecnicasArte.build();

  tecnicaArte.retrieveAll(function (tecnicasArtes) {
    if (tecnicasArtes) {
      res.render('web/tecnicasArte/list.ejs', { tecnicasArtes: tecnicasArtes});
    } else {
      res.send(401, 'No se encontraron TecnicaArtes');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
};

/* Rutas que terminan en /tecnicaArtes/:tecnicaArtesId
// router.route('/tecnicaArte/:tecnicaArteId')
// PUT /tecnicaArtes/:tecnicaArteId
// Actualiza tecnicaArte */

exports.update = function (req, res) {
  var tecnicaArte = Museo.TecnicaArte.build();

  tecnicaArte.tecnicaArte = req.body.tecnicaArte;

  tecnicaArte.updateById(req.params.tecnicaArteId, function (success) {
    if (success) {
      res.render({ message: 'TecnicaArte actualizado!' });
    } else {
      res.send(401, 'TecnicaArte no encontrado');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
};

// GET /tecnicaArte/:tecnicaArteId
// Toma un tecnicaArte por id
exports.read = function (req, res) {
  var tecnicaArte = Museo.TecnicasArte.build();

  tecnicaArte.retrieveById(req.params.tecnicaArteId, function (tecnicaArteq) {
    if (tecnicaArteq) {
      res.render('web/tecnicasArte/edit.ejs', {tecnicaArte:tecnicaArteq});
    } else {
      res.send(401, 'Tecnica Arte NO encontrado');
    }
  }, function (error) {
    res.send('Tecnica Arte no encontrado');
  });
};

// DELETE /tecnicaArte/tecnicaArteId
// Borra el tecnicaArteId
exports.delete = function (req, res) {
  var tecnicaArte = Museo.TecnicaArte.build();

  tecnicaArte.removeById(req.params.tecnicaArteId, function (tecnicaArte) {
    if (tecnicaArte) {
      res.json({ message: 'TecnicaArte borrado!' });
    } else {
      res.send(401, 'TecnicaArte no encontrado');
    }
  }, function (error) {
    res.send('TecnicaArte no encontrado');
  });
};
