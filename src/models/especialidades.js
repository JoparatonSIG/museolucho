module.exports = function (sequelize, DataTypes) {
  var Especialidad = sequelize.define(
    'Especialidad',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID especialidad',
        validate: {
          isNumeric:true,

        }
      },
      especialidad: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: 'Especialidad'
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Especialidad.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (especialidadId, onSuccess, onError) {
          Especialidad.find( { where: { id: especialidadId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var especialidad = this.especialidad;

          Especialidad.build({
            especialidad: especialidad
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (especialidadId, onSuccess, onError) {
          var id = especialidadId;
          var especialidad = this.especialidad;

          Especialidad.update({
            especialidad: especialidad
          },{ where: { id: id } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (especialidadId, onSuccess, onError) {
          Especialidad.destroy({ where: { id: especialidadId }})
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
      tableName: 'Especialidades',
      comment: 'Especialidad registradas',
      indexes: [
        {
          name: 'idxEspecialidad',
          method: 'BTREE',
          unique: false,
          fields: ['especialidad']
        }
      ]
    }
  );
  return Especialidad;
};
