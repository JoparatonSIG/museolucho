var express = require('express');
var RoutesWEB = express.Router();

var accesorio = require('./web/accesorio');
var adquisicion = require('./web/adquisicion');
var analisis = require('./web/analisis');
var conservacion = require('./web/conservacion');
var descripcion = require('./web/descripcion');
var espacio = require('./web/espacio');
var especialidad = require('./web/especialidad');
var estructura = require('./web/estructura');
var fotografia = require('./web/fotografia');
var intervencion = require('./web/intervencion');
var lugar = require('./web/lugar');
var nivel = require('./web/nivel');
var tecnicasArte = require('./web/tecnicasArte');
var tipoAnalisis = require('./web/tipoAnalisis');
var ubicacion = require('./web/ubicacion');
var usuario = require('./web/usuario');

/*
  este router va a estar montado bajo /api, es decir router.use( '/usuario', usuario )
  va a montar el controlador usuario bajo /api/usuario.
*/
RoutesWEB.get('/accesorio/', accesorio.getForm);
RoutesWEB.get('/accesorio/', accesorio.listPag);
RoutesWEB.post('/accesorio/', accesorio.create);
RoutesWEB.get('/accesorio/:accesorioId', accesorio.read);
RoutesWEB.put('/accesorio/:accesorioId', accesorio.update);
RoutesWEB.delete('/accesorio/:accesorioId', accesorio.delete);

module.exports = RoutesWEB;
