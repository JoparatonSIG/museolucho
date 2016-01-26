module.exports = function (sequelize, DataTypes) {
  var Conservacion = sequelize.define(
    'Conservacion',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID conservacion',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      conservacion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Conservacion'
      },
      condicionesSeguridad: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Condiciones de Seguridad'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Conservacion.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (conservacionId, onSuccess, onError) {
          Conservacion.find( { where: { id: conservacionId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var conservacion = this.conservacion;
          var condicionesSeguridad = this.condicionesSeguridad;

          Conservacion.build({
            conservacion: conservacion,
            condicionesSeguridad: condicionesSeguridad
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (conservacionId, onSuccess, onError) {
          var id = conservacionId;
          var conservacion = this.conservacion;
          var condicionesSeguridad = this.condicionesSeguridad;

          Conservacion.update({
            conservacion: conservacion,
            condicionesSeguridad: condicionesSeguridad
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (conservacionId, onSuccess, onError) {
          Conservacion.destroy({ where: { id: conservacionId }})
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
      tableName: 'Conservaciones',
      comment: 'Conservaciones registradas',
      indexes: [
        {
          name: 'idxConservacion',
          method: 'BTREE',
          unique: false,
          fields: ['conservacion']
        },
        {
          name: 'idxCondicionesSeguridad',
          method: 'BTREE',
          unique: false,
          fields: ['condicionesSeguridad']
        }
      ]
    }
  );
  return Conservacion;
};
