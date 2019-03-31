const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

module.exports = (sequelize, DataTypes) => {
	class Restaurant extends Sequelize.Model{}
	Restaurant.init({
		name: {
			type: DataTypes.STRING,
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
			type: DataTypes.TEXT,
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
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull(value) {
					if (value == null) {
						throw new Error('Empty photos');
					}
				}
			}
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull(value) {
					if (value == null) {
						throw new Error('Empty location')
					}
				}
			}
		},
	}, { sequelize });
	Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.belongsToMany(models.Culture, { through: models.CultureRestaurant, as: 'culture', foreignKey: "restaurant_id", otherKey: "culture_id"});
		Restaurant.belongsToMany(models.Food, { through: models.FoodRestaurant, as: 'food', foreignKey: 'restaurant_id', otherKey: "food_id"});
  };
	return Restaurant;
}
