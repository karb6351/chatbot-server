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
			}
		];
	}

	async generateReponseWithIntent(intent, content, payload) {
		switch (intent) {
			case 'get_way_to_order_food':
				return responseMessage.wayOfOrderFoodResponse('inside');
			case 'get_suggested_food':
				const userInfo = UserActiveLogger.getUserInfo(this.userId);
				return responseMessage.wayOfOrderFoodResponse('inside');
		}
	}

	async generateReponseWithCoordinate() {
		const userInfo = UserActiveLogger.getUserInfo(this.userId);
		const event = await EventRepository.findEventById(userInfo.currentEventId);
		return responseMessage.reachRestaurantResponse(event.Restaurant)
	}
};
