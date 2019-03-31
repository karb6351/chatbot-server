const BaseModule = require('./base_module');
const db = require('../../../models');
const responseMessage = require('../../../resources/string');
const UserActiveLogger = require('../../services/user_active_logger');

module.exports = class GeneralLocalKnowledge extends BaseModule {
	intentType() {
		return [
			{
				
			}
		];
	}

	generateReponse(intent, content, payload) {
		switch (intent) {
			
		}
	}

	async generateReponseWithCoordinate() {
		const userInfo = UserActiveLogger.getUserInfo(this.userId);
		const currentEventId = userInfo.currentEventId;
		const event = await db.Event.findOne({
			where: {
				id: currentEventId,
			},
			include: [
				{
					model: db.GeneralLocalKnowledge
				}
			]
		})
		return responseMessage.reachRestaurantResponse(event.Restaurant)
	}
};
