module.exports = function (sequelize, DataTypes) {
  var Naturaleza = sequelize.define(
    'Naturaleza',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID naturaleza',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      naturaleza: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Naturaleza'
      },
      codigoNaturaleza: {
        type: DataTypes.STRING(3),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de Naturaleza'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Naturaleza.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (naturalezaId, onSuccess, onError) {
          Naturaleza.find( { where: { id: naturalezaId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var naturaleza = this.naturaleza;
          var codigoNaturaleza = this.codigoNaturaleza;

          Naturaleza.build({
            naturaleza: naturaleza, codigoNaturaleza: codigoNaturaleza
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (naturalezaId, onSuccess, onError) {
          var id = naturalezaId;
          var naturaleza = this.naturaleza;
          var codigoNaturaleza = this.codigoNaturaleza;

          Naturaleza.update({
            naturaleza: naturaleza, codigoNaturaleza: codigoNaturaleza
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (naturalezaId, onSuccess, onError) {
          Naturaleza.destroy({ where: { id: naturalezaId }})
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
      tableName: 'Naturaleza',
      comment: 'Naturaleza registradas',
      indexes: [
        {
          name: 'idxNaturaleza',
          method: 'BTREE',
          unique: false,
          fields: ['naturaleza']
        },
        {
          name: 'idxCodigoNaturaleza',
          method: 'BTREE',
          unique: false,
          fields: ['codigoNaturaleza']
        }
      ]
    }
  );
  return Naturaleza;
};
