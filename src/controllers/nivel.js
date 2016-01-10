'use strict';

// NIVEL CRUD

var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

// Rutas que terminan en /nivel

// POST /nivel
router.post('/', function (req, res) {
	// bodyParser debe hacer la magia
	var categoria = req.body.categoria;
	var nivel = Museo.Nivel.build({ categoria: categoria });

	nivel.add(function (success) {
		res.json( { message: 'Nivel creado!' } );
	},
	function (err) {
		res.send(err);
	});
});

// (trae todos los niveles)
// GET /nivel
router.get('/', function (req, res) {
	var nivel = Museo.Nivel.build();

	nivel.retrieveAll(function (niveles) {
		if (niveles) {
			res.json(niveles);
		} else {
			res.send(401, 'No se encontraron Niveles');
		}
		}, function (error) {
			res.send('Nivel no encontrado');
	});
});

// Rutas que terminan en /nivel/:nivelId

// PUT /nivel/:nivelId
// Actualiza nivel
router.put('/:nivelId', function (req, res) {
	var nivel = Museo.Nivel.build();
	nivel.categoria = req.body.categoria;

	nivel.updateById(req.params.nivelId, function (success) {
		console.log(success);
		if (success) {
			res.json({ message: 'Nivel actualizado!' });
		} else {
			res.send(401, 'Nivel no encontrado');
		}
	}, function (error) {
		res.send('Nivel no encontrado');
	});
});

// GET /nivel/:nivelId
// Toma un nivel por id
router.get('/:nivelId', function (req, res) {
	var nivel = Museo.Nivel.build();

	nivel.retrieveById(req.params.nivelId, function (nivel) {
		if (nivel) {
			res.json(nivel);
		} else {
			res.send(401, 'Nivel no encontrado');
		}
	}, function (error) {
		res.send('Nivel no encontrado');
	});
});

// DELETE /nivel/nivelId
// Borra el nivelId
router.delete('/:nivelId', function (req, res) {
	var nivel = Museo.Nivel.build();

	nivel.removeById(req.params.nivelId, function (nivel) {
		if (nivel) {
			res.json({ message: 'Nivel borrado!' });
		} else {
			res.send(401, 'Nivel no encontrado');
		}
	}, function (error) {
		res.send('Nivel no encontrado');
	});
});

module.exports = router;
