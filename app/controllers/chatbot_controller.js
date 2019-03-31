const User = require('../../models/user');
const Sequelize = require('sequelize');
const db = require('../../models');
const EventRepostory = require('../../repository/Event');
const userActiveLogger = require('../services/user_active_logger');
const tokenHelper = require('../../helpers/token_helper');
const WatsonService = require('../services/watson_service');
const SpeechHandler = require('../services/speech_handler');

const { formatUserInfoLocation, getDistanceFromLatLonInKm } = require('../../helpers/util');

const watsonService = new WatsonService();

const responseMessage = require('../../resources/string');
const messageHelper = require('../../helpers/response_message_helper');

const GoogleMap = require('../../api/GoogleMap');

exports.init = async (req, res) => {
	const { username, identifier } = req.body;
	try{
		const user = await db.User.findOne({where: {identifier}});
		if (!user) {
			user = await db.User.create({
				username: username ? username : 'guest',
				identifier: identifier
			});
		}
		userActiveLogger.createUserInfo(identifier, user);
		const jwt = tokenHelper.generateToken(identifier);
		res.status(200).json({
			status: true,
			identifier: identifier,
			jwt: jwt,
			messages: messageHelper.build(responseMessage.initResponse(), messageHelper.CHATBOT)
		});
	}catch(error){
		console.log(error);
		res.status(500).json({
			status: false,
			message: error.message
		});
	}
};

exports.message = async (req, res) => {
	const { userData: { id } } = req;
	const { message, intent, context } = req.body;
	try{
		const response = await watsonService.message(message, context);
		let messageObj = await SpeechHandler.process_message(id, intent, response);
		messageObj.messages = messageHelper.build(messageObj.messages, messageHelper.CHATBOT); 
		res.status(200).json(messageObj);
	}catch(error){
		console.error(error);
		res.status(404).json(error);
	}
};

exports.join = async (req, res) => {
	const { userData: { id } } = req;
	const { routeId } = req.body;
	// find first restautran of the route;
	try{
		const route = await db.Route.findOne({
			where: {
				id: routeId,
			},
			include: [
				{
					model: db.Event,
					as: 'event',
					order: [['order', 'ASC']],
					include: [
						{
							model: db.Restaurant
						},
						{
							model: db.GeneralLocalKnowledge
						}
					]
				}
			]
		});
		// --------------------------------------------
		
		const startpoint = {
			latitude: 22.316201,
			longitude: 114.180331
		}

		// --------------------------------------------
		
		userActiveLogger.addRouteId(id, routeId);
		userActiveLogger.setCurrentEventId(id, route.event[0].id);
		userActiveLogger.addCurrentAction(id, userActiveLogger.ACTION_WALK);

		const restaurant = await userActiveLogger.moveToNextRestaurant(id);
		// const GeneralLocalKnowledge = await userActiveLogger.moveToNextGeneralLocalKnowledge(id);
		
		// const restaurant = formatUserInfoLocation(route);
		// userActiveLogger.setNextLocation(id, restaurant);

		const messages = messageHelper.build(responseMessage.joinRouteResponse(route), messageHelper.CHATBOT);
		res.status(200).json({
			messages: messages,
			restaurant: restaurant
		});

	}catch(error){
		console.log(error);
		res.status(500).json({
			status: false,
			message: error.message
		});
	}
};

// check user location has arrived event/restuarant location
exports.updateLocation = async (req, res) => {
	const { userData: { id } } = req;
	const { location } = req.body;
	userActiveLogger.addCurrentCoordinate(id, location);
	const userInfo = userActiveLogger.getUserInfo(id);
	const currentLocation = userInfo.location['current'];
	let messages = [];
	let hasEvent = false;
	if (currentLocation && currentLocation !== '') {
		try {
			const distanceBewteenNextLocation = getDistanceFromLatLonInKm(location, currentLocation.coordinate);
			// check user is close to restaurant in 10m
			if (distanceBewteenNextLocation < 0.01) {

				const nextEvent = await EventRepostory.findNextEventById(userInfo.currentEventId);

				let isLast = nextEvent ? false : true;
				
				userActiveLogger.moveToNextRestaurant(id);

				let extenalMessage = [];
				if (isLast){
					extenalMessage = responseMessage.reachLastResponse()
				}
				
				messageObj = await SpeechHandler.process_location(id, null, null, 'restaurant');
				messages = messageHelper.build(extenalMessage.concat(messageObj.messages), messageHelper.CHATBOT); 
				hasEvent = true;
			}
		} catch (error) {
			console.error(error);
		}
	}

	console.log(messages, hasEvent);

	res.status(200).json({
		status: true,
		location: location,
		messages: messages,
		hasEvent: hasEvent 
	});
};
