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
var RoutesAPI = require('./controllers/routesAPI');
var RoutesWEB = require('./controllers/routesWEB');

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

app.use( '/api', RoutesAPI );
app.use( '/web', RoutesWEB );

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
