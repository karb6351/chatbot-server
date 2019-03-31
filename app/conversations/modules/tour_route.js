const BaseModule = require('./base_module');

const db = require('../../../models');
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
				// fetch number of restauarant in route from database
				const route = await db.Route.findOne({
					where: {
						id: user.routeId
					},
					include: [
						{
							model: db.Event,
							as: 'event'
						}
					]
				})
				return responseMessage.numberOfRestaurant(route.event.length);

			case 'get_duration_to_next_location':
				
				let origin = user['currentCoordinate'];
				let destination = user['location'].next;
        let { data } = await GoogleApi.distanceMatrix(origin, destination.coordinate);
        let { distance, duration } = data.rows[0].elements[0];
				return responseMessage.remainDistanceAndDuractionResponse({
					distance: distance.text,
					duration: duration.text
				});

			case 'get_info_of_next_location':
				let nextLocation = user['location']['next'];
				let event_id = nextLocation.event_id;
				let event = null;
				let resultModel = null;
				if (nextLocation.type == 'restaurant'){
					event = await db.Event.findOne({
						where: {
							id: event_id
						},
						include: [
							{
								model: db.Restaurant,
								include: [
									{
										model: db.Culture,
										as: 'culture',
									},
									{
										model: db.Food,
										as: 'food',
									}
								]
							}
						]
					})
					
					resultModel = {
						name: event.Restaurant.name,
						culture: event.Restaurant.culture[0].name,
						dishes: event.Restaurant.food[0].name
					};
					console.log(resultModel);
				}else {
					while(true){
						if (event.Restaurant){
							break;
						}
						event = await db.Event.findOne({
							where: {
								route_id: event.route_id,
								order: {[Op.eq]: event.order + 1}
							},
							include: [{model: db.Restaurant,}]
						})
					}
				}
				// let fakeRestaurant = {
				// 	name: '雙連台式美食',
				// 	culture: 'taiwan',
				// 	dishes: 'Noodles served with oil(熱拌麵)'
				// };
				return responseMessage.restaurantInfoResponse(resultModel);
			
			case 'go_to_next_location':
				

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
