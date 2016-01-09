'use strict';

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// MariaDB DATABASE_URL = mariadb://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbName  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

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
// Importar definicion de la tabla Forum
var usuarioPath = path.join(__dirname,'usuarios');
var Usuario = sequelize.import(usuarioPath);

// Importar definicion de la tabla Topic
var nivelPath = path.join(__dirname,'niveles');
var Nivel = sequelize.import(nivelPath);

// Importar definicion de la tabla Obra
var obraPath = path.join(__dirname,'obras');
var Obra = sequelize.import(obraPath);

// Importar definicion de la tabla relevamiento
var relevamientoPath = path.join(__dirname,'relevamientos');
var Relevamiento = sequelize.import(relevamientoPath);

// Importar definicion de la tabla tipoAnalisis
var tipoAnalisisPath = path.join(__dirname,'tipoAnalisis');
var TipoAnalisis = sequelize.import(tipoAnalisisPath);

// Importar definicion de la tabla Analisis
var analisisPath = path.join(__dirname,'analisis');
var Analisis = sequelize.import(analisisPath);

// Importar definicion de la descripciones
var descripcionPath = path.join(__dirname,'descripciones');
var Descripcion = sequelize.import(descripcionPath);

// Importar definicion de la lugares
var lugarPath = path.join(__dirname,'lugares');
var Lugar = sequelize.import(lugarPath);

// Importar definicion de la ubicacion
var ubicacionPath = path.join(__dirname,'ubicaciones');
var Ubicacion = sequelize.import(ubicacionPath);

// Importar definicion de la conservacion
var conservacionPath = path.join(__dirname,'conservaciones');
var Conservacion = sequelize.import(conservacionPath);

// Importar definicion de la fotografias
var fotografiaPath = path.join(__dirname,'fotografias');
var Fotografia = sequelize.import(fotografiaPath);

// Importar definicion de la Accesorio
var accesorioPath = path.join(__dirname,'accesorios');
var Accesorio = sequelize.import(accesorioPath);

// Importar definicion de la Especialidades
var especialidadPath = path.join(__dirname,'especialidades');
var Especialidad = sequelize.import(especialidadPath);

// Importar definicion de la Naturaleza
var naturalezaPath = path.join(__dirname,'naturaleza');
var Naturaleza = sequelize.import(naturalezaPath);

// Importar definicion de la Espacio
var espacioPath = path.join(__dirname,'espacios');
var Espacio = sequelize.import(espacioPath);

// Importar definicion de la Estructura
var estructuraPath = path.join(__dirname,'estructuras');
var Estructura = sequelize.import(estructuraPath);

// Importar definicion de la Tecnica
var tecnicaPath = path.join(__dirname,'tecnicas');
var Tecnica = sequelize.import(tecnicaPath);

// Importar definicion de la TecnicaArte
var tecnicaArtePath = path.join(__dirname,'tecnicasArte');
var TecnicaArte = sequelize.import(tecnicaArtePath);

// Usuarios tienen un Nivel de acceso
Usuario.belongsTo(Nivel);
Nivel.hasMany(Usuario);

// Obras tienen relevamiento
Relevamiento.belongsTo(Obra);
Obra.hasMany(Relevamiento);

// Obras tienen Analisis
Analisis.belongsTo(Obra);
Obra.hasMany(Analisis);

Analisis.belongsTo(TipoAnalisis);
TipoAnalisis.hasMany(Analisis);

// Obras tienen Descipcion
Descripcion.belongsTo(Obra);
Obra.hasMany(Descripcion);

// Obras tienen Analisis
Ubicacion.belongsTo(Obra);
Obra.hasMany(Ubicacion);

Ubicacion.belongsTo(Lugar);
Lugar.hasMany(Ubicacion);

// Obras tienen conservacion
Conservacion.belongsTo(Obra);
Obra.hasMany(Conservacion);

// Obras tienen relevamiento
Fotografia.belongsTo(Obra);
Obra.hasMany(Fotografia);

// Obras tienen Accesorios
Accesorio.belongsTo(Obra);
Obra.hasMany(Accesorio);

// Relacion NaN Naturaleza Especialidad
Naturaleza.belongsToMany(Especialidad, { as: 'Naturaleza', through: 'naturalezaEspecialidad', foreignKey: 'NaturalezaId' })
Especialidad.belongsToMany(Naturaleza, { as: 'Especialidad', through: 'naturalezaEspecialidad', foreignKey: 'EspecialidadId' })

// Obras tienen Accesorios
Espacio.belongsTo(Obra);
Obra.hasMany(Espacio);

// exportar tablas
exports.Usuario = Usuario;
exports.Nivel = Nivel;
exports.Analisis = Analisis;
exports.TipoAnalisis = TipoAnalisis;
exports.Relevamiento = Relevamiento;
exports.Descripcion = Descripcion;
exports.Obra = Obra;
exports.Ubicacion = Ubicacion;
exports.Lugar = Lugar;
exports.Conservacion = Conservacion;
exports.Fotografia = Fotografia;
exports.Accesorio = Accesorio;
exports.Naturaleza = Naturaleza;
exports.Especialidad = Especialidad;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function () {
  console.log ('sequelize SYNC');
  // then(..) ejecuta el manejador una vez creada la tabla
  Usuario.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Usuario.bulkCreate(
        [
          { email: 'lucho@gmail.com' ,nombre: 'lucho' ,password: 'mono' },
          { email: 'usu@gmail.com' ,nombre: 'usu' ,password: 'usu' },
          { email: 'usu1@gmail.com' ,nombre: 'usu1' ,password: 'usu1' }
        ]
      ).then(function () {
      console.log('Base de datos (tabla usuarios) inicializada');
      Nivel.count().then(function (count) {
        if (count === 0) {
          Nivel.bulkCreate(
          [
            { categoria: 'admin' },
            { categoria: 'empleado' },
            { categoria: 'visitante' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Niveles) inicializada');
          });
        }
      }); // Nivel.count()
    });
    }
  }); // Usuario.count()
});
