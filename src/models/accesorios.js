module.exports = function (sequelize, DataTypes) {
  var Accesorio = sequelize.define(
    'Accesorio',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID accesorio',
        validate: {
          isNumeric:true,
        }
      },
      objetoCodigo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de Objeto'
      },
      relacion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Relacion'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Accesorio.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (accesorioId, onSuccess, onError) {
          Accesorio.find( { where: { id: accesorioId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var objetoCodigo = this.objetoCodigo;
          var relacion = this.relacion;

          Accesorio.build({
            objetoCodigo: objetoCodigo, relacion: relacion
          })
          .save().then(onSuccess).catch(onError);
        },


        updateById: function (id, onSuccess, onError) {
          console.log(this.id, this.objetoCodigo, this.relacion);
          Accesorio.update(
            { objetoCodigo: this.objetoCodigo, relacion: this.relacion },
            { where: { id: this.id } }
          )
          .then(onSuccess).catch(onError);
        },

        removeById: function (accesorioId, onSuccess, onError) {
          Accesorio.destroy({ where: { id: accesorioId }})
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
      tableName: 'Accesorios',
      comment: 'Accesorios registradas',
      indexes: [
        {
          name: 'idxObjetoCodigo',
          method: 'BTREE',
          unique: false,
          fields: ['objetoCodigo']
        },
        {
          name: 'idxRelacion',
          method: 'BTREE',
          unique: false,
          fields: ['relacion']
        }
      ]
    }
  );
  return Accesorio;
};
