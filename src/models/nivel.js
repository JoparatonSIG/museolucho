module.exports = function (sequelize, DataTypes) {
  var Nivel = sequelize.define(
    'Nivel',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'nid, Primary Key, User ID'
      },
      categoria: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'none, Categoria'
      }
    }
  );
  return Nivel;
};
