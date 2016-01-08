module.exports = function (sequelize, DataTypes) {
  var Usuario = sequelize.define(
    'Usuario',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Usuario',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'correo',
        comment: 'Correo electrónico del usuario, se utilizará como username',
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true
        }
      },
      nombre: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Nombre',
        comment: 'Nombre del Usuario',
        validate: {
          is: ["[a-z]",'i'],
          notNull: true,
          notEmpty: true
        }
      },
      apellido: {
        type: DataTypes.STRING(512),
        allowNull: false,
        defaultValue: 'Apellido',
        comment: 'Apellido del Usuario',
        validate: {
          is: ["[a-z]",'i'],
          notNull: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'Password del usuario para ingresar al sistema',
        validate: {
          isAlphanumeric: true,
          notNull: true
        }
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
        retrieveByEmail: function(userEmail, onSuccess, onError) {
		      Usuario.find({where: {email: userEmail}}, {raw: true})
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
      },
      getterMethods: {
        nombreCompleto : function() { return this.nombre + ' ' + this.apellido }
      },
      setterMethods: {
        nombreCompleto: function(valor) {
          var nombres = value.split(' ');
          this.setDataValue('nombre', nombres.slice(0,-1).join(' '));
          this.setDataValue('apellido', nombres.slice(-1).join(' '));
        }
      },
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'Usuarios',
      comment: 'Usuarios registrados para ingresar datos al sistema',
      indexes: [
        {
          name: 'idxEmail',
          method: 'BTREE',
          unique: true,
          fields: ['email']
        }
      ]
    }
  );
  return Usuario;
};
