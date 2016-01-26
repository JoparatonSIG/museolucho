module.exports = function (sequelize, DataTypes) {
  var Descripcion = sequelize.define(
    'Descripcion',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID desc',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      marcasInscripciones: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Marcas o Inscripciones'
      },
      alto: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Alto'
      },
      ancho: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Ancho'
      },
      longitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Longitud'
      },
      profundidad: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Profundidad'
      },
      diametro: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Diametro'
      },
      espesor: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Espesor'
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
        comment: 'Peso'
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Observaciones'
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Descripcion'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Descripcion.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (descId, onSuccess, onError) {
          Descripcion.find( { where: { id: descId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var marcasInscripciones = this.marcasInscripciones;
          var alto = this.alto;
          var ancho = this.ancho;
          var longitud = this.longitud;
          var profundidad = this.profundidad;
          var diametro = this.diametro;
          var espesor = this.espesor;
          var peso = this.peso;
          var observaciones = this.observaciones;
          var descripcion = this.descripcion;

          Descripcion.build({
            marcasInscripciones: marcasInscripciones,
            alto: alto, ancho: ancho, longitud: longitud,
            profundidad: profundidad, diametro: diametro,
            espesor: espesor, peso: peso,
            observaciones: observaciones, descripcion: descripcion
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (descId, onSuccess, onError) {
          var id = descId;
          var marcasInscripciones = this.marcasInscripciones;
          var alto = this.alto;
          var ancho = this.ancho;
          var longitud = this.longitud;
          var profundidad = this.profundidad;
          var diametro = this.diametro;
          var espesor = this.espesor;
          var peso = this.peso;
          var observaciones = this.observaciones;
          var descripcion = this.descripcion;

          Descripcion.update({
            marcasInscripciones: marcasInscripciones,
            alto: alto, ancho: ancho, longitud: longitud,
            profundidad: profundidad, diametro: diametro,
            espesor: espesor, peso: peso,
            observaciones: observaciones, descripcion: descripcion
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (descId, onSuccess, onError) {
          Descripcion.destroy({ where: { id: descId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid: true,
      createdAt: 'FechaCrea',
      updatedAt: 'FechaModifica',
      deletedAt: 'FechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'Descripciones',
      comment: 'Descripciones registradas'
      /*
      indexes: [
        {
          name: 'idxCodigo',
          method: 'BTREE',
          unique: true,
          fields: ['codigo']
        },
        {
          name: 'idxCodigo1',
          method: 'BTREE',
          unique: true,
          fields: ['codigoAnterior1']
        },
        {
          name: 'idxCodigo2',
          method: 'BTREE',
          unique: true,
          fields: ['codigoAnterior2']
        }
      ]
      */
    }
  );
  return Descripcion;
};
