'use strict';

// ACCESORIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* Rutas que terminan en /accesorios
// router.route('/accesorio') */

// POST /accesorios
router.post('/accesorio', function (req, res) {
	// bodyParser debe hacer la magia
	var email = req.body.email;
	var nombre = req.body.nombre;
	var password = req.body.password;

	var accesorio = Museo.Accesorio.build({ email: email, password: password });

	accesorio.add(function (success) {
		res.json({ message: 'Accesorio creado!' });
	},
	function (err) {
		res.send(err);
	});
});

/* (trae todos los accesorios)
// GET /accesorio */
router.get('/accesorio', function (req, res) {
	var accesorio = Museo.Accesorio.build();

	accesorio.retrieveAll(function (accesorios) {
		if (accesorios) {
			res.json(accesorios);
		} else {
			res.send(401, 'No se encontraron Accesorios');
		}
	}, function (error) {
		res.send('Accesorio no encontrado');
	});
});

/* Rutas que terminan en /accesorios/:accesoriosId
// router.route('/accesorio/:accesorioId')
// PUT /accesorios/:accesorioId
// Actualiza accesorio */

router.put('/accesorio/:accesorioId', function (req, res) {
	var accesorio = Museo.Accesorio.build();

	accesorio.email = req.body.email;
	accesorio.nombre = req.body.nombre;
	accesorio.password = req.body.password;

	accesorio.updateById(req.params.accesorioId, function (success) {
		if (success) {
			res.json({ message: 'Accesorio actualizado!' });
		} else {
			res.send(401, 'Accesorio no encontrado');
		}
		}, function (error) {
			res.send('Accesorio no encontrado');
	});
});

// GET /accesorio/:accesorioId
// Toma un accesorio por id
router.get('/accesorio/:accesorioId', function (req, res) {
	var accesorio = Museo.Accesorio.build();

	accesorio.retrieveById(req.params.accesorioId, function (accesorio) {
		if (accesorio) {
			res.json(accesorio);
		} else {
			res.send(401, 'Accesorio no encontrado');
		}
		}, function (error) {
			res.send('Accesorio no encontrado');
	});
});

// DELETE /accesorio/accesorioId
// Borra el accesorioId
router.delete('/accesorio/:accesorioId', function (req, res) {
	var accesorio = Museo.Accesorio.build();

	accesorio.removeById(req.params.accesorioId, function (accesorio) {
		if (accesorio) {
			res.json({ message: 'Accesorio borrado!' });
		} else {
			res.send(401, 'Accesorio no encontrado');
		}
		}, function (error) {
			res.send('Accesorio no encontrado');
	});
});

module.exports = router;
