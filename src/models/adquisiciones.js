module.exports = function (sequelize, DataTypes) {
  var Adquisicion = sequelize.define(
    'Adquisicion',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Tipo Analisis',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      tipoAdquisicion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Tipo de Adquisicion'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Adquisicion.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (taId, onSuccess, onError) {
          Adquisicion.find( { where: { id: taId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tipoAdquisicion = this.tipoAdquisicion;

          Adquisicion.build({
            tipoAdquisicion: tipoAdquisicion
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (taId, onSuccess, onError) {
          var id = taId;
          var tipoAdquisicion = this.tipoAdquisicion;

          Adquisicion.update({
            tipoAdquisicion: tipoAdquisicion
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (taId, onSuccess, onError) {
          Adquisicion.destroy({ where: { id: taId }})
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
      tableName: 'Adquisicion',
      comment: 'Adquisicion registradas',
      indexes: [
        {
          name: 'idxTipoAdquisicion',
          method: 'BTREE',
          unique: false,
          fields: ['tipo']
        }
      ]
    }
  );
  return Adquisicion;
};
