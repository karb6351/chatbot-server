const Sequelize = require('sequelize');
const util = require('../../helpers/util');

const db = require('../../models');

exports.index = (req, res) => {
	db.Restaurant.findAll()
		.then((restaurants) => {
			// res.status(200).json({
			// 	restaurants: restaurants,
			// 	status: true
			// });
			res.render('pages/restaurants/index', {
				restaurants: restaurants
			});
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.getById = (req, res) => {
	const { id } = req.params;
	db.Restaurant.findOne({
		where: {
			id
		}
	})
		.then((restaurants) => {
			res.status(200).json({
				restaurants: restaurants,
				status: true
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.create = async (req, res) => {
	const rawCultures = await db.Culture.findAll({
		attributes: ['id', 'name']
	});
	const cultures = rawCultures.map(item => item.dataValues);
	const rawFoods = await db.Food.findAll({
		attributes: ['id', 'name']
	});
	const foods = rawFoods.map(item => item.dataValues);
	res.render('pages/restaurants/create', {
		restaurant: null,
		cultures: JSON.stringify(cultures),
		cultureRestaurant: '',
		foods: JSON.stringify(foods),
		foodRestaurant: ''
	});
};

exports.save = async (req, res) => {
	const { name, description, photos, food_id, culture_id, location } = req.body;
	
	try{
		const restaurant = await db.Restaurant.create({ name, description, photos, location });
		food_id.split(',').forEach(item => {
			db.FoodRestaurant.create({
				food_id: item,
				restaurant_id: restaurant.id
			})
		})
		culture_id.split(',').forEach(item => {
			db.CultureRestaurant.create({
				culture_id: item,
				restaurant_id: restaurant.id
			})
		})
		res.redirect('/restaurant');
	}catch(error){
		console.log(error)
		res.redirect('/restaurant');
	}
	
};

exports.edit = async (req, res) => {
	const { id } = req.params;
	const rawCultures = await db.Culture.findAll({
		attributes: ['id', 'name']
	});
	const cultures = rawCultures.map(item => item.dataValues);
	const rawFoods = await db.Food.findAll({
		attributes: ['id', 'name']
	});
	const foods = rawFoods.map(item => item.dataValues);
	const restaurant = await db.Restaurant.findOne({
		where: {
			id: id
		},
		include: [
			{
				model: db.Food,
				as: 'food',
				attributes: ['id', 'name']
			},
			{
				model: db.Culture,
				as: 'culture',
				attributes: ['id', 'name']
			}
		]
	});
	res.render('pages/restaurants/update', {
		restaurant: restaurant,
		cultures: JSON.stringify(cultures),
		cultureRestaurant: JSON.stringify(restaurant.culture.map(item => ({id: item.id, name: item.name}))),
		foods: JSON.stringify(foods),
		foodRestaurant: JSON.stringify(restaurant.food.map(item => ({id: item.id, name: item.name})))
	});
};

exports.update = (req, res) => {
	const { name, description, photos, event_id } = req.body;
	const { id } = req.params;
	db.Restaurant.update(
		{
			name,
			description,
			photos,
			event_id
		},
		{
			where: {
				id
			}
		}
	)
		.then((restaurant) => {
			res.status(200).json({
				restaurant: restaurant,
				status: true
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.delete = (req, res) => {
	const { id } = req.params;
	db.Restaurant.destroy({
		where: {
			id
		}
	})
		.then((restaurant) => {
			res.status(200).json({
				restaurant: restaurant,
				status: true
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};
