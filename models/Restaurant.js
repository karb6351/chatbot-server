// 'use strict';

const culture = require('./culture');
const food = require('./food');
const event = require('./event');

// module.exports = (sequelize, DataTypes) => {
//   const Restaurant = sequelize.define('Restaurant', {
//     name: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     photos: DataTypes.TEXT,
//     event_id: DataTypes.INTEGER,
//   }, {});
//   Restaurant.associate = function(models) {
//     // associations can be defined here
//     models.belongsToMany(culture, { through: 'CultureRestaurant', foreignKey: "restaurant_id"});
//     models.hasMany(food, { as: 'food', foreignKey: 'restaurant_id'});
//     models.belongsTo(event);
//   };
//   return Restaurant;
// };

const Sequelize = require('sequelize');
const sequelizeService = require('../app/services/sequelize_service');

const location = require('./location');

const Restaurant = sequelizeService.define('restaurant', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull(value) {
				if (value == null) {
					throw new Error('Empty name');
				}
			}
		}
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notNull(value) {
				if (value == null) {
					throw new Error('Empty description');
				}
			}
		}
	},
	photos: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notNull(value) {
				if (value == null) {
					throw new Error('Empty photos');
				}
			}
		}
	},
	event_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notNull(value) {
				if (value == null) {
					throw new Error('Empty event_id');
				}
			}
		}
	}
});

Restaurant.belongsToMany(culture, { through: 'CultureRestaurant', foreignKey: "restaurant_id"});
Restaurant.hasMany(food, { as: 'food', foreignKey: 'restaurant_id'});
Restaurant.belongsTo(event);

module.exports = Restaurant;
