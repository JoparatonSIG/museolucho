var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

var paginate = require( 'express-paginate' );

/*
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get( '/obra', function ( req, res ) {
  console.log( 'get /obra');

  var obra = Museo.Obra.build(),
    page = 0; // iniciar la paginacion en 0 (si existe el parametro page va a sobreescribirlo)

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
