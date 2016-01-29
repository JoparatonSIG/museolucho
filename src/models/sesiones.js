'use strict';

module.exports = function (sequelize, DataTypes) {
  var Sesiones = sequelize.define(
    'Sesiones',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'SID, Primary Key, Session Id'
      },
      mode: {
        type: DataTypes.ENUM('A','I'),
        allowNull: false,
        defaultValue: 'A',
        comment: 'mode, Session mode A: Activo, I: Inactivo'
      }
    },
    instanceMethods: {
      retrieveAll: function (onSuccess, onError) {
        Sesiones.findAll( {
        } )
        .then(onSuccess).catch(onError);
      },
      retrievePag: function (initial, offsetPage, limitPage, currentPage, onSuccess, onError) {
        console.log('estoy dentro de retrievePag');
        Sesiones.findAndCountAll( {
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
    {
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'Sesiones',
      comment: 'Sesiones de los usuarios Registrados',
    }
  );
  return Sesiones;
};
