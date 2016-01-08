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
    omitNull: true      // solo Postgres
  }
);
// Importar definicion de la tabla Forum
var usuarioPath = path.join(__dirname,'usuario');
var Usuario = sequelize.import(usuarioPath);

// Importar definicion de la tabla Topic
var nivelPath = path.join(__dirname,'nivel');
var Nivel = sequelize.import(nivelPath);

// los topics pertenecen a un forum registrado
Usuario.belongsTo(Nivel);
Nivel.hasMany(Usuario);

// exportar tablas
exports.Usuario = Usuario;
exports.Nivel = Nivel;

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
