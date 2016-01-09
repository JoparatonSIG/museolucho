var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var accesorio = require('./controllers/accesorio');
var analisis = require('./controllers/analisis');
var conservacion = require('./controllers/conservacion');
var descripcion = require('./controllers/descripcion');
var estatico = require('./controllers/estatico');
var fotografia = require('./controllers/fotografia');
var lugar = require('./controllers/lugar');
var nivel = require('./controllers/nivel');
var obra = require('./controllers/obra');
var relevamiento = require('./controllers/relevamiento');
var tipoAnalisis = require('./controllers/tipoAnalisis');
var ubicacion = require('./controllers/ubicacion');
var usuario = require('./controllers/usuario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', accesorio);
app.use('/api', analisis);
app.use('/api', conservacion);
app.use('/api', descripcion);
app.use('/', estatico);
app.use('/api', fotografia);
app.use('/api', lugar);
app.use('/api', nivel);
app.use('/api', obra);
app.use('/api', relevamiento);
app.use('/api', tipoAnalisis);
app.use('/api', ubicacion);
app.use('/api', usuario);

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
