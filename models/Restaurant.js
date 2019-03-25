const Culture = require('./culture');
const Food = require('./food');

const Sequelize = require('sequelize');
const sequelize = require('../app/services/sequelize_service');

class Restaurant extends Sequelize.Model{}
Restaurant.init({
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
  location: {
    type: Sequelize.GEOMETRY,
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

Restaurant.belongsToMany(Culture, { through: 'CultureRestaurant', foreignKey: "restaurant_id"});
Restaurant.hasMany(Food, {foreignKey: 'restaurant_id'});

module.exports = Restaurant;
