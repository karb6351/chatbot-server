const Route = require('../../models/route');
const util = require('../../helpers/util');

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
	const { originalname } = req.file;
	Route.create({
		title: title,
		thumbnail: util.storageUrlBuilder(originalname)
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
	console.log(title);
	let updateObj = {
		title: title,
	};
	if (req.file) {
		updateObj['thumbnail'] = util.storageUrlBuilder(req.file.originalname)
	}
	Route.update(
		updateObj,
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

exports.apiGetRoutes = (req, res) => {
	console.log(1);
	Route.findAll().then(routes => {
		return res.status(200).json({
			status: true,
			routes: routes
		})
	})
	.catch(error => {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: error.message
		})
	})
}
