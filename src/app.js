var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
var passport = require('passport');

var config = require('./config/config');

var webPublico = require('./controllers/web/webPublico');
<<<<<<< HEAD
var RoutesAPI = require('./controllers/routesAPI');
var webPrivado = require('./controllers/routesWEB');
=======
var museoWeb = require('./controllers/web/museo');
var tecnicasArteWeb = require('./controllers/web/tecnicasArte');
var adquisicionWeb = require('./controllers/web/adquisicion');
var fotografiaWeb = require('./controllers/web/fotografia');
var tipoAnalisisWeb = require('./controllers/web/tipoAnalisis');
var ubicacionWeb = require('./controllers/web/ubicacion');
var accesorioWeb = require('./controllers/web/accesorio');
var analisisWeb = require('./controllers/web/analisis');
var descripcionWeb = require('./controllers/web/descripcion');
var especialidadWeb = require('./controllers/web/especialidad');
var espacioWeb = require('./controllers/web/espacio');
var estructuraWeb = require('./controllers/web/estructura');
var nivelWeb = require('./controllers/web/nivel');
var usuarioWeb = require('./controllers/web/usuario');
var intervencionWeb = require('./controllers/web/intervencion');
var conservacionWeb = require('./controllers/web/conservacion');
var relevamientoWeb = require('./controllers/web/relevamiento');
var lugarWeb = require('./controllers/web/lugar');
>>>>>>> 0bf53722f2a5b0068bd45df4fe165ba1e6f5588f

require('./config/passport')(passport);

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

// If you want to simulate DELETE and PUT
// in your app you need methodOverride.
// override with POST having
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Keep user, csrf token and config available
app.use(function (req, res, next) {
  //console.log(req);
  res.locals.user = req.user;
  res.locals.config = config;
  res.locals._csrf = "req.csrfToken()";
  next();
});
//app.use(flash());

<<<<<<< HEAD
app.use( '/api', RoutesAPI );
app.use( '/web', webPrivado );
=======
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
routerWeb.use( '/relevamiento', relevamientoWeb);
routerWeb.use( '/lugar', lugarWeb);


app.use( '/api', router );
app.use( '/web', routerWeb );

/*
  esta ruta es para el controlador de páginas estáticas, va a estar montada en la raíz
*/
>>>>>>> 0bf53722f2a5b0068bd45df4fe165ba1e6f5588f

app.use('/', webPublico);

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
    console.log(err.message);
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
  console.log(err.message);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
