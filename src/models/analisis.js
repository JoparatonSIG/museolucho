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
        retrievePag: function (initial, offsetPage, limitPage, currentPage, onSuccess, onError) {
          Analisis.findAndCountAll( {
            include: [ Model.TipoAnalisis ],
            offset: initial,
            limit: offsetPage
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (analisisId, onSuccess, onError) {
          Analisis.find( {
            include: [ Model.TipoAnalisis ],
            where: { id: analisisId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          Analisis.build({
            analisis: this.analisis,
            TipoAnalisisId: this.TipoAnalisisId
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (analisisId, onSuccess, onError) {
          Analisis.update({
            analisis: this.analisis,
            TipoAnalisisId: this.TipoAnalisisId
          },{ where: { id: this.id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (analisisId, onSuccess, onError) {
          Analisis.destroy({ where: { id: analisisId }})
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
      tableName: 'Analisis',
      comment: 'Analisis registradas'
    }
  );
  return Analisis;
};
