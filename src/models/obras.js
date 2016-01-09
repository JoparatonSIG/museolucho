module.exports = function (sequelize, DataTypes) {
  var Obra = sequelize.define(
    'Obra',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID obra',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      numero: {
        type: DataTypes.STRING(3),
        allowNull: true,
        defaultValue: null,
        comment: 'numero de la obra'
      },
      codigo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo de la obra'
      },
      codigoAnterior1: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo anterior'
      },
      codigoAnterior2: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo anterior'
      },
      denominacion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Denominacion'
      },
      especialidad: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Especialidad'
      },
      epoca: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Epoca'
      },
      autor: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Autor'
      },
      funcionOriginal: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Funcion Original / uso actual'
      },
      tecnicaMaterial: {
        type: DataTypes.STRING(120),
        allowNull: true,
        defaultValue: null,
        comment: 'Funcion Original / uso actual'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Obra.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (obraId, onSuccess, onError) {
          Obra.find( { where: { id: obraId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var numero = this.numero;
          var codigo = this.codigo;
          var codigoAnterior1 = this.codigoAnterior1;
          var codigoAnterior2 = this.codigoAnterior2;
          var denominacion = this.denominacion;
          var especialidad = this.especialidad;
          var epoca = this.epoca;
          var autor = this.autor;
          var funcionOriginal = this.funcionOriginal;
          var tecnicaMaterial = this.tecnicaMaterial;

          Obra.build({
            numero: numero, codigo: codigo, codigoAnterior1: codigoAnterior1,
            codigoAnterior2: codigoAnterior2, denominacion: denominacion,
            especialidad: especialidad, epoca: epoca, autor: autor,
            funcionOriginal: funcionOriginal, tecnicaMaterial: tecnicaMaterial
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (obraId, onSuccess, onError) {
          var id = obraId;
          var numero = this.numero;
          var codigo = this.codigo;
          var codigoAnterior1 = this.codigoAnterior1;
          var codigoAnterior2 = this.codigoAnterior2;
          var denominacion = this.denominacion;
          var especialidad = this.especialidad;
          var epoca = this.epoca;
          var autor = this.autor;
          var funcionOriginal = this.funcionOriginal;
          var tecnicaMaterial = this.tecnicaMaterial;

          Obra.update({
            numero: numero, codigo: codigo, codigoAnterior1: codigoAnterior1,
            codigoAnterior2: codigoAnterior2, denominacion: denominacion,
            especialidad: especialidad, epoca: epoca, autor: autor,
            funcionOriginal: funcionOriginal, tecnicaMaterial: tecnicaMaterial
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (obraId, onSuccess, onError) {
          Obra.destroy({ where: { id: obraId }})
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
      tableName: 'Obras',
      comment: 'Obras registradas',
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
    }
  );
  return Obra;
};
