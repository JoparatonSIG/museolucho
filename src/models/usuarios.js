var crypto = require('crypto');
var config = require('../config/config');

var key = config.key;

var Model = require('./model');

module.exports = function (sequelize, DataTypes) {
  var Usuario = sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Usuario',
        validate: {
          isNumeric:true,
          //notNull: true
        }
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'correo',
        comment: 'Correo electrónico del usuario, se utilizará como username',
        validate: {
          notEmpty: { msg: '-> Falta username' },
          // hay que devolver un mensaje de error si el username ya existe
          isUnique: function (value, next) {
            var self = this;
            Usuarios.find({ where: { email: value } })
            .then(function (user) {
              if (user && self.id !== user.id) {
                return next('Username ya utilizado');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
          }
        }
      },
      nombre: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Nombre',
        comment: 'Nombre del Usuario',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      apellido: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Apellido',
        comment: 'Apellido del Usuario',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'Password del usuario para ingresar al sistema',
        validate: {
          notEmpty: { msg: '-> Falta password' },
          set: function (password) {
            var encripted = crypto.createHmac('sha1', key).update(password).digest('hex');
            // Evita passwords vacíos
            if (password === '') {
              encripted = '';
            }
            this.setDataValue('password', encripted);
            console.log(password);
          }
        }
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: '1000-01-01 00:00:00',
        comment: 'FechaLogin, User Last Post Datetime',
        validate: {
          isDate: true
        }
      },
      logCount: {
        type: DataTypes.BIGINT(11),
        allowNull: true,
        defaultValue: 0,
        comment: 'LOGcc, User login count'
      },
      ipAddr: {
        type: DataTypes.STRING(80),
        allowNull: true,
        defaultValue: '00:00:00:00:00:00:00:00',
        comment: 'none, User IP addr when create account',
        validate: {
          isIP: true
        }
      }
    },
    {
      instanceMethods: {
        verifyPassword: function (password) {
          var encripted = crypto.createHmac('sha1', key).update(password).digest('hex');
          return encripted === this.password;
        },
        updateLastLogin: function (ip) {
          this.update({
            lastLogin: new Date(),
            logCount: sequelize.literal('logCount +1'),
            ipAddr: ip
          });
        },
        autenticar: function (email, password, callback) {
          this.find({
            where: {
              email: email
            }
          }).then(function (user) {
            if (user) {
              if (this.verifyPassword(password)) {
                console.log('UserController.autenticar: Password OK');
                callback(null, user);
              }	else {
                console.log('UserController.autenticar: Password NOK P');
                callback(new Error('eMail o Password invalido'));
              }
            } else {
              console.log('UserController.autenticar: Password NOK U');
              callback(new Error('eMail o Password invalido'));
            }
          }).catch(function (error) { callback(error); });
        },
        retrieveAll: function (onSuccess, onError) {
          Usuario.findAll( {
            include: [ { Model: Model.Nivel } ]
          } )
          .then(onSuccess).catch(onError);
        },
        retrievePag: function (initial, offsetPage, limitPage, currentPage, onSuccess, onError) {
          console.log('estoy dentro de retrievePag');
          Usuario.findAndCountAll( {
            include: [ Model.Nivel ],
            offset: initial,
            limit: offsetPage
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (userId, onSuccess, onError) {
          Usuario.find( {
            include: [ Model.Nivel ],
            where: { id:userId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByEmail: function (userEmail, onSuccess, onError) {
          Usuario.find( { where: { email: userEmail } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          console.log('dentro de add');
          var email = this.email;
          var nombre = this.nombre;
          var apellido = this.apellido;
          var password = this.password;
          var NivelId = this.NivelId;

          var shasum = crypto.createHash('sha1');
          shasum.update(password);
          password = shasum.digest('hex');

          console.log('email:',email);
          console.log('nombre:',nombre);
          console.log('apellido:',apellido);
          console.log('password:',password);
          console.log('NivelesId:',NivelId);
          Usuario.build({ email: email, nombre: nombre,apellido: apellido, password: password, NivelId: NivelId })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (userId, onSuccess, onError) {
          var id = userId;
          var email = this.email;
          var nombre = this.nombre;
          var apellido = this.apellido;
          var password = crypto.createHmac('sha1', key).update(this.password).digest('hex');
          var NivelId = this.NivelId;

          var shasum = crypto.createHash('sha1');
          shasum.update(password);
          password = shasum.digest('hex');
          console.log('dentro de update valor de NivelId',NivelId);
          Usuario.update({ email: email, nombre: nombre, apellido: apellido, password: password, NivelId: NivelId },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (userId, onSuccess, onError) {
          Usuario.destroy({ where: { id: userId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'Usuarios',
      comment: 'Usuarios registrados para ingresar datos al sistema',
      indexes: [
        {
          name: 'idxEmail',
          method: 'BTREE',
          unique: true,
          fields: ['email']
        }
      ]
    }
  );
  return Usuario;
};
