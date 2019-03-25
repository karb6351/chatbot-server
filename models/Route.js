const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

const Event = require('./event');

class Route extends Sequelize.Model{}
Route.init({
	title: {
		type: Sequelize.STRING,
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
		type: Sequelize.STRING,
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
	sequelize
})

Route.hasMany(Event, { as: 'event', foreignKey: 'route_id' });

module.exports = Route;
