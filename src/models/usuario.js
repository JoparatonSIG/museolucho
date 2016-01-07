module.exports = function (sequelize, DataTypes) {
  var Usuario = sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'nid, Primary Key, User ID'
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'none, Username must be unique'
      },
      nombre: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Sin Nombre Alguno',
        comment: 'nombre, User\'s name'
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'pwd, User\'s hashed password'
      },
    }
  );
  return Usuario;
};
