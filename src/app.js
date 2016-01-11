var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var config = require('./config/config');

var accesorio = require('./controllers/accesorio');
var adquisicion = require('./controllers/adquisicion');
var analisis = require('./controllers/analisis');
var conservacion = require('./controllers/conservacion');
var descripcion = require('./controllers/descripcion');
var espacio = require('./controllers/espacio');
var especialidad = require('./controllers/especialidad');
var estatico = require('./controllers/estatico');
var estructura = require('./controllers/estructura');
var fotografia = require('./controllers/fotografia');
var lugar = require('./controllers/lugar');
var naturaleza = require('./controllers/naturaleza');
var nivel = require('./controllers/nivel');
var obra = require('./controllers/obra');
var relevamiento = require('./controllers/relevamiento');
var tecnicas = require('./controllers/tecnicas');
var tecnicasArte = require('./controllers/tecnicasArte');
var tipoAnalisis = require('./controllers/tipoAnalisis');
var ubicacion = require('./controllers/ubicacion');
var usuario = require('./controllers/usuario');

var app = express();

/**
 * Configuración y seteo de Express
 */

// Las variables locals son para la renderización de todos los templates
// dentro de la aplicación. Son utiles para proveer de funciones Helpers
// a los templates, así como datos globales a nivel del app

app.locals.application  = config.name;
app.locals.version      = config.version;
app.locals.description  = config.description;
app.locals.author       = config.author;
app.locals.keywords     = config.keywords;
app.locals.ga           = config.ga;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts); // cargar el módulo de layouts
app.set('layout', 'layout'); // layout por defecto


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

/*
  este router va a estar montado bajo /api, es decir router.use( '/usuario', usuario )
  va a montar el controlador usuario bajo /api/usuario.
*/

router.use( '/accesorio', accesorio );
router.use( '/adquisicion', adquisicion );
router.use( '/analisis', analisis );
router.use( '/conservacion', conservacion );
router.use( '/descripcion', descripcion );
router.use( '/espacio', espacio );
router.use( '/especialidad', especialidad );
router.use( '/estructura', estructura );
router.use( '/fotografia', fotografia );
router.use( '/lugar', lugar );
router.use( '/naturaleza', naturaleza );
router.use( '/nivel', nivel );
router.use( '/obra', obra );
router.use( '/relevamiento', relevamiento );
router.use( '/tecnica', tecnicas );
router.use( '/tecnicasArte', tecnicasArte );
router.use( '/tipoAnalisis', tipoAnalisis );
router.use( '/ubicacion', ubicacion );
router.use( '/usuario', usuario );

app.use( '/api', router );

/*
  esta ruta es para el controlador de páginas estáticas, va a estar montada en la raíz
*/

app.use('/', estatico);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
