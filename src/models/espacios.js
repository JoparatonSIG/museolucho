module.exports = function (sequelize, DataTypes) {
  var Espacio = sequelize.define(
    'Espacio',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID espacio',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      espacio: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
        comment: 'Espacio'
      },
      codigoEspacio: {
        type: DataTypes.STRING(2),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de Espacio'
      },
      inmuebles: {
        type: DataTypes.STRING(25),
        allowNull: true,
        defaultValue: null,
        comment: 'Inmuebles'
      },
      codigoInmueble: {
        type: DataTypes.STRING(2),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de Inmueble'
      },
      ubicacionInmueble: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: null,
        comment: 'Ubicacion del Inmueble'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Espacio.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (espacioId, onSuccess, onError) {
          Espacio.find( { where: { id: espacioId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var espacio = this.espacio;
          var codigoEspacio = this.codigoEspacio;
          var inmuebles = this.inmuebles;
          var codigoInmueble = this.codigoInmueble;
          var ubicacionInmueble = this.ubicacionInmueble;

          Espacio.build({
            espacio: espacio, codigoEspacio: codigoEspacio, inmuebles: inmuebles,
            codigoInmueble: codigoInmueble, ubicacionInmueble: ubicacionInmueble
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (id, onSuccess, onError) {
          //console.log(this.id, this.espacio, this.codigoEspacio, this.inmuebles, this.codigoInmueble, this.ubicacionInmueble);
          Espacio.update(
            { espacio: this.espacio, codigoEspacio: this.codigoEspacio, inmuebles: this.inmuebles, codigoInmueble: this.codigoInmueble, ubicacionInmueble: this.ubicacionInmueble },
            { where: { id: this.id } }
          )
          .then(onSuccess).catch(onError);
        },
        removeById: function (espacioId, onSuccess, onError) {
          Espacio.destroy({ where: { id: espacioId }})
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
      tableName: 'Espacios',
      comment: 'Espacios registradas'
      /*
      indexes: [
        {
          name: 'idxEspacio',
          method: 'BTREE',
          unique: false,
          fields: ['Espacio']
        },
        {
          name: 'idxInmuebles',
          method: 'BTREE',
          unique: false,
          fields: ['inmuebles']
        },
        {
          name: 'idxUbicacionInmueble',
          method: 'BTREE',
          unique: true,
          fields: ['ubicacionInmueble']
        }
      ]
      */
    }
  );
  return Espacio;
};
