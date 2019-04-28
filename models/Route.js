const Sequelize = require('sequelize');
const sequelize = require('../src/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
	class Route extends Sequelize.Model{}
	Route.init({
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull(value) {
					if (value == null) {
						throw new Error('Empty title');
					}
				}
			}
		},
		thumbnail: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull(value) {
					if (value == null) {
						throw new Error('Empty thumbnail');
					}
				}
			}
		}
	}, {
		sequelize,
		tableName: 'routes'
	})
	Route.associate = function(models) {
    // associations can be defined here
    Route.hasMany(models.Event, { as: 'event', foreignKey: 'route_id' });
  };
	return Route;
}
