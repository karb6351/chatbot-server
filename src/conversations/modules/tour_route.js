const BaseModule = require('./base_module');

const db = require('../../../models');
const EventRepository = require('../../../repository/event');
const RouteRepository = require('../../../repository/Route');
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
		const user = userActiveLogger.getUserInfo(this.userId);
		let state = user.state;
		switch (user.lastIntent ? user.lastIntent : intent) {
			case 'get_number_of_location_in_path':
				const route = await RouteRepository.findRouteById(user.routeId);
				userActiveLogger.setState(this.userId, 0);
				return {
					messages: responseMessage.numberOfRestaurant(route.event.length),
					restaurant: user.location.current
				};

			case 'get_duration_to_next_location':
				let origin = user['currentCoordinate'];
				let destination = user.location.current;
        let { data } = await GoogleApi.distanceMatrix(origin, destination.coordinate);
				let { distance, duration } = data.rows[0].elements[0];
				console.log(data);
				userActiveLogger.setState(this.userId, 0);
				return {
					messages: responseMessage.remainDistanceAndDuractionResponse({
						distance: distance.text,
						duration: duration.text
					}),
					restaurant: user.location.current
				};

			case 'get_info_of_next_location':
				const nextLocation = user['location']['current'];
				const event_id = nextLocation.event_id;
				const event = await EventRepository.findEventById(event_id);
				userActiveLogger.setState(this.userId, 0);
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
				if (state == 0){
					userActiveLogger.setState(this.userId, state + 1);
					userActiveLogger.setLastIntent(this.userId, intent);
					console.log(userActiveLogger.getUserInfo(this.userId).state);
					return {
						messages: responseMessage.confirmResponse(),
						restaurant: user.location.current
					};
				}else if (state == 1) {
					
					switch (intent) {
						case 'Bot_Control_Reject_Response':
							userActiveLogger.setLastIntent(this.userId, null);
							userActiveLogger.setState(this.userId, 0);
							return {
								messages: responseMessage.rejectGoToNextLocationRespons(),
								restaurant: user.location.current
							}
							
						case 'Bot_Control_Approve_Response':
							userActiveLogger.setLastIntent(this.userId, null);
							const nextRestaurant = await userActiveLogger.moveToNextRestaurant(this.userId);
							userActiveLogger.setState(this.userId, 0);
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
						default:
							//get previous question and answer again, no need to update state
							return {
								messages: responseMessage.confirmResponse(),
								restaurant: user.location.current
							}
					}
				}
				

			// example for mutiple step of conversation flow
			case 'test_intent':
				let messages = [];
				
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
			default:
				return {
					messages: responseMessage.messageNotRecognizedResponse(),
					restaurant: user.location.current
				}
		}
	}
};
