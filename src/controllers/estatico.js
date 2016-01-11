var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

router.get( '/', function ( req, res ) {
  res.render( 'home/index', { title: 'Benvenidos' });
});


router.get( '/obra', function ( req, res ) {

  var obra = Museo.Obra.build();
  var page = 0; // iniciar la paginacion en 0 (si existe el parametro page va a sobreescribirlo)

  if ( req.query.page ) {
    page = req.query.page; // parseInt?
  }

  // limit: 5, debe ser una constante o algo global?
  var obrasPorPagina = 10;

  Museo.Obra.findAll ( { offset: page * obrasPorPagina, limit: obrasPorPagina } ).then( function ( obras ) {
    res.render( 'obra/index', { obras: obras });
  });
});

router.get( '/obra/create', function ( req, res ) {
  res.render( 'obra/create' );
});

module.exports = router;
