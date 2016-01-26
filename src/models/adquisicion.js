
module.exports = function (sequelize, DataTypes) {
  var Adquisicion = sequelize.define(
    'Adquisicion',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Adquisicion',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      tipoAdquisicion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'tipo Adquisicion',
        comment: 'Tipo de Adquisicion de la obra',      
        validate: {
      //    notNull: true,
          notEmpty: true
        }
      },
      tipoCompra: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'Tipo Compra',
        comment: 'Tipo de compra',
        validate: {
          is: ['[a-z]','i'],
      //    notNull: true,
          notEmpty: true
        }
      },
      fecha: {
        type: DataTypes.DATE,
      //  allowNull: false,
        comment: 'Fecha',
      },
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Adquisicion.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (adquisicionId, onSuccess, onError) {
          Adquisicion.find( { where: { id: adquisicionId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByTipoAdquisicion: function (adquisicionTipoAdquisicion, onSuccess, onError) {
          Adquisicion.find( { where: { tipoAdquisicion: adquisicionTipoAdquisicion } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tipoAdquisicion = this.tipoAdquisicion;
          var tipoCompra = this.tipoCompra;
          var fecha = this.fecha;


          Adquisicion.build({ tipoAdquisicion: tipoAdquisicion, tipoCompra: tipoCompra, fecha: fecha })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (id, onSuccess, onError) {
          //console.log(this.id, this.tipoAdquisicion, this.tipoCompra, this.fecha);
          Adquisicion.update(
            { tipoAdquisicion: this.tipoAdquisicion, tipoCompra: this.tipoCompra, fecha:this.fecha },
            { where: { id: this.id } }
          )
          .then(onSuccess).catch(onError);
        },
        removeById: function (onSuccess, onError) {
          Adquisicion.destroy({ where: { id: this.id }})
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
      tableName: 'Adquisiciones',
      comment: 'adquisicion de la obra',
      indexes: [
        {
          name: 'idxAdquisicion',
          method: 'BTREE',
          unique: false,
          fields: ['tipoAdquisicion']
        }
      ]
    }
  );
  return Adquisicion;
};
