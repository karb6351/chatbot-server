const BaseModule = require('./base_module');
const db = require('../../../models');
const responseMessage = require('../../../resources/string');
const UserActiveLogger = require('../../services/user_active_logger');
const { getNearestLocation } = require('../../../helpers/util');
const GeneralLocalKnowledgeRepository = require('../../../repository/GeneralLocalKnowledge');

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
		const location = userInfo.currentCoordinate;
		const generalLocalKnowledges = await GeneralLocalKnowledgeRepository.getAllGeneralLocalKnowledge();
		const nearestLocation = getNearestLocation(generalLocalKnowledges, location);
		return {
			messages: responseMessage.reachGeneralLocalKnowledgeResponse(nearestLocation),
			generalLocalKnowledge: nearestLocation
		}
	}
};
