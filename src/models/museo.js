module.exports = function (sequelize, DataTypes) {
  var Museo = sequelize.define(
    'Museo',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Museo'
      },
      museo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'museo',
        comment: 'museo',
        validate: {
          is: ['[a-z]','i'],
          notEmpty: true
        }
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'direccion',
        comment: 'direccion',
        validate: {
          is: ['[a-z]','i'],
          notEmpty: true
        }
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'telefono',
        comment: 'telefono',
        validate: {
          is: ['[a-z]','i'],
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Museo.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (museoId, onSuccess, onError) {
          Museo.find( { where: { id: museoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByMuseo: function (museoMuseo, onSuccess, onError) {
          Museo.find( { where: { museo: museoMuseo } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByDireccion: function (museoDireccion, onSuccess, onError) {
          Museo.find( { where: { direccion: museoDireccion } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByTelefono: function (museoTelefono, onSuccess, onError) {
          Museo.find( { where: { telefono: museoTelefono } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var museo = this.museo
          var direccion = this.direccion;
          var telefono = this.telefono;


          Museo.build({ museo: museo, direccion: direccion, telefono:telefono })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (id, onSuccess, onError) {
          console.log(this.id, this.museo, this.direccion, this.telefono);
          Museo.update(
            { museo: this.museo, direccion: this.direccion, telefono:this.telefono },
            { where: { id: this.id } }
          )
          .then(onSuccess).catch(onError);
        },
        removeById: function (museoId, onSuccess, onError) {
          Museo.destroy( { where: { id: museoId } })
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
      tableName: 'Museos',
      comment: 'Museo rera',
      indexes: [
        {
          name: 'idxMuseo',
          method: 'BTREE',
          unique: true,
          fields: ['museo']
        }
      ]
    }
  );
  return Museo;
};
