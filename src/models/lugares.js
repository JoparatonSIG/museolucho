module.exports = function (sequelize, DataTypes) {
  var Lugar = sequelize.define(
    'Lugar',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID lugar',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      localidad: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Localidad'
      },
      codigoLocalidad: {
        type: DataTypes.STRING(3),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de Localidad'
      },
      municipio: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Municipio'
      },
      provincia: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Provincia'
      },
      codigoProvincia: {
        type: DataTypes.STRING(2),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de Provincia'
      },
      departamento: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Departamento'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Lugar.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (lugarId, onSuccess, onError) {
          Lugar.find( { where: { id: lugarId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var localidad = this.localidad;
          var codigoLocalidad = this.codigoLocalidad;
          var municipio = this.municipio;
          var provincia = this.provincia;
          var codigoProvincia = this.codigoProvincia;
          var departamento = this.departamento;

          Lugar.build({
            localidad: localidad, codigoLocalidad: codigoLocalidad,
            municipio: municipio, provincia: provincia,
            codigoProvincia: codigoProvincia, departamento: departamento
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (lugarId, onSuccess, onError) {
          var id = lugarId;
          var localidad = this.localidad;
          var codigoLocalidad = this.codigoLocalidad;
          var municipio = this.municipio;
          var provincia = this.provincia;
          var codigoProvincia = this.codigoProvincia;
          var departamento = this.departamento;

          Lugar.update({
            localidad: localidad, codigoLocalidad: codigoLocalidad,
            municipio: municipio, provincia: provincia,
            codigoProvincia: codigoProvincia, departamento: departamento
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (lugarId, onSuccess, onError) {
          Lugar.destroy({ where: { id: lugarId }})
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
      tableName: 'Lugares',
      comment: 'Lugares registradas',
      indexes: [
        {
          name: 'idxLocalidad',
          method: 'BTREE',
          unique: false,
          fields: ['localidad']
        },
        {
          name: 'idxMunicipio',
          method: 'BTREE',
          unique: false,
          fields: ['municipio']
        },
        {
          name: 'idxProvincia',
          method: 'BTREE',
          unique: false,
          fields: ['provincia']
        },
        {
          name: 'idxDepartamento',
          method: 'BTREE',
          unique: false,
          fields: ['departamento']
        }
      ]
    }
  );
  return Lugar;
};
