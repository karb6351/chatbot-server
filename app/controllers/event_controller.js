const Event = require('../../models/event');
const util = require('../../helpers/util');

exports.index = (req, res) => {
	Event.findAll()
		.then((events) => {
			res.status(200).json({
				events: events,
				status: true
      });
      res.render('pages/events/index', {
        events: events
      })
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
	Restaurant.find({
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

exports.create = (req, res) => {
	const { name, description, photos, event_id } = req.body;
	Restaurant.create({ name, description, photos, event_id })
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

exports.update = (req, res) => {
	const { name, description, photos, event_id } = req.body;
	const { id } = req.params;
	Restaurant.update(
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
	Restaurant.destroy({
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
