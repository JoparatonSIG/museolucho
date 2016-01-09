module.exports = function (sequelize, DataTypes) {
  var Tecnica = sequelize.define(
    'Tecnica',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID tecnica',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      tecnica: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Tecnica'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Tecnica.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (tecnicaId, onSuccess, onError) {
          Tecnica.find( { where: { id: tecnicaId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tecnica = this.tecnica;

          Tecnica.build({
            tecnica: tecnica
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (tecnicaId, onSuccess, onError) {
          var id = tecnicaId;
          var tecnica = this.tecnica;

          Tecnica.update({
            tecnica: tecnica
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (tecnicaId, onSuccess, onError) {
          Tecnica.destroy({ where: { id: tecnicaId }})
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
      tableName: 'Tecnicas',
      comment: 'Tecnicas registradas',
      indexes: [
        {
          name: 'idxTecnica',
          method: 'BTREE',
          unique: true,
          fields: ['tecnica']
        }
      ]
    }
  );
  return Tecnica;
};
