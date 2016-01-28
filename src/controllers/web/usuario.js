'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

/* Rutas que terminan en /usuarios
// router.route('/usuario') */

// POST /usuarios
router.get('/cargar', function (req, res) {
  var nivelesDB = Museo.Nivel.build();
  var usuarioDB = Museo.Usuario.build();
  nivelesDB.retrieveAll(function (nivelesQ) {
    if (nivelesQ) {
        res.render('web/usuario/index', {
            usuarioJ: usuarioDB,
            selectJ: nivelesQ
          });
    }
  }, function (error) {
    res.send('Usuario no encontrado');
    }
  );
});

router.post('/cargar', function (req, res) {
  console.log('soy re.body',req.body);

  var usuarioDB = Museo.Usuario.build({
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    password: req.body.password,
    NivelId: req.body.selectJ
  });
  console.log('usuarioDB',usuarioDB);
  usuarioDB.add(function (success) {
     res.redirect('/web/usuario');
  },
  function (err) {
    res.send(err);
  });
});
/* (trae todos los usuarios)
// GET /usuario */

router.get('/', function (req, res) {
  var usuario = Museo.Usuario.build();
  /*console.log(req.body);
  usuario.retrieveAll(function (usuarios) {
    if (usuarios) {
      res.render('web/usuario/list', { usuarios: usuarios});
    } else {
      res.send(401, 'No se encontraron Usuarios');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
});*/
console.log('GET Paginado pre Select');

  var limitPage = 10;
  if (currentPage == null ) {
    var currentPage = 1;
    var initial = 0;
    var offset = initial+limitPage;
  } else {
    var currentPage = req.params.currentPage;
    var initial = currentPage*limitPage;
    var offset = initial+limitPage;
  }

  usuario.retrievePag(initial, offset, limitPage, currentPage, function (usuario) {
    if (usuario) {
      console.log('estoy dentro del if');
      var totalPage = usuario.count/limitPage;
      res.render('web/usuario/list.ejs', {
        usuario: usuario.rows,
        activePage: currentPage,
        totalPage: totalPage
      });
    } else {
      console.log('else',error);
      res.send(401, 'No se encontraron Usuarios');
    }
  }, function (error) {
    console.log('error',error);
    res.send('Usuarios no encontrado');
  });
});


/* Rutas que terminan en /usuarios/:usuariosId
// router.route('/usuario/:usuarioId')
// PUT /usuarios/:usuarioId
// Actualiza usuario */

router.put('/:usuarioId', function (req, res) {
  var usuario = Museo.Usuario.build();
  console.log('ingresa al put');
  usuario.id = req.body.id;
  usuario.email = req.body.email;
  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.password = req.body.password;
  usuario.NivelesId = req.body.nivelSele;
  console.log('id>',usuario.id);
  console.log('email>',usuario.email);
  console.log('nombre>',usuario.nombre);
  console.log('apellido>',usuario.apellido);
  console.log('password>',usuario.password);  
  console.log('nivelSele>',usuario.NivelesId);

  usuario.updateById(req.params.usuarioId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/usuario');
      res.redirect('/web/usuario');
    } else {
      console.log('else');
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    console.log('ERROR');
    res.send('Usuario no encontrado');
  });
});

// GET /usuario/:usuarioId
// Toma un usuario por id
router.get('/:usuarioId', function (req, res) {
  var nivelesDB = Museo.Nivel.build();
  var usuario = Museo.Usuario.build();
  nivelesDB.retrieveAll(function (niveles) {
    if (niveles) {
      usuario.retrieveById(req.params.usuarioId, function (usuarioq) {
        if (usuarioq) {
          res.render('web/usuario/edit', {
                      usuario:usuarioq,
                      select: niveles
                    });
        } else {
          res.send(401, 'Usuario no encontrado');
        }
      }, function (error) {
        res.send('Usuario no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Usuario');
    }
  }, function (error) {
    console.log(error);
    res.send('Usuario no encontrado');
  });
});

// DELETE /usuario/usuarioId
// Borra el usuarioId
router.delete('/:usuarioId', function (req, res) {
  var usuario = Museo.Usuario.build();
  usuario.removeById(req.params.usuarioId, function (usuario) {
    if (usuario) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/usuario');
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
});

module.exports = router;
