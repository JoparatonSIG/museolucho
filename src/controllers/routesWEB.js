var express = require('express');
var RoutesAPI = express.Router();
var routerWeb = express.Router();

var accesorio = require('./API/accesorio');
var adquisicion = require('./API/adquisicion');
var analisis = require('./API/analisis');
var conservacion = require('./API/conservacion');
var descripcion = require('./API/descripcion');
var espacio = require('./API/espacio');
var especialidad = require('./API/especialidad');
var estatico = require('./API/estatico');
var estructura = require('./API/estructura');
var fotografia = require('./API/fotografia');
var intervencion = require('./API/intervencion');
var lugar = require('./API/lugar');
var museo = require('./API/museo');
var naturaleza = require('./API/naturaleza');
var nivel = require('./API/nivel');
var obra = require('./API/obra');
var relevamiento = require('./API/relevamiento');
var tecnicas = require('./API/tecnicas');
var tecnicasArte = require('./API/tecnicasArte');
var tipoAnalisis = require('./API/tipoAnalisis');
var ubicacion = require('./API/ubicacion');
var usuario = require('./API/usuario');


var museoWeb = require('./web/museo');
var tecnicasArteWeb = require('./web/tecnicasArte');
var adquisicionWeb = require('./web/adquisicion');
var fotografiaWeb = require('./web/fotografia');
var tipoAnalisisWeb = require('./web/tipoAnalisis');
var ubicacionWeb = require('./web/ubicacion');
var accesorioWeb = require('./web/accesorio');
var analisisWeb = require('./web/analisis');
var descripcionWeb = require('./web/descripcion');
var especialidadWeb = require('./web/especialidad');
var espacioWeb = require('./web/espacio');
var estructuraWeb = require('./web/estructura');
var nivelWeb = require('./web/nivel');
var usuarioWeb = require('./web/usuario');
var intervencionWeb = require('./web/intervencion');
var conservacionWeb = require('./web/conservacion');
var lugarWeb = require('./web/lugar');

/*
  este router va a estar montado bajo /api, es decir router.use( '/usuario', usuario )
  va a montar el controlador usuario bajo /api/usuario.
*/
RoutesAPI.get('/accesorio/', accesorio.list);
RoutesAPI.post('/accesorio/', accesorio.create);
RoutesAPI.get('/accesorio/:accesorioId', accesorio.read);
RoutesAPI.put('/accesorio/:accesorioId', accesorio.update);
RoutesAPI.delete('/accesorio/:accesorioId', accesorio.delete);

module.exports = RoutesAPI;

/*
exports.api = function (req, res, next) {
router.use( '/adquisicion', adquisicion );
router.use( '/analisis', analisis );
router.use( '/conservacion', conservacion );
router.use( '/descripcion', descripcion );
router.use( '/espacio', espacio );
router.use( '/especialidad', especialidad );
router.use( '/estructura', estructura );
router.use( '/fotografia', fotografia );
router.use( '/intervencion', intervencion );
router.use( '/lugar', lugar );
router.use( '/museo', museo );
router.use( '/naturaleza', naturaleza );
router.use( '/nivel', nivel );
router.use( '/obra', obra );
router.use( '/relevamiento', relevamiento );
router.use( '/tecnica', tecnicas );
router.use( '/tecnicasArte', tecnicasArte );
router.use( '/tipoAnalisis', tipoAnalisis );
router.use( '/ubicacion', ubicacion );
router.use( '/usuario', usuario );
};

exports.sistema = function (req, res, next) {
// router del web publico
routerWeb.use( '/museo', museoWeb);
routerWeb.use( '/tecnicasArte', tecnicasArteWeb);
routerWeb.use( '/adquisicion', adquisicionWeb);
routerWeb.use( '/fotografia', fotografiaWeb);
routerWeb.use( '/tipoanalisis', tipoAnalisisWeb);
routerWeb.use( '/ubicacion', ubicacionWeb);
routerWeb.use( '/accesorio', accesorioWeb);
routerWeb.use( '/analisis', analisisWeb);
routerWeb.use( '/descripcion', descripcionWeb);
routerWeb.use( '/espacio', espacioWeb);
routerWeb.use( '/especialidad', especialidadWeb);
routerWeb.use( '/estructura', estructuraWeb);
routerWeb.use( '/nivel', nivelWeb);
routerWeb.use( '/usuario', usuarioWeb);
routerWeb.use( '/intervencion', intervencionWeb);
routerWeb.use( '/conservacion', conservacionWeb);
routerWeb.use( '/lugar', lugarWeb);
}

*/

/*
  esta ruta es para el controlador de páginas estáticas, va a estar montada en la raíz
*/
//module.exports = router;
//module.exports = routerWeb;
