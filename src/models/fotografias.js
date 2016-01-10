module.exports = function (sequelize, DataTypes) {
  var Fotografia = sequelize.define(
    'Fotografia',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID foto',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      foto: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Foto'
      },
      codArchivoFotografico: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Codigo del Archivo Fotografico'
      },
      numRollo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Numero de Rollo'
      },
      numFoto: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Numero de Foto'
      },
      fotografo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Fotografo'
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Fotografia.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (fotoId, onSuccess, onError) {
          Fotografia.find( { where: { id: fotoId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var foto = this.foto;
          var codArchivoFotografico = this.codArchivoFotografico;
          var numRollo = this.numRollo;
          var numFoto = this.numFoto;
          var fotografo = this.fotografo;
          var fecha = this.fecha;

          Fotografia.build({
            foto: foto, codArchivoFotografico: codArchivoFotografico,
            numRollo: numRollo, numFoto: numFoto, fotografo: fotografo,
            fecha: fecha
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (fotoId, onSuccess, onError) {
          var id = fotoId;
          var foto = this.foto;
          var codArchivoFotografico = this.codArchivoFotografico;
          var numRollo = this.numRollo;
          var numFoto = this.numFoto;
          var fotografo = this.fotografo;
          var fecha = this.fecha;

          Fotografia.update({
            foto: foto, codArchivoFotografico: codArchivoFotografico,
            numRollo: numRollo, numFoto: numFoto, fotografo: fotografo,
            fecha: fecha
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (fotoId, onSuccess, onError) {
          Fotografia.destroy({ where: { id: fotoId }})
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
      tableName: 'Fotografias',
      comment: 'Fotografias registradas',
      indexes: [
        {
          name: 'idxFotografo',
          method: 'BTREE',
          unique: false,
          fields: ['fotografo']
        },
        {
          name: 'idxFecha',
          method: 'BTREE',
          unique: false,
          fields: ['fecha']
        }
      ]
    }
  );
  return Fotografia;
};
