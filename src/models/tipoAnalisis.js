module.exports = function (sequelize, DataTypes) {
  var TipoAnalisis = sequelize.define(
    'TipoAnalisis',
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
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Tipo de Analisis'
      },
      subTipo: {
        type: DataTypes.STRING(75),
        allowNull: true,
        defaultValue: null,
        comment: 'Sub Tipo de Analisis'
      },
      valorPredeterminado: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Valor Predeterminado'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          TipoAnalisis.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (taId, onSuccess, onError) {
          TipoAnalisis.find( { where: { id: taId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tipo = this.tipo;
          var subTipo = this.subTipo;
          var valorPredeterminado = this.valorPredeterminado;

          TipoAnalisis.build({
            tipo: tipo, subTipo: subTipo, valorPredeterminado: valorPredeterminado
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (taId, onSuccess, onError) {


          TipoAnalisis.update({
            tipo: this.tipo, subTipo: this.subTipo, valorPredeterminado: this.valorPredeterminado
          },{ where: { id: this.id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (taId, onSuccess, onError) {
          TipoAnalisis.destroy({ where: { id: taId }})
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
      tableName: 'TipoAnalisis',
      comment: 'TipoAnalisis registradas',
      indexes: [
        {
          name: 'idxTipo',
          method: 'BTREE',
          unique: false,
          fields: ['tipo']
        },
        {
          name: 'idxSubTipo',
          method: 'BTREE',
          unique: false,
          fields: ['subTipo']
        },
        {
          name: 'idxValorPredeterminado',
          method: 'BTREE',
          unique: false,
          fields: ['valorPredeterminado']
        }
      ]
    }
  );
  return TipoAnalisis;
};
