const BaseModule = require('./base_module');

const responseMessage = require('../../../resources/string');

module.exports = class Restaurant extends BaseModule {
	intentType() {
		return [
			{
				name: 'get_way_to_order_food',
				responseAfterJoin: true
			}
		];
	}

	generateReponse(intent, content, payload) {
		switch (intent) {
			case 'get_way_to_order_food':
				return responseMessage.wayOfOrderFoodResponse('inside');
		}
	}
};
