'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /obras
// router.route('/obra') */

// POST /obras
router.post('/', function (req, res) {
	// bodyParser debe hacer la magia
	var email = req.body.email;
	var nombre = req.body.nombre;
	var password = req.body.password;

	var obra = Museo.Obra.build({ email: email, password: password });

	obra.add(function (success) {
		res.json({ message: 'Obra creado!' });
	},
	function (err) {
		res.send(err);
	});
});

/* (trae todos los obras)
// GET /obra */

router.get('/', function (req, res) {

	var obra = Museo.Obra.build();

	obra.retrieveAll(function (obras) {
		if (obras) {
			res.json(obras);
		} else {
			res.send(401, 'No se encontraron Obras');
		}
	}, function (error) {
		res.send('Obra no encontrado');
	});
});

/* Rutas que terminan en /obras/:obrasId
// router.route('/obra/:obraId')
// PUT /obras/:obraId
// Actualiza obra */

router.put('/:obraId', function (req, res) {
	var obra = Museo.Obra.build();

	obra.email = req.body.email;
	obra.nombre = req.body.nombre;
	obra.password = req.body.password;

	obra.updateById(req.params.obraId, function (success) {
		if (success) {
			res.json({ message: 'Obra actualizado!' });
		} else {
			res.send(401, 'Obra no encontrado');
		}
		}, function (error) {
			res.send('Obra no encontrado');
	});
});

// GET /obra/:obraId
// Toma un obra por id
router.get('/:obraId', function (req, res) {
	var obra = Museo.Obra.build();

	obra.retrieveById(req.params.obraId, function (obra) {
		if (obra) {
			res.json(obra);
		} else {
			res.send(401, 'Obra no encontrado');
		}
		}, function (error) {
			res.send('Obra no encontrado');
	});
});

// DELETE /obra/obraId
// Borra el obraId
router.delete('/:obraId', function (req, res) {
	var obra = Museo.Obra.build();

	obra.removeById(req.params.obraId, function (obra) {
		if (obra) {
			res.json({ message: 'Obra borrado!' });
		} else {
			res.send(401, 'Obra no encontrado');
		}
		}, function (error) {
			res.send('Obra no encontrado');
	});
});

module.exports = router;
