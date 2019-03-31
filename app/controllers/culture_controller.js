const db = require('../../models');

exports.index = async (req, res) => {
	try {
		const cultures = await db.Culture.findAll();
		res.render('pages/cultures/index', {
			cultures: cultures
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: false,
			message: error.message
		});
	}
};

exports.create = (req, res) => {
	res.render('pages/cultures/create', {
		culture: null
	});
};

exports.save = async (req, res) => {
	const { name, description, color } = req.body;
	try {
		const culture = await db.Culture.create({
			name, description, color
		});
	} catch (error) {
		console.log(error);
	}
	res.redirect('/culture');
};

exports.edit = (req, res) => {
	const { id } = req.params;
	db.Culture.findOne({
		where: {
			id
		}
	})
		.then((culture) => {
			res.render('pages/cultures/update', {
				culture: culture
			});
		})
		.catch((error) => {
			console.log(error);
			res.redirect('/culture');
		});
};

exports.update = (req, res) => {
	const { name, description, color } = req.body;
	const { id } = req.params;
	let updateObj = {
		name, description, color
	};
	db.Culture.update(updateObj, {
		where: {
			id
		}
	})
		.then((culture) => {
			res.redirect('/culture');
		})
		.catch((error) => {
			console.log(error);
			res.render('/culture');
		});
};

exports.delete = (req, res) => {
	const { id } = req.params;
	db.Culture.destroy({
		where: {
			id
		}
	})
		.then((culture) => {
			res.status(200).json({
				culture: culture,
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
