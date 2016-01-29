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
var museo = require('./web/museo');
var nivel = require('./web/nivel');
var relevamiento = require('./web/relevamiento');
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

RoutesWEB.get('/descripcion/form', sesion.isLogged, descripcion.getForm);
RoutesWEB.get('/descripcion/', sesion.isLogged, descripcion.listPag);
RoutesWEB.post('/descripcion/', sesion.isLogged, descripcion.create);
RoutesWEB.get('/descripcion/:descripcionId', sesion.isLogged, descripcion.read);
RoutesWEB.put('/descripcion/:descripcionId', sesion.isLogged, descripcion.update);
RoutesWEB.delete('/descripcion/:descripcionId', sesion.isLogged, descripcion.delete);

RoutesWEB.get('/espacio/form',  espacio.getForm);
RoutesWEB.get('/espacio/',  espacio.listPag);
RoutesWEB.post('/espacio/',  espacio.create);
RoutesWEB.get('/espacio/:espacioId',  espacio.read);
RoutesWEB.put('/espacio/:espacioId', espacio.update);
RoutesWEB.delete('/espacio/:espacioId',  espacio.delete);

RoutesWEB.get('/especialidad/form', sesion.isLogged, especialidad.getForm);
RoutesWEB.get('/especialidad/', sesion.isLogged, especialidad.listPag);
RoutesWEB.post('/especialidad/', sesion.isLogged, especialidad.create);
RoutesWEB.get('/especialidad/:especialidadId', sesion.isLogged, especialidad.read);
RoutesWEB.put('/especialidad/:especialidadId', sesion.isLogged, especialidad.update);
RoutesWEB.delete('/especialidad/:especialidadId', sesion.isLogged, especialidad.delete);

RoutesWEB.get('/estructura/form', estructura.getForm);
RoutesWEB.get('/estructura/', estructura.listPag);
RoutesWEB.post('/estructura/',  estructura.create);
RoutesWEB.get('/estructura/:estructuraId',  estructura.read);
RoutesWEB.put('/estructura/:estructuraId',  estructura.update);
RoutesWEB.delete('/estructura/:estructuraId',  estructura.delete);

RoutesWEB.get('/fotografia/form', sesion.isLogged, fotografia.getForm);
RoutesWEB.get('/fotografia/', sesion.isLogged, fotografia.listPag);
RoutesWEB.post('/fotografia/', sesion.isLogged, fotografia.create);
RoutesWEB.get('/fotografia/:fotografiaId', sesion.isLogged, fotografia.read);
RoutesWEB.put('/fotografia/:fotografiaId', sesion.isLogged, fotografia.update);
RoutesWEB.delete('/fotografia/:fotografiaId', sesion.isLogged, fotografia.delete);

RoutesWEB.get('/intervencion/form', sesion.isLogged, intervencion.getForm);
RoutesWEB.get('/intervencion/', sesion.isLogged, intervencion.listPag);
RoutesWEB.post('/intervencion/', sesion.isLogged, intervencion.create);
RoutesWEB.get('/intervencion/:intervencionId', sesion.isLogged, intervencion.read);
RoutesWEB.put('/intervencion/:intervencionId', sesion.isLogged, intervencion.update);
RoutesWEB.delete('/intervencion/:intervencionId', sesion.isLogged, intervencion.delete);

RoutesWEB.get('/lugar/form', sesion.isLogged, lugar.getForm);
RoutesWEB.get('/lugar/', sesion.isLogged, lugar.listPag);
RoutesWEB.post('/lugar/', sesion.isLogged, lugar.create);
RoutesWEB.get('/lugar/:lugarId', sesion.isLogged, lugar.read);
RoutesWEB.put('/lugar/:lugarId', sesion.isLogged, lugar.update);
RoutesWEB.delete('/lugar/:lugarId', sesion.isLogged, lugar.delete);

RoutesWEB.get('/museo/form', sesion.isLogged, museo.getForm);
RoutesWEB.get('/museo/', sesion.isLogged, museo.list);
RoutesWEB.post('/museo/', sesion.isLogged, museo.create);
RoutesWEB.get('/museo/:museoId', sesion.isLogged, museo.read);
RoutesWEB.put('/museo/:museoId', sesion.isLogged, museo.update);
RoutesWEB.delete('/museo/:museoId', sesion.isLogged, museo.delete);

