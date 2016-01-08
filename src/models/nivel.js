module.exports = function (sequelize, DataTypes) {
  var Nivel = sequelize.define(
    'Nivel',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      categoria: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'categoria',
        comment: 'Categoria del Nivel',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Nivel.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (nivelId, onSuccess, onError) {
          Nivel.find( { where: { id: nivelId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCategoria: function (nivelCategoria, onSuccess, onError) {
          Nivel.find( { where: { categoria: nivelCategoria } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var categoria = this.categoria;

          Nivel.build({ categoria: categoria })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (nivelId, categoria, onSuccess, onError) {
          Nivel.update( { categoria: categoria },{ where: { id: nivelId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (nivelId, onSuccess, onError) {
          Nivel.destroy( { where: { id: nivelId } })
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
      tableName: 'Niveles',
      comment: 'Niveles de acceso del Usuario al sistema',
      indexes: [
        {
          name: 'idxCategoria',
          method: 'BTREE',
          unique: true,
          fields: ['categoria']
        }
      ]
    }
  );
  return Nivel;
};
