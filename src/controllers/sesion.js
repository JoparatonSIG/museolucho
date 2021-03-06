'use strict';

var Model = require('../models/model');

exports.isLogged = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.errors = new Error('Necesita logearse');
    res.redirect('/login');
  }
};

exports.index = function (req, res, next) {
  res.render('sesion/login', { title: 'Session', sessions: req.session, errors: [], message : 'mensaje' });
  // , errors: [], message: req.flash('error')
};

exports.create = function (req, res) {
  var options = {};
  var errors = req.session.errors || {};
  var message = req.session.flash();
  req.session.errors = {};
  var sesion = Model.sesion.build({ mode: '' });

  res.render('sesions/create', { title: 'Login', session: session, errors: errors, message: req.flash('error') });
};
