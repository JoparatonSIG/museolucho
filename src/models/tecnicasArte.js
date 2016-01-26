module.exports = function (sequelize, DataTypes) {
  var TecnicaArte = sequelize.define(
    'TecnicaArte',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID tecnicaArte',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      tecnicaArte: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'TecnicaArte'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          TecnicaArte.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (tecnicaArteId, onSuccess, onError) {
          TecnicaArte.find( { where: { id: tecnicaArteId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tecnicaArte = this.tecnicaArte;

          TecnicaArte.build({
            tecnicaArte: tecnicaArte
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (tecnicaArteId, onSuccess, onError) {
          var id = tecnicaArteId;
          var tecnicaArte = this.tecnicaArte;

          TecnicaArte.update({
            tecnicaArte: tecnicaArte
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (tecnicaArteId, onSuccess, onError) {
          TecnicaArte.destroy({ where: { id: tecnicaArteId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid: true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'TecnicasArte',
      comment: 'TecnicasArte registradas',
      indexes: [
        {
          name: 'idxTecnicaArte',
          method: 'BTREE',
          unique: false,
          fields: ['tecnicaArte']
        }
      ]
    }
  );
  return TecnicaArte;
};
