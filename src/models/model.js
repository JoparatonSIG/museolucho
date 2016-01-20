'use strict';

var path = require('path');
var config = require('../config/config');

/*
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbName  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;
*/
var dbName   = config.db.name;
var user     = config.db.user;
var pwd      = config.db.pwd;
var protocol = config.db.protocol;
var dialect  = config.db.dialect;
var port     = config.db.port;
var host     = config.db.host;
var storage  = config.db.storage;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(dbName, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true,      // solo Postgres
    maxConcurrentQueries: 100,
    define: {
      timestamps: true,
      paranoid: true
    },
    pool: { maxConnections:5, maxIdleTime: 30 }
  }
);
// Importar definicion de la Accesorio
var accesorioPath = path.join(__dirname,'accesorios');
var Accesorio = sequelize.import(accesorioPath);
// Importar definicion de la Adquisicion
var adquisicionPath = path.join(__dirname,'adquisicion');
var Adquisicion = sequelize.import(adquisicionPath);
// Importar definicion de la tabla Analisis
var analisisPath = path.join(__dirname,'analisis');
var Analisis = sequelize.import(analisisPath);
// Importar definicion de la conservacion
var conservacionPath = path.join(__dirname,'conservaciones');
var Conservacion = sequelize.import(conservacionPath);
// Importar definicion de la descripciones
var descripcionPath = path.join(__dirname,'descripciones');
var Descripcion = sequelize.import(descripcionPath);
// Importar definicion de la Espacio
var espacioPath = path.join(__dirname,'espacios');
var Espacio = sequelize.import(espacioPath);
// Importar definicion de la Especialidades
var especialidadPath = path.join(__dirname,'especialidades');
var Especialidad = sequelize.import(especialidadPath);
// Importar definicion de la Estructura
var estructuraPath = path.join(__dirname,'estructuras');
var Estructura = sequelize.import(estructuraPath);
// Importar definicion de la fotografias
var fotografiaPath = path.join(__dirname,'fotografias');
var Fotografia = sequelize.import(fotografiaPath);
// Importar definicion de la tabla Forum
var intervencionPath = path.join(__dirname,'intervencion');
var Intervencion = sequelize.import(intervencionPath);
// Importar definicion de la lugares
var lugarPath = path.join(__dirname,'lugares');
var Lugar = sequelize.import(lugarPath);
// Importar definicion de la tabla Forum
var museoPath = path.join(__dirname,'museo');
var Museo = sequelize.import(museoPath);
// Importar definicion de la Naturaleza
var naturalezaPath = path.join(__dirname,'naturaleza');
var Naturaleza = sequelize.import(naturalezaPath);
// Importar definicion de la tabla Topic
var nivelPath = path.join(__dirname,'niveles');
var Nivel = sequelize.import(nivelPath);
// Importar definicion de la tabla Obra
var obraPath = path.join(__dirname,'obras');
var Obra = sequelize.import(obraPath);
// Importar definicion de la tabla relevamiento
var relevamientoPath = path.join(__dirname,'relevamientos');
var Relevamiento = sequelize.import(relevamientoPath);
// Importar definicion de la Tecnica
var tecnicaPath = path.join(__dirname,'tecnicas');
var Tecnica = sequelize.import(tecnicaPath);
// Importar definicion de la TecnicaArte
var tecnicasArtePath = path.join(__dirname,'tecnicasArte');
var TecnicasArte = sequelize.import(tecnicasArtePath);
// Importar definicion de la tabla tipoAnalisis
var tipoAnalisisPath = path.join(__dirname,'tipoAnalisis');
var TipoAnalisis = sequelize.import(tipoAnalisisPath);
// Importar definicion de la ubicacion
var ubicacionPath = path.join(__dirname,'ubicaciones');
var Ubicacion = sequelize.import(ubicacionPath);
// Importar definicion de la tabla Forum
var usuarioPath = path.join(__dirname,'usuarios');
var Usuario = sequelize.import(usuarioPath);

// Usuarios tienen un Nivel de acceso
Usuario.belongsTo(Nivel);
Nivel.hasMany(Usuario);

// Obras tienen relevamiento
Relevamiento.belongsTo(Obra);
Obra.hasMany(Relevamiento);

