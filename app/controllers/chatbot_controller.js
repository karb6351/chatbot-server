const User = require('../../models/user');
const Route = require('../../models/route');
const userActiveLogger = require('../services/user_active_logger');
const tokenHelper = require('../../helpers/token_helper');
const WatsonService = require('../services/watson_service');
const SpeechHandler = require('../services/speech_handler');

const watsonService = new WatsonService();

const responseMessage = require('../../resources/string');
const messageHelper = require('../../helpers/response_message_helper');

const GoogleMap = require('../../api/GoogleMap');

exports.init = (req, res) => {
	const { username, identifier } = req.body;
	User.findOne({
		where: {
			identifier
		}
	})
		.then((user) => {
			if (!user) {
				return User.create({
					username: username ? username : 'guest',
					identifier: identifier
				});
			} else {
				return new Promise((resolve, reject) => {
					resolve(user);
				});
			}
		})
		.then((user) => {
			userActiveLogger.createUserInfo(identifier, user);
			const jwt = tokenHelper.generateToken(identifier);
			res.status(200).json({
				status: true,
				identifier: identifier,
				jwt: jwt,
				messages: messageHelper.build(responseMessage.initResponse(), messageHelper.CHATBOT)
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

exports.message = (req, res) => {
	const { userData: { id } } = req;
	const { message, intent, context } = req.body;
	watsonService
		.message(message, context)
		.then((response) => {
			return SpeechHandler.process_message(id, intent, response);
		})
		.then((messageObj) => {
			messageObj.messages = messageHelper.build(messageObj.messages, messageHelper.CHATBOT);
			res.status(200).json(messageObj);
		})
		.catch((error) => {
			console.error(error);
			res.status(404).json(error);
		});
};

exports.join = (req, res) => {
	const { userData: { id } } = req;
	const { routeId } = req.body;
	// find first restautran of the route;
	Route.findOne({
		where: {
			id: routeId
		}
		// include: [{
		//     model: Restaurant,
		//     where: { route_id : Sequelize.col('Route.id') }
		// }]
	})
		.then((route) => {
			const fakeRestaurant = {
				name: '雙連台式美食',
				coordinate: {
					latitude: 22.3126592,
					longitude: 114.1785663
				}
			};
			userActiveLogger.addRouteId(id, routeId);
			const messages = messageHelper.build(responseMessage.joinRouteResponse(route), messageHelper.CHATBOT);
			userActiveLogger.addCurrentAction(id, userActiveLogger.ACTION_WALK);
			userActiveLogger.setNextLocation(id, fakeRestaurant);
			res.status(200).json({
				messages: messages,
				restaurant: fakeRestaurant
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				status: false,
				message: error.message
			});
		});
};

// check user location has arrived event/restuarant location
exports.updateLocation = async (req, res) => {
	const { userData: { id } } = req;
	const { location } = req.body;
	userActiveLogger.addCurrentCoordinate(id, location);
	const userInfo = userActiveLogger.getUserInfo(id);
	const nextLocation = userInfo.location['next'];
	let messages = [];
	let eventType = null;
	if (nextLocation) {
		try {
			const { data } = await GoogleMap.distanceMatrix(location, nextLocation.coordinate);
			const { distance } = data.rows[0].elements[0];
			if (distance.value < 50) {
				// check next location is restaurant or local point
				// if (nextLocation.type === ){

				// }
				messages = messageHelper.build(responseMessage.reachRestaurantResponse());
				eventType = 'restaurant';
			}
		} catch (error) {
			console.error(error);
		}
	}

	res.status(200).json({
		status: true,
		location: location,
		eventType: eventType,
		messages: messages
	});
};

exports.test = (req, res) => {
	const { identifier } = req.body;
	User.findOne({
		where: {
			id: identifier
		}
	}).then((user) => {
		console.log(user);
	});
};
