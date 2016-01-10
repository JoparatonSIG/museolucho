'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /tipoAnalisis
// router.route('/tipoAnalisis') */

// POST /tipoAnalisis
router.post('/', function (req, res) {
	// bodyParser debe hacer la magia
	var email = req.body.email;
	var nombre = req.body.nombre;
	var password = req.body.password;

	var tipoAnalisis = Museo.TipoAnalisis.build({ email: email, password: password });

	tipoAnalisis.add(function (success) {
		res.json({ message: 'TipoAnalisis creado!' });
	},
	function (err) {
		res.send(err);
	});
});

/* (trae todos los tipoAnalisis)
// GET /tipoAnalisis */
router.get('/', function (req, res) {
	var tipoAnalisis = Museo.TipoAnalisis.build();

	tipoAnalisis.retrieveAll(function (tipoAnalisis) {
		if (tipoAnalisis) {
			res.json(tipoAnalisis);
		} else {
			res.send(401, 'No se encontraron TipoAnalisis');
		}
	}, function (error) {
		res.send('TipoAnalisis no encontrado');
	});
});

/* Rutas que terminan en /tipoAnalisis/:tipoAnalisisId
// router.route('/tipoAnalisis/:tipoAnalisisId')
// PUT /tipoAnalisis/:tipoAnalisisId
// Actualiza tipoAnalisis */

router.put('/:tipoAnalisisId', function (req, res) {
	var tipoAnalisis = Museo.TipoAnalisis.build();

	tipoAnalisis.email = req.body.email;
	tipoAnalisis.nombre = req.body.nombre;
	tipoAnalisis.password = req.body.password;

	tipoAnalisis.updateById(req.params.tipoAnalisisId, function (success) {
		if (success) {
			res.json({ message: 'TipoAnalisis actualizado!' });
		} else {
			res.send(401, 'TipoAnalisis no encontrado');
		}
		}, function (error) {
			res.send('TipoAnalisis no encontrado');
	});
});

// GET /tipoAnalisis/:tipoAnalisisId
// Toma un tipoAnalisis por id
router.get('/:tipoAnalisisId', function (req, res) {
	var tipoAnalisis = Museo.TipoAnalisis.build();

	tipoAnalisis.retrieveById(req.params.tipoAnalisisId, function (tipoAnalisis) {
		if (tipoAnalisis) {
			res.json(tipoAnalisis);
		} else {
			res.send(401, 'TipoAnalisis no encontrado');
		}
		}, function (error) {
			res.send('TipoAnalisis no encontrado');
	});
});

// DELETE /tipoAnalisis/tipoAnalisisId
// Borra el tipoAnalisisId
router.delete('/:tipoAnalisisId', function (req, res) {
	var tipoAnalisis = Museo.TipoAnalisis.build();

	tipoAnalisis.removeById(req.params.tipoAnalisisId, function (tipoAnalisis) {
		if (tipoAnalisis) {
			res.json({ message: 'TipoAnalisis borrado!' });
		} else {
			res.send(401, 'TipoAnalisis no encontrado');
		}
		}, function (error) {
			res.send('TipoAnalisis no encontrado');
	});
});

module.exports = router;
