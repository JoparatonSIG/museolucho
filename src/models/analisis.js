module.exports = function (sequelize, DataTypes) {
  var Analisis = sequelize.define(
    'Analisis',
    {
      analisis: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Tipo de Analisis'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Analisis.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (aId, onSuccess, onError) {
          Analisis.find( { where: { id: aId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var analisis = this.analisis;

          Analisis.build({
            analisis: analisis
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (aId, onSuccess, onError) {
          var id = aId;
          var analisis = this.analisis;

          Analisis.update({
            analisis: analisis
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (aId, onSuccess, onError) {
          Analisis.destroy({ where: { id: aId }})
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
      tableName: 'Analisis',
      comment: 'Analisis registradas'
    }
  );
  return Analisis;
};
