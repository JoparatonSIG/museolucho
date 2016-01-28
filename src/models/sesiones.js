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
    },{
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
