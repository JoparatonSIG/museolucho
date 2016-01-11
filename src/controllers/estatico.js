var express = require('express');
var router = express.Router();

var Museo = require('../models/museo.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get( '/obra', function( req, res ) {
  console.log( 'get /obra');

  var obra = Museo.Obra.build();

	obra.retrieveAll(function (obras) {
		if (obras) {
			// res.json(obras);
      console.log( 'obras!', obras);
      
		} else {
			// res.send(401, 'No se encontraron Obras');
		}
	}, function (error) {
		// res.send('Obra no encontrado');
	});

  res.render( 'obra/index' );
});

router.get( '/obra/create', function( req, res ) {
  res.render( 'obra/create' );
});

module.exports = router;
