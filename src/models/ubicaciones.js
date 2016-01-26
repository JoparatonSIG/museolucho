module.exports = function (sequelize, DataTypes) {
  var Ubicacion = sequelize.define(
    'Ubicacion',
    {
      espacio: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Espacio'
      },
      inmueble: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Inmueble'
      },
      propietario: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Propietario'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Ubicacion.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (ubicacionId, onSuccess, onError) {
          Ubicacion.find( { where: { id: ubicacionId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var espacio = this.espacio;
          var inmueble = this.inmueble;
          var propietario = this.propietario;

          Ubicacion.build({
            espacio: espacio, inmueble: inmueble,
            propietario: propietario
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (ubicacionId, onSuccess, onError) {


          Ubicacion.update({
            espacio: this.espacio, inmueble: this.inmueble,
            propietario: this.propietario
          },{ where: { id: this.id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (ubicacionId, onSuccess, onError) {
          Ubicacion.destroy({ where: { id: ubicacionId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid: true,
      createdAt: 'creacion',
      updatedAt: 'modifica',
      deletedAt: 'borrado',
      underscore: false,
      freezeTableName:true,
      tableName: 'Ubicaciones',
      comment: 'Ubicaciones registradas',
      indexes: [
        {
          name: 'idxEspacio',
          method: 'BTREE',
          unique: false,
          fields: ['espacio']
        },
        {
          name: 'idxInmueble',
          method: 'BTREE',
          unique: false,
          fields: ['inmueble']
        },
        {
          name: 'idxPropietario',
          method: 'BTREE',
          unique: false,
          fields: ['propietario']
        }
      ]
    }
  );
  return Ubicacion;
};
