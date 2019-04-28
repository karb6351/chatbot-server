const db = require('../../models');

const type = [
	{
		id: 1,
		value: 'restaurant'
	},
	{
		id: 2,
		value: 'general_local_knowledge'
	}
];
const instruction = [
	{
		id: 1,
		value: 'stop'
	},
	{
		id: 2,
		value: 'run'
	},
	{
		id: 3,
		value: 'eat'
	}
];

exports.create = async (req, res) => {
	const { routeId } = req.params;
	const restaurant = await db.Restaurant.findAll();
	const generalLocalKnowledge = await db.GeneralLocalKnowledge.findAll();
	res.render('pages/events/create', {
		routeId: routeId,
		selectionValue: instruction,
		event: null,
		restaurant: JSON.stringify(restaurant),
		generalLocalKnowledge: JSON.stringify(generalLocalKnowledge)
	});
};

exports.save = async (req, res) => {
	const { duration, description, instruction, route_id, type, model_id, color } = req.body;
	try {
		const lastEvent = await db.Event.findOne({
			where: {
				route_id: route_id
			},
			order: [ [ 'order', 'DESC' ] ]
		});
		const event = await db.Event.create({
			duration,
			instruction,
			description,
			route_id,
			type,
			model_id,
			color,
			order: lastEvent ? lastEvent.order + 1 : 1
		});
	} catch (error) {
		console.log(error);
	}
	res.redirect('/route/' + route_id);
};

exports.edit = async (req, res) => {
	const { id } = req.params;
	const restaurant = await db.Restaurant.findAll();
	const generalLocalKnowledge = await db.GeneralLocalKnowledge.findAll();
	const event = await db.Event.findOne({where: {id}});
	res.render('pages/events/update', {
		selectionValue: instruction,
		event: event,
		restaurant: JSON.stringify(restaurant),
		generalLocalKnowledge: JSON.stringify(generalLocalKnowledge)
	});
};

exports.update = async (req, res) => {
	const { id } = req.params;
	const { duration, description, instruction, route_id, type, model_id, order, color } = req.body;
	try {
		const event = await db.Event.update({
			duration,
			instruction,
			description,
			route_id,
			type,
			model_id,
			order: order,
			color
		},{
			where: {id}
		});
	} catch (error) {
		console.log(error);
	}
	res.redirect('/route/' + route_id);
};

exports.delete = (req, res) => {
	const { id } = req.params;
	db.Event.destroy({
		where: {
			id
		}
	})
		.then((event) => {
			res.status(200).json({
				event: event,
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
