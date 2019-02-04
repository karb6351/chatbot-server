const Route = require('../../models/route');

exports.index = (req, res) => {
	Route.findAll()
		.then((routes) => {
			res.status(200).json({
				routes: routes,
        status: true
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
	Route.find({
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

exports.create = (req, res) => {
	const { title } = req.body;
	Route.create({
		title
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

exports.update = (req, res) => {
	const { title } = req.body;
	const { id } = req.params;
	Route.update(
		{ title },
		{
			where: {
				id
			}
		}
	)
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
