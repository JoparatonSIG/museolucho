var express = require('express');
var RoutesWEB = express.Router();

var sesion = require('./sesion');

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
RoutesWEB.get('/accesorio/form', sesion.isLogged, accesorio.getForm);
RoutesWEB.get('/accesorio/', sesion.isLogged, accesorio.listPag);
RoutesWEB.post('/accesorio/', sesion.isLogged, accesorio.create);
RoutesWEB.get('/accesorio/:accesorioId', sesion.isLogged, accesorio.read);
RoutesWEB.put('/accesorio/:accesorioId', sesion.isLogged, accesorio.update);
RoutesWEB.delete('/accesorio/:accesorioId', sesion.isLogged, accesorio.delete);

RoutesWEB.get('/adquisicion/form', sesion.isLogged, adquisicion.getForm);
RoutesWEB.get('/adquisicion/', sesion.isLogged, adquisicion.listPag);
RoutesWEB.post('/adquisicion/', sesion.isLogged, adquisicion.create);
RoutesWEB.get('/adquisicion/:adquisicionId', sesion.isLogged, adquisicion.read);
RoutesWEB.put('/adquisicion/:adquisicionId', sesion.isLogged, adquisicion.update);
RoutesWEB.delete('/adquisicion/:adquisicionId', sesion.isLogged, adquisicion.delete);

RoutesWEB.get('/analisis/form', sesion.isLogged, analisis.getForm);
RoutesWEB.get('/analisis/', sesion.isLogged, analisis.listPag);
RoutesWEB.post('/analisis/', sesion.isLogged, analisis.create);
RoutesWEB.get('/analisis/:analisisId', sesion.isLogged, analisis.read);
RoutesWEB.put('/analisis/:analisisId', sesion.isLogged, analisis.update);
RoutesWEB.delete('/analisis/:analisisId', sesion.isLogged, analisis.delete);

RoutesWEB.get('/conservacion/form', sesion.isLogged, conservacion.getForm);
RoutesWEB.get('/conservacion/', sesion.isLogged, conservacion.listPag);
RoutesWEB.post('/conservacion/', sesion.isLogged, conservacion.create);
RoutesWEB.get('/conservacion/:conservacionId', sesion.isLogged, conservacion.read);
RoutesWEB.put('/conservacion/:conservacionId', sesion.isLogged, conservacion.update);
RoutesWEB.delete('/conservacion/:conservacionId', sesion.isLogged, conservacion.delete);

RoutesWEB.get('/usuario/', sesion.isLogged, usuario.list);
RoutesWEB.get('/usuario/', sesion.isLogged, usuario.listPag);
RoutesWEB.post('/usuario/', sesion.isLogged, usuario.create);
RoutesWEB.get('/usuario/:usuarioId', sesion.isLogged, usuario.read);
RoutesWEB.put('/usuario/:usuarioId', sesion.isLogged, usuario.update);
RoutesWEB.delete('/usuario/:usuarioId', sesion.isLogged, usuario.delete);

RoutesWEB.get('/login/', sesion.index);
RoutesWEB.post('/login/', sesion.create);

module.exports = RoutesWEB;
