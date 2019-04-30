const db = require('../../models');
const RouteRepostory = require('../../repository/Route');
const EventRepostory = require('../../repository/Event');
const GeneralLocalKnowledgeRepostory = require('../../repository/GeneralLocalKnowledge');

const userActiveLogger = require('../services/user_active_logger');
const tokenHelper = require('../../helpers/token_helper');
const WatsonService = require('../services/watson_service');
const SpeechHandler = require('../services/speech_handler');

const { getDistanceFromLatLonInKm, getNearestLocation } = require('../../helpers/util');

const watsonService = new WatsonService();

const responseMessage = require('../../resources/string');
const messageHelper = require('../../helpers/response_message_helper');


exports.init = async (req, res) => {
	const { username, identifier } = req.body;
	try{
		let user = await db.User.findOne({where: {identifier}});
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
		const event = await EventRepostory.findEventById(userActiveLogger.getUserInfo(id).currentEventId);
		console.log(messageObj);
		messageObj.messages = messageHelper.build(messageObj.messages, messageHelper.CHATBOT); 
		res.status(200).json({
			...messageObj,
			event: event
		});
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
		// --------------------------------------------
		
		const startpoint = {
			latitude: 22.316201,
			longitude: 114.180331
		}

		// --------------------------------------------
		const route = await RouteRepostory.findRouteById(routeId);

		userActiveLogger.addRouteId(id, routeId);
		userActiveLogger.setCurrentEventId(id, route.event[0].id);
		userActiveLogger.addCurrentAction(id, userActiveLogger.ACTION_WALK);

		const restaurant = await userActiveLogger.moveToNextRestaurant(id);
		
		const messages = messageHelper.build(responseMessage.joinRouteResponse(route), messageHelper.CHATBOT);

		const event = await EventRepostory.findEventById(userActiveLogger.getUserInfo(id).currentEventId);

		res.status(200).json({
			messages: messages,
			restaurant: restaurant,
			event: route.event[0],
			intent: null,
			content: null,
			event: event
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
	let event = null;
	// check user is reach restaurant
	if (currentLocation && currentLocation !== '') {
		// check user is close to restaurant in 10m
		if (getDistanceFromLatLonInKm(location, currentLocation.coordinate) < 0.02) {
			try {
				const nextEvent = await EventRepostory.findNextEventById(userInfo.currentEventId);
				let isLast = nextEvent ? false : true;
				event = isLast ? null : nextEvent;
				// userActiveLogger.moveToNextRestaurant(id);
				let extenalMessage = [];
				if (isLast){
					extenalMessage = responseMessage.reachLastResponse()
				}
				messageObj = await SpeechHandler.process_location(id, null, null, 'restaurant');
				messages = messageHelper.build(extenalMessage.concat(messageObj.messages), messageHelper.CHATBOT); 
				hasEvent = true;
			} catch (error) {
				console.error(error);
			}
		}else {
			// check user is reach any general local knowledge location
			try{
				const generalLocalKnowledges = await GeneralLocalKnowledgeRepostory.getAllGeneralLocalKnowledge();
				if (generalLocalKnowledges.length !== 0){
					const nearestLocation = getNearestLocation(generalLocalKnowledges, location);
					const nearestLocationCoordinate = JSON.parse(nearestLocation.location);
					// console.log(nearestLocation);
					// console.log(getDistanceFromLatLonInKm(location, {
					// 	latitude: nearestLocationCoordinate.lat,
					// 	longitude: nearestLocationCoordinate.lng
					// }));
					if (nearestLocation && getDistanceFromLatLonInKm(location, {
						latitude: nearestLocationCoordinate.lat,
						longitude: nearestLocationCoordinate.lng
					}) < 0.02){
						messageObj = await SpeechHandler.process_location(id, null, null, 'general_local_knowledge');
						console.log(messageObj);
						messages = messageHelper.build(messageObj.messages, messageHelper.CHATBOT); 
						hasEvent = true;
					}
				}
			}catch(error){
				console.log(error);
				return res.status(500).json({
					status: false,
					message: error.message
				})
			}
		}
		// check user is in wrong direction
		// messages = messageHelper.build(responseMessage.wrongDirectionResponse(), messageHelper.CHATBOT); 
		// hasEvent = true;
	}
	let returnObj = {
		status: true,
		location: location,
		messages: messages,
		hasEvent: hasEvent,
		event: event
	}
	console.log(returnObj)
	res.status(200).json(returnObj);
};
