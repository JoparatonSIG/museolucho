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
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Sesiones.findAll( {
          } )
          .then(onSuccess).catch(onError);
        },
        retrievePag: function (initial, offsetPage, limitPage, currentPage, onSuccess, onError) {
          console.log('estoy dentro de retrievePag');
          Sesiones.findAndCountAll( {
            offset: initial,
            limit: offsetPage
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (onSuccess, onError) {
          Sesiones.find( {
            where: { id:this.id }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          console.log('dentro de add');
          Sesiones.build({ id: this.id, mode: this.mode })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (onSuccess, onError) {
          Sesiones.update({ mode: this.mode },{ where: { id: this.id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (onSuccess, onError) {
          Sessiones.destroy({ where: { id: this.id }})
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
      tableName: 'Sesiones',
      comment: 'Sesiones de los usuarios Registrados',
    }
  );
  return Sesiones;
};
