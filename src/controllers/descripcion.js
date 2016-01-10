'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /descripciones
// router.route('/descripcion') */

// POST /descripciones
router.post('/', function (req, res) {
	// bodyParser debe hacer la magia
	var email = req.body.email;
	var nombre = req.body.nombre;
	var password = req.body.password;

	var descripcion = Museo.Descripcion.build({ email: email, password: password });

	descripcion.add(function (success) {
		res.json({ message: 'Descripcion creado!' });
	},
	function (err) {
		res.send(err);
	});
});

/* (trae todos los descripciones)
// GET /descripcion */
router.get('/', function (req, res) {
	var descripcion = Museo.Descripcion.build();

	descripcion.retrieveAll(function (descripciones) {
		if (descripciones) {
			res.json(descripciones);
		} else {
			res.send(401, 'No se encontraron Descripciones');
		}
	}, function (error) {
		res.send('Descripcion no encontrado');
	});
});

/* Rutas que terminan en /descripciones/:descripcionesId
// router.route('/descripcion/:descripcionId')
// PUT /descripciones/:descripcionId
// Actualiza descripcion */

router.put('/:descripcionId', function (req, res) {
	var descripcion = Museo.Descripcion.build();

	descripcion.email = req.body.email;
	descripcion.nombre = req.body.nombre;
	descripcion.password = req.body.password;

	descripcion.updateById(req.params.descripcionId, function (success) {
		if (success) {
			res.json({ message: 'Descripcion actualizado!' });
		} else {
			res.send(401, 'Descripcion no encontrado');
		}
		}, function (error) {
			res.send('Descripcion no encontrado');
	});
});

// GET /descripcion/:descripcionId
// Toma un descripcion por id
router.get('/:descripcionId', function (req, res) {
	var descripcion = Museo.Descripcion.build();

	descripcion.retrieveById(req.params.descripcionId, function (descripcion) {
		if (descripcion) {
			res.json(descripcion);
		} else {
			res.send(401, 'Descripcion no encontrado');
		}
		}, function (error) {
			res.send('Descripcion no encontrado');
	});
});

// DELETE /descripcion/descripcionId
// Borra el descripcionId
router.delete('/:descripcionId', function (req, res) {
	var descripcion = Museo.Descripcion.build();

	descripcion.removeById(req.params.descripcionId, function (descripcion) {
		if (descripcion) {
			res.json({ message: 'Descripcion borrado!' });
		} else {
			res.send(401, 'Descripcion no encontrado');
		}
		}, function (error) {
			res.send('Descripcion no encontrado');
	});
});

module.exports = router;