RoutesWEB.get('/nivel/form', sesion.isLogged, nivel.getForm);
RoutesWEB.get('/nivel/', sesion.isLogged, nivel.listPag);
RoutesWEB.post('/nivel/', sesion.isLogged, nivel.create);
RoutesWEB.get('/nivel/:nivelId', sesion.isLogged, nivel.read);
RoutesWEB.put('/nivel/:nivelId', sesion.isLogged, nivel.update);
RoutesWEB.delete('/nivel/:nivelId', sesion.isLogged, nivel.delete);

RoutesWEB.get('/relevamiento/form', sesion.isLogged, relevamiento.getForm);
RoutesWEB.get('/relevamiento/', sesion.isLogged, relevamiento.listPag);
RoutesWEB.post('/relevamiento/', sesion.isLogged, relevamiento.create);
RoutesWEB.get('/relevamiento/:relevamientoId', sesion.isLogged, relevamiento.read);
RoutesWEB.put('/relevamiento/:relevamientoId', sesion.isLogged, relevamiento.update);
RoutesWEB.delete('/relevamiento/:relevamientoId', sesion.isLogged, relevamiento.delete);

RoutesWEB.get('/tecnicasArte/', sesion.isLogged, tecnicasArte.list);
RoutesWEB.post('/tecnicasArte/', sesion.isLogged, tecnicasArte.create);
RoutesWEB.get('/tecnicasArte/:tecnicasArteId', sesion.isLogged, tecnicasArte.read);
RoutesWEB.put('/tecnicasArte/:tecnicasArteId', sesion.isLogged, tecnicasArte.update);
RoutesWEB.delete('/tecnicasArte/:tecnicasArteId', sesion.isLogged, tecnicasArte.delete);

RoutesWEB.get('/tipoAnalisis/getId', sesion.isLogged, tipoAnalisis.getId);
RoutesWEB.get('/tipoAnalisis/form', sesion.isLogged, tipoAnalisis.getForm);
RoutesWEB.get('/tipoAnalisis/getDetails', sesion.isLogged, tipoAnalisis.getDetails);
RoutesWEB.get('/tipoAnalisis/', sesion.isLogged, tipoAnalisis.listPag);
RoutesWEB.post('/tipoAnalisis/', sesion.isLogged, tipoAnalisis.create);
RoutesWEB.get('/tipoAnalisis/:tipoAnalisisId', sesion.isLogged, tipoAnalisis.read);
RoutesWEB.put('/tipoAnalisis/:tipoAnalisisId', sesion.isLogged, tipoAnalisis.update);
RoutesWEB.delete('/tipoAnalisis/:tipoAnalisisId', sesion.isLogged, tipoAnalisis.delete);

RoutesWEB.get('/ubicacion/form', sesion.isLogged, ubicacion.getForm);
RoutesWEB.get('/ubicacion/', sesion.isLogged, ubicacion.listPag);
RoutesWEB.post('/ubicacion/', sesion.isLogged, ubicacion.create);
RoutesWEB.get('/ubicacion/:ubicacionId', sesion.isLogged, ubicacion.read);
RoutesWEB.put('/ubicacion/:ubicacionId', sesion.isLogged, ubicacion.update);
RoutesWEB.delete('/ubicacion/:ubicacionId', sesion.isLogged, ubicacion.delete);


RoutesWEB.get('/usuario/', sesion.isLogged, usuario.list);
RoutesWEB.get('/usuario/', sesion.isLogged, usuario.listPag);
RoutesWEB.post('/usuario/', sesion.isLogged, usuario.create);
RoutesWEB.get('/usuario/:usuarioId', sesion.isLogged, usuario.read);
RoutesWEB.put('/usuario/:usuarioId', sesion.isLogged, usuario.update);
RoutesWEB.delete('/usuario/:usuarioId', sesion.isLogged, usuario.delete);



RoutesWEB.get('/login/', sesion.index);
RoutesWEB.post('/login/', sesion.create);

module.exports = RoutesWEB;