// Usuario tiene obra
Obra.belongsTo(Usuario);
Usuario.hasMany(Obra);

// Museo tiene Obra
Obra.belongsTo(Museo);
Museo.hasMany(Obra);

// Obras tienen Analisis
Analisis.belongsTo(Obra);
Obra.hasMany(Analisis);

// Obras tienen TipoAdquisicion
Adquisicion.belongsTo(Obra);
Obra.hasOne(Adquisicion);

Analisis.belongsTo(TipoAnalisis);
TipoAnalisis.hasMany(Analisis);

// Obras tienen Descipcion
Descripcion.belongsTo(Obra);
Obra.hasOne(Descripcion);

// Obras tienen Analisis
Ubicacion.belongsTo(Obra);
Obra.hasOne(Ubicacion);

Ubicacion.belongsTo(Lugar);
Lugar.hasMany(Ubicacion);

// Obras tienen conservacion
Conservacion.belongsTo(Obra);
Obra.hasOne(Conservacion);

// Obras tienen relevamiento
Fotografia.belongsTo(Obra);
Obra.hasMany(Fotografia);

// Obras tienen Accesorios
Accesorio.belongsTo(Obra);
Obra.hasMany(Accesorio);

// Obras tienen Naturaleza
Naturaleza.belongsTo(Obra);
Obra.hasOne(Naturaleza);

// Obras tienen Accesorios
Especialidad.belongsTo(Obra);
Obra.hasMany(Especialidad);

// Obras tienen Accesorios
Intervencion.belongsTo(Obra);
Obra.hasMany(Intervencion);

// Relacion NaN Naturaleza Especialidad
Naturaleza.belongsToMany(Especialidad, {
  as: 'Naturaleza',
  through: 'naturalezaEspecialidad',
  foreignKey: 'NaturalezaId'
});
Especialidad.belongsToMany(Naturaleza, {
  as: 'Especialidad',
  through: 'naturalezaEspecialidad',
  foreignKey: 'EspecialidadId'
});

// exportar tablas
exports.Accesorio = Accesorio;
exports.Adquisicion = Adquisicion;
exports.Analisis = Analisis;
exports.Conservacion = Conservacion;
exports.Descripcion = Descripcion;
exports.Espacio = Espacio;
exports.Especialidad = Especialidad;
exports.Estructura = Estructura;
exports.Fotografia = Fotografia;
exports.Intervencion = Intervencion;
exports.Lugar = Lugar;
exports.Museo = Museo;
exports.Naturaleza = Naturaleza;
exports.Nivel = Nivel;
exports.Obra = Obra;
exports.Relevamiento = Relevamiento;
exports.Tecnica = Tecnica;
exports.TecnicasArte = TecnicasArte;
exports.TipoAnalisis = TipoAnalisis;
exports.Ubicacion = Ubicacion;
exports.Usuario = Usuario;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function () {
  console.log ('sequelize SYNC');
  // then(..) ejecuta el manejador una vez creada la tabla
  Nivel.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Nivel.bulkCreate(
        [
          { categoria: 'admin' },
          { categoria: 'empleado' },
          { categoria: 'visitante' }
        ]
      ).then(function () {
      console.log('Base de datos (tabla usuarios) inicializada');
      Usuario.count().then(function (count) {
        if (count === 0) {
          Usuario.bulkCreate(
          [
            { email: 'admin@gmail.com', nombre: 'admin', password: 'admin',NivelId: 1 },
            { email: 'usu@gmail.com', nombre: 'usu', password: 'usu',NivelId: 2 },
            { email: 'usu1@gmail.com', nombre: 'usu1', password: 'usu1',NivelId: 2 }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Niveles) inicializada');
          });
        }
      }); // Usuario.count()
    });
    }
  }); // Nivel.count()
  Museo.count().then(function (count) {
    if (count === 0) {
      Museo.bulkCreate(
      [
        { museo: 'Bolivia', direccion: 'Santa Cruz', telefono: 'telefon'  }
      ]
      ).then(function () {
        console.log('Base de datos (tabla Niveles) inicializada');
      });
    }
  }); // Usuario.count()
});
