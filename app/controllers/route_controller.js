const Route = require('../../models/route');

exports.index = async (req, res) => {
	try {
		const routes = await Route.findAll();
		res.render('pages/routes/index', {
			routes: routes
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
		const route = await Route.findOne({
			where: {
				id
			}
		});
		res.render('pages/routes/info', {
			route: route
		});
	} catch (error) {
		console.log(error);
	}
	res.redirect('/route')
};

exports.create = (req, res) => {
	res.render('pages/routes/create', {
		route: null
	});
};

exports.save = async (req, res) => {
	const { title, thumbnail } = req.body;
	try {
		const route = await Route.create({
			title: title,
			thumbnail: thumbnail
		});
	} catch (error) {
		console.log(error);
	}
	res.redirect('/route');
};

exports.edit = (req, res) => {
	const { id } = req.params;
	Route.findOne({
		where: {
			id
		}
	})
		.then((route) => {
			res.render('pages/routes/update', {
				route: route
			});
		})
		.catch((error) => {
			console.log(error);
			res.redirect('/route');
		});
};

exports.update = (req, res) => {
	const { title, thumbnail } = req.body;
	const { id } = req.params;
	let updateObj = {
		title: title,
		thumbnail: thumbnail
	};
	Route.update(updateObj, {
		where: {
			id
		}
	})
		.then((route) => {
			res.redirect('/route');
		})
		.catch((error) => {
			console.log(error);
			res.render('/route');
		});
};

exports.delete = (req, res) => {
	const { id } = req.params;
	Route.destroy({
		where: {
			id
		}
	})
		.then((route) => {
			res.status(200).json({
				route: route,
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

exports.apiGetRoutes = (req, res) => {
	console.log(1);
	Route.findAll()
		.then((routes) => {
			return res.status(200).json({
				status: true,
				routes: routes
			});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				status: false,
				message: error.message
			});
		});
};
