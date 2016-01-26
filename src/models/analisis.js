var Model = require('./model');

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
          Analisis.findAll( {
            include: [ Model.TipoAnalisis ]
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (analisisId, onSuccess, onError) {
          Analisis.find( { where: { id: analisisId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var analisis = this.analisis;

          Analisis.build({
            analisis: analisis
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (analisisId, onSuccess, onError) {
          var id = analisisId;
          var analisis = this.analisis;

          Analisis.update({
            analisis: analisis
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (analisisId, onSuccess, onError) {
          Analisis.destroy({ where: { id: analisisId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid: true,
<<<<<<< HEAD
      createdAt: 'FechaCrea',
      updatedAt: 'FechaModifica',
      deletedAt: 'FechaBorra',
=======
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
>>>>>>> 05eeec5147e320c9706a0d09ab6ff104d6baff87
      underscore: false,
      freezeTableName:true,
      tableName: 'Analisis',
      comment: 'Analisis registradas'
    }
  );
  return Analisis;
};
