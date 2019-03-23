const BaseModule = require('./base_module');

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
			}
		];
	}

	async generateReponse(intent, content, payload) {
		switch (intent) {
			case 'get_number_of_location_in_path':
				// fetch number of restauarant in route from database
				const total = 1; // dummy data
				return responseMessage.numberOfRestaurant(total);

			case 'get_duration_to_next_location':
				const userInfo = userActiveLogger.getUserInfo(this.userId);
				const origin = userInfo['currentCoordinate'];
				const destination = userInfo['location'].next;
        const { data } = await GoogleApi.distanceMatrix(origin, destination.coordinate);
        const { distance, duration } = data.rows[0].elements[0];
				return responseMessage.remainDistanceAndDuractionResponse({
					distance: distance.text,
					duration: duration.text
				});

			case 'get_info_of_next_location':
				const fakeRestaurant = {
					name: '雙連台式美食',
					culture: 'taiwan',
					dishes: 'Noodles served with oil(熱拌麵)'
				};
				return responseMessage.restaurantInfoResponse(fakeRestaurant);

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
