'use strict';

// config/passport.js
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var Model          = require('../models/model.js');
// var User            = require('../models/user.js');
// var Sessiondb       = require('../models/sessions.js');
var Usuario = require('../controllers/web/usuario');
// expose this function to our app using module.exports
module.exports = function (passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log('Passport.serializaUser: ok');
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    console.log('Passport.deserializeUser: in');
    Model.Usuario.findOne({
      where: id = Number(id)
    }).then(function (user) {
      if (user) {
        console.log('Passport.deserializeUser: UserOK');
        // return done(null, { id: user.id, email: user.email, isAdmin: user.isAdmin });
        return done(null, user);
      }
    });
  });
  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      Usuario.autenticar(email, password, function (error, user) {
        if (error) {  // si hay error retornamos mensajes de error de sesión
          console.log('Passport.use: errorautenticar');
          return done(null, false, { message: 'Invalid email or password.' });
        }
        Usuario.updateLastLogin(ip);
        var UserId = user.id;
        var mode = 'A';
        // req.session.user = { id: user.id, username: user.username, isAdmin: user.isAdmin };
        // req.session.session = { id: user.id, username: user.username, isAdmin: user.isAdmin };
        Model.Sesion.create({
          mode: mode, UserId: UserId
        })
        .then(function (sesion) {
          console.log('Passport.use: sesion create ok');
          return done(null, user, { message: 'Passport: Success Log-in.' });
        }).catch(function (err) {
          console.log('Passport.use: sesion create Nok');
          return done(null, false, { message: 'Invalid email or password. DB' });
        });
      });
    });
  }));
};
