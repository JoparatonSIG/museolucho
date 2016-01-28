module.exports = function (sequelize, DataTypes) {
  var Relevamiento = sequelize.define(
    'Relevamiento',
    {
      /*
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID relevamiento',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      */
      fechaRelev: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha del Relevamiento'
      },
      fechaCatalog: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha de Catalogación'
      },
      fechaRevision: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha de Revisión del Relevamiento'
      },
      quienRelevo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Nombre de la persona que Relevo'
      },
      quienCatalogo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Nombre de la persona que Catalogo'
      },
      quienReviso: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Nombre de la persona que Reviso'
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Epoca'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Relevamiento.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (relevamientoId, onSuccess, onError) {
          Relevamiento.find( { where: { id: relevamientoId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrievePag: function (initial, offsetPage, limitPage, currentPage, onSuccess, onError) {
          Relevamiento.findAndCountAll( {
            offset: initial,
            limit: offsetPage
           } )
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaRelev = this.fechaRelev;
          var fechaCatalog = this.fechaCatalog;
          var fechaRevision = this.fechaRevision;
          var quienRelevo = this.quienRelevo;
          var quienCatalogo = this.quienCatalogo;
          var quienReviso = this.quienReviso;
          var observaciones = this.observaciones;

          Relevamiento.build({
            fechaRelev: fechaRelev, fechaCatalog: fechaCatalog,
            fechaRevision: fechaRevision, quienRelevo: quienRelevo,
            quienCatalogo: quienCatalogo, quienReviso: quienReviso,
            observaciones: observaciones
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (relevamientoId, onSuccess, onError) {
          var id = relevamientoId;
          var fechaRelev = this.fechaRelev;
          var fechaCatalog = this.fechaCatalog;
          var fechaRevision = this.fechaRevision;
          var quienRelevo = this.quienRelevo;
          var quienCatalogo = this.quienCatalogo;
          var quienReviso = this.quienReviso;
          var observaciones = this.observaciones;

          Relevamiento.update({
            fechaRelev: fechaRelev, fechaCatalog: fechaCatalog,
            fechaRevision: fechaRevision, quienRelevo: quienRelevo,
            quienCatalogo: quienCatalogo, quienReviso: quienReviso,
            observaciones: observaciones
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function ( onSuccess, onError) {
          Relevamiento.destroy({ where: { id: this.id }})
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
      tableName: 'Relevamientos',
      comment: 'Relevamientos registradas',
      indexes: [
        {
          name: 'idxFechaRelevamiento',
          method: 'BTREE',
          unique: false,
          fields: ['fechaRelev']
        },
        {
          name: 'idxFechaCatalog',
          method: 'BTREE',
          unique: false,
          fields: ['fechaCatalog']
        },
        {
          name: 'idxFechaRevision',
          method: 'BTREE',
          unique: false,
          fields: ['fechaRevision']
        }
      ]
    }
  );
  return Relevamiento;
};
