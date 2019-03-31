const BaseModule = require('./base_module');

const db = require('../../../models');
const EventRepository = require('../../../repository/event');
const RouteRepository = require('../../../repository/route');
const userActiveLogger = require('../../services/user_active_logger');
const responseMessage = require('../../../resources/string');
const GoogleApi = require('../../../api/GoogleMap');

module.exports = class TourRoute extends BaseModule {
	intentType() {
		return [
			{
				name: 'get_number_of_location_in_path',
				responseAfterJoin: true
			},
			{
				name: 'get_duration_to_next_location',
				responseAfterJoin: true
			},
			{
				name: 'get_info_of_next_location',
				responseAfterJoin: true
			},
			{
				name: 'skip_next_location',
				responseAfterJoin: true
			},
			{
				name: 'question_for_skip_next_location',
				responseAfterJoin: true
			},
			{
				name: 'go_to_next_location',
				responseAfterJoin: true
			},
		];
	}

	async generateReponseWithIntent(intent, content, payload) {
		let user = userActiveLogger.getUserInfo(this.userId);
		switch (intent) {

			case 'get_number_of_location_in_path':
				const route = RouteRepository.findRouteById(user.route_id);
				return {
					messsages: responseMessage.numberOfRestaurant(route.event.length),
					restaurant: user.location.current
				};

			case 'get_duration_to_next_location':
				let origin = user['currentCoordinate'];
				let destination = user['location'].next;
        let { data } = await GoogleApi.distanceMatrix(origin, destination.coordinate);
        let { distance, duration } = data.rows[0].elements[0];
				return {
					messages: responseMessage.remainDistanceAndDuractionResponse({
						distance: distance.text,
						duration: duration.text
					}),
					restaurant: user.location.current
				};

			case 'get_info_of_next_location':
				const nextLocation = user['location']['next'];
				const event_id = nextLocation.event_id;
				
				const resultModel = {
					name: event.Restaurant.name,
					culture: event.Restaurant.culture[0].name,
					dishes: event.Restaurant.food[0].name
				};
				
				return {
					messages: responseMessage.restaurantInfoResponse(resultModel),
					restaurant: user.location.current
				};
			
			case 'go_to_next_location':
				const nextRestaurant = await userActiveLogger.moveToNextRestaurant(this.userId);
				if (!nextRestaurant){
					return {
						messages: responseMessage.noNextRestaurantRepsonse(),
						restaurant: user.location.current
					}
				}else{
					return {
						messages: responseMessage.moveToNextRestaurantResponse(),
						restaurant: nextRestaurant
					}
				}

			// example for mutiple step of conversation flow
			case 'test_intent':
				let messages = [];
				const state = userActiveLogger.getUserInfo(this.userId).state;
				if (state == 0) {
					messages = [ 'message' ];
					userActiveLogger.setState(this.userId, state + 1);
				} else if (state == 1) {
					// generate message base on intent
					switch (intent) {
						case 'Bot_Control_Reject_Response':
							messages = [ 'you said yes' ];
							// update state
							userActiveLogger.setState(this.userId, 0);
						case 'Bot_Control_Approve_Response':
							messages = [ 'you said no' ];
							// update state
							userActiveLogger.setState(this.userId, 0);
						default:
						//get previous question and answer again, no need to update state
					}
				} else {
					messages = responseMessage.messageNotRecognizedResponse();
				}
				return messages;
		}
	}
};
