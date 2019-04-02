const BaseModule = require('./base_module');

const EventRepository = require('../../../repository/event');

const responseMessage = require('../../../resources/string');
const UserActiveLogger = require('../../services/user_active_logger');

module.exports = class Restaurant extends BaseModule {
	intentType() {
		return [
			{
				name: 'get_way_to_order_food',
				responseAfterJoin: true
			},
			{
				name: 'get_suggested_food',
				responseAfterJoin: true
			},
			{
				name: 'confirm_found_restaurant',
				responseAfterJoin: true
			},
		];
	}

	async generateReponseWithIntent(intent, content, payload) {
		const user = UserActiveLogger.getUserInfo(this.userId);
		switch (user.lastIntent ? user.lastIntent : intent) {
			// case 'get_way_to_order_food':
			// 	return responseMessage.wayOfOrderFoodResponse('inside');
			case 'confirm_found_restaurant':
				switch(intent){

					case 'Bot_Control_Reject_Response':
						UserActiveLogger.setState(this.userId, user.state + 1);
						return {
							messages: responseMessage.helpUserToFoundRestaurantResponse(user.location.current),
							restaurant: user.location.current
						}
						
					case 'Bot_Control_Approve_Response':
						UserActiveLogger.setLastIntent(this.userId, null);
						UserActiveLogger.setState(this.userId, 0);
						return {
							messages: responseMessage.giveRestaurantDetailResponse(user.location.current),
							restaurant: user.location.current
						}
					default:
						//get previous question and answer again, no need to update state
						return {
							messages: responseMessage.reachRestaurantResponse(user.location.current),
							restaurant: user.location.current
						}
				}
			case 'get_suggested_food':
				return {
					messages: responseMessage.wayOfOrderFoodResponse('inside'),
					restaurant: user.location.current
				};
		}
	}

	async generateReponseWithCoordinate() {
		const userInfo = UserActiveLogger.getUserInfo(this.userId);
		try{
			UserActiveLogger.setLastIntent(this.userId, 'confirm_found_restaurant');
			const event = await EventRepository.findEventById(userInfo.currentEventId);
			const messages = responseMessage.reachRestaurantResponse(event.Restaurant);
			console.log(messages);
			return {
				messages: messages,
				restaurant: userInfo.location.current
			}
		}catch(error){
			console.log(error);

		}
		
	}
};
