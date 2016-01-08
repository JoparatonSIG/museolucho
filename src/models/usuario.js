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
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
		      Usuario.findAll({})
          .then(onSuccess).catch(onError);
	      },
        retrieveById: function(userId, onSuccess, onError) {
		      Usuario.find({where: {id: userId}}, {raw: true})
			    .then(onSuccess).catch(onError);
	      },
        add: function(onSuccess, onError) {
		      var email = this.email;
          var nombre = this.nombre;
		      var password = this.password;

		      var shasum = crypto.createHash('sha1');
		      shasum.update(password);
		      password = shasum.digest('hex');

		      Usuario.build({ email: email, nombre: nombre, password: password })
			    .save().then(onSuccess).catch(onError);
	      },
	      updateById: function(userId, onSuccess, onError) {
		      var id = userId;
		      var email = this.email;
          var nombre = this.nombre;
		      var password = this.password;

	        var shasum = crypto.createHash('sha1');
		      shasum.update(password);
		      password = shasum.digest('hex');

		      Usuario.update({ email: email, nombre: nombre, password: password},{where: {id: id} })
			    .then(onSuccess).catch(onError);
	      },
        removeById: function(userId, onSuccess, onError) {
		      Usuario.destroy({where: {id: userId}})
          .then(onSuccess).catch(onError);
	       }
      }
    }
  );
  return Usuario;
};
