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
RoutesWEB.get('/accesorio/form', accesorio.getForm);
RoutesWEB.get('/accesorio/', accesorio.listPag);
RoutesWEB.post('/accesorio/', accesorio.create);
RoutesWEB.get('/accesorio/:accesorioId', accesorio.read);
RoutesWEB.put('/accesorio/:accesorioId', accesorio.update);
RoutesWEB.delete('/accesorio/:accesorioId', accesorio.delete);

RoutesWEB.get('/adquisicion/form', adquisicion.getForm);
RoutesWEB.get('/adquisicion/', adquisicion.listPag);
RoutesWEB.post('/adquisicion/', adquisicion.create);
RoutesWEB.get('/adquisicion/:adquisicionId', adquisicion.read);
RoutesWEB.put('/adquisicion/:adquisicionId', adquisicion.update);
RoutesWEB.delete('/adquisicion/:adquisicionId', adquisicion.delete);

RoutesWEB.get('/analisis/form', analisis.getForm);
RoutesWEB.get('/analisis/', analisis.listPag);
RoutesWEB.post('/analisis/', analisis.create);
RoutesWEB.get('/analisis/:analisisId', analisis.read);
RoutesWEB.put('/analisis/:analisisId', analisis.update);
RoutesWEB.delete('/analisis/:analisisId', analisis.delete);

RoutesWEB.get('/conservacion/form', conservacion.getForm);
RoutesWEB.get('/conservacion/', conservacion.listPag);
RoutesWEB.post('/conservacion/', conservacion.create);
RoutesWEB.get('/conservacion/:conservacionId', conservacion.read);
RoutesWEB.put('/conservacion/:conservacionId', conservacion.update);
RoutesWEB.delete('/conservacion/:conservacionId', conservacion.delete);

RoutesWEB.get('/descripcion/form', descripcion.getForm);
RoutesWEB.get('/descripcion/', descripcion.listPag);
RoutesWEB.post('/descripcion/', descripcion.create);
RoutesWEB.get('/descripcion/:descripcionId', descripcion.read);
RoutesWEB.put('/descripcion/:descripcionId', descripcion.update);
RoutesWEB.delete('/descripcion/:descripcionId', descripcion.delete);

RoutesWEB.get('/espacio/form',  espacio.getForm);
RoutesWEB.get('/espacio/',  espacio.listPag);
RoutesWEB.post('/espacio/',  espacio.create);
RoutesWEB.get('/espacio/:espacioId',  espacio.read);
RoutesWEB.put('/espacio/:espacioId', espacio.update);
RoutesWEB.delete('/espacio/:espacioId',  espacio.delete);

RoutesWEB.get('/especialidad/form', especialidad.getForm);
RoutesWEB.get('/especialidad/', especialidad.listPag);
RoutesWEB.post('/especialidad/', especialidad.create);
RoutesWEB.get('/especialidad/:especialidadId', especialidad.read);
RoutesWEB.put('/especialidad/:especialidadId', especialidad.update);
RoutesWEB.delete('/especialidad/:especialidadId', especialidad.delete);

RoutesWEB.get('/estructura/form', estructura.getForm);
RoutesWEB.get('/estructura/', estructura.listPag);
RoutesWEB.post('/estructura/',  estructura.create);
RoutesWEB.get('/estructura/:estructuraId',  estructura.read);
RoutesWEB.put('/estructura/:estructuraId',  estructura.update);
RoutesWEB.delete('/estructura/:estructuraId',  estructura.delete);

RoutesWEB.get('/fotografia/form', fotografia.getForm);
RoutesWEB.get('/fotografia/', fotografia.listPag);
RoutesWEB.post('/fotografia/', fotografia.create);
RoutesWEB.get('/fotografia/:fotografiaId', fotografia.read);
RoutesWEB.put('/fotografia/:fotografiaId', fotografia.update);
RoutesWEB.delete('/fotografia/:fotografiaId', fotografia.delete);

