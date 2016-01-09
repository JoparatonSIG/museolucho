'use strict';

// ACCESORIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /analisiss
// router.route('/analisis') */

// POST /analisiss
router.post('/analisis', function (req, res) {
	// bodyParser debe hacer la magia
	var email = req.body.email;
	var nombre = req.body.nombre;
	var password = req.body.password;

	var analisis = Museo.Analisis.build({ email: email, password: password });

	analisis.add(function (success) {
		res.json({ message: 'Analisis creado!' });
	},
	function (err) {
		res.send(err);
	});
});

/* (trae todos los analisiss)
// GET /analisis */
router.get('/analisis', function (req, res) {
	var analisis = Museo.Analisis.build();

	analisis.retrieveAll(function (analisiss) {
		if (analisis) {
			res.json(analisis);
		} else {
			res.send(401, 'No se encontraron Analisis');
		}
	}, function (error) {
		res.send('Analisis no encontrado');
	});
});

/* Rutas que terminan en /analisis/:analisisId
// router.route('/analisis/:analisisId')
// PUT /analisis/:analisisId
// Actualiza analisis */

router.put('/analisis/:analisisId', function (req, res) {
	var analisis = Museo.Analisis.build();

	analisis.email = req.body.email;
	analisis.nombre = req.body.nombre;
	analisis.password = req.body.password;

	analisis.updateById(req.params.analisisId, function (success) {
		if (success) {
			res.json({ message: 'Analisis actualizado!' });
		} else {
			res.send(401, 'Analisis no encontrado');
		}
		}, function (error) {
			res.send('Analisis no encontrado');
	});
});

// GET /analisis/:analisisId
// Toma un analisis por id
router.get('/analisis/:analisisId', function (req, res) {
	var analisis = Museo.Analisis.build();

	analisis.retrieveById(req.params.analisisId, function (analisis) {
		if (analisis) {
			res.json(analisis);
		} else {
			res.send(401, 'Analisis no encontrado');
		}
		}, function (error) {
			res.send('Analisis no encontrado');
	});
});

// DELETE /analisis/analisisId
// Borra el analisisId
router.delete('/analisis/:analisisId', function (req, res) {
	var analisis = Museo.Analisis.build();

	analisis.removeById(req.params.analisisId, function (analisis) {
		if (analisis) {
			res.json({ message: 'Analisis borrado!' });
		} else {
			res.send(401, 'Analisis no encontrado');
		}
		}, function (error) {
			res.send('Analisis no encontrado');
	});
});

module.exports = router;