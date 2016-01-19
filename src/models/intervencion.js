
module.exports = function (sequelize, DataTypes) {
  var Intervencion = sequelize.define(
    'Intervencion',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Intervencion',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      metodologia: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'metodologia',
        comment: 'metodologia de la obra',
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      fechaRestauracion: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha restauracion'
      },
      apellidoRestaurador: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Apellido Restaurador',
        comment: 'Apellido del Restaurador',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      },
      descripcion: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'descripcion',
        comment: 'descripcion de la obra',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      },
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Intervencion.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (intervencionId, onSuccess, onError) {
          Intervencion.find( { where: { id: intervencionId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByMetodologia: function (intervencionMetodologia, onSuccess, onError) {
          Intervencion.find( { where: { metodologia: intervencionMetodologia } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var metodologia = this.metodologia;
          var fechaRestauracion = this.fechaRestauracion;
          var apellidoRestaurador = this.apellidoRestaurador;
          var descripcion = this.descripcion;


          Intervencion.build({ metodologia: metodologia, fechaRestauracion: fechaRestauracion, apellidoRestaurador: apellidoRestaurador, descripcion: descripcion  })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (intervencionId, onSuccess, onError) {
          var id = intervencionId;
          var metodologia = this.metodologia;
          var fechaRestauracion = this.fechaRestauracion;
          var apellidoRestaurador = this.apellidoRestaurador;
          var descripcion = this.descripcion;



          Intervencion.update({ metodologia: metodologia, fechaRestauracion: fechaRestauracion, apellidoRestaurador: apellidoRestaurador, descripcion: descripcion },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (intervencionId, onSuccess, onError) {
          Intervencion.destroy({ where: { id: intervencionId }})
          .then(onSuccess).catch(onError);
        }
      },


      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'intervencion',
      comment: 'intervencion de la obra',
      indexes: [
        {
          name: 'idxIntervencion',
          method: 'BTREE',
          unique: false,
          fields: ['metodologia']
        }
      ]
    }
  );
  return Intervencion;
};
