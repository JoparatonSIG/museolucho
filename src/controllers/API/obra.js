'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/model');

/* Rutas que terminan en /obras
// router.route('/obra') */

router.get('/cargar', function (req, res) {
  var obra = Museo.Obra.build();

  res.render('./obra/form', {obra: obra});
});

router.post('/cargar', function (req, res) {
  // bodyParser debe hacer la magia
  console.log(req.body);
  var numero = req.body.numero;
  var codigo = req.body.codigo;
  var codigoAnterior1 = req.body.codigoAnterior1;
  var codigoAnterior2 = req.body.codigoAnterior2;
  var tituloCastellano = req.body.tituloCastellano;
  var tituloGuarani = req.body.tituloGuarani;
  var denominacion = req.body.denominacion;
  var especialidad = req.body.especialidad;
  var epoca = req.body.epoca;
  var autor = req.body.autor;
  var funcionOriginal = req.body.funcionOriginal;
  var tecnicaMaterial = req.body.tecnicaMaterial;
  var origen = req.body.origen;
  var propietario = req.body.propietario;
  var ubicacion = req.body.ubicacion;
  var procedencia = req.body.procedencia;
  var fechaUso = req.body.fechaUso;
  var contexto = req.body.contexto;


  console.log('pre numero', numero);
  console.log('pre codigo', codigo);
  console.log('pre codigoAnterior1', codigoAnterior1);
  console.log('pre codigoAnterior2', codigoAnterior2);
  console.log('pre tituloCastellano', tituloCastellano);
  console.log('pre tituloGuarani', tituloGuarani);
  console.log('pre denominacion', denominacion);
  console.log('pre especialidad', especialidad);
  console.log('pre epoca', epoca);
  console.log('pre autor', autor);
  console.log('pre funcionOriginal', funcionOriginal);
  console.log('pre tecnicaMaterial', tecnicaMaterial);
  console.log('pre origen', origen);
  console.log('pre propietario', propietario);
  console.log('pre ubicacion', ubicacion);
  console.log('pre procedencia', procedencia);
  console.log('pre fechaUso', fechaUso);
  console.log('pre contexto', contexto);
  var obra = Museo.Obra.build({
    numero: numero,
    codigo: codigo,
    codigoAnterior1: codigoAnterior1,
    codigoAnterior2: codigoAnterior2,
    tituloCastellano: tituloCastellano,
    tituloGuarani: tituloGuarani,
    denominacion: denominacion,
    especialidad: especialidad,
    epoca: epoca,
    autor: autor,
    funcionOriginal: funcionOriginal,
    funcionMaterial: funcionMaterial,
    origen: origen,
    propietario: propietario,
    ubicacion: ubicacion,
    procedencia: procedencia,
    fechaUso: fechaUso,
    contexto: contexto
  });
  console.log ('pre add');
  obra.addparcial(function (success) {
    console.log('post add');
    res.render('./obra/success');
  },
  function (err) {
    res.send(err);
  });
});

// POST /obras
router.post('/', function (req, res) {
  // bodyParser debe hacer la magia
  var numero = req.body.numero;
  var codigo = req.body.codigo;
  var codigoAnterior1 = req.body.codigoAnterior1;
  var codigoAnterior2 = req.body.codigoAnterior2;
  var tituloCastellano = req.body.tituloCastellano;
  var tituloGuarani = req.body.tituloGuarani;
  var denominacion = req.body.denominacion;
  var especialidad = req.body.especialidad;
  var epoca = req.body.epoca;
  var autor = req.body.autor;
  var funcionOriginal = req.body.funcionOriginal;
  var tecnicaMaterial = req.body.tecnicaMaterial;
  var origen = req.body.origen;
  var propietario = req.body.propietario;
  var ubicacion = req.body.ubicacion;
  var procedencia = req.body.procedencia;
  var fechaUso = req.body.fechaUso;
  var contexto = req.body.contexto;

  var obra = Museo.Obra.build({
    numero: numero,
    codigo: codigo,
    codigoAnterior1: codigoAnterior1,
    codigoAnterior2: codigoAnterior2,
    tituloCastellano: tituloCastellano,
    tituloGuarani: tituloGuarani,
    denominacion: denominacion,
    especialidad: especialidad,
    epoca: epoca,
    autor: autor,
    funcionOriginal: funcionOriginal,
    tecnicaMaterial: tecnicaMaterial,
    origen: origen,
    propietario: propietario,
    ubicacion: ubicacion,
    procedencia: procedencia,
    fechaUso: fechaUso,
    contexto: contexto
  });

  obra.add(function (success) {
    res.json({ message: 'Obra creado!' });
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los obras)
// GET /obra */

router.get('/', function (req, res) {
  var obra = Museo.Obra.build();

  obra.retrieveAll(function (obras) {
    if (obras) {
      res.json(obras);
    } else {
      res.send(401, 'No se encontraron Obras');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

/* Rutas que terminan en /obras/:obrasId
// router.route('/obra/:obraId')
// PUT /obras/:obraId
// Actualiza obra */

router.put('/:obraId', function (req, res) {
  var obra = Museo.Obra.build();

  obra.numero = req.body.numero;
  obra.codigo = req.body.codigo;
  obra.codigoAnterior1 = req.body.codigoAnterior1;
  obra.codigoAnterior2 = req.body.codigoAnterior2;
  obra.tituloCastellano = req.body.tituloCastellano;
  obra.tituloGuarani = req.body.tituloGuarani;
  obra.denominacion = req.body.denominacion;
  obra.especialidad = req.body.especialidad;
  obra.epoca = req.body.epoca;
  obra.autor = req.body.autor;
  obra.funcionOriginal = req.body.funcionOriginal;
  obra.tecnicaMaterial = req.body.tecnicaMaterial;
  obra.origen = req.body.origen;
  obra.propietario = req.body.propietario;
  obra.ubicacion = req.body.ubicacion;
  obra.procedencia = req.body.procedencia;
  obra.fechaUso = req.body.fechaUso;
  obra.contexto = req.body.contexto;

  obra.updateById(req.params.obraId, function (success) {
    if (success) {
      res.json({ message: 'Obra actualizado!' });
    } else {
      res.send(401, 'Obra no encontrado');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

// GET /obra/:obraId
// Toma un obra por id
router.get('/:obraId', function (req, res) {
  var obra = Museo.Obra.build();

  obra.retrieveById(req.params.obraId, function (obra) {
    if (obra) {
      res.json(obra);
    } else {
      res.send(401, 'Obra no encontrado');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

// DELETE /obra/obraId
// Borra el obraId
router.delete('/:obraId', function (req, res) {
  var obra = Museo.Obra.build();

  obra.removeById(req.params.obraId, function (obra) {
    if (obra) {
      res.json({ message: 'Obra borrado!' });
    } else {
      res.send(401, 'Obra no encontrado');
    }
  }, function (error) {
    res.send('Obra no encontrado');
  });
});

/* (trae todos los obras)
// GET /obra */


module.exports = router;
