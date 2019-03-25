const Food = require('../../models/food');

exports.index = async (req, res) => {
	try {
		const foods = await Food.findAll();
		res.render('pages/foods/index', {
			foods: foods
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: false,
			message: error.message
		});
	}
};

exports.getById = async (req, res) => {
	const { id } = req.params;
	try {
		const food = await Food.findOne({
			where: {
				id
			}
		});
		res.render('pages/foods/info', {
			food: food
		});
	} catch (error) {
		console.log(error);
		res.redirect('/food')
	}
	
	
};

exports.create = (req, res) => {
	res.render('pages/foods/create', {
		food: null
	});
};

exports.save = async (req, res) => {
	const { name, description, photos } = req.body;
	try {
		const food = await Food.create({
			name, description, photos
		});
	} catch (error) {
		console.log(error);
	}
	res.redirect('/food');
};

exports.edit = (req, res) => {
	const { id } = req.params;
	Food.findOne({
		where: {
			id
		}
	})
		.then((food) => {
			res.render('pages/foods/update', {
				food: food
			});
		})
		.catch((error) => {
			console.log(error);
			res.redirect('/food');
		});
};

exports.update = (req, res) => {
	const { name, description, photos } = req.body;
	const { id } = req.params;
	let updateObj = {
		name, description, photos
	};
	Food.update(updateObj, {
		where: {
			id
		}
	})
		.then((food) => {
			res.redirect('/food');
		})
		.catch((error) => {
			console.log(error);
			res.render('/food');
		});
};

exports.delete = (req, res) => {
	const { id } = req.params;
	Food.destroy({
		where: {
			id
		}
	})
		.then((food) => {
			res.status(200).json({
				food: food,
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