RoutesWEB.get('/intervencion/form', intervencion.getForm);
RoutesWEB.get('/intervencion/', intervencion.listPag);
RoutesWEB.post('/intervencion/', intervencion.create);
RoutesWEB.get('/intervencion/:intervencionId', intervencion.read);
RoutesWEB.put('/intervencion/:intervencionId', intervencion.update);
RoutesWEB.delete('/intervencion/:intervencionId', intervencion.delete);

RoutesWEB.get('/lugar/form', lugar.getForm);
RoutesWEB.get('/lugar/', lugar.listPag);
RoutesWEB.post('/lugar/',lugar.create);
RoutesWEB.get('/lugar/:lugarId', lugar.read);
RoutesWEB.put('/lugar/:lugarId',  lugar.update);
RoutesWEB.delete('/lugar/:lugarId', lugar.delete);

RoutesWEB.get('/museo/form', museo.getForm);
RoutesWEB.get('/museo/', museo.list);
RoutesWEB.post('/museo/', museo.create);
RoutesWEB.get('/museo/:museoId', museo.read);
RoutesWEB.put('/museo/:museoId', museo.update);
RoutesWEB.delete('/museo/:museoId', museo.delete);

RoutesWEB.get('/nivel/form', nivel.getForm);
RoutesWEB.get('/nivel/', nivel.listPag);
RoutesWEB.post('/nivel/', nivel.create);
RoutesWEB.get('/nivel/:nivelId', nivel.read);
RoutesWEB.put('/nivel/:nivelId', nivel.update);
RoutesWEB.delete('/nivel/:nivelId', nivel.delete);

RoutesWEB.get('/relevamiento/form',  relevamiento.getForm);
RoutesWEB.get('/relevamiento/',  relevamiento.listPag);
RoutesWEB.post('/relevamiento/', relevamiento.create);
RoutesWEB.get('/relevamiento/:relevamientoId',  relevamiento.read);
RoutesWEB.put('/relevamiento/:relevamientoId',  relevamiento.update);
RoutesWEB.delete('/relevamiento/:relevamientoId', relevamiento.delete);

RoutesWEB.get('/tecnicasArte/', tecnicasArte.list);
RoutesWEB.post('/tecnicasArte/', tecnicasArte.create);
RoutesWEB.get('/tecnicasArte/:tecnicasArteId', tecnicasArte.read);
RoutesWEB.put('/tecnicasArte/:tecnicasArteId', tecnicasArte.update);
RoutesWEB.delete('/tecnicasArte/:tecnicasArteId', tecnicasArte.delete);

RoutesWEB.get('/tipoAnalisis/getId', tipoAnalisis.getId);
RoutesWEB.get('/tipoAnalisis/form', tipoAnalisis.getForm);
RoutesWEB.get('/tipoAnalisis/getDetails', tipoAnalisis.getDetails);
RoutesWEB.get('/tipoAnalisis/', tipoAnalisis.listPag);
RoutesWEB.post('/tipoAnalisis/', tipoAnalisis.create);
RoutesWEB.get('/tipoAnalisis/:tipoAnalisisId', tipoAnalisis.read);
RoutesWEB.put('/tipoAnalisis/:tipoAnalisisId', tipoAnalisis.update);
RoutesWEB.delete('/tipoAnalisis/:tipoAnalisisId', tipoAnalisis.delete);

RoutesWEB.get('/ubicacion/form', ubicacion.getForm);
RoutesWEB.get('/ubicacion/', ubicacion.listPag);
RoutesWEB.post('/ubicacion/', ubicacion.create);
RoutesWEB.get('/ubicacion/:ubicacionId', ubicacion.read);
RoutesWEB.put('/ubicacion/:ubicacionId', ubicacion.update);
RoutesWEB.delete('/ubicacion/:ubicacionId', ubicacion.delete);


RoutesWEB.get('/usuario/', usuario.list);
RoutesWEB.get('/usuario/', usuario.listPag);
RoutesWEB.post('/usuario/', usuario.create);
RoutesWEB.get('/usuario/:usuarioId', usuario.read);
RoutesWEB.put('/usuario/:usuarioId', usuario.update);
RoutesWEB.delete('/usuario/:usuarioId', usuario.delete);



RoutesWEB.get('/login/', sesion.index);
RoutesWEB.post('/login/', sesion.create);

module.exports = RoutesWEB;
