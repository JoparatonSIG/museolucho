module.exports = function (sequelize, DataTypes) {
  var Estructura = sequelize.define(
    'Estructura',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID estructura',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      estructura: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Estructura'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Estructura.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (estructuraId, onSuccess, onError) {
          Estructura.find( { where: { id: estructuraId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var estructura = this.estructura;

          Estructura.build({
            estructura: estructura
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (estructuraId, onSuccess, onError) {

          Estructura.update({
            estructura: this.estructura
          },{ where: { id: this.id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (onSuccess, onError) {
          Estructura.destroy({ where: { id: this.id }})
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
      tableName: 'Estructuras',
      comment: 'Estructuras registradas',
      indexes: [
        {
          name: 'idxEstructura',
          method: 'BTREE',
          unique: false,
          fields: ['estructura']
        }
      ]
    }
  );
  return Estructura;
};
